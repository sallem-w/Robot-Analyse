
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
	sc.step(ActivInfinitev7.steps.stConfigurationFichiersDonneesExcel_OuvertureFichier);
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


