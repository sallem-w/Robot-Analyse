
/** Description */
GRCHarmonieMutuelle.scenario({ scVerifDataGRC: function(ev, sc) {
	var data = sc.data;
	sc.onTimeout(30000, function(sc, st) { sc.endScenario();	}); // default timeout handler for each step
	sc.onError(function(sc, st, ex) { sc.endScenario();	}); // default error handler
	sc.setMode(e.scenario.mode.clearIfRunning);
	// add steps here...
	
	sc.step(GRCHarmonieMutuelle.steps.stInitVerifDataGRC);
	//sc.step(GRCHarmonieMutuelle.steps.stConnexionGRCSiebel);
	sc.step(ActivInfinitev7.steps.stDemarrageServeurInfinite); //cette etape
	sc.step(GRCHarmonieMutuelle.steps.stLireDataConfig);
	sc.step(GRCHarmonieMutuelle.steps.stLireDataPPIAE);
	sc.step(GRCHarmonieMutuelle.steps.stRechercheProduitHPP);
	
	sc.step(GRCHarmonieMutuelle.steps.stLancerSCaALSEGRC); //dans la fin de ce step on vérifie si on va analyser la 1ere PP sur infinite ou non c'est une PP > 2
//	sc.step(GRCHarmonieMutuelle.steps.stDemarrageServeurInfinite);
  sc.step(GRCHarmonieMutuelle.steps.stRechercheEtAnalysePP);
	sc.step(GRCHarmonieMutuelle.steps.stInsertionDonneesAnalyseExcel);
	sc.step(GRCHarmonieMutuelle.steps.stLireDataPPSuivanteIAE);
	sc.step(GRCHarmonieMutuelle.steps.stFinVerifDataGRC);
	
}});



/** Description */
GRCHarmonieMutuelle.step({ stInitVerifDataGRC: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stInitVerifDataGRC: ');
	ctx.dataF.initialisationScenarioAnalyse(data,ctx.configF.scenario.Analyse); 
	sc.endStep();
	return;
}});


/** Description */
GRCHarmonieMutuelle.step({ stConnexionGRCSiebel: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stConnexionGRCSiebel: ');
	
	data.webDataGRC.url = GRCHarmonieMutuelle.pConnexionGRC.getInfos();
	data.webDataGRC.identifiant = GRCHarmonieMutuelle.pConnexionGRC.oIdentifiant.get();
	data.webDataGRC.motDePasse = GRCHarmonieMutuelle.pConnexionGRC.oPwd.get();
	GRCHarmonieMutuelle.pConnexionGRC.oConnexion.click();
	sc.endStep();
	return;
}});


/** Description */
GRCHarmonieMutuelle.step({ stLireDataConfig: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stLireDataConfig: lecture des données de configuration du fichier .JSON');
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
GRCHarmonieMutuelle.step({ stLireDataPPIAE: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stLireDataPPIAE: lecture des données du fichier IAE');
	if(data.varGlobales.ligneCourante <= data.varGlobales.indexDerniereLigne){
		//lire le type de l'assuré
		data.ppCouranteAnalyse.dataLocale.typeAssure =  ctx.excel.sheet.getCell(data.varGlobales.ligneCourante, data.scenarioConfig.ANALYSE.excel.indexColonne.type);
		if(data.ppCouranteAnalyse.dataLocale.typeAssure === 'Principale'){
			//lire la um ext ctt
			data.ppCouranteAnalyse.dataLocale.numExtCtt = ctx.excel.sheet.getCell(data.varGlobales.ligneCourante, data.scenarioConfig.ANALYSE.excel.indexColonne.numExtCtt);
			//lire la référece GRC
			data.ppCouranteAnalyse.dataLocale.referenceGRC = ctx.excel.sheet.getCell(data.varGlobales.ligneCourante, data.scenarioConfig.ANALYSE.excel.indexColonne.referenceGRC);
			ctx.traceF.infoTxt('Reference GRC: '+data.ppCouranteAnalyse.dataLocale.referenceGRC +', ligne courante: '+data.varGlobales.ligneCourante);
			//lire la gamme du produit
			data.ppCouranteAnalyse.dataLocale.gammeProduit = ctx.excel.sheet.getCell(data.varGlobales.ligneCourante, data.scenarioConfig.ANALYSE.excel.indexColonne.gammeProduit);
			//lire le numéro de séquence
			data.ppCouranteAnalyse.dataLocale.numSEQ =  ctx.excel.sheet.getCell(data.varGlobales.ligneCourante, data.scenarioConfig.ANALYSE.excel.indexColonne.numSEQ); 
			//lire la liste des produits (pour l'assuré principale et le conjoint)
			var j = data.scenarioConfig.ANALYSE.excel.indexColonne.numProduit1;
			var numProdPC;
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
			sc.endStep(GRCHarmonieMutuelle.steps.stLireDataPPSuivanteIAE);
			return;
		}
	}
}});


/** Description */
GRCHarmonieMutuelle.step({ stRechercheProduitHPP: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stRechercheProduitHPP - Recherche de produit HPP: '+data.ppCouranteAnalyse.dataLocale.referenceGRC);
	var res = [];
	for(var i=0; i<10; i++){
		res = data.ppCouranteAnalyse.dataLocale.tabProduitsPrinConj[i].split(':');
		for (var j in data.ppCouranteAnalyse.dataLocale.tabProduits){	//liste des 10 produits dans la config JSON
			if(res[0]  === data.ppCouranteAnalyse.dataLocale.tabProduits[j] || res[1] === data.ppCouranteAnalyse.dataLocale.tabProduits[j]){
				data.ppCouranteAnalyse.dataEnLigne.HPPExiste = true;
				data.ppCouranteAnalyse.notes.presenceHPP = 'Oui';
		  }
	  }
	}
	for(var i in data.ppCouranteAnalyse.dataLocale.tabGammeCode){
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
GRCHarmonieMutuelle.step({ stLancerSCaALSEGRC: function(ev, sc, st) {
	var data = sc.data;
	sc.endStep();
	return;
}});


/** Description */
GRCHarmonieMutuelle.step({ stRechercheEtAnalysePP: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('************* Début scénario recherche et analyse situation PP *************');
	st.disableTimeout();
	ActivInfinitev7.scenarios.scRechercheAnalysePP.start(data).onEnd(function(sc2){
		sc.data=sc2.data;
		ctx.traceF.infoTxt('************* Fin scénario recherche et analyse situation PP *************');
		sc.endStep();
	});
}});



/** Description */
GRCHarmonieMutuelle.step({ stInsertionDonneesAnalyseExcel : function(ev, sc, st) {
	var data = sc.data;
	
	ctx.traceF.infoTxt('Etape stInsertionDonneesAnalyseExcel - Insertion des données dans le fichier résultat: '+data.ppCouranteAnalyse.dataLocale.referenceGRC);
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
				columnIndex: data.scenarioConfig.ANALYSE.excel.indexColonne.presenceHPP, value: compGammeCode
			}
  ];
  ctx.excelF.remplirObjetTableau(data.varGlobales.ligneCourante, arrayMessage);
  ctx.excelF.sauverFichier(ctx.configF.cheminFichierResultat);
	sc.endStep();
	return;
}});


/** Description */
GRCHarmonieMutuelle.step({ stLireDataPPSuivanteIAE: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stLireDataPPSuivanteIAE: lecture des données de la PP suivante du fichier IAE');
	data.varGlobales.ligneCourante += 1;
	if(data.varGlobales.ligneCourante > data.varGlobales.indexDerniereLigne){
		sc.endStep();
		return;
	}else{
		data.ppCouranteAnalyse.dataEnLigne.HPPExiste = false;
		data.ppCouranteAnalyse.dataEnLigne.produitGammeCompatible = false;
		data.ppCouranteAnalyse.notes.presenceHPP = 'Non';
		sc.endStep(GRCHarmonieMutuelle.steps.stLireDataPPIAE);
	  return;
	}
}});



/** Description */
GRCHarmonieMutuelle.step({ stFinVerifDataGRC: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stFinVerifDataGRC: ');
	sc.endScenario();
	return;
}});

