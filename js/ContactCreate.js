var ipad = ipad || {};

(function($) {

	// --------- Component Interface Implementation --------- //
	function ContactCreate() {
		
	}

	ContactCreate.prototype.create = function(data, config) {
		var html = $("#ipad-contact").render();
	  var $e = $(html);
		return $e;
	}
	
	ContactCreate.prototype.init = function(data, config) {

	}
	
	ContactCreate.prototype.postDisplay = function() {
			var c = this;
			var $e = c.$element;
			var username;
			
			$e.find(".ok").click(function(){
					username = $e.find(".username")[0].value;
					var contact = {};
					contact.name = username;					
					brite.dm.create("Contact",contact);
				
					brite.display("main",null, {
					parent : $workspace
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