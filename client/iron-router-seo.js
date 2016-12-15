import Setter from './setter.js';
import './config.js';
import Lib from './lib.js';

Deps.autorun(() => {
  let currentRouteName = Lib.getIronRoute();
  if(currentRouteName === 'undefined') {
    return;
  }
  return (currentRouteName) ? Meteor.subscribe('seoByRouteName', currentRouteName) : null;
});

Deps.autorun(() => {
  let currentRouteName = Lib.getIronRoute();
  if(currentRouteName === 'undefined') {
    return;
  }
  let settings = IronRouterPaths.findOne({
    route_name: currentRouteName
  }) || {};
  return (IronRouterSEO) ? Setter.init(settings) : null;
});
