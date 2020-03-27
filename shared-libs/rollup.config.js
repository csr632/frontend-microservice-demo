import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";

export default {
  input: [
    "./src/shared-lib1.js",
    "./src/shared-lib1-v2.js",
    "./src/shared-lib2.js",
    "./src/jquery.js",
    "./src/lodash.js"
  ],
  output: {
    dir: "dist",
    format: "system",
    exports: "named"
  },
  plugins: [resolve(), commonjs()]
};
