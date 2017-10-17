
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
	sc.step(ActivInfinitev7.steps.stLectureData);
  
	
	sc.step(ActivInfinitev7.steps.stLireRefGRC);
	sc.step(ActivInfinitev7.steps.stVerifPetitePrev);
	sc.step(GRCHarmonieMutuelle.steps.stDemarrageGRCSiebel);
	sc.step(ActivInfinitev7.steps.stVerifDataGRC);
	//sc.step(ActivInfinitev7.steps.stDemarrageServeurAnalyse);
//	sc.step(ActivInfinitev7.steps.stRecherchePP);
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
ActivInfinitev7.step({ stLectureData: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stLectureData - lecture des données JSON');
	var tab = data.scenarioConfig.ANALYSE.tabGammeCode;
	var gc;
	for (var i in tab){
		gc = tab[i].gamme +':'+ tab[i].code +':'+ tab[i].compatible;
		data.ppCouranteAnalyse.dataLocale.tabGammeCode.push(gc);
	}
	ctx.traceF.infoTxt('Chargement des numéros des produits (10 produits)');
	data.ppCouranteAnalyse.dataLocale.tabProduits = data.scenarioConfig.ANALYSE.listeProduits;
	sc.endStep();
	return;
}});



/** Description */
ActivInfinitev7.step({ stLireRefGRC: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stLireRefGRC - lecture de la pp courante du fichier IAE :');
	
	if(data.varGlobales.ligneCourante <= data.varGlobales.indexDerniereLigne){
		data.ppCouranteAnalyse.dataLocale.typeAssure =  ctx.excel.sheet.getCell(data.varGlobales.ligneCourante, data.scenarioConfig.ANALYSE.excel.indexColonne.type);
		if(data.ppCouranteAnalyse.dataLocale.typeAssure === 'Principale'){
			//récupérer la référece GRC et la gamme de produit
			data.ppCouranteAnalyse.dataLocale.referenceGRC = ctx.excel.sheet.getCell(data.varGlobales.ligneCourante, data.scenarioConfig.ANALYSE.excel.indexColonne.referenceGRC);
			ctx.traceF.infoTxt('Reference GRC: '+data.ppCouranteAnalyse.dataLocale.referenceGRC +', ligne courante: '+data.varGlobales.ligneCourante);
			//lire la gamme de produit et la date de début de fin d'effet ==> codeoffre (LOCALE)
			data.ppCouranteAnalyse.dataLocale.gammeProduit = ctx.excel.sheet.getCell(data.varGlobales.ligneCourante, data.scenarioConfig.ANALYSE.excel.indexColonne.gammeProduit);
			// DEBUT récupérer la liste des produits de l'assuré Principale
			var j = data.scenarioConfig.ANALYSE.excel.indexColonne.numProduit1;
			var numProdPC;
			data.ppCouranteAnalyse.dataLocale.numSEQ =  ctx.excel.sheet.getCell(data.varGlobales.ligneCourante, data.scenarioConfig.ANALYSE.excel.indexColonne.numSEQ); 
			var tempLigneCourante = data.varGlobales.ligneCourante +1;
			data.ppCouranteAnalyse.dataLocale.tabProduitsPrinConj = [];
			if(tempLigneCourante <= data.varGlobales.indexDerniereLigne && data.ppCouranteAnalyse.dataLocale.numSEQ === ctx.excel.sheet.getCell(tempLigneCourante, data.scenarioConfig.ANALYSE.excel.indexColonne.numSEQ) && ctx.excel.sheet.getCell(tempLigneCourante, data.scenarioConfig.ANALYSE.excel.indexColonne.type) === 'Conjoint'){
				for(var i =0; i<10; i++){
		  		if(ctx.excel.sheet.getCell(data.varGlobales.ligneCourante, j) !== undefined){
						numProdPC = ctx.excel.sheet.getCell(data.varGlobales.ligneCourante, j);
					}
					if(ctx.excel.sheet.getCell(tempLigneCourante, j) !== undefined){
						numProdPC += ':'+ctx.excel.sheet.getCell(tempLigneCourante, j);
					}
					data.ppCouranteAnalyse.dataLocale.tabProduitsPrinConj.push(numProdPC);
					numProdPC = '';
          j += 1;
			  }
			}else{ 
				for(var i =0; i<10; i++){
		  		if(ctx.excel.sheet.getCell(data.varGlobales.ligneCourante, j) !== undefined){
						numProdPC = ctx.excel.sheet.getCell(data.varGlobales.ligneCourante, j);
					}
				  data.ppCouranteAnalyse.dataLocale.tabProduitsPrinConj.push(numProdPC);			
					numProdPC = '';
		    	j += 1;
	    	}
			}
			sc.endStep();
	    return;
		}else{
			sc.endStep(ActivInfinitev7.steps.stLireRefGRCSuivant);
			return;
		}
	}
}});


/** Description */
ActivInfinitev7.step({ stVerifPetitePrev: function(ev, sc, st) {
	var data = sc.data;
  ctx.traceF.infoTxt('Etape stRecherchePP: Recherche de produit HPP');
	var res = [];
	for(var i=0; i<10; i++){
		res = data.ppCouranteAnalyse.dataLocale.tabProduitsPrinConj[i].split(':');
		for (var j =0; j<10; j++){	
			if(res[0]  === data.ppCouranteAnalyse.dataLocale.tabProduits[j] || res[1] === data.ppCouranteAnalyse.dataLocale.tabProduits[j]){
				data.ppCouranteAnalyse.dataEnLigne.HPPExiste = true;
				data.ppCouranteAnalyse.notes.presenceHPP = 'Oui';
		  }
	  }
	}
	for(var i=0; i<10; i++){
		res = data.ppCouranteAnalyse.dataLocale.tabGammeCode[i].split(':');
		if(res[0] === data.ppCouranteAnalyse.dataLocale.gammeProduit && res[2] === '1'){
			data.ppCouranteAnalyse.dataEnLigne.produitGammeCompatible = true;
			break;
		}
	}
	sc.endStep();
	return;
}});


/** Description */
ActivInfinitev7.step({ stVerifDataGRC: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('++++++++++++++++++++++++++++ Connexion à l\'application GRC infocentre 8.1 ++++++++++++++++++++++++++++');
	st.disableTimeout();
	var scAnalyse = GRCHarmonieMutuelle.scenarios.scVerifDataGRC.start(data).onEnd(function(sc2){
		sc.data=sc2.data;
		ctx.traceF.infoTxt(' Fin du sous - scenario - scVerifDataGRC');
		sc.endStep();
	});
}});


/** Description */
ActivInfinitev7.step({ stDemarrageServeurAnalyse : function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Début étape - stDemarrageServeurAnalyse');
		ActivInfinitev7.pTabDeBord.wait(function(ev) {
		var infos = ActivInfinitev7.pTabDeBord.getInfos();
		data.webData.tabDeBordURL=infos.document.URL;
		ctx.log('URL de Tableau de bord : ' + data.webData.tabDeBordURL);
		sc.endStep();
		return;
		});
}
});


/** lancement du sous scenario de recherche de la pp infinite */
ActivInfinitev7.step({ stRecherchePP: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stRecherchePP: Scénario de recherche de la PP');
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
	var compGammeCode = data.ppCouranteAnalyse.notes.presenceHPP;
	if(data.ppCouranteAnalyse.notes.presenceHPP === 'Oui'){ 
		if(data.ppCouranteAnalyse.dataEnLigne.produitGammeCompatible){
			compGammeCode += '/Oui compatible';
		}else{
			compGammeCode += '/Non compatible';
		}
	}
	 var arrayMessage = [ {
      columnIndex: data.scenarioConfig.ANALYSE.excel.indexColonne.contexteAnalyseStoppee, value: data.ppCouranteAnalyse.notes.contexteAnalyseStoppee
      },{
			//columnIndex: data.scenarioConfig.ANALYSE.excel.indexColonne.presenceHPP, value: data.ppCouranteAnalyse.notes.presenceHPP
				columnIndex: data.scenarioConfig.ANALYSE.excel.indexColonne.presenceHPP, value: compGammeCode
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
		data.ppCouranteAnalyse.dataEnLigne.HPPExiste = false;
		data.ppCouranteAnalyse.dataEnLigne.produitGammeCompatible = false;
		data.ppCouranteAnalyse.notes.presenceHPP = 'Non';
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

