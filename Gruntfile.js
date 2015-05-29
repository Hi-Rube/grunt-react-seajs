/*
 * grunt-react-seajs
 * https://github.com/root/grunt-react-seajs
 *
 * Copyright (c) 2015 Rube
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        react_seajs: {
            default_options: {
                config_file: "./grs_config.json"
            }
        }
    });

    grunt.loadTasks('tasks');
    grunt.registerTask('test', ['react_seajs']);

};
