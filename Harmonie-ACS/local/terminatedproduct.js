ActivInfinitev7.scenario({ terminatedProduct: function(ev, sc) {
	var data = sc.data;
	sc.data.currentScenario = 'Sans-effet produit';
	sc.onTimeout(ctx.config.getTimeout(), function(sc, st) { sc.endStep(ActivInfinitev7.steps.abort)	});
	sc.onError(function(sc, st, ex) { sc.endStep(ActivInfinitev7.steps.abort)	});
	sc.setMode(e.scenario.mode.noStartIfRunning);
	sc.step(ActivInfinitev7.steps.initializeTerminatedProduct);
	sc.step(ActivInfinitev7.steps.searchIndividualContractEffect);
	sc.step(ActivInfinitev7.steps.goToVisualizationContribution);
	sc.step(ActivInfinitev7.steps.validationCalcul);
	sc.step(ActivInfinitev7.steps.saveContract);
	sc.step(ActivInfinitev7.steps.closeContractUpdate);
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
	ActivInfinitev7.pTerminatedContractFo.wait(function() {
		ActivInfinitev7.pTerminatedContractFo.btNext.click();
		//Product update isn't a page of terminated contract scenario
		ActivInfinitev7.pProductUpdate.events.LOAD.once(function() {
			ActivInfinitev7.pProductUpdate.btNext.click();
		});
		//Divers param isn't a page of terminated contract scenario and it is not in all the terminated product scenario
		ActivInfinitev7.pDiversParam.events.LOAD.once(function() {
			ActivInfinitev7.pDiversParam.btNext.click();
		});
		//Block notes page comes from 'terminatedCMU' scenario
		ActivInfinitev7.pBlockNotes.events.LOAD.once(function() {
			ActivInfinitev7.pBlockNotes.btNext.click();
		});
		ActivInfinitev7.pCalculParam.wait(function() {
			ActivInfinitev7.pCalculParam.btNext.click();
			ActivInfinitev7.pContributionHistory.wait(function() {
				ActivInfinitev7.pContributionHistory.btNext.click();
				ActivInfinitev7.pContributionVisu.wait(function() {	
					return sc.endStep();
				});
			});		
		});
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
	if (!ActivInfinitev7.currentPage.btClose.exist()) {
		return sc.endStep();
	}
	
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - closeContractUpdate');
	ActivInfinitev7.currentPage.btClose.click();
	
	function cancelSave() {
		$('.modal-footer > button[data-bb-handler="no"]').click();
	};
	
	ActivInfinitev7.currentPage.injectFunction(cancelSave);
	ActivInfinitev7.currentPage.execScript('cancelSave()');
	// if the search contract page is loaded, we redirect to home
	ActivInfinitev7.pSearchContractIndiv.events.LOAD.once(function() {
		ctx.scenarioHelper.goTo(ctx.scenarioHelper.pageLinks.dashboard);
	});
	ActivInfinitev7.pDashboard.wait(function() {
		return sc.endStep();
	});
}});

ActivInfinitev7.step({ endTerminatedProduct: function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP END - product terminated');
	return sc.endScenario();
}});
