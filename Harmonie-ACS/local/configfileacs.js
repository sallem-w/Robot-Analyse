ctx.configACS = (function() {
	
	var rootPathACS;
	var codeScenario;
	var fileNameExcelACS;
	var fileNameOutputExcelACS;
	
	var configACS = {};
	
	configACS.init = function() {
		rootPathACS = ctx.config.getConfigACS().rootPath;
		codeScenario = ctx.config.getCodeScenarioACS();
		
		var files = ctx.fso.folder.getFileCollection(rootPathACS);
		var countFileExcel = 0;
		while(!files.atEnd()) {
			var file = files.item();
			if (file.Name.indexOf('.xls') !== -1) {
				countFileExcel += 1;
				fileNameExcelACS = file.Name;
			}
			files.moveNext();
		}
		
		if (countFileExcel !== 1) {
			ctx.trace.writeError(countFileExcel + " found in " + rootPathACS + ", only 1 needed");
			return false;	
		}
		
		var extensionExcelACS = ctx.fso.file.getExtensionName(fileNameExcelACS);
		var fileNameOutput = ctx.date.formatYYYMMDD(new Date()) + "_" + codeScenario + "_" + ctx.string.left(fileNameExcelACS, fileNameExcelACS.length - extensionExcelACS.length - 1)  + "_Result" + "." + extensionExcelACS;

		if (!ctx.fso.file.exist(this.getPathFileExcelACS())) {
			ctx.trace.writeError("Open Excel file FAIL");
			return false;	
		}

		ctx.trace.writeInfo("Open Excel file DONE");
		fileNameOutputExcelACS = fileNameOutput;
		return true;	
	};
	
	configACS.getPathFileExcelACS = function() {
		return rootPathACS + fileNameExcelACS;
	}
		
	configACS.getFileNameOutputExcelACS = function() {
		return fileNameOutputExcelACS;
	}
	
	configACS.getPathFileOutputExcelACS = function() {
		return rootPathACS + fileNameOutputExcelACS;
	}
	
	configACS.getCodeProductCorrespond = function(codeProduct) {
		var config = ctx.config.getConfigACS();
		return config.productAccesSante[codeProduct];
	}

	return configACS;
}) ();
