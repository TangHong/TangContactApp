var ipad = ipad || {};

(function($) {

	// --------- Component Interface Implementation --------- //
	function CompanyCreate() {
		
	}

	CompanyCreate.prototype.create = function(data, config) {
		var html = $("#ipad-CompanyCreate").render();
	  var $e = $(html);
		return $e;
	}
	
	CompanyCreate.prototype.init = function(data, config) {

	}
	
	CompanyCreate.prototype.postDisplay = function() {
			var c = this;
			var $e = c.$element;
			
			$e.find(".ok").click(function(){
				
			})
			
			$e.find(".update").click(function() {
				
			})
			
			$e.find(".cancel").click(function(){
				$e.remove();
				brite.display("ByCompany",null,{
					parent:$(".right-container")
				})	
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