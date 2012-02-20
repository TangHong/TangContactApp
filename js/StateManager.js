var ipad = ipad || {};

(function($) {
	ipad.history = {};
	
	
	// this is the current hash
	ipad.currentHash = null;
	
	$(document).ready(function() {
		window.onhashchange = function() {
			if(ipad.currentHash != null && window.user) {
				if(location.hash != ipad.currentHash) {
					executeCmd();
				}
			}
		}
	})
	
	function executeCmd(){
		
		var cmdInfo = xad.history.getCmdInfo();
		//not finished
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
		var hash = location.hash;
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