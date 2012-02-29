var ipad = ipad || {};

(function($) {

	// --------- Component Interface Implementation --------- //
	function CompanyCreate() {
		
	}

	CompanyCreate.prototype.create = function(data, config) {
		var company = data;
		
		var context = {"company":company};
		var source = $("#tmpl-CompanyCreate").html();
		var template = Handlebars.compile(source);
		var html = template(context);
		var $e = $(html);
		return $e;
	}
	
	CompanyCreate.prototype.init = function(data, config) {

	}
	
	CompanyCreate.prototype.postDisplay = function() {
			var c = this;
			var $e = c.$element;
			
			$e.find(".ok").click(function(){
				var company = {};
				company.name = $e.find(".name")[0].value;
				
				brite.dm.create("Company",company).done(function(){
					$e.remove();
					brite.display("ByCompany",null,{
						parent:$(".right-container")
					});
				});	
				
			})
			
			$e.find(".update").click(function() {
				var company = {};
				var objId = $e.find(".CompanyCreate").attr("data-obj_id");
				company.name = $e.find(".name")[0].value;

				brite.dm.update("Company",objId,company).done(function(){
					$e.remove();
					brite.display("ByCompany",null, {
						parent:$(".right-container")
					});	
				});
				
			})
			
			$e.find(".cancel").click(function(){
				$e.remove();
			})
			
				
			}	
		
	// --------- /Component Interface Implementation --------- //

	// --------- Component Private Methods --------- //
	
	// --------- /Component Private Methods --------- //
	
	// --------- Component Registration --------- //	
	  brite.registerComponent("CompanyCreate", {
        emptyParent : false,
        loadTemplate: true
    }, function() {
        return new CompanyCreate();
    });	
	// --------- /Component Registration --------- //
	
	
	ipad.CompanyCreate = CompanyCreate;
	
	
})(jQuery);