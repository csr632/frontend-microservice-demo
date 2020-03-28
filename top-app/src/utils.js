export function installImportMap(newMapJSON) {
  const newScript = document.createElement("script");
  newScript.type = "systemjs-importmap";
  newScript.text = JSON.stringify(newMapJSON);

  var head = document.getElementsByTagName("head")[0];
  head.appendChild(newScript);
}
