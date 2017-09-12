ActivInfinitev7.scenario({ terminatedCMU: function(ev, sc) {
	var data = sc.data;
	sc.data.currentScenario = 'Fin CMU';
	sc.onTimeout(ctx.config.getTimeout(), function(sc, st) {
		ctx.trace.writeError(data.contratCourantCMU.dataLocale.numeroContratIndiv + ' Timeout aborting current scenario');
		sc.endScenario();
	});
	sc.onError(function(sc, st, ex) {
		ctx.trace.writeError(data.contratCourantCMU.dataLocale.numeroContratIndiv + ex + ' aborting current scenario');
		sc.endScenario();
	});
	sc.setMode(e.scenario.mode.noStartIfRunning);
	sc.step(ActivInfinitev7.steps.stInitTerminatedCMU);
	sc.step(ActivInfinitev7.steps.stSearchTerminatedContractCMU);
	sc.step(ActivInfinitev7.steps.stGoToBlockNotes);
	sc.step(ActivInfinitev7.steps.stGoToCalculParam);
	sc.step(ActivInfinitev7.steps.stGoToContributionHistory);
	sc.step(ActivInfinitev7.steps.stGoToContributionVisu);
	sc.step(ActivInfinitev7.steps.stValidationCalcul);
	sc.step(ActivInfinitev7.steps.stSaveContractCMU); 
	sc.step(ActivInfinitev7.steps.stEndTerminatedCMU);
}});

ActivInfinitev7.step({ stInitTerminatedCMU: function(ev, sc, st) {
	ctx.trace.writeInfo(data.contratCourantCMU.dataLocale.numeroContratIndiv + ' - STEP START - stInitTerminatedCMU');
	ActivInfinitev7.pTabDeBord.btFinCMU.click();
	ActivInfinitev7.pRecherContratIndiv.wait(function() {
		return sc.endStep();
	});
}});

ActivInfinitev7.step({ stSearchTerminatedContractCMU: function(ev, sc, st) {
	ctx.trace.writeInfo(data.contratCourantCMU.dataLocale.numeroContratIndiv + ' - STEP - stSearchTerminatedContractCMU');

	st.onTimeout(30000,function(sc,st){
		ctx.trace.writeError(data.contratCourantCMU.dataLocale.numeroContratIndiv + 'TimeOut -  search contract ');
		data.currentContractACS.notes.commentContract = 'Revoir centre: Erreur recherche contrat : Sortie du Scenario car temps de recherche trop long ';
		data.currentContractACS.notes.statusContract= ctx.excelF.constantes.status.Echec;
		//-->data.currentContractACS.states.exitACSProcess = true;
		ActivInfinitev7.pTabDeBord.start(data.webData.tableauDeBordURL);
		ActivInfinitev7.pTabDeBord.wait(function(ev) {
			sc.endScenario();
		});
	});	

	st.onError(function(sc,st,ex) {
		ctx.trace.writeError(data.contratCourantCMU.dataLocale.numeroContratIndiv + 'OnError - error search contract ');
		data.currentContractACS.notes.commentContract = 'Revoir centre: Erreur recherche contrat : ';
		data.currentContractACS.notes.statusContract= ctx.excelF.constantes.status.Echec;
		//-->data.currentContractACS.states.exitACSProcess = true;
		ActivInfinitev7.pTabDeBord.start(data.webData.tableauDeBordURL);
		ActivInfinitev7.pTabDeBord.wait(function(ev) {
			sc.endScenario();
		});
	});
	
	var date  = ctx.dateF.ajouterJour(ctx.dateF.dateEnString(/*sc.data.contract.particularSituationEndDate*/), 1,0, 0);
	ActivInfinitev7.pRecherContratIndiv.oContratIndiv.set(data.contratCourantCMU.dataLocale.numeroContratIndiv);
	ActivInfinitev7.pRecherContratIndiv.oDateDebEffet.set(date);
	ActivInfinitev7.pRecherContratIndiv.btRecherche.click();
	ActivInfinitev7.pContratTrouve.wait(function(ev){
		sc.endStep();
		return;
	});
}});


/** Description */
ActivInfinitev7.step({ stGoToBlockNotes: function(ev, sc, st) {
	ctx.trace.writeInfo(data.contratCourantCMU.dataLocale.numeroContratIndiv + ' - STEP - stGoToBlockNotes');
	var data = sc.data;
	ActivInfinitev7.pContratTrouve.btSuivant.click();
	ActivInfinitev7.pBlockNotes.wait(function(ev){
		sc.endStep();
		return;
	});
}});

/** Description */
ActivInfinitev7.step({ stGoToCalculParam: function(ev, sc, st) {
	ctx.trace.writeInfo(data.contratCourantCMU.dataLocale.numeroContratIndiv + ' - STEP - stGoToCalculParam');
	var data = sc.data;
	ActivInfinitev7.pBlockNotes.btSuivant.click();
	ActivInfinitev7.pParamDeCalcul.wait(function(ev){
		sc.endStep();
		return;
	});
}});

/** Description */
ActivInfinitev7.step({ stGoToContributionHistory: function(ev, sc, st) {
	ctx.trace.writeInfo(data.contratCourantCMU.dataLocale.numeroContratIndiv + ' - STEP - stGoToContributionHistory');
	var data = sc.data;
	ActivInfinitev7.pParamDeCalcul.btSuivant.click();
	ActivInfinitev7.pHistoContribution.wait(function(ev){
		sc.endStep();
		return;
	});
}});

/** Description */
ActivInfinitev7.step({ stGoToContributionVisu: function(ev, sc, st) {
	ctx.trace.writeInfo(data.contratCourantCMU.dataLocale.numeroContratIndiv + ' - STEP - stGoToContributionVisu');
	var data = sc.data;
	ActivInfinitev7.pHistoContribution.btSuivant.click();
	ActivInfinitev7.pVisuContribution.wait(function(ev){
		sc.endStep();
		return;
	});
}});

ActivInfinitev7.step({ stValidationCalcul: function(ev, sc, st) {
	ctx.trace.writeInfo(data.contratCourantCMU.dataLocale.numeroContratIndiv + ' - STEP - stValidationCalcul');
	// Into CMU, the contribution array is empty (message "aucune donnée") so the validation button doesn't exist
	if (ActivInfinitev7.pVisuContribution.oValidation.exist()) {
		ActivInfinitev7.pVisuContribution.oValidation.set('OUI');
	}

	ActivInfinitev7.pVisuContribution.btNext.click();
	ActivInfinitev7.pSauvegardeMaj.wait(function() {
		sc.endStep();
		return;
	});
}});

/** Description */
ActivInfinitev7.step({ stSaveContractCMU: function(ev, sc, st) {
	var data = sc.data;
	ctx.trace.writeInfo(data.contratCourantCMU.dataLocale.numeroContratIndiv + ' - STEP - stSaveContractCMU');
	ActivInfinitev7.pSauvegardeMaj.btSauvegarde.click();
	
	data.currentContractACS.notes.commentContract += ' | ' + sc.data.currentScenario + ' effectuée';
	data.currentContractACS.notes.statusContract = ctx.excelF.constantes.status.Succes;
	ActivInfinitev7.pTabDeBord.start(data.webData.dashboardURL);
  ActivInfinitev7.pTabDeBord.wait(function(ev) {
    sc.endStep();
		return;
  });

}});

ActivInfinitev7.step({ stEndTerminatedCMU: function(ev, sc, st) {
	ctx.trace.writeInfo(data.contratCourantCMU.dataLocale.numeroContratIndiv + ' - STEP END - stEndTerminatedCMU');
	return sc.endScenario();
}});
