ActivInfinite.scenario({ readExcel: function(ev, sc) {
	var data = sc.data;
	sc.onTimeout(60000, function(sc, st) { sc.endScenario(); });
	sc.onError(function(sc, st, ex) { sc.endScenario();	});
	sc.setMode(e.scenario.mode.clearIfRunning);
	sc.step(ActivInfinite.steps.initConfig);
	sc.step(ActivInfinite.steps.openFile);
	sc.step(ActivInfinite.steps.copyFile);
	sc.step(ActivInfinite.steps.readFile);
	sc.step(ActivInfinite.steps.closeFile);
	sc.step(ActivInfinite.steps.writeStats);
}});

ActivInfinite.step({ initConfig : function(ev, sc, st) {
	sc.data.config = ctx.config.getConfigACS();
	sc.data.configExcel = sc.data.config.excel;
	
	ctx.trace.writeInfo('Start scenario readExcel ' + ctx.config.getCodeScenarioACS());
	ctx.trace.writeInfo('STEP - init');
	if(!ctx.configACS.init()) {
		sc.endScenario();	
	}
	
	sc.data.pathFileOutputExcelACS = ctx.configACS.getPathFileOutputExcelACS();
	sc.data.pathFileExcelACS = ctx.configACS.getPathFileExcelACS();
	sc.data.totalTimeDuration = new Date();
	sc.endStep();
}});

ActivInfinite.step({ openFile : function(ev, sc, st) {
	ctx.trace.writeInfo('STEP - openFile');
	ctx.excel.initialize();
	try {
		ctx.excel.file.open(sc.data.pathFileExcelACS);
	} catch (ex) {
		ctx.trace.writeError('Can not copy open excel file, ' + sc.data.pathFileExcelACS);
	}
	sc.endStep();
}});

ActivInfinite.step({ copyFile : function(ev, sc, st) {
	ctx.trace.writeInfo('STEP - copyFile');
	try {
		ctx.excel.file.saveAs(sc.data.pathFileOutputExcelACS); 
		ctx.trace.writeInfo("Create Output Excel file succeed");
	} catch (ex) {
		ctx.trace.writeError('Can not copy save excel file, ' + sc.data.pathFileOutputExcelACS);
	}
	sc.endStep();
}});

ActivInfinite.step({ readFile : function(ev, sc, st) {
	ctx.trace.writeInfo('STEP - readFile');
	var lastIndexRow = ctx.excel.sheet.getLastRow(ctx.excelHelper.toColumnName(sc.data.configExcel.startColumnIndex) + sc.data.configExcel.startRowIndex) - 1;
	var contracts = getAllCells(lastIndexRow, sc.data.configExcel)
	var countContractProcessed = 0;
	
	
//	TODO find solution
//
//	var i = 0;
//	while(i <= contracts.length) {
//		
//		var data = { contract: contracts[i] };
//		
//		var sc = ActivInfinite.scenarios.searchContract.start(data).onEnd(function() {
//			countContractProcessed += 1;
//			i += 1;
//		})
//			
//		while (ActivInfinite.scenarios.searchContract.isRunning()) {
//			
//		}
//	}
//
// 	sc.data.countCaseProcessed = countContractProcessed;
//	sc.endStep();
	
	var i = 0;
	var data = { contract: contracts[i] };
	
	ActivInfinite.scenarios.searchContract.start(data).onEnd(function() {
		sc.data.countCaseProcessed = 1;
		sc.endStep();
	})
}});

ActivInfinite.step({ closeFile : function(ev, sc, st) {
	ctx.trace.writeInfo('STEP - closeFile');
	ctx.excel.end();
	ctx.excel.release();
	sc.endStep();
}});

ActivInfinite.step({ writeStats : function(ev, sc, st) {
	ctx.trace.writeInfo('STEP - writeStats');
	var obj = {};
	obj['fileName'] = ctx.configACS.getFileNameOutputExcelACS();
	obj['totalTimeDuration'] = ctx.date.diffToSecond(sc.data.totalTimeDuration, new Date());
	obj['countCaseProcessed'] = sc.data.countCaseProcessed
	ctx.stats.write(obj);

	ctx.trace.writeInfo('End scenario readExcel ' + ctx.config.getCodeScenarioACS());
	sc.endStep();
}});

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
