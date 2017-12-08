
/** Description */
GRCHarMu.scenario({ scAnalyseDataGRC: function(ev, sc) {
	var data = sc.data;
	sc.onTimeout(120000, function(sc, st) {
		ctx.traceF.errorTxt(data.ppCouranteAnalyse.dataLocale.referenceGRC + ' Timeout le scénario courant a été arrêté');
		data.ppCouranteAnalyse.notes.contexteAnalyseStoppee = ctx.notes.constantes.statuts.AdhNonAnalyseeGRC;
		//ActivInfinitev7.pTabDeBord.start(data.webData.tabDeBordURL);
    sc.endScenario();
	});
	sc.onError(function(sc, st, ex) {
		ctx.traceF.errorTxt(data.ppCouranteAnalyse.dataLocale.referenceGRC + ex + ' le scénario courant a été arrêté');
		data.ppCouranteAnalyse.notes.contexteAnalyseStoppee = ctx.notes.constantes.statuts.AdhNonAnalyseeGRC;
		//ActivInfinitev7.pTabDeBord.start(data.webData.tabDeBordURL);
    sc.endScenario();
	});

	sc.setMode(e.scenario.mode.clearIfRunning);
	// add steps here...
	
	sc.step(GRCHarMu.steps.InitAccesGRC);
	sc.step(GRCHarMu.steps.stRechercheAI);
	sc.step(GRCHarMu.steps.stExecRechercheAI);
	sc.step(GRCHarMu.steps.stBuletinAdhesion);
	sc.step(GRCHarMu.steps.stLireDataBulletinAdh);
	
	//sc.step(GRCHarMu.steps.stLireDataBancaires);
	
	sc.step(GRCHarMu.steps.stNavigateDetailAdh);
	sc.step(GRCHarMu.steps.stLireDataDetailAdhesion);
	
	//sc.step(GRCHarMu.steps.stInitRechercheCivilitePayeur);
	//sc.step(GRCHarMu.steps.stRechercheCivilitePayeur);
	//sc.step(GRCHarMu.steps.stExecRecherchePP);
	//sc.step(GRCHarMu.steps.stLireDataPP);
	
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
		delay: 300,
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
	  	return;
		}
	});
}});


/** Description */
GRCHarMu.step({ stBuletinAdhesion: function(ev, sc, st) {
	var data = sc.data;
	ctx.log('Etape stBulletinAdhesion: '+data.ppCouranteAnalyse.dataLocale.numExtCtt);
	GRCHarMu.pRechercheAI.wait(function(ev){
		ctx.polling({
			delay: 100,
			nbMax: 10,
			test: function(index) { 
				return GRCHarMu.pRechercheAI.oList.getActiveRow() > 0;
			},
			done: function() { 
				// add code here
				GRCHarMu.pRechercheAI.oList.clickLink(1,1, function(){
					sc.endStep();
					return;
				});
			},
			fail: function() { 
				// add code here
				sc.endStep();
				return;
			}
		});
	});
	/*
		GRCHarMu.pRechercheAI.activate();
		GRCHarMu.pRechercheAI.wait(function(ev){
		GRCHarMu.pRechercheAI.oList.clickLink(1,1, function(){
			sc.endStep();
			return;
		});
		sc.endStep();
		return;
	});
	*/
}});


/** Description */
GRCHarMu.step({ stLireDataBulletinAdh: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stLireDataBulletinAdh: '+data.ppCouranteAnalyse.dataLocale.numExtCtt);
	ctx.wait(function(ev){
		GRCHarMu.pBulletinAdhesion.activate();
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
		//deux lignes étaient commentées
//		GRCHarMu.pBulletinAdhesion.activate();
//		GRCHarMu.pBulletinAdhesion.btCoordBancaires.click();	
		sc.endStep();
		return;	
		});
	}, 3000);

}});


/** Description */
GRCHarMu.step({ stLireDataBancaires: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stLireDataBancaires: '+ data.ppCouranteAnalyse.dataLocale.numExtCtt);
	ctx.wait(function(ev){
		GRCHarMu.pCoordonneesBancaires.activate();
		GRCHarMu.pCoordonneesBancaires.wait(function(ev){
		//  GRCHarMu.pCoordonneesBancaires.activate();
			var numRow = GRCHarMu.pCoordonneesBancaires.oList.getActiveRow();
			if(numRow != 0){
				var cotisation = GRCHarMu.pCoordonneesBancaires.oList.get(1,2);
				if(cotisation === 'Y'){
					var nomCB = GRCHarMu.pCoordonneesBancaires.oList.get(1,3);
					var prenomCB = GRCHarMu.pCoordonneesBancaires.oList.get(1,4);
					if(data.ppCouranteAnalyse.dataLocale.nom === nomCB && data.ppCouranteAnalyse.dataLocale.prenom === prenomCB){ //payeur === souscripteur
						data.ppCouranteAnalyse.notes.payeurEgSouscripteur = 'Non';
					}else{
						data.ppCouranteAnalyse.notes.payeurEgSouscripteur = 'Oui';
						//récupéré les data du payeur
						data.ppCouranteAnalyse.dataEnLigne.nomPayeur = nomCB;
						data.ppCouranteAnalyse.dataEnLigne.prenomPayeur = prenomCB;
						data.ppCouranteAnalyse.dataEnLigne.appPayeur = GRCHarMu.pCoordonneesBancaires.oList.get(1,6);
						data.ppCouranteAnalyse.dataEnLigne.batPayeur = GRCHarMu.pCoordonneesBancaires.oList.get(1,7);
						data.ppCouranteAnalyse.dataEnLigne.voiePayeur = GRCHarMu.pCoordonneesBancaires.oList.get(1,8);
						data.ppCouranteAnalyse.dataEnLigne.lieuDitPayeur = GRCHarMu.pCoordonneesBancaires.oList.get(1,9);
						data.ppCouranteAnalyse.dataEnLigne.cpPayeur = GRCHarMu.pCoordonneesBancaires.oList.get(1,10);
						data.ppCouranteAnalyse.dataEnLigne.villePayeur = GRCHarMu.pCoordonneesBancaires.oList.get(1,11);
						data.ppCouranteAnalyse.dataEnLigne.cedexPayeur = GRCHarMu.pCoordonneesBancaires.oList.get(1,12);
						data.ppCouranteAnalyse.dataEnLigne.paysPayeur = GRCHarMu.pCoordonneesBancaires.oList.get(1,13);
					}
				}else{
					data.ppCouranteAnalyse.notes.payeurEgSouscripteur = 'Pas de RIB';
				}
				//GRCHarMu.pCoordonneesBancaires.btOk.click();
				sc.endStep();
				return;
			}else{
				//Pas de data dans la popup
				data.ppCouranteAnalyse.notes.payeurEgSouscripteur = 'Pas de RIB';
				//GRCHarMu.pCoordonneesBancaires.btOk.click();
				sc.endStep();
				return;
			}	
		});
	},3000);

}});



/** Description */
GRCHarMu.step({ stNavigateDetailAdh: function(ev, sc, st) {
	var data = sc.data;	
	ctx.traceF.infoTxt('Etape stNavigateDetailAdh: '+ data.ppCouranteAnalyse.dataLocale.numExtCtt);
	ctx.wait(function(ev){
		GRCHarMu.pBulletinAdhesion.activate();
		GRCHarMu.pBulletinAdhesion.wait(function(ev){
			ctx.siebel.navigateView(GRCHarMu.pDetailAdhesion);
			sc.endStep();
			return;
		});
	},1000);
}});


/** Description */
GRCHarMu.step({ stLireDataDetailAdhesion: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stLireDataDetailAdhesion '+data.ppCouranteAnalyse.dataLocale.numExtCtt);
	ctx.wait(function(ev) {
		GRCHarMu.pDetailAdhesion.activate();
		GRCHarMu.pDetailAdhesion.wait(function(ev){
			//ancienne méthode pour la récupération: getComboValues()
			var cBenefAdh = GRCHarMu.pDetailAdhesion.oClBenefAdh.getAttribute('value');
			var cBenefConj = GRCHarMu.pDetailAdhesion.oClBenefConj.getAttribute('value');
			//interprétation
			if(cBenefAdh === 'Spécifique'){
				data.ppCouranteAnalyse.notes.clauseBenefAdh = 'Oui';
			}
			if(cBenefConj === 'Spécifique'){
				data.ppCouranteAnalyse.notes.clauseBenefConjoint = 'Oui';
			}
			if(data.ppCouranteAnalyse.notes.payeurEgSouscripteur === 'Oui'){ //on cherche la civilité
				sc.endStep();
				return;
			}else{
				sc.endStep(GRCHarMu.steps.stFinVerifGRC);
				return;
			}
		});
	}, 3000);

}});

/** on cherche la civilité du payeur dans le cas ou le payeur !== souscripteur */
GRCHarMu.step({ stInitRechercheCivilitePayeur: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stInitRechercheCivilitePayeur: '+ data.ppCouranteAnalyse.dataLocale.numExtCtt);
	GRCHarMu.pDetailAdhesion.activate();
	GRCHarMu.pDetailAdhesion.wait(function(ev){
		ctx.siebel.navigateView(GRCHarMu.pPersonnesPhysiques);
		sc.endStep();
		return;
	});
}});


/** Description */
GRCHarMu.step({ stRechercheCivilitePayeur: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stRechercheCivilitePayeur: '+ data.ppCouranteAnalyse.dataLocale.numExtCtt);
	GRCHarMu.pPersonnesPhysiques.activate();
	GRCHarMu.pPersonnesPhysiques.wait(function(ev){
		ctx.polling({
			delay: 100,
			nbMax: 10,
			test: function(index) { 
				return GRCHarMu.pPersonnesPhysiques.btRechercher.exist();
			},
		done: function() { 
			// add code here
			GRCHarMu.pPersonnesPhysiques.btRechercher.click();
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
GRCHarMu.step({ stExecRecherchePP: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stExecRecherchePP: '+ data.ppCouranteAnalyse.dataLocale.numExtCtt);
	//GRCHarMu.pPersonnesPhysiques.activate();
	GRCHarMu.pPersonnesPhysiques.wait(function(ev){
		ctx.polling({
			delay: 100,
			nbMax: 10,
			test: function(index) { 
				return GRCHarMu.pPersonnesPhysiques.btExecuter.exist(); 
			},
			done: function() { 
				// add code here
				GRCHarMu.pPersonnesPhysiques.oList.set(data.ppCouranteAnalyse.dataEnLigne.nomPayeur,1,2);
				GRCHarMu.pPersonnesPhysiques.oList.set(data.ppCouranteAnalyse.dataEnLigne.prenomPayeur,1,3);
				GRCHarMu.pPersonnesPhysiques.oList.set(data.ppCouranteAnalyse.dataEnLigne.cpPayeur,1,5);
				GRCHarMu.pPersonnesPhysiques.btExecuter.click();
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
GRCHarMu.step({ stLireDataPP: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stLireDataPP: '+ data.ppCouranteAnalyse.dataLocale.numExtCtt);
	ctx.wait(function(ev){
		GRCHarMu.pPersonnesPhysiques.activate();
		GRCHarMu.pPersonnesPhysiques.wait(function(ev){
			if(GRCHarMu.pPersonnesPhysiques.oList.getActiveRow() !== 0){
				data.ppCouranteAnalyse.dataEnLigne.civilitePayeur = GRCHarMu.pPersonnesPhysiques.oCivilite.getAttribute('value');
			}
		sc.endStep();
		return;
	});
	},2000);
}});


/** Description */
GRCHarMu.step({ stFinVerifGRC: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stFinVerifGRC: '+data.ppCouranteAnalyse.dataLocale.numExtCtt);
	ctx.siebel.navigateView(GRCHarMu.pRechercheAI);
	sc.endScenario();
	return;
}});