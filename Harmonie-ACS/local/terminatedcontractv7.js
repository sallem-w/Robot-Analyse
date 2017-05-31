ActivInfinitev7.scenario({ terminatedContract: function(ev, sc) {
	var data = sc.data;
	sc.onTimeout(ctx.config.getTimeout(), function(sc, st) { sc.endScenario();	});
	sc.onError(function(sc, st, ex) { sc.endScenario();	});
	sc.setMode(e.scenario.mode.noStartIfRunning);
	sc.step(ActivInfinitev7.steps.initializeTerminatedContract);
	sc.step(ActivInfinitev7.steps.searchIndividualContractEffect);
	sc.step(ActivInfinitev7.steps.goToVisualizationContribution);
	sc.step(ActivInfinitev7.steps.validationCalcul);
	if (sc.data.config.saveUpdate) {
		sc.step(ActivInfinitev7.steps.saveContract);
	} else {
		sc.step(ActivInfinitev7.steps.closeContractUpdate);
	}
	sc.step(ActivInfinitev7.steps.endTerminatedContract);
}});

ActivInfinitev7.step({ initializeTerminatedContract: function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP START - terminated contract');
	sc.data.commentContract += 'Résiliation du contrat \n';
	
	function navigateToTerminatedContract() {
			window.location.href = '/mdg/Go.do?id=ACRE04RE4S';
	};
	
	ActivInfinitev7.pDashboard.injectFunction(navigateToTerminatedContract);
	ActivInfinitev7.pDashboard.execScript('navigateToTerminatedContract()');
	ActivInfinitev7.pSearchContractIndiv.wait(function() {
		sc.endStep();
	});
}});


ActivInfinitev7.step({ endTerminatedContract: function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP END - terminated contract');
	ActivInfinitev7.pDashboard.wait(function() {
		sc.endStep();
	});
}});

