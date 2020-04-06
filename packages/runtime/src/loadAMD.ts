interface IDeps {
  // name -> value
  [name: string]: any;
}

/** module exports */
interface IExport {
  [name: string]: any;
}

type IFactory<Deps, Export> = Deps extends undefined | null
  ? () => Export
  : (deps: Deps) => Export;

export function loadAmdAsFactory<
  Deps extends IDeps | undefined | null,
  Export extends IExport
>(url: string): Promise<IFactory<Deps, Export>> {
  // TODO: cache factory
  return fetch(url)
    .then(res => res.text())
    .then(code => amdCodeToFactory<Deps, Export>(code));
}

export function amdCodeToFactory<
  Deps extends IDeps | undefined | null,
  Export extends IExport
>(source: string): IFactory<Deps, Export> {
  const f = new Function("define", source);
  return ((deps: IDeps) => {
    // TODO: lazyDeps
    const exports = ({} as unknown) as Export;
    const actualDeps: IDeps = {
      ...deps,
      exports
    };
    let alreadyRun = false;
    const topLevelDefine = (topLevelDepNames: string[], factory: any) => {
      if (alreadyRun) throw new Error(`topLevelDefine is run more than once.`);
      alreadyRun = true;
      const args = topLevelDepNames.map(name => actualDeps[name]);
      factory(...args);
    };
    f(topLevelDefine);
    if (!alreadyRun) throw new Error(`topLevelDefine is not run.`);
    return exports;
  }) as any;
}
