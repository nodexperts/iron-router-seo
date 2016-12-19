Package.describe({
  name: 'nodexpert:iron-router-seo',
  version: '1.0.1',
  summary: 'Config SEO for your apps using iron-router routes',
  git: 'https://github.com/nodexperts/iron-router-seo.git',
  documentation: 'README.md'
});


Package.onUse(function(api){

  api.versionsFrom('1.0');

  api.use(['mongo', 'ecmascript@0.6.1', 'underscore', 'spiderable']);

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
