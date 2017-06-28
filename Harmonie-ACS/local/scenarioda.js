ActivInfinitev7.scenario({ scenarioDA: function(ev, sc) {
	sc.data.scenarioCode = ctx.config.DA;
	sc.onTimeout(ctx.config.getTimeout(), function(sc, st) { sc.endScenario(); });
	sc.onError(function(sc, st, ex) { sc.endScenario();	});
	sc.setMode(e.scenario.mode.clearIfRunning);
	sc.step(ActivInfinitev7.steps.initScenarioDA);
	sc.step(ActivInfinitev7.steps.startScenarioDA);
	sc.step(ActivInfinitev7.steps.endScenarioDA);
}});

ActivInfinitev7.step({ initScenarioDA : function(ev, sc, st) {
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
	
	ctx.trace.writeInfo('STEP - writeHeaderOutputFile');
	var names = getHeaderNames(contracts[0]);
	names.push('Date traitement contrat');
	names.push('Status contrat');
	names.push('Commentaire');
	ctx.excelHelper.writeArray(1, names);
	
	sc.data.indexCurrentContract = 0;
	sc.data.contracts = contracts;
	sc.data.countContracts = countContracts;
	sc.data.totalTimeDuration = new Date();
	sc.data.countCaseProcessed = countContracts;
	sc.endStep();
}});

ActivInfinitev7.step({ startScenarioDA: function(ev, sc, st) {
	sc.endStep();
}});

ActivInfinitev7.step({ endScenarioDA: function(ev, sc, st) {
	sc.endStep();
}});
