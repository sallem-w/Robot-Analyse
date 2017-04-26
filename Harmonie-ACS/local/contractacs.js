ActivInfinite.scenario({ searchContract: function(ev, sc) {
	var data = sc.data;
	sc.onTimeout(60000, function(sc, st) { sc.endScenario();	});
	sc.onError(function(sc, st, ex) { sc.endScenario();	});
	sc.setMode(e.scenario.mode.noStartIfRunning);
	sc.step(ActivInfinite.steps.initializePage);
	sc.step(ActivInfinite.steps.navigateToConsultation);
	sc.step(ActivInfinite.steps.searchIndividualContract);
	sc.step(ActivInfinite.steps.closeTabIndivudalContractFound);
	sc.step(ActivInfinite.steps.end);
}});

ActivInfinite.step({ initializePage: function(ev, sc, st) {
	sc.endStep();
}});

ActivInfinite.step({ navigateToConsultation : function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - START - searchContract - ' + ctx.config.getCodeScenarioACS());
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - navigateToConsultation');

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
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - searchIndividualContract');
	ActivInfinite.pConsultContratIndiv.oNumeroContrat.set(sc.data.contract.individualContract);
	ActivInfinite.pConsultContratIndiv.btBtRecherche.click();

	ActivInfinite.pContratIndivFound.wait(function() {
		//todo write output file SUCCESS
		sc.data.commentContract = 'Contract found \n';
		sc.data.statusContract = 'SUCCESS';
		sc.endStep();
	});
	
	ActivInfinite.pContratIndivNotFound.wait(function() {
		//todo write output file FAIL + error find in page
		sc.data.commentContract = ActivInfinite.pContractIndivNotFoun.oErreurDetail;
		sc.data.statusContract = 'FAIL';
		sc.endScenario();
	});

}});

ActivInfinite.step({ closeTabIndivudalContractFound: function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - closeTabIndivudalContractFound');
	ActivInfinite.pContratIndivFound.oBtFermer.click();
	sc.endStep();
}});

ActivInfinite.step({ end : function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - end');
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - END - searchContract - ' + ctx.config.getCodeScenarioACS());
	sc.endStep();
}});
