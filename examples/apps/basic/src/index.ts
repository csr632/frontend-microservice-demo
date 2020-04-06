import loader from "@micro-frontend-demo/team-a/_loader";

loader().then(module => {
  console.log(module);
  module.teamA();
});
