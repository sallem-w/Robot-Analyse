ActivInfinite.scenario({ coverageChangeContract: function(ev, sc) {
	var data = sc.data;
	sc.onTimeout(ctx.config.getTimeout(), function(sc, st) { sc.endScenario();	});
	sc.onError(function(sc, st, ex) { sc.endScenario();	});
	sc.setMode(e.scenario.mode.noStartIfRunning);
	sc.step(ActivInfinite.steps.initializeCoverageChangeContract);
	sc.step(ActivInfinite.steps.endCoverageChangeContract);
}});

ActivInfinite.step({ initializeCoverageChangeContract: function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP START - coverage change');
	
	function navigateToCoverageChange() {
		setTimeout(function() {
			$('a[menuINFcl="41"]').mouseover();
			$('a[menuINFcl="117"]').mouseover();
			$('a[menuINFcl="129"]').click();
		}, 1500);
	};
	
	ActivInfinite.pDashboard.injectFunction(navigateToCoverageChange);
	ActivInfinite.pDashboard.execScript('navigateToCoverageChange()');
	ActivInfinite.pEffectConsultContrac.wait(function() {
		sc.endStep();
	});
}});

ActivInfinite.step({ endCoverageChangeContract: function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP END - coverage change');
	sc.endStep();
}});
