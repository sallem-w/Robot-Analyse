
/** Description */
/*ActivInfinitev7.scenario({ scResiliationLieeAlaConcurrence: function(ev, sc) {
	var data = sc.data;
	sc.onTimeout(30000, function(sc, st) { sc.endScenario();	}); // default timeout handler for each step
	sc.onError(function(sc, st, ex) { sc.endScenario();	}); // default error handler
	sc.setMode(e.scenario.mode.clearIfRunning);
	// add steps here...
	
}});*/

/*sc.step(ActivInfinitev7.steps.stInitialisationResiliationConcu);
sc.step(ActivInfinitev7.steps.stAllerAlaPageDeResiliation);
sc.step(ActivInfinitev7.steps.stRechercherContratAResilier);*/

/** Description */
ActivInfinitev7.step({ stInitialisationResiliationConcu: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(' STEP --> stInitialisationResiliationConcu');
	sc.endStep();
	return;
}});


/** Description */
ActivInfinitev7.step({ stAllerAlaPageDeResiliation: function(ev, sc, st) {
	var data = sc.data;
	ActivInfinitev7.pTabDeBord.btGroupeObligatoireExterne.click();
	sc.endStep();
	return;
}});


/** Description */
ActivInfinitev7.step({ stRechercherContratAResilier: function(ev, sc, st) {
	var data = sc.data;
	ActivInfinitev7.pResiliationConcu.wait(function(ev){
		var dateEffet = ctx.dateF.premierJourDuMoisCourant(ctx.dateF.formatJJMMAAAA(new Date()));
		ActivInfinitev7.pResiliationConcu.oDateDebutEffet.set(dateEffet);
		ActivInfinitev7.pResiliationConcu.btRecherche.click();
		sc.endStep();
		return;
	});
	
}});

// à ajouter au scénario

/** Description */
ActivInfinitev7.step({ stSaisieDateDemande: function(ev, sc, st) {
	var data = sc.data;
	ActivInfinitev7.pIdentContResilRechRe.wait(function(ev){
		ActivInfinitev7.pIdentContResilRechRe.oDateDemande.set(ctx.dateF.dateSansSeparatorEnFrancais(data.contratCourant.DateExtraction));
		ActivInfinitev7.pIdentContResilRechRe.btSuivant.click();
		sc.endStep();
		return;
	});
}});


/** Description */
ActivInfinitev7.step({ stPageBlocNotesResilConcu: function(ev, sc, st) {
	var data = sc.data;
	ActivInfinitev7.pBlocNotesResil.wait(function(ev){
		ActivInfinitev7.pBlocNotesResil.btSuivant.click();
		sc.endStep();
	  return;
	});
}});


/** Description */
ActivInfinitev7.step({ stPageParamCalculResilConcu: function(ev, sc, st) {
	var data = sc.data;
	ActivInfinitev7.pParamDeCalcul.wait(function(ev){
		ActivInfinitev7.pParamDeCalcul.btSuivant.click();
		sc.endStep();
	  return;
	});
}});

/** Description */
ActivInfinitev7.step({ stPageHistoCotisResilConcu: function(ev, sc, st) {
	var data = sc.data;
	ActivInfinitev7.pHistoCotisation.wait(function(ev){
		ActivInfinitev7.pHistoCotisation.btSuivant.click();
		sc.endStep();
	  return;
	});
}});

/** Description */
ActivInfinitev7.step({ stPageVisuCptResilConcu: function(ev, sc, st) {
	var data = sc.data;
	ActivInfinitev7.pVisuCptCotisChgtCouv.wait(function(ev){
		ActivInfinitev7.pVisuCptCotisChgtCouv.oValidation.set('OUI');
		ActivInfinitev7.pVisuCptCotisChgtCouv.btSuivant();
		sc.endStep();
	  return;
	});
}});

/** Description */
ActivInfinitev7.step({ stPageValidationResilConcu: function(ev, sc, st) {
	var data = sc.data;
	ActivInfinitev7.pValidationActeChgtCouv.wait(function(ev){
		ActivInfinitev7.pValidationActeChgtCouv.btSauvegarde.click();
		sc.endStep();
	  return;
	});
}});









