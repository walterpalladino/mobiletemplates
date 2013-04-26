//	Global logger
var log = log4javascript.getDefaultLogger();

var app = {

	init: function () {
	
		DeviceUtils.init();


		console.log(DeviceUtils.getDevice(true));
		console.log(DeviceUtils.getWindowHeight());
		console.log(DeviceUtils.getWindowWidth());
		
		rssReaderDao.init();
		rssReader.init();
		
		Navigation.init();
		navigationEvents.init();
		Presentation.init();
		
//		rssReader.showRssFeeds();
		

//		$("div").delegate ('.bgtransparent', 'click', function(e){ e.stopPropagation(); });

		Navigation.setPage('presentation-list');
		
		//	Foldable
		$('body').delegate ('.list-group-header', 'click', function () {

			if ($(this).parent().find('.list-data').hasClass('vissible')) {
			
				$(this).removeClass('open');
				$(this).addClass('closed');

				$(this).parent().find('.list-data').removeClass('vissible');
				$(this).parent().find('.list-data').addClass('hidden');
			} else {
			
				$(this).removeClass('closed');
				$(this).addClass('open');

				$(this).parent().find('.list-data').removeClass('hidden');
				$(this).parent().find('.list-data').addClass('vissible');
			}

		} );

	}
};


