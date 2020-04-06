import { loadAmdAsFactory } from "mfe-runtime";

const defaultUrl = "http://127.0.0.1:8002/dist/index.js";
// const defaultUrl = "https://unpkg.com/@micro-frontend-demo/team-a@^2.0.0/dist/index.js"

export default (url?: string) =>
  loadAmdAsFactory<null, typeof import("../dist")>(
    url ?? defaultUrl
  ).then(factory => factory());
