ActivInfinitev7.step({ navigateToSynthesis : function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - navigateToSynthesis');
	ActivInfinitev7.pDashboard.btSynthesisMenu.click();
	ActivInfinitev7.pDashboard.btIndividualContract.click();
	ActivInfinitev7.pDashboard.btContractContexte.click();
	ActivInfinitev7.pSynthesisSearch.wait(function() {
		return sc.endStep();
	});
}});
