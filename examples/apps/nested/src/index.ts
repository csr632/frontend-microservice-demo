import loader from "@micro-frontend-demo/team-d/loader";

const moduleD = loader();

moduleD.then(module => {
  console.log(module);
  module.teamD();
  module.teamD();
  module.teamD();
});
