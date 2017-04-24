ActivInfinite.scenario({ readExcel: function(ev, sc) {
	var data = sc.data;
	sc.onTimeout(30000, function(sc, st) { sc.endScenario();	});
	sc.onError(function(sc, st, ex) { sc.endScenario();	});
	sc.onEnd(writeStats);
	sc.setMode(e.scenario.mode.clearIfRunning);
	sc.step(ActivInfinite.steps.init);
	sc.step(ActivInfinite.steps.openFile);
	sc.step(ActivInfinite.steps.copyFile);
	sc.step(ActivInfinite.steps.readFile);
	sc.step(ActivInfinite.steps.closeFile);
}});

ActivInfinite.step({ init : function(ev, sc, st) {
	sc.data.config = ctx.config.getConfigACS();
	sc.data.configExcel = sc.data.config.excel;
	
	if(!ctx.configACS.init()) {
		sc.endScenario();	
	}
	
	sc.data.pathFileOutputExcelACS = ctx.configACS.getPathFileOutputExcelACS();
	sc.data.pathFileExcelACS = ctx.configACS.getPathFileExcelACS();
	sc.data.totalTimeDuration = new Date();
	sc.endStep();
}});

ActivInfinite.step({ openFile : function(ev, sc, st) {
	ctx.excel.initialize();
	ctx.excel.file.open(sc.data.pathFileExcelACS);
	sc.endStep();
}});

ActivInfinite.step({ copyFile : function(ev, sc, st) {
	ctx.excel.file.saveAs(sc.data.pathFileOutputExcelACS); 
	ctx.trace.writeInfo("Create Output Excel file succeed");
	sc.endStep();
}});

ActivInfinite.step({ readFile : function(ev, sc, st) {
	var lastIndexRow = ctx.excel.sheet.getLastRow(ctx.excelHelper.toColumnName(sc.data.configExcel.startColumnIndex) + sc.data.configExcel.startRowIndex) - 1;
	var contracts = getAllCells(lastIndexRow, sc.data.configExcel)
	var countContract = 0;
	for (var contract in contracts) {
		countContract += 1;
	}
	sc.data.countCaseProcessed = countContract;
	sc.endStep();
}});

ActivInfinite.step({ closeFile : function(ev, sc, st) {
	ctx.excel.end();
	ctx.excel.release();
	sc.endStep();
}});

function writeStats(ev, sc, st) {
	var obj = [];
	obj['fileName'] = ctx.configACS.getFileNameOutputExcelACS();
	obj['totalTimeDuration'] = getDuration(sc.data.totalTimeDuration);
	obj['countCaseProcessed'] = sc.data.countCaseProcessed
	ctx.stats.write(obj);
};

function getAllCells(lastIndexRow, configACSExcel){
	var contracts = [];
	for (var i = configACSExcel.startRowIndex; i <= lastIndexRow; i++) {
		var contract = {
			row : i,
			individualContract: ctx.string.trim(ctx.excel.sheet.getCell(i, configACSExcel.columnIndex.individualContract)),
			insuredName: ctx.excel.sheet.getCell(i, configACSExcel.columnIndex.insuredName),
			insuredSurName: ctx.excel.sheet.getCell(i, configACSExcel.columnIndex.insuredSurName),
			subscribedProduct: ctx.excel.sheet.getCell(i, configACSExcel.columnIndex.subscribedProduct),
			ACSCertificateStartDate: ctx.excel.sheet.getCell(i, configACSExcel.columnIndex.ACSCertificateStartDate),
			ACSCertificateEndDate: ctx.excel.sheet.getCell(i, configACSExcel.columnIndex.ACSCertificateEndDate),
			scheduleCode: ctx.excel.sheet.getCell(i, configACSExcel.columnIndex.scheduleCode),
			paymentTypeLabel: ctx.excel.sheet.getCell(i, configACSExcel.columnIndex.paymentTypeLabel)
		};
		contracts.push(contract);
	}
	
	return contracts;
}

function getDuration(startDate) {
	var diff = startDate.getTime() - new Date().getTime();
	return diff / 1000;
}