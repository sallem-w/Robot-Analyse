
/** Description */
GRCHarMu.scenario({ scGenerationFichierSortie :function(ev, sc) {
	var data = sc.data;
	sc.onTimeout(30000, function(sc, st) { sc.endScenario();	}); // default timeout handler for each step
	sc.onError(function(sc, st, ex) { sc.endScenario();	}); // default error handler
	sc.setMode(e.scenario.mode.clearIfRunning);
	// add steps here...
	
	sc.step(GRCHarMu.steps.stInitCopieFichierSortie);
	sc.step(GRCHarMu.steps.stCreationFichierDeSortie);
	sc.step(GRCHarMu.steps.stCopiePPCourante);
	//sc.step(GRCHarMu.steps.stCopieDataExcel);
	sc.step(GRCHarMu.steps.stCopiePPSuivante);
	sc.step(GRCHarMu.steps.stFinCopieFichierSortie);
	
}});



/** Description */
GRCHarMu.step({ stInitCopieFichierSortie: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stInitCopieFichierSortie: Initialisation de la copie dans le fichier de sortie');
	//mise à jour de l'indice de la ligne 
	data.varGlobales.ligneCourante = 2 ;
	data.ppCouranteAnalyse.dataLocale.numSEQ = '';
	data.ppCouranteAnalyse.dataLocale.typeAssure = '';
	//data.ppCouranteAnalyse.dataLocale.indexDeb = data.varGlobales.ligneCourante;
	//data.ppCouranteAnalyse.dataLocale.indexFin = data.varGlobales.ligneCourante;
	
	sc.endStep();
	return;
}});

/** Description */
GRCHarMu.step({ stCreationFichierDeSortie: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stCreationFichierDeSortie: Creation de fichier de sortie fichier de sortie');
	var maDate = ctx.getDate()+'';
	var nameFichierResultat = maDate.substr(0,4)+''+maDate.substr(5,2)+''+maDate.substr(8,2)+'_';
	/*try{
		//open de template de sortie
		//ctx.excel.file.open(data.ppCouranteAnalyse.dataFichiers.cheminTemplateSortie + data.ppCouranteAnalyse.dataFichiers.nomTemplateSortie);
		//save as dans le répertoire analyse
		//ctx.excel.file.saveAs(data.ppCouranteAnalyse.dataFichiers.cheminRacine + extensionFichierS + data.ppCouranteAnalyse.dataFichiers.nomFichierSortie);
	}catch(ex){
		ctx.traceF.errorTxt('Template de sortie introuvable');
	}*/
	sc.endStep();
	return;
}});


/** Description */
GRCHarMu.step({ stCopiePPCourante: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stCopiePPCourante: ');
	data.ppCouranteAnalyse.dataLocale.numSEQ =  ctx.excel.sheet.getCell(data.varGlobales.ligneCourante, data.scenarioConfig.ANALYSE.excel.indexColonne.numSEQ); 
	data.ppCouranteAnalyse.dataLocale.indexDeb = data.varGlobales.ligneCourante;
	var numSeqTemp = data.ppCouranteAnalyse.dataLocale.numSEQ;
	var temp_ligne = data.varGlobales.ligneCourante;
	while(numSeqTemp !== undefined && data.ppCouranteAnalyse.dataLocale.numSEQ === numSeqTemp){
		temp_ligne += 1;
		numSeqTemp = ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.ANALYSE.excel.indexColonne.numSEQ); 
	}
	data.ppCouranteAnalyse.dataLocale.indexFin = temp_ligne - 1;
	//récupération des données
	data.ppCouranteAnalyse.dataLocale.tabAdhesions = ctx.excel.sheet.getRangeValues(''+data.ppCouranteAnalyse.dataLocale.indexDeb+':'+data.ppCouranteAnalyse.dataLocale.indexFin+'');
	sc.endStep();
	return;
}});




/** Description */
GRCHarMu.step({ stCopieDataExcel: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stCopieDataExcel: Copie des données dans le fichier de sortie');
	//faut vérifier l'existance des deux feuilles excel "Analyse à traiter" et "Analyse - Transmis"
	/*try{
		
	}catch(ex){
		
	}*/
	sc.endStep();
	return;
}});


/** Description */
GRCHarMu.step({ stCopiePPSuivante: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stCopiePPSuivante: Rebouclage sur la PP Suivante');
	ctx.traceF.infoTxt('index debut : index fin: '+data.ppCouranteAnalyse.dataLocale.indexDeb+' : '+data.ppCouranteAnalyse.dataLocale.indexFin+'');
	data.varGlobales.ligneCourante = data.ppCouranteAnalyse.dataLocale.indexFin + 1;
//	if(data.varGlobales.ligneCourante < data.varGlobales.indexDerniereLigne){    // cas général
//		data.varGlobales.ligneCourante = data.ppCouranteAnalyse.dataLocale.indexFin + 1;
//	}
	if(data.varGlobales.ligneCourante <= data.varGlobales.indexDerniereLigne){
		sc.endStep(GRCHarMu.steps.stCopiePPCourante);
		return;
	}else{
		sc.endStep();
		return;
	}
}});


/** Description */
GRCHarMu.step({ stFinCopieFichierSortie: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stFinCopieFichierSortie: Fin création fichier résultat');
	sc.endScenario();
	return;
}});