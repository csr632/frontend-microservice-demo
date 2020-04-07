import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";

export default [
  {
    input: { index: "./src/index.ts" },
    output: {
      dir: "dist",
      format: "amd",
      exports: "named",
      sourcemap: true
    },
    plugins: [resolve(), typescript({ tsconfig: "./src/tsconfig.json" })],
    external: ["lodash"]
  },
  {
    input: { index: "./_loader/index.ts" },
    output: {
      dir: "loader",
      format: "esm",
      sourcemap: true
    },
    plugins: [resolve(), typescript({ tsconfig: "./_loader/tsconfig.json" })]
  }
];
