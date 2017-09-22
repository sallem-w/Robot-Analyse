
/** Description */
ActivInfinitev7.scenario({ scScenarioPrincipalDA: function(ev, sc) {
	ctx.traceF.infoTxt(' Début du scénario principal pour la dispense d\'affiliation');
	var data = sc.data;

	sc.onTimeout(30000, function(sc, st) { sc.endScenario();	}); // default timeout handler for each step
	sc.onError(function(sc, st, ex) { sc.endScenario();	}); // default error handler
	sc.setMode(e.scenario.mode.clearIfRunning);

	
	sc.data.codeDuScenario = ctx.configF.scenario.DA;
	
	sc.step(ActivInfinitev7.steps.stInitScenarioDA);
	sc.step(ActivInfinitev7.steps.initPivot);
	sc.step(ActivInfinitev7.steps.stServerConnexionDA);
	sc.step(ActivInfinitev7.steps.stDebutScenarioPrincipalDA);
	sc.step(ActivInfinitev7.steps.stVersVerif);
	sc.step(ActivInfinitev7.steps.stEcritureDesDonnées);
	sc.step(ActivInfinitev7.steps.stFinScenarioPrincipal);
	
}});

	
	
/** Description */
ActivInfinitev7.step({ stServerConnexionDA : function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Début étape - stServerConnexionDA');
	if (ActivInfinitev7.pServeurWebFerme.exist() && ActivInfinitev7.pServeurWebFerme.oMessageErreur.exist()) {
		ctx.traceF.infoTxt('Le serveur Infinite est fermé');
		ctx.popupF.newPopup('Le serveur Infinite est fermé');
		return ;
	}

	if (!ActivInfinitev7.pConnexion.exist()) {
		ctx.traceF.infoTxt('Open Infinite on connection page');
		ctx.popupF.newPopup('Il faut ouvrir et rentrer ces identifiants dans Infinite');
		return ;
	}

	//sc.data.webData.url = ActivInfinitev7.pConnexion.getInfos().location.href;

		
	//on entre dans Infinite
	ActivInfinitev7.pConnexion.btConnexion.click();
	ActivInfinitev7.pTabDeBord.wait(function(ev) {
	var infos = ActivInfinitev7.pTabDeBord.getInfos();
		
	//sc.data.webData.tabDeBordURL=infos.document.URL;
	//ctx.log('URL de Tableau de bord : ' + sc.data.webData.tabDeBordURL);
	sc.endStep();
	return;
	});
}});
	
	/** Description */
	ActivInfinitev7.step({ stDebutScenarioPrincipalDA: function(ev, sc, st) {
		var data = sc.data;
		var i = data.globalVariables.indexContratCourant;
		
		data.contratCourant = data.contrat[i];
		if(data.contratCourant.type == 'DISPENSE AFFILIATION' )
		{
			ctx.traceF.infoTxt('cas trouvé');
			sc.endStep();
			return;
		}
		else 
		{
			sc.endStep(ActivInfinitev7.steps.stFinScenarioPrincipal);
			return;
		}
		
	}});
	
	
	/** Description */
	ActivInfinitev7.step({ stVersVerif: function(ev, sc, st) {
		ctx.traceF.infoTxt(' STEP - stVersVerif');
		var data = sc.data;
		st.disableTimeout();
		
		var scVerif = ActivInfinitev7.scenarios.scVerifContratDA.start(data).onEnd(function(scDataVerif){
			ctx.traceF.infoTxt(' STEP - dans le sous-scénario de vérification');
			sc.data = scDataVerif.data;
			sc.endStep();
			return;
		});
	}});
	
// test sur data.sortieProcessusDA à faire
	
	/** Description */
	ActivInfinitev7.step({ stEcritureDesDonnées: function(ev, sc, st) {
		var data = sc.data;
		ctx.traceF.infoTxt(' -------------- INFOS CONTRAT ------------------- ');
		
		data.dataFichier.numRO = data.contratCourant.RONumber;
		data.dataFichier.nom = data.contratCourant.Nom
		data.dataFichier.prenom = data.contratCourant.Prenom;
		data.dataFichier.adresse = data.contratCourant.Adresse;
		data.dataFichier.localite = data.contratCourant.Localite;
		
		ctx.traceF.infoTxt( 'le nom du client est :' + data.dataFichier.nomClient );
		ctx.traceF.infoTxt( 'Numéro Sécu :' + data.dataFichier.numRO );
		ctx.traceF.infoTxt( 'Prénom :' + data.dataFichier.prenom );
		ctx.traceF.infoTxt( 'Nom :' + data.dataFichier.nom );
		ctx.traceF.infoTxt( 'Adresse :' + data.dataFichier.adresse + ' ' + data.dataFichier.localite );
	
		var writeArray = _.getObjectValues(data.contratCourant);
		writeArray.push('Numéro de contrat individuel');
		writeArray.push('Date traitement contrat');
		writeArray.push(data.notes.statut);
		writeArray.push(data.notes.commentaire);
		writeArray.push('Remarque');
		writeArray.push('Courrier');
		ctx.excelF.remplirTableau(data.globalVariables.indexContratCourant + 2, writeArray);
		ctx.excelF.sauverFichier();

		sc.endStep();
		return;
	}});
	
	
	/** Description */
	ActivInfinitev7.step({ stFinScenarioPrincipal: function(ev, sc, st) {
		ctx.traceF.infoTxt(' Fin du scénario principal pour la dispense d\'affiliation');
		var data = sc.data;
		
		sc.endScenario();
	}});
	
	
