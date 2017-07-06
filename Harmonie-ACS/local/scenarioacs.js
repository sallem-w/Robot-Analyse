ActivInfinitev7.scenario({ scenarioACS: function(ev, sc) {
	sc.data.scenarioCode = ctx.config.ACS;
	sc.onTimeout(ctx.config.getTimeout(), function(sc, st) { sc.endScenario(); });
	sc.onError(function(sc, st, ex) { sc.endScenario();	});
	sc.setMode(e.scenario.mode.clearIfRunning);
	
	sc.step(ActivInfinitev7.steps.initScenario);
	sc.step(ActivInfinitev7.steps.startScenarioACS);
	sc.step(ActivInfinitev7.steps.endScenario);
}});

ActivInfinitev7.step({ initScenario : function(ev, sc, st) {
	ctx.trace.writeInfo('Start scenario ' + sc.data.scenarioCode);
	if (!ctx.excelFile.initConfig(sc.data.scenarioCode)) {
		return sc.endScenario(sc);
	}
	
	sc.data.config = ctx.config.getConfig(sc.data.scenarioCode);
	sc.data.configExcel = sc.data.config.excel;

	ctx.trace.writeInfo('STEP - openFile');
	ctx.excelHelper.openFile(ctx.configFile.getPathFile());
	
	ctx.trace.writeInfo('STEP - copyFile');
	ctx.excelHelper.copyFile(ctx.configFile.getPathFileOutput(), ctx.excelFile.startRowIndex(), ctx.excelFile.getHeaderFile());

	var indexLastRow = ctx.excelFile.getLastIndexRow();
	
	sc.data.countCaseFindIntoExcel = indexLastRow - sc.data.configExcel.startRowIndex + 1;
	sc.data.totalTimeDuration = new Date();
	sc.data.countCaseProcessed = 0;
	sc.data.countCaseSuccessProcessed = 0;
	sc.data.countCaseFailProcessed = 0;
	sc.data.countCaseBackToCenter = 0;
	sc.data.countCaseReadyToRemove = 0;
	sc.data.countCaseProductTerminated = 0;
	sc.data.countCaseContractWithProductACS = 0;
	sc.data.indexCurrentContract = sc.data.configExcel.startRowIndex;
	sc.data.indexLastRow = indexLastRow;
	return sc.endStep();
}});
	
ActivInfinitev7.step({ startScenarioACS : function(ev, sc, st) {
	var i = sc.data.indexCurrentContract;
	
	sc.data.contract = ctx.excelFile.getContractRowACS(i);
	if (!sc.data.contract) {
		loopStepContractACS(sc, i);
		return;
	}
	
	sc.data.countCaseProcessed += 1;
	sc.data.statusContract = '';
	sc.data.commentContract = '';
	
	startScenarioACS(sc, (function() {
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

	return sc.endStep();
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
		
		if (sc.data.statusContract === ctx.excelHelper.constants.status.Fail || sc.data.config.controlOnly) {
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
		}
		else if (scCheckContract.data.isContractWithProductACS) {
			
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

