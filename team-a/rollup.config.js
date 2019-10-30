import resolve from "rollup-plugin-node-resolve";

export default {
  input: "./src/index.js",
  output: {
    file: "./dist/bundle.js",
    format: "system"
  },
  plugins: [resolve()],
  external: ["shared-lib1", "shared-lib2", "team-b"]
};
