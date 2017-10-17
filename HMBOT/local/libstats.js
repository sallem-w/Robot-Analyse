ctx.statsF = (function() {
	
	var nomFichier = ctx.dateF.formatAAAAMMJJ(new Date()) + '_{0}_Stats';
	var statsF = {};
	var cheminFichierStats;
	var contenuTemplate;

	statsF.initFileStats = function(cheminDossierTemplate, cheminDossierResultat, nomScenario) {
		var cheminFichierTemplate = cheminDossierTemplate + nomScenario + '.html';
			
		if (!ctx.fso.file.exist(cheminFichierTemplate)) {
			ctx.traceF.errorTxt(' Le fichier de statistiques de template n\'est pas trouvé pour ' + nomScenario + ' scenario');
			return;
		}
		
		var cheminFichier = cheminDossierResultat + nomFichier.replace('{0}', nomScenario);
		try {
			ctx.fso.file.copy(cheminFichierTemplate, cheminFichier + '.html', true);
		}
		catch(ex) {
			ctx.traceF.errorTxt(' Impossible de copier le fichier de template : ' + cheminFichierTemplate + ' vers ' + cheminFichier + '.html');
		}

		cheminFichierStats = cheminFichier;
		try {
			contenuTemplate = ctx.fso.file.read(cheminFichierStats + '.html');
		}
		catch(ex) {
			ctx.traceF.errorTxt('Impossible de lire le fichier : ' + cheminFichierStats + '.html');
		}
	};

//	.write
	statsF.remplir = function(obj) {
		statsF.remplirTemplate(obj);
		statsF.remplirJson(obj);
	}
	
	statsF.remplirTemplate = function(obj) {
		if (obj === undefined || cheminFichierStats === undefined) {
			return;
		}
		
		var tempContent = contenuTemplate;
		for (var key in obj) {
			if (obj.hasOwnProperty(key)) {
				tempContent = tempContent.replace('{{ ' + key + ' }}', obj[key]);
			}
		}

		try {
			ctx.fso.file.write(cheminFichierStats + '.html', tempContent, e.file.encoding.UTF8);
		}
		catch(ex) {
			ctx.traceF.errorTxt('Can not write stats template, ' + cheminFichierStats + '.html');
		}
	};
	
	statsF.remplirJson = function(obj) {
		try {
			ctx.fso.file.write(cheminFichierStats + '.json', JSON.stringify(obj));
		}
		catch(ex) {
			ctx.traceF.errorTxt('Can not write stats json, ' + cheminFichierStats + '.json');
		}
	}
	
	statsF.miseAJourCMU = function(dat){
		dat.statistiquesF.nbCasTraite +=1;
		dat.statistiquesF.nbCasTrouveDsExcel = dat.varGlobales.indexDerniereLigne - dat.scenarioConfig.CMU.excel.debutIndexLigne + 1;
		// (pas besoin de mettre à jour celle là) stats.countCaseReadyToRemove = sc.data.countCaseReadyToRemove;
		
		
		if (dat.contratCourantCMU.notes.statutsContrat === ctx.excelF.constantes.statuts.Succes) {
				dat.statistiquesF.nbCasTraitementSucces += 1;
		}

		if (dat.contratCourantCMU.notes.statutsContrat === ctx.excelF.constantes.statuts.Echec) {
				dat.statistiquesF.nbCasTraitementEchec += 1;
		}
		
		if (dat.contratCourantCMU.notes.commentaireContrat.indexOf('centre')!==-1){
			dat.statistiquesF.nbCasRevoirCentre +=1;
		}
		
		if ( dat.contratCourantCMU.statutsCMU.contratTermine == true){
			dat.statistiquesF.nbContratsPretsPrResiliation += 1;
		}
		
		if ( dat.contratCourantCMU.statutsCMU.contratResilie == true){
			dat.statistiquesF.nbContratsResilies += 1;
		}
		
	}

	statsF.calculerStats = function (dat) {
		dat.statistiquesF.FinTpsTraitement = ctx.dateF.conversionEnSecondes(new Date());
  	dat.statistiquesF.dureeTraitement = ctx.dateF.afficherDuree(dat.statistiquesF.FinTpsTraitement - dat.statistiquesF.debutTpsTraitement);
		ctx.statsF.remplir(dat);
	}

	
	return statsF;
}) ();

