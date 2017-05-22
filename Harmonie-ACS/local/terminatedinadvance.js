ActivInfinite.scenario({ terminatedInAdvanceContract: function(ev, sc) {
	var data = sc.data;
	sc.onTimeout(ctx.config.getTimeout(), function(sc, st) { sc.endScenario();	});
	sc.onError(function(sc, st, ex) { sc.endScenario();	});
	sc.setMode(e.scenario.mode.noStartIfRunning);
	sc.step(ActivInfinite.steps.initializeTerminatedInAdvanceContract);
	sc.step(ActivInfinite.steps.searchTerminatedInAdvanceContract);
	sc.step(ActivInfinite.steps.calculTerminatedInAdvanceContract);
	sc.step(ActivInfinite.steps.goToSavePageTerminatedInAdvanceContract);
	sc.step(ActivInfinite.steps.saveTerminatedInAdvanceContract);
	sc.step(ActivInfinite.steps.endTerminatedInAdvanceContract);
}});

ActivInfinite.step({ initializeTerminatedInAdvanceContract: function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP START - terminated in advance');

	function navigateToTerminatedInAdvance() {
		setTimeout(function() {
			$('a[menuINFcl="41"]').mouseover();
			$('a[menuINFcl="117"]').mouseover();
			$('a[menuINFcl="125"]').click();
		}, 1500);
	};
	
	ActivInfinite.pDashboard.injectFunction(navigateToTerminatedInAdvance);
	ActivInfinite.pDashboard.execScript('navigateToTerminatedInAdvance()');
	ActivInfinite.pConsultContratIndiv.wait(function() {
		sc.endStep();
	});
}});

ActivInfinite.step({ searchTerminatedInAdvanceContract: function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - searchTerminatedInAdvanceContract');
	
	ActivInfinite.pConsultContratIndiv.oIndividualContract.set(sc.data.contract.individualContract);
	ActivInfinite.pConsultContratIndiv.oDateContract.set(ctx.date.formatDDMMYYYY(ctx.date.addYear(new Date(sc.data.contract.ACSCertificateEndDate), 1)));
	ActivInfinite.pConsultContratIndiv.btSearch.click();

	ActivInfinite.pContratIndivFound.events.LOAD.on(function() {
		ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - contract found');
		
		sc.data.commentContract += 'Contrat trouvé \n';
		sc.data.statusContract = ctx.excelHelper.constants.status.Success;
		
		ActivInfinite.pContratIndivFound.oBtNext.click();
		ActivInfinite.pBlockNotes.wait(function() {
			ActivInfinite.pBlockNotes.oBtNext.click();
				ActivInfinite.pEffectParamCalc.wait(function() {
					sc.endStep();
			});
		});
	});
	
	ActivInfinite.pContractIndivNotFoun.events.LOAD.on(function() {
		ctx.trace.writeInfo(sc.data.contract.individualContract + ' - END SCENARIO - contract not found');
		
		sc.data.commentContract = ActivInfinite.pContractIndivNotFoun.oDetailError.get() + '\n';
		sc.data.statusContract = ctx.excelHelper.constants.status.Fail;
		ActivInfinite.pContractIndivNotFoun.oBtClose.click();
		ActivInfinite.pPopupCloseEffect.events.LOAD.on(function() {
			ActivInfinite.pPopupCloseEffect.btNo.click();				
			sc.endScenario();
		});
	});

}});

ActivInfinite.step({ calculTerminatedInAdvanceContract: function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - calculTerminatedInAdvanceContract');
	
	ActivInfinite.pEffectParamCalc.oBtNext.click();
	
	ActivInfinite.pContractIndivNotFoun.events.LOAD.on(function() {
		ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - compare date');
		
		var errorMessage = ActivInfinite.pContractIndivNotFoun.oDetailError.get();
		var date = getDateInErrorMessage(errorMessage);
		
		// TODO compare date
		
		ActivInfinite.pContractIndivNotFoun.oBtCloseThisPage.click();
		ActivInfinite.pEffectParamCalc.wait(function() {
			ActivInfinite.pEffectParamCalc.oCheckCalcul.click();
			ActivInfinite.pEffectParamCalc.oBtNext.click();
				sc.endStep(ActivInfinite.steps.saveTerminatedInAdvanceContract);
				return;
		});
	});
	
	ActivInfinite.pEffectHistoCoti.events.LOAD.on(function() {
		ActivInfinite.pEffectHistoCoti.oBtNext.click();
		sc.endStep();
	});
	
}});

ActivInfinite.step({ goToSavePageTerminatedInAdvanceContract: function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - goToSavePageTerminatedInAdvanceContract');
	
	ActivInfinite.pEffectVisuCotis.wait(function() {
		ActivInfinite.pEffectVisuCotis.oValidation.set('Oui');
		ActivInfinite.pEffectVisuCotis.oBtNext.click();
		sc.endStep();
	});
}});

ActivInfinite.step({ saveTerminatedInAdvanceContract: function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - saveTerminatedInAdvanceContract');
	ActivInfinite.pEffectValidation.wait(function() {
		ActivInfinite.pEffectValidation.oBtSave.click();
		
		ActivInfinite.pConsultContratIndiv.events.LOAD.on(function() {
			ActivInfinite.pConsultContratIndiv.oBtClose.click();
			ActivInfinite.pPopupCloseEffect.events.LOAD.on(function() {
				ActivInfinite.pPopupCloseEffect.btNo.click();
				sc.endStep();
			});
		});
	});
}});

ActivInfinite.step({ endTerminatedInAdvanceContract: function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP END - terminated in advance');
	sc.endStep();
}});

function getDateInErrorMessage(errorMessage) {
	var strDate = ctx.string.trim(errorMessage.split(':')[1]);
	return ctx.date.parseToDate(strDate);
}
