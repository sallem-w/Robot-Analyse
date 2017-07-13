ActivInfinitev7.scenario({ saveContract: function(ev, sc) {
	sc.setMode(e.scenario.mode.noStartIfRunning);
	sc.step(ActivInfinitev7.steps.navigateToSaveUpdate);
	sc.step(ActivInfinitev7.steps.waitNextPage);
	sc.step(ActivInfinitev7.steps.checkPageIsSaveUpddate);
	sc.step(ActivInfinitev7.steps.saveUpdate);
	sc.step(ActivInfinitev7.steps.saveUpdateEnd);
} });

ActivInfinitev7.step({ navigateToSaveUpdate : function(ev, sc, st) {
	ActivInfinitev7.currentPage.btNext.click();
	ActivInfinitev7.currentPage.events.UNLOAD.once(sc.endStep);
} });


ActivInfinitev7.step({ waitNextPage: function(ev, sc, st) {
	if (!ActivInfinitev7.currentPage || !ActivInfinitev7.currentPage.exist()) {
		return ctx.wait(function () {
			sc.endStep(ActivInfinitev7.steps.waitNextPage);
		});
	}
	return sc.endStep();
} });

ActivInfinitev7.step({ checkPageIsSaveUpddate: function(ev, sc, st) {
	if (ActivInfinitev7.currentPage.name !== ActivInfinitev7.pSaveUpdate.name) {
		return sc.endStep(ActivInfinitev7.steps.navigateToSaveUpdate);
	}
	return sc.endStep();
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