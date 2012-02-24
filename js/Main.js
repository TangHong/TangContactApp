var ipad = ipad || {};

(function($) {

	// --------- Component Interface Implementation --------- //
	function main() {
		
	}

	main.prototype.create = function(data, config) {
		var source   = $("#ipad-main").html();
		var template = Handlebars.compile(source);	
		var html = template();
	  var $e = $(html);
		return $e;
	}
	
	main.prototype.init = function(data, config) {

	}
	
	main.prototype.postDisplay = function() {
		var c  = this;
		var $e  = this.$element;
		
		var $contactContainer = $(".contact-container");
		
		resizeWindow();
		
		$(window).resize(function() {
 			resizeWindow();
		});

		
		brite.display("ContactList",null,{
			parent:$contactContainer
		});
		
		brite.display("ContactHome",null,{
			parent:$(".right-container")
		})
		
		$e.delegate(".showContacCreate","click",function() {
			brite.display("ContactCreate");
		})
		
			
		$(".wizard-bar-item").click(function(){
			var wizardId = $(this).attr("wizard-id");
			if(wizardId == 1) {
				brite.display("ContactHome",null,{
					parent:$(".right-container")
				})
				ipad.history.pushCmd("showHome");
			}else if(wizardId == 2) {
				brite.display("ByCompany",null,{
					parent:$(".right-container")
				})
				ipad.history.pushCmd("showByCompany");
			}else if(wizardId == 3) {
				brite.display("ByCategory",null,{
					parent:$(".right-container")
				})
				ipad.history.pushCmd("showByCategory");
			}
			$(".wizard-bar-item").removeClass("wizard-sel")
			$(this).addClass("wizard-sel");
			})
		
	}
	// --------- /Component Interface Implementation --------- //

	// --------- Component Private Methods --------- //
	function resizeWindow() {
		var rigConWidth = $(window).width()-350;
		$(".right-container").width(rigConWidth);	
	}
	
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