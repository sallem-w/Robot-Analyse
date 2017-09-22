
ActivInfinitev7.scenario({ scVerifContratDA: function(ev, sc) {
	var data = sc.data;
	sc.onTimeout(30000, function(sc, st) { sc.endScenario();	}); // default timeout handler for each step
	sc.onError(function(sc, st, ex) { sc.endScenario();	}); // default error handler
	sc.setMode(e.scenario.mode.clearIfRunning);
	sc.step(ActivInfinitev7.steps.stInitialisationVerifContractDA);
	sc.step(ActivInfinitev7.steps.stAllerVersPageSynthèse);
	sc.step(ActivInfinitev7.steps.stVerifPageSynthese);
	sc.step(ActivInfinitev7.steps.stSelectionnerInsee);
	sc.step(ActivInfinitev7.steps.stCherchercherBenefViaInsee);
	sc.step(ActivInfinitev7.steps.stPageDeSynthese);
	sc.step(ActivInfinitev7.steps.stFinDeVerification);
	
}});

	/** Description */
	ActivInfinitev7.step({ stInitialisationVerifContractDA: function(ev, sc, st) {
		var data = sc.data;
		ctx.traceF.infoTxt(' STEP --> stInitialisationVerifContractDA');
		sc.endStep();
		return;
	}});

	
	/** Description */
  ActivInfinitev7.step({ stAllerVersPageSynthèse: function(ev, sc, st) {
		var data = sc.data;
		ctx.traceF.infoTxt(' STEP --> stAllerVersPageSynthèse');
		
		ActivInfinitev7.pTabDeBord.btContexteContrat.click();	
	
		sc.endStep();
		return;
	}});
	
	
	/** Description */
	ActivInfinitev7.step({ stVerifPageSynthese: function(ev, sc, st) {
		var data = sc.data;
		
		ActivInfinitev7.pContexteContratRech.wait(function(){
			sc.endStep();
			return;
		});
		
	}});



	/** Description */
	ActivInfinitev7.step({ stSelectionnerInsee: function(ev, sc, st) {
		var data = sc.data;

		ctx.setValue(ActivInfinitev7.pContexteContratRech.oTypeIdentification,'PEIN');
		sc.endStep();
		return;
	}});


	/** Description */
	ActivInfinitev7.step({ stCherchercherBenefViaInsee: function(ev, sc, st) {
		var data = sc.data;
		
		ActivInfinitev7.pContexteContratRech.onIdentificationBenef.set(data.contratCourant.RONumber);
		ActivInfinitev7.pContexteContratRech.btRecherche.click();
		sc.endStep();
		return;
	}});

	
	/** Description */
	ActivInfinitev7.step({ stPageDeSynthese: function(ev, sc, st) {
		var data = sc.data;
		
		ActivInfinitev7.pContexteContratOuvert.wait(function(ev){
			if(!ActivInfinitev7.pContexteContratOuvert.oTitrePage2.exist()){
				data.notes.statut = ctx.excelF.constantes.status.Echec;
				data.notes.commentaire = " Revoir centre : le contrat n\'a pas été trouvé ";
				data.notes.courrier = " Pas de courrier";
				data.sortieProcessusDA = true;
				sc.endStep(ActivInfinitev7.steps.stFinDeVerification);
				return;
			}
			else
			{
				sc.endStep();
				return;
			}
		});
		
	}});

	
	/** Description */
	ActivInfinitev7.step({ stVerifierEtatContrat: function(ev, sc, st) {
		var data = sc.data;
		
		sc.endStep();
		return;
	}});

	
	/** Description */
	ActivInfinitev7.step({ stSelectionnerAdhesion: function(ev, sc, st) {
		ctx.traceF.infoTxt(' STEP - stSelectionnerAdhesion - Permet de sélectionner \'Adhésion\' comme type d\'identification ');
		var data = sc.data;
		
		ctx.setValue(ActivInfinitev7.pContexteContratRech.oTypeIdentification,'ACAI');
		sc.endStep();
		return;
	}});
	
	
	/** Description */
	ActivInfinitev7.step({ stRechercherViaNumeroContratIndiv: function(ev, sc, st) {
		ctx.traceF.infoTxt('STEP - stRechercherViaNumeroContratIndiv');
		var data = sc.data;
		
		ActivInfinitev7.pContexteContratRech.onIdentificationBenef.set(data.notes.numContratIndiv);
		ActivInfinitev7.pContexteContratRech.btRecherche.click();
		sc.endStep();
		return;
	}});
	
	
  
	/** Description */
	ActivInfinitev7.step({ stFinDeVerification: function(ev, sc, st) {
		ctx.traceF.infoTxt('STEP - stFinDeVerification - Fin de la vérification du contrat --> passage à la résiliation');
		var data = sc.data;
		
		sc.endStep();
		return;
	}});


	
	
	
	



	
	

