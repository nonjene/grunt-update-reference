
var version = require( "../lib/version" );

module.exports = function ( grunt ) {
    function convertMatcher( tar ) {
        var kind = grunt.util.kindOf( tar );
        if ( kind === "array" ) {
            return new RegExp( tar.join( "|" ) );
        }else if(kind === "string"){
            return new RegExp( tar );
        }
        return tar;
    }
    grunt.registerMultiTask( "reference", "bust cache via updating the timestamp of the reference in a file like html,css,js", function () {
        var opt = this.options();
        var searchPathBase = opt.searchPathBase;
        var searchFileType = convertMatcher(opt.searchFileType || /htm|css|js/);
        var ignoreSearchFile = convertMatcher(opt.ignoreSearchFile || /Gruntfile|(^\.)/);
        var ignoreSearchPath = convertMatcher(opt.ignoreSearchPath || /node_modules|(^\.)/);
        var newFileName = [];

        if(!searchPathBase){
            searchPathBase = "./";
            grunt.log.writeln('warn: property "searchPathBase" was not set, the searching path will be the root of project.'.yellow)
        }

        this.filesSrc.forEach( function ( fileDir ) {
            grunt.log.writeln( "File Changed: " + fileDir.cyan );
            newFileName.push( fileDir.split( "/" ).slice( -1 ).toString() );
        } );
        //console.log( path)
        if ( newFileName.length === 0 ) {
            return grunt.log.writeln( "No Changed File" + searchPathBase.green );
        }
        version.upd( searchPathBase, newFileName, searchFileType, ignoreSearchFile, ignoreSearchPath );

    } );


};