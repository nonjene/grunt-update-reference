'use strict';

module.exports = function ( cont,limit ) {
    var crypto = require( 'crypto' );

    var hash = crypto.createHash( 'md5' );

    return hash.update( cont ).digest( 'hex' ).slice( 0, limit )

};