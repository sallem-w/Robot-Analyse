ctx.statsF = (function() {
	
	var nomFichier = ctx.dateF.formatAAAAMMJJ(new Date()) + '_{0}_Stats';
	var statsF = {};
	var cheminFichierStats;
	var contenuTemplate;

	statsF.initFileStats = function(cheminDossierTemplate, cheminDossierResultat, nomScenario) {
		var cheminFichierTemplate = cheminDossierTemplate + nomScenario + '.html';
			
		if (!ctx.fso.file.exist(cheminFichierTemplate)) {
			ctx.traceF.errorTxt(' Le fichier de template n\'est pas trouvé pour ' + nomScenario + ' scenario');
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
	
	return statsF;
}) ();
