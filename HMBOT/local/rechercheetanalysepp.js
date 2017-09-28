
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
	sc.step(ActivInfinitev7.steps.stTraiterResultatRecherchePP);
	sc.step(ActivInfinitev7.steps.stInitRecherchePPParRO);
	sc.step(ActivInfinitev7.steps.stRecherchePPParRO);
	sc.step(ActivInfinitev7.steps.stResultRecherchePPParRO);
	sc.step(ActivInfinitev7.steps.stInitAnalyseContratsIA);
  sc.step(ActivInfinitev7.steps.stOuvertureContrat);
	sc.step(ActivInfinitev7.steps.stResOuvertureContrat);
	sc.step(ActivInfinitev7.steps.stAnalyseContratsIA);
	sc.step(ActivInfinitev7.steps.stContratsIASuivant);
	sc.step(ActivInfinitev7.steps.stFinAnalyseContratsIA);

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
	  	ctx.traceF.infoTxt('La PP n existe selon la recherche par Ref GRC, on lance la recherche par numéro RO');
			ActivInfinitev7.pRecherchePPRefGRCRes.btAnnuler.click();
			sc.endStep(ActivInfinitev7.steps.stInitRecherchePPParRO);
	  	return;
		}else {
			sc.endStep();
			return;
		}
	});
}});



/** Description */
ActivInfinitev7.step({ stTraiterResultatRecherchePP: function(ev, sc, st) {
	var data = sc.data;
	
	if(ActivInfinitev7.pRecherchePPRefGRCRes.oResultatParRelation.exist()){
			//vérifier si le type et l'identité est vide ou non
			data.ppCouranteAnalyse.dataEnLigne.typeRelation = ActivInfinitev7.pRecherchePPRefGRCRes.oTypeRelation.i(0).get();
			data.ppCouranteAnalyse.dataEnLigne.identiteRelation = ActivInfinitev7.pRecherchePPRefGRCRes.oIdentiteRelation.i(0).get();
			if(data.ppCouranteAnalyse.dataEnLigne.typeRelation === '' && data.ppCouranteAnalyse.dataEnLigne.identiteRelation === ''){
	    	data.ppCouranteAnalyse.notes.contexteAnalyseStoppee = 'Création - type relation / identité relation vides';
				//passer à l'étape d'insertion des données dans le fichier résultat
		  	sc.endStep(ActivInfinitev7.steps.stFinRechercheAnalysePP);
	    	return;
			}else if(data.ppCouranteAnalyse.dataEnLigne.typeRelation !== '' && data.ppCouranteAnalyse.dataEnLigne.identiteRelation !== ''){
				ctx.traceF.infoTxt('un ou plusieurs contrats sont associe(s) à la pp courante');
				data.ppCouranteAnalyse.dataEnLigne.nbContrat = ActivInfinitev7.pRecherchePPRefGRCRes.oStatus.count();
				//lancer le sous scenario Recherche oprts PCX
				sc.endStep(ActivInfinitev7.steps.stInitAnalyseContratsIA);
				return;
			}	
	}
}});


/** cet étape initialise la recherche de la PP par num RO */
ActivInfinitev7.step({ stInitRecherchePPParRO: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stInitRecherchePPParRO: ' + data.ppCouranteAnalyse.dataLocale.referenceGRC);
	
	ActivInfinitev7.pIdentContratRechConsul.wait(function(){
		//récupérer le nom, le prenom, la date de naissance, et le num RO
		if(data.ppCouranteAnalyse.dataEnLigne.nbContrat === 0){
			data.ppCouranteAnalyse.dataLocale.numeroRO = ctx.excel.sheet.getCell(data.varGlobales.ligneCourante, data.scenarioConfig.excel.indexColonne.numeroRO);
	    data.ppCouranteAnalyse.dataLocale.nom = ctx.excel.sheet.getCell(data.varGlobales.ligneCourante, data.scenarioConfig.excel.indexColonne.nom);
	    data.ppCouranteAnalyse.dataLocale.prenom = ctx.excel.sheet.getCell(data.varGlobales.ligneCourante, data.scenarioConfig.excel.indexColonne.prenom);
	    data.ppCouranteAnalyse.dataLocale.dateDeNaissance = ctx.excel.sheet.getCell(data.varGlobales.ligneCourante, data.scenarioConfig.excel.indexColonne.dateDeNaissance);
		}
		ActivInfinitev7.pIdentContratRechConsul.oBonHommeRecherche.click();
		sc.endStep();
		return;
	});
}});


/** Description */
ActivInfinitev7.step({ stRecherchePPParRO: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stRecherchePPParRO, Numéro RO : ' + data.ppCouranteAnalyse.dataLocale.numeroRO);	
	ActivInfinitev7.pRecherchePPRefGRC.wait(function(){
			ActivInfinitev7.pRecherchePPRefGRC.oNom.set(data.ppCouranteAnalyse.dataLocale.nom);
		  ActivInfinitev7.pRecherchePPRefGRC.oPrenom.set(data.ppCouranteAnalyse.dataLocale.prenom);
		  ActivInfinitev7.pRecherchePPRefGRC.oDateNaissance.set(ctx.dateF.formatDateIAE(data.ppCouranteAnalyse.dataLocale.dateDeNaissance+''));
			ActivInfinitev7.pRecherchePPRefGRC.oNumeroRo.set(data.ppCouranteAnalyse.dataLocale.numeroRO);
			ActivInfinitev7.pRecherchePPRefGRC.btRecherchePP.click();
			sc.endStep();
	    return;
	});
}});



/** Description */
ActivInfinitev7.step({ stResultRecherchePPParRO : function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stResultRecherchePPParRO, Numéro RO : ' + data.ppCouranteAnalyse.dataLocale.numeroRO);
	ActivInfinitev7.pRecherchePPRefGRCRes.wait(function(){
		if(ActivInfinitev7.pRecherchePPRefGRCRes.oAucunContratDispo.exist()){
			data.ppCouranteAnalyse.notes.contexteAnalyseStoppee = 'création contrat';
			sc.endStep(ActivInfinitev7.steps.stFinRechercheAnalysePP);
			return;
		}else{
			sc.endStep(ActivInfinitev7.steps.stTraiterResultatRecherchePP);
			return;
		}
	});

}});


/** séléction du premier contrat Inactif et click sur le boton visualiser */
ActivInfinitev7.step({ stInitAnalyseContratsIA : function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stInitAnalyseContratsIA: ' + data.ppCouranteAnalyse.dataLocale.referenceGRC);
	if(data.ppCouranteAnalyse.dataEnLigne.indexContrat < data.ppCouranteAnalyse.dataEnLigne.nbContrat){
		ActivInfinitev7.pRecherchePPRefGRCRes.oStatus.i(data.ppCouranteAnalyse.dataEnLigne.indexContrat).click();
		ActivInfinitev7.pRecherchePPRefGRCRes.btValider.click();
		sc.endStep();
	  return;
	}else{
		sc.endStep(ActivInfinitev7.steps.stFinAnalyseContratsIA);
		return;
	}	
}});

/** Description */
ActivInfinitev7.step({ stOuvertureContrat: function(ev, sc, st) {
	var data = sc.data;	
	ctx.traceF.infoTxt('Etape stOuvertureContrat: ' + data.ppCouranteAnalyse.dataLocale.referenceGRC);
	ActivInfinitev7.pIdentContratRechConsul.wait(function(){
			ActivInfinitev7.pIdentContratRechConsul.btRecherche.click();
		  sc.endStep();
	    return;
	});
}});


/** Description */
ActivInfinitev7.step({ stResOuvertureContrat: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stResOuvertureContratRadie: ' + data.ppCouranteAnalyse.dataLocale.referenceGRC);
	ActivInfinitev7.pIdentContratRechResu.wait(function(){
		if(ActivInfinitev7.pIdentContratRechResu.btDETAIL.exist()){
		ctx.traceF.infoTxt('Aucune opération valide pour le numéro de contrat saisi à la date de début d effet (date courante)');
		sc.endStep(ActivInfinitev7.steps.stContratsIASuivant);
		return;
	}else{
		  ActivInfinitev7.pIdentContratRechResu.oHistoriqueOpts.click(); //choisir l'historique des opérations
				 sc.endStep(); 
	       return;	 
	}
	});
}});

/** recherche la trace dans le contrat courant */
ActivInfinitev7.step({ stAnalyseContratsIA: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stAnalyseContratsIA: ' + data.ppCouranteAnalyse.dataLocale.referenceGRC);
	
	ActivInfinitev7.pHistoriqueOptsConsul.wait(function(){
		ActivInfinitev7.scenarios.scRechercheOprtsContentieux.start(data).onEnd(function(sc3) {
		  sc.data=sc3.data;
		  ctx.traceF.infoTxt(' Fin du sous-scenario - scRechercheOprtsContentieux');
		  sc.endStep();
    });
//		sc.endStep();
//		return;
	});
}});


/** Description */
ActivInfinitev7.step({ stScenarioRechercheOPtrsPCX: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stScenarioRechercheOPtrsPCX: ' + data.ppCouranteAnalyse.dataLocale.referenceGRC);
	st.disableTimeout();
	ActivInfinitev7.scenarios.scRechercheOprtsContentieux.start(data).onEnd(function(sc3) {
		sc.data=sc3.data;
		ctx.traceF.infoTxt(' Fin du sous-scenario - scRechercheOprtsContentieux');
		sc.endStep();
  });
	sc.endStep();
	return;
}});


/** Description */
ActivInfinitev7.step({ stContratsIASuivant: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stContratsIASuivant: ' + data.ppCouranteAnalyse.dataLocale.referenceGRC);
	if(data.ppCouranteAnalyse.dataEnLigne.tracePCXExist){
		ctx.traceF.infoTxt('La trace PCX existe dans le contexte - Fin analyse');//si on trouve la trace PCX avec le premier contrat, on s'arrete on continue pas le parcours des autres contrats
		data.ppCouranteAnalyse.dataEnLigne.tracePCXExist = false;
		sc.endStep(ActivInfinitev7.steps.stFinRechercheAnalysePP);
		return;
	}else{
		ctx.traceF.infoTxt('La trace PCX n existe pas dans le contexte - on reboucle avec le contrat suivant');
		ctx.traceF.infoTxt('//////////////////////////////// Rechercher la PP ////////////////////////////////');
		data.ppCouranteAnalyse.dataEnLigne.indexContrat += 1;
		ActivInfinitev7.pTabDeBord.start(data.webData.tabDeBordURL);
		sc.endStep(ActivInfinitev7.steps.stInitRechercheEtAnalysePP);
		return;
	}
}});


/** Description */
ActivInfinitev7.step({ stFinAnalyseContratsIA: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stFinAnalyseContratsIA' + data.ppCouranteAnalyse.dataLocale.referenceGRC);
	data.ppCouranteAnalyse.dataEnLigne.indexContrat = 0;
	data.ppCouranteAnalyse.dataEnLigne.nbContrat = 0;
	data.ppCouranteAnalyse.dataEnLigne.nbContratRadie = 0;	
		
	if(data.ppCouranteAnalyse.dataEnLigne.nbContratRadie > 0){
		ctx.traceF.infoTxt('Existe au moins un contrat actif');
		ctx.traceF.infoTxt('Vérification gamme');
    //sc.endStep(ActivInfinitev7.steps.stVerifGamme);
		sc.endStep(ActivInfinitev7.steps.stFinRechercheAnalysePP);
		return;
	}else{
		data.ppCouranteAnalyse.notes.contexteAnalyseStoppee = 'Processus création - tous les contrats sont radiés';
		sc.endStep(ActivInfinitev7.steps.stFinRechercheAnalysePP);
		return;
	}
}});



/** Description */
ActivInfinitev7.step({ stFinRechercheAnalysePP: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('****************** Etape stFinRechercheAnalysePP: ' + data.ppCouranteAnalyse.dataLocale.referenceGRC);
	ActivInfinitev7.pTabDeBord.start(data.webData.tabDeBordURL);
	sc.endScenario();
	return;
}});


