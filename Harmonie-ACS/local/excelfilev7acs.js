ctx.excelFileV7ACS = (function() {
	
	var config;
	var configExcel;
	
	var excelFileV7ACS = {};
	
	excelFileV7ACS.initConfig = function() {
		if (!ctx.configACS.init()) {
			return false;
		}
			
		config = ctx.config.getConfigACS();
		configExcel = config.excel;
		return true;
	}
	
	excelFileV7ACS.getHeaderFile = function() {
		var writeArray = [
			{ columnIndex: configExcel.columnIndex.dateProceedContract, value: "Date traitement contrat" },
			{ columnIndex: configExcel.columnIndex.statusContract, value: "Status contrat" },
			{ columnIndex: configExcel.columnIndex.commentContract, value: "Commentaire" }
		];
		return writeArray;
	}
	
	excelFileV7ACS.startRowIndex = function() {
		return configExcel.startRowIndex - 1;
	}

	excelFileV7ACS.readFile = function() {
		var lastIndexRow = ctx.excel.sheet.getLastRow(ctx.excelHelper.toColumnName(configExcel.startColumnIndex) + configExcel.startRowIndex) - 1;
		return ctx.excelFileV7ACS.getAllCellsv7(lastIndexRow, configExcel);
	}
	
	excelFileV7ACS.getAllCellsv7 = function(lastIndexRow, configACSExcel) {
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
	
	excelFileV7ACS.writeStats = function(obj) {
		ctx.stats.write(obj);
	}
	return excelFileV7ACS;
}) ();
