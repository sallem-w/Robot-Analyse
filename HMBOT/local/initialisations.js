/* Steps d'initialisation des scénarios */




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
ActivInfinitev7.step({ stConfigurationFichiersDonneesExcel: function(ev, sc, st) {
	var data = sc.data;
	var config = data.scenarioConfig[data.codeScenario];
	var cheminRacine = config.cheminRacine;
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
	
	var developpement=true;
	if (n_fichiers !== 1) {
		if(developpement==true){
			var listeFichiers = ctx.fso.folder.getFileCollection(cheminRacine);
			var selectionFichier=undefined;
			var label = "<script>function cl(element) { close(element.id); }</script>";
			label = label + "<p> Avec quel fichier souhaitez-vous travailler ? :<br/><br/>";
			var count=0;
			while(!listeFichiers.atEnd()) {
				var ff = listeFichiers.item();
				ctx.log('Nom fichier : '+ ff);
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
				pMaPopup.waitResult(function(res) 
				{
					var it=Number(res[6]);
					selectionFichier=ff.Name;
				  ctx.log('Résultat cliqué: ' + res + " k : " +it+ "Fichier : "+ selectionFichier);
					// Quand on clique, res renvoi l'id, dans notre cas id=Option"k".Ce que nous interresse est le "k"
				});
			nomFichier = selectionFichier;
		} 
		else{
			ctx.traceF.errorTxt(n_fichiers + " " + extensionFichier + " fichiers trouvés dans  " + cheminRacine + ", seulement 1 fichier est demandé");
			ctx.popupF.newPopup(n_fichiers + " fichier(s) Excel de données trouvé(s) dans " + cheminRacine + ", il en faut un et un seul.", 'Erreur Excel');
		}
	}
	if(nomFichier!=undefined){
		ctx.log(' nom fichier : '+nomFichier);
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
	
}});





/** Description */
ActivInfinitev7.step({ stEchecInitialisation: function(ev, sc, st) {
	var data = sc.data;
	ctx.log('Echec initilisation');
	ActivInfinitev7.scenarios.clearAll() ;

	
}});


/** Description */
ActivInfinitev7.step({ stConfigurationExcel: function(ev, sc, st) {
	var data = sc.data;
	
	sc.endStep();
	return;
}});

