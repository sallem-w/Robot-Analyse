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
				webDataGRC : {
						url: '',
					  identifiant : '',
					  motDePasse: ''
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
		
		var ppCouranteAnalyse = {
			dataLocale: {
				referenceGRC : '',
			  typeAssure : '',
				numeroRO : '',
				nom : '',
				prenom : '',
				dateDeNaissance : '',
				debDateEffet: '',
				gammeProduit:'',
				codeOffre :'',
				tabGammeCode : [],
				tabProduits: [], //10 produits du fichier JSON
				numSEQ : '',
				numExtCtt : '',
				tabProduitsPrinConj : []
			},
			dataEnLigne: {
				nbContrat : 0,
				nbContratRadie : 0,
				nbContratRad: 0,
				indexContrat : 0,
				typeRelation : '',
				identiteRelation : '',
				tracePCXExist : false,
				contratEstActif : false,
				adhesionEstEnregistree : false,
			  HPPExiste : false,
			  produitGammeCompatible : false,
				tousStatutInactifs : false,
			  dateRadSupDjour : false,				
				codeOffre : '',
				debDateEffet : '',
				critereRecherche : 1,
				dateEffetConst : '01/01/2100',
				statusCCourant : '',
				dateRadiation : '',
				tabCoordAssures : []
			},
			notes: {
				contexteAnalyseStoppee : '',
				presenceHPP : 'Non',
				gestionControl : 'Non',
				paiementAdhesion : 'Non',
				clauseBenefAdh : 'Non',
				clauseBenefConjoint : 'Non',
				dateEffetAControler : 'Non'
			}	
		};
		
//		var numProd ={
//			numProdC : '',
//			numProdP : ''
//		};
		
//		dataF.numProd = numProd;
		
		dataF.ppCouranteAnalyse = ppCouranteAnalyse;
		
		dataF.initialisationScenarioAnalyse = function(dat, scenario){
			
			dat.codeScenario=scenario;
			ctx.configF.chargementFichierConfigScenarioANALYSE();
			dat.scenarioConfig = new confFileANALYSEClass(); //initialisation des objets
			dat.scenarioConfig=ctx.configF.fichierConfigScenario;//?????
			ctx.configF.init(dat);
			dat.webData=ctx.dataF.webData;
			dat.webDataGRC=ctx.dataF.webDataGRC;
			dat.ppCouranteAnalyse=ctx.dataF.ppCouranteAnalyse;
			dat.varGlobales=ctx.dataF.varGlobales;
			ctx.traceF.initFichierTrace(dat.scenarioConfig.ANALYSE.cheminRacine, ctx.configF.scenario.Analyse);
		
			ctx.excelF.configExcel(dat);
			ctx.excelF.ouvertureFichier(ctx.configF.cheminFichier);
			
			dat.varGlobales.ligneCourante = dat.scenarioConfig.ANALYSE.excel.debutIndexLigne; // depuis le config.JSON
			dat.varGlobales.indexDerniereLigne = ctx.excelF.indexDerniereLigne();
			
			
			ctx.excelF.copieFichier(ctx.configF.cheminFichierResultat, dat.scenarioConfig.ANALYSE.excel.debutIndexLigne-1, ctx.excelF.modifierEnteteIAE());
			
			//dat.scenarioConfig = ctx.configF.recupConfigScenario(scenario); //r�cup�ration config json
		}
		
		
		dataF.initialisationScenarioCMU = function(dat,scenario){
				
			dat.codeScenario=scenario;
			dat.nomScenario='R�siliation CMU';
			ctx.log('Init configF');
			ctx.configF.chargementFichierConfigScenarioCMU();
			dat.scenarioConfig = new confFileCMUClass();
			dat.scenarioConfig=ctx.configF.fichierConfigScenario;
			ctx.configF.init(dat);
			dat.webData=ctx.dataF.webData;
			dat.contratCourantCMU=ctx.dataF.contratCourantCMU;
			dat.varGlobales=ctx.dataF.varGlobales;	
			ctx.log('Init Trace : '+ dat.scenarioConfig.CMU.cheminRacine);
			ctx.traceF.initFichierTrace(dat.scenarioConfig.CMU.cheminRacine, ctx.configF.scenario.CMU);
			ctx.traceF.simpleTxt('Date de la Version : ' + GLOBAL.data.projectDate);
			ctx.log('Init excelF');
			
			
			ctx.excelF.configExcel(dat);
			ctx.traceF.infoTxt('Ouverture du fichier : ' +  ctx.configF.cheminFichier);
			
			
			ctx.excelF.ouvertureFichier(ctx.configF.cheminFichier);
			dat.varGlobales.ligneCourante = dat.scenarioConfig.CMU.excel.debutIndexLigne; // depuis le config.JSON
			dat.varGlobales.indexDerniereLigne = ctx.excelF.indexDerniereLigne();
			ctx.log(' Index derni�re ligne :'+dat.varGlobales.indexDerniereLigne);
			ctx.traceF.infoTxt('Cr�ation du fichier r�sultat');	
			ctx.excelF.copieFichier(ctx.configF.cheminFichierResultat, dat.scenarioConfig.CMU.excel.debutIndexLigne-1, ctx.excelF.modifierEntete());
			ctx.log('fichier r�sultat cr��');
//			dat.scenarioConfig = ctx.configF.recupConfigScenario(scenario);
			ctx.log('Init statsF');
			ctx.statsF.initFileStats(ctx.configF.cheminVersTemplate, dat.scenarioConfig.CMU.cheminRacine, ctx.configF.scenario.CMU);
			ctx.statsF.debuterStats(dat);
			
		}
		 
		 	dataF.resetContratCourantCMU = function(dat,scenario){
				ctx.log('resetContratCourant');
				dat.contratCourantCMU.notes.dateTraitementContrat='';
				dat.contratCourantCMU.notes.statutsContrat='';
				dat.contratCourantCMU.notes.commentaireContrat='';
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
		
    return dataF;
}) ();

