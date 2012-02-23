var ipad = ipad || {};(function($) {	// --------- Component Interface Implementation --------- //	function ContactHome() {			}	ContactHome.prototype.create = function(data, config) {		var c = this;		var favorites = [];		var homeContacts = {};				return brite.dm.list("Contact",{favorite:"1"}).pipe(function(favorites) {			return brite.dm.list("Contact",{recent:"1"}).pipe(function(recent) {				homeContacts.favorites = favorites;				homeContacts.recent = recent;								var context = {homeList:homeContacts}				var source = $("#ipad-ContactHome").html();				var template = Handlebars.compile(source);				var html = template(context);				var $e = $(html);				return $e;			})		});	}		ContactHome.prototype.init = function(data, config) {	}		ContactHome.prototype.postDisplay = function() {		var c = this;		var $e = c.$element;				var options = {};		options.title = "Add Contacts";				options.content = "Please click star in the contact list to choose what you want to add!";		$e.find('.fav-add').popover(options);		$e.find('.rec-add').popover(options);				$e.delegate(".fav-add","click",function() {			$(".popover").remove();			var $contactList = $e.parents().bFindComponents("ContactList")[0].$element;				$contactList.find(".star-sel").each(function() {				var objId = $(this).closest(".con").attr("data_obj-id");				setFavorite(objId);			});		})				$e.delegate(".rec-add","click",function() {			$(".popover").remove();			var $contactList = $e.parents().bFindComponents("ContactList")[0].$element;			$contactList.find(".star-sel").each(function() {				var objId = $(this).closest(".con").attr("data_obj-id");				setRecent(objId);			});		})				$e.delegate("[data-action='fav-del']","click",function() {			var objId = $(this).closest(".con-bar").attr("data_obj-id");			remFavorite(objId);		})				$e.delegate("[data-action='rec-del']","click",function() {			var objId = $(this).closest(".con-bar").attr("data_obj-id");			remRecent(objId);		})		}		// --------- /Component Interface Implementation --------- //	// --------- Component Private Methods --------- //	function setFavorite(objId) {			var contact = {};			contact.favorite = 1;			brite.dm.update("Contact",objId,contact).done(function() {				brite.display("main",null, {						parent : $workspace				});				});	}		function remFavorite(objId) {			var contact = {};			contact.favorite = 0;			brite.dm.update("Contact",objId,contact).done(function() {				brite.display("main",null, {						parent : $workspace				});				});	}		function setRecent(objId) {			var contact = {};			contact.recent = 1;			brite.dm.update("Contact",objId,contact).done(function() {				brite.display("main",null, {						parent : $workspace				});				});	}			function remRecent(objId) {			var contact = {};			contact.recent = 0;			brite.dm.update("Contact",objId,contact).done(function() {				brite.display("main",null, {						parent : $workspace				});				});	}			// --------- /Component Private Methods --------- //		// --------- Component Registration --------- //	brite.registerComponent("ContactHome", {        emptyParent : true,        loadTemplate: true    }, function() {        return new ContactHome();    });		// --------- /Component Registration --------- //})(jQuery);