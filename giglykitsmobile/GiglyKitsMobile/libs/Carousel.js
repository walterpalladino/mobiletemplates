
/*
 *	Custom Carousel 
 */

var Carousel = {

	carouselDiv : null,
	
	draggingDirection : 'none',
	startingX : -1,
	
	prevPanel: -1,
	actualPanel : -1,
	maxPanel : -1,
	
	imgWidth: 6,	// image used for index
	
	panels: null,
	
	/*
	*	Description :	Returns cursor X starting position
	*					Required for mouse compatibility
	*/
	getStartingX: function (e) {
		
		if (!e) e = window.event;

		if (e.originalEvent.touches)
			return e.originalEvent.touches[0].pageX;
		
		if (e.pageX || e.pageY)
			return e.pageX;
		else if (e.clientX || e.clientY)
			return e.clientX + document.body.scrollLeft;
	},
	
	/*
	*	Description :	Returns cursor X current position
	*					Required for mouse compatibility
	*/
	getCurrentX: function (e) {
		
		if (!e) e = window.event;

		if (e.originalEvent.touches)
			return e.originalEvent.changedTouches[0].pageX;
		
		if (e.pageX || e.pageY)
			return e.pageX;
		else if (e.clientX || e.clientY)
			return e.clientX + document.body.scrollLeft;
	},

	/*
	 * Draw icons showing page count and actual
	 */
	_drawIndex: function () {

		var frame = "#" + Carousel.carouselDiv ;
		
//		$(frame + ' #custom-carousel-index').remove();

//		var newDiv	= '<p id="custom-carousel-index" style="text-align:center;">';
//		var newDiv	= '<p id="custom-carousel-index">';

		for (var n = 1; n <= this.maxPanel; n++) {

			var marginClass = '';
			if (n != 1) {
				marginClass = 'style="margin-left:20px;"'
			}
			var iconImage = 'images/carousel/ico_slider_dark.png';
			if (n === this.actualPanel) {
				iconImage = 'images/carousel/ico_slider_light.png';
			}
			newDiv += '<img ' + marginClass + ' src="' + iconImage + '"/>';
		}
		
		newDiv += '</p>';

		$(newDiv).appendTo(frame);

	},
	
	/*
	*	Description	:	Detect mouse down and saves starting X cursosr position
	*/
	_startHandler: function (event) {
		console.log('_startHandler');
		Carousel.startingX = Carousel.getStartingX(event);
		console.log('startingX : ' + Carousel.startingX);
	},
	
	/*
	*	Description	:	Detect mouse up and check if swipe ocurred (mouse version)
	*/
	_stopHandler: function (event) {
		console.log('_stopHandler');
		
		var actualPosX	= Carousel.getCurrentX(event) ;
//		console.log('actualPosX : ' + actualPosX);
//		console.log(actualPosX - Carousel.startingX);
		
		var deltaX = actualPosX - parseInt(Carousel.startingX, 10);
//		console.log('deltaX : ' + deltaX);
		
		//	If there was a minimum mouse movement
		if (Math.abs(deltaX) > 20) {
			
			//	Check the swipe direction
			if (actualPosX > parseInt(Carousel.startingX, 10)) {
				Carousel._swipeRight();
			} else {
				Carousel._swipeLeft();
			}
//					Carousel.drawIndex();
		
		}		
	},
   
	/*
	*	Description	:	Initialization procedures
	*/
	init: function (carouselDiv, panels) {

		this.panels = panels;
		console.log(this.panels);
		this.actualPanel	= -1;
		
		this.maxPanel		= panels.length;
		if (this.maxPanel > 0) {
			this.actualPanel	= 0;
		}
		this.carouselDiv	= carouselDiv ;
		
		$('#' + carouselDiv).empty();

//		$('#' + carouselDiv + ' .carousel-container').position({left:0}) ;
		
//		Carousel._drawIndex();
		Carousel._drawPanel();
		
		//	Check if event exists
/*		$("#" + this.carouselDiv + " .carousel-panel").unbind('mousedown');
		$("#" + this.carouselDiv + " .carousel-panel").unbind('mouseup');
		$("#" + this.carouselDiv + " .carousel-panel").unbind('swipeleft');
		$("#" + this.carouselDiv + " .carousel-panel").unbind('swiperight');*/
		
		if( DeviceUtils.getDevice() === 'unknown'){
				
			$('body').delegate("#" + this.carouselDiv + " .carousel-panel",'mousedown', Carousel._startHandler);
			$('body').delegate("#" + this.carouselDiv + " .carousel-panel",'mouseup', Carousel._stopHandler);
		
        }else{

/*
			$("#" + this.carouselDiv + " .carousel-panel") 
			.swipeleft(function(event){
                console.log('swipeleft');
				Carousel._swipeLeft();
            })
			.swiperight(function(event){
                console.log('swiperight');
				Carousel._swipeRight();
            });*/
			$('body').delegate("#" + this.carouselDiv + " .carousel-panel",'swipeleft', Carousel._swipeLeft);
			$('body').delegate("#" + this.carouselDiv + " .carousel-panel",'swiperight', Carousel._swipeRight);
			
        }
		
	},
	
	/*
	*	Description	:	Processes Panel Swipe Left
	*/
	_swipeLeft : function () {
		console.log('Carousel : _swipeLeft');

		//	Check wich should be the next panel
		var nextPanelIdx = Carousel.actualPanel - 1;
		if (nextPanelIdx < 0) nextPanelIdx = Carousel.panels.length - 1;
		
		//	Get the panel width
		var width = $('#' + Carousel.carouselDiv + ' .carousel-panel').width();
		console.log('panel width : ' + width);
		
		//	Add new Panel to the right
		var newPanel = $("<div></div>").addClass("carousel-panel");
		$(newPanel).append(Carousel.panels[nextPanelIdx]);
		
		$('#' + Carousel.carouselDiv).find('.carousel-panel').after(newPanel) ;
		var offset = $('#' + Carousel.carouselDiv).find('.carousel-panel').offset();
		console.log(offset);
		var height = $('#' + Carousel.carouselDiv + ' .carousel-panel').height();
		$('#' + Carousel.carouselDiv).find('.carousel-panel').last().offset({ top: offset.top + height, left: width});
		
		//	Move both panels left

		$('#' + Carousel.carouselDiv).find('.carousel-panel').last().animate({left:0});
		
		
		//	Remove old panel
		$('#' + Carousel.carouselDiv).find('.carousel-panel').first().remove();
		
		//	Update Actual Panel
		Carousel.actualPanel	= nextPanelIdx;
		
	},
	
	/*
	*	Description	:	Processes Panel Swipe Right
	*/
	_swipeRight : function () {
		console.log('Carousel : _swipeRight');
		
		//	Check wich should be the next panel
		var nextPanelIdx = Carousel.actualPanel += 1;
		if (nextPanelIdx >= Carousel.panels.length) nextPanelIdx = 0;

		//	Get the panel width
		var width = $('#' + Carousel.carouselDiv + ' .carousel-panel').width();
		console.log('panel width : ' + width);
		
		//	Add new Panel to the left
		var newPanel = $("<div></div>").addClass("carousel-panel");
		$(newPanel).append(Carousel.panels[nextPanelIdx]);
		$('#' + Carousel.carouselDiv).find('.carousel-panel').before(newPanel) ;
		var offset = $('#' + Carousel.carouselDiv).find('.carousel-panel').offset();
		$('#' + Carousel.carouselDiv).find('.carousel-panel').first().offset({ top: offset.top, left: -width});
		
//		$("#" + this.carouselDiv).append(newPanel);
		
		//	Move both panels right
		var integer = Carousel.actualPanel;
		
		//	show the right panel
		console.log($('#' + Carousel.carouselDiv) );
		
		$('#' + Carousel.carouselDiv).find('.carousel-panel').each(function () {
			//$(this).animate({left:+width}) ;
			//console.log(this);
		});
		
		$('#' + Carousel.carouselDiv).find('.carousel-panel').last().animate({left:width});
		$('#' + Carousel.carouselDiv).find('.carousel-panel').first().animate({left:0});
		
		
		//	Remove old panel
		$('#' + Carousel.carouselDiv).find('.carousel-panel').last().remove();
		
		//	Update Actual Panel
		Carousel.actualPanel	= nextPanelIdx;
	},
	
	/*
	*	Description	:	Draw a panel
	*/
	_drawPanel : function () {
		console.log('Carousel : _drawPanel');
		
		if (Carousel.prevPanel === -1) {
			var newPanel = $("<div></div>").addClass("carousel-panel");
			$(newPanel).append(Carousel.panels[0]);
			$("#" + this.carouselDiv).append(newPanel);
		} else {
			var actualPanel = $("#" + this.carouselDiv).find('.carousel-panel');
			console.log(actualPanel);
		}
		
	}
	
}

	
