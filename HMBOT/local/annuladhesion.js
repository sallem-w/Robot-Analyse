
/** Description */
/*ActivInfinitev7.scenario({ scResilConcuDA: function(ev, sc) {
	var data = sc.data;
	sc.onTimeout(30000, function(sc, st) { sc.endScenario();	}); // default timeout handler for each step
	sc.onError(function(sc, st, ex) { sc.endScenario();	}); // default error handler
	sc.setMode(e.scenario.mode.clearIfRunning);
	// add steps here...
	
	sc.step(ActivInfinitev7.steps.stInitialisationAnnulationAdhesion);
	sc.step(ActivInfinitev7.steps.stAllerAlaPageAnnulAdhesion);
	sc.step(ActivInfinitev7.steps.stRechercherContrataAnnuler);
  sc.step(ActivInfinitev7.steps.stSaisieDateDemandeAnnulAdhesion);
	sc.step(ActivInfinitev7.steps.stPageBlocNotesAnnulAdhesion);
	sc.step(ActivInfinitev7.steps.stPageParamCalculAnnulAdhesion);
	sc.step(ActivInfinitev7.steps.stPageHistoCotisAnnulAdhesion);
	sc.step(ActivInfinitev7.steps.stPageVisuCptAnnulAdhesion);
	sc.step(ActivInfinitev7.steps.stPageValidationAnnulAdhesion);
	sc.step(ActivInfinitev7.steps.stRetourAuDebutDAnnulAdhesion);
	sc.step(ActivInfinitev7.steps.stFinAnnulAdhesion);
}});
*/

/** Description */
ActivInfinitev7.step({ stInitialisationAnnulationAdhesion: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(' STEP --> stInitialisationAnnulationAdhesion');
	sc.endStep();
	return;
}});


/** Description */
ActivInfinitev7.step({ stAllerAlaPageAnnulAdhesion: function(ev, sc, st) {
	var data = sc.data;
	ActivInfinitev7.pTabDeBord.btAnnulRenonciation.click();
	sc.endStep();
	return;
}});


/** Description */
ActivInfinitev7.step({ stRechercherContrataAnnuler: function(ev, sc, st) {
	var data = sc.data;
	ActivInfinitev7.pAnnulationAdhesion.wait(function(ev){
		var dateEffet = ctx.dateF.premierJourDuMoisCourant(data.contratCourant.DateExtraction);
		ActivInfinitev7.pAnnulationAdhesion.oDateDebutEffet.set(dateEffet);
		ActivInfinitev7.pAnnulationAdhesion.btRecherche.click();
		sc.endStep();
		return;
	});
	
}});

/** Description */
ActivInfinitev7.step({ stSaisieDateDemandeAnnulAdhesion: function(ev, sc, st) {
	var data = sc.data;
	ActivInfinitev7.pIdentContResilRechRe.wait(function(ev){
		ActivInfinitev7.pIdentContResilRechRe.oDateDemande.set(ctx.dateF.dateSansSeparatorEnFrancais(data.contratCourant.DateExtraction));
		ActivInfinitev7.pIdentContResilRechRe.btSuivant.click();
		sc.endStep();
		return;
	});
}});


/** Description */
ActivInfinitev7.step({ stPageBlocNotesAnnulAdhesion: function(ev, sc, st) {
	var data = sc.data;
	ActivInfinitev7.pBlocNotesResil.wait(function(ev){
		ActivInfinitev7.pBlocNotesResil.btSuivant.click();
		sc.endStep();
	  return;
	});
}});


/** Description */
ActivInfinitev7.step({ stPageParamCalculAnnulAdhesion: function(ev, sc, st) {
	var data = sc.data;
	ActivInfinitev7.pParamDeCalcul.wait(function(ev){
		ActivInfinitev7.pParamDeCalcul.btSuivant.click();
		sc.endStep();
	  return;
	});
}});

/** Description */
ActivInfinitev7.step({ stPageHistoCotisAnnulAdhesion: function(ev, sc, st) {
	var data = sc.data;
	ActivInfinitev7.pHistoCotisation.wait(function(ev){
		ActivInfinitev7.pHistoCotisation.btSuivant.click();
		sc.endStep();
	  return;
	});
}});

/** Description */
ActivInfinitev7.step({ stPageVisuCptAnnulAdhesion: function(ev, sc, st) {
	var data = sc.data;
	ActivInfinitev7.pVisuCptCotisChgtCouv.wait(function(ev){
		ActivInfinitev7.pVisuCptCotisChgtCouv.oValidation.set('OUI');
		ActivInfinitev7.pVisuCptCotisChgtCouv.btSuivant.click();
		sc.endStep();
	  return;
	});
}});

/** Description */
ActivInfinitev7.step({ stPageValidationAnnulAdhesion: function(ev, sc, st) {
	var data = sc.data;
	ActivInfinitev7.pValidationActeChgtCouv.wait(function(ev){
		ActivInfinitev7.pValidationActeChgtCouv.btSauvegarde.click();
		sc.endStep();
	  return;
	});
}});



/** Description */
ActivInfinitev7.step({ stRetourAuDebutDAnnulAdhesion: function(ev, sc, st) {
	var data = sc.data;
	ActivInfinitev7.pAnnulationAdhesion.wait(function(ev){
		ActivInfinitev7.pAnnulationAdhesion.btFermer.click();
		if(ActivInfinitev7.pAnnulationAdhesion.oPopupConfirmation.exist())
		{
			ActivInfinitev7.pAnnulationAdhesion.btNon.click();
		}
		sc.endStep();
	  return;
	});
}});


/** Description */
ActivInfinitev7.step({ stFinAnnulAdhesion: function(ev, sc, st) {
	var data = sc.data;
	ActivInfinitev7.pTabDeBord.wait(function(ev){
		if(data.avertissement){
			data.stats.nombreCasTraitesAvecAvertissement += 1;
		}
		data.stats.nombreCasTraites += 1;
		data.notes.commentaire += " | annulation adhésion effectuée ";
		data.notes.statut = ctx.excelF.constantes.statuts.Succes;
		sc.endStep(ActivInfinitev7.steps.stEcritureDesDonnées);
	  return;
	});
}});