﻿(function () {
	ActivInfinitev7.scenario({ terminatedInAdvanceContract: function(ev, sc) {
		var data = sc.data;
		sc.data.currentScenario = 'Contrat résilié en avance';
		sc.onTimeout(ctx.config.getTimeout(), function(sc, st) {
			ctx.trace.writeError(sc.data.contract.individualContract + ' Timeout aborting current scenario');
			sc.endStep(ActivInfinitev7.steps.abort);
		});
		sc.onError(function(sc, st, ex) {
			ctx.trace.writeError(sc.data.contract.individualContract + ex + ' aborting current scenario');
			sc.endStep(ActivInfinitev7.steps.abort);
		});
		sc.setMode(e.scenario.mode.noStartIfRunning);
		sc.step(ActivInfinitev7.steps.initializeTerminatedInAdvanceContract);
		sc.step(ActivInfinitev7.steps.searchTerminatedInAdvanceContract);
		sc.step(ActivInfinitev7.steps.goToSavePageTerminatedInAdvanceContract);
		sc.step(ActivInfinitev7.steps.checkCalculIfNeeded);
		sc.step(ActivInfinitev7.steps.validateContribution);
		sc.step(ActivInfinitev7.steps.saveContract); // from TerminatedProduct
		sc.step(ActivInfinitev7.steps.closeContractUpdate); // from TerminatedProduct
		sc.step(ActivInfinitev7.steps.endTerminatedInAdvanceContract);
		sc.step(ActivInfinitev7.steps.abort);
	}});

	ActivInfinitev7.step({ initializeTerminatedInAdvanceContract: function(ev, sc, st) {
		ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP START - terminated in advance');
		ActivInfinitev7.pDashboard.btTerminatedInAdvance.click();
		ActivInfinitev7.pSearchContractIndiv.wait(function() {
			return sc.endStep();
		});
	}});

	ActivInfinitev7.step({ searchTerminatedInAdvanceContract: function(ev, sc, st) {
		ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - searchTerminatedInAdvanceContract');
		var date  = ctx.date.formatDDMMYYYY(ctx.date.addYear(new Date(sc.data.contract.ACSCertificateEndDate), 1));
		ctx.scenarioHelper.searchContract(sc, date, function foundCb() {
			return sc.endStep();
		}, function notFoundCb() {
			return ctx.endScenario(sc);
		});
	}});

	ActivInfinitev7.step({ goToSavePageTerminatedInAdvanceContract: function(ev, sc, st) {
		ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - goToSavePageTerminatedInAdvanceContract');
		ctx.scenarioHelper.goNextPageTill(ActivInfinitev7.pCalculParam, function () {
			return sc.endStep();
		});
	}});

	ActivInfinitev7.step({ checkCalculIfNeeded: function () {
		if(!ActivInfinitev7.pCalculParam.oNoCalculStatic.exist()) {
			ActivInfinitev7.pCalculParam.oCalculCheck.click();
		}
		ctx.scenarioHelper.goNextPageTill(ActivInfinitev7.pContributionVisu, function () {
			return sc.endStep();
		});
	} });

	ActivInfinitev7.step({ validateContribution: function (ev) {
		ActivInfinitev7.pContributionVisu.oValidation.set("OUI");
		ctx.scenarioHelper.goNextPageTill(ActivInfinitev7.pSaveUpdate, function () {
			return sc.endStep();
		});
	} });
	
	// step saveContract from TerminatedProduct
	// step closeContractUpdate from TerminatedProduct

	ActivInfinitev7.step({ endTerminatedInAdvanceContract: function(ev, sc, st) {
		ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP END - terminated in advance');
		return sc.endScenario();
	}});
})();
