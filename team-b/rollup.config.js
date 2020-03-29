import resolve from "rollup-plugin-node-resolve";

export default {
  input: { index: "./src/index.js", entry2: "./src/entry2.js" },
  output: [
    {
      entryFileNames: "[name].js",
      dir: "./dist",
      format: "es"
    },
    {
      entryFileNames: "[name].js",
      dir: "./dist/systemjs",
      format: "system"
    }
  ],
  plugins: [resolve()],
  external: ["jquery"]
};
