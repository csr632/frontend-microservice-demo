/**
 * This is the **only** place where:
 * 1. 'Micro-service name' are bound to their 'deployment location'
 * ('deployment location' is usually a CDN URL)
 * 2. Deployment locations appear. (In all other places, we refer to a micro-service by its 'name')
 *
 * When a micro-services update, it's 'deployment location' often update
 * (because CDN URLs often contain version number or content hash).
 * So this file will update very frequently.
 */

const sharedLibAddr = "http://127.0.0.1:8001";
const teamAAddr = "http://127.0.0.1:8002";
const teamBAddr = "http://127.0.0.1:8003";
const topAppAddr = "http://127.0.0.1:8004";

const importMap = {
  imports: {
    "shared-lib1": `${sharedLibAddr}/dist/shared-lib1.js`,
    "shared-lib2": `${sharedLibAddr}/dist/shared-lib2.js`,
    jquery: `${sharedLibAddr}/dist/jquery.js`,
    lodash: `${sharedLibAddr}/dist/lodash.js`,
    "team-a": `${teamAAddr}/dist/bundle.js`,
    "team-b": `${teamBAddr}/dist/bundle.js`,
    "top-app": `${topAppAddr}/dist/app.js`
  },
  scopes: {
    [`${teamBAddr}/`]: {
      // team-b can use a different version of `shared-lib1`
      "shared-lib1": `${sharedLibAddr}/dist/shared-lib1-v2.js`
    }
  }
};

insertNewImportMap(importMap);

function insertNewImportMap(newMapJSON) {
  const newScript = document.createElement("script");
  newScript.type = "systemjs-importmap";
  newScript.text = JSON.stringify(newMapJSON);

  var head = document.getElementsByTagName("head")[0];
  head.appendChild(newScript);
}
