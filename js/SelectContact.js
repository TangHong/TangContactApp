var ipad = ipad || {};

(function($) {
	
	// --------- Component Interface Implementation --------- //
	function SelectContact(){
		
	}
	
	SelectContact.prototype.create = function(data,config) {
		var c = this;
		var ops = data.ops;
		
		return brite.dm.list("Contact",ops).pipe(function(contacts){
			c.contacts = contacts;
			var context = {contactList:contacts}
			var source = $("#tmpl-SelectContact").html();
			var template = Handlebars.compile(source);
			var html = template(context);
			var $e = $(html);
			return $e;
		});
			
	}
	
	SelectContact.prototype.init = function() {
	
	}
	
	SelectContact.prototype.postDisplay = function() {
		var c = this;
		var $e = c.$element;
	
		$e.find(".tag").click(function () { 
      $(this).toggleClass("sel");
    }); 

		$e.delegate(".cancel","click",function() {
				$e.remove();
		})
		
		$e.delegate(".ok","click",function() {
				var selectedIds = getSelectedId.call(c);
				console.log($e.find(".DialogPrompt-container"));
				console.log($progress);
				$e.find(".DialogPrompt-container").html($progress);
				$e.find('.bar').animate({
					width: '100%'
					}, 900,function() {
						$e.remove();
				});
				
				c.setAnswer(selectedIds);
		})
		
	
	}
	
	SelectContact.prototype.onAnswer = function(answerCallBack) {
		var c = this;
		c._answerCallBack = answerCallBack;
	}
	
	
	SelectContact.prototype.setAnswer = function(answer) {
		var c = this;
		var $e = c.$element;
		c._answerCallBack(answer);
	}
	
	
	
	
	// --------- /Component Interface Implementation --------- //

	// --------- Component Private Methods --------- //
	function getSelectedId() {
		var c = this;
		var $e = c.$element;
		var selectedIds = [];
		$e.find(".sel").each(function() {
			selectedIds.push($(this).attr("data_obj-id"));
		});
		return selectedIds;
	}
	
	
	
	// --------- /Component Private Methods --------- //
	
	// --------- Component Registration --------- //
		brite.registerComponent("SelectContact", {
	        emptyParent : false,
	        loadTemplate: true
	    }, function() {
	        return new SelectContact();
	    });	
	// --------- /Component Registration --------- //
	
	
	
})(jQuery);