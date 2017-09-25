
/** Description */
ActivInfinitev7.scenario({ scRechercheAnalysePP: function(ev, sc) {
	var data = sc.data;
	sc.onTimeout(30000, function(sc, st) {
		ctx.traceF.errorTxt(data.ppCouranteAnalyse.dataLocale.referenceGRC + ' Timeout le scénario courant a été arrêté');
		ActivInfinitev7.pTabDeBord.start(data.webData.tabDeBordURL);
    sc.endScenario();
	});
	sc.onError(function(sc, st, ex) {
		ctx.traceF.errorTxt(data.ppCouranteAnalyse.dataLocale.referenceGRC + ex + ' le scénario courant a été arrêté');
		ActivInfinitev7.pTabDeBord.start(data.webData.tabDeBordURL);
    sc.endScenario();
	});
	sc.setMode(e.scenario.mode.clearIfRunning);
	// add steps here...
	sc.step(ActivInfinitev7.steps.stInitRechercheEtAnalysePP);
	sc.step(ActivInfinitev7.steps.stInitConsultationPP);
	sc.step(ActivInfinitev7.steps.stConsultationPP);
	sc.step(ActivInfinitev7.steps.stResultRecherchePP);
	sc.step(ActivInfinitev7.steps.stVerifRadiationContrats); //calculer le nombre de contrats radiés dans la liste des contrats associés à la pp
	sc.step(ActivInfinitev7.steps.stInitAnalyseContratsRadies);
	sc.step(ActivInfinitev7.steps.stOuvertureContratRadie);
	sc.step(ActivInfinitev7.steps.stResOuvertureContratRadie);
	
	sc.step(ActivInfinitev7.steps.stAnalyseContratsRadies);
	sc.step(ActivInfinitev7.steps.stContratRadieSuivant);
	
	sc.step(ActivInfinitev7.steps.stFinRechercheAnalysePP);

}});



/** Description */
ActivInfinitev7.step({ stInitRechercheEtAnalysePP: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stInitRechercheEtAnalysePP - reference GRC: ' + data.ppCouranteAnalyse.dataLocale.referenceGRC);
	ActivInfinitev7.pTabDeBord.wait(function () {
		ActivInfinitev7.pTabDeBord.btConsultation.click();
		sc.endStep();
		return;
	});
}});



/** Description */
ActivInfinitev7.step({ stInitConsultationPP: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stInitConsultationPP: ' + data.ppCouranteAnalyse.dataLocale.referenceGRC);
	ActivInfinitev7.pIdentContratRechConsul.wait(function(){
	ActivInfinitev7.pIdentContratRechConsul.oBonHommeRecherche.click();
		sc.endStep();
	  return;
	});
}});


/** Description */
ActivInfinitev7.step({ stConsultationPP : function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stConsultationPP: ' + data.ppCouranteAnalyse.dataLocale.referenceGRC);
	ActivInfinitev7.pRecherchePPRefGRC.wait(function(){
	ActivInfinitev7.pRecherchePPRefGRC.oSystemeExterne.set('GRC');
		ActivInfinitev7.pRecherchePPRefGRC.oIdentifiantGRC.set(data.ppCouranteAnalyse.dataLocale.referenceGRC);
		ActivInfinitev7.pRecherchePPRefGRC.btRecherchePP.click();
	  sc.endStep();
	  return;
	});
}});


/** Description */
ActivInfinitev7.step({ stResultRecherchePP : function(ev, sc, st) {
	var data = sc.data;
	
	ctx.traceF.infoTxt('Etape stResultRecherchePP: ' + data.ppCouranteAnalyse.dataLocale.referenceGRC);
	
	ActivInfinitev7.pRecherchePPRefGRCRes.wait(function(){
		if(ActivInfinitev7.pRecherchePPRefGRCRes.oAucunContratDispo.exist()){
	  	data.ppCouranteAnalyse.notes.contexteAnalyseStoppee = 'Création - aucun contrat associé à la PP';
			sc.endStep(ActivInfinitev7.steps.stFinRechercheAnalysePP);
	  	return;
		}else if(ActivInfinitev7.pRecherchePPRefGRCRes.oResultatParRelation.exist()){
			//vérifier si le type et l'identité est vide ou non
			data.ppCouranteAnalyse.dataEnLigne.typeRelation = ActivInfinitev7.pRecherchePPRefGRCRes.oTypeRelation.i(0).get();
			data.ppCouranteAnalyse.dataEnLigne.identiteRelation = ActivInfinitev7.pRecherchePPRefGRCRes.oIdentiteRelation.i(0).get();
			if(data.ppCouranteAnalyse.dataEnLigne.typeRelation === '' && data.ppCouranteAnalyse.dataEnLigne.identiteRelation === ''){
	    	data.ppCouranteAnalyse.notes.contexteAnalyseStoppee = 'Création - type relation / identité relation vides';
		  	sc.endStep(ActivInfinitev7.steps.stInsertionDonneesAnalyseExcel);
	    	return;
			}else if(data.ppCouranteAnalyse.dataEnLigne.typeRelation !== '' && data.ppCouranteAnalyse.dataEnLigne.identiteRelation !== ''){
				ctx.traceF.infoTxt('un ou plusieurs contrats sont associe(s) à la pp courante --------------> déterminer le nombre des contrats radiés');
				sc.endStep();
				return;
			}
		}
	});
}});


/** cet etape permet de déterminer e nombre des contrats radiés: si tous les contrats sont radiés on cherche la cause de radiation */
ActivInfinitev7.step({ stVerifRadiationContrats: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stVerifRadiationContrats: ' + data.ppCouranteAnalyse.dataLocale.referenceGRC);
	
	for(var index in ActivInfinitev7.pRecherchePPRefGRCRes.oStatus.getAll()){
		if(ActivInfinitev7.pRecherchePPRefGRCRes.oStatus.i(index).get() === 'I'){
			data.ppCouranteAnalyse.dataEnLigne.nbContratRadie +=1;
		}
	}
	if(data.ppCouranteAnalyse.dataEnLigne.nbContratRadie === ActivInfinitev7.pRecherchePPRefGRCRes.oStatus.count()){
		ctx.traceF.infoTxt('Tous les contrats sont radiés - parcourir la liste des contrats et déterminer la cause de radiation');
		sc.endStep(ActivInfinitev7.steps.stInitAnalyseContratsRadies);
		return;
	}else{
		ctx.traceF.infoTxt('n-1 ou 0 contrats radié - cas par défaut');
	  sc.endStep(ActivInfinitev7.steps.stFinRechercheAnalysePP);
	  return;
	}
}});

/******************************* comment revenir sur la page pRecherchePPRefGRCRes apres le ttt du contrat courant ***************************************************************************************************************************************/

/** si tous les contrats sont radiés ==> analyse contrat par contrat */
ActivInfinitev7.step({ stInitAnalyseContratsRadies: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stInitAnalyseContratsRadies: ' + data.ppCouranteAnalyse.dataLocale.referenceGRC);
	//ActivInfinitev7.pRecherchePPRefGRCRes.wait(function())
	if(data.ppCouranteAnalyse.dataEnLigne.indexContrat < data.ppCouranteAnalyse.dataEnLigne.nbContratRadie){
		ActivInfinitev7.pRecherchePPRefGRCRes.oStatus.i(data.ppCouranteAnalyse.dataEnLigne.indexContrat).click(); //commence par zero
	  ActivInfinitev7.pRecherchePPRefGRCRes.btValider.click();
		//ActivInfinitev7.pIdentContratRechConsul.wait(function(ev){
				sc.endStep();
		    return;
		//});
	
	}else{
		ctx.traceF.infoTxt('Tous les contrats radiés sont analysés - Fin sous scénario');
		sc.endStep(ActivInfinitev7.steps.stFinRechercheAnalysePP);
	  return;
	}
}});


/** Description */
ActivInfinitev7.step({ stOuvertureContratRadie: function(ev, sc, st) {
	var data = sc.data;	
	ctx.traceF.infoTxt('Etape stOuvertureContratRadie: ' + data.ppCouranteAnalyse.dataLocale.referenceGRC);
	ctx.traceF.infoTxt('indice du contrat courant radié: '+ data.ppCouranteAnalyse.dataEnLigne.indexContrat);
	
	st.onTimeout(10000, function (sc, st) {
		ctx.traceF.errorTxt('******************* TimeOut - Etape stRecherContratIndivCMU ********************');
		sc.endScenario();
	});
	st.onError(function (sc, st, ex) {
		ctx.traceF.errorTxt(' **************************** OnError - Etape stRecherContratIndivCMU *************************');
		sc.endScenario();
	});
	
	
	ActivInfinitev7.pIdentContratRechConsul.wait(function(){
			ActivInfinitev7.pIdentContratRechConsul.btRecherche.click();
		  sc.endStep();
	    return;
	});
}});


/** Description */
ActivInfinitev7.step({ stResOuvertureContratRadie: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stResOuvertureContratRadie: ' + data.ppCouranteAnalyse.dataLocale.referenceGRC);
	ActivInfinitev7.pIdentContratRechResu.wait(function(){
		if(ActivInfinitev7.pIdentContratRechResu.btDETAIL.exist()){
		ctx.traceF.infoTxt('Aucune opération valide pour le numéro de contrat saisi à la date de début d effet (date courante)');
		sc.endStep(ActivInfinitev7.steps.stContratRadieSuivant);
		return;
	}else{
		  ActivInfinitev7.pIdentContratRechResu.oHistoriqueOpts.click(); //choisir l'historique des opérations
		  sc.endStep(); // passer à l'étape ********* stAnalyseContratsRadies  **********
	    return;
	}
	});
}});



/** Description */
ActivInfinitev7.step({ stAnalyseContratsRadies: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stAnalyseContratsRadies: ' + data.ppCouranteAnalyse.dataLocale.referenceGRC);
	ActivInfinitev7.pHistoriqueOptsConsul.wait(function(){
			/**
   *
	 * Analyse de l'historique
	 *
	*/
	});

	
	sc.endStep();
	return;
}});


/** Description */
ActivInfinitev7.step({ stContratRadieSuivant: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stContratRadieSuivant: ' + data.ppCouranteAnalyse.dataLocale.referenceGRC);
	data.ppCouranteAnalyse.dataEnLigne.indexContrat += 1;
	sc.endStep(ActivInfinitev7.steps.stInitAnalyseContratsRadies);
	return;
}});


/** Description */
ActivInfinitev7.step({ stFinRechercheAnalysePP: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('****************** Etape stFinRechercheAnalysePP: ' + data.ppCouranteAnalyse.dataLocale.referenceGRC);
	ActivInfinitev7.pTabDeBord.start(data.webData.tabDeBordURL);
	sc.endStep();
	return;
}});


