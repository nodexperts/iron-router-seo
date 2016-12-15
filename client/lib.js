var Lib = {};

Lib.removeSpecialCharacters = string => {
  return (`${string}`).replace(/'/g, "&apos;").replace(/"/g, "&quot;");
};

Lib.getIronRoute = () => {
  let router = Router.current();
  return (router) ? router.route.getName() : 'undefined';
};

export default Lib;
