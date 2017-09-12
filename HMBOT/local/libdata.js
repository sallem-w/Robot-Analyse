ctx.dataF = (function () {

    var dataF = {
				scenarioConfig :{} ,
				codeScenario : '',
        contratCourantCMU: {
            dataLocale: {
                numeroContratIndiv : '',
                dictContratsCourantCMU : []
            },
            dataEnLigne: {
                numeroContratIndiv : '',
                dictContratsCourantCMU : []
            },
            notes: {
                dateTraitementContrat:'',
                statusContrat: '',
                commentaireContrat: ''
            },
            statusCMU: {
                FinCMUProcessus : false
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
            controlSeulement:false, //controlOnly
						indiceBenef:0,
						nbBenef: 0
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
		
		dataF.initialisationScenarioCMU = function(dat,scenario){
	
			dat.webData=ctx.dataF.webData;
			dat.contratCourantCMU=ctx.dataF.contratCourantCMU;
			dat.varGlobales=ctx.dataF.varGlobales;
			dat.statistiquesF=ctx.dataF.statistiquesF;
				
			dat.codeScenario=scenario;
			ctx.log('Init configF');
			ctx.configF.init(scenario);
			dat.scenarioConfig=ctx.configF.fichierConfig;
			ctx.log('Init excelF');
		//		ctx.excelF.configExcel(scenario);
			dat.scenarioConfig = ctx.configF.recupConfigScenario(scenario);
				//data.configExcel = data.config.excel;
			ctx.log(" Test URL : "+ dat.webData.url);	

		}
		 
		 	dataF.resetContratCourantCMU = function(dat,scenario){
				ctx.log('resetContratCourant');
				dat.contratCourantCMU=ctx.dataF.contratCourantCMU;
				ctx.log('Reset Contrat : '+dat.contratCourantCMU.dataLocale.numeroContratIndiv);
			 }
		
		
    return dataF;
}) ();
