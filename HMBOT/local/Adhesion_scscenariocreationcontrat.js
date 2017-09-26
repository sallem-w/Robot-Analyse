
/** Description */
ActivInfinitev7.scenario({ scScenarioCreationContrat: function(ev, sc) {
	var data = sc.data;
	sc.onTimeout(30000, function(sc, st) { sc.endScenario();	}); // default timeout handler for each step
	sc.onError(function(sc, st, ex) { sc.endScenario();	}); // default error handler
	sc.setMode(e.scenario.mode.clearIfRunning);

	sc.step(ActivInfinitev7.steps.stInitScenarioCreationContrat);
	
}});



/** Description */
ActivInfinitev7.step({ stInitScenarioCreationContrat: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.NUM_SEQ_CT + ' - Etape - stInitScenarioCreation');
	var gamme = data.contratCourantAdhesion.dataLocale.GAMME;
	var tabProd=ctx.configF.gammeProduit;
//	var ncase= tabProd.indexOf(gamme);
	var ncase= tabProd.indexOf("Harmonie Santé Particuliers");
	ctx.log('ncase : '+ncase);
	switch(ncase) {
    case 0:
        ctx.log('Aucun Produit');
        break;
    case 1:
        ctx.log('Gamme de produit Harmonie Santé Particulier');
				ctx.traceF.infoTxt('Le produit'+ gamme +' existe dans la gamme de produit -> traitement');
        break;
    default:
        ctx.traceF.infoTxt('Le produit'+ gamme +' n\'entre pas dans la gamme de produit référencée');
}
	
	sc.endStep();
	return;
}});
