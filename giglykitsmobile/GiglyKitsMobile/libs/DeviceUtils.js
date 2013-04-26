//	Device functions
DeviceUtils = {

	_width: null,
	_height: null,
	
	_orientation: null,
	_aspect: null,

	init : function () {
	
		this._width		= this.getWindowWidth();
		this._height	= this.getWindowHeight();
		
		this._aspect = this._width / this._height;
		
		this._orientation = (this._aspect > 1.0) ? 'landscape' : 'portrait';
		
		console.log('_width : ' + this._width);
		console.log('_height : ' + this._height);
		console.log('_aspect : ' + this._aspect);
		console.log('_orientation : ' + this._orientation);
		
	},
	
	getWindowHeight : function() {
		var windowHeight = 0;
		if (typeof(window.innerHeight) == 'number') {
			windowHeight = window.innerHeight;
		} else {
			if (document.documentElement && document.documentElement.clientHeight) {
				windowHeight = document.documentElement.clientHeight;
			} else {
				if (document.body && document.body.clientHeight) {
					windowHeight = document.body.clientHeight;
				}
			}
		}
		return windowHeight;
	},



	getWindowWidth : function() {
		var windowWidth = 0;
		if (typeof(window.innerHeight) == 'number') {
			windowWidth = window.innerWidth;
		} else {
			if (document.documentElement && document.documentElement.clientWidth) {
				windowWidth = document.documentElement.clientWidth;
			} else {
				if (document.body && document.body.clientWidth) {
					windowWidth = document.body.clientWidth;
				}
			}
		}
		return windowWidth;
	},
	

	getDevice : function(debug) {
		if (debug) {
			console.log('navigator.userAgent : ' + navigator.userAgent);
			console.log('navigator.platform : ' + navigator.platform);
		}
/*
		if (Ext.os.is.Desktop) {
			if (debug) {
				console.log("desktop");
			}
			return 'desktop';
		}
	*/		
		var ismobile = (/iphone|ipod|android|blackberry|opera mini|opera mobi|skyfire|maemo|windows phone|palm|iemobile|symbian|symbianos|fennec/i
				.test(navigator.userAgent.toLowerCase()));
		var istablet = (/ipad|android 3|sch-i800|playbook|tablet|kindle|gt-p1000|sgh-t849|shw-m180s|a510|a511|a100|dell streak|silk|galaxy_tab/i
				.test(navigator.userAgent.toLowerCase()));

		if (istablet) {
			if (debug) {
				console.log("Tablet Browser");
			}
			return 'tablet';
		}
		if (ismobile) {
			if (debug) {
				console.log("Mobile Browser");
			}
			return 'phone';
		}

		if (debug) {
			console.log('could not be identified');
		}
		return 'unknown';
	}
};


