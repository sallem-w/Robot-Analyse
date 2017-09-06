
/** Description */
ActivInfinitev7.scenario( {
	scVerifContrat: function (ev, sc) {
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
		sc.step(ActivInfinitev7.steps.stNavigationAContributionCMU);
		sc.step(ActivInfinitev7.steps.stRecherContratIndivCMU);
		sc.step(ActivInfinitev7.steps.);
		sc.step(ActivInfinitev7.steps.stVerifBenefCMU);
		sc.step(ActivInfinitev7.steps.stProchainBenefCMU);
		//	sc.step(ActivInfinitev7.steps.stNavigVersListProduitCMU);
		//	sc.step(ActivInfinitev7.steps.stVerifEtatProduitCMU);
		//	sc.step(ActivInfinitev7.steps.stProchainProduitCMU);
		//	sc.step(ActivInfinitev7.steps.stContributionCMU);
		//	sc.step(ActivInfinitev7.steps.stVerifContributionCMU);

		sc.step(ActivInfinitev7.steps.stFinScVerifContratCMU);

	}
});


/** Description */
ActivInfinitev7.step( {
	stInitScVerifContratCMU : function (ev, sc, st) {
		var data = sc.data;
		//ctx.trace.writeInfo(sc.data.contract.individualContract + ' - Début - scénario scVerifContrat - ' + sc.data.codeScenario);
		sc.endStep();
		return ;
	}
});


/** Choisir menu consultation */
ActivInfinitev7.step( {
	stNavigationAContributionCMU : function (ev, sc, st) {
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
ActivInfinitev7.step( {
	stRecherContratIndivCMU : function (ev, sc, st) {
		var data = sc.data;
		//ctx.trace
		ActivInfinitev7.pRecherContratIndiv.wait(function () {
			ActivInfinitev7.pRecherContratIndiv.oIndividualContract.set(/*numero de contrat de l'objet data*/);
			ActivInfinitev7.pRecherContratIndiv.btSearch.click();
			sc.endStep();
			return ;
		});
	}
});

/** Choisir menu consultation */
ActivInfinitev7.step( {
	stVerifBenefCMU : function (ev, sc, st) {
		var data = sc.data;
		//ctx.trace
		sc.endStep();
		return ;
	}
});


/** Description */
ActivInfinitev7.step( {
	stProchainBenefCMU : function (ev, sc, st) {
		var data = sc.data;

		sc.endStep();
		return ;
	}
});



/** Description */
ActivInfinitev7.step( {
	stFinScVerifContratCMU : function (ev, sc, st) {
		var data = sc.data;

		sc.endScenario();
		return ;
	}
});

