
/** Description */
ActivInfinitev7.scenario({ scAdhesionInit: function(ev, sc) {
	var data = sc.data;
	sc.onTimeout(120000, function(sc, st) { sc.endScenario();	}); // default timeout handler for each step
	sc.onError(function(sc, st, ex) { sc.endScenario();	}); // default error handler
	sc.setMode(e.scenario.mode.clearIfRunning);
	sc.step(ActivInfinitev7.steps.stInitialisationDataBasique);
	sc.step(ActivInfinitev7.steps.stInitialisationAdhesionConfigurationData);
	sc.step(ActivInfinitev7.steps.stChargementConfigScenario);
	sc.step(ActivInfinitev7.steps.stConfigurationJSON_Adhesion);
	sc.step(ActivInfinitev7.steps.stConfigurationTrace);
	sc.step(ActivInfinitev7.steps.stConfigurationFichiersDonneesExcel_CreationChemin);
	sc.step(ActivInfinitev7.steps.stConfigurationFichiersDonneesExcel_OuvertureFichier_Adhesion);
	sc.step(ActivInfinitev7.steps.stConfigurationStatistiques);
	sc.step(ActivInfinitev7.steps.stFinInitialisation);
	sc.step(ActivInfinitev7.steps.stEchecInitialisation);
}});




/** Description */
ActivInfinitev7.step({ stInitialisationAdhesionConfigurationData: function(ev, sc, st) {
	var data = sc.data;
//	data = new dataClass();  // Attention ( bug) ne marche pas sans le sc ' pb de passage en reference'
	data.codeScenario = ctx.configF.scenario.Adhesion;
	data.nomFichierConfigScenario = 'configAdhesion.json';
	
	var webData = {
      url:'',
      tabDeBordURL:'', 
      identifiant:'', 
      motDePasse:'' 
  };
	data.webData=webData;
	
  var varGlobales = { 
    ligneCourante:0, 
    indexDerniereLigne:0, 
    controlSeul:false 
  };
	
	data.varGlobales = varGlobales;
	
	/// Contrat Courant
	var contratCourantAdhesion = {
			dataLocale: {
				groupeGestion:'',
				centreGestion:'',
				tabPersonnesPhysiques : [],
				variables : {
					listCom : [],
					nbCom : '',
					indexCom :'',
					indexBenef : '',
					listProd : []	,
					indexProd : '',
					nbProd : ''
				},
				contratAdhesionAttributs : {},
				assurePrincipal :{},
				personnePhysique : {}
      },
      dataEnLigne: {
        numeroContratIndiv : '',
        tabPersonnesPhysiques : [],
				variables : {
							
				}
							
       },
      notes: {
				contexteAnalyseStoppee:'',
        dateTraitementContrat:'',
        statutsContrat: '',
        commentaireContrat: ''
      },
      statuts: {
				finCreation : false
			}
    };
		/////
	
	data.contratCourantAdhesion=contratCourantAdhesion;
	sc.endStep();
	return;
}});


/** Description */
ActivInfinitev7.step({ stConfigurationFichiersDonneesExcel_OuvertureFichier_Adhesion: function(ev, sc, st) {
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
			{ columnIndex: configExcel.indexColonne.typeRejet, value: "Commentaire" },
			{ columnIndex: configExcel.indexColonne.numeroContrat, value: "Numéro de contrat" },
			{ columnIndex: configExcel.indexColonne.numeroContratPrevoyance, value: "Numéro de contrat prévoyance" },
			{ columnIndex: configExcel.indexColonne.instanceRIBCotisation, value: "Instance RIB cotisations" },
			{ columnIndex: configExcel.indexColonne.instanceRIBPrestation, value: "Instance RIB prestations" },
			{ columnIndex: configExcel.indexColonne.instanceInfosRO, value: "Instance infos RO" },
			{ columnIndex: configExcel.indexColonne.instanceAutres, value: "Instance Autres" }
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


/** Description */
ActivInfinitev7.step({ stConfigurationJSON_Adhesion: function(ev, sc, st) {
	var data = sc.data;
	ctx.log(' --> Chargement du fichier de configuration JSON ');
	var fichierJSON = ctx.fso.file.read(data.cheminFichierConfigScenario);
	var scenarioConfig = new confFileAdhesionClass();
	scenarioConfig = JSON.parse(fichierJSON);
	data.scenarioConfig=scenarioConfig;
	sc.endStep();
	return;
}});

