(function () {
	ActivInfinitev7.scenario({ terminatedCMU: function(ev, sc) {
		var data = sc.data;
		sc.data.currentScenario = 'Fin CMU';
		sc.onTimeout(ctx.config.getTimeout(), function(sc, st) {
			ctx.trace.writeError(sc.data.contract.individualContract + ' Timeout aborting current scenario');
			sc.endStep(ActivInfinitev7.steps.abort);
		});
		sc.onError(function(sc, st, ex) {
			ctx.trace.writeError(sc.data.contract.individualContract + ex + ' aborting current scenario');
			sc.endStep(ActivInfinitev7.steps.abort);
		});
		sc.setMode(e.scenario.mode.noStartIfRunning);
		sc.step(ActivInfinitev7.steps.initializeTerminatedCMU);
		sc.step(ActivInfinitev7.steps.searchTerminatedContractCMU);
		// start step from Terminated product
		sc.step(ActivInfinitev7.steps.goToVisualizationContribution);
		sc.step(ActivInfinitev7.steps.validationCalcul);
		sc.step(ActivInfinitev7.steps.saveContract); // from saveContract
		sc.step(ActivInfinitev7.steps.saveContractWaitSearchContractIndiv); // from saveContract
		sc.step(ActivInfinitev7.steps.closeContractUpdate); // from saveContract
		// end step from Terminated product
		
		sc.step(ActivInfinitev7.steps.endTerminatedCMU);
		sc.step(ActivInfinitev7.steps.abort);
	}});

	ActivInfinitev7.step({ initializeTerminatedCMU: function(ev, sc, st) {
		ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP START - product terminated CMU');
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

	// step goToVisualizationContribution from Terminated product
	// step validationCalcul from Terminated product
	// step saveContract from saveContract
	// step saveContractWaitSearchContractIndiv from saveContract
	// step closeContractUpdate from saveContract

	ActivInfinitev7.step({ endTerminatedCMU: function(ev, sc, st) {
		ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP END - product terminated CMU');
		return sc.endScenario();
	}});
})();
