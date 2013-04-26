/*
 * Description : Presentation DAO related operations
 */
var PresentationDao = {

	fieldSparator : ',',
	localDataPath : './data/presentation.csv',
	
	getLocalData: function () {
		
		 var content;

		$.ajax({
			url : this.localDataPath,
			async: false,
			success : function (data) {
				console.log('Data Loaded');
				content = data.split(PresentationDao.fieldSparator);
			},
			error: function(msg) {
				console.log('ERROR');
				console.log(msg);
			}
		});

		return content;
	}
	
};




