// hbs template plugin for requirejs / text.js
// it loads and compiles Handlebars templates

define([
  'handlebars'
],

function (Handlebars) {

  'use strict';

  var loadResource = function (resourceName, parentRequire, callback, config) {
    parentRequire([("text!" + resourceName + ".html")], function (templateContent) {
      callback(Handlebars.compile(templateContent));
    });
  };

  return {
    load: loadResource
  };

});
