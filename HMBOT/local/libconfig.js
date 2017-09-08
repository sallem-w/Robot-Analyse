﻿ctx.configF = (function() {
	
	
	var configF = {};
	configF.cheminRacine=''; //var rootPath;
	configF.codeScenario='';
	configF.nomFichier=''; //var fileName;
	configF.cheminFichier=''; //var getPathFile();
	configF.nomFichierResultat=''; //var fileNameOutput;
	configF.cheminFichierResultat=''; //getPathFileOutput()
	configF.nomFichierStartProcessusBat='';
	configF.nomFichierConfig='';
	configF.cheminFichierConfig='';
	configF.cheminVersTemplate='';

	
	configF.nomFichierStartProcessusBat = 'startProcessus.bat';
	/// Declaration des élements présents dans le config.json
	configF.nomFichierConfig = 'config.json';
	
	var scenario = {};
	scenario.CMU = 'CMU';
	scenario.ACS = 'ACS';
	scenario.SIRH = 'SIRH';
	scenario.SIRHUpdate = 'SIRHUpdate';
	scenario.DA = 'DA';
	
	configF.scenario=scenario;
	
	var fichierConfig = {};
	
	configF.chargementFichierConfig = function() {
		var chemin = ctx.fso.file.read(ctx.options.serverURL + '\\' + configF.nomFichierConfig);
		configF.fichierConfig = JSON.parse(chemin);
		configF.cheminVersTemplate=configF.fichierConfig.cheminTemplate;
		ctx.log('Initialisation : Chargement du fichier config.json');
	};
	
	
//	configF.cheminVersTemplate = function() {
//		return configF.fichierConfig.cheminTemplate;
//	}
	
	configF.recupConfigScenario = function(codeScenario) {
		ctx.log('--> config '+codeScenario);
		return configF.fichierConfig[codeScenario];
	}
	
	configF.cheminVersStartProcessusBat = function() {
		return ctx.options.serverURL + '\\' + configF.nomFichierStartProcessusBat;
	}
	
	//configF.getCheckExtension
	
	configF.fichierExtension = function(codeScenario) {  // à voir où la fonction est utile
		switch(codeScenario) {
			case ctx.configF.scenario.SIRH:
			case ctx.configF.scenario.DA:
				return '.json';
			default:
				return '.xls';
		}
	}
	
//	configF.getResultFileExtension
	configF.extensionFichierResultat = function(codeScenario, nomFichier) {  // à voir où la  fonction est utile
		return codeScenario === ctx.config.SIRH ? 'xls' : ctx.fso.file.getExtensionName(nomFichier);
	}
	
	
//	var config = {};
//	var configFile = {};
	
//	config.CMU = 'CMU';
//	config.ACS = 'ACS';
//	config.SIRH = 'SIRH';
//	config.SIRHUpdate = 'SIRHUpdate';
//	config.DA = 'DA';
	
//	config.loadConfigFile = function() {
//		var pathConfigFile = ctx.fso.file.read(ctx.options.serverURL + '\\' + nameFileConfig);
//		configFile = JSON.parse(pathConfigFile);
//	};
	
//	config.getPathTemplate = function() {
//		return configFile.pathTemplate;
//	}
	
//	config.getConfig = function(codeScenario) {
//		return configFile[codeScenario];
//	}
	
//	config.getPathStartProcessusBat = function() {
//		return ctx.options.serverURL + '\\' + nameFileStartProcessusBat;
//	}
	
//	config.getTimeout = function(minute) {
//		minute = minute || 2;
//		// Time in millisecond 
//		return 1000 * 60 * minute;
//	}
	
//	config.getCheckExtension = function(codeScenario) {
//		switch(codeScenario) {
//			case ctx.config.SIRH:
//			case ctx.config.DA:
//				return '.json';
//			default:
//				return '.xls';
//		}
//	}
	
//	config.getResultFileExtension = function(codeScenario, fileName) {
//		return codeScenario === ctx.config.SIRH ? 'xls' : ctx.fso.file.getExtensionName(fileName);
//	}
	
	
	
	
	
	configF.init = function(codeScenario) {
		
		configF.chargementFichierConfig();
		configF.cheminVersTemplate=configF.fichierConfig.cheminTemplate;
		var config = configF.fichierConfig[codeScenario];
		configF.cheminRacine = config.cheminRacine;
		var finTitreResultat='_Resultats.';
		var avecExcel = !!config.excel;
		
		
		// Dans le cas du scenario SIRH ou autre où les données sont dans un json et non dans un xls
		if (!avecExcel) {
			configF.nomFichier = 'pivot.json';
			configF.nomFichierResultat = ctx.dateF.formatJJMMAAAA(new Date()) + "_" + codeScenario + finTitreResultat + 'xls';
			return true;
		}
		var extensionFichier = ctx.configF.fichierExtension(codeScenario);
		var fichiers = ctx.fso.folder.getFileCollection(configF.cheminRacine);
		var n_fichiers = 0;
		while(!fichiers.atEnd()) {
			var ff = fichiers.item();
			// on verifie si il n'y a pas deux fichiers de données sans "finTitreResultat" dans le titre
			if ((ff.Name.indexOf(extensionFichier) !== -1) && (ff.Name.indexOf(finTitreResultat==-1))) {
				n_fichiers += 1;
				configF.nomFichier = ff.Name;
			}
			fichiers.moveNext();
		}
		
		if (n_fichiers !== 1) {
			ctx.traceF.errorTxt(n_fichiers + " " + extensionFichier + " fichiers trouvés dans  " + configF.cheminRacine + ", seulement 1 fichier est demandé");
			ctx.popupF.newPopup(n_fichiers + " fichier(s) Excel de données trouvé(s) dans " + configF.cheminRacine + ", il en faut un et un seul.", 'Erreur Excel');
			return false;	
		}

		var extension = ctx.configF.extensionFichierResultat(codeScenario, configF.nomFichier);
		var nomFichierResultatComplet = ctx.dateF.formatAAAAMMJJ(new Date()) + "_" + codeScenario + "_" + ctx.string.left(configF.nomFichier, configF.nomFichier.length - extension.length - 1)  + finTitreResultat + extension;
		
		configF.cheminFichier=configF.cheminRacine + configF.nomFichier;
		if (!ctx.fso.file.exist(configF.cheminFichier)) {
			ctx.traceF.errorTxt("Ouverture Impossible : aucune fichier à l'addresse : "+configF.cheminFichier);
			return false;	
		}

		ctx.traceF.infoTxt("Ouverture réussie : fichier trouvé");
		configF.nomFichierResultat = nomFichierResultatComplet;
		configF.cheminFichierResultat = configF.cheminRacine+configF.nomFichierResultat;
		return true;	
	};

//	getCodeProductCorrespond
	configF.codeProduitACSCorrespondant = function(codeProduit) {
		var config = configF.fichierConfig[configF.scenario.ACS];
		return config.produitAccesSante[codeProduit];
	}

//	configFile.getHarmonieCustomerPath
	configF.cheminVersAppliHarmonieCustomer = function() {
		return ctx.options.serverURL + '\\harmonieCustomer.exe';
	}
	
//	configFile.getPathDirectory = function() {
//		return rootPath;
//	}
	
//	configFile.getPathFile = function() {
//		return rootPath + configF.nomFichier;
//	}
		
//	configFile.getFileNameOutput = function() {
//		return fileNameOutput;
//	}
	
//	configFile.getPathFileOutput = function() {
//		return rootPath + fileNameOutput;
//	}
	
//	configFile.getCodeProductCorrespond = function(codeProduct) {
//		var config = ctx.config.getConfig(ctx.config.ACS);
//		return config.productAccesSante[codeProduct];
//	}

//	configFile.getHarmonieCustomerPath = function() {
//		return ctx.options.serverURL + '\\harmonieCustomer.exe';
//	}

	return configF;
}) ();