setupScenario = setupScenario || {};

setupScenario.CMU = function setUpScenarioCMU() {
	setupScenario.checkContractCMU();
	setupScenario.terminatedCMU();

	ActivInfinitev7.scenario({ scenarioCMU: function(ev, sc) {
		sc.data.scenarioCode = ctx.config.CMU;
		sc.setMode(e.scenario.mode.clearIfRunning);
		sc.step(ActivInfinitev7.steps.initScenario);
		sc.step(ActivInfinitev7.steps.startScenarioCMU);
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
			return;
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

	function startScenarioCMU(sc, callback) {
		ActivInfinitev7.scenarios.checkContractCMU.start(sc.data).onEnd(function(scCheckContract) {
			ctx.trace.writeInfo('checkContractCMU.onEnd');
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
			return sc.endStep(ActivInfinitev7.steps.startScenarioCMU);
		} else {
			return sc.endStep();
		}
	}
}
