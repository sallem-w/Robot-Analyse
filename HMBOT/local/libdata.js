 ctx.dataF = (function() {
	
	var dataF = {};
	
	dataF.initGlobale = function(codeScenario) {
		
		//Initialisations globales
		dataF.webData=ctx.webData;
		dataF.varGlobales=ctx.varGlobales;
		dataF.statistiquesF = ctx.statistiquesF;
		
	}
	
	
	dataF.initialisationScenarioCMU = function() {
		dataF.initGlobale();
		var contratCourantCMU = {};
		contratCourantCMU.DataLocale=ctx.dataLocaleCMU;		
		contratCourantCMU.DataEnLigne=ctx.dataEnLigneCMU;
		contratCourantCMU.notes= ctx.CMUnotesF;
		dataF.contratCourantCMU=contratCourantCMU;
		dataF.statusCMU = ctx.statusCMU;
		
	}
	
	
	
	
	return dataF;
}) ();
 
 
  ctx.webData = (function() {
	/** Les informations concernant le serveur infinite */
	var webData = {
		url:'',
		tableauDeBordURL:'', //dashboardURL:'', 
		identifiant:'', //login
		motDePasse:'' //password
	};
	
	return webData;
}) ();
 
 
  ctx.varGlobales = (function() {
/** Les informations globales utilisée dans le scénario */
		var varGlobales = { //globalVariables
			ligneCourante:0, //currentRow
			indexDerniereLigne:0, //indexLastRow
			controlSeulement:false //controlOnly
		};
	
	return varGlobales;
}) ();
  
 ctx.dataLocaleCMU = (function() {
		/** informations Locales */
		var dataLocaleCMU = {
			individualContractNumber : '',
			dictContratsCourantCMU : []
		};
	
	return dataLocaleCMU;
}) ();
		
 ctx.dataEnLigneCMU = (function() {
		/** informations Locales */
		var dataEnLigneCMU = {
			individualContractNumber : '',
			dictContratsCourantCMU : []
		};
	
	return dataEnLigneCMU;
}) ();
	
 ctx.statusCMU = (function() {
	///statuts du contrat
		var statusCMU = {
			isContractWithProductACS:false,
			isContractTerminated:false,
			exitACSProcess:true,
			changeCoverage:false,
			terminatedInAdvance:false
		};
		return statusCMU;
}) (); 
 
ctx.statistiquesF = (function() {
	/** informations Locales */
	var statistiquesF = {
		timeBeginning : ctx.date.convertTimeSeconds(new Date()),
		countCaseProcessed : 0,
		countCaseFindIntoExcel : 0,
		countCaseReadyToRemove : 0,
		countCaseSuccessProcessed : 0,
		countCaseFailProcessed : 0,
		countCaseBackToCenter : 0,
		countCaseProductTerminated : 0,
		countCaseContractWithProductACS : 0
	};
	
	return statistiquesF;
}) ();
 
ctx.CMUnotesF = (function() {
	/** informations Locales */
		var CMUnotesF = {
			dateProceedContract:'',
			statusContract: '',
			commentContract: ''
		};
	
	return CMUnotesF;
}) ();
 
ctx.CMUtemp_contractF = (function() {
	/** informations Locales */
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
	
	return CMUtemp_contractF;
}) ();
 

		
		
