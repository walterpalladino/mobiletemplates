
//	UTF8 Encode / Decode functions
UTF8 = {
		encode: function( s )
		{
			return unescape( encodeURIComponent( s ) );
		},
		decode: function( s )
		{
			return decodeURIComponent( escape( s ) );
		}
};
