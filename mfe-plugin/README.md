## User code

config:

```js
import resolve from "rollup-plugin-node-resolve";
import mfePlugin from "rollup-plugin-mfe-node";
export default [
  {
    input: { boot: "./src/boot.js" },
    output: {
      entryFileNames: "[name].js",
      dir: "./dist",
      format: "iife"
    },
    plugins: [resolve()]
  },
  {
    input: { app: "./src/app.js" },
    output: {
      entryFileNames: "[name].js",
      dir: "./dist",
      format: "system"
    },
    plugins: [mfePlugin(), resolve()]
  }
];
```

import:

```js
import { util1 } from "micro-frontend-name";
import { util2 } from "micro-frontend-name";
import { util1 } from "micro-frontend-name";

import("micro-frontend-name").then(({ util2 }) => {
  console.log(util2);
});
```
