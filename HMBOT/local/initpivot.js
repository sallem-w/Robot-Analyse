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
	ctx.excelF.remplirTableau(1, names);
	
	data.globalVariables.indexContratCourant = 0;
	data.globalVariables.nomClient = json.customerName;
	data.contrat = contracts;
	data.stats.nombreDeContrats = countContracts;
	ctx.traceF.infoTxt(" le nombre de contrats est : " + data.stats.nombreDeContrats);
	ctx.traceF.infoTxt(" premier jour du mois courant " + ctx.dateF.premierJourDuMoisCourant(ctx.dateF.formatJJMMAAAA(new Date())));
	
	return sc.endStep();
}});
