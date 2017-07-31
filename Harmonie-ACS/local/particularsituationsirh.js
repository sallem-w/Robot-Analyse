(function () {
	ActivInfinitev7.scenario({ particularSituation2SIRH: function(ev, sc) {
		sc.data.codeScenario = ctx.config.SIRH;
		sc.data.currentScenario = 'Changement situation particulère - SIRH';
		sc.onTimeout(ctx.config.getTimeout(), function(sc, st) {
			ctx.trace.writeError(sc.data.contract.individualContractCollectif + ' Timeout aborting current scenario');
			sc.endStep(ActivInfinitev7.steps.abort);
		});
		sc.onError(function(sc, st, ex) {
			ctx.trace.writeError(sc.data.contract.individualContractCollectif + ex + ' aborting current scenario');
			sc.endStep(ActivInfinitev7.steps.abort);
		});
		sc.setMode(e.scenario.mode.noStartIfRunning);
		sc.step(ActivInfinitev7.steps.initializeParticularSituation1);
		sc.step(ActivInfinitev7.steps.waitDashboard);
		sc.step(ActivInfinitev7.steps.navigateToParticularSituation);
		sc.step(ActivInfinitev7.steps.seachParticularSituationContract);
		sc.step(ActivInfinitev7.steps.goToInfoRo);
		sc.step(ActivInfinitev7.steps.editInfoRo);
		sc.step(ActivInfinitev7.steps.checkNoParticularSituation);
		sc.step(ActivInfinitev7.steps.addParticularSituation);
		sc.step(ActivInfinitev7.steps.completeParticularSituation);
		sc.step(ActivInfinitev7.steps.goToContributionVisu);
		sc.step(ActivInfinitev7.steps.validateContributionVisu);
		sc.step(ActivInfinitev7.steps.saveContract); // from saveContract
		sc.step(ActivInfinitev7.steps.saveContractWaitMembershipColSearch); // from saveContract
		sc.step(ActivInfinitev7.steps.closeContractUpdate); // from saveContract
		sc.step(ActivInfinitev7.steps.endTerminatedSIRH);
		sc.step(ActivInfinitev7.steps.abort);
	}});

	ActivInfinitev7.step({ initializeParticularSituation1: function(ev, sc, st) {
		ctx.trace.writeInfo(sc.data.contract.individualContractCollectif + ' - START - Particular Situation 1 - ' + sc.data.codeScenario);
		return sc.endStep();
	}});

	ActivInfinitev7.step({ waitDashboard : function(ev, sc, st) {
		ActivInfinitev7.pDashboard.wait(function() {
			return sc.endStep();
		});
	}});

	ActivInfinitev7.step({ navigateToParticularSituation : function(ev, sc, st) {
		ActivInfinitev7.pDashboard.btParticularSituation.click();
		ActivInfinitev7.pSearchContractIndiv.wait(function() {
			return sc.endStep();
		});
	}});

	ActivInfinitev7.step({ seachParticularSituationContract: function(ev, sc, st) {
		ctx.scenarioHelper.searchContract(sc, null, function foundCb() {
			return sc.endStep();
		}, function notFoundCb() {
			return ctx.endScenario(sc);
		});
	} });

	ActivInfinitev7.step({ goToInfoRo: function(ev, sc, st) {
		ctx.scenarioHelper.goNextFromPageToPage(ActivInfinitev7.pTerminatedContractFo, ActivInfinitev7.pInfoRo, function (error) {
			if (error) {
				return ctx.endScenario(sc, error.message, 'Probléme lors de la navigation vers la page "Produits\Garanties", merci de remonter les logs au service technique', 'Erreur');
			}
			return sc.endStep();
		});
	} });

	ActivInfinitev7.step({ editInfoRo: function(ev, sc, st) {
		ActivInfinitev7.pInfoRo.btEdit.click();
		ActivInfinitev7.pInfoRoEdit.wait(function() {
			return sc.endStep();
		});
	} });

	ActivInfinitev7.step({ checkNoParticularSituation: function(ev, sc, st) {
		if (ActivInfinitev7.pInfoRoEdit.oNoSituation.exist()) {
			return sc.endStep();
		}
		return ctx.endScenario(sc, 'Particular situation already exists');
	} });

	ActivInfinitev7.step({ addParticularSituation: function(ev, sc, st) {
		ActivInfinitev7.pInfoRoEdit.btCreateSituation.click();
		ActivInfinitev7.pInfoRoEdit.events.LOAD.once(function() {
			return sc.endStep();
		});
	} });

	ActivInfinitev7.step({ completeParticularSituation: function(ev, sc, st) {
		ctx.setValue(ActivInfinitev7.pInfoRoEdit.oCodeSitPart0, 'SS BA');
		ActivInfinitev7.pInfoRoEdit.btValidate.click();
		ActivInfinitev7.pInfoRo.wait(function() {
			return sc.endStep();
		});
	} });

	ActivInfinitev7.step({ goToContributionVisu: function(ev, sc, st) {
		ctx.scenarioHelper.goNextFromPageToPage(ActivInfinitev7.pInfoRo, ActivInfinitev7.pContributionVisu, function (error) {
			if (error) {
				return ctx.endScenario(sc, error.message, 'Probléme lors de la navigation vers la page "Validation du compte cotisant", merci de remonter les logs au service technique', 'Erreur');
			}
			return sc.endStep();
		});
	} });

	ActivInfinitev7.step({ validateContributionVisu: function(ev, sc, st) {
		ctx.trace.writeInfo('STEP - validateContributionVisu');
		ctx.setValue(ActivInfinitev7.pContributionVisu.oValidation, 'OUI');
		return sc.endStep();
	} });

	// step saveContract from saveContract
	// step saveContractWaitMembershipColSearch from saveContract
	// step closeContractUpdate from saveContract
	
	ActivInfinitev7.step({ endTerminatedSIRH: function(ev, sc, st) {
		ctx.trace.writeInfo(sc.data.contract.individualContractCollectif + ' - STEP END - Particular Situation 1');
		return sc.endScenario();
	}});
})();
