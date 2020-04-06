import { loadAmdAsFactory } from "mfe-runtime";

interface Deps {
  lodash: typeof import("lodash");
}

const defaultUrl = "http://127.0.0.1:8004/dist/index.js";
// const defaultUrl = "https://unpkg.com/@micro-frontend-demo/team-a@^2.0.0/dist/index.js"

export default ({ lodash }: Deps, url?: string) =>
  loadAmdAsFactory<{ lodash: any }, typeof import("../dist")>(
    url ?? defaultUrl
  ).then(factory => factory({ lodash }));
