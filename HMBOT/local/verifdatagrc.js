
/** Description */
GRCHarMu.scenario({ scAnalyseDataGRC: function(ev, sc) {
	var data = sc.data;
	sc.onTimeout(30000, function(sc, st) { sc.endScenario();	}); // default timeout handler for each step
	sc.onError(function(sc, st, ex) { sc.endScenario();	}); // default error handler
	sc.setMode(e.scenario.mode.clearIfRunning);
	// add steps here...
	
	sc.step(GRCHarMu.steps.stInitAppGRC);
	sc.step(GRCHarMu.steps.stStep1);
	sc.step(GRCHarMu.steps.stStep2);
	sc.step(GRCHarMu.steps.stStep3);
	sc.step(GRCHarMu.steps.stStep8);
	sc.step(GRCHarMu.steps.stStep10);
	
}});



/** Description */
GRCHarMu.step({ stInitAppGRC: function(ev, sc, st) {
	var data = sc.data;
	
	ctx.log('*** Etape stInitAppGRC ***');
	ctx.log('Initialisation de l application en utilisant la page main');
		ctx.log('renommage de la page');
		ctx.siebel.setViewName(GRCHarMu.pRechercheAI, 'SIHM%20All%20Individual%20Policy%20Search%20View');
		ctx.log('initialisation');
		ctx.siebel.initApplication(GRCHarMu.pMain);
	  ctx.log('redirection vers la page');
		ctx.siebel.navigateView(GRCHarMu.pRechercheAI);
	  sc.endStep();
	  return;
}});


/** Description */
GRCHarMu.step({ stStep1: function(ev, sc, st) {
	var data = sc.data;
	ctx.log('step 1');
	 GRCHarMu.pRechercheAI.wait(function(ev){
	 	GRCHarMu.pRechercheAI.btRechercher.click();
		  sc.endStep();
	    return;
	 });
}});



/** Description */
GRCHarMu.step({ stStep2: function(ev, sc, st) {
	var data = sc.data;
	ctx.log('step 2');
	GRCHarMu.pRechercheAI.wait(function(ev){
		if(GRCHarMu.pRechercheAI.btExecuter.exist()){
			//var r = GRCHarMu.pRechercheAI.oRechercheIA.getActiveRow();
			//ctx.log('ligne courante: '+r);
			// extraction de numero EXT CTT
			var iUderscore = data.ppCouranteAnalyse.dataLocale.numExtCtt.indexOf('_');
      var tabNumExtCtt = data.ppCouranteAnalyse.dataLocale.numExtCtt.split('_');
   	  var numExtCtt = tabNumExtCtt[1];
      GRCHarMu.pRechercheAI.oRechercheIA.set(numExtCtt,1,1); //la valeur, ligne, colonne
      GRCHarMu.pRechercheAI.btExecuter.click();
		//	var pos = GRCHarMu.pRechercheAI.btExecuter.getRect();
		
			sc.endStep();
	    return;
		}else{
		sc.endStep();
	  return;}
	});

}});


/** Description */
GRCHarMu.step({ stStep3: function(ev, sc, st) {
	var data = sc.data;
	ctx.log('click sur le lien');
	GRCHarMu.pRechercheAI.wait(function(ev){
				var res = {};
			GRCHarMu.pRechercheAI.getItems(res);
				GRCHarMu.pRechercheAI.oRechercheIA.setFocus(true);
				var valPOs = GRCHarMu.pRechercheAI.getFocusRect();
//		    GRCHarMu.pRechercheAI.oProduit.get();
//				GRCHarMu.pRechercheAI.oProduit.set('valeur');
		//  var val = GRCHarMu.pRechercheAI.oRechercheIA.getCellEditValue(1,1);
		//  var scr =  GRCHarMu.pRechercheAI.oRechercheIA
		//	GRCHarMu.pRechercheAI.oRechercheIA.notify(e.siebel.grid.event.OnClickLink);
				var v = GRCHarMu.pRechercheAI.oRechercheIA.setActiveCell(1,1,true);
			//	var res = GRCHarMu.pRechercheAI.oRechercheIA.setRowEditable(1, true);
				GRCHarMu.pRechercheAI.oRechercheIA.clickLink(1,1, function(){ // la méthode click link ne marche pas
					ctx.log('fin click sur le champs');
				});
		sc.endStep();
		return;
	});
}});


/** Description */
GRCHarMu.step({ stStep4: function(ev, sc, st) {
	var data = sc.data;
	
	ctx.log('case paiement à l adhesion');
	var paiementAI= GRCHarMu.pRechercheAI.oPaiementAI.getAttribute('value');
//	if(paiementAI === 'N'){
		
//	}else{
		
//	}
	sc.endStep();
	return;
}});



/** Description */
GRCHarMu.step({ stStep8: function(ev, sc, st) {
	var data = sc.data;
	ctx.log('step 8: vérification des coordonnées bancaires');
	var cotisation = GRCHarMu.pCoordBancairesC.oTabC.get(1,2); /* RIB cotisation*/
	var nom = GRCHarMu.pCoordBancairesC.oTabC.get(1,3); /* nom payeur*/
	var prenom = GRCHarMu.pCoordBancairesC.oTabC.get(1,4); /* prénom payeur*/
	sc.endStep();
	return;
}});

/** Description */
GRCHarMu.step({ stStep10: function(ev, sc, st) {
	var data = sc.data;
	ctx.log('step 3');
//	GRCHarMu.pGRCMain.start();
	sc.endScenario();
	return;
}});