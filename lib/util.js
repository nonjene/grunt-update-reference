/**
 * Created by rean on 15/12/31.
 */

module.exports = exports = {
    getParam: function ( name, href, isHash ) {
        var anchor = isHash ? "#" : "?";
        var regex = new RegExp( "[\\" + anchor + "|\\&]" + name + "=([^\\&|\\#|\\?]+)", "i" );//匹配参数
        var match = regex.exec( href );
        if ( match && match.length > 1 ) {
            return match[ 1 ];//value
        }
        return null;
    },
    setParam: function ( name, val, href, isHash ) {
        var anchor = isHash ? "#" : "?";
        var mod = name + "=" + val;
        var regParam = new RegExp( "(\\" + anchor + "|\\&)" + name + "=?[^\\&|\\#|\\?]*", "i" );//匹配原有的name+属性

        if ( !href.match( regParam ) ) {
            if ( href.match( "\\" + anchor ) ) {
                href = href.replace( anchor, anchor + mod + "&" );
            }
            else {
                href += anchor + mod;
            }
        }
        else {
            href = href.replace( regParam, "$1" + mod );
        }
        return href;

    }
};