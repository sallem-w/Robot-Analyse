ctx.dataF = (function () {

    var dataF = {
				scenarioConfig : '',
				codeScenario : '',
        contratCourantCMU: {
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
								typeAssure : '',
								etatCourant : '',
								rangAssure : '',
								dateFinEffetInfinite : ''
							}
							
            },
            notes: {
                dateTraitementContrat:'',
                statusContrat: '',
                commentaireContrat: ''
            },
            statusCMU: {
								existanceASSPRI : false,
                FinCMUProcessus : false,
								contratProlonge : false,
								ASSPRITermine : false,
								assureValid : false,
								contratTermine : false
            }
        },
        statistiquesF : {
            debutTpsTraitement : 0,
						tpsTraitement : 0,
            nbCasTraite : 0, //countCaseProcessed
            nbCasTrouveDsExcel : 0, //countCaseFindIntoExcel
            nbCasTraitementSucces : 0, // countCaseSuccessProcessed
            nbCasTraitementEchec : 0, //countCaseFailProcessed
            nbCasRevoirCentre : 0, //countCaseBackToCenter
            nbContratsPretsPrResiliation : 0, //sc.data.countCaseReadyToRemove
            nbContratsResilies : 0
        },
        webData : {
            url:'htt://exemple.com',
            tabDeBordURL:'', 
            identifiant:'', 
            motDePasse:'' 
        },
        varGlobales : { //globalVariables
            ligneCourante:0, //currentRow
            indexDerniereLigne:0, //indexLastRow
            controlSeul:false //controlSeul
        },
        CMUtemp_contractF : {
            typeAssure:'',
            dateDebEffContrat:'',
            dateFinEffContrat:'',
            codeProduit:'',
            dateDebEffProduit:'',
            dateFinEffProduit:'',
            dateDebEffSituatParti:'',
            dateFinEffSituatParti:''
        }
				
   
    };
		
		var ppCouranteAnalyse = {
			dataLocale: {
				referenceGRC : '',
			  typeAssure : '',
			},
			dataEnLigne: {
				nbContratRadie : 0,
				indexContrat : 0,
				typeRelation : '',
				identiteRelation : '' 
			},
			notes: {
				dateTraitementContrat: '',
			  commentaireContrat:''
			}	
		};
		
		dataF.ppCouranteAnalyse = ppCouranteAnalyse;
		dataF.initialisationScenarioAnalyse = function(dat, scenario){
			dat.webData=ctx.dataF.webData;
			dat.ppCouranteAnalyse=ctx.dataF.ppCouranteAnalyse;
			dat.varGlobales=ctx.dataF.varGlobales;
			dat.codeScenario=scenario;
			ctx.configF.init(scenario);
			dat.scenarioConfig = new confFileClass(); //initialisation des objets
			dat.scenarioConfig=ctx.configF.fichierConfig;
			dat.scenarioConfig = ctx.configF.recupConfigScenario(scenario); //récupération config json
		}
		
		dataF.initialisationScenarioCMU = function(dat,scenario){
	
			dat.webData=ctx.dataF.webData;
			dat.contratCourantCMU=ctx.dataF.contratCourantCMU;
			dat.varGlobales=ctx.dataF.varGlobales;
			dat.statistiquesF=ctx.dataF.statistiquesF;
				
			dat.codeScenario=scenario;
			ctx.log('Init configF');
			ctx.configF.init(scenario);
			dat.scenarioConfig = new confFileClass();
			dat.scenarioConfig=ctx.configF.fichierConfig;
			ctx.log('Init excelF');
		//		ctx.excelF.configExcel(scenario);
			dat.scenarioConfig = ctx.configF.recupConfigScenario(scenario);
				//data.configExcel = data.config.excel;
			ctx.log(" Test URL : "+ dat.webData.url);	

		}
		 
		 	dataF.resetContratCourantCMU = function(dat,scenario){
				ctx.log('resetContratCourant');
				dat.contratCourantCMU.dataLocale.dictContratsCourantCMU = [];
				dat.contratCourantCMU.dataEnLigne.dictContratsCourantCMU = [];
				dat.contratCourantCMU.statusCMU.existanceASSPRI=false;
				dat.contratCourantCMU.statusCMU.FinCMUProcessus=false;
				dat.contratCourantCMU.statusCMU.contratTermine=false;
//				dat.contratCourantCMU=ctx.dataF.contratCourantCMU;
				ctx.log('Reset Contrat : '+dat.contratCourantCMU.dataLocale.numeroContratIndiv);
			 }
		
		
    return dataF;
}) ();

