
/** Description */
GRCHarMu.scenario({ scVerifDataGRC: function(ev, sc) {
	var data = sc.data;
	sc.onTimeout(30000, function(sc, st) { sc.endScenario();	}); // default timeout handler for each step
	sc.onError(function(sc, st, ex) { sc.endScenario();	}); // default error handler
	sc.setMode(e.scenario.mode.clearIfRunning);
	// add steps here...

	sc.step(GRCHarMu.steps.stInitRobot);
	sc.step(GRCHarMu.steps.stConfigFichiersExcel);
	sc.step(ActivInfinitev7.steps.stDemarrageServeurInfinite);
	sc.step(GRCHarMu.steps.stLireDataConfig);
	sc.step(GRCHarMu.steps.stInitVerificationGRC);
	sc.step(GRCHarMu.steps.stLireDataPPIAE);
	sc.step(GRCHarMu.steps.stRechercheProduitHPP);
	
	sc.step(GRCHarMu.steps.stVerificationGRC); //dans la fin de ce step on vérifie si on va analyser la 1ere PP sur infinite ou non c'est une PP > 2
  sc.step(GRCHarMu.steps.stRechercheEtAnalysePP);  //scénario analyse et recherche de la pp
	sc.step(GRCHarMu.steps.stDeuxiemeTentativeSurSiebel);
	sc.step(GRCHarMu.steps.stDeuxiemeTentativeSurInfinite);
  sc.step(GRCHarMu.steps.stInsertionDonneesAnalyseExcel);
	sc.step(GRCHarMu.steps.stCopieFiltrageAdhesionsDansExcel);
	sc.step(GRCHarMu.steps.stScenarioCopieFiltrageExcel);
 	sc.step(GRCHarMu.steps.stLireDataPPSuivanteIAE);
	//sc.step(GRCHarMu.steps.stCopieFichierSortie);
	sc.step(GRCHarMu.steps.stFinVerifDataGRC);
}});

/** Description */
GRCHarMu.step({ stInitRobot: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stInitRobot: Initialisation robot principale');
	sc.endStep();
	return;
}});


/** Description */
GRCHarMu.step({ stConfigFichiersExcel: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Initialisation des données d\'entrée: Configuration des fichiers');
	st.disableTimeout();
	GRCHarMu.scenarios.scGestionFichiersExcelConfig.start(data).onEnd(function(sc2) {
		sc.data=sc2.data;
		ctx.traceF.infoTxt('Etape stConfigFichiersExcel: Fin scénario configuration Excel et JSON');
		sc.endStep();
	});
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
		//data.ppCouranteAnalyse.dataLocale.tabGammeCode[i]=gc;
	}
	ctx.traceF.infoTxt('Chargement des numéros des produits (10 produits)');
	data.ppCouranteAnalyse.dataLocale.tabProduits = data.scenarioConfig.ANALYSE.listeProduits;
	
	//récupération des data excel du sortie
/*	var tabS = {colS: '', colT: '', libS:'', libT: ''};
	tabS = data.scenarioConfig.ANALYSE.excelSortie;
	var exS;
	for (var i in tabS){
		exS = tabS[i].colS+':'+tabS[i].colT+':'+tabS[i].libS+':'+tabS[i].libT;
		data.ppCouranteAnalyse.dataLocale.tabDataExcelS.push(exS);
		//data.ppCouranteAnalyse.dataLocale.tabDataExcelS[i]=exS;
	}*/
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
			//lire le numéro de séquence (lu avec l'adhérent principale
			data.ppCouranteAnalyse.dataLocale.numSEQ =  ctx.excel.sheet.getCell(data.varGlobales.ligneCourante, data.scenarioConfig.ANALYSE.excel.indexColonne.numSEQ); 
			//lire nom, prénom, date naissace, numRO
			
	  	data.ppCouranteAnalyse.dataLocale.nom = ctx.excel.sheet.getCell(data.varGlobales.ligneCourante, data.scenarioConfig.ANALYSE.excel.indexColonne.nom);
	  	data.ppCouranteAnalyse.dataLocale.prenom = ctx.excel.sheet.getCell(data.varGlobales.ligneCourante, data.scenarioConfig.ANALYSE.excel.indexColonne.prenom);
	  	data.ppCouranteAnalyse.dataLocale.dateDeNaissance = ctx.excel.sheet.getCell(data.varGlobales.ligneCourante, data.scenarioConfig.ANALYSE.excel.indexColonne.dateDeNaissance);
			data.ppCouranteAnalyse.dataLocale.numeroRO = ctx.excel.sheet.getCell(data.varGlobales.ligneCourante, data.scenarioConfig.ANALYSE.excel.indexColonne.numeroRO);
			//lire la liste des produits (pour tous les bénéficiares)
			/**
			*
			* Recupération de la liste des produits de l'adhérent principale et des autres bénéficiaires (les collonnes allant de BD à BM)
			*
			*/
			var j = data.scenarioConfig.ANALYSE.excel.indexColonne.numProduit1;
			var k = data.scenarioConfig.ANALYSE.excel.indexColonne.numProduit10;
			var numProdPC = '';
			var tempLigneCourante = data.varGlobales.ligneCourante;
			data.ppCouranteAnalyse.dataLocale.tabProduitsPrinConj = [];
			while(tempLigneCourante <= data.varGlobales.indexDerniereLigne && data.ppCouranteAnalyse.dataLocale.numSEQ ===ctx.excel.sheet.getCell(tempLigneCourante, data.scenarioConfig.ANALYSE.excel.indexColonne.numSEQ)){
				numProdPC = '';
				for(var i =j; i<= k; i++){
					var cellContent = ctx.excel.sheet.getCell(tempLigneCourante, i);
					if(cellContent !== undefined){
						numProdPC += ctx.excel.sheet.getCell(tempLigneCourante, i)+':';
					}
				}
				data.ppCouranteAnalyse.dataLocale.tabProduitsPrinConj.push(numProdPC);
				tempLigneCourante ++;
				data.ppCouranteAnalyse.dataLocale.indexFin += 1;
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
	/*
	*
	* Voir si la Produit HPP EXISTE ou non
	* Voir si le produit HPP Existe la gamme (colonne BC) est compatible ou non 
	*
	*/
	for (var j in data.ppCouranteAnalyse.dataLocale.tabProduitsPrinConj){
		var jProduits = data.ppCouranteAnalyse.dataLocale.tabProduitsPrinConj[j];
		for(var i in data.ppCouranteAnalyse.dataLocale.tabProduits){	//liste des 10 produits dans la config JSON
			var iProduit = data.ppCouranteAnalyse.dataLocale.tabProduits[i];
			if(jProduits.indexOf(iProduit)!== -1){
				data.ppCouranteAnalyse.dataEnLigne.HPPExiste = true;
				data.ppCouranteAnalyse.notes.presenceHPP = 'Oui';
				break;
			}
		}
	}
	//vérification de la compatibilité des gammes
	for(var i in data.ppCouranteAnalyse.dataLocale.tabGammeCode){ //liste des gammes, codes, comp du fichier de config JSON
		res = data.ppCouranteAnalyse.dataLocale.tabGammeCode[i].split(':');
		if(res[0] === data.ppCouranteAnalyse.dataLocale.gammeProduit && res[2] === '1'){
			data.ppCouranteAnalyse.dataLocale.codeOffre = res[1];
			data.ppCouranteAnalyse.dataEnLigne.produitGammeCompatible = true;
			break;
		}
	}
	if(data.ppCouranteAnalyse.notes.presenceHPP === true){
		data.ppCouranteAnalyse.notes.contexteAnalyseStoppee = 'Création contrat - produit HPP existe';
		sc.endStep(GRCHarMu.steps.stInsertionDonneesAnalyseExcel);
		return;
	}else{
		sc.endStep();
		return;
	}
}});


/** Description */
GRCHarMu.step({ stVerificationGRC: function(ev, sc, st) {
	var data = sc.data;
	//extraction de numéro de l'adhésion

	ctx.traceF.infoTxt('************* Début scénario Analyse Data GRC Siebel *************');
	st.disableTimeout();
	GRCHarMu.scenarios.scAnalyseDataGRC.start(data).onEnd(function(sc2) {
		sc.data=sc2.data;
		ctx.traceF.infoTxt('************* Fin scénario Analyse Data GRC Siebel *************');
		//ActivInfinitev7.pTabDeBord.activate();
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
	//	GRCHarMu.pRechercheAI.activate();
		sc.endStep();
	});
}});


/** Description */
GRCHarMu.step({ stDeuxiemeTentativeSurSiebel: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stDeuxiemeTentativeSurSiebel: Vérification de traitement de la PP courante avec la première tentative sur Siebel');
	if(data.ppCouranteAnalyse.notes.contexteAnalyseStoppee === ctx.notes.constantes.statuts.AdhNonAnalyseeGRC && data.ppCouranteAnalyse.dataLocale.tentativeTraitGRC < 2){
		ctx.traceF.infoTxt('**//**//**//**//**//**//**//**//**//**//**//**//**//**//**// Retraitement de la ligne courante (2éme tentative sur Siebel) **//**//**//**//**//**//**//**//**//**//**//**//**//**//**//');
		data.ppCouranteAnalyse.dataLocale.tentativeTraitGRC += 1;
		sc.endStep(GRCHarMu.steps.stVerificationGRC);
	  return;
	}else if(data.ppCouranteAnalyse.notes.contexteAnalyseStoppee === ctx.notes.constantes.statuts.AdhNonAnalyseeGRC && data.ppCouranteAnalyse.dataLocale.tentativeTraitGRC === 2){ //passer à la ligne suivante sans faire l'analyse sur Infinite
		sc.endStep(GRCHarMu.steps.stFinVerifGRC);
	  return;
	}else{
		data.ppCouranteAnalyse.dataLocale.tentativeTraitGRC = 1;
		sc.endStep();
		return;
	}
}});


/** O done une deuxième tentative sur siebel, sur Ifinite après on passe à la ligne suivante */
GRCHarMu.step({ stDeuxiemeTentativeSurInfinite: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stDeuxiemeTentativeSurInfinite : Vérification de traitement de la PP courante avec la première tentative sur Infinite');
	
	
	if(data.ppCouranteAnalyse.notes.contexteAnalyseStoppee === ctx.notes.constantes.statuts.AdhNonAnalysee && data.ppCouranteAnalyse.dataLocale.tentativeTraitInfinite < 2){
		ctx.traceF.infoTxt('**//**//**//**//**//**//**//**//**//**//**//**//**//**//**// Retraitement de la ligne courante (2éme tentative sur Infinite) **//**//**//**//**//**//**//**//**//**//**//**//**//**//**//');
		//donner une deuxième chance et reboucler
		data.ppCouranteAnalyse.dataLocale.tentativeTraitInfinite += 1;
		//mise à jour des variables
		//data.ppCouranteAnalyse.dataEnLigne.HPPExiste = false;
		//data.ppCouranteAnalyse.dataEnLigne.produitGammeCompatible = false;
		data.ppCouranteAnalyse.notes.gestionControl = 'Non',
		//data.ppCouranteAnalyse.notes.presenceHPP = 'Non';
		data.ppCouranteAnalyse.notes.paiementAdhesion = 'Non';
		data.ppCouranteAnalyse.notes.clauseBenefAdh = 'Non';
		data.ppCouranteAnalyse.notes.clauseBenefConjoint = 'Non';
		data.ppCouranteAnalyse.notes.dateEffetAControler = 'Non';
		data.ppCouranteAnalyse.notes.contexteAnalyseStoppee = '';
		data.ppCouranteAnalyse.notes.payeurEgSouscripteur = '';
		
		data.ppCouranteAnalyse.dataEnLigne.civilitePayeur = '';
		data.ppCouranteAnalyse.dataEnLigne.nomPayeur = '';
		data.ppCouranteAnalyse.dataEnLigne.prenomPayeur = '';
		data.ppCouranteAnalyse.dataEnLigne.appPayeur = '';
		data.ppCouranteAnalyse.dataEnLigne.batPayeur = '';
		data.ppCouranteAnalyse.dataEnLigne.voiePayeur = '';
		data.ppCouranteAnalyse.dataEnLigne.lieuDitPayeur = '';
		data.ppCouranteAnalyse.dataEnLigne.cpPayeur = '';
		data.ppCouranteAnalyse.dataEnLigne.villePayeur = '';
		data.ppCouranteAnalyse.dataEnLigne.cedexPayeur = '';
		data.ppCouranteAnalyse.dataEnLigne.paysPayeur = '';
		//reboucler à partir de l'appel du scénario vérififcation analyse GRC en principe, mais la le sc GRC est désactivé, donc rebouclage sur scénario infinite
		sc.endStep(GRCHarMu.steps.stRechercheEtAnalysePP);
	  return;
	}else{
		data.ppCouranteAnalyse.dataLocale.tentativeTraitInfinite = 1;
		sc.endStep();
		return;
	}
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
			},{
				columnIndex: data.scenarioConfig.ANALYSE.excel.indexColonne.dateEffetAControler, value: data.ppCouranteAnalyse.notes.dateEffetAControler
			},{
				columnIndex: data.scenarioConfig.ANALYSE.excel.indexColonne.payeurSouscriptDifferent, value: data.ppCouranteAnalyse.notes.payeurEgSouscripteur 
			},{
				columnIndex: data.scenarioConfig.ANALYSE.excel.indexColonne.civilitePayeur, value: data.ppCouranteAnalyse.dataEnLigne.civilitePayeur 
			},{
				columnIndex: data.scenarioConfig.ANALYSE.excel.indexColonne.nomPayeur, value: data.ppCouranteAnalyse.dataEnLigne.nomPayeur 
			},{
				columnIndex: data.scenarioConfig.ANALYSE.excel.indexColonne.prenomPayeur, value: data.ppCouranteAnalyse.dataEnLigne.prenomPayeur
			},{
				columnIndex: data.scenarioConfig.ANALYSE.excel.indexColonne.appPayeur, value: data.ppCouranteAnalyse.dataEnLigne.appPayeur 
			},{
				columnIndex: data.scenarioConfig.ANALYSE.excel.indexColonne.batPayeur, value: data.ppCouranteAnalyse.dataEnLigne.batPayeur 
			},{
				columnIndex: data.scenarioConfig.ANALYSE.excel.indexColonne.voiePayeur, value: data.ppCouranteAnalyse.dataEnLigne.voiePayeur 
			},{
				columnIndex: data.scenarioConfig.ANALYSE.excel.indexColonne.lieuDitPayeur, value: data.ppCouranteAnalyse.dataEnLigne.lieuDitPayeur 
			},{
				columnIndex: data.scenarioConfig.ANALYSE.excel.indexColonne.cpPayeur, value: data.ppCouranteAnalyse.dataEnLigne.cpPayeur 
			},{
				columnIndex: data.scenarioConfig.ANALYSE.excel.indexColonne.villePayeur, value: data.ppCouranteAnalyse.dataEnLigne.villePayeur 
			},{
				columnIndex: data.scenarioConfig.ANALYSE.excel.indexColonne.cedexPayeur, value: data.ppCouranteAnalyse.dataEnLigne.cedexPayeur 
			},{
				columnIndex: data.scenarioConfig.ANALYSE.excel.indexColonne.paysPayeur, value: data.ppCouranteAnalyse.dataEnLigne.paysPayeur 
			}
  ];
  ctx.excelF.remplirObjetTableau(data.varGlobales.ligneCourante, arrayMessage);
  ctx.excelF.sauverFichier(ctx.configF.cheminFichierResultat);
	sc.endStep();
	return;
}});


/** Description */
GRCHarMu.step({ stCopieFiltrageAdhesionsDansExcel: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stCopieFiltrageAdhesionsDansExcel: Vérification de la taille de blocs à copier');
	if(data.ppCouranteAnalyse.dataLocale.nbAdhesion < 10 && data.ppCouranteAnalyse.notes.contexteAnalyseStoppee !== ctx.notes.constantes.statuts.AdhNonAnalysee){
		data.ppCouranteAnalyse.dataLocale.nbAdhesion +=1;
	}
	if(data.ppCouranteAnalyse.dataLocale.nbAdhesion === 10 || data.varGlobales.ligneCourante === data.varGlobales.indexDerniereLigne ){
		sc.endStep();
		return;
	}else{
		sc.endStep(GRCHarMu.steps.stLireDataPPSuivanteIAE);
		return;
	}
}});


/** Description */
GRCHarMu.step({ stScenarioCopieFiltrageExcel: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stScenarioCopieFiltrageExcel: Copie des 10 adhésions analysées');
	st.disableTimeout();
	GRCHarMu.scenarios.scCopieFiltrageExcel.start(data).onEnd(function(sc2) {
		sc.data=sc2.data;
		ctx.traceF.infoTxt('************* Fin scénario ScenarioCopieFiltrageExcel *************');
		sc.endStep();
	});
}});


/** Description */
GRCHarMu.step({ stLireDataPPSuivanteIAE: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stLireDataPPSuivanteIAE: lecture des données de la PP suivante du fichier IAE');
	//on vérifie si le commentaire === problème o incrément pas la ligneCourant
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
		data.ppCouranteAnalyse.notes.dateEffetAControler = 'Non';
		data.ppCouranteAnalyse.notes.contexteAnalyseStoppee = '';
		data.ppCouranteAnalyse.notes.payeurEgSouscripteur = '';
		
		data.ppCouranteAnalyse.dataEnLigne.civilitePayeur = '';
		data.ppCouranteAnalyse.dataEnLigne.nomPayeur = '';
		data.ppCouranteAnalyse.dataEnLigne.prenomPayeur = '';
		data.ppCouranteAnalyse.dataEnLigne.appPayeur = '';
		data.ppCouranteAnalyse.dataEnLigne.batPayeur = '';
		data.ppCouranteAnalyse.dataEnLigne.voiePayeur = '';
		data.ppCouranteAnalyse.dataEnLigne.lieuDitPayeur = '';
		data.ppCouranteAnalyse.dataEnLigne.cpPayeur = '';
		data.ppCouranteAnalyse.dataEnLigne.villePayeur = '';
		data.ppCouranteAnalyse.dataEnLigne.cedexPayeur = '';
		data.ppCouranteAnalyse.dataEnLigne.paysPayeur = '';
		
		sc.endStep(GRCHarMu.steps.stLireDataPPIAE);
	  return;
	}
}});

/** Description */
GRCHarMu.step({ stCopieFichierSortie: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stCopieFichierSortie: Copie de la ligne dans le fichier de sortie');
	st.disableTimeout();
	GRCHarMu.scenarios.scGenerationFichierSortie.start(data).onEnd(function(sc2) {
		sc.data=sc2.data;
		ctx.traceF.infoTxt('************* Fin insertion ième ligne dans le fichier de sortie  *************');
		sc.endStep();
	});
}});

/** Description */
GRCHarMu.step({ stFinVerifDataGRC: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('');
  ctx.popupF.finTraitement('Analyse'); 

	ctx.traceF.infoTxt('Etape stFinVerifDataGRC: Fin scénario principale');
	sc.endScenario();
	return;
}});

