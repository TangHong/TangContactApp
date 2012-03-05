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
			var source = $("#tmpl-ContactList").html();
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
		
		serachContact($e);

		$e.delegate(".button-add","click",function(){
			brite.display("ContactCreate",null, {
				parent : $workspace
			});
		})

		$e.delegate(".text","click",function() {
			var objId = $(this).closest(".con").attr("data_obj-id");
			brite.dm.get("Contact",objId).done(function(contact) {
				brite.display("OverView",contact, {
					parent:$(".right-container")
				});
			});
		})

		$e.delegate(".del","click",function() {
			var id = $(this).closest(".con").attr("data_obj-id");
			brite.dm.remove("Contact",id).done(function() {
				brite.display("Main",null, {
					parent : $workspace
				});		
			});
		})

		$e.delegate(".star","click",function() {
			if($(this).hasClass("icon-star-empty")) {
				$(this).removeClass("icon-star-empty");
				$(this).addClass("icon-star");
				var objId = $(this).closest(".con").attr("data_obj-id");
				setFavorite(objId);
			}else {
				$(this).removeClass("icon-star");
				$(this).addClass("icon-star-empty");	
				var objId = $(this).closest(".con").attr("data_obj-id");
				remFavorite(objId);
				}
			$("[wizard-id='1']").trigger("click");
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
		function serachContact($e) {
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
		}
	
	
	
		function setFavorite(objId) {
			var contact = {};
			contact.favorite = 1;
			brite.dm.update("Contact",objId,contact).done(function() {
				brite.display("ContactHome",null,{
					parent:$(".right-container")
				})	
			});
		}
	
		function remFavorite(objId) {
			var contact = {};
			contact.favorite = 0;
			brite.dm.update("Contact",objId,contact).done(function() {
				brite.display("ContactHome",null,{
					parent:$(".right-container")
				});
			});
		}


	// --------- /Component Private Methods --------- //

	// --------- Component Registration --------- //
		brite.registerComponent("ContactList", {
	        emptyParent : true,
	        loadTemplate: true
	    }, function() {
	        return new ContactList();
	    });	
	// --------- /Component Registration --------- //


	ipad.ContactList =ContactList;
})(jQuery);