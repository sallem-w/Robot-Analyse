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
		
		ctx.configF.chargementFichierConfigDA();
		ctx.traceF.initFichierTrace(ctx.configF.recupererCheminRacine(), ctx.configF.scenario.DA);
		ctx.traceF.infoTxt(' template path ' + ctx.configF.recupererCheminTemplate() + ' '+ ctx.configF.recupererCheminRacine() + ' ' + ctx.configF.scenario.DA);
		ctx.statsF.initFileStats(ctx.configF.recupererCheminTemplate(), ctx.configF.recupererCheminRacine(), ctx.configF.scenario.DA);
		
		sc.endStep();
		return ;
	}
});