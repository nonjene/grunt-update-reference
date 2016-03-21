
var version = require( "../lib/version" );
var util = require( "../lib/util" );

module.exports = function ( grunt ) {
    grunt.loadNpmTasks( 'grunt-newer' );

    /**
     * @taskName   任务reference_core的任务名,为何要搞多一个呢,因为用来骗grunt-newer识别并纪录时间戳, 保证不同的任务区分开来,
     *             使用不同的时间戳. 避免grunt的一种使用情况下引起newer's bug
     */
    grunt.registerMultiTask( "reference", "bust cache via updating the timestamp of the reference in a file like html,css,js", function () {
        var opt = this.options( {
            newer: true,
            searchFileType: [ "*.html", "*.js", "*.css" ],
            log:"simple"
        } );
        var newer = opt.newer?"newer:":"";
        var taskName = this.target+opt.searchPathBase.replace( /\.|\//g, "_" );
        var oKey = {};
        oKey[ taskName ] = this.data;
        oKey[ taskName ].options = opt;

        //配置将克隆到reference_core
        grunt.config.merge( {
            reference_core: oKey
        } );
        //grunt.log.writeln( "Preparing TO Check New Files...".cyan );
        grunt.task.run( [ newer+"reference_core:" + taskName ] );
    });

    grunt.registerMultiTask( "reference_core", "handle all file", function () {
        var opt = this.options();
        var searchPathBase = opt.searchPathBase;
        var searchFileType = opt.searchFileType;
        var searchIgnore = [];
        var newFileName = [];

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
            opt.log!=="none"&&grunt.log.writeln( "File newer: " + fileDir.cyan );
            newFileName.push( fileDir.split( "/" ).slice( -1 ).toString() );
        } );
        //console.log( path)
        if ( newFileName.length === 0 ) {
            return grunt.log.writeln( "No Changed File" + searchPathBase.green );
        }
        version.upd( searchPathBase, newFileName, searchFileType, searchIgnore, opt.referenceIgnore, opt.log );

    } );


};