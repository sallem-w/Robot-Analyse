
/** Description */
GRCHarMu.scenario({ scGestionFichiersExcelConfig: function(ev, sc) {
	var data = sc.data;
	sc.onTimeout(30000, function(sc, st) { sc.endScenario();	}); // default timeout handler for each step
	sc.onError(function(sc, st, ex) { sc.endScenario();	}); // default error handler
	sc.setMode(e.scenario.mode.clearIfRunning);
	// add steps here...
	
	sc.step(GRCHarMu.steps.stDeclarationDataBasique);
	sc.step(GRCHarMu.steps.stDeclarationDataAnalyse);
	sc.step(GRCHarMu.steps.stConfigurationJSON);
	sc.step(GRCHarMu.steps.stConfigTrace);
	sc.step(GRCHarMu.steps.stChargementFichierExcelIAE);	
	//sc.step(GRCHarMu.steps.stInitTraitFichiersRejets);
	//sc.step(GRCHarMu.steps.stRechercheRepertoire);
	//sc.step(GRCHarMu.steps.stRecuperationFichiersRejets);
	//sc.step(GRCHarMu.steps.stOuverturesFichiersInputRejet);
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
	data.excelSortie = '';
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
				nomTemplate : 'templateIAE.xls',
				nomFichierConfigScenario: 'configAnalyseSituation.json',
				nomFichierATraiter : '', //nom du fichier d'entrée
				nomFichierResultatAnalyse: '', //fichier résultat technique
				nomTemplateRejet: 'pivot',
				nomFichierPreIAE : '',
				nomFichierSfGRCRejet : '',
				nomFichierACGRCIND : '',
				cheminInputTraitRejet : '',
				cheminOutputTraitRejet : '',
				cheminTemplateRejet : '',
				/*cheminAccesRejetsIAE : '',*/
				nomTemplateRejetResultat: '',
				nomsRepertoires : [],
				cheminLocalInputTraitRejet: '',
				cheminLocalOutputTraitRejet :'',
				cheminRacine : '',
				nomFichierLog : ''
			}
		};
	//temp_ppCouranteAnalyse = {};
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
	data.excelSortie = data.scenarioConfig[data.codeScenario].excelSortie;
	sc.endStep();
	return;
}});


/** Description */
GRCHarMu.step({ stConfigTrace: function(ev, sc, st) {
	var data = sc.data;
	var config = data.scenarioConfig[data.codeScenario];
	data.ppCouranteAnalyse.dataFichiers.cheminRacine = config.cheminRacine;
	data.ppCouranteAnalyse.dataFichiers.nomFichierLog = ctx.dateF.formatAAAAMMJJ(new Date()) + '_{0}_Logs.log';
	var nomScen = data.codeScenario;
	//Activation trace
	ctx.traceF.constantes.touteTraceActive = config.touteTraceActive;
	// Si le chemin racine existe, on créé le fichier de log
	if(ctx.fso.folder.exist(data.ppCouranteAnalyse.dataFichiers.cheminRacine)) {
		if(!ctx.fso.file.exist(data.ppCouranteAnalyse.dataFichiers.cheminRacine + data.ppCouranteAnalyse.dataFichiers.nomFichierLog)) {
			ctx.fso.file.create(data.ppCouranteAnalyse.dataFichiers.cheminRacine + data.ppCouranteAnalyse.dataFichiers.nomFichierLog);
		}
		ctx.traceF.cheminFichierTrace = data.ppCouranteAnalyse.dataFichiers.cheminRacine + data.ppCouranteAnalyse.dataFichiers.nomFichierLog;
		sc.endStep();
		return;
	}else{
		// create the Popup using the 'e.popup.template.OkCancel' template
		var myPopup = ctx.popup('pMyPopup', e.popup.template.OkCancel);
		myPopup.open({title: ' Dossier : '+data.ppCouranteAnalyse.dataFichiers.cheminRacine+' introuvable',message: ' Veuillez ajouter le dossier et cliquez sur réessayer .',  
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
	var developpement=config.devel;
	var finTitreResultat = '_Resultats';
	var extensionFichier = '.xls';
	var fichiers = ctx.fso.folder.getFileCollection(data.ppCouranteAnalyse.dataFichiers.cheminRacine);
	var n_fichiers = 0;
	while(!fichiers.atEnd()) {
		var ff = fichiers.item();
		// on verifie si il n'y a pas deux fichiers de données sans "finTitreResultat" dans le titre
		if ((ff.Name.indexOf(extensionFichier) !== -1) && (ff.Name.indexOf(finTitreResultat==-1))) {
			n_fichiers += 1;
			data.ppCouranteAnalyse.dataFichiers.nomFichierATraiter = ff.Name;
		}
		fichiers.moveNext();
	}
	if (n_fichiers == 1) {
		ctx.traceF.infoTxt('Version du projet : 1.1 - Date de la Version : ' + GLOBAL.data.projectDate);
		ctx.traceF.infoTxt('******** Fichier d\'entrée: '+data.ppCouranteAnalyse.dataFichiers.cheminRacine+''+data.ppCouranteAnalyse.dataFichiers.nomFichierATraiter);
		data.ppCouranteAnalyse.dataFichiers.nomFichierResultatAnalyse = ctx.dateF.formatAAAAMMJJ(new Date()) + "_" + data.codeScenario + "_" + ctx.string.left(data.ppCouranteAnalyse.dataFichiers.nomFichierATraiter, data.ppCouranteAnalyse.dataFichiers.nomFichierATraiter.length - extensionFichier.length - 1)  + finTitreResultat + extensionFichier;
		ctx.traceF.infoTxt('******** Ficher de sortie: '+data.ppCouranteAnalyse.dataFichiers.cheminRacine + data.ppCouranteAnalyse.dataFichiers.nomFichierResultatAnalyse);
		ctx.traceF.infoTxt('******** Ficher de trace: '+data.ppCouranteAnalyse.dataFichiers.cheminRacine + data.ppCouranteAnalyse.dataFichiers.nomFichierLog);
		sc.endStep();
		return;
	}
	else if (n_fichiers > 1) {
		if(developpement==true){
			var listeFichiers = ctx.fso.folder.getFileCollection(data.ppCouranteAnalyse.dataFichiers.cheminRacine);
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
				//nomFichier = selectionFichier;
				data.ppCouranteAnalyse.dataFichiers.nomFichierATraiter = data.ppCouranteAnalyse.dataFichiers.cheminRacine + data.ppCouranteAnalyse.dataFichiers.nomFichierATraiter;
				if(data.ppCouranteAnalyse.dataFichiers.nomFichierATraiter!=undefined){
					ctx.log(' nom fichier : '+ data.nomFichier);
					data.ppCouranteAnalyse.dataFichiers.nomFichierResultatAnalyse = ctx.dateF.formatAAAAMMJJ(new Date()) + "_" + data.codeScenario + "_" + ctx.string.left(data.ppCouranteAnalyse.dataFichiers.nomFichierATraiter, data.ppCouranteAnalyse.dataFichiers.nomFichierATraiter.length - extensionFichier.length - 1)  + finTitreResultat + extensionFichier;
					sc.endStep();
					return;
				}else{
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


/*
* Avant d'ouvrir le fichier IAE de traitement, on traite les fichiers de rejets
*
*/

/** Description */
GRCHarMu.step({ stInitTraitFichiersRejets: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stInitTraitFichiersRejets: Dans cette étape on charge les 3 fichiers (IAE, Rejet, AC056)');
	var config = data.scenarioConfig[data.codeScenario];
	data.ppCouranteAnalyse.dataFichiers.cheminInputTraitRejet = config.cheminInputTraitRejet;
	data.ppCouranteAnalyse.dataFichiers.cheminOutputTraitRejet = config.cheminOutputTraitRejet;
	data.ppCouranteAnalyse.dataFichiers.cheminTemplateRejet = config.cheminTemplateRejet;
	data.ppCouranteAnalyse.dataFichiers.cheminAccesRejetsIAE = config.cheminAccesRejetsIAE;
	data.ppCouranteAnalyse.dataFichiers.cheminLocalInputTraitRejet = config.cheminLocalInputTraitRejet;
	data.ppCouranteAnalyse.dataFichiers.cheminLocalOutputTraitRejet = config.cheminLocalOutputTraitRejet;
	var folders = ctx.fso.folder.getFolderCollection(data.ppCouranteAnalyse.dataFichiers.cheminAccesRejetsIAE);
	while(!folders.atEnd()){
		var folder = folders.item();
		var name = folder.Name;
		if(name.length === 8 && ctx.string.isNumeric(name)){
			data.ppCouranteAnalyse.dataFichiers.nomsRepertoires.push(name);
		}
		folders.moveNext();
	}
	sc.endStep();
	return;
}});


/** Description */
GRCHarMu.step({ stRechercheRepertoire : function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stTriNomsRepertoires: Tri des libellés des répertoires situés sur le serveur');
	data.ppCouranteAnalyse.dataFichiers.cheminInputTraitRejet += data.ppCouranteAnalyse.dataFichiers.nomsRepertoires[data.ppCouranteAnalyse.dataFichiers.nomsRepertoires.length-2]+'\\';
	sc.endStep();
	return;
}});


/** Description */
GRCHarMu.step({ stRecuperationFichiersRejets: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stRecuperationFichiersRejets : Recherche des fichers de rejets à partir de répertoire ' + data.ppCouranteAnalyse.dataFichiers.cheminInputTraitRejet);
	var fichiers = ctx.fso.folder.getFileCollection(data.ppCouranteAnalyse.dataFichiers.cheminInputTraitRejet);
	var fileNameSrc;
	var fileNameDst;
	while(!fichiers.atEnd()) {
		var ff = fichiers.item();
		if(ff.Name.indexOf('AC056.CI901C03') !== -1 && ff.Name.indexOf('.GRC-IND') !== -1){
			data.ppCouranteAnalyse.dataFichiers.nomFichierACGRCIND = ff.Name;
		}
		if(ff.Name.indexOf('PRE_IAE_FICHIER_IND_') !== -1 && ff.Name.indexOf('.csv') !== -1){
			data.ppCouranteAnalyse.dataFichiers.nomFichierPreIAE = ff.Name;
		}
		if(ff.Name.indexOf('Sf_GRC-IND_rejets_') !== -1 && ff.Name.indexOf('.csv') !== -1){
			data.ppCouranteAnalyse.dataFichiers.nomFichierSfGRCRejet = ff.Name;
		}
		fichiers.moveNext();
	}
	try{
		//copie de fichier PRE_IAE
		fileNameSrc = data.ppCouranteAnalyse.dataFichiers.cheminInputTraitRejet + data.ppCouranteAnalyse.dataFichiers.nomFichierPreIAE;
		fileNameDst = data.ppCouranteAnalyse.dataFichiers.cheminLocalInputTraitRejet + data.ppCouranteAnalyse.dataFichiers.nomFichierPreIAE;
		ctx.fso.file.copy(fileNameSrc, fileNameDst, true);
		//copie de fichier SF_GRC
		fileNameSrc = data.ppCouranteAnalyse.dataFichiers.cheminInputTraitRejet + data.ppCouranteAnalyse.dataFichiers.nomFichierSfGRCRejet;
		fileNameDst = data.ppCouranteAnalyse.dataFichiers.cheminLocalInputTraitRejet + data.ppCouranteAnalyse.dataFichiers.nomFichierSfGRCRejet;
		ctx.fso.file.copy(fileNameSrc, fileNameDst, true);
		//copie de fichier AC056
		fileNameSrc = data.ppCouranteAnalyse.dataFichiers.cheminInputTraitRejet + data.ppCouranteAnalyse.dataFichiers.nomFichierACGRCIND;
		fileNameDst = data.ppCouranteAnalyse.dataFichiers.cheminLocalInputTraitRejet + data.ppCouranteAnalyse.dataFichiers.nomFichierACGRCIND;
		ctx.fso.file.copy(fileNameSrc, fileNameDst, true);
	}catch(ex){
		ctx.traceF.errorTxt('Fichiers introuvables');
	}
	sc.endStep();
	return;
}});


// ouverture des 3 fichiers 

/** Description */
GRCHarMu.step({ stOuverturesFichiersInputRejet: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stOuverturesFichiersInputRejet: ouverture/chargement des fichiers');
	ctx.excel.release();
	ctx.excel.initialize();
	var time = ctx.getTime()+'';
	var extensionNomFichierResultat = ctx.getDate()+'-'+time.substr(0,2)+'-'+time.substr(3,2)+'-'+time.substr(6,2);
	data.ppCouranteAnalyse.dataFichiers.nomTemplateRejetResultat = data.ppCouranteAnalyse.dataFichiers.nomTemplateRejet + '_' + extensionNomFichierResultat + '.xls';
	ctx.excelF.configExcel(data);
	try{
		//ouverture du fichier pivot ==> fichier template 
		ctx.excel.file.open(data.ppCouranteAnalyse.dataFichiers.cheminTemplateRejet + data.ppCouranteAnalyse.dataFichiers.nomTemplateRejet);
		//copie du fichier pivot
		ctx.excel.file.saveAs(data.ppCouranteAnalyse.dataFichiers.cheminOutputTraitRejet + data.ppCouranteAnalyse.dataFichiers.nomTemplateRejetResultat);

		//activer le premier fichier à charger: fichier PRE_IAE
		ctx.excel.file.open(data.ppCouranteAnalyse.dataFichiers.cheminInputTraitRejet + data.ppCouranteAnalyse.dataFichiers.nomFichierPreIAE);
		ctx.excel.getWorkbook(data.ppCouranteAnalyse.dataFichiers.nomFichierPreIAE);
		var indexDerniereLignePREIAE = ctx.excelF.indexDerniereLigne();
		ctx.excel.sheet.copyRange('1:'+indexDerniereLignePREIAE+'');
		ctx.excel.file.close(data.ppCouranteAnalyse.dataFichiers.nomFichierPreIAE, true);
		ctx.excel.getWorkbook(data.ppCouranteAnalyse.dataFichiers.nomTemplateRejetResultat);
		ctx.excel.sheet.activate('PRE_IAE_FICHIER_IND');
		ctx.excel.sheet.pasteRange('1:'+indexDerniereLignePREIAE+'');
	
		//activate le deuxième fichier à charger: fichier Sf_GRC
		ctx.excel.file.open(data.ppCouranteAnalyse.dataFichiers.cheminInputTraitRejet + data.ppCouranteAnalyse.dataFichiers.nomFichierSfGRCRejet);
		ctx.excel.getWorkbook(data.ppCouranteAnalyse.dataFichiers.nomFichierSfGRCRejet);
		var indexDerniereLigneSfGRC = ctx.excelF.indexDerniereLigne();
		ctx.excel.sheet.copyRange('1:'+indexDerniereLigneSfGRC+'');
		ctx.excel.file.close(data.ppCouranteAnalyse.dataFichiers.nomFichierSfGRCRejet, true);
		ctx.excel.getWorkbook(data.ppCouranteAnalyse.dataFichiers.nomTemplateRejetResultat);
		ctx.excel.sheet.activate('SF_GRC-IND_Rejets');
		ctx.excel.sheet.pasteRange('1:'+indexDerniereLigneSfGRC+'');
	
		//activate le troixième fichier à charger: fichier AC056
		ctx.excel.file.open(data.ppCouranteAnalyse.dataFichiers.cheminInputTraitRejet + data.ppCouranteAnalyse.dataFichiers.nomFichierACGRCIND);
		ctx.excel.getWorkbook(data.ppCouranteAnalyse.dataFichiers.nomFichierACGRCIND);
		var indexDerniereLigneACGRCIND = ctx.excelF.indexDerniereLigne();
		ctx.excel.sheet.copyRange('1:'+indexDerniereLigneACGRCIND+'');
		ctx.excel.file.close(data.ppCouranteAnalyse.dataFichiers.nomFichierACGRCIND, true);
		ctx.excel.getWorkbook(data.ppCouranteAnalyse.dataFichiers.nomTemplateRejetResultat);
		ctx.excel.sheet.activate('Rejets IAE');
		ctx.excel.sheet.pasteRange('1:'+indexDerniereLigneACGRCIND+'');	
		ctx.excel.file.close(data.ppCouranteAnalyse.dataFichiers.nomTemplateRejetResultat, true);
	//	ctx.execRun("taskkill /f /im excel.exe ");
	}catch(ex){
		ctx.traceF.errorTxt('Erreur chargement fichiers dans le pivot');
	}

	sc.endStep();
	return;
}});


/** Description */
GRCHarMu.step({ stTraitementFichierPivot: function(ev, sc, st) {
	var data = sc.data;
	
	sc.endStep();
	return;
}});


/** Description */
GRCHarMu.step({ stOuvertureFichierIAE: function(ev, sc, st) {
	var data = sc.data;
	ctx.excelF.configExcel(data);
	ctx.excelF.ouvertureFichier(data.ppCouranteAnalyse.dataFichiers.cheminRacine + data.ppCouranteAnalyse.dataFichiers.nomFichierATraiter);
	data.varGlobales.ligneCourante = data.scenarioConfig.ANALYSE.excel.debutIndexLigne; //
	data.varGlobales.indexDerniereLigne = ctx.excelF.indexDerniereLigne();
	sc.endStep();
	return;
}});


/** Description */
GRCHarMu.step({ stCopieFichierResultat: function(ev, sc, st) {
	var data = sc.data;
	ctx.excelF.copieFichier(data.ppCouranteAnalyse.dataFichiers.cheminRacine + data.ppCouranteAnalyse.dataFichiers.nomFichierResultatAnalyse, data.scenarioConfig.ANALYSE.excel.debutIndexLigne-1, ctx.excelF.modifierEnteteIAE());
	sc.endStep();
	return;
}});

/** Description */
GRCHarMu.step({ stFinDeclarationData: function(ev, sc, st) {
	var data = sc.data;

	sc.endScenario();
	return;
}});



