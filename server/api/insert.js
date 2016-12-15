Meteor.methods({
    /**
    * @desc To Insert or update SEO for a path
    * @param list - which has path and tags for that path
    * @param config - deafault SEO object
    */
    insertPathSEO(list, config) {
       try {
         var pathSEO;
         for(var path in list) {
           check(path, String);
           pathSEO = (list[path] !== null) ? list[path]: {};
           var pathDocument = IronRouterPaths.findOne({
             route_name: path
           });
           pathSEO = generateSEOObject(pathSEO, config);
           if(typeof pathDocument === 'undefined') {
             IronRouterPaths.insert(pathSEO);
           } else {
             IronRouterPaths.update(
                  {
                        _id: pathDocument._id
                  },
                  pathSEO,
                  {
                      upsert: true
                  }
              );
           }
         }

       } catch(err) {
         throw new Meteor.Error(err.message);
       }
   }
})

/**
*@param pathSEO - SEO object of path
*@param config - default SEO
*/
function generateSEOObject(pathSEO, config) {
  for(var index in config) {
    if(index === "auto") {
      continue;
    }
    if(! pathSEO.hasOwnProperty(index)) {
      pathSEO[index] = config[index];
    } else {
      if(index === 'meta' || index === 'og' || index === 'twitter') {
        for(var index2 in config[index]) {
          if(! pathSEO[index].hasOwnProperty(index2)) {
            var pathField = pathSEO[index],
                configField = config[index];
            pathField[index2] = configField[index2];
          }
        }
      }
    }
  }
  return pathSEO;
}
