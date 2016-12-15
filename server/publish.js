Meteor.publish('seoByRouteName', (routeName) => {
  check(routeName, String);
  return IronRouterPaths.find({
    route_name: routeName
  });
});
