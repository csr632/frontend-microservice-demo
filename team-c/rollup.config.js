import resolve from "rollup-plugin-node-resolve";

export default {
  input: "./src/service/index.ts",
  output: {
    file: "./dist/bundle.js",
    format: "amd",
    exports: "named"
  },
  plugins: [resolve()],
  external: ["jquery"]
};
