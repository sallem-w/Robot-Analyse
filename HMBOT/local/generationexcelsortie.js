
/** Description */
GRCHarMu.scenario({ scGenerationFichierSortie :function(ev, sc) {
	var data = sc.data;
	sc.onTimeout(35000, function(sc, st) { sc.endScenario();	}); // default timeout handler for each step
	sc.onError(function(sc, st, ex) { sc.endScenario();	}); // default error handler
	sc.setMode(e.scenario.mode.clearIfRunning);
	// add steps here...
	
	sc.step(GRCHarMu.steps.stInitCopieFichierSortie);
	sc.step(GRCHarMu.steps.stCreationFichierDeSortie);
	sc.step(GRCHarMu.steps.stCopiePPCourante);
	sc.step(GRCHarMu.steps.stCopieDataExcel);
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
	data.ppCouranteAnalyse.dataFichiers.nomFichierSortie =  nameFichierResultat + data.ppCouranteAnalyse.dataFichiers.nomFichierSortie;
	try{
		//open de template de sortie
		ctx.excel.file.open(data.ppCouranteAnalyse.dataFichiers.cheminTemplateExcel + data.ppCouranteAnalyse.dataFichiers.nomTemplateSortie);
		//save as dans le répertoire analyse
		ctx.excel.file.saveAs(data.ppCouranteAnalyse.dataFichiers.cheminResultats +  data.ppCouranteAnalyse.dataFichiers.nomFichierSortie);
	}catch(ex){
		ctx.traceF.errorTxt('Erreur création fichier de sortie');
	}
	sc.endStep();
	return;
}});


/** Description */
GRCHarMu.step({ stCopiePPCourante: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stCopiePPCourante: ');
	ctx.excel.getWorkbook(data.ppCouranteAnalyse.dataFichiers.nomFichierResultatAnalyse);
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
	//vérifier la valeur de champs contexteAnalyseStoppee
	var contexteAnalyseStoppee = ctx.excel.sheet.getCell(data.ppCouranteAnalyse.dataLocale.indexDeb, data.scenarioConfig.ANALYSE.excel.indexColonne.contexteAnalyseStoppee);
	if(contexteAnalyseStoppee === ctx.notes.constantes.statuts.CreationPPInconnue || contexteAnalyseStoppee === ctx.notes.constantes.statuts.CréationPasDeContratActif){
		data.ppCouranteAnalyse.dataLocale.statusCreation = true;
	}
	//data.ppCouranteAnalyse.dataLocale.tabAdhesions = ctx.excel.sheet.getRangeValues('A' + data.ppCouranteAnalyse.dataLocale.indexDeb + ':' + data.varGlobales.carFinIndexCol + '' + data.ppCouranteAnalyse.dataLocale.indexFin + '');
	sc.endStep();
	return;
}});




/** Description */
GRCHarMu.step({ stCopieDataExcel: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stCopieDataExcel: Copie des données dans le fichier de sortie');
	//faut vérifier l'existance des deux feuilles excel "Analyse à traiter" et "Analyse - Transmis"
	try{
		if(data.ppCouranteAnalyse.dataLocale.statusCreation === true){
			for (var i = data.ppCouranteAnalyse.dataLocale.indexDeb; i <= data.ppCouranteAnalyse.dataLocale.indexFin; i++){
				for (var j in data.ppCouranteAnalyse.dataLocale.tabDataExcelS){
					var tabSj = data.ppCouranteAnalyse.dataLocale.tabDataExcelS[j].split(':');
					if(Number(tabSj[0]) !== -1 && Number(tabSj[1]) !== -1){
						ctx.excel.getWorkbook(data.ppCouranteAnalyse.dataFichiers.nomFichierResultatAnalyse);
						//copie de fichier résultat technique la cellule cell(i, numeric(tabSj[1]))
						var val = ctx.excel.sheet.getCell(i, Number(tabSj[1]));
						if(val !== undefined){
							ctx.excel.getWorkbook(data.ppCouranteAnalyse.dataFichiers.nomFichierSortie);
							ctx.excel.sheet.activate('Analyse - Transmis');
							//coller dans le fichier de sortie la cellule cell (i, numeric(tabSj[0])
							ctx.excel.sheet.setCell(i, Number(tabSj[0]), val);
						}
					}
				}
			}
			ctx.excel.file.save();
			ctx.excel.getWorkbook(data.ppCouranteAnalyse.dataFichiers.nomFichierResultatAnalyse);
		}else{
			for (var i = data.ppCouranteAnalyse.dataLocale.indexDeb; i <= data.ppCouranteAnalyse.dataLocale.indexFin; i++){
				for (var j in data.ppCouranteAnalyse.dataLocale.tabDataExcelS){
					var tabSj = data.ppCouranteAnalyse.dataLocale.tabDataExcelS[j].split(':');
					if(Number(tabSj[0]) !== -1 && Number(tabSj[1]) !== -1){
						ctx.excel.getWorkbook(data.ppCouranteAnalyse.dataFichiers.nomFichierResultatAnalyse);
						//copie de fichier résultat technique la cellule cell(i, numeric(tabSj[1]))
						var val = ctx.excel.sheet.getCell(i, Number(tabSj[1]));
						if(val !== undefined){
							ctx.excel.getWorkbook(data.ppCouranteAnalyse.dataFichiers.nomFichierSortie);
							ctx.excel.sheet.activate('Analyse à traiter');
							//coller dans le fichier de sortie la cellule cell (i, numeric(tabSj[0])
							ctx.excel.sheet.setCell(i, Number(tabSj[0]), val);
						}
						
					}
				}
			}
			ctx.excel.file.save();
			ctx.excel.getWorkbook(data.ppCouranteAnalyse.dataFichiers.nomFichierResultatAnalyse);
		}
	}catch(ex){
		ctx.traceF.errorTxt('Erreur copie dans le fichier de sortie');
	}
	sc.endStep();
	return;
}});


/** Description */
GRCHarMu.step({ stCopiePPSuivante: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stCopiePPSuivante: Rebouclage sur la PP Suivante');
	ctx.traceF.infoTxt('index debut : index fin: '+data.ppCouranteAnalyse.dataLocale.indexDeb+' : '+data.ppCouranteAnalyse.dataLocale.indexFin+'');
	data.varGlobales.ligneCourante = data.ppCouranteAnalyse.dataLocale.indexFin + 1;
	data.ppCouranteAnalyse.dataLocale.statusCreation = false;
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