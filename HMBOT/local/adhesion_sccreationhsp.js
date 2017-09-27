
/** Description */
ActivInfinitev7.scenario({ scCreationHSP: function(ev, sc) {
	var data = sc.data;
	sc.onTimeout(30000, function(sc, st) { sc.endScenario();	}); // default timeout handler for each step
	sc.onError(function(sc, st, ex) { sc.endScenario();	}); // default error handler
	sc.setMode(e.scenario.mode.clearIfRunning);
	// add steps here...
	sc.step(ActivInfinitev7.steps.stInitCreationHSP);
	sc.step(ActivInfinitev7.steps.stVersAdhesionIndividuelle);
	sc.step(ActivInfinitev7.steps.stOuvertureDossierHSP);
	sc.step(ActivInfinitev7.steps.stFinScCreationHSP);
	
}});



/** Description */
ActivInfinitev7.step({ stInitCreationHSP: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.contratAdhesionAttributs.NUM_SEQ_CT + ' - Etape - stInitCreationHSP');
	sc.endStep();
	return;
}});


/** Description */
ActivInfinitev7.step({ stVersAdhesionIndividuelle: function(ev, sc, st) {
	var data = sc.data;
	ActivInfinitev7.pTabDeBord.wait(function(ev) {
		ActivInfinitev7.pTabDeBord.btAdhesionIndiv.click();
		sc.endStep();
		return;
	})
}});


/** Description */
ActivInfinitev7.step({ stOuvertureDossierHSP: function(ev, sc, st) {
	var data = sc.data;
	ActivInfinitev7.pAdhesions.wait(function(ev) {
		ActivInfinitev7.pAdhesions.oEntiteRattachement.setFocus();
		ActivInfinitev7.pAdhesions.oEntiteRattachement.keyStroke('P - HA'); // on insere 'P' pour faire apparaitre la boite cliquable
//		ActivInfinitev7.pAdhesions.oEntiteRattachement.set(ctx.keyStroke('P - HA',1500));
		ActivInfinitev7.pAdhesions.oEntiteRattachement.setFocus();
//		ctx.wait(function(ev){
			ActivInfinitev7.pAdhesions.oSelectPHarmonie.click(); // peut etre faire un polling pour plus de robustesse
//		},1000);
		var dd=data.contratCourantAdhesion.dataLocale.contratAdhesionAttributs.DATE_DEBUT_EFFET;
		var dateD = ctx.dateF.formatDateGRC(dd); 
		ctx.log('dateD'+dateD);
		ActivInfinitev7.pAdhesions.oDateDebutEffet.set(dateD);
		ActivInfinitev7.pAdhesions.btRecherche.click();
		sc.endStep();
		return;
	});
}});


/** Description */
ActivInfinitev7.step({ stFinScCreationHSP: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.contratAdhesionAttributs.NUM_SEQ_CT + ' Etape - stFinScCreationHSP');
	//retour au dashboard
  ActivInfinitev7.pTabDeBord.start(data.webData.tabDeBordURL);
	sc.endStep();
	return;
}});


