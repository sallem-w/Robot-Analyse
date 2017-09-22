ActivInfinitev7.step( {stInitScenarioDA: function (ev, sc, st) {
		var data = sc.data;
		ctx.traceF.infoTxt(' stInitScenarioDA ');
	
		var webData = {
			url:'',
			dashboardURL:'',
			login:'',
			password:''
		};

		var globalVariables = {
			indexContratCourant:0
		};
		
		var dataFichier = {
			nomClient: '',
			type :'',
			numRO:'',
			dateExtraction:'',
			prenom:'',
			nom:'',
			adresse:'',
			localite:'',
			dateDentreeFiliale:'',
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
			nombreCasTraitesAvceAvertissement : 0,
			nombreCasNonTraites : 0,
			nombreDeContrats : 0
		};
		
		var contrat = {};
		var contratCourant = {};
		var sortieProcessusDA = false;
		
		data.webData = webData;
		data.globalVariables = globalVariables;
		data.dataFichier = dataFichier;
		data.stats = stats;
		data.notes = notes;
		data.contrat = contrat;
		data.contratCourant = contratCourant;
		data.sortieProcessusDA = sortieProcessusDA;
		
		sc.endStep();
		return ;
	}
});