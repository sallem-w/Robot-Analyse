ActivInfinitev7.step( {stInitScenarioDA: function (ev, sc, st) {
		var data = sc.data;
		ctx.traceF.infoTxt(' stInitScenarioDA ');
	
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
			dureeTraitement : new Date(),
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
			DateDispenseOuSuspension : ''
		};
		var sortieProcessusDA = false;
		var avertissement = false;
		
		data.webData = webData;
		data.globalVariables = globalVariables;
		data.dataFichier = dataFichier;
		data.stats = stats;
		data.notes = notes;
		data.contrat = contrat;
		data.contratCourant = contratCourant;
		data.sortieProcessusDA = sortieProcessusDA;
		data.avertissement = avertissement;
		
		sc.endStep();
		return ;
	}
});