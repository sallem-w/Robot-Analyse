
/** Description */
ActivInfinitev7.scenario({ scAnalyseContratsEnCours: function(ev, sc) {
	var data = sc.data;
  sc.onTimeout(30000, function(sc, st) {
		ctx.traceF.errorTxt(data.ppCouranteAnalyse.dataLocale.referenceGRC + ' Timeout le scénario courant a été arrêté');
		data.ppCouranteAnalyse.notes.contexteAnalyseStoppee = 'Adhésion non analysée - Problème technique';
		ActivInfinitev7.pTabDeBord.start(data.webData.tabDeBordURL);
    sc.endScenario();
	});
	sc.onError(function(sc, st, ex) {
		ctx.traceF.errorTxt(data.ppCouranteAnalyse.dataLocale.referenceGRC + ex + ' le scénario courant a été arrêté');
		data.ppCouranteAnalyse.notes.contexteAnalyseStoppee = 'Adhésion non analysée - Problème technique';
		ActivInfinitev7.pTabDeBord.start(data.webData.tabDeBordURL);
    sc.endScenario();
	});
	sc.setMode(e.scenario.mode.clearIfRunning);
	// add steps here...
	
	sc.step(ActivInfinitev7.steps.stInitAnalyseContratEnCours);
	sc.step(ActivInfinitev7.steps.stChoisirProcessRecherchePP);
	
  sc.step(ActivInfinitev7.steps.stInitRechercheEtAnalysePP);
	sc.step(ActivInfinitev7.steps.stInitConsultationPP);
	sc.step(ActivInfinitev7.steps.stConsultationPP);
	sc.step(ActivInfinitev7.steps.stResultRecherchePPContratEnCours); //nouvelle étape
	sc.step(ActivInfinitev7.steps.stTraiterResRechPPContratEnCours);
	
	sc.step(ActivInfinitev7.steps.stInitRechercheEtAnalysePPContratEnCours);
	sc.step(ActivInfinitev7.steps.stInitRecherchePPParROContratEnCours); //nouvelle étape
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
	sc.endStep();
	return;
}});

/** Description */
ActivInfinitev7.step({ stChoisirProcessRecherchePP: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stChoisirProcessRecherchePP : '+ data.ppCouranteAnalyse.dataLocale.referenceGRC);
	
	if(data.ppCouranteAnalyse.dataEnLigne.critereRecherche === 1){	
			sc.endStep(ActivInfinitev7.steps.stInitRechercheEtAnalysePP);
			return;
	}else{  //cas ou la valeur de critereRecherche === 2
			sc.endStep(ActivInfinitev7.steps.stInitRechercheEtAnalysePPContratEnCours);
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



/** Description */
ActivInfinitev7.step({ stInitRechercheEtAnalysePPContratEnCours: function(ev, sc, st) {
	var data = sc.data;
	
	ctx.traceF.infoTxt('Etape stInitRechercheEtAnalysePPContratEnCours - reference GRC: ' + data.ppCouranteAnalyse.dataLocale.referenceGRC);
	ActivInfinitev7.pTabDeBord.wait(function () {	
	ActivInfinitev7.pTabDeBord.btConsultation.click();
		sc.endStep();
		return;
	});
}});


/** Description */
ActivInfinitev7.step({ stInitRecherchePPParROContratEnCours : function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stInitRecherchePPParROContratEnCours : '+ data.ppCouranteAnalyse.dataLocale.referenceGRC);
	ActivInfinitev7.pIdentContratRechConsul.wait(function(){
		ActivInfinitev7.pIdentContratRechConsul.oBonHommeRecherche.click();
		sc.endStep();
		return;
	});
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
	if(ctx.dateF.estEgale(data.ppCouranteAnalyse.dataEnLigne.debDateEffet, data.ppCouranteAnalyse.dataLocale.debDateEffet) && data.ppCouranteAnalyse.dataEnLigne.codeOffre === data.ppCouranteAnalyse.dataLocale.codeOffre){
		data.ppCouranteAnalyse.notes.contexteAnalyseStoppee = 'Adhésion déjà enregistrée - à vérifier manuellement';
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
		sc.endStep(ActivInfinitev7.steps.stChoisirProcessRecherchePP);
		return;
	}else{
		ctx.traceF.infoTxt('Tous les contrats actifs sont traités ///////');
		data.ppCouranteAnalyse.notes.contexteAnalyseStoppee = 'Modification de contrat – Présence d’un contrat actif';
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


