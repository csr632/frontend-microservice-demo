import { teamA } from "team-a";
import { teamB } from "team-b";
import $ from "jquery";

teamA();

teamB();

$("#app").html("loading lodash...");

import("lodash").then(({ default: _ }) => {
  $("#app").html(`jQuery and ${_.capitalize("lodash")} works!`);
});
