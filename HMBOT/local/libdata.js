ctx.dataF = (function () {

    var dataF = {
			
				scenarioConfig :{};
			
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
                dateProceedContract:'',
                statusContract: '',
                commentContract: ''
            },
            statusCMU: {
                isContractWithProductACS:false,
                isContractTerminated:false,
                FinCMUProcessus : false,
                changeCoverage:false,
                terminatedInAdvance:false
            }
        },
        statistiquesF : {
            Beginning : 0,
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
            url:'',
            tabDeBordURL:'', //dashboardURL:'', 
            identifiant:'', //login
            motDePasse:'' //password
        },
        varGlobales : { //globalVariables
            ligneCourante:0, //currentRow
            indexDerniereLigne:0, //indexLastRow
            controlSeulement:false //controlOnly
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
        },
       
    };
    return dataF;
}) ();
