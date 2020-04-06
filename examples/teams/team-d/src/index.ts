import loader from "@micro-frontend-demo/team-a/loader";

export function teamD() {
  console.log("teamD loading teamA...");
  loader().then(module => {
    console.log(module);
    module.teamA();
  });
}
