import { teamA } from "team-a";
import { teamB } from "team-b";
import $ from "jquery";
import _ from "lodash";

teamA();

teamB();

$("#app").html(`jQuery and ${_.capitalize("lodash")} works!`);
