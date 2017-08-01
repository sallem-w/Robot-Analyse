
//Etapes du scénario ACS
ActivInfinitev7.scenario({ scenarioACS: function(ev, sc) {
	sc.data.scenarioCode = ctx.config.ACS;
	sc.setMode(e.scenario.mode.clearIfRunning);
	sc.step(ActivInfinitev7.steps.initScenario);
	sc.step(ActivInfinitev7.steps.startScenarioACS);
	sc.step(ActivInfinitev7.steps.endScenario);
}});

//Initialisation
ActivInfinitev7.step({ initScenario : function(ev, sc, st) {
	//Impression dans le log du numéro de version
	ctx.trace.writeInfo('Version du projet : '+ GLOBAL.data.projectVersion +" - Date de la Version : "+GLOBAL.data.projectDate );
	ctx.trace.writeInfo('Start scenario ' + sc.data.scenarioCode); //Ecriture dans le log
	if (!ctx.excelFile.initConfig(sc.data.scenarioCode)) { ///Charge la configuration Excel à partir du fichier "server/config.json"
		return sc.endScenario(sc);
	}
	
	sc.data.config = ctx.config.getConfig(sc.data.scenarioCode); ///Récupère le config.json selon le code scénario
	sc.data.configExcel = sc.data.config.excel; /// Récupère la config Excel du config.json selon le code scénario
	ctx.trace.writeInfo('STEP - openFile'); //Ecriture dans le log
	ctx.excelHelper.openFile(ctx.configFile.getPathFile()); // Ouverture d'un fichier Excel unique accessible via l'adresse contenue dans config.rootPath
	
	ctx.trace.writeInfo('STEP - copyFile'); //Ecriture dans le log
	ctx.excelHelper.copyFile(ctx.configFile.getPathFileOutput(), ctx.excelFile.startRowIndex(), ctx.excelFile.getHeaderFile()); /// Enregistre le fichier Excel d'entrée sous un autre nom  et initialise les headers des colonnes de commentaires

	
	var indexLastRow = ctx.excelFile.getLastIndexRow(); // Recupère l'indice de la dernière ligne
	
	sc.data.countCaseFindIntoExcel = indexLastRow - sc.data.configExcel.startRowIndex + 1; // Calcul le nombre de lignes
	sc.data.totalTimeDuration = new Date();  // renseigne la date du jour
	sc.data.countCaseProcessed = 0; // Initialise le compteur des cas à zéros
	sc.data.countCaseSuccessProcessed = 0; // Initialise le compteur des cas à zéros
	sc.data.countCaseFailProcessed = 0; // Initialise le compteur des cas à zéros
	sc.data.countCaseBackToCenter = 0; // Initialise le compteur des cas à zéros 
	sc.data.countCaseReadyToRemove = 0;// Initialise le compteur des cas à zéros
	sc.data.countCaseProductTerminated = 0; // Initialise le compteur des cas à zéros
	sc.data.countCaseContractWithProductACS = 0; // Initialise le compteur des cas à zéros
	sc.data.indexCurrentContract = sc.data.configExcel.startRowIndex; // Démarre le contrat courant à la première ligne (probleme : plutot demarrer de la dernière ligne traitée)
	sc.data.indexLastRow = indexLastRow;
	return sc.endStep();
}});
	
// Fin de l'initialisation

// Démarrage du scénario
ActivInfinitev7.step({ startScenarioACS : function(ev, sc, st) {
	var i = sc.data.indexCurrentContract;
	
	sc.data.contract = ctx.excelFile.getContractRowACS(i); // récupère les infos contenues dans les colonnes pour chaque ligne et selon le config.json
	if (!sc.data.contract) { /// quand sc.data.contract retourne undefined  on boucle sur la ligne suivante lorsque le contrat a déja été traité
		loopStepContractACS(sc, i);
		return;
	}
	
	sc.data.countCaseProcessed += 1; // le compteur des cas traités augmente de 1
	sc.data.statusContract = ''; // variable dynamique
	sc.data.commentContract = ''; // variable dynamique
	
	startScenarioACS(sc, (function() {  /// On demarre enfin la  fontcion  startScenarioACS avec les données de data initialisées par les lignes précédentees
		if (sc.data.statusContract === ctx.excelHelper.constants.status.Success) {
			sc.data.countCaseSuccessProcessed += 1;
		}
		
		if (sc.data.statusContract === ctx.excelHelper.constants.status.Fail) {
			sc.data.countCaseFailProcessed += 1;
		}

		var writeArray = [
			{ columnIndex: sc.data.configExcel.columnIndex.dateProceedContract, value: ctx.date.formatTrace(new Date()) },
			{ columnIndex: sc.data.configExcel.columnIndex.statusContract, value: sc.data.statusContract },
			{ columnIndex: sc.data.configExcel.columnIndex.commentContract, value: sc.data.commentContract }
		];
		
		ctx.excelHelper.writeArrayObject(sc.data.contract.row, writeArray);
		ctx.excelHelper.saveFile();
		
		loopStepContractACS(sc, i);
	}));
}});

ActivInfinitev7.step({ endScenario : function(ev, sc, st) {
	ctx.trace.writeInfo('STEP - closeFile');
	ctx.excelHelper.closeFile();
	
	ctx.trace.writeInfo('STEP - writeStats');
	var stats = {};
	stats['fileName'] = ctx.configFile.getFileNameOutput();
	stats['totalTimeDuration'] = ctx.date.getTimeElapsedSince(ctx.date.diffTime(sc.data.totalTimeDuration, new Date()));
	stats['countCaseProcessed'] = sc.data.countCaseProcessed;
	stats['countCaseFindIntoExcel'] = sc.data.countCaseFindIntoExcel;
	stats['countCaseReadyToRemove'] = sc.data.countCaseReadyToRemove;
	stats['countCaseSuccessProcessed'] = sc.data.countCaseSuccessProcessed;
	stats['countCaseFailProcessed'] = sc.data.countCaseFailProcessed;
	stats['countCaseBackToCenter'] = sc.data.countCaseBackToCenter;
	stats['countCaseProductTerminated'] = sc.data.countCaseProductTerminated;
	stats['countCaseContractWithProductACS'] = sc.data.countCaseContractWithProductACS;
	ctx.excelFile.writeStats(stats);
	
	/// debut modif
  var WshShell = new ActiveXObject("WScript.Shell");
	var oExec = WshShell.Exec("taskkill /F /IM EXCEL.exe"); 
	ctx.log("Count case processed : "+sc.data.countCaseProcessed);
	var myPopup = ctx.popup('pMyPopup', e.popup.template.Ok) ;
	// display the Popup, setting title and message
	myPopup.open({ title:  'Fin', message: '<H4>Fin du scénario</H4>'});
	myPopup.waitResult(function(res) 
	{
		var WshShell = new ActiveXObject("WScript.Shell");
		var oExec = WshShell.Exec("taskkill /F /IM CtxtStudio3.exe");
		// end modif
		return sc.endStep();
  })
}});

function loopStepContractACS(sc, i) {
	if (i < sc.data.indexLastRow) {
		sc.data.indexCurrentContract += 1;
		return sc.endStep(ActivInfinitev7.steps.startScenarioACS);
	} else {
		return sc.endStep();
	}
}

function startScenarioACS(sc, callback) {
	ActivInfinitev7.scenarios.checkContractACS.start(sc.data).onEnd(function(scCheckContract) {
		sc.data.commentContract = scCheckContract.data.commentContract;
		sc.data.statusContract = scCheckContract.data.statusContract;
		sc.data.isContractWithProductACS = scCheckContract.data.isContractWithProductACS;
		sc.data.isContractTerminated = scCheckContract.data.isContractTerminated;
		sc.data.isAlreadyDone = scCheckContract.data.isAlreadyDone;
		
		if (sc.data.statusContract === ctx.excelHelper.constants.status.Fail || sc.data.config.controlOnly || sc.data.isAlreadyDone) {
			callback();
			return;
		}
		
		if (scCheckContract.data.isContractTerminated) {
			ActivInfinitev7.scenarios.terminatedProduct.start(sc.data).onEnd(function(scTerminatedProduct) {
				sc.data.commentContract = scTerminatedProduct.data.commentContract;
				sc.data.statusContract = scTerminatedProduct.data.statusContract;
				
				if (sc.data.statusContract === ctx.excelHelper.constants.status.Fail) {
					callback();
					return;
				}
				
				startCoverageChangeContract(sc, callback, function() {
					startTerminatedInAdvanceContract(sc, callback, function() {
						sc.data.countCaseProductTerminated += 1;
						callback();
					});
				});
			});
		} else if (scCheckContract.data.isContractWithProductACS) {
			
			ActivInfinitev7.scenarios.terminatedContract.start(sc.data).onEnd(function(scTerminatedContract) {
				sc.data.commentContract = scTerminatedContract.data.commentContract;
				sc.data.statusContract = scTerminatedContract.data.statusContract;
				
				if (sc.data.statusContract === ctx.excelHelper.constants.status.Fail) {
					callback();
					return;
				}			
				startCoverageChangeContract(sc, callback, function() {
					startTerminatedInAdvanceContract(sc, callback, function() {
						sc.data.countCaseContractWithProductACS += 1;
						callback();
					});
				});
			});
		}
	});
}

function startCoverageChangeContract(sc, callbackError, callbackSuccess) {
	ActivInfinitev7.scenarios.coverageChangeContract.start(sc.data).onEnd(function(scCoverageChangeContract) {
		sc.data.commentContract = scCoverageChangeContract.data.commentContract;
		sc.data.statusContract = scCoverageChangeContract.data.statusContract;
		
		if (sc.data.statusContract === ctx.excelHelper.constants.status.Fail) {
			callbackError();
			return;
		}
		
		callbackSuccess();
	});
}

function startTerminatedInAdvanceContract(sc, callbackError, callbackSuccess) {
	ActivInfinitev7.scenarios.terminatedInAdvanceContract.start(sc.data).onEnd(function(scTerminatedInAdvanceContract) {
		sc.data.commentContract = scTerminatedInAdvanceContract.data.commentContract;
		sc.data.statusContract = scTerminatedInAdvanceContract.data.statusContract;
		
		if (sc.data.statusContract === ctx.excelHelper.constants.status.Fail) {
			callbackError();
			return;
		}
		
		callbackSuccess();
	});
}

