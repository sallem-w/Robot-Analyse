ActivInfinitev7.scenario({ saveContract: function(ev, sc) {
	sc.setMode(e.scenario.mode.noStartIfRunning);
	sc.step(ActivInfinitev7.steps.navigateToSaveUpdate);
	sc.step(ActivInfinitev7.steps.saveUpdate);
	sc.step(ActivInfinitev7.steps.saveUpdateEnd);
} });

ActivInfinitev7.step({ navigateToSaveUpdate : function(ev, sc, st) {
	ctx.scenarioHelper.goNextPageTill(ActivInfinitev7.pSaveUpdate, sc.endStep);
} });

ActivInfinitev7.step({ saveUpdate: function(ev, sc, st) {
	if (!sc.data.config.saveUpdate) {
		return ctx.endScenario(sc);
	}
			
	ActivInfinitev7.pSaveUpdate.btSave.click();
	ActivInfinitev7.pSaveUpdate.events.UNLOAD.once(sc.endStep);
} });

ActivInfinitev7.step({ saveUpdateEnd: function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - saveContract');
	sc.data.commentContract += ' | ' + sc.data.currentScenario + ' effectuée';
	sc.data.statusContract = ctx.excelHelper.constants.status.Success;
	return ctx.endScenario(sc);
} });