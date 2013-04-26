/*

'http://www.adornandomisrecuerdos.blogspot.com.ar/feeds/posts/default?alt=rss'
'http://www.adornandomisrecuerdos.blogspot.com.ar/feeds/posts/default/-/Calendario?alt=rss'
'http://www.adornandomisrecuerdos.blogspot.com.ar/feeds/posts/default/-/Tutoriales?alt=rss'

'http://ajax.googleapis.com/ajax/services/feed/load?v=2.0&num=10&q=' + url ;  

*/

var rssReaderDao = {

	data: null,
	sources: null,
	lastIndex: -1,
	
	init : function () {
		console.log('rssReaderDao : init');
	},
	
	read : function (url, callback) {
		console.log('rssReaderDao : read');
		Messages.showLoadingMessage();
		
		var localUrl = 'http://ajax.googleapis.com/ajax/services/feed/load?v=2.0&num=10&q=' + url ;
	
		$.ajax({
			url: localUrl,
			data: "nocache=" + Math.random(),
			type: "GET",
			dataType: "jsonp",
			success: function(result){
				
				rssReaderDao._readSuccess(result);
				if ($.isFunction(callback)) callback();
				
				Messages.hideLoadingMessage();
				
			},
			error: rssReaderDao._readError
		});	
	
	},
	
	_readSuccess : function (result) {
	
		console.log('rssReaderDao : readSuccess : Success');
		console.log(result);
		rssReaderDao.data = result;

	},
	
	_readError : function (result) {
	
		console.log('rssReaderDao : _readError : Error');
		console.log(result);
		Messages.hideLoadingMessage();
	}	
};



