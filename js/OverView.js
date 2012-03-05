var ipad = ipad || {};

(function($) {
	
	// --------- Component Interface Implementation --------- //
	function OverView(){
		
	}
	
	OverView.prototype.create = function(data,config) {
		var c = this;
		var contact = data;
		c.contact = contact;
		var context = {"contact":contact};
		var source = $("#tmpl-OverView").html();
		var template = Handlebars.compile(source);
		var html = template(context);
		var $e = $(html);
		return $e;
		
	}
	
	OverView.prototype.init = function() {
	
	}
	
	OverView.prototype.postDisplay = function() {
		var c = this;
		var $e = c.$element;
	
		
		}
		
		// --------- /Component Interface Implementation --------- //
	
	// --------- Component Private Methods --------- //
	
	// --------- /Component Private Methods --------- //
	
	// --------- Component Registration --------- //
		brite.registerComponent("OverView", {
	        emptyParent : true,
	        loadTemplate: true
	    }, function() {
	        return new OverView();
	    });	
	// --------- /Component Registration --------- //
	

	
})(jQuery);