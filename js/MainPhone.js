var ipad = ipad || {};

(function($) {

	// --------- Component Interface Implementation --------- //
	function MainPhone() {
		
	}

	MainPhone.prototype.create = function(data, config) {
		var source = $("#tmpl-Main-Phone").html();
		var template = Handlebars.compile(source);	
		var html = template();
	  var $e = $(html);
		return $e;
	}
	
	MainPhone.prototype.init = function(data, config) {

	}
	
	MainPhone.prototype.postDisplay = function() {
		var c  = this;
		var $e  = this.$element;
		
		var $contactContainer = $(".contact-container");
		
		
		$(window).resize(function() {
 			console.log($(window).width());
		});
		
		
		brite.display("ContactList",null,{
			parent:$contactContainer
		});
		
			
	}
	// --------- /Component Interface Implementation --------- //

	// --------- Component Private Methods --------- //
	
	
	// --------- /Component Private Methods --------- //
	
	// --------- Component Registration --------- //
    brite.registerComponent("MainPhone", {
        emptyParent : true,
        loadTemplate: true
    }, function() {
        return new MainPhone();
    });	
	// --------- /Component Registration --------- //
	
})(jQuery);