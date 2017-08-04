 ctx.stringHelper = (function() {
	
	var stringHelper = {};
	
	stringHelper.padLeft = function(str, paddingValue) {
		return String(paddingValue + str).slice(-paddingValue.length);
	};
	
	stringHelper.removeReturnAndTab = function(str){
		return str.replace(/\n|\r/g,' ');
	};

	return stringHelper;
}) ();
