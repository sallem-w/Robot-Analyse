ActivInfinitev7.scenario({ terminatedProduct: function(ev, sc) {
	var data = sc.data;
	sc.onTimeout(ctx.config.getTimeout(), function(sc, st) { sc.endScenario();	});
	sc.onError(function(sc, st, ex) { sc.endScenario();	});
	sc.setMode(e.scenario.mode.noStartIfRunning);
	sc.step(ActivInfinitev7.steps.initializeTerminatedProduct);
	sc.step(ActivInfinitev7.steps.searchIndividualContractEffect);
	sc.step(ActivInfinitev7.steps.goToVisualizationContribution);
	sc.step(ActivInfinitev7.steps.validationCalcul);
	if (sc.data.config.saveUpdate) {
		sc.step(ActivInfinitev7.steps.saveContract);
	} else {
		sc.step(ActivInfinitev7.steps.closeContractUpdate);
	}
	sc.step(ActivInfinitev7.steps.endTerminatedProduct);
}});

ActivInfinitev7.step({ initializeTerminatedProduct: function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP START - product terminated');
	sc.data.commentContract = 'Radiation du produit';
	
	function navigateToTerminatedProduct() {
			window.location.href = '/mdg/Go.do?id=ACCC04STD';
	};
	
	ActivInfinitev7.pDashboard.injectFunction(navigateToTerminatedProduct);
	ActivInfinitev7.pDashboard.execScript('navigateToTerminatedProduct()');
	ActivInfinitev7.pSearchContractIndiv.wait(function() {
		sc.endStep();
	});
}});

ActivInfinitev7.step({ searchIndividualContractEffect: function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - searchIndividualContractEffect');
	ActivInfinitev7.pSearchContractIndiv.oIndividualContract.set(sc.data.contract.individualContract);
	ActivInfinitev7.pSearchContractIndiv.btSearch.click();
	ActivInfinitev7.pSearchContractIndiv.events.UNLOAD.on(function() {
		ctx.scenarioHelper.checkIfContractFound(sc, function() { 
			sc.endStep(ActivInfinitev7.steps.closeContractUpdate); 
		});
		
		ActivInfinitev7.pTerminatedContractFo.events.LOAD.on(function() {
			ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - contract found');
			
			sc.data.commentContract = 'Contrat trouvé';
			sc.data.statusContract = ctx.excelHelper.constants.status.Success;
			
			sc.endStep();
		});		
	})
}});


ActivInfinitev7.step({ goToVisualizationContribution: function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - goToVisualizationContribution');
	ActivInfinitev7.pTerminatedContractFo.wait(function() {
		ActivInfinitev7.pTerminatedContractFo.btNext.click();
		//Product update isn't a page of terminated contract scenario
		ActivInfinitev7.pProductUpdate.events.LOAD.on(function() {
			ActivInfinitev7.pProductUpdate.btNext.click();
		});
		//Divers param isn't a page of terminated contract scenario and it is not in all the terminated product scenario
		ActivInfinitev7.pDiversParam.events.LOAD.on(function() {
			ActivInfinitev7.pDiversParam.btNext.click();
		});
		ActivInfinitev7.pCalculParam.wait(function() {
			ActivInfinitev7.pCalculParam.btNext.click();
			ActivInfinitev7.pContributionHistory.wait(function() {
				ActivInfinitev7.pContributionHistory.btNext.click();
				ActivInfinitev7.pContributionVisu.wait(function() {	
					sc.endStep();
				});
			});		
		});
	});
}});

ActivInfinitev7.step({ validationCalcul: function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - validationCalcul');
	ActivInfinitev7.pContributionVisu.oValidation.set('OUI');
	ActivInfinitev7.pContributionVisu.btNext.click();
	sc.endStep();
}});

ActivInfinitev7.step({ saveContract: function(ev, sc, st) {
	ActivInfinitev7.pSaveUpdate.wait(function() {
		ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - saveContract');
		ActivInfinitev7.pSaveUpdate.btSave.click();
		sc.data.commentContract += '/ Modification effectuée';
		sc.data.statusContract = ctx.excelHelper.constants.status.Success;
		sc.endStep()
	});
}});

ActivInfinitev7.step({ closeContractUpdate: function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - closeContractUpdate');
	ActivInfinitev7.currentPage.btClose.click();
	
	function cancelSave() {
		$('.modal-footer > button[data-bb-handler="no"]').click();
	};
	
	ActivInfinitev7.currentPage.injectFunction(cancelSave);
	ActivInfinitev7.currentPage.execScript('cancelSave()');
	sc.endStep();
}});

ActivInfinitev7.step({ endTerminatedProduct: function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP END - product terminated');
	ActivInfinitev7.pDashboard.wait(function() {
		sc.endStep();
	});
}});

