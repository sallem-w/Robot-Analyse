(function () {
	ActivInfinitev7.scenario({ terminatedProduct: function(ev, sc) {
		var data = sc.data;
		sc.data.currentScenario = 'Sans-effet produit';
		sc.onTimeout(ctx.config.getTimeout(), function(sc, st) {
			ctx.trace.writeError(sc.data.contract.individualContract + ' Timeout aborting current scenario');
			sc.endStep(ActivInfinitev7.steps.abort);
		});
		sc.onError(function(sc, st, ex) {
			ctx.trace.writeError(sc.data.contract.individualContract + ex + ' aborting current scenario');
			sc.endStep(ActivInfinitev7.steps.abort);
		});
		sc.setMode(e.scenario.mode.noStartIfRunning);
		sc.step(ActivInfinitev7.steps.initializeTerminatedProduct);
		sc.step(ActivInfinitev7.steps.searchIndividualContractEffect);
		sc.step(ActivInfinitev7.steps.goToVisualizationContribution);
		sc.step(ActivInfinitev7.steps.validationCalcul);
		sc.step(ActivInfinitev7.steps.saveContract); // from saveContract
		sc.step(ActivInfinitev7.steps.saveContractWaitDashboard); // from saveContract
		sc.step(ActivInfinitev7.steps.endTerminatedProduct);
		sc.step(ActivInfinitev7.steps.abort);
	}});

	ActivInfinitev7.step({ initializeTerminatedProduct: function(ev, sc, st) {
		ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP START - product terminated');
		ActivInfinitev7.pDashboard.btTerminatedProduct.click();
		ActivInfinitev7.pSearchContractIndiv.wait(function() {
			return sc.endStep();
		});
	}});

	ActivInfinitev7.step({ searchIndividualContractEffect: function(ev, sc, st) {
		ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - searchIndividualContractEffect');
		ctx.scenarioHelper.searchContract(sc, null, function foundCb() {
			return sc.endStep();
		}, function notFoundCb() {
			return ctx.endScenario(sc);
		});
	}});

	ActivInfinitev7.step({ goToVisualizationContribution: function(ev, sc, st) {
		ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - goToVisualizationContribution');
		ctx.scenarioHelper.goNextPageTill(ActivInfinitev7.pContributionVisu, function () {
			return sc.endStep();
		});
	}});

	ActivInfinitev7.step({ validationCalcul: function(ev, sc, st) {
		ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - validationCalcul');
		// Into CMU, the contribution array is empty (message "aucune donnée") so the validation button doesn't exist
		if (ActivInfinitev7.pContributionVisu.oValidation.exist()) {
			ctx.setValue(ActivInfinitev7.pContributionVisu.oValidation, 'OUI');
		}

		ActivInfinitev7.pContributionVisu.btNext.click();
		ActivInfinitev7.pSaveUpdate.wait(function() {
			return sc.endStep();
		});
	}});
	
	// step saveContract from saveContract
	// step saveContractWaitDashboard from saveContract
	
	ActivInfinitev7.step({ endTerminatedProduct: function(ev, sc, st) {
		ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP END - product terminated');
		return sc.endScenario();
	}});
})();
