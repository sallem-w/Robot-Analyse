
/** Description */
ActivInfinitev7.scenario( {
	scCMUMainScenario: function (ev, sc) {
		var data = sc.data;
		sc.onTimeout(30000, function (sc, st) {
			sc.endScenario();
		}); // default timeout handler for each step
		sc.onError(function (sc, st, ex) {
			sc.endScenario();
		}); // default error handler
		sc.setMode(e.scenario.mode.clearIfRunning);
		
		// add steps here...
		sc.step(ActivInfinitev7.steps.stInitScenarioCMU);
		sc.step(ActivInfinitev7.steps.stServerConnexionCMU);
		sc.step(ActivInfinitev7.steps.stInitSelectCMUContractFromExcel);
		sc.step(ActivInfinitev7.steps.stSelectCMUContractFromExcel);
		sc.step(ActivInfinitev7.steps.stReadCMUDataFromExcel);
	//ajouter un step qui vérifie dans le dictionnaire l'existance de l'assuré principale avant de lancer le sous scénario checkCotratCMU
		//sc.step(ActivInfinitev7.steps.stReadCMUDataOnLine);
//		sc.step(ActivInfinitev7.steps.stScenarioCheckBenefCMU);
//		sc.step(ActivInfinitev7.steps.stScenarioTerminatedCMU);
//		sc.step(ActivInfinitev7.steps.stInsertCMUDataInExcel);
//		sc.step(ActivInfinitev7.steps.stNextCMUContrat);
		sc.step(ActivInfinitev7.steps.stEndScenarioCMU);

	}
});


/** Description */
ActivInfinitev7.step({ stInitScenarioCMU : function(ev, sc, st) {
	var data = sc.data;
	ctx.trace.writeInfo('Début étape - stInitScenarioCMU');
		/** Les informations concernant le serveur infinite */
		var webData = {
			url:'',
			dashboardURL:'',
			login:'',
			password:''
		};

		/** Les informations globales utilisée dans le scénario */
		var globalVariables = {
			currentRow:0,
			indexLastRow:0,
			controlOnly:false
		};
		
		
		
		/** contrat(s) en cours (dict) */
		var dictContratsCourantCMU = [];
		
		/** informations Locales */
		var localData = {
			individualContractNumber:''
//			typeAssure:'',
//			dateDebEffContrat:'',
//			dateFinEffContrat:'',
//			codeProduit:'',
//			dateDebEffProduit:'',
//			dateFinEffProduit:'',
//			dateDebEffSituatParti:'',
//			dateFinEffSituatParti:''
		};
		
		localData.dictContratsCourantCMU = dictContratsCourantCMU;
		var onLineData = {};
		
		/** informations des stats */
		var stats = {
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
		
		/** Notes sur le contrat */
		var notes = {
			dateProceedContract:'',
			statusContract: '',
			commentContract: ''
		};
		
		var contratCourantCMU = {};
		contratCourantCMU.localData=localData;		
		contratCourantCMU.onLineData=onLineData;
		contratCourantCMU.notes=notes;

		data.webData = webData;
		data.globalVariables = globalVariables;
  	data.contratCourantCMU=contratCourantCMU;
		data.stats=stats;
		
		var temp_contract={
			typeAssure:'',
			dateDebEffContrat:'',
			dateFinEffContrat:'',
			codeProduit:'',
			dateDebEffProduit:'',
			dateFinEffProduit:'',
			dateDebEffSituatParti:'',
			dateFinEffSituatParti:''
		};
		data.temp_contract=temp_contract;
//		data.contratCourantCMU.onlineData.dictContratsCourantCMU.push(temp_contract);
		
	sc.endStep();
	return;
}});


/** Description */
ActivInfinitev7.step({ stServerConnexionCMU : function(ev, sc, st) {
	var data = sc.data;
	ctx.trace.writeInfo('Début étape - stServerConnexionCMU');
		if (ActivInfinitev7.pWebServerClosed.exist() && ActivInfinitev7.pWebServerClosed.oFailureOfServerAPA.exist()) {
			ctx.trace.writeInfo('Le serveur Infinite est fermé');
			ctx.popupHelper.newPopup('Le serveur Infinite est fermé');
			return ;
		}

		if (!ActivInfinitev7.pConnection.exist()) {
			ctx.trace.writeInfo('Open Infinite on connection page');
			ctx.popupHelper.newPopup('Il faut ouvrir et rentrer ces identifiants dans Infinite');
			return ;
		}

		data.webData.url = ActivInfinitev7.pConnection.getInfos().location.href;
		data.webData.login = ActivInfinitev7.pConnection.oLogin.get();
		data.webData.password = ActivInfinitev7.pConnection.oPassword.get();
		
		//on entre dans Infinite
		ActivInfinitev7.pConnection.btLogin.click();
		ActivInfinitev7.pDashboard.wait(function(ev) {
		var infos = ActivInfinitev7.pDashboard.getInfos();
		data.webData.dashboardURL=infos.document.URL;
		ctx.log('url of dashboard : ' + data.webData.dashboardURL);
			sc.endStep();
			return;
		});
}
});


/** Description */
ActivInfinitev7.step({ stInitSelectCMUContractFromExcel : function(ev, sc, st) {
	var data = sc.data;
	ctx.trace.writeInfo('Début étape - stInitSelectCMUContractFromExcel');
	
	data.scenarioCode = ctx.config.CMU;
  ctx.log('Récupération des données du config');
	ctx.configFile.init(data.scenarioCode);
	ctx.excelFile.initConfig(data.scenarioCode);
	data.config = ctx.config.getConfig(data.scenarioCode);
	data.configExcel = data.config.excel;
	data.globalVariables.currentRow = data.configExcel.startRowIndex;
	
	ctx.trace.writeInfo('Ouverture du fichier : ' +  ctx.configFile.getPathFile());
	ctx.excelHelper.openFile(ctx.configFile.getPathFile());
	data.globalVariables.indexLastRow = ctx.excelFile.getLastIndexRow();
	ctx.trace.writeInfo('Création du fichier résultat');	
	ctx.excelHelper.copyFile(ctx.configFile.getPathFileOutput(), ctx.excelFile.startRowIndex(), ctx.excelFile.getHeaderFile());
	ctx.log('fichier résultat créé');
	sc.endStep();
	return;
}});


/** ce step consiste à parcurir le fichier excel et récupérer les lignes qui ont le meme numéro du contrat (dictionaire) */
ActivInfinitev7.step({ stSelectCMUContractFromExcel : function(ev, sc, st) {
	var data = sc.data;
	ctx.trace.writeInfo('Début étape - stSelectCMUContract');
	ctx.trace.writeInfo('Sélection du contrat numéro: '+ data.globalVariables.currentRow);
	sc.endStep();
  return;
}});



/** Description */
ActivInfinitev7.step({ stReadCMUDataFromExcel : function(ev, sc, st) {
	var data = sc.data;
	ctx.trace.writeInfo('Début étape - stReadCMUDataFromExcel');

	/** numéro du contrat */
	data.contratCourantCMU.localData.individualContractNumber = ctx.stringHelper.padLeft(ctx.string.trim(String(ctx.excel.sheet.getCell(data.globalVariables.currentRow, data.configExcel.columnIndex.individualContract))), '00000000');
	/** dans une boucle on récupère l'assuré principale et les bénéficiaires */
	var individualContractNumber = data.contratCourantCMU.localData.individualContractNumber;
	var newIndividualContractNumber = individualContractNumber;
	ctx.log('current row: '+data.globalVariables.currentRow);
  //mise à jour du dict
	data.contratCourantCMU.localData.dictContratsCourantCMU = [];
	data.temp_contract = {};
	while (newIndividualContractNumber !== undefined && individualContractNumber === newIndividualContractNumber) {
			//récupération des champs (type, .....)
		 // contrat.typeAssure = ctx.excel.sheet.getCell(data.globalVariables.currentRow, data.configExcel.columnIndex.type);
		  data.temp_contract.codeProduit = ctx.excel.sheet.getCell(data.globalVariables.currentRow, data.configExcel.columnIndex.suscribedCodeProduct);
		  data.temp_contract.dateDebEffContrat = ctx.excel.sheet.getCell(data.globalVariables.currentRow, data.configExcel.columnIndex.icStartDate);
			data.temp_contract.dateFinEffContrat = ctx.excel.sheet.getCell(data.globalVariables.currentRow, data.configExcel.columnIndex.icEndDate);
	    data.temp_contract.typeAssure = ctx.excel.sheet.getCell(data.globalVariables.currentRow, data.configExcel.columnIndex.type);
		
			ctx.log('type contrat: '+data.temp_contract.typeAssure);
		
		  data.contratCourantCMU.localData.dictContratsCourantCMU.push(data.temp_contract);
			
		  data.globalVariables.currentRow+=1;
			newIndividualContractNumber = ctx.stringHelper.padLeft(ctx.string.trim(String(ctx.excel.sheet.getCell(data.globalVariables.currentRow, data.configExcel.columnIndex.individualContract))), '00000000');
	}
	ctx.log('numéro courant: '+individualContractNumber);
	if(data.globalVariables.currentRow < data.globalVariables.indexLastRow){
		sc.endStep(ActivInfinitev7.steps.stSelectCMUContractFromExcel);
		return;
	}
	sc.endStep();
	return;
	
	
}});


/** Description */
ActivInfinitev7.step({ stReadCMUDataOnLine : function(ev, sc, st) {
	var data = sc.data;
	
	ctx.trace.writeInfo('Début étape - stReadCMUDataOnLine');
	
	sc.endStep();
	return;
}});



/** Description */
ActivInfinitev7.step({ stEndScenarioCMU : function(ev, sc, st) {
	var data = sc.data;
	
	sc.endScenario();
	return;
}});


