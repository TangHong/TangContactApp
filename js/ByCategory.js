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
			
			var context = {categoryList:category};
			var source = $("#tmpl-ByCategory").html();
			var template = Handlebars.compile(source);
			var html = template(context);
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
		
		$e.find(".con-container").each(function() {
				var ids = [];
				var $container = $(this);
				if($container.attr("member_id")) {
				ids = $container.attr("member_id").split(",");
				}
				if(ids.length>0) {
					brite.dm.list("Contact",{ids:ids}).pipe(function(contacts) {
							var context = {contactList:contacts};
							var source = $("#tmpl-contact").html();
							var template = Handlebars.compile(source);
							var conBar = template(context);
							var $c = $(conBar);
							$container.append($c);
					})
				}
		})
		
	
		$e.delegate(".create","click",function() {
			brite.display("CategoryCreate",null, {
						parent : $workspace
			});	
		})
		
		$e.delegate(".add","click",function() {
			var categoryId = $(this).closest(".category-container").attr("data_obj-id");
			var data = {};
			data.groupId = categoryId;
			data.type = "Category";
			
			var dfd = brite.display("SelectContact",data, {
						parent : $workspace
			});	
			
			dfd.done(function(dialog) {
					dialog.onAnswer(function(result) {
						add.call(c,result,categoryId);
					})
			})
		})
		
		$e.delegate(".del","click",function() {
			$(".popover").remove();
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
		
		$e.delegate(".edit-group","click",function() {
			var objId = $(this).closest(".category-container").attr("data_obj-id");
			brite.dm.get("Category",objId).done(function(category) {
				brite.display("CategoryCreate",category, {
						parent : $workspace
				});
			});
		})

		$e.delegate(".delete-group","click",function() {
			var objId = $(this).closest(".category-container").attr("data_obj-id");
			brite.dm.remove("Category",objId).done(function() {
				brite.display("ByCategory",null,{
					parent:$(".right-container")
				})
			})
		})

	}
	
	// --------- /Component Interface Implementation --------- //

	// --------- Component Private Methods --------- //
	function add(ids,categoryId) {
		var c = this;	
		var category = {};
		var member_id = [];
		
		for(i=0;i<c.category.length;i++) {
			if(c.category[i].id == categoryId){
				if(c.category[i].member_id != "" && c.category[i].member_id != null) {
					member_id = c.category[i].member_id.split(",");
				}
			}
		};
		if(ids.length >0 ){
			for(i=0;i<ids.length;i++) {
				member_id.push(ids[i]);
			}
		}
		
		category.member_id	= member_id;
		brite.dm.update("Category",categoryId,category).done(function() {
			brite.display("ByCategory",null,{
				parent:$(".right-container")
			})
		})
						
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