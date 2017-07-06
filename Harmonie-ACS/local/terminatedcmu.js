ActivInfinitev7.scenario({ terminatedCMU: function(ev, sc) {
	var data = sc.data;
	sc.data.currentScenario = 'Fin CMU';
	sc.onTimeout(ctx.config.getTimeout(), function(sc, st) { sc.endScenario();	});
	sc.onError(function(sc, st, ex) { sc.endScenario();	});
	sc.setMode(e.scenario.mode.noStartIfRunning);
	sc.step(ActivInfinitev7.steps.initializeTerminatedCMU);
	sc.step(ActivInfinitev7.steps.searchTerminatedContractCMU);
	sc.step(ActivInfinitev7.steps.goToVisualizationContribution);
	sc.step(ActivInfinitev7.steps.validationCalcul);
	sc.step(ActivInfinitev7.steps.saveContract);
	sc.step(ActivInfinitev7.steps.closeContractUpdate);
	sc.step(ActivInfinitev7.steps.endTerminatedCMU);
}});

ActivInfinitev7.step({ initializeTerminatedCMU: function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP START - product terminated CMU');
	ActivInfinitev7.pDashboard.btIndivContractMenu.click();
	ActivInfinitev7.pDashboard.btTerminatedMenu.click();
	ActivInfinitev7.pDashboard.btTerminatedCMU.click();
	ActivInfinitev7.pSearchContractIndiv.wait(function() {
		return sc.endStep();
	});
}});

ActivInfinitev7.step({ searchTerminatedContractCMU: function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - searchTerminatedContractCMU');
	var date = ctx.date.formatDDMMYYYY(ctx.date.addDay(new Date(sc.data.contract.particularSituationEndDate), 1));
	ctx.scenarioHelper.searchContract(sc, date, function foundCb() {
		return sc.endStep();
	}, function notFoundCb(errorMessage) {
		return ctx.endScenario(sc);
	});
}});

ActivInfinitev7.step({ endTerminatedCMU: function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP END - product terminated CMU');
	return sc.endStep();
}});
