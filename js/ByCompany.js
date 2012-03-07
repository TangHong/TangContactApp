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
			var source = $("#tmpl-ByCompany").html();
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
		
		
		
		
		$e.find(".con-container").each(function() {
			var ids = [];
			var $container = $(this);
			if($container.attr("member_id")) {
			ids = $container.attr("member_id").split(",");
			}
			
			brite.dm.list("Contact",{ids:ids}).pipe(function(contacts) {
				var context = {contactList:contacts};
				var source = $("#tmpl-contact").html();
				var template = Handlebars.compile(source);
				var conBar = template(context);
				var $c = $(conBar);
				$container.append($c);
				$e.find(".collapse").collapse();
				
				$e.find('.collapse').on('hidden', function () {
					var target = $(this).attr("target");
					$e.find("[data-target='"+target+"']").addClass("col");
				})
				
				$e.find('.collapse').on('shown', function () {
					var target = $(this).attr("target");
					$e.find("[data-target='"+target+"']").removeClass("col");
				})
				
				
			}) 
		})
			
		
				
		$e.delegate(".create","click",function() {
			brite.display("CompanyCreate",null, {
						parent : $workspace
			});	
		})
		
		$e.delegate(".add","click",function() {
			var companyId = $(this).closest(".company-container").attr("data_obj-id");
			var member_id = $(this).closest(".company-container").attr("member_id");
			var existIds = [];
			
			if(member_id != "" && member_id != null){	
					 existIds = member_id.split(",");
			}
			
			var data = {};
			data.ops = {notIn:existIds};
			
			var dfd = brite.display("SelectContact",data, {
						parent : $workspace
			});	
			
			dfd.done(function(dialog) {
					dialog.onAnswer(function(result) {
						add.call(c,result,companyId);
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
		
		$e.delegate(".edit-group","click",function() {
			var objId = $(this).closest(".company-container").attr("data_obj-id");
			brite.dm.get("Company",objId).done(function(company) {
				brite.display("CompanyCreate",company, {
						parent : $workspace
				});
			});
		})

		$e.delegate(".delete-group","click",function() {
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
	function add(ids,companyId) {
		var c = this;	
		var company = {};
		var member_id = [];
		
		for(i=0;i<c.company.length;i++) {
			if(c.company[i].id == companyId){
				if(c.company[i].member_id != "" && c.company[i].member_id != null) {
					member_id = c.company[i].member_id.split(",");
				}
			}
		};
		if(ids.length >0 ){
			for(i=0;i<ids.length;i++) {
				member_id.push(ids[i]);
			}
		}
		
		company.member_id	= member_id;
		brite.dm.update("Company",companyId,company).done(function() {
			brite.display("ByCompany",null,{
				parent:$(".right-container")
			})
			
		})
						
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