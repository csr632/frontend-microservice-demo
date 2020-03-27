import { lib1 } from "@micro-frontend-demo/shared-lib1";
import { lib2 } from "@micro-frontend-demo/shared-lib2";

export function teamB() {
  console.log("teamB");
  lib1();
  lib2();
}

export * from "./helper";
