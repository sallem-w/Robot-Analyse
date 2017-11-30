
/** Description */
GRCHarMu.scenario({ scGenerationFichierSortie :function(ev, sc) {
	var data = sc.data;
	sc.onTimeout(30000, function(sc, st) { sc.endScenario();	}); // default timeout handler for each step
	sc.onError(function(sc, st, ex) { sc.endScenario();	}); // default error handler
	sc.setMode(e.scenario.mode.clearIfRunning);
	// add steps here...
	
	sc.step(GRCHarMu.steps.stInitCopieFichierSortie);
	sc.step(GRCHarMu.steps.stCopieLigne);
	sc.step(GRCHarMu.steps.stFinCopieFichierSortie);
	
}});



/** Description */
GRCHarMu.step({ stInitCopieFichierSortie: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stInitCopieFichierSortie: Initialisation de la copie dans le fichier de sortie');
	//mise à jour de l'indice de la ligne 
	data.varGlobales.ligneCourante = 2 ;
	sc.endStep();
	return;
}});


/** Description */
GRCHarMu.step({ stCopieLigne: function(ev, sc, st) {
	var data = sc.data;
	
	sc.endStep();
	return;
}});



/** Description */
GRCHarMu.step({ stFinCopieFichierSortie: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stFinCopieFichierSortie: Fin création fichier résultat');
	sc.endScenario();
	return;
}});
