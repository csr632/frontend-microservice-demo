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
      provideServices: {},
      configServices: {
        "@micro-frontend-demo/team-b": {
          channel: "patch",
          shared: {
            // dep name -> service resolve name
            jquery: "jquery2", // not a micro-frontend, emit a chunk and share it
            lodash: "shared-libs/dist/lodash" // is a micro-frontend, share this service
          }
        }
      },

      shared: ["jquery"]
    }),
    resolve()
  ]
};
