// TODO see to merge with TerminatedProduct in a single scenario

setupScenario = setupScenario || {};

setupScenario.terminatedCMU = function setUpScenarioTerminatedCMU() {
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
		sc.step(ActivInfinitev7.steps.goToVisualizationContribution);
		sc.step(ActivInfinitev7.steps.validationCalcul);
		sc.step(ActivInfinitev7.steps.saveContract);
		sc.step(ActivInfinitev7.steps.closeContractUpdate);
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
		return sc.endStep();
	}});

	ActivInfinitev7.step({ saveContract: function(ev, sc, st) {
		ActivInfinitev7.pSaveUpdate.wait(function() {
			if (!sc.data.config.saveUpdate) {
				return sc.endStep();
			}
				
			ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - saveContract');
			ActivInfinitev7.pSaveUpdate.btSave.click();
			sc.data.commentContract += ' | ' + sc.data.currentScenario + ' effectuée';
			sc.data.statusContract = ctx.excelHelper.constants.status.Success;
			return sc.endStep();
		});
	}});

	ActivInfinitev7.step({ closeContractUpdate: function(ev, sc, st) {
		ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - closeContractUpdate');
		return ctx.scenarioHelper.goHome(function () {
			return sc.endStep();
		});
	}});

	ActivInfinitev7.step({ endTerminatedCMU: function(ev, sc, st) {
		ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP END - product terminated CMU');
		return sc.endScenario();
	}});
}
