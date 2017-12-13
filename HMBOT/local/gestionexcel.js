
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
	sc.step(GRCHarMu.steps.stSuppressionFichier);
	sc.step(GRCHarMu.steps.stConfigTrace);
	sc.step(GRCHarMu.steps.stConfigStat);
	
	sc.step(GRCHarMu.steps.stInitTraitFichiersRejets);
	sc.step(GRCHarMu.steps.stRechercheRepertoire);
	sc.step(GRCHarMu.steps.stRecuperationFichiersRejets);
	sc.step(GRCHarMu.steps.stOuvertureCopieFichiersInputRejet);
	
	sc.step(GRCHarMu.steps.stChargementFichierDeSortie);	
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
	
	data.statistiquesF = {
		nomFichierTraite : '', // === nomFichierATraiter le fichier d'entrée
    nbCasTrouve : 0,
		dureeTraitement : 0,
		FinTpsTraitement : 0,
		debutTpsTraitement : ctx.dateF.conversionEnSecondes(new Date()),
    nbCasTraitementSucces : 0, // countCaseSuccessProcessed
    nbCasTraitementEchec : 0 //countCaseFailProcessed
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
			  //tabAdhesions : [],
				//tabDataExcelS : []
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
				payeurEgSouscripteur : '',
				msgPopup : ''
			},
			dataFichiers: {
				nomTemplate : 'templateIAE.xlsb',
				nomFichierConfigScenario: 'configAnalyseSituation.json',
				nomFichierATraiter : '', //nom du fichier d'entrée
				nomFichierResultatAnalyse: '', //fichier résultat technique
				nomTemplateRejet: 'PRE_IAE_FICHIER-IND.xlsb',
				nomTemplateSortie : 'template-sortie.xlsb',
				nomFichierSortie : 'Resultats-Analyse.xlsb',
				nomFichierPreIAE : '',
				nomFichierSfGRCRejet : '',
				nomFichierACGRCIND : '',
				nomsRepertoires : [],
				cheminRacine : '',
				nomFichierLog : '',
				cheminFichierConfigAnalyse : '',
				cheminTemplateStat : '',
				nomTemplateStat : '',
				nomFichierStat : '',
				cheminFichierStat : '',
				cheminTemplateExcel : '',
				cheminInputData : '',
				cheminResultats : ''
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
	ctx.traceF.infoTxt('++++++++ Etape configuration JSON');
	var fichierConfigScenario = data.ppCouranteAnalyse.dataFichiers.nomFichierConfigScenario;
	data.ppCouranteAnalyse.dataFichiers.cheminFichierConfigAnalyse = ctx.options.serverURL + '\\' + fichierConfigScenario;
	data.ppCouranteAnalyse.dataFichiers.cheminTemplateExcel = ctx.options.serverURL + '\\template\\';
	var fichierConfig = ctx.fso.file.read(data.ppCouranteAnalyse.dataFichiers.cheminFichierConfigAnalyse);
	data.scenarioConfig = new confFileANALYSEClass();
	data.scenarioConfig = JSON.parse(fichierConfig);
	//data.excelSortie = data.scenarioConfig[data.codeScenario].excelSortie;
	sc.endStep();
	return;
}});


/** Description */
GRCHarMu.step({ stSuppressionFichier: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stSuppressionFichier: suppression des fichiers de répetoires data, résultats et analyse');
	var config = data.scenarioConfig[data.codeScenario];
	//configurer chemin racine
	data.ppCouranteAnalyse.dataFichiers.cheminRacine = config.cheminRacine;
	ctx.fso.file.deleteInFolder(data.ppCouranteAnalyse.dataFichiers.cheminRacine);
	//configuer cheminInputData
	data.ppCouranteAnalyse.dataFichiers.cheminInputData =  config.cheminInputData;
	ctx.fso.file.deleteInFolder(data.ppCouranteAnalyse.dataFichiers.cheminInputData);
	//configurer cheminResultats
	data.ppCouranteAnalyse.dataFichiers.cheminResultats = config.cheminResultats;
	ctx.fso.file.deleteInFolder(data.ppCouranteAnalyse.dataFichiers.cheminResultats);
	sc.endStep();
	return;
}});

/** Description */
GRCHarMu.step({ stConfigTrace: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('++++++++ Etape configuration trace');
	var config = data.scenarioConfig[data.codeScenario];
	var nomScen = data.codeScenario;
	//data.ppCouranteAnalyse.dataFichiers.cheminRacine = config.cheminRacine;
	data.ppCouranteAnalyse.dataFichiers.nomFichierLog = ctx.dateF.formatAAAAMMJJ(new Date()) + '_' + nomScen + '_Logs.log';
	
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
		});
		// wait until the Popup closes 
		myPopup.waitResult(function(res){
	  	if (res == 'essaye') {
	    	sc.endStep(ActivInfinitev7.steps.stConfigTrace);
				return;
	  	}else{
				sc.endStep(ActivInfinitev7.steps.stEchecInitialisation);
				return;
			}
		});
	}
}});


/** Description */
GRCHarMu.step({ stConfigStat: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('++++++++ Etape configuration statistique');
	var config = data.scenarioConfig[data.codeScenario];
	data.ppCouranteAnalyse.dataFichiers.cheminTemplateStat = config.cheminTemplateStat;
	var nomScen = data.codeScenario;
	data.ppCouranteAnalyse.dataFichiers.nomTemplateStat = nomScen + '.html';
	data.ppCouranteAnalyse.dataFichiers.nomFichierStat = ctx.dateF.formatAAAAMMJJ(new Date()) +'_'+ nomScen + '_Stats'; 
  if (!ctx.fso.file.exist(data.ppCouranteAnalyse.dataFichiers.cheminTemplateStat + data.ppCouranteAnalyse.dataFichiers.nomTemplateStat)) {
    ctx.traceF.errorTxt(' Le fichier de template n\'est pas trouvé pour ' + nomScen + ' scenario');
		sc.endStep();
		return;
  }else{	
		data.ppCouranteAnalyse.dataFichiers.cheminFichierStat = data.ppCouranteAnalyse.dataFichiers.cheminRacine + data.ppCouranteAnalyse.dataFichiers.nomFichierStat;
		var fileSrc = '';
		var fileDst = '';
  	try{
			fileSrc = data.ppCouranteAnalyse.dataFichiers.cheminTemplateStat + data.ppCouranteAnalyse.dataFichiers.nomTemplateStat;
			fileDst = data.ppCouranteAnalyse.dataFichiers.cheminFichierStat + '.html';
    	ctx.fso.file.copy(fileSrc, fileDst, true);
  	}catch(ex) {
    	ctx.traceF.errorTxt(' Impossible de copier le fichier de template : ' + fileSrc + ' vers ' + fileDst + '.html');
  	}
		var contenuTemplate = '';
  	try {
    	contenuTemplate = ctx.fso.file.read(data.ppCouranteAnalyse.dataFichiers.cheminFichierStat + '.html');
 		}catch(ex) {
    	ctx.traceF.errorTxt('Impossible de lire le fichier : ' + data.ppCouranteAnalyse.dataFichiers.cheminFichierStat + data.ppCouranteAnalyse.dataFichiers.nomFichierStat + '.html');
  	}
  	// on enregistre le chemin dans l'objet statsF ( necessaire pour la fonction ctx.statsF.remplir() -> à revoir  )
  	ctx.statsF.cheminFichierStats = data.ppCouranteAnalyse.dataFichiers.cheminFichierStat;
  	ctx.statsF.contenuTemplate = contenuTemplate; 
  	// on enregistre l'heure de debut de traitement
  	//data.statistiquesF.debutTpsTraitement=ctx.dateF.conversionEnSecondes(new Date());
		sc.endStep();
		return;
	}              
}});



/** Description */
GRCHarMu.step({ stChargementFichierDeSortie: function(ev, sc, st) {
	var data = sc.data;
	//var config = data.scenarioConfig[data.codeScenario];
	var finTitreResultat = '_Resultats';
	var extensionFichier = '.xlsb';
	ctx.traceF.infoTxt('Version du projet : 1.2 - Date de la Version : ' + GLOBAL.data.projectDate);
	ctx.traceF.infoTxt('******** Fichier d\'entrée: '+data.ppCouranteAnalyse.dataFichiers.cheminInputData +''+data.ppCouranteAnalyse.dataFichiers.nomFichierATraiter);
	data.ppCouranteAnalyse.dataFichiers.nomFichierResultatAnalyse = data.codeScenario + "_" + ctx.string.left(data.ppCouranteAnalyse.dataFichiers.nomFichierATraiter, data.ppCouranteAnalyse.dataFichiers.nomFichierATraiter.length - extensionFichier.length )  + finTitreResultat + extensionFichier;
	ctx.traceF.infoTxt('******** Ficher de sortie: '+data.ppCouranteAnalyse.dataFichiers.cheminResultats + data.ppCouranteAnalyse.dataFichiers.nomFichierResultatAnalyse);
	ctx.traceF.infoTxt('******** Ficher de trace: '+data.ppCouranteAnalyse.dataFichiers.cheminRacine + data.ppCouranteAnalyse.dataFichiers.nomFichierLog);
	data.statistiquesF.nomFichierTraite = data.ppCouranteAnalyse.dataFichiers.nomFichierATraiter;
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
	data.ppCouranteAnalyse.dataFichiers.cheminAccesServeur = config.cheminAccesServeur;
	var folders = ctx.fso.folder.getFolderCollection(data.ppCouranteAnalyse.dataFichiers.cheminAccesServeur);
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
	ctx.traceF.infoTxt('Etape stRechercheRepertoire: Sélection répertoire de data');
	data.ppCouranteAnalyse.dataFichiers.cheminAccesServeur += data.ppCouranteAnalyse.dataFichiers.nomsRepertoires[data.ppCouranteAnalyse.dataFichiers.nomsRepertoires.length-2]+'\\';
	sc.endStep();
	return;
}});


/** Description */
GRCHarMu.step({ stRecuperationFichiersRejets: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stRecuperationFichiersRejets : Recherche des fichers de rejets à partir de répertoire ' + data.ppCouranteAnalyse.dataFichiers.cheminAccesServeur);
	var fichiers = ctx.fso.folder.getFileCollection(data.ppCouranteAnalyse.dataFichiers.cheminAccesServeur);
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
		fileNameSrc = data.ppCouranteAnalyse.dataFichiers.cheminAccesServeur + data.ppCouranteAnalyse.dataFichiers.nomFichierPreIAE;
		fileNameDst = data.ppCouranteAnalyse.dataFichiers.cheminInputData + data.ppCouranteAnalyse.dataFichiers.nomFichierPreIAE;
		ctx.fso.file.copy(fileNameSrc, fileNameDst, true);
		//copie de fichier SF_GRC
		fileNameSrc = data.ppCouranteAnalyse.dataFichiers.cheminAccesServeur + data.ppCouranteAnalyse.dataFichiers.nomFichierSfGRCRejet;
		fileNameDst = data.ppCouranteAnalyse.dataFichiers.cheminInputData + data.ppCouranteAnalyse.dataFichiers.nomFichierSfGRCRejet;
		ctx.fso.file.copy(fileNameSrc, fileNameDst, true);
		
		//copie de fichier AC056
		fileNameSrc = data.ppCouranteAnalyse.dataFichiers.cheminAccesServeur + data.ppCouranteAnalyse.dataFichiers.nomFichierACGRCIND;
		fileNameDst = data.ppCouranteAnalyse.dataFichiers.cheminInputData + data.ppCouranteAnalyse.dataFichiers.nomFichierACGRCIND;
		ctx.fso.file.copy(fileNameSrc, fileNameDst, true);
	}catch(ex){
		ctx.traceF.errorTxt('Fichiers des rejets IAE introuvables');
		if(data.ppCouranteAnalyse.dataFichiers.nomFichierACGRCIND === '' || data.ppCouranteAnalyse.dataFichiers.nomFichierPreIAE === '' || data.ppCouranteAnalyse.dataFichiers.nomFichierSfGRCRejet === ''){
			data.ppCouranteAnalyse.notes.msgPopup = ctx.notes.popup.msg.dataIndispo;
			sc.endStep(GRCHarMu.steps.stFinDeclarationData);
			return;
		}
	}
	sc.endStep();
	return;
}});


// ouverture des 3 fichiers 

/** Description */
GRCHarMu.step({ stOuvertureCopieFichiersInputRejet: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stOuvertureCopieFichiersInputRejet: ouverture/chargement des fichiers');
	ctx.excel.release();
	ctx.excel.initialize();
	var maDate = ctx.getDate()+'';
	var extensionNomFichierResultat = maDate.substr(0,4)+''+maDate.substr(5,2)+''+maDate.substr(8,2);
	data.ppCouranteAnalyse.dataFichiers.nomFichierATraiter = extensionNomFichierResultat +'_'+ data.ppCouranteAnalyse.dataFichiers.nomTemplateRejet;
	ctx.excelF.configExcel(data);
	try{
		//ouverture du fichier pivot ==> fichier template 
		ctx.excel.file.open(data.ppCouranteAnalyse.dataFichiers.cheminTemplateExcel + data.ppCouranteAnalyse.dataFichiers.nomTemplateRejet);
		//copie du fichier pivot
		ctx.excel.file.saveAs(data.ppCouranteAnalyse.dataFichiers.cheminInputData + data.ppCouranteAnalyse.dataFichiers.nomFichierATraiter);
		
		//activer le premier fichier à charger: fichier PRE_IAE
		ctx.excel.file.open(data.ppCouranteAnalyse.dataFichiers.cheminInputData + data.ppCouranteAnalyse.dataFichiers.nomFichierPreIAE);
		ctx.excel.getWorkbook(data.ppCouranteAnalyse.dataFichiers.nomFichierPreIAE);
		var indexDerniereLignePREIAE = ctx.excelF.indexDerniereLigne();
		ctx.excel.sheet.copyRange('1:'+indexDerniereLignePREIAE+'');
		ctx.excel.file.close(data.ppCouranteAnalyse.dataFichiers.nomFichierPreIAE, true);
		ctx.excel.getWorkbook(data.ppCouranteAnalyse.dataFichiers.nomFichierATraiter);
		ctx.excel.sheet.activate('PRE_IAE_FICHIER_IND');
		ctx.excel.sheet.pasteRange('1:'+indexDerniereLignePREIAE+'');
	
		//activate le deuxième fichier à charger: fichier Sf_GRC
		ctx.excel.file.open(data.ppCouranteAnalyse.dataFichiers.cheminInputData + data.ppCouranteAnalyse.dataFichiers.nomFichierSfGRCRejet);
		ctx.excel.getWorkbook(data.ppCouranteAnalyse.dataFichiers.nomFichierSfGRCRejet);
		var indexDerniereLigneSfGRC = ctx.excelF.indexDerniereLigne();
		ctx.excel.sheet.copyRange('1:'+indexDerniereLigneSfGRC+'');
		ctx.excel.file.close(data.ppCouranteAnalyse.dataFichiers.nomFichierSfGRCRejet, true);
		ctx.excel.getWorkbook(data.ppCouranteAnalyse.dataFichiers.nomFichierATraiter);
		ctx.excel.sheet.activate('SF_GRC-IND_Rejets');
		ctx.excel.sheet.pasteRange('1:'+indexDerniereLigneSfGRC+'');
	
		//activate le troixième fichier à charger: fichier AC056
		ctx.excel.file.open(data.ppCouranteAnalyse.dataFichiers.cheminInputData + data.ppCouranteAnalyse.dataFichiers.nomFichierACGRCIND);
		ctx.excel.getWorkbook(data.ppCouranteAnalyse.dataFichiers.nomFichierACGRCIND);
		var indexDerniereLigneACGRCIND = ctx.excelF.indexDerniereLigne();
		ctx.excel.sheet.copyRange('1:'+indexDerniereLigneACGRCIND+'');
		ctx.excel.file.close(data.ppCouranteAnalyse.dataFichiers.nomFichierACGRCIND, true);
		ctx.excel.getWorkbook(data.ppCouranteAnalyse.dataFichiers.nomFichierATraiter);
		ctx.excel.sheet.activate('Rejets IAE');
		ctx.excel.sheet.pasteRange('1:'+indexDerniereLigneACGRCIND+'');	
		ctx.excel.sheet.activate('Mode d\'emploi');
		ctx.excel.sheet.selectRange('C10:H10');
	}catch(ex){
		ctx.traceF.errorTxt('Erreur chargement fichiers dans le pivot');
	}
	sc.endStep();
	return;
}});


/** Description */
GRCHarMu.step({ stCopieFichierResultat: function(ev, sc, st) {
	var data = sc.data;
	ctx.excelF.copieFichier(data.ppCouranteAnalyse.dataFichiers.cheminResultats + data.ppCouranteAnalyse.dataFichiers.nomFichierResultatAnalyse, data.scenarioConfig.ANALYSE.excel.debutIndexLigne-1, ctx.excelF.modifierEnteteIAE());
	data.varGlobales.ligneCourante = data.scenarioConfig.ANALYSE.excel.debutIndexLigne; //
	data.varGlobales.indexDerniereLigne = ctx.excelF.indexDerniereLigne();
	sc.endStep();
	return;
}});

/** Description */
GRCHarMu.step({ stFinDeclarationData: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stFinDeclarationData: Fin scénario gestion data');
	sc.endScenario();
	return;
}});



