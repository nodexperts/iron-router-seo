Meteor.methods({

    /**
    *@desc find saved path SEO document
    *@param path - saved path
    */
    findPath(path) {
       try {
         check(path, String);
         return IronRouterPaths.findOne({
           route_name: path
         });
       } catch(err) {
         throw new Meteor.Error(err.message);
       }
   }
})
