
/** Description */
ActivInfinitev7.scenario({ SuspensionScenarioPrincipal: function(ev, sc) {
	var data = sc.data;
	sc.onTimeout(30000, function(sc, st) { sc.endScenario();	}); // default timeout handler for each step
	sc.onError(function(sc, st, ex) { sc.endScenario();	}); // default error handler
	sc.setMode(e.scenario.mode.clearIfRunning);
	// add steps here...
	ctx.log('Etapes du scénario');
	sc.step(ActivInfinitev7.steps.stInitScenarioSuspension);
	sc.step(ActivInfinitev7.steps.initPivot);
}});





/** Description */
ActivInfinitev7.step({ stInitScenarioSuspension: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('stInitScenarioSuspension');
	data.codeDuScenario =ctx.configF.scenario.Suspension;
	sc.endStep();
	return;
}});



