
/** Description */
GRCHarMu.scenario({ scGestionFichiersExcelConfig: function(ev, sc) {
	var data = sc.data;
	sc.onTimeout(30000, function(sc, st) { sc.endScenario();	}); // default timeout handler for each step
	sc.onError(function(sc, st, ex) { sc.endScenario();	}); // default error handler
	sc.setMode(e.scenario.mode.clearIfRunning);
	// add steps here...
	
	//sc.step(GRCHarMu.steps.stInitDataBasique);
	//sc.step(GRCHarMu.steps.stInitDataAnalyse);
	//sc.step(GRCHarMu.steps.stConfigurationJSON);
	//sc.step(GRCHarMu.steps.stConfigurationTrace);
	//sc.step(GRCHarMu.steps.stConfigurationFichiersDonneesExcel_CreationChemin);
	//sc.step(GRCHarMu.steps.stEchecInitialisation);
	//sc.step(GRCHarMu.steps.stFinInitialisation);
	sc.step(GRCHarMu.steps.stDeclarationDataBasique);
	sc.step(GRCHarMu.steps.stDeclarationDataAnalyse);
	sc.step(GRCHarMu.steps.stConfigurationJSON);
	sc.step(GRCHarMu.steps.stConfigTrace);
	sc.step(GRCHarMu.steps.stChargementFichierExcelIAE);
	sc.step(GRCHarMu.steps.stOuvertureFichierIAE);
	sc.step(GRCHarMu.steps.stCopieFichierResultat);
	//sc.step(GRCHarMu.steps.stEchecInitialisation);
	sc.step(GRCHarMu.steps.stFinDeclarationData);
}});



/** Description */
GRCHarMu.step({ stDeclarationDataBasique: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stInitDeclarationData: '); 
	data.scenarioConfig = '';
	data.codeScenario = ctx.configF.scenario.Analyse;
	data.nomScenario ='';
	data.webData = {
    url:'',
    tabDeBordURL:'', 
    identifiant:'', 
    motDePasse:'' 
   };
	
	data.webDataGRC= {
		url: '',
		identifiant : '',
		motDePasse: ''
		};
 
 	data.varGlobales = { 
    ligneCourante :'',
    indexDerniereLigne :'', 
    controlSeul:'' 
  };	
	sc.endStep();
	return;
}});


/** Description */
GRCHarMu.step({ stDeclarationDataAnalyse: function(ev, sc, st) {
	var data = sc.data;
	var ppCouranteAnalyse = {
			dataLocale: {
				referenceGRC : '',
			  typeAssure : '',
				numeroRO : '',
				nom : '',
				prenom : '',
				dateDeNaissance : '',
				debDateEffet: '',
				gammeProduit:'',
				codeOffre :'',
				tabGammeCode : [],
				tabProduits: [], //10 produits du fichier JSON
				numSEQ : '',
				numExtCtt : '',
				tabProduitsPrinConj : [],
				indexDeb: 2,
				indexFin: 1,
				nbAdhesion : 0,
				tentativeTraitInfinite : 1,
				tentativeTraitGRC : 1
			},
			dataEnLigne: {
				nbContrat : 0,
				nbContratRadie : 0,
				nbContratRad: 0,
				indexContrat : 0,
				typeRelation : '',
				identiteRelation : '',
				tracePCXExist : false,
				contratEstActif : false,
				adhesionEstEnregistree : false,
			  HPPExiste : false,
			  produitGammeCompatible : false,
				tousStatutInactifs : false,
			  dateRadSupDjour : false,				
				codeOffre : '',
				debDateEffet : '',
				critereRecherche : 1,
				dateEffetConst : '01/01/2100',
				statusCCourant : '',
				dateRadiation : '',
				tabCoordAssures : [],
				civilitePayeur : '',
				nomPayeur : '',
				prenomPayeur: '',
				appPayeur: '',
        batPayeur: '',
        voiePayeur: '',
        lieuDitPayeur: '',
        cpPayeur: '',
        villePayeur: '',
        cedexPayeur: '',
        paysPayeur: ''
			},
			notes: {
				contexteAnalyseStoppee : '',
				presenceHPP : 'Non',
				gestionControl : 'Non',
				paiementAdhesion : 'Non',
				clauseBenefAdh : 'Non',
				clauseBenefConjoint : 'Non',
				dateEffetAControler : 'Non',
				payeurEgSouscripteur : ''
			},
			dataFichiers: {
				nomTemplate : 'templateIAE',
				nomFichierConfigScenario: 'configAnalyseSituation.json',
				nomFichierResultatCompletAnalyse: ''
			}
		};
	data.ppCouranteAnalyse = ppCouranteAnalyse;
	sc.endStep();
	return;
}});


/** Description */
GRCHarMu.step({ stConfigurationJSON: function(ev, sc, st) {
	var data = sc.data;
	data.ppCouranteAnalyse.dataFichiers.cheminFichierConfigAnalyse = ctx.fso.file.read(ctx.options.serverURL + '\\' + data.ppCouranteAnalyse.dataFichiers.nomFichierConfigScenario);
	data.scenarioConfig = new confFileANALYSEClass();
	data.scenarioConfig = JSON.parse(data.ppCouranteAnalyse.dataFichiers.cheminFichierConfigAnalyse);
	sc.endStep();
	return;
}});


/** Description */
GRCHarMu.step({ stConfigTrace: function(ev, sc, st) {
	var data = sc.data;
//	ctx.traceF.initFichierTrace(data.scenarioConfig.ANALYSE.cheminRacine, ctx.configF.scenario.Analyse);
	var config = data.scenarioConfig[data.codeScenario];
	var cheminRacine = config.cheminRacine;
	var nomFichier = ctx.dateF.formatAAAAMMJJ(new Date()) + '_{0}_Logs.log';
	var nomScen = data.codeScenario;
	var cheminFichier = cheminRacine + nomFichier.replace('{0}', nomScen);
	//Activation trace
	ctx.traceF.constantes.touteTraceActive=config.touteTraceActive;
	if(ctx.traceF.constantes.touteTraceActive){
		ctx.log('Traces Infos Actives');
	}else{
		ctx.log('Traces Infos Désactivées');
	}
	// Si le chemin racine existe, on créé le fichier de log
	if(ctx.fso.folder.exist(cheminRacine)) {
		if(!ctx.fso.file.exist(cheminFichier)) {
			ctx.fso.file.create(cheminFichier);
		}
		ctx.traceF.cheminFichierTrace = cheminFichier;
		ctx.log("Initialisation Trace effectuée - Chemin : " + cheminFichier);
		//ctx.traceF.txtTrace = ctx.fso.file.read(cheminFichier);
		sc.endStep();
		return;
	}else{
		// create the Popup using the 'e.popup.template.OkCancel' template
		var myPopup = ctx.popup('pMyPopup', e.popup.template.OkCancel);
		myPopup.open({title: ' Dossier : '+cheminRacine+' introuvable',message: ' Veuillez ajouter le dossier et cliquez sur réessayer .',  
  		buttons: {  
    		essaye: {label: 'Reessayer'},
    		annule: {label: ' Annuler '}  
  		}  
		}) ;
	// wait until the Popup closes 
	myPopup.waitResult(function(res) 
	{
	  if (res == 'essaye') {
	    sc.endStep(ActivInfinitev7.steps.stConfigTrace);
			return;
	  }
		else{
			sc.endStep(ActivInfinitev7.steps.stEchecInitialisation);
			return;
		}
	});
	}
	
	//sc.endStep();
	//return;
}});


/** Description */
GRCHarMu.step({ stChargementFichierExcelIAE: function(ev, sc, st) {
	var data = sc.data;
	var config = data.scenarioConfig[data.codeScenario];
	var cheminRacine = config.cheminRacine;
	var developpement=config.devel;
	var finTitreResultat = '_Resultats';
	var extensionFichier = '.xls';
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
		data.ppCouranteAnalyse.dataFichiers.nomFichierResultatCompletAnalyse = nomFichierResultatComplet;
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
	
	
	sc.endStep();
	return;
}});

/** Description */
ActivInfinitev7.step({ stEchecInitialisation: function(ev, sc, st) {
	var data = sc.data;
	ctx.log('Echec initialisation');
	ActivInfinitev7.scenarios.clearAll() ;
	sc.endScenario();
	return;
}});

/** Description */
GRCHarMu.step({ stOuvertureFichierIAE: function(ev, sc, st) {
	var data = sc.data;
	ctx.excelF.configExcel(data);
	ctx.excelF.ouvertureFichier(data.nomFichier);
	data.varGlobales.ligneCourante = data.scenarioConfig.ANALYSE.excel.debutIndexLigne; //
	data.varGlobales.indexDerniereLigne = ctx.excelF.indexDerniereLigne();
	sc.endStep();
	return;
}});


/** Description */
GRCHarMu.step({ stCopieFichierResultat: function(ev, sc, st) {
	var data = sc.data;
	ctx.excelF.copieFichier(data.cheminFichierResultat, data.scenarioConfig.ANALYSE.excel.debutIndexLigne-1, ctx.excelF.modifierEnteteIAE());
	sc.endStep();
	return;
}});

/** Description */
GRCHarMu.step({ stFinDeclarationData: function(ev, sc, st) {
	var data = sc.data;

	sc.endScenario();
	return;
}});



