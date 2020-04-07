import typescript from "@rollup/plugin-typescript";

export default {
  input: { index: "./src/index.ts" },
  output: {
    dir: "dist",
    format: "esm",
    exports: "named",
    sourcemap: true
  },
  plugins: [typescript({ tsconfig: "./tsconfig.json" })]
};
