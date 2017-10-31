
/** Description */
GRCHarMu.scenario({ scAnalyseDataGRC: function(ev, sc) {
	var data = sc.data;
	sc.onTimeout(30000, function(sc, st) { sc.endScenario();	}); // default timeout handler for each step
	sc.onError(function(sc, st, ex) { sc.endScenario();	}); // default error handler
	sc.setMode(e.scenario.mode.clearIfRunning);
	// add steps here...
	
	sc.step(GRCHarMu.steps.InitAccesGRC);
	sc.step(GRCHarMu.steps.stRechercheAI);
	sc.step(GRCHarMu.steps.stExecRechercheAI);
//	sc.step(GRCHarMu.steps.stStep3);
//	sc.step(GRCHarMu.steps.stStep8);
	sc.step(GRCHarMu.steps.stFinVerifGRC);
	
}});



/** Description */
GRCHarMu.step({ InitAccesGRC: function(ev, sc, st) {
	var data = sc.data;
	ctx.log('Etape InitAccesGRC, Numéro Ext CTT: '+ data.ppCouranteAnalyse.dataLocale.numExtCtt);
	sc.endStep();
	return;
}});


/** Description */
GRCHarMu.step({ stRechercheAI: function(ev, sc, st) {
	var data = sc.data;
	ctx.log('Etape stRechercheAI: '+ data.ppCouranteAnalyse.dataLocale.numExtCtt);
	
	GRCHarMu.pRechercheAI.wait(function(ev){
		ctx.polling({
		delay: 100,
		nbMax: 10,
		test: function(index) { 
			return GRCHarMu.pRechercheAI.btRechecher.exist(); 
		},
		done: function() { 
			// add code here
			GRCHarMu.pRechercheAI.btRechecher.click();
			sc.endStep();
	    return;
		},
		fail: function() { 
			// add code here
			sc.endStep();
	    return;
		}
	});
	});
	/*
	GRCHarMu.pRechercheAI.wait(function(ev){
	if(GRCHarMu.pRechercheAI.btRechecher.exist()){
			GRCHarMu.pRechercheAI.btRechecher.click();
			sc.endStep();
	    return;
		}else{
			sc.endStep();
	    return;
		}
	});
	*/
}});



/** Description */
GRCHarMu.step({ stExecRechercheAI: function(ev, sc, st) {
	var data = sc.data;
	ctx.log('Etape stExecRechercheAI: '+data.ppCouranteAnalyse.dataLocale.numExtCtt);
	GRCHarMu.pRechercheAI.wait(function(ev){
		if(GRCHarMu.pRechercheAI.btExecuter.exist()){
			var iUderscore = data.ppCouranteAnalyse.dataLocale.numExtCtt.indexOf('_');
      var tabNumExtCtt = data.ppCouranteAnalyse.dataLocale.numExtCtt.split('_');
   	  var numExtCtt = tabNumExtCtt[1];
      GRCHarMu.pRechercheAI.oList.set(numExtCtt,1,1);
      GRCHarMu.pRechercheAI.btExecuter.click();
			sc.endStep();
	    return;
		}else{
		sc.endStep();
	  return;}
	});
}});


/** Description */
/*GRCHarMu.step({ stStep3: function(ev, sc, st) {
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
/*GRCHarMu.step({ stStep4: function(ev, sc, st) {
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
/*GRCHarMu.step({ stStep8: function(ev, sc, st) {
	var data = sc.data;
	ctx.log('step 8: vérification des coordonnées bancaires');
	var cotisation = GRCHarMu.pCoordBancairesC.oTabC.get(1,2); /* RIB cotisation*/
	/*var nom = GRCHarMu.pCoordBancairesC.oTabC.get(1,3); /* nom payeur*/
	/*var prenom = GRCHarMu.pCoordBancairesC.oTabC.get(1,4); /* prénom payeur*/
	/*sc.endStep();
	return;
}});

/** Description */
GRCHarMu.step({ stFinVerifGRC: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stFinVerifGRC: '+data.ppCouranteAnalyse.dataLocale.numExtCtt);
	ctx.siebel.navigateView(GRCHarMu.pRechercheAI);
	sc.endScenario();
	return;
}});