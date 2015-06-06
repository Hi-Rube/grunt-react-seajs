/*
 * grunt-react-seajs
 * https://github.com/Hi-Rube/grunt-react-seajs
 *
 * Copyright (c) 2015 Rube
 * Licensed under the MIT license.
 */

'use strict';
var UglifyJS = require("uglify-js");
var glob = require("glob");
var fs = require("fs");
var path = require("path");
var cwd = process.cwd() + "/";
module.exports = function (grunt) {

    grunt.registerMultiTask('react_seajs', 'a plugin to translate react components to seajs modules', function () {
        var config = grunt.file.readJSON(cwd + this.data.config_file);
        config.merge = config.merge || [];
        for (var mergeIndex = 0; mergeIndex < config.merge.length; mergeIndex++) {
            var configS = config.merge[mergeIndex];
            if (typeof (configS.file) == "undefined" || typeof (configS.target) == "undefined") {
                grunt.log.error("can't know what file want to be merged at " + mergeIndex + " config");
                continue;
            }
            var filesMerge = [];
            configS.file.forEach(function (item) {
                item = cwd + item;
                var mg = glob(item, {mark: true, sync: true});
                filesMerge = filesMerge.concat(mg);
            });
            var result = UglifyJS.minify(filesMerge);
            result.code = "define(function(require,exports,modules){" + result.code + "});";
            fs.writeFileSync(cwd + configS.target, result.code, {encoding: 'utf8'});
        }

        config.single = config.single || [];
        for (var singleIndex = 0; singleIndex < config.single.length; singleIndex++) {
            var configS = config.single[singleIndex];
            if (typeof (configS.file) == "undefined" || typeof (configS.target) == "undefined") {
                grunt.log.error("can't know what file want to be moved at " + mergeIndex + " config");
                continue;
            }
            var filesSingle = [];
            configS.file.forEach(function (item) {
                item = cwd + item;
                var mg = glob(item, {mark: true, sync: true});
                filesSingle = filesSingle.concat(mg);
            });
            filesSingle.forEach(function (item) {
                var result = UglifyJS.minify(item);
                result.code = "define(function(require,exports,module){" + result.code + "});";
                fs.writeFileSync(cwd + configS.target + path.basename(item), result.code, {encoding: 'utf8'});
            });
        }
    });

};
