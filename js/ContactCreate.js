var ipad = ipad || {};

(function($) {

	// --------- Component Interface Implementation --------- //
	function ContactCreate() {
		
	}

	ContactCreate.prototype.create = function(data, config) {
		var contact = data;
		var html = $("#ipad-ContactCreate").render({"contact":contact});
	  var $e = $(html);
		return $e;
	}
	
	ContactCreate.prototype.init = function(data, config) {

	}
	
	ContactCreate.prototype.postDisplay = function() {
			var c = this;
			var $e = c.$element;
			
			$e.find(".ok").click(function(){
				var name = $e.find(".name")[0].value;
				var phone = $e.find(".phone")[0].value;
				var description = $e.find(".description")[0].value;
				var contact = {};
				contact.name = name;
				contact.phone = phone;
				contact.description = description;
				console.log(contact);
				brite.dm.create("Contact",contact).done(function(){
					brite.display("main",null, {
						parent : $workspace
					});	
				});		
					
			})
			
			$e.find(".update").click(function() {
				var objId = $e.find(".ContactCreate").attr("data-obj_id");
				var name = $e.find(".name")[0].value;
				var phone = $e.find(".phone")[0].value;
				var description = $e.find(".description")[0].value;
				var contact = {};
				contact.name = name;
				contact.phone = phone;
				contact.description = description;
				
				brite.dm.update("Contact",objId,contact).done(function(){
					brite.display("main",null, {
						parent : $workspace
					});	
				});
			})
			
			$e.find(".cancel").click(function(){
					brite.display("main",null, {
					parent : $workspace
					});
				})
				
			}	
		
	// --------- /Component Interface Implementation --------- //

	// --------- Component Private Methods --------- //
	
	// --------- /Component Private Methods --------- //
	
	// --------- Component Registration --------- //	
	  brite.registerComponent("ContactCreate", {
        emptyParent : false,
        loadTemplate: true
    }, function() {
        return new ContactCreate();
    });	
	// --------- /Component Registration --------- //
	
	
	ipad.ContactCreate = ContactCreate;
	
	
})(jQuery);