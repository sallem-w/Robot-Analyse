ActivInfinitev7.scenario({ scenarioACS: function(ev, sc) {
	var data = sc.data;
	sc.onTimeout(ctx.config.getTimeout(), function(sc, st) { sc.endScenario(); });
	sc.onError(function(sc, st, ex) { sc.endScenario();	});
	sc.setMode(e.scenario.mode.clearIfRunning);
	sc.step(ActivInfinitev7.steps.initScenarioACS);
	sc.step(ActivInfinitev7.steps.startScenarioACS);
	sc.step(ActivInfinitev7.steps.endScenarioACS);
}});

ActivInfinitev7.step({ initScenarioACS : function(ev, sc, st) {
	ctx.trace.writeInfo('Start scenario ' + ctx.config.getCodeScenarioACS());
	if (!ctx.excelFile.initConfig()) {
		sc.endScenario();
	}
	
	sc.data.config = ctx.config.getConfigACS();
	sc.data.configExcel = sc.data.config.excel;

	ctx.trace.writeInfo('STEP - openFile');
	ctx.excelHelper.openFile(ctx.configACS.getPathFileExcelACS());
	
	ctx.trace.writeInfo('STEP - copyFile');
	ctx.excelHelper.copyFile(ctx.configACS.getPathFileOutputExcelACS(), ctx.excelFile.startRowIndex(), ctx.excelFile.getHeaderFile());

	ctx.trace.writeInfo('STEP - readFile');
	sc.data.contracts = ctx.excelFile.readFile();

	sc.data.totalTimeDuration = new Date();
	sc.data.countCaseProcessed = 0;
	sc.data.countCaseSuccessProcessed = 0;
	sc.data.countCaseProductTerminated = 0;
	sc.data.countCaseContractWithProductACS = 0;
	sc.data.indexCurrentContract = 0;
	sc.endStep();
}});
	
ActivInfinitev7.step({ startScenarioACS : function(ev, sc, st) {
	var i = sc.data.indexCurrentContract;
	
	var currentContracts = sc.data.contracts[i];
	var config = ctx.config.getConfigACS();
	var data = { contract: currentContracts, config: config, configExcel: config.excel };
	
	sc.data.countCaseProcessed += 1;
	
	startScenarioACS(sc, data, (function() {
		if (sc.data.statusContract === ctx.excelHelper.constants.status.Success) {
			sc.data.countCaseSuccessProcessed += 1;
		}

		var writeArray = [
			{ columnIndex: sc.data.configExcel.columnIndex.dateProceedContract, value: ctx.date.formatTrace(new Date()) },
			{ columnIndex: sc.data.configExcel.columnIndex.statusContract, value: sc.data.statusContract },
			{ columnIndex: sc.data.configExcel.columnIndex.commentContract, value: sc.data.commentContract }
		];
		
		ctx.excelHelper.write(currentContracts.row, writeArray);
		
		if (i < sc.data.contracts.length - 1) {
			sc.data.indexCurrentContract += 1;
			sc.endStep(ActivInfinitev7.steps.startScenarioACS);
		} else {
			sc.endStep();
		}
	}));
}});

ActivInfinitev7.step({ endScenarioACS : function(ev, sc, st) {
	ctx.trace.writeInfo('STEP - closeFile');
	ctx.excelHelper.closeFile();
	
	ctx.trace.writeInfo('STEP - writeStats');
	var stats = {};
	stats['fileName'] = ctx.configACS.getFileNameOutputExcelACS();
	stats['totalTimeDuration'] = ctx.date.diffToSecond(sc.data.totalTimeDuration, new Date());
	stats['countCaseProcessed'] = sc.data.countCaseProcessed;
	stats['countCaseSuccessProcessed'] = sc.data.countCaseSuccessProcessed;
	stats['countCaseProductTerminated'] = sc.data.countCaseProductTerminated;
	stats['countCaseContractWithProductACS'] = sc.data.countCaseContractWithProductACS;
	ctx.excelFile.writeStats(stats);

	sc.endStep();
}});

function startScenarioACS(sc, data, callback) {
	ActivInfinitev7.scenarios.checkContract.start(data).onEnd(function(scCheckContract) {
		sc.data.commentContract = scCheckContract.data.commentContract;
		sc.data.statusContract = scCheckContract.data.statusContract;
		
		if (sc.data.statusContract === ctx.excelHelper.constants.status.Fail) {
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

