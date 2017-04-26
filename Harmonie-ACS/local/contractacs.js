ActivInfinite.scenario({ searchContract: function(ev, sc) {
	var data = sc.data;
	sc.onTimeout(60000, function(sc, st) { sc.endScenario();	});
	sc.onError(function(sc, st, ex) { sc.endScenario();	});
	sc.setMode(e.scenario.mode.noStartIfRunning);
	sc.step(ActivInfinite.steps.initializePage);
	sc.step(ActivInfinite.steps.navigateToConsultation);
	sc.step(ActivInfinite.steps.searchIndividualContract);
	sc.step(ActivInfinite.steps.end);
}});

ActivInfinite.step({ initializePage: function(ev, sc, st) {
//	ActivInfinite.pDashboard.start();
//	ActivInfinite.pDashboard.wait(function() {
//			sc.endStep();
//	});
	sc.endStep();
}});

ActivInfinite.step({ navigateToConsultation : function(ev, sc, st) {
	ctx.trace.writeInfo('Start scenario searchContract ' + ctx.config.getCodeScenarioACS());
	ctx.trace.writeInfo('STEP - navigateToConsultation');

	function navigate() {
		setTimeout(function() {
			$('a[menuINFcl="0"]').mouseover();
			$('a[menuinfcl="41"]').mouseover();
			$('a[menuinfcl="42"]').click();
		}, 1500);
	};
	
	ActivInfinite.pDashboard.injectFunction(navigate);
	ActivInfinite.pDashboard.execScript('navigate()');
	ActivInfinite.pConsultContratIndiv.wait(function() {
		sc.endStep();
	});
}});

ActivInfinite.step({ searchIndividualContract: function(ev, sc, st) {
	ctx.trace.writeInfo('STEP - searchIndividualContract');
	ctx.trace.writeInfo(sc.data.contract.individualContract);
	ActivInfinite.pConsultContratIndiv.oNumeroContrat.set(sc.data.contract.individualContract);
	ActivInfinite.pConsultContratIndiv.btBtRecherche.click();
	ActivInfinite.pContratIndivFound.wait(function() {
		sc.endStep();
	});
}});

ActivInfinite.step({ end : function(ev, sc, st) {
	ctx.trace.writeInfo('STEP - end');
	ctx.trace.writeInfo('End scenario searchContract ' + ctx.config.getCodeScenarioACS());
	sc.endStep();
}});
