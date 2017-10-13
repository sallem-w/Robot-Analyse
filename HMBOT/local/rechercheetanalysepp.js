
/** Description */
ActivInfinitev7.scenario({ scRechercheAnalysePP: function(ev, sc) {
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
	sc.step(ActivInfinitev7.steps.stRechercheTracePCX);
	sc.step(ActivInfinitev7.steps.stContratsIASuivant);
	sc.step(ActivInfinitev7.steps.stFinAnalyseContratsIA);

	//sc.step(ActivInfinitev7.steps.stAnalyseContratEnCours);
	
	sc.step(ActivInfinitev7.steps.stFinRechercheAnalysePP);

}});



/** Description */
ActivInfinitev7.step({ stInitRechercheEtAnalysePP: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stInitRechercheEtAnalysePP - reference GRC: ' + data.ppCouranteAnalyse.dataLocale.referenceGRC);
	ActivInfinitev7.pTabDeBord.wait(function () {	
	ctx.polling({
		delay: 100,
		nbMax: 10,
		test: function(index) { 
			return	ActivInfinitev7.pTabDeBord.btConsultation.exist(); 
		},
		done: function() { 
			// add code here
			ActivInfinitev7.pTabDeBord.btConsultation.click();
			sc.endStep();
		  return;
		},
		fail: function() { 
			// add code here
			data.ppCouranteAnalyse.notes.contexteAnalyseStoppee = 'Adhésion non analysée - Problème technique';
			 sc.endStep(ActivInfinitev7.steps.stFinRechercheAnalysePP);
	     return;
		}
	});

	});
}});


/** Description */
ActivInfinitev7.step({ stInitConsultationPP: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stInitConsultationPP: ' + data.ppCouranteAnalyse.dataLocale.referenceGRC);
	
	ActivInfinitev7.pIdentContratRechConsul.wait(function(){
		var nbcount = 0;
		ctx.polling({
		delay: 200,
		nbMax: 10,
		test: function(index) { 
			nbcount ++;
			return ActivInfinitev7.pIdentContratRechConsul.oBonHommeRecherche.exist(); 
		},
		done: function() { 
			// add code here
			ctx.traceF.infoTxt('nbcount: '+nbcount);
				ActivInfinitev7.pIdentContratRechConsul.oBonHommeRecherche.click();
			  sc.endStep();
	      return;
		},
		fail: function() { 
			// add code here
			data.ppCouranteAnalyse.notes.contexteAnalyseStoppee = 'Adhésion non analysée - Problème technique';
			 sc.endStep(ActivInfinitev7.steps.stFinRechercheAnalysePP);
	     return;
		}
	});
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
	  	ctx.traceF.infoTxt('La PP n existe pas selon la recherche par Ref GRC, on lance la recherche par Numéro RO');
			ActivInfinitev7.pRecherchePPRefGRCRes.btAnnuler.click();
			sc.endStep(ActivInfinitev7.steps.stInitRecherchePPParRO);
	  	return;
		}else{
			sc.endStep();
			return;
		}
	});
}});



///** Description */
ActivInfinitev7.step({ stTraiterResultatRecherchePP: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stTraiterResultatRecherchePP: '+ data.ppCouranteAnalyse.dataLocale.referenceGRC);
	
	st.onTimeout(10000, function (sc, st) {
		ctx.traceF.errorTxt('TimeOut - Etape  stTraiterResultatRecherchePP');
		ActivInfinitev7.pTabDeBord.start(data.webData.tabDeBordURL);
		sc.endScenario();
	});
	st.onError(function (sc, st, ex) {
		ctx.traceF.errorTxt('OnError - Etape stTraiterResultatRecherchePP');
		ActivInfinitev7.pTabDeBord.start(data.webData.tabDeBordURL);
		sc.endScenario();
	});

		if(ActivInfinitev7.pRecherchePPRefGRCRes.oResultatParRelation.exist()){
			data.ppCouranteAnalyse.dataEnLigne.typeRelation = ActivInfinitev7.pRecherchePPRefGRCRes.oTypeRelation.i(0).get();
			data.ppCouranteAnalyse.dataEnLigne.identiteRelation = ActivInfinitev7.pRecherchePPRefGRCRes.oIdentiteRelation.i(0).get();
			if(data.ppCouranteAnalyse.dataEnLigne.typeRelation === '' && data.ppCouranteAnalyse.dataEnLigne.identiteRelation === ''){
				ctx.traceF.infoTxt('Champs type relation / identité relation vides: '+ data.ppCouranteAnalyse.dataLocale.referenceGRC);
	    	data.ppCouranteAnalyse.notes.contexteAnalyseStoppee = 'Création de contrat – PP créée sur Infinite sans lien avec un contrat';
		  	sc.endStep(ActivInfinitev7.steps.stFinRechercheAnalysePP);
	    	return;
			}else if(data.ppCouranteAnalyse.dataEnLigne.typeRelation !== '' && data.ppCouranteAnalyse.dataEnLigne.identiteRelation !== ''){
				ctx.traceF.infoTxt('Un ou plusieurs contrats sont associe(s) à la PP courante, voir l HISTORIQUE de chaque contrat');
				data.ppCouranteAnalyse.dataEnLigne.nbContrat = ActivInfinitev7.pRecherchePPRefGRCRes.oStatus.count();
				sc.endStep(ActivInfinitev7.steps.stInitAnalyseContratsIA);
				return;
			}else{
				sc.endStep(ActivInfinitev7.steps.stInitAnalyseContratsIA);
				return;
			}	
	}else{
		sc.endStep(ActivInfinitev7.steps.stFinRechercheAnalysePP);
		return;
	}
	
}});


/** cet étape initialise la recherche de la PP par num RO */
ActivInfinitev7.step({ stInitRecherchePPParRO: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stInitRecherchePPParRO: lecture des données du fichier Excel' + data.ppCouranteAnalyse.dataLocale.referenceGRC);
	
	ActivInfinitev7.pIdentContratRechConsul.wait(function(){
		var nbcount = 0;
		ctx.polling({
		delay: 300,
		nbMax: 10,
		test: function(index) { 
			nbcount ++;
			return ActivInfinitev7.pIdentContratRechConsul.oBonHommeRecherche.exist(); 
		},
		done: function() { 
			// add code here
			ctx.traceF.infoTxt('bcount: '+ nbcount);
				data.ppCouranteAnalyse.dataLocale.numeroRO = ctx.excel.sheet.getCell(data.varGlobales.ligneCourante, data.scenarioConfig.ANALYSE.excel.indexColonne.numeroRO);
	  		data.ppCouranteAnalyse.dataLocale.nom = ctx.excel.sheet.getCell(data.varGlobales.ligneCourante, data.scenarioConfig.ANALYSE.excel.indexColonne.nom);
	  		data.ppCouranteAnalyse.dataLocale.prenom = ctx.excel.sheet.getCell(data.varGlobales.ligneCourante, data.scenarioConfig.ANALYSE.excel.indexColonne.prenom);
	  		data.ppCouranteAnalyse.dataLocale.dateDeNaissance = ctx.excel.sheet.getCell(data.varGlobales.ligneCourante, data.scenarioConfig.ANALYSE.excel.indexColonne.dateDeNaissance);
				ActivInfinitev7.pIdentContratRechConsul.oBonHommeRecherche.click();
				sc.endStep();
				return;
		},
		fail: function() { 
			// add code here
			ctx.traceF.infoTxt('bcount: '+ nbcount);
			 data.ppCouranteAnalyse.notes.contexteAnalyseStoppee = 'Adhésion non analysée - Problème technique';
			 sc.endStep(ActivInfinitev7.steps.stFinRechercheAnalysePP);
	     return;
		}
	});
	 
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
			data.ppCouranteAnalyse.notes.contexteAnalyseStoppee = 'Création contrat – PP inconnue sur Infinite';
			sc.endStep(ActivInfinitev7.steps.stFinRechercheAnalysePP);
			return;
		}else{
			data.ppCouranteAnalyse.dataEnLigne.critereRecherche = 2;
			sc.endStep(ActivInfinitev7.steps.stTraiterResultatRecherchePP);
			return;
	}
	});
}});


/** séléction du premier contrat Inactif et click sur le bouton visualiser */
ActivInfinitev7.step({ stInitAnalyseContratsIA : function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stInitAnalyseContratsIA: ' + data.ppCouranteAnalyse.dataLocale.referenceGRC);
	if(data.ppCouranteAnalyse.dataEnLigne.indexContrat < data.ppCouranteAnalyse.dataEnLigne.nbContrat){
		ActivInfinitev7.pRecherchePPRefGRCRes.oStatus.i(data.ppCouranteAnalyse.dataEnLigne.indexContrat).click();
		if(ActivInfinitev7.pRecherchePPRefGRCRes.oStatus.i(data.ppCouranteAnalyse.dataEnLigne.indexContrat).get() === 'I'){
			data.ppCouranteAnalyse.dataEnLigne.nbContratRadie += 1;
		}else{ /** deb modif 11-10-2017*/
			data.ppCouranteAnalyse.dataEnLigne.contratEstActif = true;
		}/** fin modif 11-10-2017*/
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
	  }else if(data.ppCouranteAnalyse.dataEnLigne.contratEstActif){
		    			/** deb modif 11-10-2017*/ /** lecture de : datedebuteffet, codeoffre (EN LIGNE) */
			  			data.ppCouranteAnalyse.dataEnLigne.codeOffre = ActivInfinitev7.pIdentContratRechResu.oCodeOffre.get();
		    			data.ppCouranteAnalyse.dataEnLigne.debDateEffet = ActivInfinitev7.pIdentContratRechResu.oDateDebutEffet.get();
			  			//lire la gamme de produit et la date de début de fin d'effet ==> codeoffre (LOCALE)
			  			data.ppCouranteAnalyse.dataLocale.gammeProduit = ctx.excel.sheet.getCell(data.varGlobales.ligneCourante, data.scenarioConfig.ANALYSE.excel.indexColonne.gammeProduit);
	      			var debDateEffet = ctx.excel.sheet.getCell(data.varGlobales.ligneCourante, data.scenarioConfig.ANALYSE.excel.indexColonne.debDateEffet);
	      			data.ppCouranteAnalyse.dataLocale.debDateEffet = ctx.dateF.formatDateIAE(debDateEffet+'');
	      			//récupération du code d'offre
	      			for(var i=0; i < data.ppCouranteAnalyse.dataLocale.gammeProduit.length; i++){
		      				if(data.ppCouranteAnalyse.dataLocale.tabGamme[i]+'' === data.ppCouranteAnalyse.dataLocale.gammeProduit+''){
			      						data.ppCouranteAnalyse.dataLocale.codeOffre = data.ppCouranteAnalyse.dataLocale.tabCode[i];
			      						break;
		      				}
	      			}
			  			if(ctx.dateF.estEgale(data.ppCouranteAnalyse.dataEnLigne.debDateEffet, data.ppCouranteAnalyse.dataLocale.debDateEffet) && data.ppCouranteAnalyse.dataEnLigne.codeOffre === data.ppCouranteAnalyse.dataLocale.codeOffre){
		      				data.ppCouranteAnalyse.dataEnLigne.adhesionEstEnregistree = true;
									sc.endStep(ActivInfinitev7.steps.stFinAnalyseContratsIA);
									return;
	      			}else{
									ActivInfinitev7.pIdentContratRechResu.oHistoriqueOpts.click(); //choisir l'historique des opérations
		      				sc.endStep(); 
	        				return;	 
							}
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
		sc.endStep();
		return;
	});
}});


/** Description */
ActivInfinitev7.step({ stRechercheTracePCX: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stRechercheTracePCX: ' + data.ppCouranteAnalyse.dataLocale.referenceGRC);	
	st.disableTimeout();
	ActivInfinitev7.scenarios.scRechercheOprtsContentieux.start(data).onEnd(function(sc3) {
		  sc.data=sc3.data;
		  ctx.traceF.infoTxt(' Fin du sous-scenario - scRechercheOprtsContentieux');
		  sc.endStep();
    });
}});


///** Description */   ************************ Première version *******************
//ActivInfinitev7.step({ stContratsIASuivant: function(ev, sc, st) {
//	var data = sc.data;
//	ctx.traceF.infoTxt('Etape stContratsIASuivant: ' + data.ppCouranteAnalyse.dataLocale.referenceGRC);
//	if(data.ppCouranteAnalyse.dataEnLigne.tracePCXExist){
//		ctx.traceF.infoTxt('La trace PCX existe dans le contexte - Fin recherche et analyse');//si on trouve la trace PCX avec le premier contrat, on s'arrete on continue pas le parcours des autres contrats
//		data.ppCouranteAnalyse.dataEnLigne.tracePCXExist = false;
//		sc.endStep(ActivInfinitev7.steps.stFinRechercheAnalysePP);
//		return;
//	}else if(data.ppCouranteAnalyse.dataEnLigne.indexContrat < data.ppCouranteAnalyse.dataEnLigne.nbContrat - 1){
//		ctx.traceF.infoTxt('La trace PCX n existe pas dans le contexte - on reboucle avec le contrat suivant');
//		ctx.traceF.infoTxt('+++++++++++++++++++++++++ Rebouclage sur le contrat suivant +++++++++++++++++++++++++');
//		data.ppCouranteAnalyse.dataEnLigne.indexContrat += 1;
//		ActivInfinitev7.pTabDeBord.start(data.webData.tabDeBordURL);
//		sc.endStep(ActivInfinitev7.steps.stInitRechercheEtAnalysePP);
//		return;
//	}else{
//		ctx.traceF.infoTxt('On a traité tous les contrats pour la recherche de la trace PCX');
//		sc.endStep();
//		return;
//	}
//}});


/** Description */
ActivInfinitev7.step({ stContratsIASuivant: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stContratsIASuivant: ' + data.ppCouranteAnalyse.dataLocale.referenceGRC);
	
	if(data.ppCouranteAnalyse.dataEnLigne.tracePCXExist){
		ctx.traceF.infoTxt('La trace PCX existe dans le contexte - Fin recherche et analyse');//si on trouve la trace PCX avec le premier contrat, on s'arrete on continue pas le parcours des autres contrats
		sc.endStep(ActivInfinitev7.steps.stFinRechercheAnalysePP);
		return;
	}else if(data.ppCouranteAnalyse.dataEnLigne.adhesionEstEnregistree){
		sc.endStep(ActivInfinitev7.steps.stFinAnalyseContratsIA);
		return;
	}else if(data.ppCouranteAnalyse.dataEnLigne.indexContrat < data.ppCouranteAnalyse.dataEnLigne.nbContrat - 1){
		ctx.traceF.infoTxt('La trace PCX n existe pas dans le contexte - on reboucle avec le contrat suivant');
		ctx.traceF.infoTxt('+++++++++++++++++++++++++ Rebouclage sur le contrat suivant +++++++++++++++++++++++++');
		data.ppCouranteAnalyse.dataEnLigne.indexContrat += 1;
		ActivInfinitev7.pTabDeBord.start(data.webData.tabDeBordURL);
		data.ppCouranteAnalyse.dataEnLigne.contratEstActif = false;
		sc.endStep(ActivInfinitev7.steps.stInitRechercheEtAnalysePP);
		return;
	}else{
		ctx.traceF.infoTxt('On a traité tous les contrats pour la recherche de la trace PCX');
		sc.endStep();
		return;
	}
}});


///** Description */ ****************** première version ****************************
//ActivInfinitev7.step({ stFinAnalyseContratsIA: function(ev, sc, st) {
//	var data = sc.data;
//	ctx.traceF.infoTxt('Etape stFinAnalyseContratsIA' + data.ppCouranteAnalyse.dataLocale.referenceGRC);
//  if(data.ppCouranteAnalyse.dataEnLigne.nbContratRadie < data.ppCouranteAnalyse.dataEnLigne.nbContrat){
//		ctx.traceF.infoTxt('Existe au moins un contrat actif ********** vérification de l enregistrement de l adhésion Siebel sur Infinite');
//		ctx.traceF.infoTxt('//////////////// ********* /////////////// Début scénario scAnalyseContratsEnCours //////////////// ********* ///////////////');
//	  data.ppCouranteAnalyse.dataEnLigne.indexContrat = 0;
//	 // data.ppCouranteAnalyse.dataEnLigne.nbContrat = 0;
//	  data.ppCouranteAnalyse.dataEnLigne.nbContratRadie = 0;	
//    sc.endStep();
//		return;
//	}else if(data.ppCouranteAnalyse.dataEnLigne.nbContratRadie === data.ppCouranteAnalyse.dataEnLigne.nbContrat){
//		data.ppCouranteAnalyse.notes.contexteAnalyseStoppee = 'Création de contrat – Pas de contrat actif sur la PP';
//		data.ppCouranteAnalyse.dataEnLigne.indexContrat = 0;
//	  data.ppCouranteAnalyse.dataEnLigne.nbContrat = 0;
//	  data.ppCouranteAnalyse.dataEnLigne.nbContratRadie = 0;	
//		sc.endStep(ActivInfinitev7.steps.stFinRechercheAnalysePP);
//		return;
//	}
//}});




/** Description */
ActivInfinitev7.step({ stFinAnalyseContratsIA: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stFinAnalyseContratsIA' + data.ppCouranteAnalyse.dataLocale.referenceGRC);
	
	if(data.ppCouranteAnalyse.dataEnLigne.adhesionEstEnregistree){
		 data.ppCouranteAnalyse.notes.contexteAnalyseStoppee = 'Adhésion déjà enregistrée – A vérifier manuellement';
		 sc.endStep();
		 return;
	}else if(data.ppCouranteAnalyse.dataEnLigne.nbContratRadie < data.ppCouranteAnalyse.dataEnLigne.nbContrat && !data.ppCouranteAnalyse.dataEnLigne.adhesionEstEnregistree){
	  data.ppCouranteAnalyse.notes.contexteAnalyseStoppee = 'Modification de contrat – Présence d’un contrat actif';
    sc.endStep();
		return;
	}else if(data.ppCouranteAnalyse.dataEnLigne.nbContratRadie === data.ppCouranteAnalyse.dataEnLigne.nbContrat){
		data.ppCouranteAnalyse.notes.contexteAnalyseStoppee = 'Création de contrat – Pas de contrat actif sur la PP';
		sc.endStep();
		return;
	}else{
		sc.endStep();
		return;
	}
}});


///** Description */
//ActivInfinitev7.step({ stAnalyseContratEnCours: function(ev, sc, st) {
//	var data = sc.data;
//	ctx.traceF.infoTxt('Etape stAnalyseContratEnCours' + data.ppCouranteAnalyse.dataLocale.referenceGRC);
////	ActivInfinitev7.pTabDeBord.start(data.webData.tabDeBordURL);
////	st.disableTimeout();
////	  ActivInfinitev7.scenarios.scAnalyseContratsEnCours.start(data).onEnd(function(sc3) {
////		  sc.data=sc3.data;
////		  ctx.traceF.infoTxt(' Fin du sous-scenario - scAnalyseContratsEnCours');
////			data.ppCouranteAnalyse.dataEnLigne.critereRecherche = 1;
////		  sc.endStep();
////    });
	
//	data.ppCouranteAnalyse.notes.contexteAnalyseStoppee = 'Modification de contrat – Présence d’un contrat actif';
//	sc.endStep();
//	return;
//}});


/** Description */
ActivInfinitev7.step({ stFinRechercheAnalysePP: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('****************** Etape stFinRechercheAnalysePP: ' + data.ppCouranteAnalyse.dataLocale.referenceGRC);
	//maj des variables 
	data.ppCouranteAnalyse.dataEnLigne.indexContrat = 0;
	data.ppCouranteAnalyse.dataEnLigne.nbContrat = 0;
	data.ppCouranteAnalyse.dataEnLigne.nbContratRadie = 0;
	
	data.ppCouranteAnalyse.dataEnLigne.adhesionEstEnregistree = false;
	data.ppCouranteAnalyse.dataEnLigne.tracePCXExist = false;
	data.ppCouranteAnalyse.dataEnLigne.contratEstActif = false;
	
	ActivInfinitev7.pTabDeBord.start(data.webData.tabDeBordURL);
	sc.endScenario();
	return;
}});


