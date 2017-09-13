
/** Description */
ActivInfinitev7.scenario( { CMUScenarioPrincipal: function (ev, sc) {
	var data = sc.data;
	sc.onTimeout(30000, function (sc, st) {
		sc.endScenario();
	}); // default timeout handler for each step
	sc.onError(function (sc, st, ex) {
		sc.endScenario();
	}); // default error handler
	sc.setMode(e.scenario.mode.clearIfRunning);
		
	sc.step(ActivInfinitev7.steps.stInitScenarioCMU);
	sc.step(ActivInfinitev7.steps.stServerConnexionCMU);
	sc.step(ActivInfinitev7.steps.stDebutBoucleContratCMU);
	sc.step(ActivInfinitev7.steps.stLireDonneesCMUExcel);
	sc.step(ActivInfinitev7.steps.stVerifExistanceAssurePrincipal);
	sc.step(ActivInfinitev7.steps.stVerifContratCMUCondition);
	sc.step(ActivInfinitev7.steps.stVerifContratCMU);
	sc.step(ActivInfinitev7.steps.stResilationCMUCondition);
	sc.step(ActivInfinitev7.steps.stResiliationContratCMU);	
	sc.step(ActivInfinitev7.steps.stVerifContratCMU);
	sc.step(ActivInfinitev7.steps.stMiseAjourVarGloblales);
	sc.step(ActivInfinitev7.steps.stInsertDonneesCMUExcel);
	sc.step(ActivInfinitev7.steps.stContratCMUSuivant);
	sc.step(ActivInfinitev7.steps.stFinScenarioCMU);

	}
});


/** Description */
ActivInfinitev7.step({ stInitScenarioCMU : function(ev, sc, st) {
	var data = sc.data;

	ctx.traceF.infoTxt('Début étape - stInitScenarioCMU');
	ctx.dataF.initialisationScenarioCMU(data,ctx.configF.scenario.CMU);//ctx.dataF.initialisationScenario(ctx.configF.scenario.CMU);
	
	ctx.log('--> config.json :  Excel Debut');
	ctx.excelF.configExcel(ctx.configF.scenario.CMU);
	data.varGlobales.ligneCourante = data.scenarioConfig.excel.debutIndexLigne; // depuis le config.JSON
	ctx.excelF.ouvertureFichier(ctx.configF.cheminFichier);
 	data.varGlobales.indexDerniereLigne = ctx.excelF.indexDerniereLigne();
	ctx.log(' Index dernière ligne :'+data.varGlobales.indexDerniereLigne);
	ctx.traceF.infoTxt('Ouverture du fichier : ' +  ctx.configF.cheminFichier);
	ctx.log(" Test URL : "+ data.webData.url);
	ctx.traceF.infoTxt('Création du fichier résultat');	
	ctx.excelF.copieFichier(ctx.configF.cheminFichierResultat, data.scenarioConfig.excel.debutIndexLigne, ctx.excelF.modifierEntete());
	ctx.log('fichier résultat créé');
	sc.endStep();
	return;
}});


/** Description */
ActivInfinitev7.step({ stServerConnexionCMU : function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Début étape - stServerConnexionCMU');
		if (ActivInfinitev7.pServerWebFerme.exist() && ActivInfinitev7.pServerWebFerme.TitrePage.exist()) {
			ctx.traceF.infoTxt('Le serveur Infinite est fermé');
			ctx.popupF.newPopup('Le serveur Infinite est fermé');
			return ;
		}

		if (!ActivInfinitev7.pConnexion.exist()) {
			ctx.traceF.infoTxt('Open Infinite on connection page');
			ctx.popupF.newPopup('Il faut ouvrir et rentrer ces identifiants dans Infinite');
			return ;
		}
	ctx.log(" Test URL : "+ data.webData.url);
	data.webData.url = ActivInfinitev7.pConnexion.getInfos().location.href;
	data.webData.identifiant = ActivInfinitev7.pConnexion.oIdentifiant.get();
	data.webData.motDePasse = ActivInfinitev7.pConnexion.oPwd.get();
		
		//on entre dans Infinite
//		ActivInfinitev7.pConnexion.btLogin.click();
//		ActivInfinitev7.pTabDeBord.wait(function(ev) {
//		var infos = ActivInfinitev7.pTabDeBord.getInfos();
		
//		data.webData.tabDeBordURL=infos.document.URL;
//		ctx.log('URL de Tableau de bord : ' + data.webData.tabDeBordURL);
			sc.endStep();
			return;
//		});
}
});


/** Description */
ActivInfinitev7.step({ stDebutBoucleContratCMU: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Début étape - stDebutBoucleContratCMU');
	ctx.traceF.infoTxt('-->Ligne Excel: '+ data.varGlobales.ligneCourante);
	sc.endStep();
	return;
}});



/** Description */
ActivInfinitev7.step({ stLireDonneesCMUExcel : function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape - stLireDonneesCMUExcel');
	 
	var temp_contract=ctx.dataF.CMUtemp_contractF;
	/** numéro du contrat */
	data.contratCourantCMU.dataLocale.numeroContratIndiv = ctx.stringF.remplissageGauche(ctx.string.trim(String(ctx.excel.sheet.getCell(data.varGlobales.ligneCourante, data.scenarioConfig.excel.indexColonne.numeroContratIndiv))), '00000000');
	/** dans une boucle on récupère l'assuré principale et les bénéficiaires */
	var numContratIndiv = data.contratCourantCMU.dataLocale.numeroContratIndiv;
	var tempNumContratIndiv = numContratIndiv;
	ctx.log('current row: '+data.varGlobales.ligneCourante);
 
//	data.temp_contract = {};
	while (tempNumContratIndiv !== undefined && numContratIndiv === tempNumContratIndiv) {
			//récupération des champs (type, .....)
		  // contrat.typeAssure = ctx.excel.sheet.getCell(data.varGlobales.ligneCourante, data.configExcel.columnIndex.type);
		  temp_contract.codeProduit = ctx.excel.sheet.getCell(data.varGlobales.ligneCourante, data.scenarioConfig.excel.indexColonne.codeProduitSouscrit);
		  temp_contract.dateDebEffContrat = ctx.excel.sheet.getCell(data.varGlobales.ligneCourante,data.scenarioConfig.excel.indexColonne.dateDebutEffetProduitSouscrit);
			temp_contract.dateFinEffContrat = ctx.excel.sheet.getCell(data.varGlobales.ligneCourante,data.scenarioConfig.excel.indexColonne.dateFinEffetProduitSouscrit);
	    temp_contract.typeAssure = ctx.excel.sheet.getCell(data.varGlobales.ligneCourante, data.scenarioConfig.excel.indexColonne.type);
		
			ctx.log('type contrat: '+temp_contract.typeAssure);
		
		  data.contratCourantCMU.dataLocale.dictContratsCourantCMU.push(temp_contract);
			
		  data.varGlobales.ligneCourante+=1;
			tempNumContratIndiv = ctx.stringF.remplissageGauche(ctx.string.trim(String(ctx.excel.sheet.getCell(data.varGlobales.ligneCourante,data.scenarioConfig.excel.indexColonne.numeroContratIndiv))), '00000000');
	}
	ctx.log('numéro courant: '+ tempNumContratIndiv);
	ctx.log('ligne Courante: '+ data.varGlobales.ligneCourante);
//	if(data.varGlobales.ligneCourante < data.varGlobales.indexLastRow){
//		sc.endStep(ActivInfinitev7.steps.stSelectCMUContractFromExcel);
//		return;
//	}
	sc.endStep();
	return;
}});



/** ce step permet de vérifier dans le dictionnaire l'existance de l'assuré principal, sil existe on lance le sous scénario scVerifContratCMU sinon on exécute le sous sc finCMU  */
ActivInfinitev7.step({ stVerifExistanceAssurePrincipal : function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape - stVerifExistanceAssurePrincipal');
	var listeAssures = data.contratCourantCMU.dataLocale.dictContratsCourantCMU;
	for (var i in listeAssures){
		if(listeAssures[i]==ctx.configF.constantes.ASSPRI){
			data.contratCourantCMU.statusCMU.existanceASSPRI=true;
		}
	}
	sc.endStep();
	return;
}});

/** Condition d'embranchement de scenario */
ActivInfinitev7.step({ stVerifContratCMUCondition: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape - stResilationCMUCondition ');
	if(data.contratCourantCMU.statusCMU.existanceASSPRI == false){
		sc.endStep(ActivInfinitev7.steps.stMiseAjourVarGloblales);
		return;
	}
	else{ // on lance le scenario de traitement
			sc.endStep(ActivInfinitev7.steps.stVerifContratCMU);
			return;
	}
}});

/** step qui lance le sous scénario de vérification des données cmu */
ActivInfinitev7.step({ stVerifContratCMU : function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape - stVerifContratCMU - Lancement du sous-scenario de verification des données en lignes : scVerifContratCMU');
	// on desactive le TimeOut principal afin que le timeOut execute soit celui du sous-scenario
	st.disableTimeout();	
	var scASC = ActivInfinitev7.scenarios.scVerifContratCMU.start(data).onEnd(function(sc2){
		sc.data=sc2.data;
		ctx.traceF.infoTxt(' Fin du sous-scenario - scVerifContratCMU');
		if(data.scenarioConfig.controlSeul){
			ctx.traceF.infoTxt(' controlSeul - Aucune mise à jour du contrat est effectuée');
			sc.data.contratCourantCMU.statusCMU.FinCMUProcessus = true;
		}
		sc.endStep();
	});
}});


/** Condition d'embranchement de scenario */
ActivInfinitev7.step({ stResilationCMUCondition: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape - stResilationCMUCondition ');
	if(data.contratCourantCMU.statusCMU.FinCMUProcessus == true){
		sc.endStep(ActivInfinitev7.steps.stMiseAjourVarGloblales);
		return;
	}
	else{ // on lance le scenario de traitement
			sc.endStep(ActivInfinitev7.steps.stResiliationContratCMU);
			return;
	}
}});


/** Etape qui lance le scenario de Résiliation  */
ActivInfinitev7.step({ stResiliationContratCMU: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape - stResiliationContratCMU ');
	st.disableTimeout();
	var scCMU = ActivInfinitev7.scenarios.scResiliationCMU.start(data).onEnd(function(sc4){
		sc.data = sc4.data;
		ctx.traceF.infoTxt(' Fin du sous-scenario - scResiliationCMU');
		sc.endStep();
	});
}});


/** Step : Mise à jour des données globales ( stats ) */
ActivInfinitev7.step( { stMiseAjourVarGloblales: function (ev, sc, st) {
		var data = sc.data;
		ctx.traceF.infoTxt('Etape - stMiseAjourVarGloblales ');
		data.statistiquesF.nbCasTraite +=1;
		data.statistiquesF.nbCasTrouveDsExcel = data.varGlobales.indexDerniereLigne - data.scenarioConfig.excel.debutIndexLigne + 1;
		// (pas besoin de mettre à jour celle là) stats.countCaseReadyToRemove = sc.data.countCaseReadyToRemove;
		
		
		if (data.contratCourantCMU.notes.statusContrat === ctx.excelF.constantes.status.Succes) {
				data.statistiquesF.nbCasTraitementSucces += 1;
		}

		if (data.contratCourantCMU.notes.statusContrat === ctx.excelF.constantes.status.Echec) {
				data.statistiquesF.nbCasTraitementEchec += 1;
		}
		
		if (data.contratCourantCMU.notes.commentaireContrat.indexOf('centre')!==-1)
		{
			data.statistiquesF.nbCasRevoirCentre +=1;
		}


		sc.endStep();
		return ;
	}
});



/** Description */
ActivInfinitev7.step({ stInsertDonneesCMUExcel: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape - stInsertDonneesCMUExcel ');
	sc.endStep();
	return;
}});



/** stContratCMUSuivant */
ActivInfinitev7.step({ stContratCMUSuivant: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape - stContratCMUSuivant - Initialisations pour un changement de contrat');
		if(data.varGlobales.ligneCourante < data.varGlobales.indexDerniereLigne) {	
//			ctx.dataF.resetContratCourantCMU(data);
			sc.endStep(ActivInfinitev7.steps.stDebutBoucleContratCMU);
			return;
		}
		else{
			sc.endStep();
			return;
		}
}});


/** stFinScenarioCMU */
ActivInfinitev7.step({ stFinScenarioCMU : function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape - stFinScenarioCMU -Fin du scénario principal - Fermeture d\'Excel');
//	ctx.excelF.fermerFichier();
//	ctx.traceF.infoTxt('---> Ecriture des statistiques ');
////	data.statsF.fileName = ctx.configFile.getFileNameOutput(); 
////	data.stats.timeEnd = ctx.date.convertTimeSeconds(new Date());
////	data.stats.totalTimeDuration = ctx.date.getTimeElapsed(data.stats.timeEnd - data.stats.timeBeginning);
	
////	ctx.excelFile.writeStats(data.stats);

//	ctx.popupF.newPopup("Fin du traitement",'Fin', function() {
//			GLOBAL.notify(GLOBAL.events.PRESTOPCTX);
//			return sc.endStep();
//		});
//	ctx.log('Fin du scenario CMU');
	sc.endScenario();
	return;
}});


