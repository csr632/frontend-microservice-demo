import loader from "@micro-frontend-demo/team-d/_loader";

loader().then(module => {
  console.log(module);
  module.teamD();
});
