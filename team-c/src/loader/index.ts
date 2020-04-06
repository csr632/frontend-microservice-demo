export default (
  cdnURL: string,
  deps: {
    jquery: any;
  }
) => {
  // TODO 把service打包成一个factory function
  import(cdnURL).then(module => module.default(deps.jquery));
};
