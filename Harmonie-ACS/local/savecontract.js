ActivInfinitev7.step({ saveContract: function(ev, sc, st) {
	if (!sc.data.config.saveUpdate) {
		return ctx.endScenario(sc);
	}
		
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - saveContract');
	ActivInfinitev7.pSaveUpdate.btSave.click();
	sc.data.commentContract += ' | ' + sc.data.currentScenario + ' effectuée';
	sc.data.statusContract = ctx.excelHelper.constants.status.Success;
	
	// Next step possible load multiple page : Dashboard / MembershipSearch / SearchContractIndiv
	ActivInfinitev7.pSaveUpdate.events.UNLOAD.once(function() {
		return sc.endStep();
	});
}});

ActivInfinitev7.step({ saveContractWaitDashboard: function(ev, sc, st) {
	ActivInfinitev7.pDashboard.wait(function() {
		return sc.endStep(ActivInfinitev7.steps.endTerminatedProduct);
	});
}});

ActivInfinitev7.step({ saveContractWaitSearchContractIndiv: function(ev, sc, st) {
	ActivInfinitev7.pSearchContractIndiv.wait(function() {
		return sc.endStep();
	});
}});

ActivInfinitev7.step({ saveContractWaitMembershipColSearch: function(ev, sc, st) {
	ActivInfinitev7.pMembershipColSearch.wait(function() {
		return sc.endStep();
	});
}});
	
ActivInfinitev7.step({ closeContractUpdate: function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - closeContractUpdate');
	return ctx.scenarioHelper.goHome(function () {
		return sc.endStep();
	});
}});
