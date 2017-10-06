
/*ActivInfinitev7.scenario({ scVerifContratDA: function(ev, sc) {
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
	sc.step(ActivInfinitev7.steps.stVerifierEtatContrat);
	sc.step(ActivInfinitev7.steps.stSelectionnerAdhesion);
	sc.step(ActivInfinitev7.steps.stRechercherViaNumeroContratIndiv);
	sc.step(ActivInfinitev7.steps.stVerifierNomAdresse);
	sc.step(ActivInfinitev7.steps.stFinDeVerification);
	
}});*/

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
		ctx.traceF.infoTxt(' STEP --> stVerifPageSynthese');
		var data = sc.data;
		
		ActivInfinitev7.pContexteContratRech.wait(function(){
			sc.endStep();
			return;
		});
		
	}});



	/** Description */
	ActivInfinitev7.step({ stSelectionnerInsee: function(ev, sc, st) {
		ctx.traceF.infoTxt(' STEP --> stSelectionnerInsee');
		var data = sc.data;
		ActivInfinitev7.pContexteContratRech.oTypeIdentification.set('PEIN');
		sc.endStep();
		return;
	}});


	/** Description */
	ActivInfinitev7.step({ stCherchercherBenefViaInsee: function(ev, sc, st) {
		ctx.traceF.infoTxt(' STEP --> stCherchercherBenefViaInsee');
		var data = sc.data;
		
		ActivInfinitev7.pContexteContratRech.onIdentificationBenef.set(data.contratCourant.RONumber);
		ActivInfinitev7.pContexteContratRech.btRecherche.click();
		sc.endStep();
		return;
	}});

	
	/** Description */
	ActivInfinitev7.step({ stPageDeSynthese: function(ev, sc, st) {
		ctx.traceF.infoTxt('STEP --> stPageDeSynthese ');
		var data = sc.data;
		
		ActivInfinitev7.pContexteContratOuvert.wait(function(ev){
			if(!ActivInfinitev7.pContexteContratOuvert.oTitrePage2.exist()){
				data.notes.statut = ctx.excelF.constantes.statuts.Echec;
				data.notes.commentaire = " Revoir centre : le contrat n\'a pas été trouvé ";
				data.notes.numContratIndiv = ' ';
				data.sortieProcessusDA = true;
				data.stats.nombreCasNonTraites += 1;
				sc.endStep(ActivInfinitev7.steps.stFinDeVerification);
				return;
			}
			else
			{
				data.notes.statut = ctx.excelF.constantes.statuts.Succes;
				data.notes.commentaire = " le contrat a été trouvé ";
				sc.endStep();
				return;
			}
		});
		
	}});

	
	/** Description */
	ActivInfinitev7.step({ stVerifierEtatContrat: function(ev, sc, st) {
		ctx.traceF.infoTxt('STEP --> stVerifierEtatContrat - verification des contrats ouverts et récupération du numéro de contrat individuel');
		var data = sc.data;
		var nombreContratOuvert = 0 ;
		
		for (var index in ActivInfinitev7.pContexteContratOuvert.oDateFinEffet.getAll())
		{
			var finEffet = ActivInfinitev7.pContexteContratOuvert.oDateFinEffet.i(index).get();
			if((finEffet === undefined) || (finEffet === ''))
			{
				nombreContratOuvert += 1;
			}
		}
		
		if(nombreContratOuvert === 0){
			data.notes.statut = ctx.excelF.constantes.statuts.Echec;
			data.notes.commentaire = " Revoir centre : Aucun contrat ouvert ";
			data.notes.numContratIndiv = ' ';
			data.sortieProcessusDA = true;
			data.stats.nombreCasNonTraites += 1;
			sc.endStep(ActivInfinitev7.steps.stFinDeVerification);
			return;
		}
		else if(nombreContratOuvert > 1){
			data.notes.statut = ctx.excelF.constantes.statuts.Echec;
			data.notes.commentaire = " Revoir centre : Plusieurs contrats ouverts ";
			data.notes.numContratIndiv = ' ';
			data.sortieProcessusDA = true;
			data.stats.nombreCasNonTraites += 1;
			sc.endStep(ActivInfinitev7.steps.stFinDeVerification);
			return;
		}
		else {
			for (var index in ActivInfinitev7.pContexteContratOuvert.oContratIndiv.getAll()) {
				var endDate = ActivInfinitev7.pContexteContratOuvert.oDateFinEffet.i(index).get();

				if ((endDate === undefined) || (ctx.string.trim(endDate) === '')){
					var numContrat = ActivInfinitev7.pContexteContratOuvert.oNumeroContrat.i(index).get().trim();
					data.dateDebutEffet = ActivInfinitev7.pContexteContratOuvert.oDateDebutEffet.i(index).get().trim();
					var debutNumContrat = numContrat.indexOf("/");
					data.notes.numContratIndiv = numContrat.substring(debutNumContrat+2).trim();
					ctx.traceF.infoTxt(" le numéro de contrat individuel est : " + data.notes.numContratIndiv);
				} 
			}
			sc.endStep();
			return;
		}
		
	}});

	
	/** Description */
	ActivInfinitev7.step({ stSelectionnerAdhesion: function(ev, sc, st) {
		ctx.traceF.infoTxt(' STEP --> stSelectionnerAdhesion - Permet de sélectionner \'Adhésion\' comme type d\'identification ');
		var data = sc.data;
		ActivInfinitev7.pContexteContratOuvert.oTypeIdentification.set('ACAI');
		sc.endStep();
		return;
	}});
	
	
	/** Description */
	ActivInfinitev7.step({ stRechercherViaNumeroContratIndiv: function(ev, sc, st) {
		ctx.traceF.infoTxt('STEP --> stRechercherViaNumeroContratIndiv');
		var data = sc.data;
		
		ActivInfinitev7.pContexteContratOuvert.oNumIdentification.set(data.notes.numContratIndiv);
		ActivInfinitev7.pContexteContratOuvert.btRecherche.click();
		sc.endStep();
		return;
	}});
	
  // wait à mettre ou LOAD.once ou rien ?
	/** Description */
	ActivInfinitev7.step({ stVerifierNomAdresse: function(ev, sc, st) {
		ctx.traceF.infoTxt('STEP --> stVerifierNomAdresse - verification du nom et de l\'adresse')
		var data = sc.data;
		var infosSouscripteur = ActivInfinitev7.pContexteContratOuvert.oInfosSouscripteur.get();
		ctx.traceF.infoTxt( ' INFOS SOUSCRIPTEUR ' + infosSouscripteur);
		
		if( infosSouscripteur.indexOf(data.contratCourant.Nom) === -1 ){
			data.notes.commentaire = " Le nom dans Infinite est différent de celui du fichier ";
			data.avertissement = true;
		}
		
		if( infosSouscripteur.indexOf(data.contratCourant.Adresse) === -1 ){
			data.notes.commentaire = " L\'adresse dans Infinite est différent de celui du fichier ";
			data.avertissement = true;
		}
		
		if( infosSouscripteur.indexOf(data.contratCourant.Localite) === -1 ){
			data.notes.commentaire = " La localité dans Infinite est différent de celui du fichier ";
			data.avertissement = true;
		}
		
		data.notes.commentaire = " Vérification effectuée";
		sc.endStep();
		return;
	}});

  
	/** Description */
	ActivInfinitev7.step({ stSelectionnerEmbranchement: function(ev, sc, st) {
		var data = sc.data;

		if(data.dateDebutEffet == ctx.dateF.dateSansSeparatorEnFrancais(data.contratCourant.DateDispenseOuSuspension)){
			data.annulAdhesion = true;
		}
		else
		{
			data.resilConcu = true;
		}
		sc.endStep();
		return;
	}});
	
	
	
  
	/** Description */
	ActivInfinitev7.step({ stFinDeVerification: function(ev, sc, st) {
		ctx.traceF.infoTxt('STEP --> stFinDeVerification - Fin de la vérification du contrat ');
		var data = sc.data;
		ActivInfinitev7.pTabDeBord.start(data.webData.tabDeBordURL);
		ActivInfinitev7.pTabDeBord.wait(function(ev){
			sc.endStep();
		});
	}});
