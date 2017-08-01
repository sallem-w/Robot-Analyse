ActivInfinitev7.step({ initPivot : function(ev, sc, st) {
	ctx.trace.writeInfo('init pivot file ' + sc.data.scenarioCode);
	if (!ctx.configFile.init(sc.data.scenarioCode)) {
		return sc.endScenario();
	}

	sc.data.config = ctx.config.getConfig(sc.data.scenarioCode);
ctx.trace.writeInfo(JSON.stringify(sc.data.config));
	ctx.trace.writeInfo('STEP - Create Pivot');
	ctx.trace.writeInfo(ctx.options.serverURL + '\\harmonieCustomer.exe ' + ctx.configFile.getPathDirectory());
	var result = ctx.execRun(ctx.configFile.getHarmonieCustomerPath() + ' ' + ctx.configFile.getPathDirectory(), 1, true);
	ctx.trace.writeInfo('result : ' + result);
	
	ctx.trace.writeInfo('STEP - readFile');
	ctx.trace.writeInfo('pathFile : ' + ctx.configFile.getPathFile());
	var fileContracts = ctx.fso.file.read(ctx.configFile.getPathFile());
	var json = JSON.parse(fileContracts);
	
	var headerNames = json.keyLabel;
	var contracts = json.data;
	var countContracts = contracts.length;
		
	ctx.trace.writeInfo('STEP - createOutputFile');
	ctx.excelHelper.createFile();
	
	ctx.trace.writeInfo('STEP - saveOutputFile');
	ctx.excelHelper.saveFile(ctx.configFile.getPathFileOutput()); 
	
	ctx.trace.writeInfo('STEP - writeHeaderOutputFile');
	var names = _.getObjectValues(headerNames);
	names.push('Numéro de contrat individuel');
	names.push('Date traitement contrat');
	names.push('Status contrat');
	names.push('Commentaire');
	names.push('Remarque');
	names.push('Courrier');
	ctx.excelHelper.writeArray(1, names);
	
	sc.data.indexCurrentContract = 0;
	sc.data.customerName = json.customerName;
	sc.data.contracts = contracts;
	sc.data.countContracts = countContracts;
	sc.data.totalTimeDuration = new Date();
	sc.data.countCaseFindIntoPivot = countContracts;
	sc.data.countCaseProcessed = 0;
	sc.data.countCaseProcessedWithWarning = 0;
	sc.data.countCaseFailProcessed = 0;
	return sc.endStep();
}});
