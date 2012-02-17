var ipad = ipad || {};

(function($) {

	// --------- Component Interface Implementation --------- //
	function ByCategory() {
		
	}

	ByCategory.prototype.create = function(data, config) {
		var c = this;
		var categoryList = [];
	
		return brite.dm.list("Category").pipe(function(category){
			c.category = category;	
			var html = $("#ipad-ByCategory").render({categoryList:category});
			var $e = $(html);
			return $e;
		});
	}
	
	ByCategory.prototype.init = function(data, config) {
		var c = this;
		var $e = c.$element;
		
		
	}
	
	ByCategory.prototype.postDisplay = function() {
		var c = this;
		var $e = c.$element;
		
		for(i=0;i<c.category.length;i++) {
			if(c.category[i].member_id){
				var ids = c.category[i].member_id.split(",");
				for(j=0;j<ids.length;j++) {
					var $contactList = $e.parents().bFindComponents("ContactList")[0].$element;
					var $con = $contactList.find("[data_obj-id='"+ids[j]+"']");
					var contact =	divToData($con);
					var conBar = $("#ipad-contact").render(contact);
					var $c = $(conBar);
					$e.find(".con-container[data_obj-id='"+c.category[i].id+"']").append($c);
					}
				
			}
		}	
		
		$e.find(".con-bar").each(function() {
			if($(this).attr("data_obj-id") == "") {
				$(this).remove();
			}
		})
		
		
		$e.delegate(".create","click",function() {
			brite.display("CategoryCreate",null, {
						parent : $(document).find("#container")
			});	
		})
		
		$e.delegate(".add","click",function() {
			var category = {};
			var categoryId = $(this).closest(".category-container").attr("data_obj-id");
			
			var member_id = [];
			
			for(i=0;i<c.category.length;i++) {
				if(c.category[i].id == categoryId){
					if(c.category[i].member_id != "" && c.category[i].member_id != null) {
						member_id = c.category[i].member_id.split(",");
					}
				}
			};
			
			var $contactList = $e.parents().bFindComponents("ContactList")[0].$element;	
			$contactList.find(".star-sel").each(function() {
				var objId = $(this).closest(".con").attr("data_obj-id");
				if(!isExist.call(c,objId,categoryId)){
					member_id.push(objId);
				}
				
			});
			category.member_id	= member_id;
		
			brite.dm.update("Category",categoryId,category).done(function() {
				brite.display("ByCategory",null,{
					parent:$(".right-container")
				})
			})
		})
		
		$e.delegate(".del","click",function() {
			var objId = $(this).closest(".con-bar").attr("data_obj-id");
			var categoryId = $(this).closest(".con-container").attr("data_obj-id");
			var member_id = deleteId.call(c,objId,categoryId);
			var category = {};
			category.member_id = member_id;
			brite.dm.update("Category",categoryId,category).done(function() {
				brite.display("ByCategory",null,{
					parent:$(".right-container")
				})
			})
		})
		
	}
	
	// --------- /Component Interface Implementation --------- //

	// --------- Component Private Methods --------- //
	
	function isExist(contactId,categoryId) {
		var c = this;
		var category = c.category;
		for(i=0;i<category.length;i++) {
			if(category[i].id == categoryId){
				if(category[i].member_id !="" && category[i].member_id != null){
					var ids = category[i].member_id.split(",");
					for(j=0;j<ids.length;j++) {
						if(ids[j]==contactId) {
							return true;	
						};
					}
				}
				return false;
			}
		};
	}
	
	
	function divToData($con) {
		var contact = {};
		contact.id = $con.attr("data_obj-id");
		contact.name = $con.find(".text").text();
		contact.image = $con.find("img").attr("src");
		contact.description = $con.attr("description");
		return contact;
	}
	
	function deleteId(id,categoryId) {
		var c = this;
		var ids = [];
		for(i=0;i<c.category.length;i++) {
			if(c.category[i].id == categoryId) {
				if(c.category[i].member_id != "" && c.category[i].member_id != null) {
					var member_id = c.category[i].member_id.split(",");
					for(j=0;j<member_id.length;j++) {
						if(member_id[j] != id) {
							ids.push(member_id[j]);	
						}
					}
				}
			}	
		}
		return ids;
	}
	
	
	// --------- /Component Private Methods --------- //
	
	// --------- Component Registration --------- //
	brite.registerComponent("ByCategory", {
        emptyParent : true,
        loadTemplate: true
    }, function() {
        return new ByCategory();
    });	
	// --------- /Component Registration --------- //
})(jQuery);