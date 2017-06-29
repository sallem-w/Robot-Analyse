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
	sc.step(ActivInfinitev7.steps.navigateToSynthesis);
	sc.endStep();
}});

ActivInfinitev7.step({ endScenarioDA: function(ev, sc, st) {
	sc.endStep();
}});
