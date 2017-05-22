ActivInfinite.scenario({ terminatedInAdvanceContract: function(ev, sc) {
	var data = sc.data;
	sc.onTimeout(ctx.config.getTimeout(), function(sc, st) { sc.endScenario();	});
	sc.onError(function(sc, st, ex) { sc.endScenario();	});
	sc.setMode(e.scenario.mode.noStartIfRunning);
	sc.step(ActivInfinite.steps.initializeTerminatedInAdvanceContract);
	sc.step(ActivInfinite.steps.searchTerminatedInAdvanceContract);
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
		sc.endStep();
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

ActivInfinite.step({ endTerminatedInAdvanceContract: function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP END - terminated in advance');
	sc.endStep();
}});
