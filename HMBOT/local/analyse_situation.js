
/** Description */
ActivInfinitev7.scenario({ scAnalyseSituation: function(ev, sc) {
	var data = sc.data;
	sc.onTimeout(30000, function(sc, st) {
		ctx.traceF.errorTxt('Timeout le scénario principale a été arrêté');
		data.ppCouranteAnalyse.notes.contexteAnalyseStoppee = 'Adhésion non analysée - Problème technique';
		ActivInfinitev7.pTabDeBord.start(data.webData.tabDeBordURL);
    sc.endScenario();
	});
	sc.onError(function(sc, st, ex) {
		ctx.traceF.errorTxt('OnError le scénario principale a été arrêté');
		data.ppCouranteAnalyse.notes.contexteAnalyseStoppee = 'Adhésion non analysée - Problème technique';
		ActivInfinitev7.pTabDeBord.start(data.webData.tabDeBordURL);
    sc.endScenario();
	});
	sc.setMode(e.scenario.mode.clearIfRunning);
	// add steps here...
	sc.step(ActivInfinitev7.steps.stInitAnalyseSitu);
	sc.step(ActivInfinitev7.steps.stChargementFichierIAE);
	sc.step(ActivInfinitev7.steps.stServerConnexionAnalyse);
	sc.step(ActivInfinitev7.steps.stLireRefGRC);
	sc.step(ActivInfinitev7.steps.stRecherchePP);
	sc.step(ActivInfinitev7.steps.stInsertionDonneesAnalyseExcel);
	sc.step(ActivInfinitev7.steps.stLireRefGRCSuivant);
	sc.step(ActivInfinitev7.steps.stFinAnalyseSitu);
}});


/** Description */
ActivInfinitev7.step({ stInitAnalyseSitu: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('************* Début scénario analyse situation *************');
	ctx.dataF.initialisationScenarioAnalyse(data,ctx.configF.scenario.Analyse); 
//	ctx.excelF.configExcel(ctx.configF.scenario.Analyse);
	sc.endStep();
	return;
}});


/** cet etape permet de charger le fichier input du scenario analyse et de créer le fichier résultat */
ActivInfinitev7.step({ stChargementFichierIAE: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stChargementFichierIAE - chargement et ouverture du fichier Excel PRE-IAE');
	var tab = data.scenarioConfig.ANALYSE.tabGammeCode;
	for (var i in tab){
	  data.ppCouranteAnalyse.dataLocale.tabGamme.push(tab[i].gamme);
		data.ppCouranteAnalyse.dataLocale.tabCode.push(tab[i].code);
	}	
	
	ctx.traceF.infoTxt('Chargement des numéros des produits (10 produits)');
	sc.endStep();
	return;
}});

/** Description */
ActivInfinitev7.step({ stServerConnexionAnalyse : function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Début étape - stServerConnexionAnalyse');
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
ActivInfinitev7.step({ stLireRefGRC: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stLireRefGRC - lecture de la pp courante du fichier IAE :');
	if(data.varGlobales.ligneCourante <= data.varGlobales.indexDerniereLigne){
		data.ppCouranteAnalyse.dataLocale.typeAssure =  ctx.excel.sheet.getCell(data.varGlobales.ligneCourante, data.scenarioConfig.ANALYSE.excel.indexColonne.type);
		if(data.ppCouranteAnalyse.dataLocale.typeAssure === 'Principale'){
			//récupérer la référece GRC
			data.ppCouranteAnalyse.dataLocale.referenceGRC = ctx.excel.sheet.getCell(data.varGlobales.ligneCourante, data.scenarioConfig.ANALYSE.excel.indexColonne.referenceGRC);
			ctx.traceF.infoTxt('Reference GRC: '+data.ppCouranteAnalyse.dataLocale.referenceGRC +', ligne courante: '+data.varGlobales.ligneCourante);
			
			// DEBUT récupérer la liste des produits de l'assuré Principale
			var j = data.scenarioConfig.ANALYSE.excel.indexColonne.numProduit1;
			//var numProd = ctx.dataF.numProd;
			var numProd = {
				numProdC : '',
				numProdP : ''
			};
			data.ppCouranteAnalyse.dataLocale.numSEQ =  ctx.excel.sheet.getCell(data.varGlobales.ligneCourante, data.scenarioConfig.ANALYSE.excel.indexColonne.numSEQ); 
			var tempLigneCourante = data.varGlobales.ligneCourante +1;
//			//vérifier si on a un conjoint ==> on récupère les produits associés à lui
			if(tempLigneCourante <= data.varGlobales.indexDerniereLigne && data.ppCouranteAnalyse.dataLocale.numSEQ === ctx.excel.sheet.getCell(tempLigneCourante, data.scenarioConfig.ANALYSE.excel.indexColonne.numSEQ) && ctx.excel.sheet.getCell(tempLigneCourante, data.scenarioConfig.ANALYSE.excel.indexColonne.type) === 'Conjoint'){
				ctx.traceF.infoTxt('************ Principale + conjoint ***************');
				data.ppCouranteAnalyse.dataLocale.tabListeProduits = [];
				for(var i =0; i<10; i++){
		  		if(ctx.excel.sheet.getCell(data.varGlobales.ligneCourante, j) !== undefined){
						numProd.numProdP = ctx.excel.sheet.getCell(data.varGlobales.ligneCourante, j);
					}
					if(ctx.excel.sheet.getCell(tempLigneCourante, j) !== undefined){
						numProd.numProdC = ctx.excel.sheet.getCell(tempLigneCourante, j);
					}
					data.ppCouranteAnalyse.dataLocale.tabListeProduits.push(numProd);
					numProd = {
						numProdC : '',
						numProdP : ''
				  };
          j += 1;
			  }
			}else{ //on a un seul assuré
				ctx.traceF.infoTxt('************ Principale SANS conjoint ***************');
				data.ppCouranteAnalyse.dataLocale.tabListeProduits = [];
				for(var i =0; i<10; i++){
		  		if(ctx.excel.sheet.getCell(data.varGlobales.ligneCourante, j) !== undefined){
						numProd.numProdP = ctx.excel.sheet.getCell(data.varGlobales.ligneCourante, j);		
					}
				data.ppCouranteAnalyse.dataLocale.tabListeProduits.push(numProd);			
        numProd = {
					numProdC : '',
					numProdP : ''
				};
		    	j += 1;
	    	}
				
				for (var i =0; i<10; i++){
					ctx.traceF.infoTxt('('+i +', '+j+'): '+ data.ppCouranteAnalyse.dataLocale.tabListeProduits[i].numProdP +', '+data.ppCouranteAnalyse.dataLocale.tabListeProduits[i].numProdC);
				}
			}
			// fin récupération des produits
			
			sc.endStep();
	    return;
		}else{
			sc.endStep(ActivInfinitev7.steps.stLireRefGRCSuivant);
			return;
		}
	}

}});



/** lancement du sous scenario de recherche de la pp infinite */
ActivInfinitev7.step({ stRecherchePP: function(ev, sc, st) {
	var data = sc.data;
	st.disableTimeout();
	var scAnalyse = ActivInfinitev7.scenarios.scRechercheAnalysePP.start(data).onEnd(function(sc2){
		sc.data=sc2.data;
		ctx.traceF.infoTxt(' Fin du sous - scenario - scRechercheAnalysePP');
		sc.endStep();
	});
}});



/** insertion du contexte d'analyse dans le fichier excel resultat */
ActivInfinitev7.step({ stInsertionDonneesAnalyseExcel: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stInsertionDonneesAnalyseExcel: insertion des données dans le fichier résultat');
	 var arrayMessage = [ {
      columnIndex: data.scenarioConfig.ANALYSE.excel.indexColonne.contexteAnalyseStoppee, value: data.ppCouranteAnalyse.notes.contexteAnalyseStoppee
      }
  ];
  ctx.excelF.remplirObjetTableau(data.varGlobales.ligneCourante, arrayMessage);
  ctx.excelF.sauverFichier(ctx.configF.cheminFichierResultat);
	sc.endStep();
	return;
}});


/** Description */
ActivInfinitev7.step({ stLireRefGRCSuivant: function(ev, sc, st) {
	var data = sc.data;
	
	data.varGlobales.ligneCourante += 1;
	if(data.varGlobales.ligneCourante > data.varGlobales.indexDerniereLigne){
		sc.endStep();
		return;
	}else{
		sc.endStep(ActivInfinitev7.steps.stLireRefGRC);
	  return;
	}

}});


/** Description */
ActivInfinitev7.step({ stFinAnalyseSitu: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('************* Fin scénario analyse situation *************');
	sc.endScenario();
	return;
}});

