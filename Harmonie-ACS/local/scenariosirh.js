(function setUpScenarioSIRH() {
	ActivInfinitev7.scenario({ scenarioSIRH: function(ev, sc) {
		sc.data.scenarioCode = ctx.config.SIRH;
		sc.setMode(e.scenario.mode.clearIfRunning);
		sc.step(ActivInfinitev7.steps.initPivot);
		sc.step(ActivInfinitev7.steps.startScenarioSIRH);
		sc.step(ActivInfinitev7.steps.endScenarioSIRH);
	}});

	ActivInfinitev7.step({ startScenarioSIRH : function(ev, sc, st) {
		var i = sc.data.indexCurrentContract;

		sc.data.statusContract = '';
		sc.data.commentContract = '';
		sc.data.noteContract = '';
		sc.data.contract = sc.data.contracts[i];
		sc.data.contract.individualContract = '';
		ctx.mail.init(sc.data.customerName);

		startScenarioSIRH(sc, (function() {
			if (sc.data.statusContract === ctx.excelHelper.constants.status.Success) {
				sc.data.countCaseProcessed += 1;
				
				if (ctx.string.trim(sc.data.noteContract) !== '') {
					sc.data.countCaseProcessedWithWarning += 1;
				}
			}
			
			if (sc.data.statusContract === ctx.excelHelper.constants.status.Fail) {
				sc.data.countCaseFailProcessed += 1;
			}
						
			var mailPath = ctx.mail.createMail(sc.data.contract);

			var contract = _.clone(sc.data.contract);
			contract.birthDate = ctx.date.formatDDMMYYYY(contract.birthDate);
			contract.startDateGuarantee = ctx.date.formatDDMMYYYY(contract.startDateGuarantee);
			contract.startDateContract = ctx.date.formatDDMMYYYY(contract.startDateContract);
			contract.productCode = contract.productCode ? _.join(_.toArray(contract.productCode), ', ') : '';
			
			var writeArray = _.getObjectValues(contract);
			writeArray.push(ctx.date.formatTrace(new Date()));
			writeArray.push(sc.data.statusContract);
			writeArray.push(sc.data.commentContract);
			writeArray.push(sc.data.noteContract);
			writeArray.push(mailPath);

			ctx.excelHelper.writeArray(i + 2, writeArray);
			ctx.excelHelper.saveFile();

			if (i < sc.data.countContracts - 1) {
				sc.data.indexCurrentContract += 1;
				return sc.endStep(ActivInfinitev7.steps.startScenarioSIRH);
			}

			return sc.endStep();
		}));
	}});

	ActivInfinitev7.step({ endScenarioSIRH : function(ev, sc, st) {
		ctx.mail.end();
		ctx.trace.writeInfo('STEP - closeFile');
		ctx.excelHelper.closeFile();

		ctx.trace.writeInfo('STEP - writeStats');
		var stats = {};
		stats['fileName'] = ctx.configFile.getFileNameOutput();
		stats['totalTimeDuration'] = ctx.date.getTimeElapsedSince(ctx.date.diffTime(sc.data.totalTimeDuration, new Date()));
		stats['countCaseFindIntoPivot'] = sc.data.countCaseFindIntoPivot;
		stats['countCaseProcessed'] = sc.data.countCaseProcessed;
		stats['countCaseProcessedWithWarning'] = sc.data.countCaseProcessedWithWarning;
		stats['countCaseFailProcessed'] = sc.data.countCaseFailProcessed;
		ctx.stats.write(stats);

		return sc.endStep();
	}});

	function startScenarioSIRH(sc, callback) {
		ActivInfinitev7.scenarios.checkMembership.start(sc.data).onEnd(function(scCheckMembership) {
			sc.data.contract = scCheckMembership.data.contract;
			sc.data.commentContract = scCheckMembership.data.commentContract;
			sc.data.statusContract = scCheckMembership.data.statusContract;
			sc.data.noteContract = scCheckMembership.data.noteContract;
			if (sc.data.statusContract !== ctx.excelHelper.constants.status.Success) {
				return callback();
			}
			ActivInfinitev7.scenarios.particularSituation2SIRH.start(sc.data).onEnd(function (scParticularSituation) {
				sc.data.commentContract = scParticularSituation.data.commentContract;
				sc.data.statusContract = scParticularSituation.data.statusContract;
				sc.data.noteContract = scParticularSituation.data.noteContract;
				return callback();
			});
		});
	}
})();
