ActivInfinitev7.scenario({ particularSituation2SIRH: function(ev, sc) {
	sc.data.codeScenario = ctx.config.SIRH;
	sc.onTimeout(ctx.config.getTimeout(), function(sc, st) { sc.endStep(ActivInfinitev7.steps.abort) });
	sc.onError(function(sc, st, ex) {  sc.endStep(ActivInfinitev7.steps.abort)  });
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
	sc.step(ActivInfinitev7.steps.saveUpdateParticularSituation);
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
	ActivInfinitev7.pSearchContractIndivwait(function() {
		return sc.endStep();
	});
}});

ActivInfinitev7.step({ seachParticularSituationContract: function(ev, sc, st) {
	ctx.scenarioHelper.searchContract(sc, null, sc.endStep, function () {
		ctx.endScenario(sc);
	});
} });

ActivInfinitev7.step({ goToInfoRo: function(ev, sc, st) {
	ctx.scenarioHelper.goNextPageTill(ActivInfinitev7.pInfoRo, sc.endStep);
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
	ctx.endScenario(sc, 'Particular situation already exists');
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
	ctx.scenarioHelper.goNextPageTill(ActivInfinitev7.pContributionVisu, sc.endStep);
} });

ActivInfinitev7.step({ validateContributionVisu: function(ev, sc, st) {
	ctx.trace.writeInfo('STEP - validateContributionVisu');
	ctx.setValue(ActivInfinitev7.pContributionVisu.oValidation, 'OUI');
	return sc.endStep();
} });

ActivInfinitev7.step({ saveUpdateParticularSituation: function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContractCollectif + ' - END - Particular Situation 1 - ' + sc.data.codeScenario);
	ActivInfinitev7.scenarios.saveContract.start(sc.data).onEnd(function (scSaveContract) {
		sc.data.commentContract = scSaveContract.data.commentContract;
		sc.data.statusContract = scSaveContract.data.statusContract;
		ctx.endScenario(sc);
	});
} });
