ActivInfinite.scenario({ terminatedContract: function(ev, sc) {
	var data = sc.data;
	sc.onTimeout(ctx.config.getTimeout(), function(sc, st) { sc.endScenario();	});
	sc.onError(function(sc, st, ex) { sc.endScenario();	});
	sc.setMode(e.scenario.mode.noStartIfRunning);
	sc.step(ActivInfinite.steps.initializeTerminatedContract);
	sc.step(ActivInfinite.steps.searchIndividualContractEffect);
	sc.step(ActivInfinite.steps.goToVisualizationContribution);
	sc.step(ActivInfinite.steps.goToVisualizationContribution);
	sc.step(ActivInfinite.steps.validationCalcul);
	sc.step(ActivInfinite.steps.saveContract);
	sc.step(ActivInfinite.steps.end);
}});

ActivInfinite.step({ initializeTerminatedContract: function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP START - contract terminated');
	
function navigateToEffect() {
		setTimeout(function() {
			$('a[menuINFcl="41"]').mouseover();
			$('a[menuINFcl="117"]').mouseover();
			$('a[menuINFcl="129"]').click();
		}, 1500);
	};
	
	ActivInfinite.pDashboard.injectFunction(navigateToEffect);
	ActivInfinite.pDashboard.execScript('navigateToEffect()');
	ActivInfinite.pEffectConsultContrac.wait(function() {
		sc.endStep();
	});
}});

ActivInfinite.step({ searchIndividualContractEffect: function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - searchIndividualContractEffect');
	ActivInfinite.pEffectConsultContrac.oIndividualContract.set(sc.data.contract.individualContract);
	ActivInfinite.pEffectConsultContrac.btSearch.click();
	sc.endStep();
}});

ActivInfinite.step({ goToVisualizationContribution: function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - goToVisualizationContribution');
	ActivInfinite.pEffectContractFound.wait(function() {
		ActivInfinite.pEffectContractFound.oBtNext.click();
		ActivInfinite.pEffectParamCalc.wait(function() {
			ActivInfinite.pEffectParamCalc.oBtNext.click();
			ActivInfinite.pEffectHistoCoti.wait(function() {
				ActivInfinite.pEffectHistoCoti.oBtNext.click();
				ActivInfinite.pEffectVisuCotis.wait(function() {
					sc.endStep();
				});
			});
		});
	});
}});

ActivInfinite.step({ validationCalcul: function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - validationCalcul');
	ActivInfinite.pEffectVisuCotis.oValidation.set('Oui');
	ActivInfinite.pEffectVisuCotis.oBtNext.click();
	ActivInfinite.pEffectValidation.wait(function() {
		sc.endStep();
	});
}});

ActivInfinite.step({ saveContract: function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - saveContract');
	ActivInfinite.pEffectValidation.oBtSave.click();
	sc.endStep();
}});

ActivInfinite.step({ end: function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP END - contract terminated');
	sc.endStep();
}});