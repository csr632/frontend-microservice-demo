const URL_PREFIX =
  "https://unpkg.com/@micro-frontend-demo/team-b@^2.0.0/dist/systemjs/";

const systemJsModuleMap = {
  "dist/index.js": `${URL_PREFIX}index.js`,
  "dist/entry2.js": `${URL_PREFIX}entry2.js`
};

module.exports = ({ consumerPkgJson }) => {
  const res = systemJsModuleMap[modulePath];
  return res;
};
