import resolve from "rollup-plugin-node-resolve";

export default {
  input: "./src/team-b/index.js",
  output: {
    file: "dist-b/bundle.js",
    format: "esm"
  },
  plugins: [resolve()],
  external: (id, parent, isResolved) => {
    // console.log("test external:", id, "---", parent, "---", isResolved);
    if (id.search("shared-lib") !== -1 || id.search("team-a") !== -1)
      return true;
    return false;
  }
};
