ActivInfinitev7.scenario({ terminatedInAdvanceContract: function(ev, sc) {
	var data = sc.data;
	sc.onTimeout(ctx.config.getTimeout(), function(sc, st) { sc.endScenario();	});
	sc.onError(function(sc, st, ex) { sc.endScenario();	});
	sc.setMode(e.scenario.mode.noStartIfRunning);
	sc.step(ActivInfinitev7.steps.initializeTerminatedInAdvanceContract);
	sc.step(ActivInfinitev7.steps.searchTerminatedInAdvanceContract);
	sc.step(ActivInfinitev7.steps.goToSavePageTerminatedInAdvanceContract);
	sc.step(ActivInfinitev7.steps.saveContract);
	sc.step(ActivInfinitev7.steps.closeContractUpdate);
	sc.step(ActivInfinitev7.steps.endTerminatedInAdvanceContract);
}});

ActivInfinitev7.step({ initializeTerminatedInAdvanceContract: function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP START - terminated in advance');
	sc.data.commentContract += 'Résiliation en avance du contrat \n';

	function navigateToTerminatedInAdvance() {
		setTimeout(function() {
			window.location.href = '/mdg/Go.do?id=ACRE01REAC';
		}, 1500);
	};
	
	ActivInfinitev7.pDashboard.injectFunction(navigateToTerminatedInAdvance);
	ActivInfinitev7.pDashboard.execScript('navigateToTerminatedInAdvance()');
	ActivInfinitev7.pSearchContractIndiv.wait(function() {
		sc.endStep();
	});
}});

ActivInfinitev7.step({ searchTerminatedInAdvanceContract: function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - searchTerminatedInAdvanceContract');
	ActivInfinitev7.pSearchContractIndiv.oIndividualContract.set(sc.data.contract.individualContract);
	ActivInfinitev7.pSearchContractIndiv.oDateContract.set(ctx.date.formatDDMMYYYY(ctx.date.addYear(new Date(sc.data.contract.ACSCertificateEndDate), 1)));
	ActivInfinitev7.pSearchContractIndiv.btSearch.click();
	
	ActivInfinitev7.pSearchContractIndiv.events.UNLOAD.on(function() {
		ctx.scenarioHelper.checkIfContractFound(sc, function() {
			sc.endStep(ActivInfinitev7.steps.closeContractUpdate);
		});
		
		ActivInfinitev7.pTerminatedContractFo.events.LOAD.on(function() {
			ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - contract found');
			
			sc.data.commentContract += 'Contrat trouvé \n';
			sc.data.statusContract = ctx.excelHelper.constants.status.Success
			sc.endStep();
		});
	});
}});

ActivInfinitev7.step({ goToSavePageTerminatedInAdvanceContract: function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - goToSavePageTerminatedInAdvanceContract');
	
	ActivInfinitev7.pTerminatedContractFo.btNext.click();
	ActivInfinitev7.pBlockNotes.wait(function() {
		ActivInfinitev7.pBlockNotes.btNext.click();
		ActivInfinitev7.pCalculParam.wait(function() {
			ActivInfinitev7.pCalculParam.btNext.click();
			ActivInfinitev7.pCalculParam.events.UNLOAD.on(function() {
				//If pCalculParam is RELOAD, then an error is occured and we do check the calcul item
				ActivInfinitev7.pCalculParam.events.LOAD.on(function() {
					ActivInfinitev7.pCalculParam.oCalculCheck.click();
					ActivInfinitev7.pCalculParam.btNext.click();
				});
				
				ActivInfinitev7.pContributionHistory.events.LOAD.on(function() {
					ActivInfinitev7.pContributionHistory.btNext.click();
				});
				
				ActivInfinitev7.pContributionVisu.events.LOAD.on(function() {
					ActivInfinitev7.pContributionVisu.oValidation.set("OUI");
					ActivInfinitev7.pContributionVisu.btNext.click();
				});
				
				ActivInfinitev7.pSaveUpdate.wait(function() {
					sc.endStep();
				});
			});
		});
	});
}});


ActivInfinitev7.step({ endTerminatedInAdvanceContract: function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP END - terminated in advance');
	sc.endStep();
}});
