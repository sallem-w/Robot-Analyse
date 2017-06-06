ActivInfinitev7.scenario({ scenarioACS: function(ev, sc) {
	sc.data.scenarioCode = ctx.config.ACS;
	sc.onTimeout(ctx.config.getTimeout(), function(sc, st) { sc.endScenario(); });
	sc.onError(function(sc, st, ex) { sc.endScenario();	});
	sc.setMode(e.scenario.mode.clearIfRunning);
	sc.step(ActivInfinitev7.steps.initScenario);
	sc.step(ActivInfinitev7.steps.startScenarioACS);
	sc.step(ActivInfinitev7.steps.endScenario);
}});

ActivInfinitev7.step({ initScenario : function(ev, sc, st) {
	ctx.trace.writeInfo('Start scenario ' + sc.data.scenarioCode);
	if (!ctx.excelFile.initConfig(sc.data.scenarioCode)) {
		sc.endScenario();
	}
	
	sc.data.config = ctx.config.getConfig(sc.data.scenarioCode);
	sc.data.configExcel = sc.data.config.excel;

	ctx.trace.writeInfo('STEP - openFile');
	ctx.excelHelper.openFile(ctx.configFile.getPathFileExcel());
	
	ctx.trace.writeInfo('STEP - copyFile');
	ctx.excelHelper.copyFile(ctx.configFile.getPathFileOutputExcel(), ctx.excelFile.startRowIndex(), ctx.excelFile.getHeaderFile());

	ctx.trace.writeInfo('STEP - readFile');
	sc.data.contracts = ctx.excelFile.readFile(sc.data.scenarioCode);
	sc.data.totalTimeDuration = new Date();
	sc.data.countCaseProcessed = 0;
	sc.data.countCaseSuccessProcessed = 0;
	sc.data.indexCurrentContract = 0;
	sc.endStep();
}});
	
ActivInfinitev7.step({ startScenarioACS : function(ev, sc, st) {
	var i = sc.data.indexCurrentContract;
	
	var currentContracts = sc.data.contracts[i];
	var config = ctx.config.getConfig(ctx.config.ACS);
	var data = { contract: currentContracts, config: config, configExcel: config.excel };
	
	ActivInfinitev7.scenarios.checkContract.start(data).onEnd(function(s) {
		sc.data.countCaseProcessed += 1;
		
		if (s.data.statusContract === ctx.excelHelper.constants.status.Success) {
			sc.data.countCaseSuccessProcessed += 1;
		}

		var writeArray = [
			{ columnIndex: sc.data.configExcel.columnIndex.dateProceedContract, value: ctx.date.formatTrace(new Date()) },
			{ columnIndex: sc.data.configExcel.columnIndex.statusContract, value: s.data.statusContract },
			{ columnIndex: sc.data.configExcel.columnIndex.commentContract, value: s.data.commentContract }
		];
		
		ctx.excelHelper.write(currentContracts.row, writeArray);
		
		if (i < sc.data.contracts.length - 1) {
			sc.data.indexCurrentContract += 1;
			sc.endStep(ActivInfinitev7.steps.startScenarioACS);
		} else {
			sc.endStep();
		}
	});
}});

ActivInfinitev7.step({ endScenario : function(ev, sc, st) {
	ctx.trace.writeInfo('STEP - closeFile');
	ctx.excelHelper.closeFile();
	
	ctx.trace.writeInfo('STEP - writeStats');
	var stats = {};
	stats['fileName'] = ctx.config.getFileNameOutputExcel();
	stats['totalTimeDuration'] = ctx.date.diffToSecond(sc.data.totalTimeDuration, new Date());
	stats['countCaseProcessed'] = sc.data.countCaseProcessed;
	stats['countCaseSuccessProcessed'] = sc.data.countCaseSuccessProcessed;
	ctx.excelFile.writeStats(stats);
	sc.endStep();
}});
