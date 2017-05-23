 ctx.stringHelper = (function() {
	
	var stringHelper = {};
	
	stringHelper.padLeft = function(str, paddingValue) {
		return String(paddingValue + str).slice(-paddingValue.length);
	};

	return stringHelper;
}) ();
