
/** Description */
GRCHarmonieMutuelle.scenario({ scVerifDataGRC: function(ev, sc) {
	var data = sc.data;
	sc.onTimeout(30000, function(sc, st) { sc.endScenario();	}); // default timeout handler for each step
	sc.onError(function(sc, st, ex) { sc.endScenario();	}); // default error handler
	sc.setMode(e.scenario.mode.clearIfRunning);
	// add steps here...
	
	sc.step(GRCHarmonieMutuelle.steps.stInitVerifDataGRC);
	sc.step(GRCHarmonieMutuelle.steps.stConnexionGRCSiebel);
	sc.step(GRCHarmonieMutuelle.steps.stFinVerifDataGRC);
	
}});



/** Description */
GRCHarmonieMutuelle.step({ stInitVerifDataGRC: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stInitVerifDataGRC: ');
	ctx.dataF.initialisationScenarioAnalyse(data,ctx.configF.scenario.Analyse); 
	sc.endStep();
	return;
}});


/** Description */
GRCHarmonieMutuelle.step({ stConnexionGRCSiebel: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stConnexionGRCSiebel: ');
	
	data.webDataGRC.url = GRCHarmonieMutuelle.pConnexionGRC.getInfos();
	data.webDataGRC.identifiant = GRCHarmonieMutuelle.pConnexionGRC.oIdentifiant.get();
	data.webDataGRC.motDePasse = GRCHarmonieMutuelle.pConnexionGRC.oPwd.get();
	GRCHarmonieMutuelle.pConnexionGRC.oConnexion.click();
	sc.endStep();
	return;
}});

/** Description */
GRCHarmonieMutuelle.step({ stFinVerifDataGRC: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stFinVerifDataGRC: ');
	sc.endScenario();
	return;
}});

