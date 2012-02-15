var ipad = ipad || {};

(function($) {

	// --------- Component Interface Implementation --------- //
	function ByCompany() {
		
	}

	ByCompany.prototype.create = function(data, config) {
		var c = this;
		var html = $("#ipad-ByCompany").render();
	  var $e = $(html);
		return $e;
		
	}
	
	ByCompany.prototype.init = function(data, config) {

	}
	
	ByCompany.prototype.postDisplay = function() {
		var c = this;
		var $e = c.$element;
		
		$e.delegate(".create","click",function() {
			brite.display("CompanyCreate",null, {
						parent : $(document).find("#container")
			});	
		})
		
		
		
	}
	
	// --------- /Component Interface Implementation --------- //

	// --------- Component Private Methods --------- //
	
	
	
	// --------- /Component Private Methods --------- //
	
	// --------- Component Registration --------- //
	brite.registerComponent("ByCompany", {
        emptyParent : true,
        loadTemplate: true
    }, function() {
        return new ByCompany();
    });	
	// --------- /Component Registration --------- //
})(jQuery);