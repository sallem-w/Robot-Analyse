ctx.configFile = (function() {
	var rootPath;
	var codeScenario;
	var fileName;
	var fileNameOutput;
	
	var configFile = {};
	
	configFile.init = function(codeScenario) {
		var config = ctx.config.getConfig(codeScenario);
		rootPath = config.rootPath;
		
		var hasExcel = !!config.excel;
		
		if (!hasExcel) {
			fileName = 'pivot.json';
			fileNameOutput = ctx.date.formatYYYMMDD(new Date()) + "_" + codeScenario + '_Result.json';
			return true;
		}
		var extensionCheck = ctx.config.getCheckExtension(codeScenario);
		var files = ctx.fso.folder.getFileCollection(rootPath);
		var countFile = 0;
		while(!files.atEnd()) {
			var file = files.item();
			if (file.Name.indexOf(extensionCheck) !== -1) {
				countFile += 1;
				fileName = file.Name;
			}
			files.moveNext();
		}
		
		if (countFile !== 1) {
			ctx.trace.writeError(countFile + " " + extensionCheck + " files found in " + rootPath + ", only 1 needed");
			ctx.popupHelper.newPopup(countFile + " fichier(s) Excel trouvé(s) dans " + rootPath + ", il en faut un et un seul.", 'Erreur Excel');
			return false;	
		}

		var extension = ctx.config.getResultFileExtension(codeScenario, fileName);
		var fileNameOutputComplete = ctx.date.formatYYYMMDD(new Date()) + "_" + codeScenario + "_" + ctx.string.left(fileName, fileName.length - extension.length - 1)  + "_Result." + extension;

		if (!ctx.fso.file.exist(this.getPathFile())) {
			ctx.trace.writeError("Open file FAIL");
			return false;	
		}

		ctx.trace.writeInfo("Open file DONE");
		fileNameOutput = fileNameOutputComplete;
		return true;	
	};

	configFile.getPathDirectory = function() {
		return rootPath;
	}
	
	configFile.getPathFile = function() {
		return rootPath + fileName;
	}
		
	configFile.getFileNameOutput = function() {
		return fileNameOutput;
	}
	
	configFile.getPathFileOutput = function() {
		return rootPath + fileNameOutput;
	}
	
	configFile.getCodeProductCorrespond = function(codeProduct) {
		var config = ctx.config.getConfig(ctx.config.ACS);
		return config.productAccesSante[codeProduct];
	}

	configFile.getHarmonieCustomerPath = function() {
		return ctx.options.serverURL + '\\harmonieCustomer.exe';
	}

	return configFile;
}) ();
