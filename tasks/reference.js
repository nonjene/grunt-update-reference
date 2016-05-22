
var version = require( "../lib/version" );
var util = require( "../lib/util" );
var path = require( 'path' );

module.exports = function ( grunt ) {

    grunt.registerMultiTask( "reference", "bust cache via updating the timestamp of the reference in a file like html,css,js", function () {
        var opt = this.options( {
            searchFileType: [ "*.html", "*.js", "*.css" ],
            log: "simple"
        } );
        var searchPathBase = opt.searchPathBase;
        var searchFileType = opt.searchFileType;
        var searchIgnore = [];
        var newFile = [];

        //
        var optSearchIgnore = opt.searchIgnore || opt.ignore;

        if( optSearchIgnore ){
            util.arrayMerge( searchIgnore, optSearchIgnore )
        }
        util.arrayMerge( searchIgnore, [ "node_modules/**", ".*/**", ".*", "Gruntfile.js" ] );

        if(!searchPathBase){
            searchPathBase = "./";
            grunt.log.writeln('warning: property "searchPathBase" was not set, the searching path will be the root of project.'.yellow)
        }

        this.filesSrc.forEach( function ( fileDir ) {
            opt.log!=="none"&&grunt.log.writeln( "Assets: " + fileDir.cyan );
            newFile.push( {
                dir: fileDir,
                name: fileDir.split( "/" ).slice( -1 ).toString()
            });
        } );
        //console.log( path)
        if ( newFile.length === 0 ) {
            return grunt.log.writeln( "No Assets Detected." + searchPathBase.green );
        }
        version.upd( searchPathBase, newFile, searchFileType, searchIgnore, opt.referenceIgnore, opt.log );

    } );


};