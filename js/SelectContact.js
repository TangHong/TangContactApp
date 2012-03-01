var ipad = ipad || {};

(function($) {
	
	// --------- Component Interface Implementation --------- //
	function SelectContact(){
		
	}
	
	SelectContact.prototype.create = function(data,config) {
		var c = this;
		var groupId = data.groupId;
		var type = data.type;
		var member_id = [];
		
		return brite.dm.get(type,groupId).pipe(function(company) {
			if(company.member_id != "" && company.member_id != null){	
				member_id = company.member_id.split(",");
			}
			
			return brite.dm.list("Contact",{notIn:member_id}).pipe(function(contacts){
				c.contacts = contacts;
				var context = {contactList:contacts}
				var source = $("#tmpl-SelectContact").html();
				var template = Handlebars.compile(source);
				var html = template(context);
				var $e = $(html);
				return $e;
			});
			
		})
		
		
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
		$e.remove();
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