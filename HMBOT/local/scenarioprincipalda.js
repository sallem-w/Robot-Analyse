
/** Description */
ActivInfinitev7.scenario({ scScenarioPrincipalDA: function(ev, sc) {
	ctx.traceF.infoTxt(' Début du scénario principal pour la dispense d\'affiliation');
	var data = sc.data;

	sc.onTimeout(30000, function(sc, st) { sc.endScenario();	}); // default timeout handler for each step
	sc.onError(function(sc, st, ex) { sc.endScenario();	}); // default error handler
	sc.setMode(e.scenario.mode.clearIfRunning);
	
	sc.data.codeDuScenario = ctx.configF.scenario.DA;
	
	sc.step(ActivInfinitev7.steps.stInitScenarioDA);
	sc.step(ActivInfinitev7.steps.initPivot);
	sc.step(ActivInfinitev7.steps.stServerConnexionDA);
	sc.step(ActivInfinitev7.steps.stDebutScenarioPrincipalDA);
	sc.step(ActivInfinitev7.steps.stVersVerif);
	
	// début de vérification 
	sc.step(ActivInfinitev7.steps.stInitialisationVerifContractDA);
	sc.step(ActivInfinitev7.steps.stAllerVersPageSynthèse);
	sc.step(ActivInfinitev7.steps.stVerifPageSynthese);
	sc.step(ActivInfinitev7.steps.stSelectionnerInsee);
	sc.step(ActivInfinitev7.steps.stCherchercherBenefViaInsee);
	sc.step(ActivInfinitev7.steps.stPageDeSynthese);
	sc.step(ActivInfinitev7.steps.stVerifierEtatContrat);
	sc.step(ActivInfinitev7.steps.stSelectionnerAdhesion);
	sc.step(ActivInfinitev7.steps.stRechercherViaNumeroContratIndiv);
	sc.step(ActivInfinitev7.steps.stVerifierNomAdresse);
	sc.step(ActivInfinitev7.steps.stFinDeVerification);
	// Fin vérification
	
	sc.step(ActivInfinitev7.steps.stResiliationOuPassageAuContratSuivant);
	sc.step(ActivInfinitev7.steps.stVersResiliation);
	
	// début résiliation
	sc.step(ActivInfinitev7.steps.stInitialisationResiliationConcu);
	sc.step(ActivInfinitev7.steps.stAllerAlaPageDeResiliation);
	sc.step(ActivInfinitev7.steps.stRechercherContratAResilier);
	sc.step(ActivInfinitev7.steps.stSaisieDateDemande);
	sc.step(ActivInfinitev7.steps.stPageBlocNotesResilConcu);
	sc.step(ActivInfinitev7.steps.stPageParamCalculResilConcu);
	sc.step(ActivInfinitev7.steps.stPageHistoCotisResilConcu);
	sc.step(ActivInfinitev7.steps.stPageVisuCptResilConcu);
	sc.step(ActivInfinitev7.steps.stPageValidationResilConcu);
	sc.step(ActivInfinitev7.steps.stRetourAuDebutDeResil);
	sc.step(ActivInfinitev7.steps.stFinResilConcu);
	// fin résiliation
	
	sc.step(ActivInfinitev7.steps.stEcritureDesDonnées);
	sc.step(ActivInfinitev7.steps.stPasserAuProchainContrat);
	sc.step(ActivInfinitev7.steps.stFinScenarioPrincipal);
	
}});

	
	
 	/** Description */
  ActivInfinitev7.step({ stServerConnexionDA : function(ev, sc, st) {
		var data = sc.data;
		ctx.traceF.infoTxt('Début étape - stServerConnexionDA');
		if (ActivInfinitev7.pServeurWebFerme.exist() && ActivInfinitev7.pServeurWebFerme.oMessageErreur.exist()) {
			ctx.traceF.infoTxt('Le serveur Infinite est fermé');
			ctx.popupF.newPopup('Le serveur Infinite est fermé');
			return ;
		}

		if (!ActivInfinitev7.pConnexion.exist()) {
			ctx.traceF.infoTxt('Open Infinite on connection page');
			ctx.popupF.newPopup('Il faut ouvrir et rentrer ces identifiants dans Infinite');
			return ;
		}

		data.webData.url = ActivInfinitev7.pConnexion.getInfos().location.href;

		ActivInfinitev7.pConnexion.btConnexion.click();
		ActivInfinitev7.pTabDeBord.wait(function(ev) {
			var infos = ActivInfinitev7.pTabDeBord.getInfos();
			data.webData.tabDeBordURL = infos.document.URL;
			ctx.log('URL de Tableau de bord : ' + data.webData.tabDeBordURL);
			sc.endStep();
		  return;
	 	});
  }});
	
	/** Description */
	ActivInfinitev7.step({ stDebutScenarioPrincipalDA: function(ev, sc, st) {
		var data = sc.data;
		var i = data.globalVariables.indexContratCourant;
		ctx.traceF.infoTxt( " index du contrat courant " + i);
		data.contratCourant = data.contrat[i];
		ctx.traceF.infoTxt( ' le type de contrat est : ' + data.contrat[i].type);
		if(data.contratCourant.type == 'DISPENSE AFFILIATION' )
		{
			ctx.traceF.infoTxt('cas trouvé');
			data.stats.nombreCasTrouvesDansPivot += 1 ;
			sc.endStep();
			return;
		}
		else 
		{
			ctx.traceF.infoTxt('cas non trouvé');
			sc.endStep(ActivInfinitev7.steps.stPasserAuProchainContrat);
			return;
		}
		
	}});
	
	
	/** Description */
	ActivInfinitev7.step({ stVersVerif: function(ev, sc, st) {
		ctx.traceF.infoTxt(' STEP - stVersVerif');
		var data = sc.data;
		sc.endStep();
	}});
  
	/** Description */
	ActivInfinitev7.step({ stResiliationOuPassageAuContratSuivant: function(ev, sc, st) {
		ctx.traceF.infoTxt(' STEP - stResiliationOuPassageAuContratSuivant');
		var data = sc.data;
		if(data.sortieProcessusDA == true){
			sc.endStep(ActivInfinitev7.steps.stEcritureDesDonnées);
		}
		else{
			sc.endStep();
			return;
		}
	}});

	
	/** Description */
	ActivInfinitev7.step({ stVersResiliation: function(ev, sc, st) {
		ctx.traceF.infoTxt(' STEP - stVersResiliation');
		var data = sc.data;
		
		sc.endStep();
		return;
	}});
	
	
	
	/** Description */
	ActivInfinitev7.step({ stEcritureDesDonnées: function(ev, sc, st) {
		var data = sc.data;
		ctx.traceF.infoTxt(' -------------- INFOS CONTRAT ------------------- ');
		
		data.dataFichier.type = data.contratCourant.type;
		data.dataFichier.numRO = data.contratCourant.RONumber;
		data.dataFichier.nom = data.contratCourant.Nom;
		data.dataFichier.prenom = data.contratCourant.Prenom;
		data.dataFichier.adresse = data.contratCourant.Adresse;
		data.dataFichier.localite = data.contratCourant.Localite;
		data.dataFichier.dateExtraction = ctx.dateF.dateSansSeparatorEnFrancais(data.contratCourant.DateExtraction);
		data.dataFichier.dateNaissance = ctx.dateF.dateSansSeparatorEnFrancais(data.contratCourant.DateNaissance);
		data.dataFichier.dateDispense = ctx.dateF.dateSansSeparatorEnFrancais(data.contratCourant.DateDispenseOuSuspension);
		
		ctx.traceF.infoTxt( 'le nom du client est :' + data.globalVariables.nomClient );
		ctx.traceF.infoTxt( 'Numéro Sécu :' + data.dataFichier.numRO );
		ctx.traceF.infoTxt( 'Prénom :' + data.dataFichier.prenom );
		ctx.traceF.infoTxt( 'Nom :' + data.dataFichier.nom );
		ctx.traceF.infoTxt( 'Adresse :' + data.dataFichier.adresse + ' ' + data.dataFichier.localite );
	
		var writeArray = _.getObjectValues(data.dataFichier);
		writeArray.push(data.notes.numContratIndiv);
		writeArray.push(ctx.dateF.formatJJMMAAAA(new Date()));
		writeArray.push(data.notes.statut);
		writeArray.push(data.notes.commentaire);
		ctx.excelF.remplirTableau(data.globalVariables.ligneTraite, writeArray);
		ctx.excelF.sauverFichier();
		data.globalVariables.ligneTraite += 1;
		sc.endStep();
		return;
	}});
	
	
	/** Description */
	ActivInfinitev7.step({ stPasserAuProchainContrat: function(ev, sc, st) {
		var data = sc.data;
		
		if(data.globalVariables.indexContratCourant < data.stats.nombreDeContrats - 1)
		{
			data.globalVariables.indexContratCourant += 1 ;
			data.sortieProcessusDA = false;
			data.avertissement = false;
			sc.endStep(ActivInfinitev7.steps.stDebutScenarioPrincipalDA);
		}
		else {
			sc.endStep();
			return;
		}
	}});
	
	
	/** Description */
	ActivInfinitev7.step({ stFinScenarioPrincipal: function(ev, sc, st) {
		
		ctx.traceF.infoTxt(' Fin du scénario principal pour la dispense d\'affiliation et écriture des stats');
		var data = sc.data;
		var statistiques = {};
		data.stats.dureeTraitement =  ctx.dateF.afficherDuree(ctx.dateF.conversionEnSecondes(new Date()) - data.stats.debutTraitement);
		statistiques['fileName'] = ctx.configF.nomFichierResultat;
		statistiques['tempsEcoule'] = data.stats.dureeTraitement;
		statistiques['nombreContrats'] = data.stats.nombreDeContrats;
		statistiques['nombreCasDansPivot'] = data.stats.nombreCasTrouvesDansPivot;
		statistiques['nombreCasTraites'] = data.stats.nombreCasTraites;
		statistiques['nombreCasTraitesAvecAvertissement'] = data.stats.nombreCasTraitesAvecAvertissement;
		statistiques['nombreCasNonTraites'] = data.stats.nombreCasNonTraites;
		ctx.statsF.remplirTemplate(statistiques);
		ctx.statsF.remplirJson(statistiques);
		sc.endScenario();
	}});
	
	
