ctx.trace = (function() {
	
	var _fileName = ctx.date.formatYYYMMDD(new Date()) + '_{0}_Logs.log';
	var _trace = {};
	var _pathFileTrace;
	
	_trace.constants = {
		typeError: {
			Info: "INFO",
			Error: "ERROR"
		}
	}		
	
	_trace.initFileTrace = function(pathDirectory, nameScenario) {
		var pathFileTrace = pathDirectory + _fileName.replace('{0}', nameScenario);
		if (!ctx.fso.file.exist(pathFileTrace)) {
			ctx.fso.file.create(pathFileTrace);
		}

		_pathFileTrace = pathFileTrace;
	};
	
	_trace.writeInfo = function(str, dateObj, separateur) {
		_trace.write(_trace.constants.typeError.Info, str, dateObj, separateur)
	};
	
	_trace.writeError = function(str, dateObj, separateur) {
		_trace.write(_trace.constants.typeError.Error, str, dateObj, separateur)
	};
	
	_trace.write = function(typeError, str, dateObj, separateur) {
		if (str.length === 0) {
			return;
		}

		separateur = separateur || '    ';
		dateObj = dateObj || new Date();
		
		ctx.fso.file.write(_pathFileTrace, ctx.date.formatTrace(dateObj) + separateur + typeError + separateur + str);
	};
	
	return _trace;
}) ();
