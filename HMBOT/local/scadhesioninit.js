
/** Description */
ActivInfinitev7.scenario({ scAdhesionInit: function(ev, sc) {
	var data = sc.data;
	sc.onTimeout(30000, function(sc, st) { sc.endScenario();	}); // default timeout handler for each step
	sc.onError(function(sc, st, ex) { sc.endScenario();	}); // default error handler
	sc.setMode(e.scenario.mode.clearIfRunning);
	// add steps here...
	sc.step(ActivInfinitev7.steps.stChargementConfigScenario);
	sc.step(ActivInfinitev7.steps.stConfigurationJSON_Adhesion);
	sc.step(ActivInfinitev7.steps.stConfigurationFichiersDonneesExcel);
	sc.step(ActivInfinitev7.steps.stConfigurationExcel);
	sc.step(ActivInfinitev7.steps.stEchecInitialisation);
}});
