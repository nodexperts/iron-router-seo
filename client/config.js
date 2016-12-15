let Config = {
    title: '',
    rel_author: '',
    meta: {},
    link: [],
    og: {},
    twitter: {},
    auto: {
      twitter: true,
      og: true,
      set: ['description', 'url', 'title'] //Usually these 3 tags will be same for FaceBook and Twitter
    }
}

/**
*@desc Set new config
*@param - config - new Configs from user
*/
Config.setting = function(config) {
  return _.extend(Config, config);
}

/**
*@desc Saves SEO object in collection
*@param List - Object of dictionary with path as key and SEO object as field
*@param Config - deafult SEO object
*/
Config.setSEO = function(list) {
  Meteor.call('insertPathSEO', list, Config, function(err, res) {
    if(err) {
      console.log(err);
      return;
    }
  });
}

/**
*@desc Updates SEO for a saved path.
*@param path - saved path
*@param options - SEO Object
*/
Config.updateSEO = function(path, options) {
  let self = this;
  options = (options !== null) ? options : {};
  Meteor.call('findPath', path, options, function(err, res) {
    if(err) {
      console.log(err);
      return;
    }
    for (let key in options) {
      if (options.hasOwnProperty(key)) {
        res[key] = options[key];
      }
    }
    Meteor.call('insertPathSEO', {[path]: res}, function(err, res) {
      if(err) {
        console.log(err);
        return;
      }
    });
  });
}

this.IronRouterSEO = Config;
