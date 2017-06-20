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
	
ActivInfinitev7.step({ startScenarioSIRH : function(ev, sc, st) {
	var i = sc.data.indexCurrentContract;
	
	sc.data.statusContract = '';
	sc.data.commentContract = '';
	sc.data.contract = sc.data.contracts[i];
	
	ActivInfinitev7.scenarios.checkMembership.start(sc.data).onEnd(function(scCheckMembership) {
		sc.data.commentContract = scCheckMembership.data.commentContract;
		sc.data.statusContract = scCheckMembership.data.statusContract;
		
		var writeArray = getContractValues(sc.data.contract);
		writeArray.push(ctx.date.formatTrace(new Date()));
		writeArray.push(sc.data.statusContract);
		writeArray.push(sc.data.commentContract);
		
		ctx.excelHelper.writeArray(i + 2, writeArray);
		ctx.excelHelper.saveFile();
		
		if (i < sc.data.countContracts - 1) {
			sc.data.indexCurrentContract += 1;
			sc.endStep(ActivInfinitev7.steps.startScenarioSIRH);
			return;
		}
		
		sc.endStep();
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

function getHeaderNames(obj) {
	var names = [];
	var keys = Object.keys(obj);
	for (var cellIndex in keys) {
		names.push(String(keys[cellIndex]));
	}
	return names;
}

function getContractValues(obj) {
	var array = [];
	var keys = Object.keys(obj);
	for (var cellIndex in keys) {
		array.push(String(obj[keys[cellIndex]]));
	}
	return array;
}
