ActivInfinitev7.scenario({ scenarioSIRH: function(ev, sc) {
	sc.data.scenarioCode = ctx.config.SIRH;
	sc.onTimeout(ctx.config.getTimeout(), function(sc, st) { sc.endScenario(); });
	sc.onError(function(sc, st, ex) { sc.endScenario();	});
	sc.setMode(e.scenario.mode.clearIfRunning);
	sc.step(ActivInfinitev7.steps.initPivot);
	sc.step(ActivInfinitev7.steps.startScenarioSIRH);
	sc.step(ActivInfinitev7.steps.endScenarioSIRH);
}});
	
ActivInfinitev7.step({ startScenarioSIRH : function(ev, sc, st) {
	var i = sc.data.indexCurrentContract;
	
	sc.data.statusContract = '';
	sc.data.commentContract = '';
	sc.data.contract = sc.data.contracts[i];
	ctx.mail.init(sc.data.customerName);
	
	startScenarioSIRH(sc, (function() {
		//var mailPath = ctx.mail.createMail(sc.data.contract);
		
		var writeArray = getObjectValues(sc.data.contract);
		writeArray.push(ctx.date.formatTrace(new Date()));
		writeArray.push(sc.data.statusContract);
		writeArray.push(sc.data.commentContract);
		//writeArray.push(mailPath);
		
		ctx.excelHelper.writeArray(i + 2, writeArray);
		ctx.excelHelper.saveFile();
		
		if (i < sc.data.countContracts - 1) {
			sc.data.indexCurrentContract += 1;
			return sc.endStep(ActivInfinitev7.steps.startScenarioSIRH);
		}
		
		return sc.endStep();
	}));
}});

ActivInfinitev7.step({ endScenarioSIRH : function(ev, sc, st) {
	ctx.mail.end();
	ctx.trace.writeInfo('STEP - closeFile');
	ctx.excelHelper.closeFile();
	
	ctx.trace.writeInfo('STEP - writeStats');
	var stats = {};
	stats['fileName'] = ctx.configFile.getFileNameOutput();
	stats['totalTimeDuration'] = ctx.date.getTimeElapsedSince(ctx.date.diffTime(sc.data.totalTimeDuration, new Date()));
	stats['countCaseProcessed'] = sc.data.countCaseProcessed;
	ctx.stats.write(stats);
	
	return sc.endStep();
}});

function getObjectValues(obj) {
	var array = [];
	var keys = Object.keys(obj);
	for (var cellIndex in keys) {
		array.push(String(obj[keys[cellIndex]]));
	}
	return array;
}

function startScenarioSIRH(sc, callback) {
	ActivInfinitev7.scenarios.checkMembership.start(sc.data).onEnd(function(scCheckMembership) {
		sc.data.commentContract = scCheckMembership.data.commentContract;
		sc.data.statusContract = scCheckMembership.data.statusContract;
		callback();
	});
}
