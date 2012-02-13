var ipad = ipad || {};

(function($) {
	
	// --------- Component Interface Implementation --------- //
	function ContactList(){
		
	}
	
	ContactList.prototype.create = function(data,config) {
		var c = this;
		var contactList = [];
		
		return brite.dm.list("Contact").pipe(function(contacts){
			c.contacts = contacts;
			var html = $("#ipad-ContactList").render({contactList:contacts});
			var $e = $(html);
			return $e;
		});
	}
	
	ContactList.prototype.init = function() {
	
	}
	
	ContactList.prototype.postDisplay = function() {
		var c = this;
		var $e = c.$element;
	
	
		$e.delegate(".button-add","click",function(){
				brite.display("ContactCreate",null, {
						parent : $(document).find("#container")
					});
				})
				
				
		$e.delegate(".del","click",function() {
				var id = $(this).closest(".con").attr("data_obj-id");
				brite.dm.remove("Contact",id);
				$(this).closest(".con").fadeOut("slow");
			})
		
		$e.delegate(".star","click",function() {
			if($(this).hasClass("star-not-sel")){
					$(this).removeClass("star-not-sel");
					$(this).addClass("star-sel");	
			}else {
				$(this).removeClass("star-sel");
				$(this).addClass("star-not-sel");	
				}
			
		})
		
	}
	
	// --------- /Component Interface Implementation --------- //

	// --------- Component Private Methods --------- //
	
	// --------- /Component Private Methods --------- //
	
	// --------- Component Registration --------- //
		brite.registerComponent("ContactList", {
	        emptyParent : true,
	        loadTemplate: true
	    }, function() {
	        return new ContactList();
	    });	
	// --------- /Component Registration --------- //
	
	
	
	//ipad.ContactList =ContactList;
})(jQuery);