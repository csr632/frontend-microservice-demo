import teambLoader from "@micro-frontend-demo/team-b/_loader";
import teamcLoader from "@micro-frontend-demo/team-c/_loader";

import * as lodash3 from "lodash3";

// teamb depends on lodash4
// loader auto collect lodash4 as dep
teambLoader().then(teambModule => {
  console.log(teambModule);
  teambModule.teamB();
});

// teamc depends on lodash3
// loader can also ask user to pass on deps
teamcLoader({ lodash: lodash3 }).then(teamcModule => {
  console.log(teamcModule);
  teamcModule.teamC();
});
