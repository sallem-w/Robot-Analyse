
/** Description */
GRCHarMu.scenario({ scVerifDataGRC: function(ev, sc) {
	var data = sc.data;
	sc.onTimeout(30000, function(sc, st) { sc.endScenario();	}); // default timeout handler for each step
	sc.onError(function(sc, st, ex) { sc.endScenario();	}); // default error handler
	sc.setMode(e.scenario.mode.clearIfRunning);
	// add steps here...

	sc.step(GRCHarMu.steps.stInitRobot);
	sc.step(ActivInfinitev7.steps.stDemarrageServeurInfinite);
  //sc.step(ActivInfinitev7.steps.stDemarrageServeurInfinite); //cette étape permet de récupérer l'URL de tab de bord
	sc.step(GRCHarMu.steps.stLireDataConfig);
	sc.step(GRCHarMu.steps.stInitVerificationGRC);
	sc.step(GRCHarMu.steps.stLireDataPPIAE);
	sc.step(GRCHarMu.steps.stRechercheProduitHPP);
	
	sc.step(GRCHarMu.steps.stVerificationGRC); //dans la fin de ce step on vérifie si on va analyser la 1ere PP sur infinite ou non c'est une PP > 2
  //sc.step(GRCHarMu.steps.stDemarrageServeurInfinite);
  sc.step(GRCHarMu.steps.stRechercheEtAnalysePP);  //scénario analyse et recherche de la pp
  sc.step(GRCHarMu.steps.stInsertionDonneesAnalyseExcel);
 	sc.step(GRCHarMu.steps.stLireDataPPSuivanteIAE);
	sc.step(GRCHarMu.steps.stFinVerifDataGRC);
	
}});

/** Description */
GRCHarMu.step({ stInitRobot: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stInitRobot: ');
	ctx.dataF.initialisationScenarioAnalyse(data,ctx.configF.scenario.Analyse); 
	sc.endStep();
	return;
}});

/** Description */
GRCHarMu.step({ stLireDataConfig: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stLireDataConfig: lecture des données de configuration du fichier .JSON');
	var tab = {code: '', gamme: '', compatible:''};
	tab = data.scenarioConfig.ANALYSE.tabGammeCode;
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
GRCHarMu.step({ stInitVerificationGRC: function(ev, sc, st) {
	var data = sc.data;
	ctx.siebel.navigateView(GRCHarMu.pRechercheAI);
	sc.endStep();
	return;
}});

/** Description */
GRCHarMu.step({ stLireDataPPIAE: function(ev, sc, st) {
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
			//lire nom, prénom, date naissace, numRO
			
	  	data.ppCouranteAnalyse.dataLocale.nom = ctx.excel.sheet.getCell(data.varGlobales.ligneCourante, data.scenarioConfig.ANALYSE.excel.indexColonne.nom);
	  	data.ppCouranteAnalyse.dataLocale.prenom = ctx.excel.sheet.getCell(data.varGlobales.ligneCourante, data.scenarioConfig.ANALYSE.excel.indexColonne.prenom);
	  	data.ppCouranteAnalyse.dataLocale.dateDeNaissance = ctx.excel.sheet.getCell(data.varGlobales.ligneCourante, data.scenarioConfig.ANALYSE.excel.indexColonne.dateDeNaissance);
			data.ppCouranteAnalyse.dataLocale.numeroRO = ctx.excel.sheet.getCell(data.varGlobales.ligneCourante, data.scenarioConfig.ANALYSE.excel.indexColonne.numeroRO);
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
			sc.endStep(GRCHarMu.steps.stLireDataPPSuivanteIAE);
			return;
		}
	}
}});


/** Description */
GRCHarMu.step({ stRechercheProduitHPP: function(ev, sc, st) {
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
GRCHarMu.step({ stVerificationGRC: function(ev, sc, st) {
	var data = sc.data;
	//extraction de numéro de l'adhésion

	ctx.traceF.infoTxt('************* Début scénario Analyse Data GRC Siebel *************');
	st.disableTimeout();
	GRCHarMu.scenarios.scAnalyseDataGRC.start(data).onEnd(function(sc3) {
		sc.data=sc3.data;
		ctx.traceF.infoTxt('************* Fin scénario Analyse Data GRC Siebel *************');
		ActivInfinitev7.pTabDeBord.activate();
		sc.endStep();
	});
}});


/** Description */
GRCHarMu.step({ stRechercheEtAnalysePP: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('************* Début scénario recherche et analyse situation PP *************');
	st.disableTimeout();
	ActivInfinitev7.scenarios.scRechercheAnalysePP.start(data).onEnd(function(sc2){
		sc.data=sc2.data;
		ctx.traceF.infoTxt('************* Fin scénario recherche et analyse situation PP *************');
		GRCHarMu.pRechercheAI.activate();
		sc.endStep();
	});
}});



/** Description */
GRCHarMu.step({ stInsertionDonneesAnalyseExcel : function(ev, sc, st) {
	var data = sc.data;
	var dateTrait = ctx.getDate();
	ctx.traceF.infoTxt('Etape stInsertionDonneesAnalyseExcel - Insertion des données dans le fichier résultat: '+data.ppCouranteAnalyse.dataLocale.referenceGRC);
	var compGammeCode = data.ppCouranteAnalyse.notes.presenceHPP;
	if(data.ppCouranteAnalyse.notes.presenceHPP === 'Oui'){ 
		if(data.ppCouranteAnalyse.dataEnLigne.produitGammeCompatible){
			compGammeCode += ' compatible';
		}else{
			compGammeCode += '/Non compatible';
		}
	}
	 var arrayMessage = [ {
      columnIndex: data.scenarioConfig.ANALYSE.excel.indexColonne.contexteAnalyseStoppee, value: data.ppCouranteAnalyse.notes.contexteAnalyseStoppee
      },{
				columnIndex: data.scenarioConfig.ANALYSE.excel.indexColonne.dateTraitementAnalyse, value: dateTrait
			},{
				columnIndex: data.scenarioConfig.ANALYSE.excel.indexColonne.presenceHPP, value: compGammeCode
			},{
				columnIndex: data.scenarioConfig.ANALYSE.excel.indexColonne.paiementAdhesion, value: data.ppCouranteAnalyse.notes.paiementAdhesion
			},{
				columnIndex: data.scenarioConfig.ANALYSE.excel.indexColonne.controleGestion, value: data.ppCouranteAnalyse.notes.gestionControl
			},{
				columnIndex: data.scenarioConfig.ANALYSE.excel.indexColonne.clauseBenefAdh, value: data.ppCouranteAnalyse.notes.clauseBenefAdh
			},{
				columnIndex: data.scenarioConfig.ANALYSE.excel.indexColonne.clauseBenefConjoint, value: data.ppCouranteAnalyse.notes.clauseBenefConjoint
			}
  ];
  ctx.excelF.remplirObjetTableau(data.varGlobales.ligneCourante, arrayMessage);
  ctx.excelF.sauverFichier(ctx.configF.cheminFichierResultat);
	sc.endStep();
	return;
}});


/** Description */
GRCHarMu.step({ stLireDataPPSuivanteIAE: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stLireDataPPSuivanteIAE: lecture des données de la PP suivante du fichier IAE');
	data.varGlobales.ligneCourante += 1;
	if(data.varGlobales.ligneCourante > data.varGlobales.indexDerniereLigne){    // cas général
		sc.endStep();
		return;
	}else{
		data.ppCouranteAnalyse.dataEnLigne.HPPExiste = false;
		data.ppCouranteAnalyse.dataEnLigne.produitGammeCompatible = false;
		data.ppCouranteAnalyse.notes.gestionControl = 'Non',
		data.ppCouranteAnalyse.notes.presenceHPP = 'Non';
		data.ppCouranteAnalyse.notes.paiementAdhesion = 'Non';
		data.ppCouranteAnalyse.notes.clauseBenefAdh = 'Non';
		data.ppCouranteAnalyse.notes.clauseBenefConjoint = 'Non';
		sc.endStep(GRCHarMu.steps.stLireDataPPIAE);
	  return;
	}
}});



/** Description */
GRCHarMu.step({ stFinVerifDataGRC: function(ev, sc, st) {
	var data = sc.data;
	//ctx.traceF.infoTxt('Etape stFinVerifDataGRC: ');
	
	sc.endScenario();
	return;
}});

