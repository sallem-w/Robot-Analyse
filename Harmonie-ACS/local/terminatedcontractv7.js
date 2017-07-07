ActivInfinitev7.scenario({ terminatedContract: function(ev, sc) {
	var data = sc.data;
	sc.data.currentScenario = 'Sans-effet contrat';
	sc.onTimeout(ctx.config.getTimeout(), function(sc, st) { ctx.scenarioHelper.connectionAuto(sc);	});
	sc.onError(function(sc, st, ex) { ctx.scenarioHelper.connectionAuto(sc);	});
	sc.setMode(e.scenario.mode.noStartIfRunning);
	sc.step(ActivInfinitev7.steps.initializeTerminatedContract);
	sc.step(ActivInfinitev7.steps.searchIndividualContractEffect);
	sc.step(ActivInfinitev7.steps.goToVisualizationContribution);
	sc.step(ActivInfinitev7.steps.validationCalcul);
	sc.step(ActivInfinitev7.steps.saveContract);
	sc.step(ActivInfinitev7.steps.closeContractUpdate);
	sc.step(ActivInfinitev7.steps.endTerminatedContract);
}});

ActivInfinitev7.step({ initializeTerminatedContract: function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP START - terminated contract');
	ActivInfinitev7.pDashboard.btTerminatedContract.click();
	ActivInfinitev7.pSearchContractIndiv.wait(function() {
		return sc.endStep();
	});
}});

ActivInfinitev7.step({ endTerminatedContract: function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP END - terminated contract');
	ActivInfinitev7.pDashboard.wait(function() {
		return sc.endStep();
	});
}});
