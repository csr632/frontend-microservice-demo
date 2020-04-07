import loadTeamA from "@micro-frontend-demo/team-a/loader";

let singleton: any = null;

export default () => {
  // only call loader once.
  // so team-a module is a lazy singleton.
  if (!singleton) singleton = loadTeamA();
  return singleton;
};
