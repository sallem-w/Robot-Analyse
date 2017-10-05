
/** Description */
ActivInfinitev7.scenario( { scAdhesionPrincipal: function (ev, sc) {
	var data = sc.data;
	sc.onTimeout(30000, function (sc, st) {
		sc.endScenario();
	}); // default timeout handler for each step
	sc.onError(function (sc, st, ex) {
		sc.endScenario();
	}); // default error handler
	sc.setMode(e.scenario.mode.clearIfRunning);
		
	sc.step(ActivInfinitev7.steps.stInitScenarioAdhesion);
//	sc.step(ActivInfinitev7.steps.stServerConnexionAdhesion);
	sc.step(ActivInfinitev7.steps.stSauvegardeURLTableauDeBord);
	sc.step(ActivInfinitev7.steps.stDebutBoucleContratAdhesion);
	sc.step(ActivInfinitev7.steps.stImporterDonneesExcelAdhesion);
	sc.step(ActivInfinitev7.steps.stSelectionScenarioAdhesion);
	sc.step(ActivInfinitev7.steps.stScenarioCreationContrat);
	sc.step(ActivInfinitev7.steps.stScenarioModificationContrat);
	sc.step(ActivInfinitev7.steps.stMiseAjourVarGloblalesAdhesion);
	sc.step(ActivInfinitev7.steps.stInsertDonneesAdhesionExcel);
	sc.step(ActivInfinitev7.steps.stContratAdhesionSuivant);
	sc.step(ActivInfinitev7.steps.stFinScenarioAdhesion);

	}
});


/** Description */
ActivInfinitev7.step({ stInitScenarioAdhesion : function(ev, sc, st) {
	var data = sc.data;
	ctx.dataF.initialisationScenarioAdhesion(data,ctx.configF.scenario.Adhesion);//ctx.dataF.initialisationScenario(ctx.configF.scenario.CMU);
	ctx.traceF.infoTxt('Début étape - stInitScenarioAdhesion');
	sc.endStep();
	return;
}});


/** Description */
ActivInfinitev7.step({ stServerConnexionAdhesion : function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Début étape - stServerConnexionAdhesion');
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
	ctx.log(" Test URL : "+ data.webData.url);
	data.webData.url = ActivInfinitev7.pConnexion.getInfos().location.href;
	data.webData.identifiant = ActivInfinitev7.pConnexion.oIdentifiant.get();
	data.webData.motDePasse = ActivInfinitev7.pConnexion.oPwd.get();
		
		//on entre dans Infinite
		ActivInfinitev7.pConnexion.btConnexion.click();
		sc.endStep();
		return;
	
}});



/** Description */
ActivInfinitev7.step({ stSauvegardeURLTableauDeBord: function(ev, sc, st) {
	var data = sc.data;
		ActivInfinitev7.pTabDeBord.wait(function(ev) {
		var infos = ActivInfinitev7.pTabDeBord.getInfos();
		data.webData.tabDeBordURL=infos.document.URL;
		ctx.log('URL de Tableau de bord : ' + data.webData.tabDeBordURL);
		sc.endStep();
		return;
		});
}});


/** Description */
ActivInfinitev7.step({ stDebutBoucleContratAdhesion: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Début étape - stDebutBoucleContratAdhesion');
	ctx.traceF.infoTxt('-->stDebutBoucleContratAdhesion Ligne Excel: '+ data.varGlobales.ligneCourante);
	sc.endStep();
	return;
}});






/** ce step permet de vérifier dans le dictionnaire l'existance de l'assuré principal, sil existe on lance le sous scénario scVerifContratAdhesion sinon on exécute le sous sc finAdhesion  */
ActivInfinitev7.step({ stSelectionScenarioAdhesion : function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape - stSelectionScenarioAdhesion');
	var processus=data.contratCourantAdhesion.dataLocale.contratAdhesionAttributs.contexteAnalyseStoppee;
	ctx.traceF.infoTxt('Processus identifié : '+processus);
	if(processus=='processus création'){
		sc.endStep(ActivInfinitev7.steps.stScenarioCreationContrat);
		return;
	}
	else{
		sc.endStep(ActivInfinitev7.steps.stScenarioModificationContrat);
		return;
	}
	
}});



/** step qui lance le sous scénario de creation Adhesion */
ActivInfinitev7.step({ stScenarioCreationContrat : function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape - stScenarioCreation - Lancement du sous-scenario de creation de contrat : stScenarioCreation');
	// on desactive le TimeOut principal afin que le timeOut execute soit celui du sous-scenario
	st.disableTimeout();	
	var scASC = ActivInfinitev7.scenarios.scScenarioCreationContrat.start(data).onEnd(function(sc2){
		sc.data=sc2.data;
		ctx.traceF.infoTxt(' Fin du sous-scenario - scScenarioCreation');
		sc.endStep();
	});
}});

/** step qui lance le sous scénario de creation Adhesion */
ActivInfinitev7.step({ stScenarioModificationContrat : function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape - stScenarioCreation - Lancement du sous-scenario de creation de contrat : stScenarioCreation');
	// on desactive le TimeOut principal afin que le timeOut execute soit celui du sous-scenario
	st.disableTimeout();	
	var scMC = ActivInfinitev7.scenarios.scScenarioModificationContrat.start(data).onEnd(function(sc3){
		sc.data=sc3.data;
		ctx.traceF.infoTxt(' Fin du sous-scenario - scScenarioCreation');
		sc.endStep();
	});
}});



/** Step : Mise à jour des données globales ( stats ) */
ActivInfinitev7.step( { stMiseAjourVarGloblalesAdhesion: function (ev, sc, st) {
		var data = sc.data;
		ctx.traceF.infoTxt('Etape - stMiseAjourVarGloblalesAdhesion ');
		sc.endStep();
		return ;
	}
});




ActivInfinitev7.step({ stInsertDonneesAdhesionExcel: function(ev, sc, st) {
  var data = sc.data;
  ctx.traceF.infoTxt('Etape - stInsertDonneesAdhesionExcel ');
   //lire la date
   data.contratCourantAdhesion.notes.dateTraitementContrat = ctx.getDate();
	data.contratCourantAdhesion.notes.statutsContrat=data.contratCourantAdhesion.dataLocale.contratAdhesionAttributs.NUM_SEQ_CT;
            
  var arrayMessage = [ {
       columnIndex: data.scenarioConfig.Adhesion.excel.indexColonne.dateTraitementContrat, value: data.contratCourantAdhesion.notes.dateTraitementContrat
      }, {
       columnIndex: data.scenarioConfig.Adhesion.excel.indexColonne.statutsContrat, value: data.contratCourantAdhesion.notes.statutsContrat
      }, {
      columnIndex: data.scenarioConfig.Adhesion.excel.indexColonne.commentaireContrat, value: data.contratCourantAdhesion.notes.commentaireContrat
      }
  ];
            
  ctx.excelF.remplirObjetTableau(data.varGlobales.ligneCourante, arrayMessage);
  ctx.excelF.sauverFichier(ctx.configF.cheminFichierResultat);
  sc.endStep();
  return;
}});




/** stContratAdhesionSuivant */
ActivInfinitev7.step({ stContratAdhesionSuivant: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape - stContratAdhesionSuivant - Initialisations pour un changement de contrat');
		if(data.varGlobales.ligneCourante < data.varGlobales.indexDerniereLigne) {	
			// On récupere le nombre de benef
			var nbBenef=0;
			for (var i in data.contratCourantAdhesion.dataLocale.tabPersonnesPhysiques){
				nbBenef+=1;
			}
			data.varGlobales.ligneCourante+=nbBenef;
			ctx.traceF.infoTxt(' Nombre de Beneficiaire du contrat précédant : '+nbBenef);
			ctx.traceF.infoTxt(' contrat suivant ligne : '+data.varGlobales.ligneCourante);
		  ctx.dataF.resetContratCourantAdhesion(data);
			sc.endStep(ActivInfinitev7.steps.stDebutBoucleContratAdhesion);
			return;
		}
		else{
			sc.endStep();
			return;
		}
}});


/** stFinScenarioAdhesion */
ActivInfinitev7.step({ stFinScenarioAdhesion : function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape - stFinScenarioAdhesion -Fin du scénario principal - Fermeture d\'Excel');
	ctx.excelF.fermerFichier();
	ctx.traceF.infoTxt('---> Ecriture des statistiques ');
	ctx.statsF.calculerStats(data);

	ctx.log('Fin du traitement Adhesion');
	ctx.popupF.finTraitement('Adhesion');
	sc.endScenario();
	return;
}});


