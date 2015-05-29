/*
 * grunt-react-seajs
 * https://github.com/root/grunt-react-seajs
 *
 * Copyright (c) 2015 Rube
 * Licensed under the MIT license.
 */

'use strict';
var UglifyJS = require("uglify-js");
var fs = require("fs");
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
            configS.file = configS.file.map(function (item) {
                item = cwd + item;
                return item;
            });

            var result = UglifyJS.minify(configS.file);
            result.code = "define(function(require,exports,modules){" + result.code + "});";
            fs.writeFileSync(cwd + configS.target, result.code, {encoding: 'utf8'});
        }
    });

};
