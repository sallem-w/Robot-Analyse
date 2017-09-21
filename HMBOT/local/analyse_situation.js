
/** Description */
ActivInfinitev7.scenario({ scAnalyseSituation: function(ev, sc) {
	var data = sc.data;
	sc.onTimeout(30000, function(sc, st) { sc.endScenario();	}); // default timeout handler for each step
	sc.onError(function(sc, st, ex) { sc.endScenario();	}); // default error handler
	sc.setMode(e.scenario.mode.clearIfRunning);
	// add steps here...
	sc.step(ActivInfinitev7.steps.stInitAnalyseSitu);
	sc.step(ActivInfinitev7.steps.stChargementFichierIAE);
	sc.step(ActivInfinitev7.steps.stLireRefGRC);
	sc.step(ActivInfinitev7.steps.stChargementTabDeBord);
	
	sc.step(ActivInfinitev7.steps.stFinAnalyseSitu);
	
}});


/** Description */
ActivInfinitev7.step({ stInitAnalyseSitu: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('************* Début scénario analyse situation *************');
	sc.endStep();
	return;
}});


/** Description */
ActivInfinitev7.step({ stChargementFichierIAE: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stChargementFichierIAE - chargement et ouverture du fichier Excel PRE-IAE');
	//openFile: ouverture fichier IAE
	

	sc.endStep();
	return;
}});



/** Description */
ActivInfinitev7.step({ stLireRefGRC: function(ev, sc, st) {
	var data = sc.data;
  //readData (GRC ID) si le type de lassuré === Principale
	//boucle de lecture des GRC ID dans le fichier Excel
	//getCell(i,j); le referece GRC ==> i et j sont initialisés da sle fichier json
	sc.endStep();
	return;
}});


/** Description */
ActivInfinitev7.step({ stChargementTabDeBord: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stInitRecherchePP');
	ActivInfinitev7.pTabDeBord.wait(function () {
			ActivInfinitev7.pTabDeBord.btConsultation.click();
			sc.endStep();
			return ;
		});
}});


/** Description */
ActivInfinitev7.step({ stChargemetConsultation: function(ev, sc, st) {
	var data = sc.data;
	//chargemet de la page ==> clic sur le bohomme n°contrat indiv ==> saisir le referece GRC ==> lancer la recherche
	ctx.traceF.infoTxt('Etape stChargemetConsultation');
	ActivInfinitev7.pIdentContratRechConsul.wait(function(){
		ActivInfinitev7.pIdentContratRechConsul.oBonHommeRecherche.click();
		sc.endStep();
	  return;
	});
}});


/** Description */
ActivInfinitev7.step({ stRecherchePP: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stRecherchePP');
	ActivInfinitev7.pRecherchePPRefGRC.wait(function(){
		//choisir GRC dans la liste select
		ActivInfinitev7.pRecherchePPRefGRC.oSystemeExterne.set('GRC');
		//saisir le referece GRC
		ActivInfinitev7.pRecherchePPRefGRC.oIdentifiantGRC.set();
		ActivInfinitev7.pRecherchePPRefGRC.btRecherchePP.click();
	});
	sc.endStep();
	return;
}});


/** Description */
ActivInfinitev7.step({ stResultRecherchePP: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stResultRecherchePP');
	ActivInfinitev7.pRecherchePPRefGRCRes.wait(function(){
		if(ActivInfinitev7.pRecherchePPRefGRCRes.oTypeRelation.get() === ''){
			sc.endStep(ActivInfinitev7.steps.stFinAnalyseSitu);//si la pp n'existe pas ==> Fin scéario analyse dans le scénario principale on lance le sc de création de contrat
	    return;
		}else{
			sc.endStep();
			return;
		}
	});
	
}});



/** Description */
ActivInfinitev7.step({ stLireRefGRCSuivant: function(ev, sc, st) {
	var data = sc.data;
	
	sc.endStep();
	return;
}});


/** Description */
ActivInfinitev7.step({ stFinAnalyseSitu: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('************* Fin scénario analyse situation *************');
	sc.endStep();
	return;
}});

