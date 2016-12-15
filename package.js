Package.describe({
  name: 'mykej:iron-router-seo',
  version: '1.0.0',
  summary: 'Simple SEO for iron-router for your Meteor apps.',
  git: '',
  documentation: 'README.md'
});


Package.onUse(function(api){

  api.versionsFrom('1.0');

  api.use(['mongo', 'ecmascript', 'underscore', 'spiderable']);

  api.use([
    'iron:router@1.0.0'
  ]);

  api.use([
    'jquery',
    'deps'
  ], 'client');

  api.addFiles([
    'lib/collection.js'
  ]);

  api.addFiles([
    'server/api/insert.js',
    'server/api/find.js',
    'server/publish.js'
  ], 'server');

  api.addFiles([
    'client/iron-router-seo.js',
    'client/setter.js'
  ], 'client');

});
