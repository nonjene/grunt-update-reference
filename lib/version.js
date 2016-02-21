
var grunt = require( "grunt" );
var util = require( "./util" );

/**
 *
 * @param path          string  匹配范围的路径
 * @param newFileName   array   那些有更新的文件的文件名
 * @param fileType      Minimatch   那些需要检测内容是否含有"newFileName"的文件的文件类型
 * @param ignore        Minimatch   these files or paths will ignore
 *
 */
module.exports.upd = function ( path, newFileName, fileType, ignore ) {
    var regLineHeadSpace = /^ +/;
    var nowTime = new Date().getTime();
    var realTimeNewFileName = [];   //添加时间戳过程中,把被修改的文件也加入加戳列表;

    var doIt = function ( newFileName, logDeco ) {
        logDeco = logDeco||"";
        function log( str ) {
            grunt.log.writeln( logDeco + str);
        }

        log( "scan files in "+ path.green );
        grunt.file.recurse( path, function ( abspath, rootdir, subdir, filename ) {

            if(grunt.file.match( { matchBase: true }, ignore, abspath ).length>0){return}
            if(grunt.file.match( { matchBase: true }, fileType, filename ).length===0){return}

            var i;
            var flagIsHit = false;
            var contents = grunt.file.read( abspath );

            for ( i in newFileName ) {
                var regx = new RegExp( "(?!\\n|\\r\\n*)(.+)" + "(" + newFileName[ i ] + "[^\"|\'|\\)]*)(?=\"|\'|\\))(.*)", "g" );
                log( "check '" + newFileName[ i ].blue + "' in " + filename.yellow );

                contents = contents.replace( regx, function () {
                    var arg = grunt.util.toArray( arguments );
                    var thatLine = arg[ 0 ].replace( regLineHeadSpace, "" );
                    var targetReplace = util.setParam( "t", nowTime, arg[ 2 ] );

                    log( "in file " + filename.yellow + " replace:" );
                    log( "    " + thatLine.blue );
                    log( "--->".yellow );
                    log( "    " + thatLine.replace( arg[ 2 ], targetReplace ).cyan );

                    flagIsHit = true;

                    return arg[ 1 ] + targetReplace + arg[ 3 ];
                } )
            }

            //避免没有实际更新时也重写文件,导致newer失效
            if ( flagIsHit ) {
                grunt.file.write( abspath, contents );

                if ( newFileName.indexOf( filename ) < 0 && realTimeNewFileName.indexOf(filename)<0 ) {
                    log( "File " + filename.yellow + " instantly changed, rescan path." );
                    realTimeNewFileName.push( filename );
                    return doIt([ filename ], logDeco+"+\t");
                }
            }


        } );



    }

    doIt( newFileName );
}