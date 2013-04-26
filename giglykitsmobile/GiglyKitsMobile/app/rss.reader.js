/*

*/

var rssReader = {

	sources: null,
	lastIndex: null,
	
	init : function () {
		console.log('rssReader : init');
		
		this.sources = Array();
		this.sources.push('http://www.adornandomisrecuerdos.blogspot.com.ar/feeds/posts/default?alt=rss');
		this.sources.push('http://www.adornandomisrecuerdos.blogspot.com.ar/feeds/posts/default/-/Calendario?alt=rss');
		this.sources.push('http://www.adornandomisrecuerdos.blogspot.com.ar/feeds/posts/default/-/Tutoriales?alt=rss');
		
		rssReader._initListeners();
	},
	
	showRssFeeds : function (index) {
		console.log('rssReader : showRssFeeds');
		console.log('index : ' + index);
		if (!index) {
			if (!this.lastIndex) {
				this.lastIndex = 0;
			}
		} else {
			this.lastIndex = index;	// Check max entries
		}
		console.log('this.lastIndex : ' + this.lastIndex);

		rssReaderDao.read(this.sources[this.lastIndex], rssReader._showRssFeedsCallback);

	},
	
	_showRssFeedsCallback : function () {
		console.log('rssReader : _showRssFeedsCallback');
		
		rssReader._show(rssReaderDao.data);
		Navigation.changePage('feeds-list');
		
	},
	
	_show : function (data) {
		console.log('rssReader : _show');

		$('#feeds-list .content').empty();
		
		var html = '';
		
//		html += '<div id="main-list" class="list-data">';
			
//		html += '<div class="list-item list-header rss-feed-list-header"><h1>' + data.responseData.feed.title + '</h1>' + data.responseData.feed.description + '</div>';
//		var template = '<h1 class="rss-feed-list-element-title">{{title}} {{publishedDate}}</h1>{{contentSnippet}}';

		var templateLoop = '';
		templateLoop += '<div id="main-list" class="list-data">';
		templateLoop += '  <div class="list-item list-header rss-feed-list-header"><h1>{{feedTitle}}</h1>{{feedDescription}}</div>';
		templateLoop += '  {{#entries}}';
		templateLoop += '  <div index="{{index}}" class="list-item rss-feed-list-feed">';
		templateLoop += '    <h1 class="rss-feed-list-element-title">{{entry.title}} {{entry.publishedDate}}</h1>{{entry.contentSnippet}}';
		templateLoop += '  </div>';
		templateLoop += '  {{/entries}}';
		templateLoop += '</div>';

		
		var entries = data.responseData.feed.entries;

		var entriesArray = [];
		for (idx in entries) {
			entriesArray.push ({'index': idx, 'entry': entries[idx]});
		}
		console.log(entriesArray);
		var feedsList = new Object();
		feedsList.entries = entriesArray;
		feedsList.feedTitle = data.responseData.feed.title ;
		feedsList.feedTitle = data.responseData.feed.description ;
		
		/*
		for (var n in entries) {
		
			var row = Mustache.to_html(template, entries[n]);
		
			html += '<div index="' + n + '" class="list-item">' + row + '</div>';
		}
		*/
		/*
		for (var n in entriesArray) {
		
			html += Mustache.to_html(templateLoop, entriesArray[n]);
		
//			html += '<div index="' + n + '" class="list-item">' + row + '</div>';
		}
*/	
		html += Mustache.to_html(templateLoop, feedsList);

//		html += '</div>';

		$('#feeds-list .content').append(html);
		
		
		Messages.hideLoadingMessage();

	
	},
	
	_showDetail : function (index) {
	
		$('#feeds-detail .content').empty();
		var html = '';
		html += rssReaderDao.data.responseData.feed.entries[index].content;

		//console.log(html);
		$('#feeds-detail .content').append(html);
				$('#feeds-detail .content').find('img').each(function () {
			console.log(this);
			var width = $(this).width();
			width = DeviceUtils.getWindowWidth() * 80.0 / 100.0;
			console.log('XXXXX ' + width);
			
			if ($(this).width() > width) {
				$(this).removeAttr('width')
				$(this).removeAttr('height');
				
				$(this).attr( 'style', 'width:100%; max-width:' + width + 'px;');
			}
			
		});
	},
	
	_initListeners : function () {
	
		//	Events
		$('#feeds-select').delegate('.list-item','click', function () {
			console.log('.list-item click ' + $(this).attr('id'));
			
			rssReader.showRssFeeds($(this).attr('id'));
		});

		//	Navigate to list page
		$('#feeds-detail').delegate('.icon-back','click', function () {
			console.log('icon-back click');
			
			Messages.showLoadingMessage();
			rssReader._show(rssReaderDao.data);
			Navigation.changePage('feeds-list');
			Messages.hideLoadingMessage();
			
		});
		
		
		/*
		SlideDown: .animate({ height: 'show' }); 
SlideUp: .animate({ height: 'hide }); 
SlideRight: .animate({ width: 'show' }); 
SlideLeft: .animate({ width: 'hide' });
		*/
		//	Navigate to detail page
		$('#feeds-list').delegate('#main-list .list-item','click', function () {
			console.log('.list-item click');
			console.log(' index ' + $(this).attr('index'));
			
			if ($(this).attr('index') !== undefined) {
			
				Messages.showLoadingMessage();
				rssReader._showDetail ($(this).attr('index'));
				Navigation.changePage('feeds-detail');
				Messages.hideLoadingMessage();
			}
			
		});
		
		
		
	}
	
};



