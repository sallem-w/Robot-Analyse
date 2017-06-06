ctx.excelFile = (function() {
	
	var config;
	var configExcel;
	var codeScenario;
	
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

	excelFile.readFile = function(codeScenario) {
		var lastIndexRow = ctx.excel.sheet.getLastRow(ctx.excelHelper.toColumnName(configExcel.startColumnIndex) + configExcel.startRowIndex) - 1;
		switch (codeScenario) {
			case ctx.config.ACS :
				return ctx.excelFile.getAllCellsACS(lastIndexRow, configExcel);
				break;
			case ctx.config.CMU :
				return ctx.excelFile.getAllCellsCMU(lastIndexRow, configExcel);
				break;
			default: 
				var errorMessage = 'Scenario not found into excel readfile. Code found : ' + codeScenario;
				ctx.trace.writeError(errorMessage);
				throw new Error(errorMessage);
				break;
		}
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
	
	excelFile.getAllCellsCMU = function(lastIndexRow) {
		var contracts = [];
		var insured = [];
		var lastIndividualContract;
		for (var i = configExcel.startRowIndex; i <= lastIndexRow; i++) {
			var dateProceedContract = ctx.excel.sheet.getCell(i, configExcel.columnIndex.dateProceedContract);
			if (dateProceedContract !== undefined && ctx.string.trim(String(dateProceedContract)) !== '') {
				continue;
			}
			var individualContract = ctx.stringHelper.padLeft(ctx.string.trim(String(ctx.excel.sheet.getCell(i, configExcel.columnIndex.individualContract))), '00000000');
			var contract = createInsuredObject(i);
			contract.row = i;
			contract.individualContract = individualContract;
			
			if (individualContract !== lastIndividualContract) {
				if (i > configExcel.startRowIndex) {
					contracts.push(insured);
					insured = [];
				}
				lastIndividualContract = individualContract;
			}
			insured.push(contract)
		}
		contracts.push(insured);
		return contracts;
	}
	
	excelFile.writeStats = function(obj) {
		ctx.stats.write(obj);
	}
	
	function createInsuredObject(indexOfExcel) {
		var res = {};
		var keys = Object.keys(configExcel.columnIndex);
		for (var i in keys) {
			var key = keys[i];
			res[key] = ctx.excel.sheet.getCell(indexOfExcel, configExcel.columnIndex[key]);
		}
		return res;
	}
	
	return excelFile;
}) ();
