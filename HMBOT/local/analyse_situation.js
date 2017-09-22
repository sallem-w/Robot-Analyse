
/** Description */
ActivInfinitev7.scenario({ scAnalyseSituation: function(ev, sc) {
	var data = sc.data;
	sc.onTimeout(30000, function(sc, st) { sc.endScenario();	}); // default timeout handler for each step
	sc.onError(function(sc, st, ex) { sc.endScenario();	}); // default error handler
	sc.setMode(e.scenario.mode.clearIfRunning);
	// add steps here...
	sc.step(ActivInfinitev7.steps.stInitAnalyseSitu);
	sc.step(ActivInfinitev7.steps.stChargementFichierIAE);
	sc.step(ActivInfinitev7.steps.stLireRefGRC);
	sc.step(ActivInfinitev7.steps.stChargementTabDeBord);
	
	sc.step(ActivInfinitev7.steps.stFinAnalyseSitu);
	
}});


/** Description */
ActivInfinitev7.step({ stInitAnalyseSitu: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('************* Début scénario analyse situation *************');
	ctx.dataF.initialisationScenarioAnalyse(data,ctx.configF.scenario.Analyse); 
	ctx.excelF.configExcel(ctx.configF.scenario.Analyse);
	sc.endStep();
	return;
}});


/** Description */
ActivInfinitev7.step({ stChargementFichierIAE: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stChargementFichierIAE - chargement et ouverture du fichier Excel PRE-IAE');
	//openFile: ouverture fichier IAE
	ctx.excelF.ouvertureFichier(ctx.configF.cheminFichier);
	data.varGlobales.ligneCourante = data.scenarioConfig.excel.debutIndexLigne; //la ligne courante dans le fichier excel
	data.varGlobales.indexDerniereLigne = ctx.excelF.indexDerniereLigne(); //récupérer l'indice de la dernière ligne dans le fichier excel
	
	//copie du fichier d'entrée ==> fichier résultat.
	sc.endStep();
	return;
}});



/** Description */
ActivInfinitev7.step({ stLireRefGRC: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stLireRefGRC - lecture de la pp courante du fichier IAE si le type de l assure === Principale');
	if(data.varGlobales.ligneCourante<=data.varGlobales.indexDernierLigne){
		data.ppCouranteAnalyse.dataLocale.typeAssure =  ctx.excel.sheet.getCell(data.varGlobales.ligneCourante, data.scenarioConfig.excel.indexColonne.typeAssure);
		if(typeAssure === 'Principale'){
			data.ppCouranteAnalyse.dataLocale.referenceGRC = ctx.excel.sheet.getCell(data.varGlobales.ligneCourante, data.scenarioConfig.excel.indexColonne.referenceGRC);
			sc.endStep();
	    return;
		}else{
			sc.endStep(ActivInfinitev7.steps.stLireRefGRCSuivant);
			return;
		}
	}

}});


/** Description */
ActivInfinitev7.step({ stChargementTabDeBord: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stInitRecherchePP');
	ActivInfinitev7.pTabDeBord.wait(function () {
			ActivInfinitev7.pTabDeBord.btConsultation.click();
			sc.endStep();
			return ;
		});
}});


/** Description */
ActivInfinitev7.step({ stChargementConsultation: function(ev, sc, st) {
	var data = sc.data;
	//chargemet de la page ==> clic sur le bohomme n°contrat indiv ==> saisir le referece GRC ==> lancer la recherche
	ctx.traceF.infoTxt('Etape stChargemetConsultation');
	ActivInfinitev7.pIdentContratRechConsul.wait(function(){
		ActivInfinitev7.pIdentContratRechConsul.oBonHommeRecherche.click();
		sc.endStep();
	  return;
	});
}});


/** insertion du ref GRC */
ActivInfinitev7.step({ stRecherchePP: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stRecherchePP - Choix du GRC dans la liste - saisie du code');
	ActivInfinitev7.pRecherchePPRefGRC.wait(function(){
		ActivInfinitev7.pRecherchePPRefGRC.oSystemeExterne.set('GRC');
		ActivInfinitev7.pRecherchePPRefGRC.oIdentifiantGRC.set(data.ppCouranteAnalyse.dataLocale.referenceGRC);
		ActivInfinitev7.pRecherchePPRefGRC.btRecherchePP.click();
	});
	sc.endStep();
	return;
}});


/** Description */
ActivInfinitev7.step({ stResultRecherchePP: function(ev, sc, st) {
	var data = sc.data;
	var contrats;
	ctx.traceF.infoTxt('Etape stResultRecherchePP');
	ActivInfinitev7.pRecherchePPRefGRCRes.wait(function(){
		
		//si on n'a pas une liste des contrats
		if(ActivInfinitev7.pRecherchePPRefGRCRes.oAucunContratDispo.exist()){
			data.ppCouranteAnalyse.notes.dateTraitementContrat = ctx.getDate();
	  	data.ppCouranteAnalyse.notes.commentaireContrat = 'Création';
			sc.endStep(ActivInfinitev7.steps.stInsertionDonneesAnalyseExcel);
	  	return;
		}else if(ActivInfinitev7.pRecherchePPRefGRCRes.oResultatParRelation.exist()){
			//vérifier si le type et l'identité est vide ou non
			data.ppCouranteAnalyse.dataEnLigne.typeRelation = ActivInfinitev7.pRecherchePPRefGRCRes.oTypeRelation.i(0).get();
			data.ppCouranteAnalyse.dataEnLigne.identiteRelation = ActivInfinitev7.pRecherchePPRefGRCRes.oIdentiteRelation.i(0).get();
			if(data.ppCouranteAnalyse.dataEnLigne.typeRelation === '' && data.ppCouranteAnalyse.dataEnLigne.identiteRelation === ''){
				data.ppCouranteAnalyse.notes.dateTraitementContrat = ctx.getDate();
	    	data.ppCouranteAnalyse.notes.commentaireContrat = 'Création';
		  	sc.endStep(ActivInfinitev7.steps.stInsertionDonneesAnalyseExcel);
	    	return;
			}else if(data.ppCouranteAnalyse.dataEnLigne.typeRelation !== '' && data.ppCouranteAnalyse.dataEnLigne.identiteRelation !== ''){
				ctx.traceF.infoTxt('un ou plusieurs contrats sont associe(s) à la pp courante');
				ActivInfinitev7.pRecherchePPRefGRCRes.oTypeRelation.i(0).click();
				sc.endStep();
				return;
			}
		}
	});
}});


/** Description */ 
ActivInfinitev7.step({ stVerifStatusContrats: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stVerifStatusContrats - voir le status (A/I) des contrats, si tous les contrats sont radiés voir la cause de radiation');
	
	for(var index in ActivInfinitev7.pRecherchePPRefGRCRes.oStatus.getAll()){
		if(ActivInfinitev7.pRecherchePPRefGRCRes.oStatus.i(index).get() === 'I'){
			data.ppCouranteAnalyse.dataEnLigne.nbContratRadie +=1;
		}
	}
	if(data.ppCouranteAnalyse.dataEnLigne.nbContratRadie === ActivInfinitev7.pRecherchePPRefGRCRes.oStatus.count()){
		ctx.traceF.infoTxt('Tous les contrats sont radiés - voir la cause de radiation');
		ActivInfinitev7.pRecherchePPRefGRCRes.oStatus.i(data.ppCouranteAnalyse.dataEnLigne.indexContrat).click(); //commence par zero
		ActivInfinitev7.pRecherchePPRefGRCRes.btValider.click();
		sc.endStep(ActivInfinitev7.steps.stOuvertureContratRadie);
	  return;
	}else{
		sc.endStep();
		return;
	}
	
}});



/** Description */
ActivInfinitev7.step({ stOuvertureContratRadie: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stOuvertureContratRadie - recherche du premier contrat radié');
	ActivInfinitev7.pIdentContratRechConsul.wait(function(){
		ActivInfinitev7.pIdentContratRechConsul.btRecherche.click();
		sc.endStep();
		return;
	});
}});


/** Description */
ActivInfinitev7.step({ stResOuvertureContratRadie: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stResOuvertureContratRadie - affichage de  historique des opérations');
	ActivInfinitev7.pIdentContratRechResu.wait(function(){
		ActivInfinitev7.pIdentContratRechResu.oHistoriqueOpts.click(); //choisir l'historique des opérations
		sc.endStep(ActivInfinitev7.steps.stExamCausesRadiation);
	  return;
	});
}});

/** Description */
ActivInfinitev7.step({ stExamCausesRadiation: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stExamCausesRadiation - parcourir le tableau des opérations et chercher les lignes «Radation ass.»');
	
	
	
	
	
	
	sc.endStep();
	return;
}});




/** Description */
ActivInfinitev7.step({ stContratRadieSuivant: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stContratRadieSuivant');
	
	if(data.ppCouranteAnalyse.dataEnLigne.indexContrat < data.ppCouranteAnalyse.dataEnLigne.nbContratRadie){
		data.ppCouranteAnalyse.dataEnLigne.indexContrat += 1;
	}
	sc.endStep();
	return;
}});



/** Description */
ActivInfinitev7.step({ stInsertionDonneesAnalyseExcel: function(ev, sc, st) {
	var data = sc.data;
	
	sc.endStep();
	return;
}});


/** Description */
ActivInfinitev7.step({ stLireRefGRCSuivant: function(ev, sc, st) {
	var data = sc.data;
	
	sc.endStep();
	return;
}});


/** Description */
ActivInfinitev7.step({ stFinAnalyseSitu: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('************* Fin scénario analyse situation *************');
	sc.endStep();
	return;
}});

