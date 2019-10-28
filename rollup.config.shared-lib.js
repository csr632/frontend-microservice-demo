import resolve from "rollup-plugin-node-resolve";

// I can't build the shared-lib into one bundle. (before team-a and team-b is built)

export default {
  input: ["./src/shared-lib/lib1.js", "./src/shared-lib/lib2.js"],
  output: {
    dir: "./dist-shared/",
    // file: "./dist-shared/bundle.js",
    format: "esm"
  },
  plugins: [resolve()]
  // manualChunks(id) {
  //   console.log("manualChunks:", id);
  //   if (id.includes("shared-lib")) {
  //     return "vendor";
  //   }
  // }
};
