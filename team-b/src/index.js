import { lib1 } from "shared-lib1";
import { lib2 } from "shared-lib2";

export function teamB() {
  console.log("teamB");
  lib1();
  lib2();
}

export function teamBHelper() {
  console.log("teamBHelper");
}
