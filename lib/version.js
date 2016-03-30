
var grunt = require( "grunt" );
var util = require( "./util" );

/**
 *
 * @param path          string  匹配范围的路径
 * @param newFileName   array   那些有更新的文件的文件名
 * @param fileType      Minimatch   那些需要检测内容是否含有"newFileName"的文件的文件类型
 * @param pathIgnore        Minimatch   these files or paths will ignore
 * @param instantChangeFileIgnore     Minimatch   ignore instant change react if match this.
 * @param logPriority     string   "simple","none","all"
 *
 */
module.exports.upd = function ( path, newFileName, fileType, pathIgnore, instantChangeFileIgnore, logPriority ) {
    var regLineHeadSpace = /^ +/;
    var nowTime = new Date().getTime();
    var realTimeNewFileName = [];   //添加时间戳过程中,把被修改的文件也加入加戳列表;
    //console.time("all");
    var doIt = function ( newFileName, logDeco ) {
        logDeco = logDeco||"";
        function log( str ) {
            grunt.log.writeln( logDeco + str);
        }
        function logAll(str){
            if( logPriority==="all"){
                return log( str );
            }
        }

        function logSimple( str ) {
            if ( logPriority==="simple" ) {
                grunt.log.writeln( str );
            }
        }

        logAll( "Scan changed files' reference in "+ path.green );
        grunt.file.recurse( path, function ( abspath, rootdir, subdir, filename ) {

            if(grunt.file.match( { matchBase: true }, pathIgnore, abspath ).length>0){return}
            if(grunt.file.match( { matchBase: true }, fileType, abspath ).length===0){return}

            var flagIsHit = false;
            var contents = grunt.file.read( abspath );

            newFileName.forEach( function ( oneFile ) {
                var regx = new RegExp( "(?!\\n|\\r\\n*)(.+[\'|\"|\\(].+)" + "(" + oneFile + "[^\"|\'|\\|\\n|\\r\\n| ]*)(?=\"|\'|\\))(.*)", "g" );

                contents = contents.replace( regx, function () {
                    var arg = grunt.util.toArray( arguments );
                    var thatLine = arg[ 0 ].replace( regLineHeadSpace, "" );
                    var targetReplace = util.setParam( "t", nowTime, arg[ 2 ] );

                    logSimple( "refresh " + oneFile.blue + "'s reference in " + filename.yellow );

                    logAll( "in file " + filename.yellow + " replace:" );
                    logAll( "    " + thatLine.blue );
                    logAll( "--->".yellow );
                    logAll( "    " + thatLine.replace( arg[ 2 ], targetReplace ).cyan );

                    flagIsHit = true;

                    return arg[ 1 ] + targetReplace + arg[ 3 ];
                } )
            });

            //避免没有实际更新时也重写文件,导致newer失效
            if ( flagIsHit ) {
                grunt.file.write( abspath, contents );

                //ignore
                if( instantChangeFileIgnore && grunt.file.match( { matchBase: true }, instantChangeFileIgnore, filename ).length > 0){
                    return;
                }

                if ( newFileName.indexOf( filename ) < 0 && realTimeNewFileName.indexOf(filename)<0 ) {
                    logAll( "File " + filename.yellow + " instantly changed, rescan path." );
                    realTimeNewFileName.push( filename );
                    return doIt([ filename ], logDeco+"+\t");
                }
            }


        } );



    };

    doIt( newFileName );
    //console.timeEnd( "all" );
};