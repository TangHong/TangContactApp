var ipad = ipad || {};

(function($) {

	// --------- Component Interface Implementation --------- //
	function ContactCreate() {
		
	}

	ContactCreate.prototype.create = function(data, config) {
		var c =  this;
		var contact = data;
		c.contact = contact;
		var context = {"contact":contact};
		var source = $("#tmpl-ContactCreate").html();
		var template = Handlebars.compile(source);
		var html = template(context);
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
				var contactList = $e.parent().bFindComponents("ContactList")[0];
				var name = $e.find(".name")[0].value;
				var phone = $e.find(".phone")[0].value;
				var description = $e.find(".description")[0].value;
				var contact = {};
				contact.name = name;
				contact.phone = phone;
				contact.description = description;
				contact.favorite = 0;
				contact.recent = getDays();
				contact.image = ""
				if(c.image) {
					contact.image = c.image;
				}
				
				brite.dm.create("Contact",contact).done(function(){
					brite.display("ContactList",null,{
						parent:$(".contact-container")
					});
					contactList.refresh();
				});	
				
				$e.find(".ContactCreate").html($progress);
				$e.find('.bar').animate({
					width: '100%'
					}, 900,function() {
						$e.remove();
				});
			})
			
			$e.find(".update").click(function() {
				var contactList = $e.parent().bFindComponents("ContactList")[0];
				var objId = $e.find(".ContactCreate").attr("data-obj_id");
				var name = $e.find(".name")[0].value;
				var phone = $e.find(".phone")[0].value;
				var description = $e.find(".description")[0].value;
				var contact = {};
				contact.name = name;
				contact.phone = phone;
				contact.description = description;
				contact.image = c.contact.image;
				if(c.image) {
					contact.image = c.image;
				}
				
				brite.dm.update("Contact",objId,contact).done(function(){
					brite.display("ContactList",null,{
						parent:$(".contact-container")
					});
					contactList.refresh();
				});
				
				$e.find(".ContactCreate").html($progress);
				$e.find('.bar').animate({
					width: '100%'
					}, 900,function() {
						$e.remove();
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
	
	//get days since 1970/01/01 
	function getDays() {
		var oneDay = 1000*60*60*24;
		var date = new Date();
		var time = date.getTime();
		var days = Math.floor(time/oneDay);
		return days;
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