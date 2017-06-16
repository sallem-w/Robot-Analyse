ActivInfinitev7.scenario({ scenarioSIRH: function(ev, sc) {
	sc.data.scenarioCode = ctx.config.SIRH;
	sc.onTimeout(ctx.config.getTimeout(), function(sc, st) { sc.endScenario(); });
	sc.onError(function(sc, st, ex) { sc.endScenario();	});
	sc.setMode(e.scenario.mode.clearIfRunning);
	sc.step(ActivInfinitev7.steps.initScenarioSIRH);
	sc.step(ActivInfinitev7.steps.startScenarioASIRH);
	sc.step(ActivInfinitev7.steps.endScenarioSIRH);
}});
	
ActivInfinitev7.step({ initScenarioSIRH : function(ev, sc, st) {
	ctx.trace.writeInfo('Start scenario ' + sc.data.scenarioCode);
	sc.data.config = ctx.config.getConfig(sc.data.scenarioCode);

	sc.endStep();
}});
	
ActivInfinitev7.step({ startScenarioASIRH : function(ev, sc, st) {
	sc.endStep();
}});

ActivInfinitev7.step({ endScenarioSIRH : function(ev, sc, st) {
	ctx.trace.writeInfo('STEP - closeFile');
	ctx.excelHelper.closeFile();
	sc.endStep();
}});
