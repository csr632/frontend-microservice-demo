import { lib1 } from "@micro-frontend-demo/shared-lib1";
import { lib2 } from "@micro-frontend-demo/shared-lib2";

import { teamBHelper } from "@micro-frontend-demo/team-b";

export function teamA() {
  console.log("teamA");
  teamBHelper();
  lib1();
  lib2();
}
