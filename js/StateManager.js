var ipad = ipad || {};

(function($) {
	ipad.history = {};
	
	// this is the current hash
	ipad.currentHash = null;
	
	$(document).ready(function() {
		window.onhashchange = function() {
			if(ipad.currentHash != null) {
				if(window.location.hash != ipad.currentHash) {
					ipad.currentHash = window.location.hash;
					executeCmd();
				}
			}
		}
	})
	
	function executeCmd(){
		
		var cmdInfo = ipad.history.getCmdInfo();
		if(cmdInfo.cmd == "showHome") {
			brite.display("ContactHome",null,{
					parent:$(".right-container")
			});
			$(".wizard-bar-item").removeClass("wizard-sel");
			$("[wizard-id='1']").addClass("wizard-sel");
		}else if(cmdInfo.cmd == "showByCompany") {
			brite.display("ByCompany",null,{
					parent:$(".right-container")
			});
			$(".wizard-bar-item").removeClass("wizard-sel");
			$("[wizard-id='2']").addClass("wizard-sel");			
		}else if(cmdInfo.cmd == "showByCategory") {
			brite.display("ByCategory",null,{
					parent:$(".right-container")
			});
			$(".wizard-bar-item").removeClass("wizard-sel");
			$("[wizard-id='3']").addClass("wizard-sel");
		}
	}
	

	ipad.history.pushCmd = function(cmd,extra){
		if(extra){
			var extraString = JSON.stringify(extra);
			window.location.hash = cmd +":" + extraString.replace(/\"/g,"|");
		} else {
			window.location.hash = cmd;
		}
		ipad.currentHash = window.location.hash;
	}
	
	
	ipad.history.getCmdInfo = function(){
		var hash = window.location.hash;
		var cmdInfo = {};
		var cmdString = hash.substring(1);
		if(cmdString.indexOf(":") != -1) {
			cmdInfo.cmd = cmdString.substring(0,cmdString.indexOf(":"));
			var extraString = cmdString.substring(cmdString.indexOf(":")+1).replace(/\|/g,"\"");
			cmdInfo.extra  = JSON.parse(extraString);
		} else {
			cmdInfo.cmd = cmdString;
		}
		return cmdInfo;
	}
	
	
	
})(jQuery);