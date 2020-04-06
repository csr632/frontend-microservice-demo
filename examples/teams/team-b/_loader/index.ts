import { loadAmdAsFactory } from "mfe-runtime";
import * as lodash from "lodash";

const defaultUrl = "http://127.0.0.1:8003/dist/index.js";
// const defaultUrl = "https://unpkg.com/@micro-frontend-demo/team-a@^2.0.0/dist/index.js"

export default (url?: string) =>
  loadAmdAsFactory<{ lodash: any }, typeof import("../dist")>(
    url ?? defaultUrl
  ).then(factory => factory({ lodash })); // loader auto collect lodash as dep
