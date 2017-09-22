ctx.statsF = (function() {
	
	
	var statsF = {};
	var cheminFichierStats;
	var contenuTemplate;
	
	var nomFichier = ctx.dateF.formatAAAAMMJJ(new Date()) + '_{0}_Stats';
	statsF.nomFichier=nomFichier;

	statsF.initFileStats = function(cheminDossierTemplate, cheminDossierResultat, nomScen) {
		var cheminFichierTemplate = cheminDossierTemplate + nomScen + '.html';
			
		if (!ctx.fso.file.exist(cheminFichierTemplate)) {
			ctx.traceF.errorTxt(' Le fichier de template n\'est pas trouvé pour ' + nomScen + ' scenario');
			return;
		}
		
		var cheminFichier = cheminDossierResultat + nomFichier.replace('{0}', nomScen);
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
		var objStats = obj.statistiquesF;
		statsF.remplirTemplate(objStats);
		statsF.remplirJson(objStats);
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
			ctx.traceF.errorTxt('Ne peut pas ecrire dans le template des statististique HTML, ' + cheminFichierStats + '.html');
		}
	};
	
	statsF.remplirJson = function(obj) {
		try {
			ctx.fso.file.write(cheminFichierStats + '.json', JSON.stringify(obj));
		}
		catch(ex) {
			ctx.traceF.errorTxt('Ne peut pas ecrire dans le template des statististique JSON, ' + cheminFichierStats + '.json');
		}
	}
	
	
	statsF.debuterStats = function (dat) {
//		ctx.statsF.nomFichier = ctx.configF.nomFichierResultat;
		dat.statistiquesF=ctx.dataF.statistiquesF;
		dat.statistiquesF.debutTpsTraitement=ctx.dateF.conversionEnSecondes(new Date());
		dat.statistiquesF.nomFichier=ctx.configF.nomFichier;
	}
	

	
	statsF.miseAJourCMU = function(dat){
		dat.statistiquesF.nbCasTraite +=1;
		dat.statistiquesF.nbCasTrouveDsExcel = dat.varGlobales.indexDerniereLigne - dat.scenarioConfig.excel.debutIndexLigne + 1;
		// (pas besoin de mettre à jour celle là) stats.countCaseReadyToRemove = sc.data.countCaseReadyToRemove;
		
		
		if (dat.contratCourantCMU.notes.statusContrat === ctx.excelF.constantes.status.Succes) {
				dat.statistiquesF.nbCasTraitementSucces += 1;
		}

		if (dat.contratCourantCMU.notes.statusContrat === ctx.excelF.constantes.status.Echec) {
				dat.statistiquesF.nbCasTraitementEchec += 1;
		}
		
		if (dat.contratCourantCMU.notes.commentaireContrat.indexOf('centre')!==-1){
			dat.statistiquesF.nbCasRevoirCentre +=1;
		}
		
		if ( dat.contratCourantCMU.statusCMU.contratTermine == true){
			dat.statistiquesF.nbContratsPretsPrResiliation += 1;
		}
		
		if ( dat.contratCourantCMU.statusCMU.contratResilie == true){
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
