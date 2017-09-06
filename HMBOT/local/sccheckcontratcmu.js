
/** Description */
ActivInfinitev7.scenario({ scVerifContrat: function(ev, sc) {
	var data = sc.data;
	sc.onTimeout(30000, function(sc, st) { sc.endScenario();	}); // default timeout handler for each step
	sc.onError(function(sc, st, ex) { sc.endScenario();	}); // default error handler
	sc.setMode(e.scenario.mode.clearIfRunning);
	// add steps here...
	
	sc.step(ActivInfinitev7.steps.stInitScVerifContratCMU);

	sc.step(ActivInfinitev7.steps.stVerifBenefCMU);
	sc.step(ActivInfinitev7.steps.stProchainBenefCMU);
//	sc.step(ActivInfinitev7.steps.stNavigVersListProduitCMU);
//	sc.step(ActivInfinitev7.steps.stVerifEtatProduitCMU);
//	sc.step(ActivInfinitev7.steps.stProchainProduitCMU);
//	sc.step(ActivInfinitev7.steps.stContributionCMU);
//	sc.step(ActivInfinitev7.steps.stVerifContributionCMU);
	
	sc.step(ActivInfinitev7.steps.stFinScVerifContratCMU);
	
}});


/** Description */
ActivInfinitev7.step({ stInitScVerifContratCMU : function(ev, sc, st) {
	var data = sc.data;
	ctx.log('step ');
	sc.endStep();
	return;
}});


/** Description */
ActivInfinitev7.step({ stVerifBenefCMU : function(ev, sc, st) {
	var data = sc.data;
	
	sc.endStep();
	return;
}});


/** Description */
ActivInfinitev7.step({ stProchainBenefCMU : function(ev, sc, st) {
	var data = sc.data;
	
	sc.endStep();
	return;
}});



/** Description */
ActivInfinitev7.step({ stFinScVerifContratCMU : function(ev, sc, st) {
	var data = sc.data;
	
	sc.endScenario();
	return;
}});

