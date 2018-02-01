
/** Description */
GRCHarMu.scenario({ scGestionFichiersExcelConfig: function(ev, sc) {
	var data = sc.data;
	sc.onTimeout(30000, function(sc, st) { 
		ctx.traceF.errorTxt('onTimeout : Timeout le scénario scGestionFichiersExcelConfig a été arrêté');
		sc.endScenario();	
	}); // default timeout handler for each step
	sc.onError(function(sc, st, ex) { 
		ctx.traceF.errorTxt('onError : Erreur le scénario scGestionFichiersExcelConfig a été arrêté');
		sc.endScenario();	
	}); // default error handler
	sc.setMode(e.scenario.mode.clearIfRunning);
	// add steps here...
	
	sc.step(GRCHarMu.steps.stDeclarationDataBasique);
	sc.step(GRCHarMu.steps.stDeclarationDataAnalyse);
	sc.step(GRCHarMu.steps.stConfigurationJSON);
	sc.step(GRCHarMu.steps.stChoixRepertoireDansServeur);
	sc.step(GRCHarMu.steps.stEchecInitialisation); 
	sc.step(GRCHarMu.steps.stSuppressionFichier);
	sc.step(GRCHarMu.steps.stConfigTrace);
	sc.step(GRCHarMu.steps.stConfigStat);
	sc.step(GRCHarMu.steps.stRecuperationFichiersRejets);
	//sc.step(GRCHarMu.steps.stInitTraitFichiersRejets);
	
	//sc.step(GRCHarMu.steps.stEchecInitialisation);
	//sc.step(GRCHarMu.steps.stRecuperationFichiersRejets);
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
    controlSeul:'',
		finIndexCol : '',
		carFinIndexCol : ''
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
				tentativeTraitGRC : 1,
			  tabAdhesions : [],
				tabDataExcelS : [],
				statusCreation: false
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
				
				nomTemplateSortie : 'Fichier_Resultats.xlsm', //ancien template de sortie: 'template-sortie.xlsb',
				nomFichierSortie : 'Fichier_Resultats.xlsm', //ancien nom: 'Resultats-Analyse.xlsb'
				
				//nomTemplateSortie : 'template-sortie.xlsb',
				//nomFichierSortie : 'Resultats-Analyse.xlsb',
				nomFichierPreIAE : '',
				nomFichierSfGRCRejet : '',
				nomFichierACGRCIND : '',
				nomsRepertoires : [],
				nomRepertoire : '', //le nom de répertoire sélectionné du serveur de Rennes
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

	//configurer les chemins Data et Resultat sur le R
	data.ppCouranteAnalyse.dataFichiers.cheminData = config.cheminData;
	data.ppCouranteAnalyse.dataFichiers.cheminDataAdhesion = config.cheminDataAdhesion;
	//avant de charger les fichiers, on créé le répertoire date
	if(ctx.fso.folder.exist(data.ppCouranteAnalyse.dataFichiers.cheminData + data.ppCouranteAnalyse.dataFichiers.nomRepertoire) === false){ //création de dossier + depot de résultats dans ce dossier
		ctx.fso.folder.create(data.ppCouranteAnalyse.dataFichiers.cheminData + data.ppCouranteAnalyse.dataFichiers.nomRepertoire);
	}
	ctx.fso.file.deleteInFolder(data.ppCouranteAnalyse.dataFichiers.cheminData + data.ppCouranteAnalyse.dataFichiers.nomRepertoire + '\\');
	data.ppCouranteAnalyse.dataFichiers.cheminResultat = config.cheminResultat;
	ctx.fso.file.deleteInFolder(data.ppCouranteAnalyse.dataFichiers.cheminResultat);
	
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
	var maDate = ctx.getDate()+'';
	var time = ctx.getTime()+'';
	data.ppCouranteAnalyse.dataFichiers.nomFichierLog = maDate.substr(0,4)+''+maDate.substr(5,2)+''+maDate.substr(8,2)+'_'+time.substr(0,2)+''+time.substr(3,2)+''+time.substr(6,2)+ '_' + nomScen + '_Logs.log';
	
	//var nameFichierResultat = maDate.substr(0,4)+''+maDate.substr(5,2)+''+maDate.substr(8,2)+'_'+time.substr(0,2)+''+time.substr(3,2)+''+time.substr(6,2)+'_Analyse_';
	
	
	//Activation trace
	ctx.traceF.constantes.touteTraceActive = config.touteTraceActive;
	// Si le chemin racine existe, on créé le fichier de log
	if(ctx.fso.folder.exist(data.ppCouranteAnalyse.dataFichiers.cheminData + data.ppCouranteAnalyse.dataFichiers.nomRepertoire + '\\')){
		if(!ctx.fso.folder.exist(data.ppCouranteAnalyse.dataFichiers.cheminData + data.ppCouranteAnalyse.dataFichiers.nomRepertoire + '\\Log')){
			ctx.fso.folder.create(data.ppCouranteAnalyse.dataFichiers.cheminData + data.ppCouranteAnalyse.dataFichiers.nomRepertoire + '\\Log\\');
		}
		//if(!ctx.fso.file.exist(data.ppCouranteAnalyse.dataFichiers.cheminData + data.ppCouranteAnalyse.dataFichiers.nomRepertoire + '\\log\\' + data.ppCouranteAnalyse.dataFichiers.nomFichierLog)) {
		ctx.fso.file.create(data.ppCouranteAnalyse.dataFichiers.cheminData + data.ppCouranteAnalyse.dataFichiers.nomRepertoire + '\\Log\\' + data.ppCouranteAnalyse.dataFichiers.nomFichierLog);
		//}
		ctx.traceF.cheminFichierTrace = data.ppCouranteAnalyse.dataFichiers.cheminData + data.ppCouranteAnalyse.dataFichiers.nomRepertoire + '\\Log\\' + data.ppCouranteAnalyse.dataFichiers.nomFichierLog;
		sc.endStep();
		return;
	}else{
		// create the Popup using the 'e.popup.template.OkCancel' template
		var myPopup = ctx.popup('pMyPopup', e.popup.template.OkCancel);
		myPopup.open({title: ' Dossier : '+data.ppCouranteAnalyse.dataFichiers.cheminData + data.ppCouranteAnalyse.dataFichiers.nomRepertoire + ' introuvable',message: ' Veuillez ajouter le dossier et cliquez sur réessayer .',  
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
		data.ppCouranteAnalyse.dataFichiers.cheminFichierStat = data.ppCouranteAnalyse.dataFichiers.cheminData + data.ppCouranteAnalyse.dataFichiers.nomRepertoire + '\\' + data.ppCouranteAnalyse.dataFichiers.nomFichierStat;
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
	
<<<<<<< HEAD
=======
	var time = ctx.getTime()+'';
	var maDate = ctx.getDate()+'';
	var nameFichierResultat = maDate.substr(0,4)+''+maDate.substr(5,2)+''+maDate.substr(8,2)+'_'+time.substr(0,2)+''+time.substr(3,2)+''+time.substr(6,2)+'_Analyse_';
	
>>>>>>> e319c23cd85d2e04d4c3b9d6f9029cf79b6219ba
	ctx.traceF.infoTxt('Version du projet : 1.3 - Date de la Version : ' + GLOBAL.data.projectDate);
	ctx.traceF.infoTxt('******** Fichier d\'entrée: '+data.ppCouranteAnalyse.dataFichiers.cheminInputData +''+data.ppCouranteAnalyse.dataFichiers.nomFichierATraiter);
	data.ppCouranteAnalyse.dataFichiers.nomFichierResultatAnalyse = data.ppCouranteAnalyse.dataFichiers.nomRepertoire +'_'+ data.codeScenario + "_" + ctx.string.left(data.ppCouranteAnalyse.dataFichiers.nomFichierATraiter, data.ppCouranteAnalyse.dataFichiers.nomFichierATraiter.length - extensionFichier.length )  + finTitreResultat + extensionFichier;
	ctx.traceF.infoTxt('******** Ficher de sortie: '+data.ppCouranteAnalyse.dataFichiers.cheminResultats + data.ppCouranteAnalyse.dataFichiers.nomFichierResultatAnalyse);
	ctx.traceF.infoTxt('******** Ficher de trace: '+data.ppCouranteAnalyse.dataFichiers.cheminData + data.ppCouranteAnalyse.dataFichiers.nomRepertoire + '\\' + data.ppCouranteAnalyse.dataFichiers.nomFichierLog);
	data.statistiquesF.nomFichierTraite = data.ppCouranteAnalyse.dataFichiers.nomFichierATraiter;
	//ctx.configF.cheminFichierResultat = data.ppCouranteAnalyse.dataFichiers.cheminResultats + data.ppCouranteAnalyse.dataFichiers.nomFichierResultatAnalyse;
	sc.endStep();
	return;
}});

/** Description */
GRCHarMu.step({ stEchecInitialisation: function(ev, sc, st) {
	var data = sc.data;
	ctx.log('Echec initialisation');
	GRCHarMu.scenarios.clearAll() ;
	sc.endScenario();
	return;
}});


/*
* Avant d'ouvrir le fichier IAE de traitement, on traite les fichiers de rejets
*
*/

/** Récupération de la liste des répertoires das la structure nomsRepertoires */
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
GRCHarMu.step({ stChoixRepertoireDansServeur: function(ev, sc, st) {
	var data = sc.data;
	
	st.onTimeout(120000, function(sc, st){
		ctx.traceF.infoTxt('Timeout du step stChoixRepertoireDansServeur');
		ctx.popup('maPopup').close();
		ctx.popupF.finTraitementMsg('Analyse', 'Robot Analyse à relancer - Temps de réponse trop long');
		//sc.endStep(GRCHarMu.steps.stEchecInitialisation);
		//return;
	});
	
	ctx.traceF.infoTxt('Etape stChoixRepertoireSurServeur: Choix de répertoire de travail');
	
	st.onTimeout(120000, function(sc, st){
		ctx.traceF.infoTxt('Timeout du step stChoixRepertoireDansServeur');
		ctx.popup('maPopup').close();
		ctx.popupF.finTraitementMsg('Analyse', 'Robot Analyse à relancer - Temps de réponse trop long');
	});
	
	var config = data.scenarioConfig[data.codeScenario];
	data.ppCouranteAnalyse.dataFichiers.cheminAccesServeur = config.cheminAccesServeur;
	var listeRep = ctx.fso.folder.getFolderCollection(data.ppCouranteAnalyse.dataFichiers.cheminAccesServeur);
	var selectionRep = undefined;
			var label = "<script>function cl(element) { close(element.id); }</script>";
			label = label + "<p><center> Avec quel dossier souhaitez-vous travailler ? </center><br/><br/><ul>";
			var count = 0;
			var tabRep = [];
			while(!listeRep.atEnd()) {
				var rep = listeRep.item();
				tabRep[count]=rep.Name;
					label = label + "<a href='javascript:void(0)' id='Option"+count+"' onclick='cl(this);' > ";
					label = label + "<b> <li>"+ rep.Name+" </li></b> </a>";
					count += 1;
				listeRep.moveNext();
				}
					
			label = label +"</ul>";
		  var pMaPopup = ctx.popup('maPopup', e.popup.template.NoButton) ;
			pMaPopup.open({	message: label }) ;
			//var it;
			pMaPopup.waitResult(function(res){
				//ctx.log('test 1 ');
				var it = Number(res[6]);
				//ctx.log('test 2');
				/*if(it == 'NaN'){
					sc.endStep(GRCHarMu.steps.stEchecInitialisation);
					return;
				}*/
				selectionRep = tabRep[it];
			 // ctx.log('Résultat cliqué: '+ selectionRep); //le rép séléctionné
				// Quand on clique, res renvoi l'id, dans notre cas id=Option"k".Ce que nous interresse est le "k"
				data.ppCouranteAnalyse.dataFichiers.nomRepertoire =  selectionRep;
				data.ppCouranteAnalyse.dataFichiers.cheminAccesServeur += data.ppCouranteAnalyse.dataFichiers.nomRepertoire + '\\';			
				if(selectionRep != undefined){
					sc.endStep(GRCHarMu.steps.stSuppressionFichier);
					return;
				}else{
					sc.endStep(GRCHarMu.steps.stEchecInitialisation);
					return;
				}
			});
			
}});

/** Description */
GRCHarMu.step({ stRecuperationFichiersRejets: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stRecuperationFichiersRejets : Recherche des fichers de rejets à partir de répertoire ' + data.ppCouranteAnalyse.dataFichiers.cheminAccesServeur);
	ctx.popup('maPopup').close();
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
		//avant de charger les fichiers, on créé le répertoire data et les sous répertoires
		if(data.ppCouranteAnalyse.dataFichiers.nomFichierACGRCIND !== '' && data.ppCouranteAnalyse.dataFichiers.nomFichierPreIAE !== '' && data.ppCouranteAnalyse.dataFichiers.nomFichierSfGRCRejet !== ''){
			//creation des sous répertoires
			if(ctx.fso.folder.exist(data.ppCouranteAnalyse.dataFichiers.cheminData + data.ppCouranteAnalyse.dataFichiers.nomRepertoire + '\\Data_Excel') === false){
				ctx.fso.folder.create(data.ppCouranteAnalyse.dataFichiers.cheminData + data.ppCouranteAnalyse.dataFichiers.nomRepertoire + '\\Data_Excel\\');
			}else{
				ctx.fso.file.deleteInFolder(data.ppCouranteAnalyse.dataFichiers.cheminData + data.ppCouranteAnalyse.dataFichiers.nomRepertoire + '\\Data_Excel\\');
			}
			if(ctx.fso.folder.exist(data.ppCouranteAnalyse.dataFichiers.cheminData + data.ppCouranteAnalyse.dataFichiers.nomRepertoire + '\\Tickets') === false){
				ctx.fso.folder.create(data.ppCouranteAnalyse.dataFichiers.cheminData + data.ppCouranteAnalyse.dataFichiers.nomRepertoire + '\\Tickets\\');
			}else{
				ctx.fso.file.deleteInFolder(data.ppCouranteAnalyse.dataFichiers.cheminData + data.ppCouranteAnalyse.dataFichiers.nomRepertoire + '\\Tickets\\');
			}
			if(ctx.fso.folder.exist(data.ppCouranteAnalyse.dataFichiers.cheminData + data.ppCouranteAnalyse.dataFichiers.nomRepertoire + '\\Data_Serveur') === false){
				ctx.fso.folder.create(data.ppCouranteAnalyse.dataFichiers.cheminData + data.ppCouranteAnalyse.dataFichiers.nomRepertoire + '\\Data_Serveur\\');
			}else{
				ctx.fso.file.deleteInFolder(data.ppCouranteAnalyse.dataFichiers.cheminData + data.ppCouranteAnalyse.dataFichiers.nomRepertoire + '\\Data_Serveur\\');
			}
		}
		//copie de fichier PRE_IAE
		fileNameSrc = data.ppCouranteAnalyse.dataFichiers.cheminAccesServeur + data.ppCouranteAnalyse.dataFichiers.nomFichierPreIAE;
		fileNameDst = data.ppCouranteAnalyse.dataFichiers.cheminData + data.ppCouranteAnalyse.dataFichiers.nomRepertoire + '\\Data_Serveur\\' + data.ppCouranteAnalyse.dataFichiers.nomFichierPreIAE;
		//fileNameDst = data.ppCouranteAnalyse.dataFichiers.cheminInputData + data.ppCouranteAnalyse.dataFichiers.nomFichierPreIAE;
		ctx.fso.file.copy(fileNameSrc, fileNameDst, true);
		
		//copie de fichier SF_GRC
		fileNameSrc = data.ppCouranteAnalyse.dataFichiers.cheminAccesServeur + data.ppCouranteAnalyse.dataFichiers.nomFichierSfGRCRejet;
		fileNameDst = data.ppCouranteAnalyse.dataFichiers.cheminData + data.ppCouranteAnalyse.dataFichiers.nomRepertoire + '\\Data_Serveur\\' + data.ppCouranteAnalyse.dataFichiers.nomFichierSfGRCRejet;
		//fileNameDst = data.ppCouranteAnalyse.dataFichiers.cheminInputData + data.ppCouranteAnalyse.dataFichiers.nomFichierSfGRCRejet;
		ctx.fso.file.copy(fileNameSrc, fileNameDst, true);
		
		//copie de fichier AC056
		fileNameSrc = data.ppCouranteAnalyse.dataFichiers.cheminAccesServeur + data.ppCouranteAnalyse.dataFichiers.nomFichierACGRCIND;
		fileNameDst = data.ppCouranteAnalyse.dataFichiers.cheminData + data.ppCouranteAnalyse.dataFichiers.nomRepertoire + '\\Data_Serveur\\' + data.ppCouranteAnalyse.dataFichiers.nomFichierACGRCIND;
		//fileNameDst = data.ppCouranteAnalyse.dataFichiers.cheminInputData + data.ppCouranteAnalyse.dataFichiers.nomFichierACGRCIND;
		ctx.fso.file.copy(fileNameSrc, fileNameDst, true);
		ctx.wait(function(ev){
			 	ctx.traceF.infoTxt('************************ Fin try\catch - lecture fichiers du serveur');
				sc.endStep();
				return;
			}, 1000);
	}catch(ex){
		ctx.traceF.errorTxt('Fichiers des rejets IAE introuvables');
		data.ppCouranteAnalyse.notes.msgPopup = ctx.notes.popup.msg.dataIndispo;
		sc.endStep(GRCHarMu.steps.stFinDeclarationData);
		return;
	}
}});


// ouverture des 3 fichiers 

/** Description */
GRCHarMu.step({ stOuvertureCopieFichiersInputRejet: function(ev, sc, st) {
	var data = sc.data;
	
	st.onTimeout(40000, function(sc, st){
		ctx.traceF.infoTxt('Timeout du step stOuvertureCopieFichiersInputRejet');
	});
	
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
		//ctx.excel.file.saveAs(data.ppCouranteAnalyse.dataFichiers.cheminInputData + data.ppCouranteAnalyse.dataFichiers.nomFichierATraiter);
		ctx.excel.file.saveAs(data.ppCouranteAnalyse.dataFichiers.cheminData + data.ppCouranteAnalyse.dataFichiers.nomRepertoire + '\\Data_Serveur\\' + data.ppCouranteAnalyse.dataFichiers.nomFichierATraiter);
		
		//activer le premier fichier à charger: fichier PRE_IAE
		//ctx.excel.file.open(data.ppCouranteAnalyse.dataFichiers.cheminInputData + data.ppCouranteAnalyse.dataFichiers.nomFichierPreIAE);
		ctx.excel.file.open(data.ppCouranteAnalyse.dataFichiers.cheminData + data.ppCouranteAnalyse.dataFichiers.nomRepertoire + '\\Data_Serveur\\' + data.ppCouranteAnalyse.dataFichiers.nomFichierPreIAE);
		ctx.excel.getWorkbook(data.ppCouranteAnalyse.dataFichiers.nomFichierPreIAE);
		var indexDerniereLignePREIAE = ctx.excelF.indexDerniereLigne();
		ctx.excel.sheet.copyRange('1:'+indexDerniereLignePREIAE+'');
		ctx.excel.file.close(data.ppCouranteAnalyse.dataFichiers.nomFichierPreIAE, true);
		ctx.excel.getWorkbook(data.ppCouranteAnalyse.dataFichiers.nomFichierATraiter);
		ctx.excel.sheet.activate('PRE_IAE_FICHIER_IND');
		ctx.excel.sheet.pasteRange('1:'+indexDerniereLignePREIAE+'');
	
		//activate le deuxième fichier à charger: fichier Sf_GRC
		//ctx.excel.file.open(data.ppCouranteAnalyse.dataFichiers.cheminInputData + data.ppCouranteAnalyse.dataFichiers.nomFichierSfGRCRejet);
		ctx.excel.file.open(data.ppCouranteAnalyse.dataFichiers.cheminData + data.ppCouranteAnalyse.dataFichiers.nomRepertoire + '\\Data_Serveur\\' + data.ppCouranteAnalyse.dataFichiers.nomFichierSfGRCRejet);
		ctx.excel.getWorkbook(data.ppCouranteAnalyse.dataFichiers.nomFichierSfGRCRejet);
		var indexDerniereLigneSfGRC = ctx.excelF.indexDerniereLigne();
		ctx.excel.sheet.copyRange('1:'+indexDerniereLigneSfGRC+'');
		ctx.excel.file.close(data.ppCouranteAnalyse.dataFichiers.nomFichierSfGRCRejet, true);
		ctx.excel.getWorkbook(data.ppCouranteAnalyse.dataFichiers.nomFichierATraiter);
		ctx.excel.sheet.activate('SF_GRC-IND_Rejets');
		ctx.excel.sheet.pasteRange('1:'+indexDerniereLigneSfGRC+'');
	
		//activate le troixième fichier à charger: fichier AC056
		//ctx.excel.file.open(data.ppCouranteAnalyse.dataFichiers.cheminInputData + data.ppCouranteAnalyse.dataFichiers.nomFichierACGRCIND);
		ctx.excel.file.open(data.ppCouranteAnalyse.dataFichiers.cheminData + data.ppCouranteAnalyse.dataFichiers.nomRepertoire + '\\Data_Serveur\\' + data.ppCouranteAnalyse.dataFichiers.nomFichierACGRCIND);
		ctx.excel.getWorkbook(data.ppCouranteAnalyse.dataFichiers.nomFichierACGRCIND);
		var indexDerniereLigneACGRCIND = ctx.excelF.indexDerniereLigne();
		ctx.excel.sheet.copyRange('1:'+indexDerniereLigneACGRCIND+'');
		ctx.excel.file.close(data.ppCouranteAnalyse.dataFichiers.nomFichierACGRCIND, true);
		ctx.excel.getWorkbook(data.ppCouranteAnalyse.dataFichiers.nomFichierATraiter);
		ctx.excel.sheet.activate('Rejets IAE');
		ctx.excel.sheet.pasteRange('1:'+indexDerniereLigneACGRCIND+'');	
		ctx.excel.sheet.activate('Mode d\'emploi');
		ctx.excel.sheet.selectRange('C10:H10');
		
		ctx.wait(function(ev){
			 	ctx.traceF.infoTxt('************************ Fin try\catch - génération du fichier PRE_IAE');
				sc.endStep();
				return;
		}, 1000);
	}catch(ex){
		ctx.traceF.errorTxt('Erreur chargement fichiers dans le pivot');
		sc.endStep();
		return;
	}
	
}});


/** Description */
GRCHarMu.step({ stCopieFichierResultat: function(ev, sc, st) {
	var data = sc.data;
	//ctx.excelF.copieFichier(data.ppCouranteAnalyse.dataFichiers.cheminResultats + data.ppCouranteAnalyse.dataFichiers.nomFichierResultatAnalyse, data.scenarioConfig.ANALYSE.excel.debutIndexLigne-1, ctx.excelF.modifierEnteteIAE());
	ctx.excelF.copieFichier(data.ppCouranteAnalyse.dataFichiers.cheminData + data.ppCouranteAnalyse.dataFichiers.nomRepertoire +'\\'+ data.ppCouranteAnalyse.dataFichiers.nomFichierResultatAnalyse, data.scenarioConfig.ANALYSE.excel.debutIndexLigne-1, ctx.excelF.modifierEnteteIAE());
	
 	data.varGlobales.ligneCourante = data.scenarioConfig.ANALYSE.excel.debutIndexLigne; //
	data.varGlobales.indexDerniereLigne = ctx.excelF.indexDerniereLigne();
	data.varGlobales.finIndexCol =  data.scenarioConfig.ANALYSE.excel.finIndexCol;
  data.varGlobales.carFinIndexCol =  data.scenarioConfig.ANALYSE.excel.carFinIndexCol;
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



