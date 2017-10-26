
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
	sc.step(ActivInfinitev7.steps.stPageIdentificationAssures_Enregistrement_Beneficiaire);
	sc.step(ActivInfinitev7.steps.stPageIdentificationAssures_Enregistrement_Beneficiaire_GestionsDesErreurs);
	sc.step(ActivInfinitev7.steps.stPageIdentificationAssures_Erreur_RO_Beneficiaire);
	sc.step(ActivInfinitev7.steps.stFinScenarioAjoutBenef);
}});



/** Description */
ActivInfinitev7.step({ stPageIdentificationAssures_Enregistrement_Beneficiaire: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.assurePrincipal.NUM_SEQ_CT + ' Etape - stVersLaPageIdentificationSouscripteur_Enregistrement_Beneficiaire');
	ActivInfinitev7.pAdhIndivIdentAssures.btValider.click();
	ActivInfinitev7.pAdhIndivIdentAssures.wait(function(ev){
		var countPoll=0;
		ctx.polling({	
			delay: 300,	
			nbMax: 10,		
			test: function(index) { 		
				countPoll++;
				ctx.log('countP :'+countPoll);
				return ActivInfinitev7.pAdhIndivIdentAssures.btSauvegarder.exist();
			},
			done : function() { 
				ActivInfinitev7.pAdhIndivIdentAssures.btSauvegarder.click();
				sc.endStep();
				return ;
			},
			fail: function() { 
				ctx.traceF.errorTxt(' Erreur Serveur lors de la validation de l\'identification du bénéficiaire - Bouton <Enregistrer> introuvable ');
				data.contratCourantAdhesion.notes.commentaireContrat = ' Erreur Serveur lors de la validation de l\'identification du bénéficiaire - Bouton <Enregistrer> introuvable ';
				data.contratCourantAdhesion.notes.statutsContrat = ctx.excelF.constantes.statuts.Echec;
				data.contratCourantAdhesion.statuts.finCreation = true;
				sc.endStep(ActivInfinitev7.steps.stFinScenarioAjoutBenef);
				return;
			}
		});
	});
}});


/** Description */
ActivInfinitev7.step({ stPageIdentificationAssures_Enregistrement_Beneficiaire_GestionsDesErreurs: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.assurePrincipal.NUM_SEQ_CT + ' Etape - stPageIdentificationAssures_Enregistrement_Beneficiaire_GestionsDesErreurs');
	
	ctx.wait(function(ev){
		var Listener1, Listener2;
	
	Listener1 = ActivInfinitev7.pAdhIndivIdentAssures.wait(function(ev){
		ctx.off(Listener2);
		sc.endStep(ActivInfinitev7.steps.stFinScenarioAjoutBenef);
		return;
		
	});
	
	Listener2 = ActivInfinitev7.pAdhIndivIdentAssurPageErreur.wait(function(ev){
		ctx.off(Listener1);
		var countPoll=0;
		ctx.polling({	
			delay: 300,	
			nbMax: 10,		
			test: function(index) { 		
				countPoll++;
				ctx.log('countP :'+countPoll);
				return ActivInfinitev7.pAdhIndivIdentAssurPageErreur.oTitrePopUp.exist();
			},
			done: function() { 
				var msg = ActivInfinitev7.pAdhIndivIdentAssurPageErreur.oTitrePopUp.get().trim();
				ActivInfinitev7.pAdhIndivIdentAssurPageErreur.btClosePopUp.click();
				if(msg.indexOf('RO')!=-1){
				 	// le blocage concerne le RO
					// On modifie la prestation en mode cheque annuel
					sc.endStep(ActivInfinitev7.steps.stPageIdentificationAssures_Erreur_RO_Beneficiaire);
					return ;
				 }
			},
			fail: function() { 
				ctx.traceF.errorTxt(' Erreur lors de la validation de l\'identification de l\'assure');
				data.contratCourantAdhesion.notes.commentaireContrat = ' Erreur lors de la validation de l\'idnetification de l\'assure';
				data.contratCourantAdhesion.notes.statutsContrat = ctx.excelF.constantes.statuts.Echec;
				data.contratCourantAdhesion.statuts.finCreation = true;
				sc.endStep(ActivInfinitev7.steps.stFinScenarioAjoutBenef);
				return;
			}
		});

	});
	},1000);
	
	
	
	
	
}});


/** Description */
ActivInfinitev7.step({ stPageIdentificationAssures_Erreur_RO_Beneficiaire: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.assurePrincipal.NUM_SEQ_CT + ' Etape - stPageIdentificationAssures_Erreur_RO_Beneficiaire');
	// Assure RO
	if(ActivInfinitev7.pAdhIndivIdentAssurPageErreur.oTypAssAyantDroit.getAttribute('checked')!= true ){
		ActivInfinitev7.pAdhIndivIdentAssurPageErreur.oTypAssAyantDroit.click();
			ActivInfinitev7.pAdhIndivIdentAssurPageErreur.oRangAttach.setFocus();
			ActivInfinitev7.pAdhIndivIdentAssurPageErreur.oRangAttach.set('1');
	}
	// Erreur sur le numero RO, On désactive la télétransmission
	ActivInfinitev7.pAdhIndivIdentAssurPageErreur.oTeletrans.click();
	/// Numero RO
	ActivInfinitev7.pAdhIndivIdentAssurPageErreur.oNumRO.setFocus();
	ActivInfinitev7.pAdhIndivIdentAssurPageErreur.oNumRO.set('0000000000000');
	/// Clef RO
	ActivInfinitev7.pAdhIndivIdentAssurPageErreur.oCleRO.setFocus();
	ActivInfinitev7.pAdhIndivIdentAssurPageErreur.oCleRO.set('97');
	
	/// caisse RO 
	ActivInfinitev7.pAdhIndivIdentAssurPageErreur.oCaisseRO.setFocus();
	ActivInfinitev7.pAdhIndivIdentAssurPageErreur.oCaisseRO.set('');
	
	/// Centre RO
	ActivInfinitev7.pAdhIndivIdentAssurPageErreur.oCentreRO.setFocus();
	ActivInfinitev7.pAdhIndivIdentAssurPageErreur.oCentreRO.set('');
	
	//On clique à nouveau sur Enregistrer
	
	ActivInfinitev7.pAdhIndivIdentAssurPageErreur.btValider.click();
	
//	ActivInfinitev7.pAdhIndivIdentAssures.wait(function(ev){
		//On clique à nouveau sur Enregistrer pour tester si tout va bien
	//	ActivInfinitev7.pAdhIndivIdentAssures.btSauvegarder.click();	
		ctx.traceF.errorTxt(' Erreur sur le RO --> Teletransmission Désactivée');
		data.contratCourantAdhesion.notes.commentaireContrat += ' Erreur sur le RO --> Teletransmission Désactivée + numero RO fictif';
		sc.endStep(ActivInfinitev7.steps.stPageIdentificationAssures_Enregistrement_Beneficiaire_GestionsDesErreurs);
		return;
//	});
	
	
	
	
}});



/** Description */
ActivInfinitev7.step({ stFinScenarioAjoutBenef: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.assurePrincipal.NUM_SEQ_CT + ' Etape - stFinScenarioAjoutBenef');
	sc.endStep();
	return;
}});
