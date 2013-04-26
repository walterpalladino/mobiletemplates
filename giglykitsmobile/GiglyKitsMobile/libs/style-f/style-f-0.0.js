$(document).ready(function() {

console.log('setting...');

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

console.log('done');

});