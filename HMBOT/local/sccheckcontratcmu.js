
/** Description */
ActivInfinitev7.scenario( {
	scVerifContratCMU: function (ev, sc) {
		var data = sc.data;
		sc.onTimeout(30000, function (sc, st) {
			sc.endScenario();
		}); // default timeout handler for each step
		sc.onError(function (sc, st, ex) {
			sc.endScenario();
		}); // default error handler
		sc.setMode(e.scenario.mode.clearIfRunning);
		// add steps here...

		sc.step(ActivInfinitev7.steps.stInitScVerifContratCMU);
		sc.step(ActivInfinitev7.steps.stNavigationConsultationCMU);
		sc.step(ActivInfinitev7.steps.stRecherContratIndivCMU);
		sc.step(ActivInfinitev7.steps.stNavigationInfoRo);
		sc.step(ActivInfinitev7.steps.stInitVerifBenef);
		sc.step(ActivInfinitev7.steps.stVerifBenefCMU);
		sc.step(ActivInfinitev7.steps.stBenefCMUSuivant);
		//	sc.step(ActivInfinitev7.steps.stNavigationListeProduitCMU);
		//	sc.step(ActivInfinitev7.steps.stVerifEtatProduitCMU);
		//	sc.step(ActivInfinitev7.steps.stProduitCMUSuivant);
		//	sc.step(ActivInfinitev7.steps.stVisuaContributionCMU);
		//	sc.step(ActivInfinitev7.steps.stVerifContributionCMU);
		//  sc.step(ActivInfinitev7.steps.stContratCMUTermine);
		sc.step(ActivInfinitev7.steps.stFinScVerifContratCMU);

	}
});


/** Description */
ActivInfinitev7.step( { stInitScVerifContratCMU : function (ev, sc, st) {
		var data = sc.data;
		//ctx.trace.writeInfo(sc.data.contract.individualContract + ' - Début - scénario scVerifContrat - ' + sc.data.codeScenario);
		sc.endStep();
		return ;
	}
});


/** navigation au ab de bord Choisir menu consultation */
ActivInfinitev7.step( { stNavigationConsultationCMU : function (ev, sc, st) {
		var data = sc.data;
		//ctx.trace
		ActivInfinitev7.pTabDeBord.wait(function () {
			ActivInfinitev7.pTabDeBord.btConsultation.click();
			sc.endStep();
			return ;
		});
	}
});

/** recherche du contrat cmu */
ActivInfinitev7.step( { stRecherContratIndivCMU : function (ev, sc, st) {
		var data = sc.data;
		//ctx.trace

		st.onTimeout(10000, function (sc, st) {
			ctx.traceF.errorTxt(data.currentContractACS.localData.individualContractNumber + 'TimeOut -  search contract ');
			data.currentContractACS.notes.commentContract = 'Revoir centre: Erreur recherche contrat : Contrat non Accessible ';
			data.currentContractACS.notes.statusContract = ctx.excelF.constantes.status.Echec;
			data.currentContractACS.states.exitACSProcess = true;
			ActivInfinitev7.pTabDeBord.start(data.webData.dashboardURL);
			ActivInfinitev7.pTabDeBord.wait(function (ev) {
				sc.endScenario();
			});

		});
		st.onError(function (sc, st, ex) {
			ctx.traceF.errorTxt(data.currentContractACS.localData.individualContractNumber + 'OnError - error search contract ');
			data.currentContractACS.notes.commentContract = 'Revoir centre: Erreur recherche contrat : ';
			data.currentContractACS.notes.statusContract = ctx.excelF.constantes.status.Echec;
			data.currentContractACS.states.exitACSProcess = true;
			ActivInfinitev7.pTabDeBord.start(data.webData.dashboardURL);
			ActivInfinitev7.pTabDeBord.wait(function (ev) {
				sc.endScenario();
			});

		});

		ActivInfinitev7.pRecherContratIndiv.wait(function () {
			ActivInfinitev7.pRecherContratIndiv.oContratIndiv.set(/*numero de contrat de l'objet data*/);
			ActivInfinitev7.pRecherContratIndiv.btRecherche.click();
			sc.endStep();
			return ;
		});
	}
});


/** click sur le bouton info RO */
ActivInfinitev7.step( { stNavigationInfoRo : function (ev, sc, st) {
		var data = sc.data;
		sc.endStep();
		return ;
	}
});


/** Description */
ActivInfinitev7.step( {stInitVerifBenef : function (ev, sc, st) {
		var data = sc.data;

		sc.endStep();
		return ;
	}
});

/** Choisir menu consultation */
ActivInfinitev7.step( {stVerifBenefCMU : function (ev, sc, st) {
		var data = sc.data;
		//ctx.trace
		sc.endStep();
		return ;
	}
});


/** Description */
ActivInfinitev7.step( { stProchainBenefCMU : function (ev, sc, st) {
		var data = sc.data;

		sc.endStep();
		return ;
	}
});



/** Description */
ActivInfinitev7.step( { stFinScVerifContratCMU : function (ev, sc, st) {
		var data = sc.data;

		sc.endScenario();
		return ;
	}
});

