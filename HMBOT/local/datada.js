﻿ActivInfinitev7.step( {stInitScenarioDA: function (ev, sc, st) {
		var data = sc.data;
		ctx.configF.chargementFichierConfigDA();
	  var configDA = ctx.configF.recupConfigScenario(ctx.configF.scenario.DA);
		ctx.traceF.infoTxt(' stInitScenarioDA ');
	  ctx.traceF.initFichierTrace(configDA.cheminRacine, ctx.configF.scenario.DA);
	  ctx.statsF.initFileStats(ctx.configF.fichierConfig.cheminTemplate, configDA.cheminRacine, ctx.configF.scenario.DA);
		var webData = {
			url:'',
			tabDeBordURL:'',
			login:'',
			password:''
		};

		var globalVariables = {
			indexContratCourant:0,
			ligneTraite : 2,
			nomClient: ''
		};
		
		var dataFichier = {
			type :'',
			numRO:'',
			dateExtraction:'',
			prenom:'',
			nom:'',
			adresse:'',
			localite:'',
			dateNaissance:'',
			dateEntreeFiliale:'',
			dateDispense:''
		};

		var notes = {
			numContratIndiv:'',
			dateDeTraitement: '',
			statut: '',
			commentaire: '',
			remarque: '',
			courrier: ''
		};

		var stats = {
			dureeTraitement : 0,
			debutTraitement : ctx.dateF.conversionEnSecondes(new Date()),
			nombreCasTrouvesDansPivot : 0,
			nombreCasTraites : 0,
			nombreCasTraitesAvecAvertissement : 0,
			nombreCasNonTraites : 0,
			nombreDeContrats : 0
		};
		
		var contrat = {};
		var contratCourant = {
			RONumber:  '',
			Nom : '',
			Prenom : '',
			Adresse : '',
			Localite: '',
			DateExtraction : '',
			DateNaissance : '',
			DateEntreeFiliale:'',
			DateDispenseOuSuspension : ''
		};
		var sortieProcessusDA = false;
		var avertissement = false;
		var annulAdhesion = false;
		var resilConcu = false;
		var dateDebutEffet =  '';
		
		data.webData = webData;
		data.globalVariables = globalVariables;
		data.dataFichier = dataFichier;
		data.stats = stats;
		data.notes = notes;
		data.contrat = contrat;
		data.contratCourant = contratCourant;
		data.sortieProcessusDA = sortieProcessusDA;
		data.avertissement = avertissement;
		data.annulAdhesion = annulAdhesion;
		data.resilConcu = resilConcu;
		data.dateDebutEffet = dateDebutEffet;
		
		sc.endStep();
		return ;
	}
});

