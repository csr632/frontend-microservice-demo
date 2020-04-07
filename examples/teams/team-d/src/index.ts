import loadTeamA from "./load-team-a";

export async function teamD() {
  console.log("teamD loading teamA...");

  const moduleA = await loadTeamA();
  const moduleA_ = await loadTeamA();

  if (moduleA_ !== moduleA) throw Error(`teamA should be a singleton`);
  console.log(moduleA);
  moduleA.teamA();
}
