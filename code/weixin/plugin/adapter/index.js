var compose = require('./compose');
var logger = require('gulplog');
var uglify = require("uglify-js")
var jsonmin = require("json-min-max");
var zip = require("./tools/zip");

module.exports = function(opts) {
  return compose(
    logger,
    uglify,
    jsonmin,
    zip
  )(opts);
};