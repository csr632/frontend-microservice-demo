// returns the imported package name for bare module imports
// copied from https://github.com/rollup/plugins/blob/7f5c12a8d0cd5e0a1b861483c2a9d37a7eae44d1/packages/node-resolve/src/util.js#L13
export function getPackageName(importee: string) {
  if (importee.startsWith(".") || importee.startsWith("/")) {
    return null;
  }

  const split = importee.split("/");

  // @my-scope/my-package/foo.js -> @my-scope/my-package
  // @my-scope/my-package -> @my-scope/my-package
  if (split[0][0] === "@") {
    // @invalid-pkg-name -> null
    if (!split[1]) return null;
    return `${split[0]}/${split[1]}`;
  }

  // my-package/foo.js -> my-package
  // my-package -> my-package
  return split[0];
}
