﻿ActivInfinitev7.scenario({ navigationMenu: function(ev, sc) {
	var data = sc.data;
	sc.onTimeout(ctx.config.getTimeout(), function(sc, st) { sc.endScenario(); });
	sc.onError(function(sc, st, ex) { sc.endScenario();	});
	sc.setMode(e.scenario.mode.clearIfRunning);
	sc.step(ActivInfinitev7.steps.navigate);
	sc.step(ActivInfinitev7.steps.end);
}});

ActivInfinitev7.step({ navigate : function(ev, sc, st) {
	
	function navigateToConsultation() {
		setTimeout(function() {
			window.location.href = "/mdg/Go.do?id=ACCO03STSO";
		}, 1500);
	};
	
	ActivInfinitev7.pDashboard.injectFunction(navigateToConsultation);
	ActivInfinitev7.pDashboard.execScript('navigateToConsultation()');
	ActivInfinitev7.pConsultContratIndiv.wait(function() {
		sc.endStep();
	});
}});

ActivInfinitev7.step({ end : function(ev, sc, st) {
	sc.endStep();
}});