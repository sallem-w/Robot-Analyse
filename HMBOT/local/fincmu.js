ActivInfinitev7.scenario({ terminatedCMU: function(ev, sc) {
	var data = sc.data;
	sc.data.currentScenario = 'Fin CMU';
	sc.onTimeout(ctx.config.getTimeout(), function(sc, st) {
		ctx.trace.writeError(sc.data.contract.individualContract + ' Timeout aborting current scenario');
		sc.endStep(ActivInfinitev7.steps.abort);
	});
	sc.onError(function(sc, st, ex) {
		ctx.trace.writeError(sc.data.contract.individualContract + ex + ' aborting current scenario');
		sc.endStep(ActivInfinitev7.steps.abort);
	});
	sc.setMode(e.scenario.mode.noStartIfRunning);
	sc.step(ActivInfinitev7.steps.stInitTerminatedCMU);
	sc.step(ActivInfinitev7.steps.stSearchTerminatedContractCMU);
	// start step from Terminated product
	sc.step(ActivInfinitev7.steps.stGoToBlockNotes);
	sc.step(ActivInfinitev7.steps.stGoToCalculParam);
	sc.step(ActivInfinitev7.steps.stGoToContributionHistory);
	sc.step(ActivInfinitev7.steps.stGoToContributionVisu);
	sc.step(ActivInfinitev7.steps.stValidationCalcul);
	sc.step(ActivInfinitev7.steps.saveContract); // from saveContract
	sc.step(ActivInfinitev7.steps.closeContractUpdate); // from saveContract
	// end step from Terminated product
	sc.step(ActivInfinitev7.steps.endTerminatedCMU);
	//sc.step(ActivInfinitev7.steps.abort);
}});

ActivInfinitev7.step({ stInitTerminatedCMU: function(ev, sc, st) {
	ctx.trace.writeInfo(data.contratCourantCMU.localData.individualContractNumber + ' - STEP START - stInitTerminatedCMU');
	ActivInfinitev7.pTabDeBord.btFinCMU.click();
	ActivInfinitev7.pRecherContratIndiv.wait(function() {
		return sc.endStep();
	});
}});

ActivInfinitev7.step({ stSearchTerminatedContractCMU: function(ev, sc, st) {
	ctx.trace.writeInfo(data.contratCourantCMU.localData.individualContractNumber + ' - STEP - stSearchTerminatedContractCMU');
	/*var date = ctx.date.formatDDMMYYYY(ctx.date.addDay(new Date(sc.data.contract.particularSituationEndDate), 1));
	ctx.scenarioHelper.searchContract(sc, date, function foundCb() {
		return sc.endStep();
	}, function notFoundCb(currentPage) {
		return ctx.endScenario(sc, currentPage);
	});*/
	
	st.onTimeout(30000,function(sc,st){
			ctx.trace.writeError(data.contratCourantCMU.localData.individualContractNumber + 'TimeOut -  search contract ');
			data.currentContractACS.notes.commentContract = 'Revoir centre: Erreur recherche contrat : Sortie du Scenario car temps de recherche trop long ';
			data.currentContractACS.notes.statusContract= ctx.excelHelper.constants.status.Fail;
			data.currentContractACS.states.exitACSProcess = true;
			ActivInfinitev7.pTabDeBord.start(data.webData.tableauDeBordURL);
			ActivInfinitev7.pTabDeBord.wait(function(ev) {
				sc.endScenario();

			});
		});	
		/****** onerror *******/
		st.onError(function(sc,st,ex) {
			ctx.trace.writeError(data.contratCourantCMU.localData.individualContractNumber + 'OnError - error search contract ');
			data.currentContractACS.notes.commentContract = 'Revoir centre: Erreur recherche contrat : ';
			data.currentContractACS.notes.statusContract= ctx.excelHelper.constants.status.Fail;
			data.currentContractACS.states.exitACSProcess = true;
			ActivInfinitev7.pTabDeBord.start(data.webData.tableauDeBordURL);
			ActivInfinitev7.pTabDeBord.wait(function(ev) {
			sc.endScenario();
			});
		});
	
	var date  = ctx.dateF.ajouterJour(ctx.dateF.dateEnString(/*data.currentContractACS.localData.ACSCertificateEndDate*/), 1,0, 0);
	ActivInfinitev7.pRecherContratIndiv.oContratIndiv.set(data.contratCourantCMU.localData.individualContractNumber);
	ActivInfinitev7.pRecherContratIndiv.oDateDebEffet.set(date);
	ActivInfinitev7.pRecherContratIndiv.btRecherche.click();
	ActivInfinitev7.pContratTrouve.wait(function(ev){
		sc.endStep();
		return;
	});
}});

// step goToVisualizationContribution from Terminated product


/** Description */
ActivInfinitev7.step({ stGoToBlockNotes: function(ev, sc, st) {
	var data = sc.data;
	ActivInfinitev7.pContratTrouve.btSuivant.click();
	ActivInfinitev7.pBlockNotes.wait(function(ev){
		sc.endStep();
		return;
	});
}});

/** Description */
ActivInfinitev7.step({ stGoToCalculParam: function(ev, sc, st) {
	var data = sc.data;
	ActivInfinitev7.pBlockNotes.btSuivant.click();
	ActivInfinitev7.pParamDeCalcul.wait(function(ev){
		sc.endStep();
		return;
	});
}});

/** Description */
ActivInfinitev7.step({ stGoToContributionHistory: function(ev, sc, st) {
	var data = sc.data;
	ActivInfinitev7.pParamDeCalcul.btSuivant.click();
	ActivInfinitev7.pHistoContribution.wait(function(ev){
		sc.endStep();
		return;
	});
}});

/** Description */
ActivInfinitev7.step({ stGoToContributionVisu: function(ev, sc, st) {
	var data = sc.data;
	ActivInfinitev7.pHistoContribution.btSuivant.click();
	ActivInfinitev7.pVisuContribution.wait(function(ev){
		sc.endStep();
		return;
	});
}});
// step validationCalcul from Terminated product

ActivInfinitev7.step({ stValidationCalcul: function(ev, sc, st) {
	ctx.trace.writeInfo(data.contratCourantCMU.localData.individualContractNumber + ' - STEP - validationCalcul');
	// Into CMU, the contribution array is empty (message "aucune donnée") so the validation button doesn't exist
	if (ActivInfinitev7.pVisuContribution.oValidation.exist()) {
		ctx.setValue(ActivInfinitev7.pVisuContribution.oValidation, 'OUI');
	}

	ActivInfinitev7.pVisuContribution.btNext.click();
	ActivInfinitev7.pSauvegardeMaj.wait(function() {
		sc.endStep();
		return;
	});
}});

// step saveContract from saveContract

/** Description */
ActivInfinitev7.step({ stSaveContractCMU: function(ev, sc, st) {
	var data = sc.data;
	ctx.trace.writeInfo(data.contratCourantCMU.localData.individualContractNumber + ' - STEP - saveContract');
	ActivInfinitev7.pSauvegardeMaj.btSauvegarde.click();
	
	data.currentContractACS.notes.commentContract += ' | ' + sc.data.currentScenario + ' effectuée';
	data.currentContractACS.notes.statusContract = ctx.excelHelper.constants.status.Success;
	ActivInfinitev7.pTabDeBord.start(data.webData.dashboardURL);
  ActivInfinitev7.pTabDeBord.wait(function(ev) {
    sc.endStep();
		return;
  });

}});
// step saveContractWaitSearchContractIndiv from saveContract
// step closeContractUpdate from saveContract

ActivInfinitev7.step({ endTerminatedCMU: function(ev, sc, st) {
	ctx.trace.writeInfo(data.contratCourantCMU.localData.individualContractNumber + ' - STEP END - product terminated CMU');
	return sc.endScenario();
}});
