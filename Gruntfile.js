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
        }
    } );

    grunt.registerTask( "default", function () {
        console.log( "hello world" );
    } );
    grunt.loadTasks('./tasks');
    //grunt.loadNpmTasks('grunt-newer');
};