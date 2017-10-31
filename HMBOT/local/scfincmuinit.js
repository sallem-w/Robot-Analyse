
/** Description */
ActivInfinitev7.scenario({ scFinCMUInit: function(ev, sc) {
	var data = sc.data;
	sc.onTimeout(120000, function(sc, st) { sc.endScenario();	}); // default timeout handler for each step
	sc.onError(function(sc, st, ex) { sc.endScenario();	}); // default error handler
	sc.setMode(e.scenario.mode.clearIfRunning);
	sc.step(ActivInfinitev7.steps.stInitialisationDataBasique);
	sc.step(ActivInfinitev7.steps.stInitialisationFinCMUConfigurationData);
	sc.step(ActivInfinitev7.steps.stChargementConfigScenario);
	sc.step(ActivInfinitev7.steps.stConfigurationJSON_CMU);
	sc.step(ActivInfinitev7.steps.stConfigurationTrace);
	sc.step(ActivInfinitev7.steps.stConfigurationFichiersDonneesExcel_CreationChemin);
	sc.step(ActivInfinitev7.steps.stConfigurationFichiersDonneesExcel_OuvertureFichier_CMU);
	sc.step(ActivInfinitev7.steps.stConfigurationStatistiques);
	sc.step(ActivInfinitev7.steps.stFinInitialisation);
	sc.step(ActivInfinitev7.steps.stEchecInitialisation);
}});




/** Description */
ActivInfinitev7.step({ stInitialisationFinCMUConfigurationData: function(ev, sc, st) {
	var data = sc.data;
//	data = new dataClass();  // Attention ( bug) ne marche pas sans le sc ' pb de passage en reference'
	data.codeScenario = ctx.configF.scenario.CMU;
	data.nomFichierConfigScenario = 'configCMU.json';
	
	
	
	var CMUtemp_contractF = {
		typeAssure:'',
    dateDebEffContrat:'',
    dateFinEffContrat:'',
    codeProduit:'',
    dateDebEffProduit:'',
		dateFinEffProduit:'',    
		dateDebEffSituatParti:'',
    dateFinEffSituatParti:''
	}; 
		
	data.CMUtemp_contractF=CMUtemp_contractF;
	        
	var contratCourantCMU = {
		dataLocale: {
			numeroContratIndiv : '',
			dictContratsCourantCMU : [],
			dateFinEffSituatParti : ''
          },
          dataEnLigne: {
            numeroContratIndiv : '',
            dictContratsCourantCMU : [],
						variables :{
							indiceBenef : '',
							nbBenef: '',
							produitTrouve:false,
							typeAssure : '',
							etatCourant : '',
							rangAssure : '',
							dateFinEffetInfinite : ''
						}
						
          },
          notes: {
              dateTraitementContrat:'',
              statutsContrat: '',
              commentaireContrat: ''
          },
          statutsCMU: {
							existanceASSPRI : false,
              FinCMUProcessus : false,
							contratProlonge : false,
							ASSPRITermine : false,
							assureValid : false,
							contratTermine : false,
							contratResilie : false
          }
      };
	
  data.contratCourantCMU=contratCourantCMU;

	var statistiquesF = {
					nomFichier : '',
          debutTpsTraitement : 0,
					finTpsTraitement : 0,
					dureeTraitement : 0,
          nbCasTraite : 0, //countCaseProcessed
          nbCasTrouveDsExcel : 0, //countCaseFindIntoExcel
          nbCasTraitementSucces : 0, // countCaseSuccessProcessed
          nbCasTraitementEchec : 0, //countCaseFailProcessed
          nbCasRevoirCentre : 0, //countCaseBackToCenter
          nbContratsPretsPrResiliation : 0, //sc.data.countCaseReadyToRemove
          nbContratsResilies : 0
      };
	data.statistiquesF=statistiquesF;
	
	
	sc.endStep();
	return;
}});

/** Description */
ActivInfinitev7.step({ stConfigurationJSON_CMU: function(ev, sc, st) {
	var data = sc.data;
	ctx.log(' --> Chargement du fichier de configuration JSON pour le scenario Fin CMU');
	var fichierJSON = ctx.fso.file.read(data.cheminFichierConfigScenario);
	var scenarioConfig = new confFileCMUClass();
	scenarioConfig = JSON.parse(fichierJSON);
	data.scenarioConfig=scenarioConfig;
	sc.endStep();
	return;
}});



/** Description */
ActivInfinitev7.step({ stConfigurationFichiersDonneesExcel_OuvertureFichier_CMU: function(ev, sc, st) {
	var data = sc.data;
	ctx.log(' --> Ouverture des données Excel');
//	ctx.excelF.configExcel(dat);
	ctx.excel.release();
	ctx.excel.initialize();
	ctx.excel.file.closeAll('true');  // on ferme les feuilles excel ouvertes
	ctx.excel.file.open(data.nomFichier);
	
	// on crée maintenant le fichier Résultat
	var indexDerniereLigne = ctx.excel.sheet.getLastRow2('A1');
	ctx.log(' DerniereLigne : '+indexDerniereLigne );
	var configExcel = data.scenarioConfig[data.codeScenario].excel;
	var indexPremiereLigne = configExcel.debutIndexLigne;
	var tab = [
			{ columnIndex: configExcel.indexColonne.dateTraitementContrat, value: "Date traitement contrat" },
			{ columnIndex: configExcel.indexColonne.statutsContrat, value: "Statuts contrat" },
			{ columnIndex: configExcel.indexColonne.commentaireContrat, value: "Commentaire" }
		];
	ctx.excel.file.saveAs(data.cheminFichierResultat); 
	ctx.excelF.remplirObjetTableau(indexPremiereLigne-1, tab);
	
	
	///Initilisation des variables globales
	data.varGlobales.ligneCourante = indexPremiereLigne; 
	data.varGlobales.indexDerniereLigne = indexDerniereLigne;
	///
	
	ctx.log('fichier résultat créé');
	
	
	sc.endStep();
	return;
}});