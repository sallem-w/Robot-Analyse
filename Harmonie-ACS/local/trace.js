ctx.trace = (function() {
	
	var fileName = ctx.date.formatYYYMMDD(new Date()) + '_{0}_Logs.log';
	var trace = {};
	var pathFileTrace;
	var txtTrace;
	
	trace.constants = {
		typeError: {
			Info: "INFO",
			Error: "ERROR"
		}
	}		
	
	trace.initFileTrace = function(pathDirectory, nameScenario) {
		var pathFile = pathDirectory + fileName.replace('{0}', nameScenario);
		if (!ctx.fso.file.exist(pathFile)) {
			ctx.fso.file.create(pathFile);
		}

		pathFileTrace = pathFile;
		txtTrace = ctx.fso.file.read(pathFileTrace);
	};
	
	trace.writeInfo = function(str, dateObj, separateur) {
		trace.write(str, trace.constants.typeError.Info, dateObj, separateur)
	};
	
	trace.writeError = function(str, dateObj, separateur) {
		trace.write(str, trace.constants.typeError.Error, dateObj, separateur)
	};
	
	trace.write = function(str, typeError, dateObj, separator) {
		if (!str || str.length === 0) {
			return;
		}

		separator = separator || '    ';
		dateObj = dateObj || new Date();
		typeError = typeError || trace.constants.typeError.Info;
		
		txtTrace = txtTrace + ctx.date.formatTrace(dateObj) + separator + typeError + separator + str + '\r\n';
		ctx.fso.file.write(pathFileTrace, txtTrace);
	};
	
	return trace;
}) ();
