
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
	sc.step(GRCHarMu.steps.stBuletinAdhesion);
	sc.step(GRCHarMu.steps.stLireDataBulletinAdh);
	sc.step(GRCHarMu.steps.stLireDataDetailAdhesion);
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
GRCHarMu.step({ stBuletinAdhesion: function(ev, sc, st) {
	var data = sc.data;
	ctx.log('Etape stBulletinAdhesion: '+data.ppCouranteAnalyse.dataLocale.numExtCtt);
	GRCHarMu.pRechercheAI.wait(function(ev){
		GRCHarMu.pRechercheAI.oList.clickLink(1,1, function(){
			sc.endStep();
			return;
		});	
	});
}});


/** Description */
GRCHarMu.step({ stLireDataBulletinAdh: function(ev, sc, st) {
	var data = sc.data;
	ctx.log('Etape stLireDataBulletinAdh: '+data.ppCouranteAnalyse.dataLocale.numExtCtt);
	GRCHarMu.pBulletinAdhesion.wait(function(ev){
		//get data
		var paiemenAdh = GRCHarMu.pBulletinAdhesion.oPaiementAdh.get();
		var dateEffet = GRCHarMu.pBulletinAdhesion.oDateEffet.get();
		var dateAdh =  GRCHarMu.pBulletinAdhesion.oDateAdh.getAttribute('value');
		var dateRes = '01/'+ dateAdh.substr(3,2) +'/' +dateAdh.substr(6,4);
		var gestionControl = GRCHarMu.pBulletinAdhesion.oGestControl.get();
		// interprétation des res
		if(paiemenAdh !== 'N'){
			data.ppCouranteAnalyse.notes.paiementAdhesion = 'Oui';
		}
		if(gestionControl !== 'N'){
			data.ppCouranteAnalyse.notes.gestionControl = 'Oui';
		}
		if(ctx.dateF.estAvant(ctx.dateF.enObjet(dateEffet, '/'), ctx.dateF.enObjet(dateRes, '/'))){
			data.ppCouranteAnalyse.notes.dateEffetAControler = 'Oui';
		}	
		GRCHarMu.pBulletinAdhesion.activate();
			ctx.siebel.navigateView(GRCHarMu.pDetailAdhesion);
			sc.endStep();
		  return;	
	});
}});


/** Description */
GRCHarMu.step({ stLireDataDetailAdhesion: function(ev, sc, st) {
	var data = sc.data;
	ctx.log('Etape stBulletinAdhesion: '+data.ppCouranteAnalyse.dataLocale.numExtCtt);
	ctx.wait(function(ev) {
		GRCHarMu.pDetailAdhesion.activate();
		GRCHarMu.pDetailAdhesion.wait(function(ev){
			var cBenefAdh = GRCHarMu.pDetailAdhesion.oClBenefAdh.getComboValues();
			var cBenefConj = GRCHarMu.pDetailAdhesion.oClBenefConj.getComboValues();
			//interprétation
			if(cBenefAdh === 'Spécifique'){
				data.ppCouranteAnalyse.notes.clauseBenefAdh = 'Oui';
			}
			if(cBenefConj === 'Spécifique'){
				data.ppCouranteAnalyse.notes.clauseBenefConjoint = 'Oui';
			}
			/*if(GRCHarMu.pDetailAdhesion.btCoordBancaires.exist()){
				GRCHarMu.pDetailAdhesion.btCoordBancaires.click();
			}*/
			sc.endStep();
			return;
		});
	}, 3000);

}});


/** Description */
GRCHarMu.step({ stFinVerifGRC: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stFinVerifGRC: '+data.ppCouranteAnalyse.dataLocale.numExtCtt);
	ctx.siebel.navigateView(GRCHarMu.pRechercheAI);
	sc.endScenario();
	return;
}});