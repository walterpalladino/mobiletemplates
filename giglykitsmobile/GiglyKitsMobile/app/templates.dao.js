/*
 * Description : Templates related operations
 */
var appTemplatesDao = {

	_templates: null,
	_actualTemplateName: null,

    init: function () {
		this._templates	= new Array();
    },
    
    /*
     * Description : Load a template
     */
    load: function (templateName) {
    	
		//	First check if the template was not already loaded
		if (appTemplatesDao._checkLoaded(templateName)) {
			return ;
		}
    	appTemplatesDao._actualTemplateName = templateName;
    	
    	var url_file = detectEnv.getURL("templates") + '/' + $__actual_device__ + '/' + appTemplatesDao._actualTemplateName + '.tpl';
		
    	//	We need to make this call synchronous 
		$.ajax({
			type: "GET",
			url: url_file,
			data: "ataString",
			dataType: "text",
			async: false,
			success: function (result) {

				var newTemplate	= new TemplateData(appTemplatesDao._actualTemplateName, result);
				
				appTemplatesDao._templates.push(newTemplate);

			},
			error: function(msg) {
				console.log('ERROR');
				console.log(msg);
			}
		});    				
        
    	
    },

    
	/*
	*	Description : Check if the template was not already loaded
	*/
	_checkLoaded : function (templateName) {
	
		for (var n in this._templates) {
			if (this._templates[n].name === templateName) return true;
		}
		return false ;
	},

	/*
	 * Description : Returns a template given a name 
	 */
    get: function (templateName) {

    	for (var template in this._templates) {
    		if (this._templates[template].name === templateName) {
    			return this._templates[template].template ;
    		}
    	}
    	
    	return '';
    },
	
	getLocalTemplate: function (templateName) {
		
		 var content;

		$.ajax({
			url : "./app/templates/"+templateName+".tpl",
			success : function (data) {
				content = data;
			},
			error: function(msg) {
				console.log('ERROR');
				console.log(msg);
			},
			async: false
		});

		return content;
	}
	
};




