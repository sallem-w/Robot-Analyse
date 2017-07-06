ActivInfinitev7.scenario({ terminatedInAdvanceContract: function(ev, sc) {
	var data = sc.data;
	sc.data.currentScenario = 'Contrat résilié en avance';
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
	ActivInfinitev7.pDashboard.btIndivContractMenu.click();
	ActivInfinitev7.pDashboard.btTerminatedMenu.click();
	ActivInfinitev7.pDashboard.btTerminatedInAdvance.click();
	ActivInfinitev7.pSearchContractIndiv.wait(function() {
		sc.endStep();
	});
}});

ActivInfinitev7.step({ searchTerminatedInAdvanceContract: function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - searchTerminatedInAdvanceContract');
	var date  = ctx.date.formatDDMMYYYY(ctx.date.addYear(new Date(sc.data.contract.ACSCertificateEndDate), 1));
	ctx.scenarioHelper.searchContract(sc, date, function foundCb() {
		sc.endStep();
	}, function notFoundCb() {
		ctx.endScenario(sc);
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
