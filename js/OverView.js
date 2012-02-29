var ipad = ipad || {};

(function($) {
	
	// --------- Component Interface Implementation --------- //
	function OverView(){
		
	}
	
	OverView.prototype.create = function(data,config) {
		var c = this;
		
		return brite.dm.list("Contact").pipe(function(contacts){
			c.contacts = contacts;
			var context = {contactList:contacts}
			var source = $("#tmpl-OverView").html();
			var template = Handlebars.compile(source);
			var html = template(context);
			var $e = $(html);
			return $e;
		});
	}
	
	OverView.prototype.init = function() {
	
	}
	
	OverView.prototype.postDisplay = function() {
		var c = this;
		var $e = c.$element;
	
		$e.find(".tag").draggable({revert:true});	
		 
		$e.find(".trash").droppable({
      drop: function(event,ui) {
      				var tag =  ui.draggable;
      				var objId = $(tag).attr("data_obj-id");
      				$(tag).fadeOut();
      				brite.dm.remove("Contact",objId).done(function() {
      					brite.display("OverView",null, {
									parent : $workspace
								});		
      				})
      }
    });
    
    
   $e.delegate(".home","click",function() {
   		brite.display("Main",null, {
					parent : $workspace
			});
   });
	
	
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