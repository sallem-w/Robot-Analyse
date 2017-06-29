ActivInfinitev7.scenario({ checkContract: function(ev, sc) {
	sc.data.codeScenario = ctx.config.DA;
	sc.onTimeout(ctx.config.getTimeout(), function(sc, st) { sc.endScenario();	});
	sc.onError(function(sc, st, ex) { sc.endScenario();	});
	sc.setMode(e.scenario.mode.noStartIfRunning);
	sc.step(ActivInfinitev7.steps.navigateToSynthesis);
	sc.step(ActivInfinitev7.steps.searchContractByINSEE);
} });