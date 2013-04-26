
//	Date functions
DateUtils = {
	stringToDate: function (strDate) {
		
		var str1 = strDate; 
        var dt1  = str1.substring(6,8); 
        var mon1 = str1.substring(4,6); 
        var yr1  = str1.substring(0,4);
        
        temp1 = mon1 + "/" + dt1 + "/" + yr1;

        return Date.parse(temp1);
	},
	
	stringToDateTime: function (strDate) {
		
	    var dt  = strDate.substring(6,8); 
	    var mon = strDate.substring(4,6); 
	    var yr  = strDate.substring(0,4);
	    
	    var hr	= strDate.substring(8,10);
	    var min	= strDate.substring(10,12);
	    var sec	= strDate.substring(12,14);
	    
	    temp = mon + "/" + dt + "/" + yr + " " + hr + ":" + min + ":" + sec ;
	
	    return Date.parse(temp);
	},
	
	dateToCustom: function (date) {

		var strDate = '%04d%02d%02d%02d%02d%02d'.sprintf(
				date.getFullYear(),
				date.getMonth() + 1,
				date.getDate(),
				date.getHours(),
				date.getMinutes(),
				date.getSeconds()
		) ;
		return strDate ;
	}
};