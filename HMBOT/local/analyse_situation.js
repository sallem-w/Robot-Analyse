
/** Description */
ActivInfinitev7.scenario({ scAnalyseSituation: function(ev, sc) {
	var data = sc.data;
	sc.onTimeout(30000, function(sc, st) {
		ctx.traceF.errorTxt('Timeout le scénario principale a été arrêté');
		data.ppCouranteAnalyse.notes.contexteAnalyseStoppee = 'Adhésion non analysée - Problème technique';
		ActivInfinitev7.pTabDeBord.start(data.webData.tabDeBordURL);
    sc.endScenario();
	});
	sc.onError(function(sc, st, ex) {
		ctx.traceF.errorTxt('OnError le scénario principale a été arrêté');
		data.ppCouranteAnalyse.notes.contexteAnalyseStoppee = 'Adhésion non analysée - Problème technique';
		ActivInfinitev7.pTabDeBord.start(data.webData.tabDeBordURL);
    sc.endScenario();
	});
	sc.setMode(e.scenario.mode.clearIfRunning);
	// add steps here...
	sc.step(ActivInfinitev7.steps.stInitAnalyseSitu);
  sc.step(ActivInfinitev7.steps.stDemarrageServeurAnalyse);
  sc.step(ActivInfinitev7.steps.stRecherchePP);
	sc.step(ActivInfinitev7.steps.stFinAnalyseSitu);
}});


/** Description */
ActivInfinitev7.step({ stInitAnalyseSitu: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('************* Début scénario analyse situation *************');
}});

/** Description */
ActivInfinitev7.step({ stDemarrageServeurAnalyse : function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Début étape - stDemarrageServeurAnalyse');
		ActivInfinitev7.pTabDeBord.wait(function(ev) {
		var infos = ActivInfinitev7.pTabDeBord.getInfos();
		data.webData.tabDeBordURL=infos.document.URL;
		ctx.log('URL de Tableau de bord : ' + data.webData.tabDeBordURL);
		sc.endStep();
		return;
		});
}
});

/** lancement du sous scenario de recherche de la pp infinite */
ActivInfinitev7.step({ stRecherchePP: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stRecherchePP: Scénario de recherche de la PP');
	st.disableTimeout();
	var scAnalyse = ActivInfinitev7.scenarios.scRechercheAnalysePP.start(data).onEnd(function(sc2){
		sc.data=sc2.data;
		ctx.traceF.infoTxt(' Fin du sous - scenario - scRechercheAnalysePP');
		sc.endStep();
	});
}});

/** Description */
ActivInfinitev7.step({ stFinAnalyseSitu: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('************* Fin scénario analyse situation *************');
	sc.endScenario();
	return;
}});

