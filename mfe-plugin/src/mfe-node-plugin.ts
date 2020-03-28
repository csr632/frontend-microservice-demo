import readPkgUp from "read-pkg-up";
import * as fs from "fs-extra";
import * as path from "path";
import { Plugin } from "rollup";
import nodeResolve from "resolve";
import virtual from "@rollup/plugin-virtual";

import { getPackageName } from "./utils";
import replace from "./replace-plugin";

interface IMfeNodePluginOptions {
  moduleFormat?: string;
  pkgJsonPath?: string;
  channel?: {
    [importPkgName: string]: any;
  };
  importMapName?: string;
}

const MFE_MODULE_ID_PREFIX = "__MFE__";
const REPLACE_NAME_WITH_IMPORT_MAP = "__microFrontendImportMap";

// resolve micro-frontend project from node_modules
export default function mfeNodePlugin({
  moduleFormat = "system",
  pkgJsonPath,
  channel,
  importMapName = "@@mfe-import-map.json"
}: IMfeNodePluginOptions = {}) {
  const importMap = {
    imports: {} as { [name: string]: string }
    // scopes: {} as any
  };

  const selfPkg = (() => {
    if (pkgJsonPath) {
      if (!path.isAbsolute(pkgJsonPath))
        throw new Error(
          `pkgJsonPath "${pkgJsonPath}" should be absolute path.`
        );
      if (!fs.existsSync(pkgJsonPath))
        throw new Error(`pkgJsonPath "${pkgJsonPath}" not exist.`);
      return readPkgUp.sync({ cwd: path.dirname(pkgJsonPath) });
    }
    return readPkgUp.sync();
  })();

  if (!selfPkg || !selfPkg.packageJson)
    throw new Error(`Can't find project package.json.
  Please provide options.pkgJsonPath.`);

  return {
    name: "mfeNodePlugin",
    options(options) {
      const plugins = options.plugins ?? [];
      plugins.push(
        replace({
          [REPLACE_NAME_WITH_IMPORT_MAP]: () => JSON.stringify(importMap)
        }),
        virtual({
          [importMapName]: `export default ${REPLACE_NAME_WITH_IMPORT_MAP};`
        })
      );
      return {
        ...options,
        plugins
      };
    },
    async resolveDynamicImport(source, importer) {
      // we can only resolve the package when import target is string literal:
      // import("package-name/path/to/module")
      // Otherwise, we can't resolve the package:
      // import(var1+"package-name/path/to/module"+var2)
      if (typeof source === "string") {
        const importPkgName = getPackageName(source);
        if (!importPkgName) return null;

        const normalResolve = await new Promise<string | null>(res => {
          nodeResolve(
            source,
            { basedir: path.dirname(importer) },
            (err, data) => {
              if (err) res(null);
              res(data);
            }
          );
        });

        if (normalResolve && (await fs.pathExists(normalResolve))) {
          const resolvedPkg = await readPkgUp({ cwd: normalResolve });
          if (!resolvedPkg) return null;

          if (
            resolvedPkg.packageJson.microFrontendProvider &&
            resolvedPkg.path !== selfPkg.path
          ) {
            const resolvedPkgPath = path.dirname(resolvedPkg.path);
            const entryResolver = require(path.resolve(
              resolvedPkgPath,
              resolvedPkg.packageJson.microFrontendProvider.entryResolver
            ));
            const modulePath = path.relative(resolvedPkgPath, normalResolve);

            const serviceEntryUrl = entryResolver({
              modulePath,
              moduleFormat,
              consumerPkgJson: selfPkg.packageJson,
              channel: channel?.[importPkgName]
            });
            const mapId = `${MFE_MODULE_ID_PREFIX}${importPkgName}/${modulePath}`;

            if (
              importMap.imports[mapId] &&
              importMap.imports[mapId] !== serviceEntryUrl
            ) {
              throw new Error(
                `Same service entry is resolved into different url: "${importMap.imports[mapId]}" and "${serviceEntryUrl}"`
              );
            }
            importMap.imports[mapId] = serviceEntryUrl;

            return {
              id: mapId,
              external: true
            };
          }
        }
      }
      return null;
    },
    renderDynamicImport({ targetModuleId }) {
      if (targetModuleId?.startsWith(MFE_MODULE_ID_PREFIX))
        return {
          left: "System.import(",
          right: ")"
        };
      return null;
    },
    // generateBundle() {
    //   if (importMapName) {
    //     this.emitFile({
    //       type: "asset",
    //       source: JSON.stringify(importMap),
    //       fileName: importMapName
    //     });
    //   }
    // }
  } as Plugin;
}
