
/** Description */
/*ActivInfinitev7.scenario({ scResiliationContratSuspension: function(ev, sc) {
	
	var data = sc.data;
		sc.onTimeout(120000, function(sc, st) { 
		ctx.traceF.infoTxt(data.contratCourantSuspension.infos['RONumber']  + 'onTimeOut :  On quitte le sous scenario scResiliationContratSuspension');
		data.contratCourantSuspension.notes.commentaireContrat = 'Contrat non Traité en raison d\'un Timeout';
		data.contratCourantSuspension.notes.statusContrat = ctx.excelF.constantes.status.Echec;
		data.contratCourantSuspension.status.finSuspensionProcessus = true;
		ActivInfinitev7.pTabDeBord.start(data.webData.tabDeBordURL); // retour au Tableau de bord
		sc.endScenario(); 
	}); 
		
		sc.onError(function(sc, st, ex) { 
		ctx.traceF.infoTxt(data.contratCourantSuspension.infos['RONumber']  + 'onError :  On quitte le sous scenario scResiliationContratSuspension');
		data.contratCourantSuspension.notes.commentaireContrat = 'Contrat non Traité en raison d\'un onError';
		data.contratCourantSuspension.notes.statusContrat = ctx.excelF.constantes.status.Echec;
		data.contratCourantSuspension.status.finSuspensionProcessus = true;
		ActivInfinitev7.pTabDeBord.start(data.webData.tabDeBordURL); // retour au Tableau de bord
		sc.endScenario();	
	});

	sc.setMode(e.scenario.mode.clearIfRunning);
		// add steps here...
	sc.step(ActivInfinitev7.steps.stInitVerifContratSuspension)
	sc.step(ActivInfinitev7.steps.stRechercheContratSuspension);
	sc.step(ActivInfinitev7.steps.choixProchainStep);
	sc.step(ActivInfinitev7.steps.stRechercheContratSuspensionError);
	sc.step(ActivInfinitev7.steps.stNaviguerVersBlocNotesSuspension);
	sc.step(ActivInfinitev7.steps.stNaviguerVersCalculParamSuspension);
	sc.step(ActivInfinitev7.steps.stNaviguerVersHistoCotisationsSuspension);
	sc.step(ActivInfinitev7.steps.stNaviguerVersVisuCompteCotisantSuspension);
	sc.step(ActivInfinitev7.steps.stValidationCalculSuspension);
	sc.step(ActivInfinitev7.steps.stSauvegardeSuspension);	
	sc.step(ActivInfinitev7.steps.stFinResiliationSuspension);
	}
});*/


ActivInfinitev7.step( { stInitResilContratSuspension : function (ev, sc, st) {
		var data = sc.data;
		ctx.traceF.infoTxt(data.contratCourantSuspension.infos['RONumber'] + ' - Début - scénario scResiliationContratSuspension');
		ctx.traceF.infoTxt(data.contratCourantSuspension.infos['RONumber'] + ' - Etape - stInitScVerifContratSuspension');
	ActivInfinitev7.pTabDeBord.wait(function(){
			ActivInfinitev7.pTabDeBord.btCongeParentSab.click();
	    sc.endStep();
	    return;
	});
	}
});






ActivInfinitev7.step({ stRechercheContratSuspension: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantSuspension.infos['RONumber']  + ' - STEP - stRechercheContratSuspension');

	st.onTimeout(90000,function(sc,st){
		ctx.traceF.errorTxt(data.contratCourantSuspension.infos['RONumber'] + 'TimeOut -  search contract ');
		data.contratCourantSuspension.notes.commentaireContrat  = 'Revoir centre: Erreur recherche contrat : Sortie du Scenario car temps de recherche trop long ';
		data.contratCourantSuspension.notes.statusContrat = ctx.excelF.constantes.status.Echec;
		ActivInfinitev7.pTabDeBord.start(data.webData.tabDeBordURL);
    sc.endScenario();
	});	

	st.onError(function(sc,st,ex) {
		ctx.traceF.errorTxt(data.contratCourantSuspension.infos['RONumber'] + 'OnError - error search contract ');
		data.contratCourantSuspension.notes.commentaireContrat = 'Revoir centre: Erreur recherche contrat : ';
		data.contratCourantSuspension.notes.statusContrat = ctx.excelF.constantes.status.Echec;
		ActivInfinitev7.pTabDeBord.start(data.webData.tabDeBordURL);
    sc.endScenario();
	});

	ActivInfinitev7.pIdentContResilRech.wait(function() {
		ActivInfinitev7.pIdentContResilRech.oContratIndiv.set(data.contratCourantSuspension.noContrat);
		ActivInfinitev7.pIdentContResilRech.oDateDebEffet.set(ctx.dateF.premierJourMois(data.contratCourantSuspension.infos['DateExtraction']));
		ActivInfinitev7.pIdentContResilRech.btRecherche.click();
		sc.endStep();
		return;
	});
	
	
	
	
}});



ActivInfinitev7.step( { choixProchainStep : function (ev, sc, st) {
		var data = sc.data;
		ctx.traceF.infoTxt(data.contratCourantSuspension.infos['RONumber'] + ' - Début - scénario scResiliationContratSuspension');
		ctx.traceF.infoTxt(data.contratCourantSuspension.infos['RONumber'] + ' - Etape - choixProchainStep');
		
	var pIdentContResilRechListener, pIdentContResilRechReListener;
		pIdentContResilRechListener = ActivInfinitev7.pIdentContResilRech.wait(function() {
			ctx.off(pIdentContResilRechReListener);
			sc.endStep(ActivInfinitev7.steps.stGestionBoutonContunuerResiliation);
			return;
		});
		
		pIdentContResilRechReListener = ActivInfinitev7.pIdentContResilRechRe.wait(function() {
			ctx.off(pIdentContResilRechListener);
			sc.endStep();
			return;
		});
	}
});





/** Description */
ActivInfinitev7.step({ stRechercheContratSuspensionError: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantSuspension.infos['RONumber']  + ' - STEP - stRechercheContratSuspensionError');
	st.onTimeout(90000,function(sc,st){
		ctx.traceF.errorTxt(data.contratCourantSuspension.infos['RONumber'] + 'TimeOut -  search contract ');
		data.contratCourantSuspension.notes.commentaireContrat = 'Revoir centre: Timeout lors de la navigation vers le bloc-notes ';
		data.contratCourantSuspension.notes.statusContrat= ctx.excelF.constantes.status.Echec;
		ActivInfinitev7.pTabDeBord.start(data.webData.tabDeBordURL);
    sc.endScenario();
	});	

	st.onError(function(sc,st,ex) {
		ctx.traceF.errorTxt(data.contratCourantSuspension.infos['RONumber']  + 'OnError - error search contract ');
		data.contratCourantSuspension.notes.commentaireContrat = 'Revoir centre: Erreur lors de la navigation vers le bloc-notes';
		data.contratCourantSuspension.notes.statusContrat= ctx.excelF.constantes.status.Echec;
		ActivInfinitev7.pTabDeBord.start(data.webData.tabDeBordURL);
    sc.endScenario();
	});
	
	ActivInfinitev7.pIdentContResilRechRe.wait(function(ev){
		if(ActivInfinitev7.pIdentContResilRech.oDivErreur.exist()){
		 		var msgErreur = ActivInfinitev7.pIdentContResilRech.oDivErreur.get().trim();
				ctx.traceF.errorTxt(data.contratCourantSuspension.infos['RONumber'] + ' - erreur recherche contrat à la résiliation: ' + msgErreur);
				data.contratCourantSuspension.notes.commentaireContrat = 'Revoir centre: Erreur recherche contrat à la résiliation: ' + msgErreur;
				data.contratCourantSuspension.notes.statusContrat = ctx.excelF.constantes.status.Echec;
				sc.endStep(ActivInfinitev7.steps.stFinResiliationSuspension);
				return ;
		 }
		});
		
	
}});



/** Description */
ActivInfinitev7.step({ stGestionBoutonContunuerResiliation: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantSuspension.infos['RONumber']  + ' - STEP - stNaviguerVersBlocNotesSuspension');
	st.onTimeout(90000,function(sc,st){
		ctx.traceF.errorTxt(data.contratCourantSuspension.infos['RONumber'] + 'TimeOut -  search contract ');
		data.contratCourantSuspension.notes.commentaireContrat = 'Revoir centre: Timeout lors de la navigation vers le bloc-notes ';
		data.contratCourantSuspension.notes.statusContrat= ctx.excelF.constantes.status.Echec;
		ActivInfinitev7.pTabDeBord.start(data.webData.tabDeBordURL);
    sc.endScenario();
	});	

	st.onError(function(sc,st,ex) {
		ctx.traceF.errorTxt(data.contratCourantSuspension.infos['RONumber']  + 'OnError - error search contract ');
		data.contratCourantSuspension.notes.commentaireContrat = 'Revoir centre: Erreur lors de la navigation vers le bloc-notes';
		data.contratCourantSuspension.notes.statusContrat= ctx.excelF.constantes.status.Echec;
		ActivInfinitev7.pTabDeBord.start(data.webData.tabDeBordURL);
    sc.endScenario();
	});
	
	ActivInfinitev7.pIdentContResilRech.wait(function(ev){
			ctx.polling({
				delay: 1000,
				nbMax: 100,
				test: function(index) { 
					return ActivInfinitev7.pIdentContResilRech.btBtnContinuer.exist();
				},
				done: function() { 
						ActivInfinitev7.pIdentContResilRech.btBtnContinuer.click();
						sc.endStep();
						return;	
				},
				fail: function() { 
						sc.endStep();
						return;	
				}
			});	
	});
	
}});



/** Description */
ActivInfinitev7.step({ stNaviguerVersBlocNotesSuspension: function(ev, sc, st) {
	var data = sc.data;
	st.onTimeout(90000,function(sc,st){
		ctx.traceF.errorTxt(data.contratCourantSuspension.infos['RONumber'] + 'TimeOut -  search contract ');
		data.contratCourantSuspension.notes.commentaireContrat = 'Revoir centre: Timeout lors de la navigation vers Paramètre de calcul ';
		data.contratCourantSuspension.notes.statusContrat= ctx.excelF.constantes.status.Echec;
		ActivInfinitev7.pTabDeBord.start(data.webData.tabDeBordURL);
    sc.endScenario();
	});	

	st.onError(function(sc,st,ex) {
		ctx.traceF.errorTxt(data.contratCourantSuspension.infos['RONumber'] + 'OnError - error search contract ');
		data.contratCourantSuspension.notes.commentaireContrat = 'Revoir centre: erreur lors de la navigation vers le paramètre de calcul : ';
		data.contratCourantSuspension.notes.statusContrat= ctx.excelF.constantes.status.Echec;
		ActivInfinitev7.pTabDeBord.start(data.webData.tabDeBordURL);
    sc.endScenario();
	});
	ActivInfinitev7.pIdentContResilRech.wait(function(ev){
		ActivInfinitev7.pIdentContResilRech.btSuivant.click();
		sc.endStep();
		return;		
	});
}});





/** Description */
ActivInfinitev7.step({ stNaviguerVersCalculParamSuspension: function(ev, sc, st) {
	var data = sc.data;
	st.onTimeout(90000,function(sc,st){
		ctx.traceF.errorTxt(data.contratCourantSuspension.infos['RONumber'] + 'TimeOut -  search contract ');
		data.contratCourantSuspension.notes.commentaireContrat = 'Revoir centre: Timeout lors de la navigation vers Paramètre de calcul ';
		data.contratCourantSuspension.notes.statusContrat= ctx.excelF.constantes.status.Echec;
		ActivInfinitev7.pTabDeBord.start(data.webData.tabDeBordURL);
    sc.endScenario();
	});	

	st.onError(function(sc,st,ex) {
		ctx.traceF.errorTxt(data.contratCourantSuspension.infos['RONumber'] + 'OnError - error search contract ');
		data.contratCourantSuspension.notes.commentaireContrat = 'Revoir centre: erreur lors de la navigation vers le paramètre de calcul : ';
		data.contratCourantSuspension.notes.statusContrat= ctx.excelF.constantes.status.Echec;
		ActivInfinitev7.pTabDeBord.start(data.webData.tabDeBordURL);
    sc.endScenario();
	});
	ActivInfinitev7.pBlocNotesResil.wait(function(ev){
		ctx.traceF.infoTxt(data.contratCourantSuspension.infos['RONumber'] + ' - STEP - stNaviguerVersCalculParamSuspension');
		ActivInfinitev7.pBlocNotesResil.btSuivant.click();
		sc.endStep();
		return;
	});
}});

/** Description */
ActivInfinitev7.step({ stNaviguerVersHistoCotisationsSuspension: function(ev, sc, st) {
	var data = sc.data;
	st.onTimeout(90000,function(sc,st){
		ctx.traceF.errorTxt(data.contratCourantSuspension.infos['RONumber'] + 'TimeOut -  search contract ');
		data.contratCourantSuspension.notes.commentaireContrat = 'Revoir centre: Timeout lors de la navigation vers l\'Historique des cotisations';
		data.contratCourantSuspension.notes.statusContrat= ctx.excelF.constantes.status.Echec;
		ActivInfinitev7.pTabDeBord.start(data.webData.tabDeBordURL);
    sc.endScenario();
	});	

	st.onError(function(sc,st,ex) {
		ctx.traceF.errorTxt(data.contratCourantSuspension.infos['RONumber'] + 'OnError - error search contract ');
		data.contratCourantSuspension.notes.commentaireContrat = 'Revoir centre: Timeout lors de la navigation vers l\'Historique des cotisations ';
		data.contratCourantSuspension.notes.statusContrat= ctx.excelF.constantes.status.Echec;
		ActivInfinitev7.pTabDeBord.start(data.webData.tabDeBordURL);
    sc.endScenario();
	});
	ActivInfinitev7.pParamDeCalcul.wait(function(ev){
		ctx.traceF.infoTxt(data.contratCourantSuspension.infos['RONumber'] + ' - STEP - stNaviguerVersHistoCotisationsSuspension');
		ActivInfinitev7.pParamDeCalcul.btSuivant.click();
		sc.endStep();
		return;
	});
}});

/** Description */
ActivInfinitev7.step({ stNaviguerVersVisuCompteCotisantSuspension: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantSuspension.infos['RONumber'] + ' - STEP - stNaviguerVersVisuCompteCotisantSuspension');
	st.onTimeout(90000,function(sc,st){
		ctx.traceF.errorTxt(data.contratCourantSuspension.infos['RONumber'] + 'TimeOut -  search contract ');
		data.contratCourantSuspension.notes.commentaireContrat = 'Revoir centre: Timeout lors de la navigation vers Visualisation du compte cotisant';
		data.contratCourantSuspension.notes.statusContrat= ctx.excelF.constantes.status.Echec;
		ActivInfinitev7.pTabDeBord.start(data.webData.tabDeBordURL);
    sc.endScenario();
	});	

	st.onError(function(sc,st,ex) {
		ctx.traceF.errorTxt(data.contratCourantSuspension.infos['RONumber'] + 'OnError - error search contract ');
		data.contratCourantSuspension.notes.commentaireContrat = 'Revoir centre: Erreur lors de la navigation vers Visualisation du compte cotisant';
		data.contratCourantSuspension.notes.statusContrat= ctx.excelF.constantes.status.Echec;
		ActivInfinitev7.pTabDeBord.start(data.webData.tabDeBordURL);
    sc.endScenario();
	});
	ActivInfinitev7.pHistoCotisation.wait(function(ev){
		ActivInfinitev7.pHistoCotisation.btSuivant.click();
		sc.endStep();
		return;
	});
}});

ActivInfinitev7.step({ stValidationCalculSuspension: function(ev, sc, st) {
	var data = sc.data;
	ActivInfinitev7.pVisuCptCotisChgtCouv.wait(function(ev){
		ctx.traceF.infoTxt(data.contratCourantSuspension.infos['RONumber'] + ' - STEP - stValidationCalculSuspension');
		// Into Suspension, the contribution array is empty (message "aucune donnée") so the validation button doesn't exist
		if (ActivInfinitev7.pVisuCptCotisChgtCouv.oValidation.exist()) {
			ActivInfinitev7.pVisuCptCotisChgtCouv.oValidation.set('OUI');
		}
		ActivInfinitev7.pVisuCptCotisChgtCouv.btSuivant.click();
		sc.endStep();
		return;
		
	});
}});

/** Description */
ActivInfinitev7.step({ stSauvegardeSuspension: function(ev, sc, st) {
	ActivInfinitev7.pValidationActeChgtCouv.wait(function() {
		var data = sc.data;;
		ctx.traceF.infoTxt(data.contratCourantSuspension.infos['RONumber'] + ' - STEP - stSauvegardeSuspension');
		ActivInfinitev7.pValidationActeChgtCouv.btSauvegarde.click();
	
		data.contratCourantSuspension.notes.commentaireContrat =  'Suspension effectuée';
		data.contratCourantSuspension.notes.statusContrat = ctx.excelF.constantes.status.Succes;
		
    sc.endStep();
		return;
	});
}});

ActivInfinitev7.step({ stFinResiliationSuspension: function(ev, sc, st) {
	var data = sc.data;
	data.status.lancerVerificationSoldeContrat = true;
	ctx.traceF.infoTxt(data.contratCourantSuspension.infos['RONumber'] + ' - STEP END - stFinResiliationSuspension');
	ActivInfinitev7.pTabDeBord.start(data.webData.tabDeBordURL);
	sc.endStep();
	return ;
}});



