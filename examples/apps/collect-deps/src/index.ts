import loader from "@micro-frontend-demo/team-b/_loader";

// loader auto collect lodash as dep
loader().then(module => {
  console.log(module);
  module.teamB();
});
