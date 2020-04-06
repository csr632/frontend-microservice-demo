// lodash is external, but we can use it as normal module
import * as _ from "lodash";

export function teamC() {
  var objects = [{ a: 1 }, { a: 2 }];

  // pluck exists in lodash 3.x and is removed in 4.x
  console.log("teamC", _.pluck(objects, "a")); // ➜ [1, 2]
}
