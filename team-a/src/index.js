import { lib1 } from "shared-lib1";
import { lib2 } from "shared-lib2";

import { teamBHelper } from "team-b";

export function teamA() {
  console.log("teamA");
  teamBHelper();
  lib1();
  lib2();
}
