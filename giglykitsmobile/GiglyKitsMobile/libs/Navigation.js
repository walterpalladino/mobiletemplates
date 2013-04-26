var Navigation = {

	//	Stack used to hold navigation history
	navigationStack: null,
	//	Stores actual Page
	actualPage: null,
	
	init : function (page) {
		navigationStack	= new Stack();
//		Navigation.setPage(page);
	},
	
	clear : function () {
		console.log('clearNavigationStack');
		navigationStack.clear();
	},
	/*
	resetNavigationStack : function () {
		console.log('clearNavigationStack');
		
		var firstPage = null;
		while (navigationStack.stack.length > 1) { navigationStack.pop(); }
	},
*/
	_popPage : function () {
		return navigationStack.pop();
	},
	
	_pushPage : function (page) {
		console.log('Previous Page : ' + navigationStack.sniff());
		if (navigationStack.sniff() !== page) {
			navigationStack.push(page);
		}
		console.log(navigationStack.stack);
	},
	
	_sniffLastPage : function () {
		return navigationStack.sniff();
	},

	getActualPage : function () {
		return Navigation._sniffLastPage();
	},
	
	/*
	
	//Get
var p = $("#elementId");
var offset = p.offset();

//set
$("#secondElementId").offset({ top: offset.top, left: offset.left})
	
	*/
	changePage : function (newPage) {
	
		console.log('Navigation : changePage ' + newPage);
		console.log(Navigation.getActualPage());
/*		
//		if (Navigation.getActualPage() !== null) {
			console.log('Navigation.getActualPage() : ' + Navigation.getActualPage() );
			$('#' + Navigation.getActualPage()).fadeOut(500, function () {
				console.log('Leaving the actual page...' + newPage);
				$('#' + newPage).addClass('hidden');
				
		
			});
	//	}
//		console.log($(newPage));
//		$(newPage).width(0);

				$('#' + newPage).fadeIn(500, function () {
					console.log('Moving to the new page...');
					//$(newPage).animate({ width: "100%" }, 2000);
					$(this).removeClass('hidden');
					Navigation.setActualPage(newPage);
				});
*/
		var oldPage = Navigation.getActualPage();
		$('#' + oldPage).fadeOut(500);
		$('#' + oldPage).addClass('hidden');
		Navigation._pushPage(newPage);
		console.log(Navigation.getActualPage());
		$('#' + newPage).removeClass('hidden');
		$('#' + newPage).fadeIn(500);
		
		$('#' + newPage).trigger('pageshow');
	},
	
	setPage : function (newPage) {
		console.log('Navigation.setPage()');
		
		var oldPage = Navigation.getActualPage();
		console.log(oldPage);
		$('#' + oldPage).fadeOut(500);
		$('#' + oldPage).addClass('hidden');
		
		Navigation.clear();
		Navigation._pushPage(newPage);
		console.log(Navigation.getActualPage());
		$('#' + newPage).removeClass('hidden');
		$('#' + newPage).fadeIn(500);

		$('#' + newPage).trigger('pageshow');
		
	},
		
	back : function () {
		console.log('Navigation : back ');
		console.log(navigationStack.stack);
		console.log(Navigation.getActualPage());
		console.log(navigationStack.stack);
		
		if (Navigation.getActualPage() !== null) {
			console.log('Navigation.getActualPage() : ' + Navigation.getActualPage() );
			var oldPage = Navigation._popPage();
			console.log(oldPage);
			$('#' + oldPage).fadeOut(500);
			$('#' + oldPage).addClass('hidden');
		}
		
		var newPage = Navigation.getActualPage();
		
		$('#' + newPage).removeClass('hidden');
		$('#' + newPage).fadeIn(500);
		console.log(navigationStack.stack);
		
	}
	
	
/*

	changePage : function (newPage) {
	
		console.log('Navigation : changePage ' + newPage);
		
		if (Navigation.getActualPage() !== null) {
			console.log('Navigation.getActualPage() : ' + Navigation.getActualPage() );
			$(Navigation.getActualPage()).fadeOut(500);
		}
//		console.log($(newPage));
//		$(newPage).width(0);
		var offset = $(newPage).offset();
		console.log(offset);
		$(newPage).offset({ top: '0', left: '1000'});
		$(newPage).removeClass('hidden');
		console.log($(newPage).offset());

		//$(newPage).animate({ width: "100%" }, 2000);
		$(newPage).animate({ left: '-=1000' }, 1000);
			console.log($(newPage).offset());
			
		$(newPage).fadeIn(500);
	
		Navigation.setActualPage(newPage);
	}


*/


};
