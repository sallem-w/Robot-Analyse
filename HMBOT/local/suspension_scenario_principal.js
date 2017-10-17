
/** Description */
ActivInfinitev7.scenario({ SuspensionScenarioPrincipal: function(ev, sc) {
	var data = sc.data;
	sc.onTimeout(150000, function(sc, st) { sc.endScenario();	}); // default timeout handler for each step
	sc.onError(function(sc, st, ex) { sc.endScenario();	}); // default error handler
	sc.setMode(e.scenario.mode.clearIfRunning);
	// add steps here...
	ctx.log('Etapes du scénario');
	sc.step(ActivInfinitev7.steps.stInitScenarioSuspension);
	sc.step(ActivInfinitev7.steps.stServerConnexionSuspension);
	sc.step(ActivInfinitev7.steps.stInitPivot);
	sc.step(ActivInfinitev7.steps.stSelectSuspension);
	sc.step(ActivInfinitev7.steps.stLancerVerificationContratCondition);
	//sc.step(ActivInfinitev7.steps.stLancerVerificationContrat);
	
	
	sc.step(ActivInfinitev7.steps.stInitScVerifContratSuspension);
	sc.step(ActivInfinitev7.steps.stNavigationSyntheseSuspension);
	sc.step(ActivInfinitev7.steps.stDebutRechercheBenefSynthese);
	sc.step(ActivInfinitev7.steps.stFinRechercheBenefSynthese);
	sc.step(ActivInfinitev7.steps.stLectureSynthese);
	sc.step(ActivInfinitev7.steps.stComparaisonNomsPrenomsAdresse);
	//sc.step(ActivInfinitev7.steps.stClickPourRetourDashbord);
	//sc.step(ActivInfinitev7.steps.stRetourDashbord);
	sc.step(ActivInfinitev7.steps.stFinScVerifContratSuspension);
	
	sc.step(ActivInfinitev7.steps.stResiliationSuspensionCondition);
	//sc.step(ActivInfinitev7.steps.stResiliationSuspension);
	
	sc.step(ActivInfinitev7.steps.stInitResilContratSuspension);
	sc.step(ActivInfinitev7.steps.stRechercheContratSuspension);
	sc.step(ActivInfinitev7.steps.choixProchainStep);
	sc.step(ActivInfinitev7.steps.stRechercheContratSuspensionError);
	sc.step(ActivInfinitev7.steps.stGestionBoutonContunuerResiliation);
	sc.step(ActivInfinitev7.steps.stNaviguerVersBlocNotesSuspension);
	sc.step(ActivInfinitev7.steps.stNaviguerVersCalculParamSuspension);
	sc.step(ActivInfinitev7.steps.stNaviguerVersHistoCotisationsSuspension);
	sc.step(ActivInfinitev7.steps.stNaviguerVersVisuCompteCotisantSuspension);
	sc.step(ActivInfinitev7.steps.stValidationCalculSuspension);
	sc.step(ActivInfinitev7.steps.stSauvegardeSuspension);	
	sc.step(ActivInfinitev7.steps.stFinResiliationSuspension);
	
	
	sc.step(ActivInfinitev7.steps.stLancerVerificationSoldeContratCondition);
	//sc.step(ActivInfinitev7.steps.stLancerVerificationSoldeContrat);
	
	sc.step(ActivInfinitev7.steps.stInitVerificationSoldeSuspension);
	sc.step(ActivInfinitev7.steps.stRechercheSoldeSuspension);
	sc.step(ActivInfinitev7.steps.stVisualisationSoldeSuspension);
	sc.step(ActivInfinitev7.steps.stFinVisualisationSoldeSuspension);
	
	sc.step(ActivInfinitev7.steps.stMiseAjourVarGloblalesSuspension);
	sc.step(ActivInfinitev7.steps.stInsertDonneesSuspensionExcel);
	sc.step(ActivInfinitev7.steps.stContratSuspensionSuivant);
	sc.step(ActivInfinitev7.steps.stFinScenarioSuspension);
}});





/** Description */
ActivInfinitev7.step({ stInitScenarioSuspension: function(ev, sc, st) {
	var data = sc.data;

	ctx.traceF.infoTxt('stInitScenarioSuspension');
	var headerNames = {};
	var scenarioConfig = '';
  var contracts = {};
	var contratsSuspension = {};
	var contratCourantSuspension = {};
 	var countContracts = 0;
	var countContratsSuspension = 0;
	var indexContrat = 0;
	var indexDerniereLigne = 0;
	var indexLextureSynthese = 0;
	var debutIndexLigne = 0;
	var ligneCourante = 1;
	var indexLectureSynthese = 0;
	var names = []
	var constantes = {
		adhesionIndividuelle : 'Adhésion ind',
		adhesion : 'ADH',
		moins :'-'
	} 
	var noContrat = 0;	
	var notes = {
		commentaireContrat : '',
		statutsContrat : '',
		dateTraitementContrat : ''
	};
	var infos = {};
	var statuts ={
		faireResiliationContrat : false,
		finSuspensionProcessus : false,
		lancerVerificationSoldeContrat : false
	};
	//var reprisePoolingContinuer = false;
	
	var indexColonne = {
				type : 1,
				numeroRO : 2,
				dateExtraction:3,
				prenom :4,
				nom : 5,
				adresse : 6,
				localite : 7,
				dateNaissance : 8,
		    dateEntreeFiliale : 9,
				dateDispenseOuSuspension : 10,
				numeroContrat : 11,
				dateTraitementContrat : 12,
				statutsContrat : 13,
				commentaireContrat : 14
		}
	
	var paramConfigExcel ={
			debutIndexCol : 1,
			debutIndexLigne : 2
	};
	var statistiques ={
		nbCasTraite : 0,
		nbCasTrouveDsExcel : 0,
		nbCasTraitementSucces : 0,
		nbCasTraitementEchec : 0,
		nbCasRevoirCentre : 0
	}
	var webData = {
            url:'htt://exemple.com',
            tabDeBordURL:'', 
            identifiant:'', 
            motDePasse:'' 
        }
	
	paramConfigExcel.indexColonne = indexColonne;
	data.contracts = contracts;
	data.countContracts = countContracts;
	contratCourantSuspension.noContrat = noContrat;
	data.contratsSuspension = contratsSuspension ;
	contratCourantSuspension.notes = notes;
	contratCourantSuspension.infos = infos; // A partir de la lecture effectuée dans le fichier config.json, on remarque que les différentes clés associées à contratSuspension.infos sont 
	//Adresse, DateDispenseOuSuspension, DateEntreeFiliale, DateExtraction, Localite, Nom, Prenom, RONumber, type
	contratCourantSuspension.statuts= statuts;
	data.contratCourantSuspension = contratCourantSuspension;
	data.countContratsSuspension = countContratsSuspension;
	
	data.webData = webData;
	data.paramConfigExcel = paramConfigExcel;
	data.headerNames = headerNames;
	data.constantes = constantes;
	//data.reprisePoolingContinuer = reprisePoolingContinuer;
	
	data.indexContrat = indexContrat;
	data.indexLectureSynthese = indexLectureSynthese;
	data.indexDerniereLigne = indexDerniereLigne;
	data.ligneCourante = ligneCourante ;
	data.names = names;
	data.statuts = statuts;
	
	data.statistiques = statistiques ;	
	data.codeDuScenario =ctx.configF.scenario.Suspension;

	sc.endStep();
	return;
}});




/** Description */
ActivInfinitev7.step({ stServerConnexionSuspension : function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Début étape - stServerConnexionSuspension');
	/*	if (ActivInfinitev7.pServeurWebFerme.exist() && ActivInfinitev7.pServeurWebFerme.oMessageErreur.exist()) {
			ctx.traceF.infoTxt('Le serveur Infinite est fermé');
			ctx.popupF.newPopup('Le serveur Infinite est fermé');
			return ;
		}

		if (!ActivInfinitev7.pConnexion.exist()) {
			ctx.traceF.infoTxt('Open Infinite on connection page');
			ctx.popupF.newPopup('Il faut ouvrir et rentrer ces identifiants dans Infinite');
			return ;
		}
	ctx.log(" Test URL : "+ data.webData.url);
	data.webData.url = ActivInfinitev7.pConnexion.getInfos().location.href;
	data.webData.identifiant = ActivInfinitev7.pConnexion.oIdentifiant.get();
	data.webData.motDePasse = ActivInfinitev7.pConnexion.oPwd.get();
		
		//on entre dans Infinite
		ActivInfinitev7.pConnexion.btConnexion.click();*/
		ActivInfinitev7.pTabDeBord.wait(function(ev) {
		var infos = ActivInfinitev7.pTabDeBord.getInfos();
		
		data.webData.tabDeBordURL=infos.document.URL;
		ctx.log('URL de Tableau de bord : ' + data.webData.tabDeBordURL);
		sc.endStep();
		return;
		});
}
});

ActivInfinitev7.step({ stSelectSuspension: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('stSelectSuspension');
	var a = data.contracts[0]['Type'];
	
	var indexSuspension = 0;
	
	for (var index = 0; index < data.countContracts; index++)
	{
		if (data.contracts[index]['Type']== 'SUSPENSION')
		{
			data.contratsSuspension[indexSuspension] = data.contracts[index] ;
			indexSuspension++;
		}
	}
	if(indexSuspension==0)
	{
		sc.endStep(ActivInfinitev7.steps.stFinScenarioSuspension);
		return;
	}
	sc.endStep();
	return;
}});



ActivInfinitev7.step({ stLancerVerificationContratCondition: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.simpleTxt(data.contratCourantSuspension.infos['RONumber'] + ' Début du traitement spécigfique de la suspension');
	ctx.traceF.infoTxt('stLancerVerificationContratCondition');
	data.countContratsSuspension = Object.keys(data.contratsSuspension).length;
	if (data.countContratsSuspension !== 0)
	{
		//choix du contrat de suspension sur lequel on va travailler
		data.contratCourantSuspension.infos = data.contratsSuspension[data.indexContrat];
		sc.endStep();
		return;
	}
	else 
	{
		ctx.traceF.infoTxt('Aucun contrat de Suspension n\'est proposé dans le fichier JSON.');
		data.contratCourantSuspension.noContrat ='';

		sc.endStep(ActivInfinitev7.steps.stMiseAjourVarGloblalesSuspension);
		return;
	}
}});




/*ActivInfinitev7.step({ stLancerVerificationContrat: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('stLancerVerificationContrat');
	// on desactive le TimeOut principal afin que le timeOut execute soit celui du sous-scenario
	st.disableTimeout();	
	var scASC = ActivInfinitev7.scenarios.scVerifContratSuspension.start(data).onEnd(function(sc2){
		ctx.traceF.infoTxt(' Fin du sous-scenario - scVerifContratSuspension');
		sc.data=sc2.data;
		sc.endStep();
	});
}});*/


ActivInfinitev7.step({ stResiliationSuspensionCondition: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('stResiliationSuspensionCondition');
	
	if (data.statuts.faireResiliationContrat)
	{
		sc.endStep();
		return;
	}
	else 
	{
		sc.endStep(ActivInfinitev7.steps.stMiseAjourVarGloblalesSuspension);
		return;
	}
}});



/*ActivInfinitev7.step({ stResiliationSuspension: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('stResiliationSuspension');
	// on desactive le TimeOut principal afin que le timeOut execute soit celui du sous-scenario
	st.disableTimeout();	
	var scASC = ActivInfinitev7.scenarios.scResiliationContratSuspension.start(data).onEnd(function(sc3){
		sc.data=sc3.data;
		ctx.traceF.infoTxt(' Fin du sous-scenario - scResiliationContratSuspension');
		sc.endStep();
	});
	sc.endStep();
}});*/



ActivInfinitev7.step({ stLancerVerificationSoldeContratCondition: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('stLancerVerificationSoldeContratCondition');
	
	if (data.statuts.lancerVerificationSoldeContrat)
	{
		sc.endStep();
		return;
	}
	else 
	{
		sc.endStep(ActivInfinitev7.steps.stMiseAjourVarGloblalesSuspension);
		return;
	}
}});



/*ActivInfinitev7.step({ stLancerVerificationSoldeContrat: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('stLancerVerificationSoldeContrat');
	// on desactive le TimeOut principal afin que le timeOut execute soit celui du sous-scenario
	st.disableTimeout();	
	var scASC = ActivInfinitev7.scenarios.scVerificationSoldeContratSuspension.start(data).onEnd(function(sc4){
		sc.data=sc4.data;
		ctx.traceF.infoTxt(' Fin du sous-scenario - scVerificationSoldeContratSuspension');
		sc.endStep();
	});
	return;
}});*/







ActivInfinitev7.step({ stMiseAjourVarGloblalesSuspension: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('stMiseAjourVarGloblalesSuspension');
	
	data.statistiques.nbCasTraite +=1;
	data.statistiques.nbCasTrouveDsExcel = data.indexDerniereLigne - data.paramConfigExcel.debutIndexLigne + 1;
		if (data.contratCourantSuspension.notes.statutsContrat === ctx.excelF.constantes.statuts.Succes) {
				data.statistiques.nbCasTraitementSucces += 1;
		}

		if (data.contratCourantSuspension.notes.statutsContrat === ctx.excelF.constantes.statuts.Echec) {
				data.statistiques.nbCasTraitementEchec += 1;
		}
		
		if (data.contratCourantSuspension.notes.commentaireContrat.indexOf('centre')!==-1)
		{
			data.statistiques.nbCasRevoirCentre +=1;
		}
		sc.endStep();
		return;
}});






ActivInfinitev7.step({ stInsertDonneesSuspensionExcel: function(ev, sc, st) {
	 var data = sc.data;
  	ctx.traceF.infoTxt('Etape - stInsertDonneesSuspensionExcel ');
   //lire la date
   data.contratCourantSuspension.notes.dateTraitementContrat = ctx.getDate();
		
            
  var arrayMessage = [ {
       columnIndex: data.paramConfigExcel.indexColonne.type , value: data.contratCourantSuspension.infos['Type']
      },{
       columnIndex: data.paramConfigExcel.indexColonne.numeroRO , value: data.contratCourantSuspension.infos['RONumber']
      },{
       columnIndex: data.paramConfigExcel.indexColonne.dateExtraction, value: ctx.dateF.mettreEnFormeDateExcel(data.contratCourantSuspension.infos['DateExtraction'])
      },{
       columnIndex: data.paramConfigExcel.indexColonne.prenom , value: data.contratCourantSuspension.infos['Prenom']
      },{
       columnIndex: data.paramConfigExcel.indexColonne.nom , value: data.contratCourantSuspension.infos['Nom']
      },{
       columnIndex: data.paramConfigExcel.indexColonne.adresse , value: data.contratCourantSuspension.infos['Adresse']
      },{
       columnIndex: data.paramConfigExcel.indexColonne.localite , value: data.contratCourantSuspension.infos['Localite']
      },{
        columnIndex: data.paramConfigExcel.indexColonne.dateNaissance , value: ctx.dateF.mettreEnFormeDateExcel(data.contratCourantSuspension.infos['DateNaissance'])
      },{
				columnIndex: data.paramConfigExcel.indexColonne.dateEntreeFiliale, value: ctx.dateF.mettreEnFormeDateExcel(data.contratCourantSuspension.infos['DateEntreeFiliale'])
      },{
       columnIndex: data.paramConfigExcel.indexColonne.dateDispenseOuSuspension , value: ctx.dateF.mettreEnFormeDateExcel(data.contratCourantSuspension.infos['DateDispenseOuSuspension'])
      },{
        columnIndex: data.paramConfigExcel.indexColonne.numeroContrat , value: data.contratCourantSuspension.noContrat
      },{
        columnIndex: data.paramConfigExcel.indexColonne.dateTraitementContrat , value: data.contratCourantSuspension.notes.dateTraitementContrat
      },{
       columnIndex: data.paramConfigExcel.indexColonne.statutsContrat, value: data.contratCourantSuspension.notes.statutsContrat
      }, {
      columnIndex: data.paramConfigExcel.indexColonne.commentaireContrat, value: data.contratCourantSuspension.notes.commentaireContrat
      }
  ];
            
  ctx.excelF.remplirObjetTableau(data.ligneCourante, arrayMessage);
  ctx.excelF.sauverFichier(ctx.configF.recupererCheminFichierDeSortie());
  sc.endStep();
  return;
}});


/** stContratSuspensionSuivant */
ActivInfinitev7.step({ stContratSuspensionSuivant: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape - stContratSuspensionSuivant - Initialisations pour un changement de contrat');
	data.indexLectureSynthese = 0;
	data.ligneCourante ++;
	data.indexContrat ++ ;
	data.statuts.faireResiliationContrat = false;
	data.statuts.finSuspensionProcessus = false;
		if (data.indexContrat < data.countContratsSuspension)
		{
			data.statuts.faireResiliationContrat = false;
			data.statuts.finSuspensionProcessus = false;
			sc.endStep(ActivInfinitev7.steps.stLancerVerificationContratCondition);
			return;
		}
		else{
			sc.endStep();
			return;
		}
}});




/** stFinScenarioSuspension */
ActivInfinitev7.step({ stFinScenarioSuspension : function(ev, sc, st) {
	var data = sc.data;
	
	ctx.traceF.simpleTxt('Etape - stFinScenarioSuspension - Fin du scénario principal');
	
	ctx.popupF.newPopup("Fin du traitement",'Fin', function() {
			GLOBAL.notify(GLOBAL.events.PRESTOPCTX);
			sc.endScenario();
		  return;
		});
	
}});


