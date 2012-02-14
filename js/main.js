var ipad = ipad || {};

(function($) {

	// --------- Component Interface Implementation --------- //
	function main() {
		
	}

	main.prototype.create = function(data, config) {
		var html = $("#ipad-main").render();
	    var $e = $(html);
		return $e;
	}
	
	main.prototype.init = function(data, config) {

	}
	
	main.prototype.postDisplay = function() {
		var c  = this;
		var $e  = this.$element;
		
		var $contactContainer = $(".contact-container");
		
		
		
		
		brite.display("ContactList",null,{
			parent:$contactContainer
		});
		
		brite.display("ContactHome",null,{
			parent:$(".contacts-home")
		})
		
		$e.delegate(".showContacCreate","click",function() {
			brite.display("ContactCreate");
		})
		
			
		$(".wizard-bar-item").click(function(){
			$(".wizard-bar-item").removeClass("wizard-sel")
			$(this).addClass("wizard-sel");
			})
		
	}
	// --------- /Component Interface Implementation --------- //

	// --------- Component Private Methods --------- //
	
	// --------- /Component Private Methods --------- //
	
	// --------- Component Registration --------- //
    brite.registerComponent("main", {
        emptyParent : true,
        loadTemplate: true
    }, function() {
        return new main();
    });	
	// --------- /Component Registration --------- //
	
})(jQuery);