(function () {
	ActivInfinitev7.scenario({ scenarioSIRHUpdate: function(ev, sc) {
		sc.data.scenarioCode = ctx.config.SIRHUpdate;
		sc.setMode(e.scenario.mode.clearIfRunning);
		sc.step(ActivInfinitev7.steps.initPivot);
		sc.step(ActivInfinitev7.steps.startScenarioSIRHUpdate);
		sc.step(ActivInfinitev7.steps.endScenarioSIRHUpdate);
	}});

	ActivInfinitev7.step({ startScenarioSIRHUpdate : function(ev, sc, st) {
		var i = sc.data.indexCurrentContract;

		sc.data.statusContract = '';
		sc.data.commentContract = '';
		sc.data.noteContract = '';
		sc.data.contract = sc.data.contracts[i];
		sc.data.contract.individualContract = '';

		return startScenarioSIRHUpdate(sc.data.contract.type, sc, (function() {
			var writeArray = _.getObjectValues(sc.data.contract);
			writeArray.push(ctx.date.formatTrace(new Date()));
			writeArray.push(sc.data.statusContract);
			writeArray.push(sc.data.commentContract);
			writeArray.push(sc.data.noteContract);

			ctx.excelHelper.writeArray(i + 2, writeArray);
			ctx.excelHelper.saveFile();

			if (i < sc.data.countContracts - 1) {
				sc.data.indexCurrentContract += 1;
				return sc.endStep(ActivInfinitev7.steps.startScenarioSIRHUpdate);
			}

			return sc.endStep();
		}));
	}});

	ActivInfinitev7.step({ endScenarioSIRHUpdate : function(ev, sc, st) {
		ctx.trace.writeInfo('STEP - closeFile');
		ctx.excelHelper.closeFile();

		ctx.trace.writeInfo('STEP - writeStats');
		var stats = {};
		stats['fileName'] = ctx.configFile.getFileNameOutput();
		stats['totalTimeDuration'] = ctx.date.getTimeElapsedSince(ctx.date.diffTime(sc.data.totalTimeDuration, new Date()));
		stats['countCaseProcessed'] = sc.data.countCaseProcessed;
		ctx.stats.write(stats);
		
		return sc.endStep();
	}});

	var scenarios = {
		MUTATION: 'ActivInfinitev7.steps.SIRH_MUT'
	};

	function startScenarioSIRHUpdate(type, sc, callback) {
		var scenario = scenarios[type];
		if(!scenario) {
			sc.data.statusContract = 'Non traité';
			sc.data.commentContract = 'Type de traitement non géré : ' + type;
		}
		return callback();
	}
})();
