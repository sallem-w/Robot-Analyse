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
	
	excelFile.getLastIndexRow = function() {
		var lastIndexRow = ctx.excel.sheet.getLastRow(ctx.excelHelper.toColumnName(configExcel.startColumnIndex) + configExcel.startRowIndex) - 1;
		return lastIndexRow;
	}

	excelFile.getContractRowACS = function(indexRow) {
		if (!isValidRowACS(indexRow)) {
			return undefined;
		}
		
		var contract = {
			row : indexRow,
			individualContract: ctx.stringHelper.padLeft(ctx.string.trim(String(ctx.excel.sheet.getCell(indexRow, configExcel.columnIndex.individualContract))), '00000000'),
			insuredIdentifiant: ctx.string.trim(String(ctx.excel.sheet.getCell(indexRow, configExcel.columnIndex.insuredIdentifiant))),
			insuredName: String(ctx.excel.sheet.getCell(indexRow, configExcel.columnIndex.insuredName)),
			insuredSurName: String(ctx.excel.sheet.getCell(indexRow, configExcel.columnIndex.insuredSurName)),
			subscribedCodeProduct: String(ctx.excel.sheet.getCell(indexRow, configExcel.columnIndex.subscribedCodeProduct)),
			ACSCertificateStartDate: ctx.excel.sheet.getCell(indexRow, configExcel.columnIndex.ACSCertificateStartDate),
			ACSCertificateEndDate: ctx.excel.sheet.getCell(indexRow, configExcel.columnIndex.ACSCertificateEndDate),
			scheduleCode: String(ctx.excel.sheet.getCell(indexRow, configExcel.columnIndex.scheduleCode)),
			paymentTypeLabel: String(ctx.excel.sheet.getCell(indexRow, configExcel.columnIndex.paymentTypeLabel))
		};
		
		return contract;
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
	
	function isValidRowACS(indexRow) {
		var dateProceedContract = ctx.excel.sheet.getCell(indexRow, configExcel.columnIndex.dateProceedContract);
		if (dateProceedContract !== undefined && ctx.string.trim(String(dateProceedContract)) !== '') {
			return false;
		}
		
		return true;
	}
	
	return excelFile;
}) ();
