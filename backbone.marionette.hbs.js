// hbs template plugin for requirejs / text.js
// it loads and compiles Handlebars templates

define([
  'text',
  'handlebars'
],

function (text, Handlebars) {

  'use strict';

  var buildCache = {},
      buildCompileTemplate = 'define("{{pluginName}}!{{moduleName}}", ["handlebars"], function(handlebars) {return handlebars.template({{{fn}}})});',
      buildTemplate;

  var load = function (moduleName, parentRequire, load, config) {

    text.get(parentRequire.toUrl(moduleName + '.html'), function(data) {

      if (config.isBuild) {
        buildCache[moduleName] = data;
        load();
      } else {
        load(Handlebars.compile(data));
      }

    });

  };

  var write = function (pluginName, moduleName, write) {

    if (moduleName in buildCache) {

      if (!buildTemplate) {
          buildTemplate = Handlebars.compile(buildCompileTemplate);
      }

      write(buildTemplate({
        pluginName: pluginName,
        moduleName: moduleName,
        fn: Handlebars.precompile(buildCache[moduleName])
      }));
    }

  };

  return {
    load: load,
    write: write
  };

});
