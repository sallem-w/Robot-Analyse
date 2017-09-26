<<<<<<< HEAD
ActivInfinitev7.step({ initPivot : function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('init pivot file ' + sc.data.codeDuScenario);
	if (!ctx.configF.initDA(sc.data.codeDuScenario)) {
		return sc.endScenario();
	}

	
	sc.data.config = ctx.configF.recupConfigScenario(sc.data.codeDuScenario);
	ctx.traceF.infoTxt(JSON.stringify(sc.data.config));
	ctx.traceF.infoTxt('STEP - Create Pivot');
	ctx.traceF.infoTxt(ctx.options.serverURL + '\\harmonieCustomer.exe ' + ctx.configF.recupererCheminRacine());
	var result = ctx.execRun(ctx.configF.cheminVersAppliHarmonieCustomer() + ' ' + ctx.configF.recupererCheminRacine(), 1, true);
	ctx.traceF.infoTxt('result : ' + result);
	
	ctx.traceF.infoTxt('STEP - readFile');
	ctx.traceF.infoTxt('pathFile : ' + ctx.configF.recupererCheminFichier());
	var fileContracts = ctx.fso.file.read(ctx.configF.recupererCheminFichier());
	var json = JSON.parse(fileContracts);
	
	var entetes = json.keyLabel;
	var contracts = json.data;
	var countContracts = contracts.length;
		
	ctx.traceF.infoTxt('STEP - createOutputFile');
	ctx.excelF.creerFichier();
	ctx.traceF.infoTxt('STEP - saveOutputFile');
	ctx.excelF.sauverFichier(ctx.configF.recupererCheminFichierDeSortie()); 
	
	ctx.traceF.infoTxt('STEP - writeHeaderOutputFile');
	var names = _.getObjectValues(entetes);
	names.push('Numéro de contrat individuel');
	names.push('Date traitement contrat');
	names.push('Status contrat');
	names.push('Commentaire');
	names.push('Remarque');
  names.push('Courrier');
	ctx.excelF.remplirTableau(1, names);
	
	data.globalVariables.indexContratCourant = 0;
	data.globalVariables.ligneTraite = 2;
	data.globalVariables.nomClient = json.customerName;
	data.contrat = contracts;
	data.stats.nombreDeContrats = countContracts;
	ctx.traceF.infoTxt(" le nombre de contrats est : " + data.stats.nombreDeContrats);
	ctx.traceF.infoTxt(" premier jour du mois courant " + ctx.dateF.premierJourDuMoisCourant(ctx.dateF.formatJJMMAAAA(new Date())));
	
	
                        
   

=======
﻿	ActivInfinitev7.step({ stInitPivot : function(ev, sc, st) {
		
		var data = sc.data;
		 
  	ctx.traceF.infoTxt('init pivot file ' + data.codeDuScenario);
    if (!ctx.configF.init(data.codeDuScenario)) {
    	return sc.endScenario();
    }

            
		data.config = ctx.configF.recupConfigScenario(data.codeDuScenario);
		ctx.traceF.infoTxt(JSON.stringify(data.config));
    ctx.traceF.infoTxt('STEP - Create Pivot');
    ctx.traceF.infoTxt(ctx.options.serverURL + '\\harmonieCustomer.exe ' + ctx.configF.recupererCheminRacine());
    var result = ctx.execRun(ctx.configF.cheminVersAppliHarmonieCustomer() + ' ' + ctx.configF.recupererCheminRacine(), 1, true);
    ctx.traceF.infoTxt('result : ' + result);
            
    ctx.traceF.infoTxt('STEP - readFile');
    ctx.traceF.infoTxt('pathFile : ' + ctx.configF.recupererCheminFichier());
    var fileContracts = ctx.fso.file.read(ctx.configF.recupererCheminFichier());
    var json = JSON.parse(fileContracts);
            
    data.headerNames = json.keyLabel;
    //data.contracts = json.data;
    //data.countContracts = data.contracts.length;
                        
    ctx.traceF.infoTxt('STEP - createOutputFile');
    ctx.excelF.creerFichier();
            
    ctx.traceF.infoTxt('STEP - saveOutputFile');
    ctx.excelF.sauverFichier(ctx.configF.cheminFichierResultat); 
            
    ctx.traceF.infoTxt('STEP - writeHeaderOutputFile');
    var names = _.getObjectValues(data.headerNames);
    names.push('Numéro de contrat individuel');
    names.push('Date traitement contrat');
    names.push('Status contrat');
    names.push('Commentaire');
    names.push('Remarque');
    names.push('Courrier');
>>>>>>> 'Modifs2609'
    ctx.excelF.remplirTableau(1, names);
    
		data.names = names;
    data.indexCurrentContract = 0;
    data.customerName = json.customerName;
  	data.contracts = json.data;
    data.countContracts = data.contracts.length;
    data.totalTimeDuration = new Date();
    data.countCaseFindIntoPivot = data.countContracts;
    data.countCaseProcessed = 0;
    data.countCaseProcessedWithWarning = 0;
    data.countCaseFailProcessed = 0;
     return sc.endStep();

}});
