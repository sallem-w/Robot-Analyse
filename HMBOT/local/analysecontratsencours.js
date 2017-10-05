
/** Description */
ActivInfinitev7.scenario({ scAnalyseContratsEnCours: function(ev, sc) {
	var data = sc.data;
	sc.onTimeout(30000, function(sc, st) { sc.endScenario();	}); // default timeout handler for each step
	sc.onError(function(sc, st, ex) { sc.endScenario();	}); // default error handler
	sc.setMode(e.scenario.mode.clearIfRunning);
	// add steps here...
	
	sc.step(ActivInfinitev7.steps.stInitAnalyseContratEnCours);
	sc.step(ActivInfinitev7.steps.stLireDataPP);
//  sc.step(ActivInfinitev7.steps.stInitRechercheEtAnalysePP);
//	sc.step(ActivInfinitev7.steps.stInitConsultationPP);
//	sc.step(ActivInfinitev7.steps.stConsultationPP);
//	sc.step(ActivInfinitev7.steps.stResultRecherchePP);
//	sc.step(ActivInfinitev7.steps.stTraiterResRechPPContratEnCours);
//	sc.step(ActivInfinitev7.steps.stInitRecherchePPParRO);
//	sc.step(ActivInfinitev7.steps.stRecherchePPParRO);
//	sc.step(ActivInfinitev7.steps.stResultRecherchePPParRO);
	
	sc.step(ActivInfinitev7.steps.stFinAnalyseContratEnCours);
	
}});


/** Description */
ActivInfinitev7.step({ stLireDataPP: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stLireDataPP : '+ data.ppCouranteAnalyse.dataLocale.referenceGRC);
	data.ppCouranteAnalyse.dataLocale.gammeProduit = ctx.excel.sheet.getCell(data.varGlobales.ligneCourante, data.scenarioConfig.excel.indexColonne.gammeProduit);
	var debDateEffet = ctx.excel.sheet.getCell(data.varGlobales.ligneCourante, data.scenarioConfig.excel.indexColonne.debDateEffet);
	data.ppCouranteAnalyse.dataLocale.debDateEffet = ctx.dateF.formatDateIAE(debDateEffet+'');
	ctx.traceF.infoTxt('date de fin d effet: **** '+data.ppCouranteAnalyse.dataLocale.debDateEffet);	
	data.ppCouranteAnalyse.dataLocale.tabGammeCode = data.scenarioConfig.gammeCodeProduit;
	ctx.traceF.infoTxt('Valeurs de tab: ');
	for (var i in data.ppCouranteAnalyse.dataLocale.tabGammeCode){
		ctx.traceF.infoTxt('Gamme: '+ data.ppCouranteAnalyse.dataLocale.tabGammeCode[i].gamme);
	}
	sc.endStep();
	return;
}});


/** Description */
ActivInfinitev7.step({ stInitAnalyseContratEnCours: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('****** Début analyse contrat en cours ******');
	ctx.traceF.infoTxt('on recherche la PP sur Infinite, on traite tous les contrats en cours');
	//ActivInfinitev7.pTabDeBord.start(data.webData.tabDeBordURL);
	sc.endStep();
	return;
}});

/** Description */
ActivInfinitev7.step({ stTraiterResRechPPContratEnCours: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stTraiterResRechPPContratEnCours : '+ data.ppCouranteAnalyse.dataLocale.referenceGRC);
	if(ActivInfinitev7.pRecherchePPRefGRCRes.oAucunContratDispo.exist()){
		sc.endStep();
		return;
	}else{
	  sc.endStep(ActivInfinitev7.steps.stInitAnalyseContratECours);
	  return;
	}
}});


/** Description */
ActivInfinitev7.step({ stInitAnalyseContratECours: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stInitAnalyseContratECours: '+ data.ppCouranteAnalyse.dataLocale.referenceGRC);
	sc.endStep();
	return;
}});

/** Description */
ActivInfinitev7.step({ stFinAnalyseContratEnCours: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('****** Fin analyse contrat en cours ******');
	sc.endScenario();
	return;
}});


