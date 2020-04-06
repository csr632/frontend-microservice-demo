import $ from "jquery";

function teamC() {
  console.log("I am team-c!");
  console.log("got dependency, using it: ", $("body"));
}

export default teamC;

export const jq = $;
