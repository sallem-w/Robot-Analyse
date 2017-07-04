ActivInfinitev7.step({ navigateToSynthesis : function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - navigateToSynthesis');
	ActivInfinitev7.pDashboard.btSynthesis.click();
	ActivInfinitev7.pSynthesisSearch.wait(function() {
		sc.endStep();
	});
}});
