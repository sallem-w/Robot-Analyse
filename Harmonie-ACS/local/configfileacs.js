ctx.configACS = (function() {
	
	var rootPathACS = 'C:\\Users\\RICHARD-MAX\\excel\\ACS-20170420-1\\';
	var codeScenario = "ACS";
	var fileNameExcelACS = 'Contrats et Assurés AccèsSanté date fin inf 30042017 CHEQUE coll non Rad....xls';
	var fileNameOutputExcelACS;
	
	var configACS = {};
	
	configACS.init = function() {
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

	return configACS;
}) ();
