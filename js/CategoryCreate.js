var ipad = ipad || {};

(function($) {

	// --------- Component Interface Implementation --------- //
	function CategoryCreate() {
		
	}

	CategoryCreate.prototype.create = function(data, config) {
		var category = data;
		
		var context = {"category":category};
		var source = $("#tmpl-CategoryCreate").html();
		var template = Handlebars.compile(source);
		var html = template(context);
		var $e = $(html);
		return $e;
	}
	
	CategoryCreate.prototype.init = function(data, config) {

	}
	
	CategoryCreate.prototype.postDisplay = function() {
			var c = this;
			var $e = c.$element;
			
			$e.find(".ok").click(function(){
				var category = {};
				category.name = $e.find(".name")[0].value;
				
				brite.dm.create("Category",category).done(function(){
					$e.remove();
					brite.display("ByCategory",null,{
						parent:$(".right-container")
					});
				});	
				
			})
			
			$e.find(".update").click(function() {
				var category = {};
				console.log($e);
				var objId = $e.find(".CategoryCreate").attr("data-obj_id");
				category.name = $e.find(".name")[0].value;

				brite.dm.update("Category",objId,category).done(function(){
					$e.remove();
					brite.display("ByCategory",null, {
						parent:$(".right-container")
					});	
				});
			})
			
			$e.find(".cancel").click(function(){
				$e.remove();
			})
			
				
			}	
		
	// --------- /Component Interface Implementation --------- //

	// --------- Component Private Methods --------- //
	
	// --------- /Component Private Methods --------- //
	
	// --------- Component Registration --------- //	
	  brite.registerComponent("CategoryCreate", {
        emptyParent : false,
        loadTemplate: true
    }, function() {
        return new CategoryCreate();
    });	
	// --------- /Component Registration --------- //
	
	
	ipad.CategoryCreate = CategoryCreate;
	
	
})(jQuery);