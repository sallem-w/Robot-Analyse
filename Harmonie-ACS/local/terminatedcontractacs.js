ActivInfinite.scenario({ terminatedContract: function(ev, sc) {
	var data = sc.data;
	sc.onTimeout(300000, function(sc, st) { sc.endScenario();	});
	sc.onError(function(sc, st, ex) { sc.endScenario();	});
	sc.setMode(e.scenario.mode.noStartIfRunning);
	sc.step(ActivInfinite.steps.initializeTerminatedContract);
	sc.step(ActivInfinite.steps.end);
}});

ActivInfinite.step({ initializeTerminatedContract: function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP START - contract terminated');
	sc.endStep();
}});

ActivInfinite.step({ end: function(ev, sc, st) {
		ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP END - contract terminated');
	sc.endStep();
}});