var ipad = ipad || {};

(function($) {
	
	// --------- Component Interface Implementation --------- //
	function ContactList(){
		
	}
	
	ContactList.prototype.create = function(data,config) {
		var c = this;
		
		return brite.dm.list("Contact").pipe(function(contacts){
			c.contacts = contacts;
			var context = {contactList:contacts}
			var source = $("#ipad-ContactList").html();
			var template = Handlebars.compile(source);
			var html = template(context);
			var $e = $(html);
			return $e;
		});
	}
	
	ContactList.prototype.init = function() {
	
	}
	
	ContactList.prototype.postDisplay = function() {
		var c = this;
		var $e = c.$element;
	
		
		$(".con").draggable({revert:true});	
		
		
		$e.delegate(".search-content","input",function() {
			var searchContent = $e.find(".search-content").val();
			if($e.find(".con").length>0) {
				if(searchContent != null && searchContent != "") {
					var regExp=new RegExp("^"+searchContent.trim(),"i");
					$e.find(".con").each(function() {
						var name = $(this).find(".text").text();
						if(!regExp.test(name)){
							$(this).addClass("not-display");
							$(this).removeClass("display");
						}else {
							$(this).addClass("display");
							$(this).removeClass("not-display");
						}
					});
					
				}else {
					$e.find(".con").addClass("display");
					$e.find(".con").removeClass("not-display");
				}
				
				if($e.find(".display").length == 0) {
					if($e.find("[name='no-search-result']").length == 0) {
						$e.find(".ipad-contactList").append("<p name='no-search-result' class='no-content'>No Search Result!</p>");	
					}
				}else {
					$e.find("p[name='no-search-result']").remove()					
				};
			}
		})
		
		$e.delegate(".button-add","click",function(){
				brite.display("ContactCreate",null, {
						parent : $workspace
					});
				})
				
				
		$e.delegate(".del","click",function() {
				var id = $(this).closest(".con").attr("data_obj-id");
				brite.dm.remove("Contact",id).done(function() {
					brite.display("main",null, {
						parent : $workspace
					});		
				});
				//$(this).closest(".con").fadeOut("slow");
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
		
		$e.delegate(".edit","click",function() {
			var objId = $(this).closest(".con").attr("data_obj-id");
			brite.dm.get("Contact",objId).done(function(contact) {
				brite.display("ContactCreate",contact, {
						parent :$workspace
				});
			});
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