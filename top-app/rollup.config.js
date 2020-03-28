import resolve from "rollup-plugin-node-resolve";
import { mfeNodePlugin } from "rollup-plugin-micro-frontend";

export default {
  input: { app: "./src/app.js" },
  output: {
    entryFileNames: "[name].js",
    dir: "./dist",
    format: "iife"
  },
  plugins: [
    mfeNodePlugin({
      channel: {
        "@micro-frontend-demo/team-b": "patch"
      }
    }),
    resolve()
  ]
};
