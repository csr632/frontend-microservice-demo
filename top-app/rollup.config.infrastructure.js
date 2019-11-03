import resolve from "rollup-plugin-node-resolve";

export default {
  input: ["./src/infrastructure.js"],
  output: {
    dir: "./dist",
    format: "iife"
  },
  plugins: [resolve()]
};
