ActivInfinite.scenario({ readExcel: function(ev, sc) {
	var data = sc.data;
	sc.onTimeout(30000, function(sc, st) { sc.endScenario();	});
	sc.onError(function(sc, st, ex) { sc.endScenario();	});
	sc.setMode(e.scenario.mode.clearIfRunning);
	sc.step(ActivInfinite.steps.openFile);
	sc.step(ActivInfinite.steps.copyFile);
	sc.step(ActivInfinite.steps.readFile);
	sc.step(ActivInfinite.steps.closeFile);
}});

ActivInfinite.step({ openFile : function(ev, sc, st) {
	ctx.excel.initialize();
	ctx.excel.file.open(pathFileExcelACS);
	sc.endStep();
}});

ActivInfinite.step({ copyFile : function(ev, sc, st) {
	ctx.excel.file.saveAs(pathFileOutputExcelACS); 
	sc.endStep();
}});

ActivInfinite.step({ readFile : function(ev, sc, st) {
	var lastIndexRow = ctx.excel.sheet.getLastRow(toColumnName(configExcelACS.startColumnIndex) + configExcelACS.startRowIndex) - 1;
	var contracts = getAllCells(lastIndexRow)
	sc.endStep();
}});

ActivInfinite.step({ closeFile : function(ev, sc, st) {
	ctx.excel.end();
	ctx.excel.release();
	sc.endStep();
}});

function getAllCells(lastIndexRow){
	var contracts = [];
	for(var i = configExcelACS.startRowIndex; i <= lastIndexRow; i++){
		var contract = {
			lineExcel : i,
			individualContract: trim(getCell(i, configExcelACS.columnIndex.individualContract)),
			insuredName: getCell(i, configExcelACS.columnIndex.insuredName),
			insuredSurName: getCell(i, configExcelACS.columnIndex.insuredSurName),
			subscribedProduct: getCell(i, configExcelACS.columnIndex.subscribedProduct),
			ACSCertificateStartDate: getCell(i, configExcelACS.columnIndex.ACSCertificateStartDate),
			ACSCertificateEndDate: getCell(i, configExcelACS.columnIndex.ACSCertificateEndDate),
			scheduleCode: getCell(i, configExcelACS.columnIndex.scheduleCode),
			paymentTypeLabel: getCell(i, configExcelACS.columnIndex.paymentTypeLabel)
		};
		contracts.push(contract);
	}
	
	return contracts;
}
