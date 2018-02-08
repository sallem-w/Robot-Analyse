
/** Description */
GRCHarmonieMutuelle.scenario({ scTest: function(ev, sc) {
	var data = sc.data;
	sc.onTimeout(30000, function(sc, st) { sc.endScenario();	}); // default timeout handler for each step
	sc.onError(function(sc, st, ex) { sc.endScenario();	}); // default error handler
	sc.setMode(e.scenario.mode.clearIfRunning);
	// add steps here...
	
	sc.step(GRCHarmonieMutuelle.steps.st1);
	sc.step(GRCHarmonieMutuelle.steps.st2);
	sc.step(GRCHarmonieMutuelle.steps.st3);
}});




/** Description */
GRCHarmonieMutuelle.step({ st1: function(ev, sc, st) {
	var data = sc.data;
	
	
	ctx.siebel.setViewName(GRCHarmonieMutuelle.pMesPolicesDevis, 'SIHM%20All%20Individual%20Policy%20Search%20View');
	
	//ctx.siebel.initApplication(GRCHarmonieMutuelle.pSweview);
	
	ctx.siebel.navigateView(GRCHarmonieMutuelle.pMesPolicesDevis);
	
	sc.endStep();
	return;
}});


/** Description */
GRCHarmonieMutuelle.step({ st2: function(ev, sc, st) {
	var data = sc.data;
	
	GRCHarmonieMutuelle.pMesPolicesDevis.wait(function(ev){
		
		ctx.log('dans la méthode st2')
			sc.endStep();
	return;
	});

}});


/** Description */
GRCHarmonieMutuelle.step({ st3: function(ev, sc, st) {
	var data = sc.data;
	
	sc.endScenario();
	return;
}});
