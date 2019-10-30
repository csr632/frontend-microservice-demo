import resolve from "rollup-plugin-node-resolve";

export default {
  input: ["./src/index.js"],
  output: {
    dir: "./dist",
    format: "system"
  },
  plugins: [resolve(), commonjs()],
  external: ["team-a", "team-b", "jquery", "lodash"]
};
