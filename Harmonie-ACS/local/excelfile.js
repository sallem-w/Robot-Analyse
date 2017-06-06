ctx.excelFile = (function() {
	
	var config;
	var configExcel;
	
	var excelFile = {};
	
	excelFile.initConfig = function(codeScenario) {
		if (!ctx.configFile.init(codeScenario)) {
			return false;
		}
			
		config = ctx.config.getConfig(codeScenario);
		configExcel = config.excel;
		return true;
	}
	
	excelFile.getHeaderFile = function() {
		var writeArray = [
			{ columnIndex: configExcel.columnIndex.dateProceedContract, value: "Date traitement contrat" },
			{ columnIndex: configExcel.columnIndex.statusContract, value: "Status contrat" },
			{ columnIndex: configExcel.columnIndex.commentContract, value: "Commentaire" }
		];
		return writeArray;
	}
	
	excelFile.startRowIndex = function() {
		return configExcel.startRowIndex - 1;
	}

	excelFile.readFile = function() {
		var lastIndexRow = ctx.excel.sheet.getLastRow(ctx.excelHelper.toColumnName(configExcel.startColumnIndex) + configExcel.startRowIndex) - 1;
		return ctx.excelFile.getAllCellsACS(lastIndexRow, configExcel);
	}
	
	excelFile.getAllCellsACS = function(lastIndexRow, configACSExcel) {
		var contracts = [];
		for (var i = configACSExcel.startRowIndex; i <= lastIndexRow; i++) {
			var dateProceedContract = ctx.excel.sheet.getCell(i, configACSExcel.columnIndex.dateProceedContract);
			if (dateProceedContract !== undefined && ctx.string.trim(String(dateProceedContract)) !== '') {
				continue;
			}
			
			var contract = {
				row : i,
				individualContract: ctx.stringHelper.padLeft(ctx.string.trim(String(ctx.excel.sheet.getCell(i, configACSExcel.columnIndex.individualContract))), '00000000'),
				insuredIdentifiant: ctx.string.trim(String(ctx.excel.sheet.getCell(i, configACSExcel.columnIndex.insuredIdentifiant))),
				insuredName: String(ctx.excel.sheet.getCell(i, configACSExcel.columnIndex.insuredName)),
				insuredSurName: String(ctx.excel.sheet.getCell(i, configACSExcel.columnIndex.insuredSurName)),
				subscribedCodeProduct: String(ctx.excel.sheet.getCell(i, configACSExcel.columnIndex.subscribedCodeProduct)),
				ACSCertificateStartDate: ctx.excel.sheet.getCell(i, configACSExcel.columnIndex.ACSCertificateStartDate),
				ACSCertificateEndDate: ctx.excel.sheet.getCell(i, configACSExcel.columnIndex.ACSCertificateEndDate),
				scheduleCode: String(ctx.excel.sheet.getCell(i, configACSExcel.columnIndex.scheduleCode)),
				paymentTypeLabel: String(ctx.excel.sheet.getCell(i, configACSExcel.columnIndex.paymentTypeLabel))
			};
			contracts.push(contract);
		}
		return contracts;
	}
	
	excelFile.getAllCellsCMU = function(lastIndexRow, configACSExcel) {
		var contracts = [];
		for (var i = config.startRowIndex; i <= lastIndexRow; i++) {
			var dateProceedContract = ctx.excel.sheet.getCell(i, configACSExcel.columnIndex.dateProceedContract);
			if (dateProceedContract !== undefined && ctx.string.trim(String(dateProceedContract)) !== '') {
				continue;
			}
			
			var contract = {
				row : i,
				individualContract: ctx.stringHelper.padLeft(ctx.string.trim(String(ctx.excel.sheet.getCell(i, configACSExcel.columnIndex.individualContract))), '00000000'),
				insuredIdentifiant: ctx.string.trim(String(ctx.excel.sheet.getCell(i, configACSExcel.columnIndex.insuredIdentifiant))),
				insuredName: String(ctx.excel.sheet.getCell(i, configACSExcel.columnIndex.insuredName)),
				insuredSurName: String(ctx.excel.sheet.getCell(i, configACSExcel.columnIndex.insuredSurName)),
				subscribedCodeProduct: String(ctx.excel.sheet.getCell(i, configACSExcel.columnIndex.subscribedCodeProduct)),
				ACSCertificateStartDate: ctx.excel.sheet.getCell(i, configACSExcel.columnIndex.ACSCertificateStartDate),
				ACSCertificateEndDate: ctx.excel.sheet.getCell(i, configACSExcel.columnIndex.ACSCertificateEndDate),
				scheduleCode: String(ctx.excel.sheet.getCell(i, configACSExcel.columnIndex.scheduleCode)),
				paymentTypeLabel: String(ctx.excel.sheet.getCell(i, configACSExcel.columnIndex.paymentTypeLabel))
			};
			contracts.push(contract);
		}
		return contracts;
	}
	
	excelFile.writeStats = function(obj) {
		ctx.stats.write(obj);
	}
	
	return excelFile;
}) ();
