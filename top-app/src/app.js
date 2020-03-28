import "systemjs/dist/system";
import { installImportMap } from "./utils";
import importMap from "@@mfe-import-map.json";

installImportMap(importMap);

import("@micro-frontend-demo/team-b").then(({ teamB }) => {
  teamB();
});
