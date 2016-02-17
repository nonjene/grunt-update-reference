'use strict';
var fs = require('fs');
module.exports = function ( grunt ) {

//reference
    grunt.initConfig( {
        reference: {
            options:{
                searchFileType: [ "html", "css", "js" ],
                ignoreSearchFile:"",
                ignoreSearchPath:""

            },
            dist: {
                options: {
                    searchPathBase: "./test"

                },
                src: [ "test/**/*.{css,js,jpg,png,gif}" ]
            }
        },
        test:{
            options: {
                searchFileType: [ "html", "css", "js" ],
                ignoreSearchFile: "",
                ignoreSearchPath: ""

            },
            dist: {
                options: {
                    searchPathBase: "./test"

                },
                src: [ "test/**/*.{css,js,jpg,png,gif}" ]
            }
        }
    } );

    grunt.registerMultiTask( "test", function () {
        console.dir(this)
    } );
    grunt.loadTasks('./tasks');
    grunt.loadNpmTasks('grunt-newer');
};