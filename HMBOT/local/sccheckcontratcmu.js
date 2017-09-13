
/** Description */
ActivInfinitev7.scenario( { scVerifContratCMU: function (ev, sc) {
	var data = sc.data;
	sc.onTimeout(40000, function(sc, st) { 
		ctx.traceF.infoTxt(data.contratCourantCMU.dataLocale.numeroContratIndiv  + 'onTimeOut :  On quitte le sous scenario scVerifContratCMU');
		data.contratCourantCMU.notes.commentaireContrat = 'Contrat non Traité en raison d\'un Timeout';
		data.contratCourantCMU.notes.statusContrat = ctx.excelF.constantes.status.Echec;
		ActivInfinitev7.pTabDeBord.start(data.webData.tabDeBordURL); // retour au Tableau de bord
		sc.endScenario(); 
	}); 
	
	sc.onError(function(sc, st, ex) { 
		ctx.traceF.infoTxt(data.contratCourantCMU.dataLocale.numeroContratIndiv  + 'onError :  On quitte le sous scenario scVerifContratCMU');
		data.contratCourantCMU.notes.commentaireContrat = 'Contrat non Traité en raison d\'un onError';
		data.contratCourantCMU.notes.statusContrat = ctx.excelF.constantes.status.Echec;
		ActivInfinitev7.pTabDeBord.start(data.webData.tabDeBordURL); // retour au Tableau de bord
		sc.endScenario();	
		}); 
		sc.setMode(e.scenario.mode.clearIfRunning);

		sc.step(ActivInfinitev7.steps.stInitScVerifContratCMU);
		sc.step(ActivInfinitev7.steps.stNavigationConsultationCMU);
//		sc.step(ActivInfinitev7.steps.stRecherContratIndivCMU);
//		sc.step(ActivInfinitev7.steps.stNavigationInfoRo);
//		sc.step(ActivInfinitev7.steps.stInitAffichageInforRO);
//		sc.step(ActivInfinitev7.steps.stInitVerifBenef);
//		sc.step(ActivInfinitev7.steps.stVerifBenefCMU);
//		sc.step(ActivInfinitev7.steps.stBenefCMUSuivant);
//		sc.step(ActivInfinitev7.steps.stNavigationListeProduitCMU);
//		sc.step(ActivInfinitev7.steps.stListeProduitCMU);
//		sc.step(ActivInfinitev7.steps.stInitVerifEtatProduitCMU);
//		sc.step(ActivInfinitev7.steps.stVerifEtatProduitCMU);
//		sc.step(ActivInfinitev7.steps.stProduitCMUSuivant);
//		sc.step(ActivInfinitev7.steps.stInitContributionCMU);
//		sc.step(ActivInfinitev7.steps.stVerifContributionCMU); //du scénario 	ACS
//		//  sc.step(ActivInfinitev7.steps.stContratCMUTermine);
//		sc.step(ActivInfinitev7.steps.stContratCMUtermine); // stToTerminated
		sc.step(ActivInfinitev7.steps.stFinScVerifContratCMU);

	}
});


/** Description */
ActivInfinitev7.step( { stInitScVerifContratCMU : function (ev, sc, st) {
		var data = sc.data;
		ctx.traceF.infoTxt(data.contratCourantCMU.dataLocale.numeroContratIndiv + ' - Début - scénario scVerifContrat');
		ctx.traceF.infoTxt(data.contratCourantCMU.dataLocale.numeroContratIndiv + ' - Etape - stInitScVerifContratCMU');
		sc.endStep();
		return ;
	}
});

/** navigation au ab de bord Choisir menu consultation */
ActivInfinitev7.step( { stNavigationConsultationCMU : function (ev, sc, st) {
		var data = sc.data;
		ctx.traceF.infoTxt(data.contratCourantCMU.dataLocale.numeroContratIndiv + ' Etape - stNavigationConsultationCMU');
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
	ctx.traceF.infoTxt(data.contratCourantCMU.dataLocale.numeroContratIndiv + ' Etape stRecherContratIndivCMU ');
	st.onTimeout(10000, function (sc, st) {
		ctx.traceF.errorTxt(data.contratCourantCMU.dataLocale.numeroContratIndiv + 'TimeOut - Etape stRecherContratIndivCMU ');
		data.contratCourantCMU.notes.commentaireContrat = 'Revoir centre: Erreur recherche contrat : Contrat non Accessible ';
		data.contratCourantCMU.notes.statusContrat = ctx.excelF.constantes.status.Echec;
		ActivInfinitev7.pTabDeBord.start(data.webData.tabDeBordURL);
		sc.endScenario();
	});
	st.onError(function (sc, st, ex) {
		ctx.traceF.errorTxt(data.contratCourantCMU.dataLocale.numeroContratIndiv + 'OnError - Etape stRecherContratIndivCMU ');
		data.contratCourantCMU.notes.commentaireContrat = 'Revoir centre: Erreur recherche contrat : ';
		data.contratCourantCMU.notes.statusContrat = ctx.excelF.constantes.status.Echec;
		ActivInfinitev7.pTabDeBord.start(data.webData.tabDeBordURL);
		sc.endScenario();
	});
	
	ActivInfinitev7.pRecherContratIndiv.wait(function () {
		ActivInfinitev7.pRecherContratIndiv.oContratIndiv.set(data.contratCourantCMU.dataLocale.numeroContratIndiv);
		ActivInfinitev7.pRecherContratIndiv.btRecherche.click();
		sc.endStep();
		return ;
	});
	
	// Ecoute sur la page attendue
	var contratTrouveListener, contratNonTrouveListener;
	contratNonTrouveListener = ActivInfinitev7.pContratIndivNonTrouv.wait(function () {
		var msgErreur = ActivInfinitev7.pContratIndivNonTrouv.titreErreur.get().trim();
		ctx.traceF.errorTxt(data.contratCourantCMU.dataLocale.numeroContratIndiv + ' - erreur recherche contrat : ' + msgErreur);
		data.contratCourantCMU.notes.commentaireContrat = 'Revoir centre: Erreur recherche contrat : ' + msgErreur;
		data.contratCourantCMU.notes.statusContrat = ctx.excelF.constantes.status.Echec;
		ctx.off(contratTrouveListener);
		ActivInfinitev7.pTabDeBord.start(data.webData.tabDeBordURL);
		sc.endScenario();
	});
	contratTrouveListener = ActivInfinitev7.pContratTrouve.wait(function () {
		ctx.traceF.infoTxt(data.contratCourantCMU.dataLocale.numeroContratIndiv + ' - contract trouve');
		data.contratCourantCMU.notes.statusContrat = // ctx.excelF.constantes.status.Succes;
		ctx.off(contratNonTrouveListener);
		sc.endStep();
		return ;
	});
	
}});



/** Description */
ActivInfinitev7.step( { stFinScVerifContratCMU : function (ev, sc, st) {
		var data = sc.data;

    ctx.traceF.infoTxt(data.contratCourantCMU.dataLocale.numeroContratIndiv + ' - Début - Etape stFinScVerifContratCMU');
		ctx.traceF.infoTxt(data.contratCourantCMU.dataLocale.numeroContratIndiv + ' - Fin recherce contrat ');
		//retour au dashboard
    ActivInfinitev7.pTabDeBord.start(data.webData.tabDeBordURL);
		sc.endScenario();
		return ;
	}
});

