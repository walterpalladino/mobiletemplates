
/*
*	Description :	Stores data on local storage the easiest way
*/
var LocalData = {
	
	init : function () {
	},
	
	getLocalData : function (name) {
		return window.localStorage.getItem(name);
	},

	setLocalData : function (name, data) {
		window.localStorage.setItem(name, data);
	}

};