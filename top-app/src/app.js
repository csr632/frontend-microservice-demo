import "systemjs/dist/system";
import "rollup-plugin-micro-frontend/registerMfes";

import("@micro-frontend-demo/team-b").then(({ teamB }) => {
  teamB();
});

// alias到./c-loader.js
import TeamC from "@micro-frontend-demo/team-c";

console.log(TeamC);

import("@micro-frontend-demo/team-d/factory").then(module =>
  module.default({ jquery: $ })
);