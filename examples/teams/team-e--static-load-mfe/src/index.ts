// TODO make this static import await for a promise

import * as moduleC from "my-team-c";

console.log("teamE got teamC", moduleC);

export async function teamE() {
  console.log("teamE call teamC");

  moduleC.teamC();
}
