ctx.dataF = (function () {

    var dataF = {
				scenarioConfig : '',
				codeScenario : '',
				nomScenario:'',
        webData : {
            url:'',
            tabDeBordURL:'', 
            identifiant:'', 
            motDePasse:'' 
        },
        varGlobales : { //globalVariables
            ligneCourante:0, //currentRow
            indexDerniereLigne:0, //indexLastRow
            controlSeul:false //controlSeul
        }
    };
		
		
	
	////////////////////////////////////////	
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
		dataF.statistiquesF=statistiquesF;
		
		//////////////////////////////////////////////
		
		
		 
		
////// CMU ///////////////////////////////////////////////////////////////////////////////////////////////	
//////////////////////////////////////////////////////////////////////////////////////////////////////////		
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
			
		dataF.CMUtemp_contractF=CMUtemp_contractF;
		        
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
		
		dataF.contratCourantCMU=contratCourantCMU;
		
			
		dataF.initialisationScenarioCMU = function(dat,scenario){
				
			dat.codeScenario=scenario;
			dat.nomScenario='Résiliation CMU';
			ctx.log('Init configF');
			ctx.configF.chargementFichierConfigScenarioCMU();
			dat.scenarioConfig = new confFileCMUClass();
			dat.scenarioConfig=ctx.configF.fichierConfigScenario;
			ctx.configF.init(dat);
			dat.webData=ctx.dataF.webData;
			dat.contratCourantCMU=ctx.dataF.contratCourantCMU;
			dat.varGlobales=ctx.dataF.varGlobales;	
			ctx.log('Init Trace : '+dat.scenarioConfig.CMU.cheminRacine);
			ctx.traceF.initFichierTrace(dat.scenarioConfig.CMU.cheminRacine, ctx.configF.scenario.CMU);
			ctx.traceF.infoTxt('Version du projet : ' + dat.scenarioConfig.Version + ' - Date de la Version : ' + ctx.getDate());
			
			ctx.log('Init excelF');
			ctx.excelF.configExcel(dat);
			ctx.traceF.infoTxt('Ouverture du fichier : ' +  ctx.configF.cheminFichier);
			ctx.excelF.ouvertureFichier(ctx.configF.cheminFichier);
			dat.varGlobales.ligneCourante = dat.scenarioConfig.CMU.excel.debutIndexLigne; // depuis le config.JSON
			dat.varGlobales.indexDerniereLigne = ctx.excelF.indexDerniereLigne();
			ctx.log(' Index dernière ligne :'+dat.varGlobales.indexDerniereLigne);
			ctx.traceF.infoTxt('Création du fichier résultat');	
			ctx.excelF.copieFichier(ctx.configF.cheminFichierResultat, dat.scenarioConfig.CMU.excel.debutIndexLigne-1, ctx.excelF.modifierEntete());
			ctx.log('fichier résultat créé');
//			dat.scenarioConfig = ctx.configF.recupConfigScenario(scenario);
			ctx.log('Init statsF');
			ctx.statsF.initFileStats(ctx.configF.cheminVersTemplate, dat.scenarioConfig.CMU.cheminRacine, ctx.configF.scenario.CMU);
			ctx.statsF.debuterStats(dat);
			
		}
		 
		 	dataF.resetContratCourantCMU = function(dat,scenario){
				ctx.log('resetContratCourant');
				dat.contratCourantCMU.dataLocale.dictContratsCourantCMU = [];
				dat.contratCourantCMU.dataEnLigne.dictContratsCourantCMU = [];
				dat.contratCourantCMU.statutsCMU.existanceASSPRI=false;
				dat.contratCourantCMU.statutsCMU.FinCMUProcessus=false;
				dat.contratCourantCMU.statutsCMU.contratTermine=false;
				dat.contratCourantCMU.statutsCMU.contratResilie=false;
				dat.contratCourantCMU.statutsCMU.contratProlonge=false;
//				dat.contratCourantCMU=ctx.dataF.contratCourantCMU;
				ctx.log('Reset Contrat : '+dat.contratCourantCMU.dataLocale.numeroContratIndiv);
			 }
//////////////////////////////////////////////////////////////////////////////////////////////////////////		
		
			
			
	////Adhesion/////////////////////////////////////////////////////////		
			
			
		var AdhesionContratTemp = {
			typeAssure:'',
      dateDebEffContrat:'',
      dateFinEffContrat:'',
      codeProduit:'',
      dateDebEffProduit:'',
			dateFinEffProduit:'',    
			dateDebEffSituatParti:'',
      dateFinEffSituatParti:''
		}; 
			
		
			dataF.AdhesionContratTemp=AdhesionContratTemp;
		        
		var contratCourantAdhesion = {
			dataLocale: {
				groupeGestion:'',
				centreGestion:'',
				tabPersonnesPhysiques : []
            },
      dataEnLigne: {
        numeroContratIndiv : '',
        tabPersonnesPhysiques : [],
				variables :{
							
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
		
		dataF.contratCourantAdhesion=contratCourantAdhesion;

		dataF.initialisationScenarioAdhesion = function(dat,scenario){	
			var configAdhesion = new confFileAdhesionClass();
			//dat.contratAdhesionAttributs = configAdhesion.ADHESION.excel.indexColonne;
			dat.codeScenario=scenario;
			dat.nomScenario='Adhesion';
			ctx.log('Init configF');
			ctx.configF.chargementFichierConfigScenarioAdhesion();
			dat.scenarioConfig = new confFileAdhesionClass();
			dat.scenarioConfig=ctx.configF.fichierConfigScenario;
			ctx.configF.init(dat);
			dat.webData=ctx.dataF.webData;
			dat.contratCourantAdhesion=ctx.dataF.contratCourantAdhesion;
			dat.contratCourantAdhesion.dataLocale.contratAdhesionAttributs=configAdhesion.ADHESION.excel.indexColonne;
			dat.contratCourantAdhesion.dataLocale.contratTemp=configAdhesion.ADHESION.excel.indexColonne;
			dat.contratCourantAdhesion.dataEnLigne.contratTemp=configAdhesion.ADHESION.excel.indexColonne;
			dat.varGlobales=ctx.dataF.varGlobales;	
			ctx.log('Init Trace : '+dat.scenarioConfig.Adhesion.cheminRacine);
			ctx.traceF.initFichierTrace(dat.scenarioConfig.Adhesion.cheminRacine, ctx.configF.scenario.Adhesion);
			ctx.traceF.infoTxt('Version du projet : ' + dat.scenarioConfig.Version + ' - Date de la Version : ' + ctx.getDate());
			
			ctx.log('Init excelF');
			ctx.excelF.configExcel(dat);
			ctx.traceF.infoTxt('Ouverture du fichier : ' +  ctx.configF.cheminFichier);
			ctx.excelF.ouvertureFichier(ctx.configF.cheminFichier);
			dat.varGlobales.ligneCourante = dat.scenarioConfig.Adhesion.excel.debutIndexLigne; // depuis le config.JSON
			dat.varGlobales.indexDerniereLigne = ctx.excelF.indexDerniereLigne();
			ctx.log(' Index dernière ligne :'+dat.varGlobales.indexDerniereLigne);
			ctx.traceF.infoTxt('Création du fichier résultat');	
			ctx.excelF.copieFichier(ctx.configF.cheminFichierResultat, dat.scenarioConfig.Adhesion.excel.debutIndexLigne-1, ctx.excelF.modifierEntete());
			ctx.log('fichier résultat créé');
			ctx.log('Init statsF');
			ctx.statsF.initFileStats(ctx.configF.cheminVersTemplate, dat.scenarioConfig.Adhesion.cheminRacine, ctx.configF.scenario.Adhesion);
			ctx.statsF.debuterStats(dat);
		}
			
	dataF.resetContratCourantAdhesion = function(dat,scenario){
		dat.contratCourantAdhesion.dataLocale.tabPersonnesPhysiques=[];
		dat.contratCourantAdhesion.dataEnLigne.tabPersonnesPhysiques=[];
			ctx.log('resetContratCourant');
			
	}	
  return dataF;
}) ();

