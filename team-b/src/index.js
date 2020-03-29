import * as $ from "jquery";

export function teamB() {
  console.log("teamB");
  console.log("got external dependency jquery", $);
}

export function teamBHelper() {
  console.log("teamBHelper");
}
