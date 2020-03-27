import resolve from "rollup-plugin-node-resolve";

export default [
  {
    input: ["./src/app.js"],
    output: {
      dir: "./dist",
      format: "system"
    },
    plugins: [resolve()],
    external: ["@micro-frontend-demo/team-a", "@micro-frontend-demo/team-b"]
  },
  {
    input: ["./src/infrastructure.js"],
    output: {
      dir: "./dist",
      format: "iife"
    },
    plugins: [resolve()]
  }
];
