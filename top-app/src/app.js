import "systemjs/dist/system";
import "rollup-plugin-micro-frontend/registerMfes";

import("@micro-frontend-demo/team-b").then(({ teamB }) => {
  teamB();
});
