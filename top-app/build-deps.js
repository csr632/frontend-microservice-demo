const jspmResolve = require("@jspm/resolve");
const rollup = require('rollup');


(async () => {
  const { resolved, format } = await jspmResolve("@micro-frontend-demo/team-a");
  if (format !== "module") {
    throw new Error(`Unexpected format: ${format}`);
  }
  const { code } = await babel.transformFileAsync(resolved);
  const bundle = await rollup.rollup({
    input: resolved
  })
  console.log(code)
  debugger;
})();
