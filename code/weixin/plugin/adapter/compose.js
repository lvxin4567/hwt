'use strict';
var through = require('through2');
var adapterWx = require("./tools/adapter")

module.exports = function(...component) {
  return function(opts) {
    let adapter = adapterWx(...component)(opts);
    return through.obj(function(file, encoding, callback) {
      var newFile = null;
      var err = null;
      try {
        newFile = adapter(file);
      } catch (e) {
        err = e;
      }
      callback(err, newFile);
    });
  };
};