ctx.trace = (function() {
	
	var fileName = ctx.date.formatTrace(new Date()) + '_{0}_Log.log;
	var _trace = {};
	
	_trace.loadConfigFile = function(nameScenario) {
		fileName = fileName.replace('{0}', nameScenario);
	};
	
	return _trace;
}) ();
