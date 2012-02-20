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
			
			$e.delegate(".upload", "change", function() {
				var $inputUpload = $(this);
				c.image = null;
				if (this.files && this.files.length > 0) {
					var file = this.files[0];
					var reader = new FileReader(file);
					reader.onload = function(e) {
						var data = e.target.result;
						c.image = data;
						$e.find(".preview").attr("src",data);
					}
					reader.readAsDataURL(file);
				}
			});
			
			
			
			$e.find(".ok").click(function(){
				var name = $e.find(".name")[0].value;
				var phone = $e.find(".phone")[0].value;
				var description = $e.find(".description")[0].value;
				var contact = {};
				contact.name = name;
				contact.phone = phone;
				contact.description = description;
				contact.image = ""
				if(c.image) {
					contact.image = c.image;
				}
				
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
				contact.image = ""
				if(c.image) {
					contact.image = c.image;
				}
				
				brite.dm.update("Contact",objId,contact).done(function(){
					brite.display("main",null, {
						parent : $workspace
					});	
				});
			})
			
			$e.find(".cancel").click(function(){
					$e.remove();
				})
				
			}	
		
	// --------- /Component Interface Implementation --------- //

	// --------- Component Private Methods --------- //
	function readImage(files) {
		//var files = $e.find("input[name='upload']").get(0).files;
		if (files && files.length > 0) {
			var dfd = $.Deferred();
			var reader = new FileReader();
			reader.onload = function(e) {
				var data = e.target.result;
				dfd.resolve(data);
			}
			reader.readAsDataURL(files[0]);
			return dfd.promise();
		}
	}
	
	
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