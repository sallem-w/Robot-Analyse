ActivInfinitev7.scenario({ checkContractCMU: function(ev, sc) {
	sc.data.scenarioCode = ctx.config.CMU;
	sc.onTimeout(ctx.config.getTimeout(), function(sc, st) { sc.endScenario(); });
	sc.onError(function(sc, st, ex) { sc.endScenario();	});
	sc.setMode(e.scenario.mode.clearIfRunning);
	sc.step(ActivInfinitev7.steps.initializeCheckContract);
	sc.step(ActivInfinitev7.steps.navigateToConsultation);
	sc.step(ActivInfinitev7.steps.searchIndividualContractEffect);
	sc.step(ActivInfinitev7.steps.navigateToInfoRo);
	sc.step(ActivInfinitev7.steps.closeConsultation);
	sc.step(ActivInfinitev7.steps.endCheckContract);
}});

ActivInfinitev7.step({ navigateToInfoRo: function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract +  ' - STEP - navigateToInfoRo');
	ActivInfinitev7.pTerminatedContractFo.btNavigateInsuredIden.click();
	ActivInfinitev7.pInsuredIdent.wait(function() {
		ActivInfinitev7.pInsuredIdent.btInfoRo.click();
		ActivInfinitev7.pInfoRo.wait(function() {
			sc.endStep();
		});
	});
}});

ActivInfinitev7.step({ closeConsultation: function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract +  ' - STEP - closeConsultation');
	ctx.scenarioHelper.goHome(function() {
		sc.endStep();
	});
}});

	