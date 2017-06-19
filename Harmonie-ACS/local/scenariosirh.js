ActivInfinitev7.scenario({ scenarioSIRH: function(ev, sc) {
	sc.data.scenarioCode = ctx.config.SIRH;
	sc.onTimeout(ctx.config.getTimeout(), function(sc, st) { sc.endScenario(); });
	sc.onError(function(sc, st, ex) { sc.endScenario();	});
	sc.setMode(e.scenario.mode.clearIfRunning);
	sc.step(ActivInfinitev7.steps.initScenarioSIRH);
	sc.step(ActivInfinitev7.steps.startScenarioSIRH);
	sc.step(ActivInfinitev7.steps.endScenarioSIRH);
}});
	
ActivInfinitev7.step({ initScenarioSIRH : function(ev, sc, st) {
	ctx.trace.writeInfo('Start scenario ' + sc.data.scenarioCode);
	if (!ctx.configFile.init(sc.data.scenarioCode)) {
		sc.endScenario();
	}

	sc.data.config = ctx.config.getConfig(sc.data.scenarioCode);
	
	ctx.trace.writeInfo('STEP - readFile');
	var fileContracts = ctx.fso.file.read(ctx.configFile.getPathFile());
	var contracts = JSON.parse(fileContracts);
	var countContracts = contracts.length;
		
	ctx.trace.writeInfo('STEP - createOutputFile');
	ctx.excelHelper.createFile();
	
	ctx.trace.writeInfo('STEP - saveOutputFile');
	ctx.excelHelper.saveFile(ctx.configFile.getPathFileOutput()); 
	
	ctx.trace.writeInfo('STEP - writeOutputFile');
	ctx.excelHelper.writeObject(contracts);
	
	sc.data.indexCurrentContract = 0;
	sc.data.contracts = contracts;
	sc.data.countContracts = countContracts;
	sc.data.totalTimeDuration = new Date();
	sc.data.countCaseProcessed = countContracts;
	sc.endStep();
}});
	
ActivInfinitev7.step({ startScenarioSIRH : function(ev, sc, st) {
	var i = sc.data.indexCurrentContract;
	
	sc.data.statusContract = '';
	sc.data.commentContract = '';
	sc.data.contract = sc.data.contracts[i];
	
	ActivInfinitev7.scenarios.checkMembership.start(sc.data).onEnd(function(scCheckMembership) {
		sc.data.commentContract = scCheckMembership.data.commentContract;
		sc.data.statusContract = scCheckMembership.data.statusContract;
		
		if (i < sc.data.countContracts - 1) {
			sc.data.indexCurrentContract += 1;
			sc.endStep(ActivInfinitev7.steps.startScenarioSIRH);
		} else {
			sc.endStep();
		}
	});
}});

ActivInfinitev7.step({ endScenarioSIRH : function(ev, sc, st) {
	ctx.trace.writeInfo('STEP - closeFile');
	ctx.excelHelper.closeFile();
	
	ctx.trace.writeInfo('STEP - writeStats');
	var stats = {};
	stats['fileName'] = ctx.configFile.getFileNameOutput();
	stats['totalTimeDuration'] = ctx.date.getTimeElapsedSince(ctx.date.diffTime(sc.data.totalTimeDuration, new Date()));
	stats['countCaseProcessed'] = sc.data.countCaseProcessed;
	ctx.stats.write(stats);
	
	sc.endStep();
}});
