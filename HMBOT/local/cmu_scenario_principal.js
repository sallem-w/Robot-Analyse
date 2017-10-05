
/** Description */
ActivInfinitev7.scenario( { CMUScenarioPrincipal: function (ev, sc) {
	var data = sc.data;
	sc.onTimeout(30000, function (sc, st) {
		ctx.traceF.errorTxt('onTimeOut -  On quitte le scenario '+ sc.name + ' durant le step : '+  st.name + ' sur la page ' +  ev.pageName );
		ActivInfinitev7.pTabDeBord.start(data.webData.tabDeBordURL);
		sc.endScenario();
	}); // default timeout handler for each step
	sc.onError(function (sc, st, ex) {
		ctx.traceF.errorTxt('onError -  On quitte le scenario '+ sc.name + ' durant le step : '+  st.name + ' sur la page ' +  ev.pageName + ' en raison de : '+ ex);
		ActivInfinitev7.pTabDeBord.start(data.webData.tabDeBordURL);
		sc.endScenario();
	}); // default error handler
	sc.setMode(e.scenario.mode.clearIfRunning);
		
	sc.step(ActivInfinitev7.steps.stInitScenarioCMU);
//	sc.step(ActivInfinitev7.steps.stServerConnexionCMU);
	sc.step(ActivInfinitev7.steps.stDemmarrageTableauDeBord);
	sc.step(ActivInfinitev7.steps.stDebutBoucleContratCMU);
	sc.step(ActivInfinitev7.steps.stLireDonneesCMUExcel);
	sc.step(ActivInfinitev7.steps.stVerifExistanceAssurePrincipal);
	sc.step(ActivInfinitev7.steps.stVerifContratCMUCondition);
	sc.step(ActivInfinitev7.steps.stVerifContratCMU);
	sc.step(ActivInfinitev7.steps.stResilationCMUCondition);
	sc.step(ActivInfinitev7.steps.stResiliationContratCMU);	
	sc.step(ActivInfinitev7.steps.stMiseAjourVarGloblales);
	sc.step(ActivInfinitev7.steps.stInsertDonneesCMUExcel);
	sc.step(ActivInfinitev7.steps.stContratCMUSuivant);
	sc.step(ActivInfinitev7.steps.stFinScenarioCMU);

	}
});


/** Description */
ActivInfinitev7.step({ stInitScenarioCMU : function(ev, sc, st) {
	var data = sc.data;
	ctx.dataF.initialisationScenarioCMU(data,ctx.configF.scenario.CMU);//ctx.dataF.initialisationScenario(ctx.configF.scenario.CMU);
	ctx.traceF.infoTxt('Début étape - stInitScenarioCMU');
	sc.endStep();
	return;
}});


/** Description */
ActivInfinitev7.step({ stServerConnexionCMU : function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Début étape - stServerConnexionCMU');
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
	data.webData.url = ActivInfinitev7.pConnexion.getInfos().location.href;
	data.webData.identifiant = ActivInfinitev7.pConnexion.oIdentifiant.get();
	data.webData.motDePasse = ActivInfinitev7.pConnexion.oPwd.get();
		
		//on entre dans Infinite
		ActivInfinitev7.pConnexion.btConnexion.click();
		sc.endStep();
		return;
}});



/** Description */
ActivInfinitev7.step({ stDemmarrageTableauDeBord: function(ev, sc, st) {
	var data = sc.data;
	ActivInfinitev7.pTabDeBord.wait(function(ev) {
		var infos = ActivInfinitev7.pTabDeBord.getInfos();
		data.webData.tabDeBordURL=infos.document.URL;
		ctx.traceF.simpleTxt('URL du Tableau de bord : ' + data.webData.tabDeBordURL);
		sc.endStep();
		return;
		});
}});


/** Description */
ActivInfinitev7.step({ stDebutBoucleContratCMU: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Début étape - stDebutBoucleContratCMU');
	ctx.traceF.infoTxt('-->stDebutBoucleContratCMU Ligne Excel: '+ data.varGlobales.ligneCourante);
	sc.endStep();
	return;
}});



/** Description */
ActivInfinitev7.step({ stLireDonneesCMUExcel : function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape - stLireDonneesCMUExcel');
	 
	var temp_contract=ctx.dataF.CMUtemp_contractF;
	/** numéro du contrat */
	data.contratCourantCMU.dataLocale.numeroContratIndiv = ctx.stringF.remplissageGauche(ctx.string.trim(String(ctx.excel.sheet.getCell(data.varGlobales.ligneCourante, data.scenarioConfig.CMU.excel.indexColonne.numeroContratIndiv))), '00000000');
	/** dans une boucle on récupère l'assuré principale et les bénéficiaires */
	var numContratIndiv = data.contratCourantCMU.dataLocale.numeroContratIndiv;
	var tempNumContratIndiv = numContratIndiv;
	ctx.log('current row: '+data.varGlobales.ligneCourante);
 var temp_ligne=data.varGlobales.ligneCourante;
//	data.temp_contract = {};
	while (tempNumContratIndiv !== undefined && numContratIndiv === tempNumContratIndiv) {
			//récupération des champs (type, .....)
		  // contrat.typeAssure = ctx.excel.sheet.getCell(data.varGlobales.ligneCourante, data.configExcel.columnIndex.type);
		  temp_contract.codeProduit = ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.CMU.excel.indexColonne.codeProduitSouscrit);
		  temp_contract.dateDebEffContrat = ctx.excel.sheet.getCell(temp_ligne,data.scenarioConfig.CMU.excel.indexColonne.dateDebutEffetProduitSouscrit);
			temp_contract.dateFinEffContrat = ctx.excel.sheet.getCell(temp_ligne,data.scenarioConfig.CMU.excel.indexColonne.dateFinEffetProduitSouscrit);
	    temp_contract.typeAssure = ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.CMU.excel.indexColonne.type);
		  temp_contract.dateFinEffSituatParti = ctx.excel.sheet.getCell(temp_ligne,data.scenarioConfig.CMU.excel.indexColonne.dateFinSituationParticuliere);
		
		  //
			ctx.log('type contrat: '+temp_contract.typeAssure);
		  if(temp_contract.typeAssure === ctx.configF.constantes.ASSPRI){
				data.contratCourantCMU.dataLocale.dateFinEffSituatParti = temp_contract.dateFinEffSituatParti;
			}
		  data.contratCourantCMU.dataLocale.dictContratsCourantCMU.push(temp_contract);
		  temp_ligne+=1;
			tempNumContratIndiv = ctx.stringF.remplissageGauche(ctx.string.trim(String(ctx.excel.sheet.getCell(temp_ligne,data.scenarioConfig.CMU.excel.indexColonne.numeroContratIndiv))), '00000000');
	}
//	ctx.log('numéro courant: '+ numContratIndiv);
	ctx.log('ligne Courante: '+ data.varGlobales.ligneCourante);
//	if(data.varGlobales.ligneCourante < data.varGlobales.indexLastRow){
//		sc.endStep(ActivInfinitev7.steps.stSelectCMUContractFromExcel);
//		return;
//	}
	sc.endStep();
	return;
}});



/** ce step permet de vérifier dans le dictionnaire l'existance de l'assuré principal, sil existe on lance le sous scénario scVerifContratCMU sinon on exécute le sous sc finCMU  */
ActivInfinitev7.step({ stVerifExistanceAssurePrincipal : function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape - stVerifExistanceAssurePrincipal');
	
	for (var i in data.contratCourantCMU.dataLocale.dictContratsCourantCMU){
		var tmp_Assure = data.contratCourantCMU.dataLocale.dictContratsCourantCMU[i];
		if(tmp_Assure.typeAssure==ctx.configF.constantes.ASSPRI){
			data.contratCourantCMU.statutsCMU.existanceASSPRI=true;
		}
	}
	sc.endStep();
	return;
}});

/** Condition d'embranchement de scenario */
ActivInfinitev7.step({ stVerifContratCMUCondition: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape - stResilationCMUCondition ');
	if(data.contratCourantCMU.statutsCMU.existanceASSPRI == false){
		ctx.traceF.infoTxt('existanceASSPRI == false - Pas d\'ASSPRI, on ne traite pas le contrat ');
		data.contratCourantCMU.notes.commentaireContrat = 'Pas d\'ASSPRI, on ne traite pas le contrat';
		data.contratCourantCMU.notes.statutsContrat = ctx.excelF.constantes.statuts.Echec;
		sc.endStep(ActivInfinitev7.steps.stMiseAjourVarGloblales);
		return;
	}
	else{ // on lance le scenario de traitement
			sc.endStep(ActivInfinitev7.steps.stVerifContratCMU);
			return;
	}
}});

/** step qui lance le sous scénario de vérification des données cmu */
ActivInfinitev7.step({ stVerifContratCMU : function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape - stVerifContratCMU - Lancement du sous-scenario de verification des données en lignes : scVerifContratCMU');
	// on desactive le TimeOut principal afin que le timeOut execute soit celui du sous-scenario
	st.disableTimeout();	
	var scASC = ActivInfinitev7.scenarios.scVerifContratCMU.start(data).onEnd(function(sc2){
		sc.data=sc2.data;
		ctx.traceF.infoTxt(' Fin du sous-scenario - scVerifContratCMU');
		if(data.scenarioConfig.CMU.controlSeul){
			ctx.traceF.infoTxt(' controlSeul - Aucune mise à jour du contrat est effectuée');
			sc.data.contratCourantCMU.statutsCMU.FinCMUProcessus = true;
		}
		sc.endStep();
	});
}});


/** Condition d'embranchement de scenario */
ActivInfinitev7.step({ stResilationCMUCondition: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape - stResilationCMUCondition ');
	if(data.contratCourantCMU.statutsCMU.FinCMUProcessus == true){
		ctx.traceF.infoTxt('FinCMUProcessus == true : on n\'effectue pas de résiliation ');
		sc.endStep(ActivInfinitev7.steps.stMiseAjourVarGloblales);
		return;
	}
	else{ // on lance le scenario de traitement
			sc.endStep(ActivInfinitev7.steps.stResiliationContratCMU);
			return;
	}
}});


/** Etape qui lance le scenario de Résiliation  */
ActivInfinitev7.step({ stResiliationContratCMU: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape - stResiliationContratCMU ');
	st.disableTimeout();
	var scCMU = ActivInfinitev7.scenarios.scResiliationCMU.start(data).onEnd(function(sc4){
		sc.data = sc4.data;
		ctx.traceF.infoTxt(' Fin du sous-scenario - scResiliationCMU');
		sc.endStep();
	});
}});


/** Step : Mise à jour des données globales ( stats ) */
ActivInfinitev7.step( { stMiseAjourVarGloblales: function (ev, sc, st) {
		var data = sc.data;
		ctx.traceF.infoTxt('Etape - stMiseAjourVarGloblales ');
		ctx.statsF.miseAJourCMU(data);
		sc.endStep();
		return ;
	}
});



ActivInfinitev7.step({ stInsertDonneesCMUExcel: function(ev, sc, st) {
  var data = sc.data;
  ctx.traceF.infoTxt('Etape - stInsertDonneesCMUExcel ');
   //lire la date
   data.contratCourantCMU.notes.dateTraitementContrat = ctx.getDate();
            
  var arrayMessage = [ {
       columnIndex: data.scenarioConfig.CMU.excel.indexColonne.dateTraitementContrat, value: data.contratCourantCMU.notes.dateTraitementContrat
      }, {
       columnIndex: data.scenarioConfig.CMU.excel.indexColonne.statutsContrat, value: data.contratCourantCMU.notes.statutsContrat
      }, {
      columnIndex: data.scenarioConfig.CMU.excel.indexColonne.commentaireContrat, value: data.contratCourantCMU.notes.commentaireContrat
      }
  ];
            
  ctx.excelF.remplirObjetTableau(data.varGlobales.ligneCourante, arrayMessage);
  ctx.excelF.sauverFichier(ctx.configF.cheminFichierResultat);
  sc.endStep();
  return;
}});




/** stContratCMUSuivant */
ActivInfinitev7.step({ stContratCMUSuivant: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape - stContratCMUSuivant - Initialisations pour un changement de contrat');
		if(data.varGlobales.ligneCourante < data.varGlobales.indexDerniereLigne) {	
			// On récupere le nombre de benef
			var nbBenef=0;
			for (var i in data.contratCourantCMU.dataLocale.dictContratsCourantCMU){
				nbBenef+=1;
			}
			data.varGlobales.ligneCourante+=nbBenef;
//			ctx.log( "data.contratCourantCMU.dataLocale.dictContratsCourantCMU : "+ data.contratCourantCMU.dataLocale.dictContratsCourantCMU.length);
		  ctx.dataF.resetContratCourantCMU(data);
//			ctx.log( "data.contratCourantCMU.dataLocale.dictContratsCourantCMU : "+ data.contratCourantCMU.dataLocale.dictContratsCourantCMU.length);
//			ctx.log( "contrat suivant ligne : "+ data.varGlobales.ligneCourante);
			sc.endStep(ActivInfinitev7.steps.stDebutBoucleContratCMU);
			return;
		}
		else{
			sc.endStep();
			return;
		}
}});


/** stFinScenarioCMU */
ActivInfinitev7.step({ stFinScenarioCMU : function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape - stFinScenarioCMU -Fin du scénario principal - Fermeture d\'Excel');
	ctx.excelF.fermerFichier();
	ctx.traceF.infoTxt('---> Ecriture des statistiques ');
	ctx.statsF.calculerStats(data);
	ctx.log('Fin du traitement CMU');
	ctx.popupF.finTraitement();
	sc.endScenario();
	return;
}});


