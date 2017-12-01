
/** Description */
GRCHarMu.scenario({ scGenerationFichierSortie :function(ev, sc) {
	var data = sc.data;
	sc.onTimeout(30000, function(sc, st) { sc.endScenario();	}); // default timeout handler for each step
	sc.onError(function(sc, st, ex) { sc.endScenario();	}); // default error handler
	sc.setMode(e.scenario.mode.clearIfRunning);
	// add steps here...
	
	sc.step(GRCHarMu.steps.stInitCopieFichierSortie);
	//sc.step(GRCHarMu.steps.stCopiePPCourante);
	sc.step(GRCHarMu.steps.stCopieDataExcel);
	//sc.step(GRCHarMu.steps.stCopiePPSuivante);
	sc.step(GRCHarMu.steps.stFinCopieFichierSortie);
	
}});



/** Description */
GRCHarMu.step({ stInitCopieFichierSortie: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stInitCopieFichierSortie: Initialisation de la copie dans le fichier de sortie');
	//mise à jour de l'indice de la ligne 
/*	data.varGlobales.ligneCourante = 2 ;
	data.ppCouranteAnalyse.dataLocale.numSEQ = '';
	data.ppCouranteAnalyse.dataLocale.typeAssure = '';
	data.ppCouranteAnalyse.dataLocale.indexDeb = data.varGlobales.ligneCourante;
	data.ppCouranteAnalyse.dataLocale.indexFin = data.varGlobales.ligneCourante;
	*/
	sc.endStep();
	return;
}});


/** Description */
GRCHarMu.step({ stCopiePPCourante: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stCopiePPCourante: Début de la boucle d\'insertion des data dans le fichier de sortie');
	if(data.varGlobales.ligneCourante <= data.varGlobales.indexDerniereLigne){
		data.ppCouranteAnalyse.dataLocale.numSEQ =  ctx.excel.sheet.getCell(data.varGlobales.ligneCourante, data.scenarioConfig.ANALYSE.excel.indexColonne.numSEQ); 
		var tempLigneCourante = data.varGlobales.ligneCourante +1;
		if(tempLigneCourante <= data.varGlobales.indexDerniereLigne){
			var numSeqTemp = ctx.excel.sheet.getCell(tempLigneCourante, data.scenarioConfig.ANALYSE.excel.indexColonne.numSEQ); 
			if(numSeqTemp === data.ppCouranteAnalyse.dataLocale.numSEQ){
				data.ppCouranteAnalyse.dataLocale.indexFin +=1;
				sc.endStep(GRCHarMu.steps.stCopiePPSuivante);
				return;
			}else{
				//ici on fait la copie de cette adhésion et on met à jour les indices
				data.ppCouranteAnalyse.dataLocale.tabAdhesions = ctx.excel.sheet.getRangeValues(''+data.ppCouranteAnalyse.dataLocale.indexDeb+':'+data.ppCouranteAnalyse.dataLocale.indexFin+'');
				data.ppCouranteAnalyse.dataLocale.indexFin = data.ppCouranteAnalyse.dataLocale.indexDeb;
				data.ppCouranteAnalyse.dataLocale.indexFin += 1;
				data.ppCouranteAnalyse.dataLocale.indexDeb += 1;
				//on passe à l'étape suivante pour faire le ttt
				sc.endStep();
				return;
			}
		}else{
			  //ici on fait la copie de cette adhésion et on met à jour les indices
				data.ppCouranteAnalyse.dataLocale.tabAdhesions = ctx.excel.sheet.getRangeValues(''+data.ppCouranteAnalyse.dataLocale.indexDeb+':'+data.ppCouranteAnalyse.dataLocale.indexFin+'');
				/*data.ppCouranteAnalyse.dataLocale.indexFin = data.ppCouranteAnalyse.dataLocale.indexDeb;
				data.ppCouranteAnalyse.dataLocale.indexFin += 1;
				data.ppCouranteAnalyse.dataLocale.indexDeb += 1;
				*///on passe à l'étape suivante pour faire le ttt
				sc.endStep();
				return;
		}
	}else{
		sc.endStep(GRCHarMu.steps. stFinCopieFichierSortie);
		return;
	}
}});



/** Description */
GRCHarMu.step({ stCopieDataExcel: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stCopieDataExcel: ');
	//boucle sur tabAdhésion
	/*var tab = data.ppCouranteAnalyse.dataLocale.tabDataExcelS;
	for (var i in tab){
		ctx.log(tab[i]);
	}*/
	//boucle sur excelSortie
	sc.endStep();
	return;
}});


/** Description */
GRCHarMu.step({ stCopiePPSuivante: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stCopiePPSuivante: Rebouclage sur la PP Suivante');
	/*data.varGlobales.ligneCourante += 1;
	if(data.varGlobales.ligneCourante > data.varGlobales.indexDerniereLigne){    // cas général
		sc.endStep();
		return;
	}else{
		sc.endStep(GRCHarMu.steps.stCopiePPCourante);
		return;
	}*/
	sc.endStep();
	return;
}});

/** Description */
GRCHarMu.step({ stFinCopieFichierSortie: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stFinCopieFichierSortie: Fin création fichier résultat');
	sc.endScenario();
	return;
}});
