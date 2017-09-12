﻿
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
		sc.step(ActivInfinitev7.steps.stConsultationContratCMU);
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
	ctx.traceF.infoTxt('Début étape - stReadCMUDataFromExcel');
	 
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
	//ctx.trace
	//vérifier si le cotrat est vide ou non et insérer date, statu, comme dans le fichier excel resultat puis passer au contrat suivant.
	
	sc.endStep();
	return;
}});



/** step qui lance le sous scénario de vérification des données cmu */
ActivInfinitev7.step({ stConsultationContratCMU : function(ev, sc, st) {
	var data = sc.data;
	//ctx.trace
	//appeler le sous scénario : scVerifContratCMU
	sc.endStep();
	return;
}});





/** Step : Mise à jour des données globales ( stats ) */
ActivInfinitev7.step( { stMiseAjourVarGloblales: function (ev, sc, st) {
		var data = sc.data;
		ctx.traceF.infoTxt(data.contratCourantCMU.dataLocale.numeroContratIndiv  + ' stUpdatesACSGlobalInfos ');
		data.statistiquesF.nbCasTraite +=1;
		data.statistiquesF.nbCasTrouveDsExcel = data.varGlobales.indexDerniereLigne - data.scenarioConfig.excel.debutIndexLigne + 1;
		// (pas besoin de mettre à jour celle là) stats.countCaseReadyToRemove = sc.data.countCaseReadyToRemove;
		
		
		if (data.contratCourantCMU.notes.statusContract === ctx.excelF.constantes.status.Succes) {
				data.statistiquesF.nbCasTraitementSucces += 1;
		}

		if (data.contratCourantCMU.notes.statusContract === ctx.excelF.constantes.status.Echec) {
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
	
	sc.endStep();
	return;
}});



/** stContratCMUSuivant */
ActivInfinitev7.step({ stContratCMUSuivant: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(' stContratCMUSuivant - Initialisations pour un changement de contrat');
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
//	ctx.traceF.infoTxt(' stFinScenarioCMU -Fin du scénario principal - Fermeture d\'Excel');
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


