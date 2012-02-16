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
			getMember(company);		
			var html = $("#ipad-ByCompany").render({companyList:company});
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
		
		$e.delegate(".create","click",function() {
			brite.display("CompanyCreate",null, {
						parent : $(document).find("#container")
			});	
		})
		
		$e.delegate(".add","click",function() {
			var company = {};
			var companyId = $(this).closest(".company-container").attr("data_obj-id");
			var member_id = [];
			var $contactList = $e.parents().bFindComponents("ContactList")[0].$element;	
			$contactList.find(".star-sel").each(function() {
				var objId = $(this).closest(".con").attr("data_obj-id");
				member_id.push(objId);
			});
			company.member_id	= member_id;
			brite.dm.update("Company",companyId,company).done(function() {
				brite.display("ByCompany",null,{
					parent:$(".right-container")
				})
			})
		})
		
		
		
	}
	
	// --------- /Component Interface Implementation --------- //

	// --------- Component Private Methods --------- //
	function getMember(company) {
		var c = this;
		
		for(i=0;i<company.length;i++) {
			if(company[i].member_id){
				var ids = company[i].member_id.split(",");
				for(j=0;j<ids.length;j++) {
						var contacts = [];
					 
					 		brite.dm.get("Contact",ids[j]).done(function(contact) {
							console.log(contact);
							});
				}
				
			}
		}	
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