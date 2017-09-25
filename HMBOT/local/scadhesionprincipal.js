
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
	sc.step(ActivInfinitev7.steps.stServerConnexionAdhesion);
	sc.step(ActivInfinitev7.steps.stDebutBoucleContratAdhesion);
	sc.step(ActivInfinitev7.steps.stLireDonneesAdhesionExcel);
	sc.step(ActivInfinitev7.steps.stVerifExistanceAssurePrincipal);
	sc.step(ActivInfinitev7.steps.stVerifContratAdhesionCondition);
	sc.step(ActivInfinitev7.steps.stVerifContratAdhesion);
	sc.step(ActivInfinitev7.steps.stResilationAdhesionCondition);
	sc.step(ActivInfinitev7.steps.stResiliationContratAdhesion);	
	sc.step(ActivInfinitev7.steps.stMiseAjourVarGloblales);
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
		ActivInfinitev7.pTabDeBord.wait(function(ev) {
		var infos = ActivInfinitev7.pTabDeBord.getInfos();
		
		data.webData.tabDeBordURL=infos.document.URL;
		ctx.log('URL de Tableau de bord : ' + data.webData.tabDeBordURL);
		sc.endStep();
		return;
		});
}
});


/** Description */
ActivInfinitev7.step({ stDebutBoucleContratAdhesion: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Début étape - stDebutBoucleContratAdhesion');
	ctx.traceF.infoTxt('-->stDebutBoucleContratAdhesion Ligne Excel: '+ data.varGlobales.ligneCourante);
	sc.endStep();
	return;
}});






/** ce step permet de vérifier dans le dictionnaire l'existance de l'assuré principal, sil existe on lance le sous scénario scVerifContratAdhesion sinon on exécute le sous sc finAdhesion  */
ActivInfinitev7.step({ stVerifExistanceAssurePrincipal : function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape - stVerifExistanceAssurePrincipal');
	sc.endStep();
	return;
}});

/** Condition d'embranchement de scenario */
ActivInfinitev7.step({ stVerifContratAdhesionCondition: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape - stResilationAdhesionCondition ');
	if(data.contratCourantAdhesion.statutsAdhesion.existanceASSPRI == false){
		sc.endStep(ActivInfinitev7.steps.stMiseAjourVarGloblales);
		return;
	}
	else{ // on lance le scenario de traitement
			sc.endStep(ActivInfinitev7.steps.stVerifContratAdhesion);
			return;
	}
}});

/** step qui lance le sous scénario de vérification des données Adhesion */
ActivInfinitev7.step({ stVerifContratAdhesion : function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape - stVerifContratAdhesion - Lancement du sous-scenario de verification des données en lignes : scVerifContratAdhesion');
	// on desactive le TimeOut principal afin que le timeOut execute soit celui du sous-scenario
	st.disableTimeout();	
	var scASC = ActivInfinitev7.scenarios.scVerifContratAdhesion.start(data).onEnd(function(sc2){
		sc.data=sc2.data;
		ctx.traceF.infoTxt(' Fin du sous-scenario - scVerifContratAdhesion');
		if(data.scenarioConfig.Adhesion.controlSeul){
			ctx.traceF.infoTxt(' controlSeul - Aucune mise à jour du contrat est effectuée');
			sc.data.contratCourantAdhesion.statutsAdhesion.FinAdhesionProcessus = true;
		}
		sc.endStep();
	});
}});


/** Condition d'embranchement de scenario */
ActivInfinitev7.step({ stResilationAdhesionCondition: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape - stResilationAdhesionCondition ');
	if(data.contratCourantAdhesion.statutsAdhesion.FinAdhesionProcessus == true){
		sc.endStep(ActivInfinitev7.steps.stMiseAjourVarGloblales);
		return;
	}
	else{ // on lance le scenario de traitement
			sc.endStep(ActivInfinitev7.steps.stResiliationContratAdhesion);
			return;
	}
}});


/** Etape qui lance le scenario de Résiliation  */
ActivInfinitev7.step({ stResiliationContratAdhesion: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape - stResiliationContratAdhesion ');
	st.disableTimeout();
	var scAdhesion = ActivInfinitev7.scenarios.scResiliationAdhesion.start(data).onEnd(function(sc4){
		sc.data = sc4.data;
		ctx.traceF.infoTxt(' Fin du sous-scenario - scResiliationAdhesion');
		sc.endStep();
	});
}});


/** Step : Mise à jour des données globales ( stats ) */
ActivInfinitev7.step( { stMiseAjourVarGloblales: function (ev, sc, st) {
		var data = sc.data;
		ctx.traceF.infoTxt('Etape - stMiseAjourVarGloblales ');
		ctx.statsF.miseAJourAdhesion(data);
		sc.endStep();
		return ;
	}
});



ActivInfinitev7.step({ stInsertDonneesAdhesionExcel: function(ev, sc, st) {
  var data = sc.data;
  ctx.traceF.infoTxt('Etape - stInsertDonneesAdhesionExcel ');
   //lire la date
   data.contratCourantAdhesion.notes.dateTraitementContrat = ctx.getDate();
            
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
			for (var i in data.contratCourantAdhesion.dataLocale.dictContratsCourantAdhesion){
				nbBenef+=1;
			}
			data.varGlobales.ligneCourante+=nbBenef;
			ctx.log( "data.contratCourantAdhesion.dataLocale.dictContratsCourantAdhesion : "+ data.contratCourantAdhesion.dataLocale.dictContratsCourantAdhesion.length);
		  ctx.dataF.resetContratCourantAdhesion(data);
			ctx.log( "data.contratCourantAdhesion.dataLocale.dictContratsCourantAdhesion : "+ data.contratCourantAdhesion.dataLocale.dictContratsCourantAdhesion.length);
			ctx.log( "contrat suivant ligne : "+ data.varGlobales.ligneCourante);
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

//	ctx.popupF.newPopup("Fin du traitement Adhesion ",'Fin', function() {
//			GLOBAL.notify(GLOBAL.events.PRESTOPCTX);
////			return sc.endStep();
//		});
	ctx.log('Fin du traitement Adhesion');
	ctx.popupF.finTraitement();
	sc.endScenario();
	return;
}});


