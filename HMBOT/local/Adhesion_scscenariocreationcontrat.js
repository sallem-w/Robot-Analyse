
/** Description */
ActivInfinitev7.scenario({ scScenarioCreationContrat: function(ev, sc) {
	var data = sc.data;
	sc.onTimeout(30000, function(sc, st) { sc.endScenario();	}); // default timeout handler for each step
	sc.onError(function(sc, st, ex) { sc.endScenario();	}); // default error handler
	sc.setMode(e.scenario.mode.clearIfRunning);

	sc.step(ActivInfinitev7.steps.stInitScenarioCreationContrat);
	sc.step(ActivInfinitev7.steps.stScCreationHSP);
	sc.step(ActivInfinitev7.steps.stFinScCreationContrat);
	
}});



/** Description */
ActivInfinitev7.step({ stInitScenarioCreationContrat: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.contratTemp.NUM_SEQ_CT + ' - Etape - stInitScenarioCreation');
	var gamme = data.contratCourantAdhesion.dataLocale.contratTemp.GAMME;
	var tabProd=ctx.configF.gammeProduit;
	var ncase = 0;
	/// on recherche dans la table ( indexOf ne fonctionnant pas)
	for( var nn in tabProd){
		if(gamme == tabProd[nn]){
			ncase=nn;
		}
	}

	ctx.log('ncase : '+ncase);
	switch (ncase) {
		case '0':
		{
			ctx.log('Aucun Produit');
			sc.endStep(ActivInfinitev7.steps.stFinScCreationContrat);
			return;
			break;
		}
		case '1':
		{
			ctx.log('Gamme de produit Harmonie Santé Particulier');
			ctx.traceF.infoTxt('Le produit'+ gamme +' existe dans la gamme de produit -> traitement');
			sc.endStep(ActivInfinitev7.steps.stScCreationHSP);
			return
			break;
		}
		default:
		{
			ctx.traceF.infoTxt('Le produit'+ gamme +' n\'entre pas dans la gamme de produit référencée');
			sc.endStep(ActivInfinitev7.steps.stFinScCreationContrat);
			return;
			break;
		}
	}
	
//	sc.endStep();
//	return;
}});






/** step qui lance le sous scénario de creation Adhesion */
ActivInfinitev7.step({ stScCreationHSP : function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape - stScCreationHSP - Lancement du sous-scenario de creation de contrat de la gamme Harmonie Santé Particulier: scCreationHSP');
	// on desactive le TimeOut principal afin que le timeOut execute soit celui du sous-scenario
	st.disableTimeout();	
	var HSP = ActivInfinitev7.scenarios.scCreationHSP.start(data).onEnd(function(scHSP){
		sc.data=scHSP.data;
		ctx.traceF.infoTxt(' Fin du sous-scenario - scCreationHSP');
		sc.endStep();
	});
}});



/** Description */
ActivInfinitev7.step({ stFinScCreationContrat: function(ev, sc, st) {
	var data = sc.data;
	
	sc.endStep();
	return;
}});


