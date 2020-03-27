import resolve from "rollup-plugin-node-resolve";

export default {
  input: ["./src/index.js"],
  output: {
    file: "./dist/bundle.js",
    format: "system"
  },
  plugins: [resolve()],
  external: [
    "@micro-frontend-demo/shared-lib1",
    "@micro-frontend-demo/shared-lib2"
  ],
  watch: {
    include: "src/**"
  }
};
