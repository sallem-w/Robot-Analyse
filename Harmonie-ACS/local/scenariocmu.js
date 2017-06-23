ActivInfinitev7.scenario({ scenarioCMU: function(ev, sc) {
	sc.data.scenarioCode = ctx.config.CMU;
	sc.onTimeout(ctx.config.getTimeout(), function(sc, st) { sc.endScenario(); });
	sc.onError(function(sc, st, ex) { sc.endScenario();	});
	sc.setMode(e.scenario.mode.clearIfRunning);
	sc.step(ActivInfinitev7.steps.initScenario);
	sc.step(ActivInfinitev7.steps.startScenarioCMU);
	sc.step(ActivInfinitev7.steps.endScenario);
}});
	
ActivInfinitev7.step({ startScenarioCMU : function(ev, sc, st) {
	sc.data.statusContract = '';
	sc.data.commentContract = '';
	sc.data.contract = undefined;
	sc.data.beneficiaries = undefined;
	var i = sc.data.indexCurrentContract;
	sc.data.toTerminated = false;
	sc.data.beneficiaries = ctx.excelFile.getContractRowCMU(i);
	if (!sc.data.beneficiaries) {
		loopStepContractCMU(sc, i);
	}
	
	sc.data.contract = ctx.scenarioHelper.searchInsuredFromType(ctx.scenarioHelper.constantes.ASSPRI, sc.data.beneficiaries);
	if (!sc.data.contract) {
		ctx.trace.writeError(sc.data.beneficiaries[0].individualContract + ' - ASSPRI is not found');
		
		var writeArray = [
			{ columnIndex: sc.data.configExcel.columnIndex.dateProceedContract, value: ctx.date.formatTrace(new Date()) },
			{ columnIndex: sc.data.configExcel.columnIndex.statusContract, value: ctx.excelHelper.constants.status.Fail},
			{ columnIndex: sc.data.configExcel.columnIndex.commentContract, value: 'l\'ASSPRI n\'a pas été trouvé dans le fichier excel' }
		];
		
		ctx.excelHelper.writeArrayObject(i, writeArray);
		ctx.excelHelper.saveFile();
		
		loopStepContractCMU(sc, i);
		return;
	}
	
	startScenarioCMU(sc, (function() {
		
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
		
		loopStepContractCMU(sc, i);
	}));
}});

function startScenarioCMU(sc, callback) {
	ActivInfinitev7.scenarios.checkContractCMU.start(sc.data).onEnd(function(scCheckContract) {
		sc.data.commentContract = scCheckContract.data.commentContract;
		sc.data.statusContract = scCheckContract.data.statusContract;
		
		if (sc.data.statusContract === ctx.excelHelper.constants.status.Fail || sc.data.config.controlOnly || !sc.data.toTerminated) {
			// If to terminated is true, it is success
			if (sc.data.toTerminated) {
				sc.data.countCaseSuccessProcessed += 1;
			}
			callback();
			return;
		}
		
		ActivInfinitev7.scenarios.terminatedCMU.start(sc.data).onEnd(function(scTerminatedCMU) {
				sc.data.commentContract = scTerminatedCMU.data.commentContract;
				sc.data.statusContract = scTerminatedCMU.data.statusContract;

				if (sc.data.statusContract === ctx.excelHelper.constants.status.Fail) {
					callback();
					return;
				}
				
				sc.data.countCaseSuccessProcessed += 1;
				callback();
		});
	});
}

function loopStepContractCMU(sc, i) {
	if (i < sc.data.indexLastRow) {
		// We add the number of line occuped by the current contract
		sc.data.indexCurrentContract += sc.data.beneficiaries.length;
		sc.endStep(ActivInfinitev7.steps.startScenarioCMU);
	} else {
		sc.endStep();
	}
}
