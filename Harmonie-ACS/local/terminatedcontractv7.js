(function () {
	ActivInfinitev7.scenario({ terminatedContract: function(ev, sc) {
		var data = sc.data;
		sc.data.currentScenario = 'Sans-effet contrat';
		sc.onTimeout(ctx.config.getTimeout(), function(sc, st) {
			ctx.trace.writeError(sc.data.contract.individualContract + ' Timeout aborting current scenario');
			sc.endStep(ActivInfinitev7.steps.abort);
		});
		sc.onError(function(sc, st, ex) {
			ctx.trace.writeError(sc.data.contract.individualContract + ex + ' aborting current scenario');
			sc.endStep(ActivInfinitev7.steps.abort);
		});
		sc.setMode(e.scenario.mode.noStartIfRunning);
		sc.step(ActivInfinitev7.steps.initializeTerminatedContract);
		// start steps from TerminatedProduct
		sc.step(ActivInfinitev7.steps.searchIndividualContractEffect);
		sc.step(ActivInfinitev7.steps.goToVisualizationContribution);
		sc.step(ActivInfinitev7.steps.validationCalcul);
		sc.step(ActivInfinitev7.steps.saveContract); // from saveContract
		// end steps from TerminatedProduct
		sc.step(ActivInfinitev7.steps.endTerminatedContract);
		sc.step(ActivInfinitev7.steps.abort);
	}});

	ActivInfinitev7.step({ initializeTerminatedContract: function(ev, sc, st) {
		ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP START - terminated contract');
		ActivInfinitev7.pDashboard.btTerminatedContract.click();
		ActivInfinitev7.pSearchContractIndiv.wait(function() {
			return sc.endStep();
		});
	}});
	
	// step searchIndividualContractEffect from TerminatedProduct
	// step goToVisualizationContribution from TerminatedProduct
	// step validationCalcul from TerminatedProduct
	// step saveContract from saveContract
	// step saveContractWaitDashboard from saveContract
	
	ActivInfinitev7.step({ endTerminatedContract: function(ev, sc, st) {
		ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP END - terminated contract');
		return sc.endScenario();
	}});
})();
