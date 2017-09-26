
/** Description */
ActivInfinitev7.scenario({ SuspensionScenarioPrincipal: function(ev, sc) {
	var data = sc.data;
	sc.onTimeout(30000, function(sc, st) { sc.endScenario();	}); // default timeout handler for each step
	sc.onError(function(sc, st, ex) { sc.endScenario();	}); // default error handler
	sc.setMode(e.scenario.mode.clearIfRunning);
	// add steps here...
	ctx.log('Etapes du scénario');
	sc.step(ActivInfinitev7.steps.stInitScenarioSuspension);
	sc.step(ActivInfinitev7.steps.stServerConnexionSuspension);
	sc.step(ActivInfinitev7.steps.stInitPivot);
	sc.step(ActivInfinitev7.steps.stSelectSuspension);
	sc.step(ActivInfinitev7.steps.stSelectContratSuspension);
	sc.step(ActivInfinitev7.steps.stLancerVerificationContrat);
	sc.step(ActivInfinitev7.steps.stResiliationSuspensionCondition);
	sc.step(ActivInfinitev7.steps.stLancerResiliationContrat);
	sc.step(ActivInfinitev7.steps.stLancerVerificationSoldeContrat);
	sc.step(ActivInfinitev7.steps.stFinScenarioSuspension);
}});





/** Description */
ActivInfinitev7.step({ stInitScenarioSuspension: function(ev, sc, st) {
	var data = sc.data;
	
	var headerNames = {};
  var contracts = {};
	var contratsSuspension = {};
	var contratCourantSuspension = {};
 	var countContracts = 0;
	var countContratsSuspension = 0
	var names = []
		
	var statusSuspension ={
		faireResiliationContrat : false,
		finSuspensionProcessus : false
	}
	var webData = {
            url:'htt://exemple.com',
            tabDeBordURL:'', 
            identifiant:'', 
            motDePasse:'' 
        }
	
	data.headerNames = headerNames;
	data.contracts = contracts;
	data.countContracts = countContracts;
	data.countContratsSuspension = countContratsSuspension;
	data.names = names;
	data.contratCourantSuspension = contratCourantSuspension;
	data.contratsSuspension = contratsSuspension ;
	data.webData = webData;
	
	
	data.codeDuScenario =ctx.configF.scenario.Suspension;
	ctx.traceF.infoTxt('stInitScenarioSuspension');
	
	sc.endStep();
	return;
}});




/** Description */
ActivInfinitev7.step({ stServerConnexionSuspension : function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Début étape - stServerConnexionSuspension');
		if (ActivInfinitev7.pServeurWebFerme.exist() && ActivInfinitev7.pServeurWebFerme.oMessageErreur.exist()) {
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
		ActivInfinitev7.pConnexion.btConnexion.click();
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
	
	var a = data.contracts[0]['type'];
	
	var indexSuspension = 0;
	
	for (var index = 0; index < data.countContracts; index++)
	{
		if (data.contracts[index]['type']== 'SUSPENSION')
		{
			data.contratsSuspension[indexSuspension] = data.contracts[index] ;
			indexSuspension++;
		}
	}
	sc.endStep();
	return;
}});





ActivInfinitev7.step({ stSelectContratSuspension: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('stSelectContratSuspension');
	
	var indexContrat = 0;
	data.contratCourantSuspension = data.contratsSuspension[indexContrat];
	data.countContratsSuspension = data.contratCourantSuspension.length ;
	if (data.countContratsSuspension === 0)
	{
		ctx.traceF.infoTxt('Aucun contrat de Suspension n\'est proposé dans le fichier JSON.');
		sc.endStep(ActivInfinitev7.steps.stFinScenarioSuspension);
		return;
	}
	else if (indexContrat < data.countContratsSuspension)
	{
		indexContrat ++ ;
		sc.endStep();
	}
	else
	{
		sc.endStep(ActivInfinitev7.steps.stFinScenarioSuspension);
	}
	sc.endStep();
	return;
}});




ActivInfinitev7.step({ stLancerVerificationContrat: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('stLancerVerificationContrat');
	// on desactive le TimeOut principal afin que le timeOut execute soit celui du sous-scenario
	st.disableTimeout();	
	var scASC = ActivInfinitev7.scenarios.scVerifContratSuspension.start(data).onEnd(function(sc2){
		sc.data=sc2.data;
		ctx.traceF.infoTxt(' Fin du sous-scenario - scVerifContratSuspension');
		if(data.scenarioConfig.controlSeul){
			ctx.traceF.infoTxt(' controlSeul - Aucune mise à jour du contrat est effectuée');
			sc.data.statusSuspension.finSuspensionProcessus = true;
		}
		sc.endStep();
	});
	sc.endStep();
	return;
}});


ActivInfinitev7.step({ stResiliationSuspensionCondition: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('stResiliationSuspensionCondition');
	
	if (data.statusSuspension.faireResiliationContrat)
	{
		sc.endStep();
		return;
	}
	else 
	{
		sc.endStep(ActivInfinitev7.steps.stFinScenarioSuspension);
		return;
	}
}});



ActivInfinitev7.step({ stLancerResiliationContrat: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('stLancerResiliationContrat');
	// on desactive le TimeOut principal afin que le timeOut execute soit celui du sous-scenario
	st.disableTimeout();	
	var scASC = ActivInfinitev7.scenarios.scResiliationContratSuspension.start(data).onEnd(function(sc3){
		sc.data=sc3.data;
		ctx.traceF.infoTxt(' Fin du sous-scenario - scResiliationContratSuspension');
		if(data.scenarioConfig.controlSeul){
			ctx.traceF.infoTxt(' controlSeul - Aucune mise à jour du contrat est effectuée');
			sc.data.statusSuspension.finSuspensionProcessus = true;
		}
		sc.endStep();
	});
	sc.endStep();
	return;
}});



ActivInfinitev7.step({ stLancerVerificationSoldeContrat: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('stLancerVerificationSoldeContrat');
	// on desactive le TimeOut principal afin que le timeOut execute soit celui du sous-scenario
	st.disableTimeout();	
	var scASC = ActivInfinitev7.scenarios.scVerificationSoldeContratSuspension.start(data).onEnd(function(sc4){
		sc.data=sc4.data;
		ctx.traceF.infoTxt(' Fin du sous-scenario - scVerificationSoldeContratSuspension');
		if(data.scenarioConfig.controlSeul){
			ctx.traceF.infoTxt(' controlSeul - Aucune mise à jour du contrat est effectuée');
			sc.data.statusSuspension.finSuspensionProcessus = true;
		}
		sc.endStep();
	});
	sc.endStep();
	return;
}});






/** stFinScenarioCMU */
ActivInfinitev7.step({ stFinScenarioSuspension : function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape - stFinScenarioSuspension - Fin du scénario principal');
	sc.endScenario();
	return;
}});


