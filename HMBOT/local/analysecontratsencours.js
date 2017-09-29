
/** Description */
ActivInfinitev7.scenario({ scAnalyseContratsEnCours: function(ev, sc) {
	var data = sc.data;
	sc.onTimeout(30000, function(sc, st) { sc.endScenario();	}); // default timeout handler for each step
	sc.onError(function(sc, st, ex) { sc.endScenario();	}); // default error handler
	sc.setMode(e.scenario.mode.clearIfRunning);
	// add steps here...
	
	sc.step(ActivInfinitev7.steps.stInitAnalyseContratEnCours);
	sc.step(ActivInfinitev7.steps.stFinAnalyseContratEnCours);
	
}});



/** Description */
ActivInfinitev7.step({ stInitAnalyseContratEnCours: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('+++++++++++++++++++++++++++++++++++++++++++++++ Début analyse contrat en cours');
	sc.endStep();
	return;
}});


/** Description */
ActivInfinitev7.step({ stFinAnalyseContratEnCours: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('+++++++++++++++++++++++++++++++++++++++++++++++ Début analyse contrat en cours');
	
	sc.endScenario();
	return;
}});


