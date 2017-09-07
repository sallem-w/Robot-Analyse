ActivInfinitev7.scenario( { ACSScenarioPrincipal: function (ev, sc) {
		var data = sc.data;
		sc.onTimeout(30000, function (sc, st) {
			sc.endScenario();
		}); // default timeout handler for each step
		sc.onError(function (sc, st, ex) {
			sc.endScenario();
		}); // default error handler
		sc.setMode(e.scenario.mode.clearIfRunning);
		
		// add steps here...
		sc.step(ActivInfinitev7.steps.stInitScenarioCMU);
		sc.step(ActivInfinitev7.steps.stServerConnexionCMU);
		sc.step(ActivInfinitev7.steps.stInitSelectCMUContractFromExcel);
		sc.step(ActivInfinitev7.steps.stSelectCMUContractFromExcel);
		sc.step(ActivInfinitev7.steps.stReadCMUDataFromExcel);
	//ajouter un step qui vérifie dans le dictionnaire l'existance de l'assuré principale avant de lancer le sous scénario checkCotratCMU
		//sc.step(ActivInfinitev7.steps.stReadCMUDataOnLine);
//		sc.step(ActivInfinitev7.steps.stScenarioCheckBenefCMU);
//		sc.step(ActivInfinitev7.steps.stScenarioTerminatedCMU);
//		sc.step(ActivInfinitev7.steps.stInsertCMUDataInExcel);
//		sc.step(ActivInfinitev7.steps.stNextCMUContrat);
		sc.step(ActivInfinitev7.steps.stEndScenarioCMU);

	}
});