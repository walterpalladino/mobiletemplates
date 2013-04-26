var Messages = {

	showLoadingMessage : function () {
		console.log('Show Loading Message');
		
		//	Modal
		$('#bgtransparent').remove();
		
		var loadingMessage = 'Loading...';
		
		var bgdiv	= $("<div></div>")
						.addClass("bgtransparent")
						.addClass("message")
						.attr("id", "bgtransparent")
						.append(loadingMessage);
		/*var bgdiv = '<div class="bgtransparent message" id="bgtransparent">' + loadingMessage + '</div>';*/
		//	Add a new div to the page
		$('body').append(bgdiv);
		
		// obtenemos ancho y alto de la ventana del explorer
		var wscr = $(window).width();
		var hscr = $(window).height();
		
		// Set background dimensions
		$('#bgtransparent').css("width", wscr);
		$('#bgtransparent').css("height", hscr);
		
		
	},
	
	hideLoadingMessage : function () {
		console.log('Hide Loading Message');
		
		//Modal
		$('#bgtransparent').remove();
		
	}
};