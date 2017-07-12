ActivInfinitev7.scenario({ particularSituation1SIRH: function(ev, sc) {
	sc.data.codeScenario = ctx.config.SIRH;
	sc.onTimeout(ctx.config.getTimeout(), function(sc, st) { sc.endScenario();	});
	sc.onError(function(sc, st, ex) { sc.endScenario();	});
	sc.setMode(e.scenario.mode.noStartIfRunning);
	sc.step(ActivInfinitev7.steps.initializeParticularSituation1);
	sc.step(ActivInfinitev7.steps.waitDashboard);
	sc.step(ActivInfinitev7.steps.navigateToParticularSituation);
	sc.step(ActivInfinitev7.steps.seachParticularSituationContract);
	sc.step(ActivInfinitev7.steps.nextBlockQuote);
	sc.step(ActivInfinitev7.steps.nextInsuredIdent);
	sc.step(ActivInfinitev7.steps.nextInfoRo);
	sc.step(ActivInfinitev7.steps.editInfoRo);
	sc.step(ActivInfinitev7.steps.checkNoParticularSituation);
	sc.step(ActivInfinitev7.steps.addParticularSituation);
	sc.step(ActivInfinitev7.steps.completeParticularSituation);
	sc.step(ActivInfinitev7.steps.particularSituation1End);
}});

ActivInfinitev7.step({ initializeParticularSituation1: function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContractCollectif + ' - START - Particular Situation 1 - ' + sc.data.codeScenario);
	return sc.endStep();
}});

ActivInfinitev7.step({ waitDashboard : function(ev, sc, st) {
	ActivInfinitev7.pDashboard.wait(sc.endStep);
}});

ActivInfinitev7.step({ navigateToParticularSituation : function(ev, sc, st) {
	ActivInfinitev7.pDashboard.btParticularSituation;
	ActivInfinitev7.pSearchContractIndiv.wait(sc.endStep);
}});

ActivInfinitev7.step({ seachParticularSituationContract: function(ev, sc, st) {
	ctx.scenarioHelper.searchContract(sc, null, sc.endStep, function () {
		sc.endScenario(sc);
	});
} });

ActivInfinitev7.step({ nextBlockQuote: function(ev, sc, st) {
	ActivInfinitev7.pTerminatedContractFo.btNext.click();
	ActivInfinitev7.pBlockNotes.wait(sc.endStep);
} });

ActivInfinitev7.step({ nextInsuredIdent: function(ev, sc, st) {
	ActivInfinitev7.pBlockNotes.btNext.click();
	ActivInfinitev7.pInsuredIdent.wait(sc.endStep);
} });

ActivInfinitev7.step({ nextInfoRo: function(ev, sc, st) {
	ActivInfinitev7.pInsuredIdent.btNext.click();
	ActivInfinitev7.pInfoRo.wait(sc.endStep);
} });

ActivInfinitev7.step({ editInfoRo: function(ev, sc, st) {
	ActivInfinitev7.pInfoRo.btEdit.click();
	ActivInfinitev7.pInfoRoEdit.wait(sc.endStep);
} });

ActivInfinitev7.step({ checkNoParticularSituation: function(ev, sc, st) {
	if (ActivInfinitev7.pInfoRoEdit.oNoSituation.exist()) {
		return sc.endStep();
	}
	ctx.endScenario(sc, 'Particular situation already exists');
} });

ActivInfinitev7.step({ addParticularSituation: function(ev, sc, st) {
	ActivInfinitev7.pInfoRoEdit.btCreateSituation.click();
	ActivInfinitev7.pInfoRoEdit.events.LOAD.once(sc.endStep);
} });

ActivInfinitev7.step({ completeParticularSituation: function(ev, sc, st) {
	ActivInfinitev7.pInfoRoEdit.oCodeSitPart0.set('ADH SANS BA');
	ActivInfinitev7.pInfoRoEdit.btValidate();
	ActivInfinitev7.pInfoRo.wait(sc.endStep);
} });

ActivInfinitev7.step({ particularSituation1End: function (ev, sc, st) {
	ctx.endScenario(sc);
} });
