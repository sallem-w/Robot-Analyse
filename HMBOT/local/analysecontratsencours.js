
/** Description */
ActivInfinitev7.scenario({ scAnalyseContratsEnCours: function(ev, sc) {
	var data = sc.data;
	sc.onTimeout(30000, function(sc, st) { sc.endScenario();	}); // default timeout handler for each step
	sc.onError(function(sc, st, ex) { sc.endScenario();	}); // default error handler
	sc.setMode(e.scenario.mode.clearIfRunning);
	// add steps here...
	
	sc.step(ActivInfinitev7.steps.stInitAnalyseContratEnCours);
	sc.step(ActivInfinitev7.steps.stChoisirProcessRecherchePP);
	
  sc.step(ActivInfinitev7.steps.stInitRechercheEtAnalysePP);
	sc.step(ActivInfinitev7.steps.stInitConsultationPP);
	sc.step(ActivInfinitev7.steps.stConsultationPP);
	sc.step(ActivInfinitev7.steps.stResultRecherchePPContratEnCours);//nouvelle étape
	sc.step(ActivInfinitev7.steps.stTraiterResRechPPContratEnCours);
	
	sc.step(ActivInfinitev7.steps.stInitRecherchePPParRO);
	sc.step(ActivInfinitev7.steps.stRecherchePPParRO);
	sc.step(ActivInfinitev7.steps.stResRechercheppParROContratEnCours);
	
	sc.step(ActivInfinitev7.steps.stInitLireContratActif);
	sc.step(ActivInfinitev7.steps.stOuvertureContrat);
	sc.step(ActivInfinitev7.steps.stResOuvertureContratEnCours);
	sc.step(ActivInfinitev7.steps.stVerifDateCodeProduitContratActif);
	sc.step(ActivInfinitev7.steps.stLireContratActifSuivant);
	
	sc.step(ActivInfinitev7.steps.stFinAnalyseContratEnCours);	
}});


/** Description */
ActivInfinitev7.step({ stInitAnalyseContratEnCours: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('****** Début analyse contrat en cours ******');
	sc.endStep();
	return;
}});

/** Description */
ActivInfinitev7.step({ stChoisirProcessRecherchePP: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stChoisirProcessRecherchePP : '+ data.ppCouranteAnalyse.dataLocale.referenceGRC);
	//lire la gamme de produit et la date de début de fin d'effet
	data.ppCouranteAnalyse.dataLocale.gammeProduit = ctx.excel.sheet.getCell(data.varGlobales.ligneCourante, data.scenarioConfig.excel.indexColonne.gammeProduit);
	var debDateEffet = ctx.excel.sheet.getCell(data.varGlobales.ligneCourante, data.scenarioConfig.excel.indexColonne.debDateEffet);
	data.ppCouranteAnalyse.dataLocale.debDateEffet = ctx.dateF.formatDateIAE(debDateEffet+'');
	//récupération du code d'offre
	for(var i=0; i < data.ppCouranteAnalyse.dataLocale.gammeProduit.length; i++){
		if(data.ppCouranteAnalyse.dataLocale.tabGamme[i]+'' === data.ppCouranteAnalyse.dataLocale.gammeProduit+''){
			data.ppCouranteAnalyse.dataLocale.codeOffre = data.ppCouranteAnalyse.dataLocale.tabCode[i];
			break;
		}
	}
	ActivInfinitev7.pTabDeBord.start(data.webData.tabDeBordURL);
	if(data.ppCouranteAnalyse.dataEnLigne.critereRecherche === 1){
		sc.endStep(ActivInfinitev7.steps.stInitRechercheEtAnalysePP);
		return;
	}else{  //cas ou la valeur de critereRecherche === 2
		sc.endStep(ActivInfinitev7.steps.stInitRecherchePPParRO);
	  return;
	}
}});


//step res recherche 1

/** Description */
ActivInfinitev7.step({ stResultRecherchePPContratEnCours: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stResultRecherchePPContratEnCours: '+data.ppCouranteAnalyse.dataLocale.referenceGRC);
	ActivInfinitev7.pRecherchePPRefGRCRes.wait(function(){
			sc.endStep(ActivInfinitev7.steps.stTraiterResRechPPContratEnCours);
	    return;
	});

}});

/** ce step permet de parcourir les contrats actif et de vérifier la date de début d'effet et la gamme infinite avec les donées GRC */
/** parcours sur les contrats*/
ActivInfinitev7.step({ stTraiterResRechPPContratEnCours: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stTraiterResRechPPContratEnCours : '+ data.ppCouranteAnalyse.dataLocale.referenceGRC);
	
  sc.endStep(ActivInfinitev7.steps.stInitLireContratActif);
	return;
}});


//step res recherche 2
/** Description */
ActivInfinitev7.step({ stResRechercheppParROContratEnCours: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stResRechercheppParROContratEnCours : '+ data.ppCouranteAnalyse.dataLocale.referenceGRC);
	ActivInfinitev7.pRecherchePPRefGRCRes.wait(function(){
			sc.endStep(ActivInfinitev7.steps.stTraiterResRechPPContratEnCours);
	    return;
	});
}});


/** Description */
ActivInfinitev7.step({ stInitLireContratActif: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stInitLireContratActif: '+ data.ppCouranteAnalyse.dataLocale.referenceGRC);
	ActivInfinitev7.pRecherchePPRefGRCRes.oStatus.i(data.ppCouranteAnalyse.dataEnLigne.indexContrat).click();
	if(ActivInfinitev7.pRecherchePPRefGRCRes.oStatus.i(data.ppCouranteAnalyse.dataEnLigne.indexContrat).get() === 'A'){
	  	ActivInfinitev7.pRecherchePPRefGRCRes.btValider.click();
		  sc.endStep();
	    return;
	}else{
		sc.endStep(ActivInfinitev7.steps.stLireContratActifSuivant);
	  return;
	}
}});

/** Description */
ActivInfinitev7.step({ stResOuvertureContratEnCours: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stResOuvertureContratRadie: ' + data.ppCouranteAnalyse.dataLocale.referenceGRC);
	ActivInfinitev7.pIdentContratRechResu.wait(function(){
		if(ActivInfinitev7.pIdentContratRechResu.btDETAIL.exist()){
		ctx.traceF.infoTxt('Aucune opération valide pour le numéro de contrat saisi à la date de début d effet (date courante)');
		sc.endStep(ActivInfinitev7.steps.stLireContratActifSuivant);
		return;
	}else{
		data.ppCouranteAnalyse.dataEnLigne.codeOffre = ActivInfinitev7.pIdentContratRechResu.oCodeOffre.get();
		data.ppCouranteAnalyse.dataEnLigne.debDateEffet = ActivInfinitev7.pIdentContratRechResu.oDateDebutEffet.get();
		sc.endStep(); 
	  return;	 
	}
	});
}});

/** Description */
ActivInfinitev7.step({ stVerifDateCodeProduitContratActif: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stInitLireContratActif: '+ data.ppCouranteAnalyse.dataLocale.referenceGRC);
	if(ctx.dateF.estEgale(data.ppCouranteAnalyse.dataEnLigne.debDateEffet, data.ppCouranteAnalyse.dataLocale.debDateEffet)){
		data.ppCouranteAnalyse.notes.contexteAnalyseStoppee = 'Adhésion déjà enregistrer - à vérifier manuellement';
		sc.endStep(ActivInfinitev7.steps.stFinAnalyseContratEnCours);
		return;
	}else{
		sc.endStep();
	  return;
	}
}});


/** Description */
ActivInfinitev7.step({ stLireContratActifSuivant: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stLireContratActifSuivant: '+ data.ppCouranteAnalyse.dataLocale.referenceGRC);
	if(data.ppCouranteAnalyse.dataEnLigne.indexContrat < data.ppCouranteAnalyse.dataEnLigne.nbContrat - 1){
		data.ppCouranteAnalyse.dataEnLigne.indexContrat += 1;
		ActivInfinitev7.pTabDeBord.start(data.webData.tabDeBordURL);
		sc.endStep(ActivInfinitev7.steps.stInitRechercheEtAnalysePP);
		return;
	}else{
		ctx.traceF.infoTxt('Tous les contrats actifs sont traités ///////');
		sc.endStep();
	  return;
	}
}});



/** Description */
ActivInfinitev7.step({ stFinAnalyseContratEnCours: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('****** Fin analyse contrat en cours ******');
	sc.endScenario();
	return;
}});


