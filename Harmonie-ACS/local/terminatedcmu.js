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
	ctx.scenarioHelper.goTo(ctx.scenarioHelper.pageLinks.terminatedCMU);
	ActivInfinitev7.pSearchContractIndiv.wait(function() {
		sc.endStep();
	});
}});

ActivInfinitev7.step({ searchTerminatedContractCMU: function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - searchTerminatedContractCMU');
	ctx.scenarioHelper.searchContract(sc, function foundCb() {
		ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - contract found');
		sc.data.statusContract = ctx.excelHelper.constants.status.Success
		sc.endStep();
	}, function notFoundCb(errorMessage) {
		ctx.trace.writeError(sc.data.contract.individualContract + ' - error search contract : ' + errorMessage);
		sc.data.commentContract = 'Revoir centre: Erreur recherche contrat : ' + errorMessage;
		sc.data.statusContract = ctx.excelHelper.constants.status.Fail;
		ctx.scenarioHelper.goHome(function() {
			sc.endScenario();
		});
	});
}});

ActivInfinitev7.step({ endTerminatedCMU: function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP END - product terminated CMU');
	sc.endStep();
}});
