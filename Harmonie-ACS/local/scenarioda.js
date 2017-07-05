function startScenarioDA(sc, callback) {
	ActivInfinitev7.scenarios.checkContract.start(sc.data).onEnd(function(scCheckContract) {
		sc.data.commentContract = scCheckContract.data.commentContract;
		sc.data.statusContract = scCheckContract.data.statusContract;
		
		callback();
	});
}

ActivInfinitev7.scenario({ scenarioDA: function(ev, sc) {
	sc.data.scenarioCode = ctx.config.DA;
	sc.onTimeout(ctx.config.getTimeout(), function(sc, st) { sc.endScenario(); });
	sc.onError(function(sc, st, ex) { sc.endScenario();	});
	sc.setMode(e.scenario.mode.clearIfRunning);
	sc.step(ActivInfinitev7.steps.initPivot);
	sc.step(ActivInfinitev7.steps.startScenarioDA);
	sc.step(ActivInfinitev7.steps.endScenarioDA);
}});

ActivInfinitev7.step({ startScenarioDA: function(ev, sc, st) {
	var i = sc.data.indexCurrentContract;
	
	sc.data.statusContract = '';
	sc.data.commentContract = '';
	sc.data.contract = sc.data.contracts[i];
	
	ActivInfinitev7.scenarios.checkContractDA.start(sc.data).onEnd(function(scCheckContract) {
		sc.data.commentContract = scCheckContract.data.commentContract;
		sc.data.statusContract = scCheckContract.data.statusContract;
		
		var writeArray = getObjectValues(sc.data.contract);
		writeArray.push(ctx.date.formatTrace(new Date()));
		writeArray.push(sc.data.statusContract);
		writeArray.push(sc.data.commentContract);
		
		ctx.excelHelper.writeArray(i + 2, writeArray);
		ctx.excelHelper.saveFile();
		
		if (i < sc.data.countContracts - 1) {
			sc.data.indexCurrentContract += 1;
			sc.endStep(ActivInfinitev7.steps.startScenarioDA);
			return;
		}
		
		sc.endStep();
	});
}});

ActivInfinitev7.step({ endScenarioDA: function(ev, sc, st) {
	sc.endStep();
}});
