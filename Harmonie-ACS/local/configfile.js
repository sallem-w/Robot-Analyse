ctx.configFile = (function() {
	
	var rootPath;
	var codeScenario;
	var fileNameExcel;
	var fileNameOutputExcel;
	
	var configFile = {};
	
	configFile.init = function(config, codeScenario) {
		rootPath = config.rootPath;
		
		var files = ctx.fso.folder.getFileCollection(rootPath);
		var countFileExcel = 0;
		while(!files.atEnd()) {
			var file = files.item();
			if (file.Name.indexOf('.xls') !== -1) {
				countFileExcel += 1;
				fileNameExcel = file.Name;
			}
			files.moveNext();
		}
		
		if (countFileExcel !== 1) {
			ctx.trace.writeError(countFileExcel + " excel files found in " + rootPath + ", only 1 needed");
			return false;	
		}
		
		var extensionExcel = ctx.fso.file.getExtensionName(fileNameExcel);
		var fileNameOutput = ctx.date.formatYYYMMDD(new Date()) + "_" + codeScenario + "_" + ctx.string.left(fileNameExcel, fileNameExcel.length - extensionExcel.length - 1)  + "_Result." + extensionExcel;

		if (!ctx.fso.file.exist(this.getPathFileExcel())) {
			ctx.trace.writeError("Open Excel file FAIL");
			return false;	
		}

		ctx.trace.writeInfo("Open Excel file DONE");
		fileNameOutputExcel = fileNameOutput;
		return true;	
	};
	
	configFile.getPathFileExcel = function() {
		return rootPath + fileNameExcel;
	}
		
	configFile.getFileNameOutputExcel = function() {
		return fileNameOutputExcel;
	}
	
	configFile.getPathFileOutputExcel = function() {
		return rootPath + fileNameOutputExcel;
	}
	
	configFile.getCodeProductCorrespond = function(codeProduct) {
		var config = ctx.config.getConfigACS();
		return config.productAccesSante[codeProduct];
	}

	return configFile;
}) ();
