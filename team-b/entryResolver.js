const esModuleMap = {
  "dist/index.js":
    "https://unpkg.com/@micro-frontend-demo/team-b@^2.0.0/dist/index.js",
  "dist/entry2.js":
    "https://unpkg.com/@micro-frontend-demo/team-b@^2.0.0/dist/entry2.js"
};
const systemJsModuleMap = {
  "dist/index.js":
    "https://unpkg.com/@micro-frontend-demo/team-b@^2.0.0/dist/index.system.js",
  "dist/entry2.js":
    "https://unpkg.com/@micro-frontend-demo/team-b@^2.0.0/dist/entry2.system.js"
};

module.exports = ({ modulePath, moduleFormat }) => {
  const res = (() => {
    if (moduleFormat === "system") {
      return systemJsModuleMap[modulePath];
    }
    if (["es", "esm", "module"].indexOf(moduleFormat) >= 0) {
      return esModuleMap[modulePath];
    }
  })();
  if (!res)
    throw new Error(
      `Can't resolve micro-frontend service request "${modulePath}" with moduleFormat "${moduleFormat}".`
    );
  return res;
};
