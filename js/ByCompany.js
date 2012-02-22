var ipad = ipad || {};

(function($) {

	// --------- Component Interface Implementation --------- //
	function ByCompany() {
		
	}

	ByCompany.prototype.create = function(data, config) {
		var c = this;
		var companyList = [];
	
		return brite.dm.list("Company").pipe(function(company){
			c.company = company;
			
			var context = {companyList:company};
			var source = $("#ipad-ByCompany").html();
			var template = Handlebars.compile(source);
			var html = template(context);
			var $e = $(html);
			return $e;
		});
	}
	
	ByCompany.prototype.init = function(data, config) {
		var c = this;
		var $e = c.$element;
		
		
	}
	
	ByCompany.prototype.postDisplay = function() {
		var c = this;
		var $e = c.$element;
		
		for(i=0;i<c.company.length;i++) {
			if(c.company[i].member_id){
				var ids = c.company[i].member_id.split(",");
				for(j=0;j<ids.length;j++) {
					var $contactList = $e.parents().bFindComponents("ContactList")[0].$element;
					var $con = $contactList.find("[data_obj-id='"+ids[j]+"']");
					var contact =	divToData($con);
					var context = contact;
					var source = $("#ipad-contact").html();
					var template = Handlebars.compile(source);
					var conBar = template(context);
					var $c = $(conBar);
				
					$e.find(".con-container[data_obj-id='"+c.company[i].id+"']").append($c);
					}
				
			}
		}	
		
		$e.find(".con-bar").each(function() {
			if($(this).attr("data_obj-id") == "") {
				$(this).remove();
			}
		})
		
		$e.delegate(".create","click",function() {
			brite.display("CompanyCreate",null, {
						parent : $(document).find("#container")
			});	
		})
		
		$e.delegate(".add","click",function() {
			var company = {};
			var companyId = $(this).closest(".company-container").attr("data_obj-id");
			
			var member_id = [];
			
			for(i=0;i<c.company.length;i++) {
				if(c.company[i].id == companyId){
					if(c.company[i].member_id != "" && c.company[i].member_id != null) {
						member_id = c.company[i].member_id.split(",");
					}
				}
			};
			
			var $contactList = $e.parents().bFindComponents("ContactList")[0].$element;	
			$contactList.find(".star-sel").each(function() {
				var objId = $(this).closest(".con").attr("data_obj-id");
				if(!isExist.call(c,objId,companyId)){
					member_id.push(objId);
				}
				
			});
			company.member_id	= member_id;
		
			brite.dm.update("Company",companyId,company).done(function() {
				brite.display("ByCompany",null,{
					parent:$(".right-container")
				})
			})
		})
		
		$e.delegate(".del","click",function() {
			var objId = $(this).closest(".con-bar").attr("data_obj-id");
			var companyId = $(this).closest(".con-container").attr("data_obj-id");
			var member_id = deleteId.call(c,objId,companyId);
			var company = {};
			company.member_id = member_id;
			brite.dm.update("Company",companyId,company).done(function() {
				brite.display("ByCompany",null,{
					parent:$(".right-container")
				})
			})
		})
		
		$e.delegate(".edit-company","click",function() {
			var objId = $(this).closest(".company-container").attr("data_obj-id");
			brite.dm.get("Company",objId).done(function(company) {
				brite.display("CompanyCreate",company, {
						parent : $(document).find("#container")
				});
			});
		})

		$e.delegate(".delete-company","click",function() {
			var objId = $(this).closest(".company-container").attr("data_obj-id");
			brite.dm.remove("Company",objId).done(function() {
				brite.display("ByCompany",null,{
					parent:$(".right-container")
				})
			})
		})
		
	}
	
	// --------- /Component Interface Implementation --------- //

	// --------- Component Private Methods --------- //
	function isExist(contactId,companyId) {
		var c = this;
		var company = c.company;
		for(i=0;i<company.length;i++) {
			if(company[i].id == companyId){
				if(company[i].member_id !="" && company[i].member_id != null){
					var ids = company[i].member_id.split(",");
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
	
	function deleteId(id,companyId) {
		var c = this;
		var ids = [];
		for(i=0;i<c.company.length;i++) {
			if(c.company[i].id == companyId) {
				if(c.company[i].member_id != "" && c.company[i].member_id != null) {
					var member_id = c.company[i].member_id.split(",");
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
	brite.registerComponent("ByCompany", {
        emptyParent : true,
        loadTemplate: true
    }, function() {
        return new ByCompany();
    });	
	// --------- /Component Registration --------- //
})(jQuery);