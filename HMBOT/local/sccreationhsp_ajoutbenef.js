
/** Description */
ActivInfinitev7.scenario({ scCreationHSP_AjoutBenef: function(ev, sc) {
	var data = sc.data;
	sc.onTimeout(120000, function(sc, st) { 
		ActivInfinitev7.pTabDeBord.start(data.webData.tabDeBordURL);
		sc.endScenario();	
	}); // default timeout handler for each step
	sc.onError(function(sc, st, ex) { 
		ActivInfinitev7.pTabDeBord.start(data.webData.tabDeBordURL);
		sc.endScenario();	
	}); // default error handler
	sc.setMode(e.scenario.mode.clearIfRunning);

	sc.step(ActivInfinitev7.steps.stRechercheBenefeciaireAdhesionIndiv);
	sc.step(ActivInfinitev7.steps.stResultatRechercheBenefeciaireAdhesionIndiv);
	sc.step(ActivInfinitev7.steps.stSelectionBenefeciaireAdhesionIndiv);
	sc.step(ActivInfinitev7.steps.stCreationBenefeciaireAdhesionIndiv);
	sc.step(ActivInfinitev7.steps.stPageIdentificationAssures_IdentifiantAdherent);
	sc.step(ActivInfinitev7.steps.stPageIdentificationAssures_InformationRO);
	sc.step(ActivInfinitev7.steps.stPageIdentificationAssures_InformationRO_SelectionRegime);
	sc.step(ActivInfinitev7.steps.stPageIdentificationAssures_Validation_Beneficiaire);
	sc.step(ActivInfinitev7.steps.stPageIdentificationAssures_Erreur_RO_Beneficiaire);
}});




/** Description */
ActivInfinitev7.step({ stPageIdentificationAssures_Validation_Beneficiaire: function(ev, sc, st) {
	var data = sc.data;
		ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.assurePrincipal.NUM_SEQ_CT + ' Etape - stVersLaPageIdentificationSouscripteur_Validation_Beneficiaire');
	ActivInfinitev7.pAdhIndivIdentAssures.wait(function(ev){
		var countPoll=0;
		ctx.polling({	
			delay: 300,	
			nbMax: 10,		
			test: function(index) { 		
				countPoll++;
				ctx.log('countP :'+countPoll);
				return ActivInfinitev7.pAdhIndivIdentAssures.oTitrePopUp.exist();
			},
			done: function() { 
				var msg = ActivInfinitev7.pAdhIndivIdentAssures.oTitrePopUp.get().trim();
				ActivInfinitev7.pAdhIndivIdentAssures.btClosePopUp2.click();
				if(msg.indexOf('RO')!=-1){
				 	// le blocage concerne le RO
					// On modifie la prestation en mode cheque annuel
					sc.endStep(ActivInfinitev7.steps.stPageIdentificationAssures_Erreur_RO_Beneficiaire);
					return ;
				 }
			},
			fail: function() { 
				ctx.traceF.errorTxt(' Erreur lors de la validation de l\'idnetification de l\'assure');
				data.contratCourantAdhesion.notes.commentaireContrat = ' Erreur lors de la validation de l\'idnetification de l\'assure';
				data.contratCourantAdhesion.notes.statutsContrat = ctx.excelF.constantes.statuts.Echec;
				data.contratCourantAdhesion.statuts.finCreation = true;
				sc.endStep(ActivInfinitev7.steps.stFinScCreationHSP);
				return;
			}
		});

	});
	
	ActivInfinitev7.pAdhIndivIdentSouscri.wait(function(ev){
		sc.endStep(ActivInfinitev7.steps.stPageIdentificationSouscripteur);
		return;
		
	});
	
	
}});


/** Description */
ActivInfinitev7.step({ stPageIdentificationAssures_Erreur_RO_Beneficiaire: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.assurePrincipal.NUM_SEQ_CT + ' Etape - stPageIdentificationAssures_Erreur_RO');
	// Erreur sur le numero RO, On désactive la télétransmission
	ActivInfinitev7.pAdhIndivIdentAssures.oTeletrans.click();
	/// Numero RO
	ActivInfinitev7.pAdhIndivIdentAssures.oNumRO.setFocus();
	ActivInfinitev7.pAdhIndivIdentAssures.oNumRO.set('0000000000000');
	/// Clef RO
	ActivInfinitev7.pAdhIndivIdentAssures.oCleRO.setFocus();
	ActivInfinitev7.pAdhIndivIdentAssures.oCleRO.set('97');
	
	/// caisse RO 
	ActivInfinitev7.pAdhIndivIdentAssures.oCaisseRO.setFocus();
	ActivInfinitev7.pAdhIndivIdentAssures.oCaisseRO.set('');
	
	/// Centre RO
	ActivInfinitev7.pAdhIndivIdentAssures.oCentreRO.setFocus();
	ActivInfinitev7.pAdhIndivIdentAssures.oCentreRO.set('');
	ctx.traceF.errorTxt(' Erreur sur le RO --> Teletransmission Désactivée');
	data.contratCourantAdhesion.notes.commentaireContrat += ' Erreur sur le RO --> Teletransmission Désactivée + numero RO fictif';
	sc.endStep(ActivInfinitev7.steps.stPageIdentificationAssures_Validation);
	return;
}});