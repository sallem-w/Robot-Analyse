
/** Description */
ActivInfinitev7.scenario({ scScenarioModificationContrat: function(ev, sc) {
	var data = sc.data;
	sc.onTimeout(30000, function(sc, st) { sc.endScenario();	}); // default timeout handler for each step
	sc.onError(function(sc, st, ex) { sc.endScenario();	}); // default error handler
	sc.setMode(e.scenario.mode.clearIfRunning);

	sc.step(ActivInfinitev7.steps.stInitScenarioModificationContrat);
	
}});



/** Description */
ActivInfinitev7.step({ stInitScenarioModificationContrat: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.NUM_SEQ_CT + ' - Etape - stInitScenarioCreation');
	sc.endStep();
	return;
}});
