ctx.dataF = (function () {

    var dataF = {
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
                exitACSProcess:true,
                changeCoverage:false,
                terminatedInAdvance:false
            }
        },
        statistiquesF : {
            timeBeginning : 0,
            countCaseProcessed : 0,
            countCaseFindIntoExcel : 0,
            countCaseReadyToRemove : 0,
            countCaseSuccessProcessed : 0,
            countCaseFailProcessed : 0,
            countCaseBackToCenter : 0,
            countCaseProductTerminated : 0,
            countCaseContractWithProductACS : 0
        },
        webData : {
            url:'',
            tableauDeBordURL:'', //dashboardURL:'', 
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
        FinCMUProcessus : false
    };
    return dataF;
}) ();
