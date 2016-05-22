'use strict';
module.exports = function ( grunt ) {

//reference
    grunt.initConfig( {
        reference: {
            options:{
                searchFileType: [ "*.html", "*.js", "*.css" ],
                searchIgnore:["lib/**/*","tasks/**/*"],
                log:"all"//"none","all"
            },
            dist: {
                options: {
                    searchPathBase: "./test",
                    referenceIgnore:["*.html"]

                },
                src: [ "test/**/*.{css,js,jpg,png,gif}" ]
            }
        },
        test:{
            options: {


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
        //console.dir(this)
        //console.log(grunt.file.match( { matchBase: true },[".*"], ".Gruntfile.js" ).length)

    } );
    grunt.loadTasks('./tasks');
    //grunt.loadNpmTasks('grunt-newer');
};