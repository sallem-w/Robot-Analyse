ActivInfinitev7.step({ initPivot : function(ev, sc, st) {
	ctx.trace.writeInfo('init pivot file ' + sc.data.scenarioCode);
	if (!ctx.configFile.init(sc.data.scenarioCode)) {
		sc.endScenario();
	}

	sc.data.config = ctx.config.getConfig(sc.data.scenarioCode);
	
	ctx.trace.writeInfo('STEP - readFile');
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
	var names = getObjectValues(headerNames);
	names.push('Date traitement contrat');
	names.push('Status contrat');
	names.push('Commentaire');
	ctx.excelHelper.writeArray(1, names);
	
	sc.data.indexCurrentContract = 0;
	sc.data.contracts = contracts;
	sc.data.countContracts = countContracts;
	sc.data.totalTimeDuration = new Date();
	sc.data.countCaseProcessed = countContracts;
	sc.endStep();
}});
