ActivInfinitev7.step({ navigateToSynthesis : function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - navigateToSynthesis');
	ctx.scenarioHelper.goTo(ctx.scenarioHelper.pageLinks.synthesis);
	ActivInfinitev7.pSynthesisSearch.wait(function() {
		sc.endStep();
	});
}});
