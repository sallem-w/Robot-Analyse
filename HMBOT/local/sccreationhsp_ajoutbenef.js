
/** Description */
ActivInfinitev7.scenario({ scCreationHSP_AjoutBenef: function(ev, sc) {
	var data = sc.data;
	sc.onTimeout(120000, function(sc, st) { 
		ActivInfinitev7.pTabDeBord.start(data.webData.tabDeBordURL);
		sc.endScenario();	
	}); // default timeout handler for each step
	sc.onError(function(sc, st, ex) { 
		ActivInfinitev7.pTabDeBord.start(data.webData.tabDeBordURL);
		sc.endScenario();	
	}); // default error handler
	sc.setMode(e.scenario.mode.clearIfRunning);

	sc.step(ActivInfinitev7.steps.stRechercheBenefeciaireAdhesionIndiv);
	sc.step(ActivInfinitev7.steps.stResultatRechercheBenefeciaireAdhesionIndiv);
	sc.step(ActivInfinitev7.steps.stSelectionBenefeciaireAdhesionIndiv);
	sc.step(ActivInfinitev7.steps.stCreationBenefeciaireAdhesionIndiv);
	sc.step(ActivInfinitev7.steps.stPageIdentificationAssures_IdentifiantAdherent);
	sc.step(ActivInfinitev7.steps.stPageIdentificationAssures_InformationRO);
	sc.step(ActivInfinitev7.steps.stPageIdentificationAssures_InformationRO_SelectionRegime);
}});