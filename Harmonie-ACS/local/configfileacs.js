ctx.configACS = (function() {
	
	var rootPathACS = 'C:\\Users\\RICHARD-MAX\\excel\\ACS-20170420-1\\';
	var codeScenario = "ACS";
	var fileNameExcelACS = 'Contrats et Assurés AccèsSanté date fin inf 30042017 CHEQUE coll non Rad1....xls';
	
	var _fileNameOutputExcelACS;
	
	var _configACS = {};
	
	_configACS.init = function() {
		var extensionExcelACS = ctx.fso.file.getExtensionName(fileNameExcelACS);
		var fileNameOutputExcelACS =  ctx.date.formatYYYMMDD(new Date()) + "_" + codeScenario + "_" + ctx.string.left(fileNameExcelACS, fileNameExcelACS.length - extensionExcelACS.length - 1)  + "_Result" + "." + extensionExcelACS;

		if (!ctx.fso.file.exist(this.getPathFileExcelACS())) {
			ctx.trace.writeError("Open Excel file FAIL");
			return false;	
		}

		ctx.trace.writeInfo("Open Excel file DONE");
		_fileNameOutputExcelACS = fileNameOutputExcelACS;
		return true;	
	};
	
	_configACS.getPathFileExcelACS = function() {
		return rootPathACS + fileNameExcelACS;
	}
		
	_configACS.getFileNameOutputExcelACS = function() {
		return _fileNameOutputExcelACS;
	}
	
	_configACS.getPathFileOutputExcelACS = function() {
		return rootPathACS + _fileNameOutputExcelACS;
	}

	return _configACS;
}) ();
