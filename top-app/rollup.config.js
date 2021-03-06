import resolve from "rollup-plugin-node-resolve";

export default {
  input: ["./src/app.js"],
  output: {
    dir: "./dist",
    format: "system"
  },
  plugins: [resolve()],
  external: ["team-a", "team-b", "jquery", "lodash"]
};
