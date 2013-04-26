var Presentation = {

	/*
	*	Description : Initialization tasks
	*/
	init : function () {
		console.log('Presentation : init');
		Presentation._initListeners();
	},	

	
    /*
     * 	Description: Show image carousel
     *
     */
    _show: function () {
		console.log ('Presentation : _show');
		
		var data = PresentationDao.getLocalData();
//		console.log(data)

		var panels = [];
		for (var n in data){
			var html = '<img src="' + data[n] + '">';
			panels.push(html);
		}
		/*
		panels.push('<img src="images/carousel/HadasG45.png" style="width:240px;">');
		panels.push('<img src="images/carousel/PopcornGift.jpg" style="width:240px;">');
		panels.push('<img src="images/carousel/MagicofOzCling.jpg" style="width:240px;">');
		*/
		Carousel.init('image-list', panels);
		
    },
	
	
	_initListeners : function () {
		console.log('Presentation : _initListeners');
		
		$('body').delegate('#presentation-list','pageshow', function () {
			console.log('#presentation-list pageshow');
			Presentation._show();
		});
		
		$('body').delegate('.carousel-panel','tap', function () {
			console.log('.carousel-panel tap');
		});
		
		
	}
	
	
};
