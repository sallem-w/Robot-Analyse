﻿/* Steps d'initialisation des scénarios */




/** Description */
ActivInfinitev7.step({ stChargementConfigScenario: function(ev, sc, st) {
	var data = sc.data;
	ctx.log('Chargement du fichier de configuration JSON pour le scenario : '+ data.codeScenario);
	var nomFichierConfigScenario = data.nomFichierConfigScenario;
	ctx.log('--> '+ nomFichierConfigScenario);
	var chemin = ctx.options.serverURL + '\\' + nomFichierConfigScenario ;
	ctx.log('Chemin fichier : ' + chemin);
	data.cheminFichierConfigScenario = chemin;
	sc.endStep();
	return;
}});


/** Description */
ActivInfinitev7.step({ stConfigurationJSON_Adhesion: function(ev, sc, st) {
	var data = sc.data;
	var fichierJSON = ctx.fso.file.read(data.cheminFichierConfigScenario);
	var scenarioConfig = new confFileAdhesionClass();
	scenarioConfig = JSON.parse(fichierJSON);
	data.scenarioConfig=scenarioConfig;
	sc.endStep();
	return;
}});


/** Description */
ActivInfinitev7.step({ stConfigurationTrace: function(ev, sc, st) {
	var data = sc.data;
	var config = data.scenarioConfig[data.codeScenario];
	var cheminRacine = config.cheminRacine;
	var nomFichier = ctx.dateF.formatAAAAMMJJ(new Date()) + '_{0}_Logs.log';
	var nomScen = data.codeScenario;
	var cheminFichier = cheminRacine + nomFichier.replace('{0}', nomScen);
	if (!ctx.fso.file.exist(cheminFichier)) {
			ctx.fso.file.create(cheminFichier);
	}
	ctx.traceF.cheminFichierTrace = cheminFichier;
	ctx.traceF.infoTxt("Initialisation Trace effectuée ");
//	ctx.traceF.txtTrace = ctx.fso.file.read(cheminFichier);
	sc.endStep();
	return;
}});




/** Description */
ActivInfinitev7.step({ stConfigurationFichiersDonneesExcel_CreationChemin: function(ev, sc, st) {
	var data = sc.data;
	var config = data.scenarioConfig[data.codeScenario];
	var cheminRacine = config.cheminRacine;
	var developpement=config.devel;
	var finTitreResultat = '_Resultats.';
	
	var extensionFichier = 'xls';
	var fichiers = ctx.fso.folder.getFileCollection(cheminRacine);
	var nomFichier ='';
	var n_fichiers = 0;
	while(!fichiers.atEnd()) {
		var ff = fichiers.item();
		ctx.log('Nom fichier : '+ ff);
		// on verifie si il n'y a pas deux fichiers de données sans "finTitreResultat" dans le titre
		if ((ff.Name.indexOf(extensionFichier) !== -1) && (ff.Name.indexOf(finTitreResultat==-1))) {
			n_fichiers += 1;
			nomFichier = ff.Name;
		}
		fichiers.moveNext();
	}
	
	
	if (n_fichiers == 1) {
		ctx.log(' nom fichier : '+nomFichier);
		var nomFichierResultatComplet = ctx.dateF.formatAAAAMMJJ(new Date()) + "_" + data.codeScenario + "_" + ctx.string.left(nomFichier, nomFichier.length - extensionFichier.length - 1)  + finTitreResultat + extensionFichier;
		var nomFichierResultat = nomFichierResultatComplet;
		data.nomFichier=cheminRacine+nomFichier;
		data.cheminFichierResultat = cheminRacine+nomFichierResultat;
		sc.endStep();
		return;
		
	}
	else if (n_fichiers > 1) {
		if(developpement==true){
			var listeFichiers = ctx.fso.folder.getFileCollection(cheminRacine);
			var selectionFichier=undefined;
			var label = "<script>function cl(element) { close(element.id); }</script>";
			label = label + "<p> Avec quel fichier souhaitez-vous travailler ? :<br/><br/>";
			var count=0;
			var tabFichier=[];
			while(!listeFichiers.atEnd()) {
				var ff = listeFichiers.item();
				tabFichier[count]=ff.Name;
				ctx.log('Nom fichier : '+ ff.Name);
					// on verifie si il n'y a pas deux fichiers de données sans "finTitreResultat" dans le titre
				if ((ff.Name.indexOf(extensionFichier) !== -1) && (ff.Name.indexOf(finTitreResultat==-1))) {
					label = label + "<a href='javascript:void(0)' id='Option"+count+"' onclick='cl(this);' > ";
					label = label + "<b> "+ ff.Name+" </b> </a><br/>";
					count += 1;
				}
					listeFichiers.moveNext();
			}
			var pMaPopup = ctx.popup('maPopup', e.popup.template.NoButton) ;
			pMaPopup.open({	message: label }) ;
			pMaPopup.waitResult(function(res){
				var it=Number(res[6]);
				selectionFichier=tabFichier[it];
			  ctx.log('Résultat cliqué: '+ selectionFichier);
				// Quand on clique, res renvoi l'id, dans notre cas id=Option"k".Ce que nous interresse est le "k"
				nomFichier = selectionFichier;
				data.nomFichier=cheminRacine+nomFichier;
				if(nomFichier!=undefined){
					ctx.log(' nom fichier : '+ data.nomFichier);
					var nomFichierResultatComplet = ctx.dateF.formatAAAAMMJJ(new Date()) + "_" + data.codeScenario + "_" + ctx.string.left(nomFichier, nomFichier.length - extensionFichier.length - 1)  + finTitreResultat + extensionFichier;
					var nomFichierResultat = nomFichierResultatComplet;
					data.cheminFichierResultat = cheminRacine+nomFichierResultat;
					sc.endStep();
					return;
				}
				else{
					sc.endStep(ActivInfinitev7.steps.stEchecInitialisation);
					return;
				}
			});
		
		} 
		else{
//			ctx.traceF.errorTxt(" Plusieurs fichiers Excel trouvés dans le deploy , il en faut un et un seul.");
			ctx.popupF.newPopup(" Plusieurs fichiers Excel trouvés dans le deploy , il en faut un et un seul.", 'Erreur Excel');
			sc.endStep(ActivInfinitev7.steps.stEchecInitialisation);
			return;
		}
	}
	else{
		sc.endStep(ActivInfinitev7.steps.stEchecInitialisation);
		return;
	}
}});











/** Description */
ActivInfinitev7.step({ stConfigurationFichiersDonneesExcel_OuvertureFichier: function(ev, sc, st) {
	var data = sc.data;
//	ctx.excelF.configExcel(dat);
	ctx.excel.release();
	ctx.excel.initialize();
	ctx.excel.file.open(data.nomFichier);
	
	// on crée maintenant le fichier Résultat
	var indexDerniereLigne = ctx.excel.sheet.getLastRow2('A1');
	ctx.log(' DerniereLigne : '+indexDerniereLigne );
	var configExcel = data.scenarioConfig[data.codeScenario].excel;
	var indexPremiereLigne = configExcel.debutIndexLigne;
	var tab = [
			{ columnIndex: configExcel.indexColonne.dateTraitementContrat, value: "Date traitement contrat" },
			{ columnIndex: configExcel.indexColonne.statutsContrat, value: "Statuts contrat" },
			{ columnIndex: configExcel.indexColonne.commentaireContrat, value: "Commentaire" }
		];
	ctx.excel.file.saveAs(data.cheminFichierResultat); 
	ctx.excelF.remplirObjetTableau(indexPremiereLigne-1, tab);
	ctx.log('fichier résultat créé');
	
	
	sc.endStep();
	return;
}});


/** Description */
ActivInfinitev7.step({ stConfigurationStatistiques: function(ev, sc, st) {
	var data = sc.data;
	var cheminDossierTemplate = data.scenarioConfig.cheminTemplate;
	var config = data.scenarioConfig[data.codeScenario];
	var cheminRacine = config.cheminRacine;
	var nomScen = data.codeScenario;
	var cheminFichierTemplate = cheminDossierTemplate + nomScen + '.html';
	var nomFichier = ctx.dateF.formatAAAAMMJJ(new Date()) + '_{0}_Stats';	
	if (!ctx.fso.file.exist(cheminFichierTemplate)) {
			ctx.traceF.errorTxt(' Le fichier de template n\'est pas trouvé pour ' + nomScen + ' scenario');
	}
		
	var cheminFichier = cheminRacine + nomFichier.replace('{0}', nomScen);
		try {
			ctx.fso.file.copy(cheminFichierTemplate, cheminFichier + '.html', true);
		}
		catch(ex) {
			ctx.traceF.errorTxt(' Impossible de copier le fichier de template : ' + cheminFichierTemplate + ' vers ' + cheminFichier + '.html');
		}
	
		try {
		var	contenuTemplate = ctx.fso.file.read(cheminFichier + '.html');
		}
		catch(ex) {
			ctx.traceF.errorTxt('Impossible de lire le fichier : ' + cheminFichier + '.html');
		}
	
	sc.endStep();
	return;
}});



/** Description */
ActivInfinitev7.step({ stEchecInitialisation: function(ev, sc, st) {
	var data = sc.data;
	ctx.log('Echec initialisation');
	ActivInfinitev7.scenarios.clearAll() ;
	sc.endStep();
	return;
	
}});



/** Description */
ActivInfinitev7.step({ stFinInitialisation: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Initialisation Effectuée');
	sc.endScenario();
	return;
}});

