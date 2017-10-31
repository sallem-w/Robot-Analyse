
/** Description */
ActivInfinitev7.scenario({ scRechercheOprtsContentieux: function(ev, sc) {
	var data = sc.data;
	sc.onTimeout(30000, function(sc, st) {
		ctx.traceF.errorTxt(data.ppCouranteAnalyse.dataLocale.referenceGRC + ' Timeout le scénario courant a été arrêté');
		data.ppCouranteAnalyse.notes.contexteAnalyseStoppee = 'Adhésion non analysée - Problème technique';
		ActivInfinitev7.pTabDeBord.start(data.webData.tabDeBordURL);
    sc.endScenario();
	});
	sc.onError(function(sc, st, ex) {
		ctx.traceF.errorTxt(data.ppCouranteAnalyse.dataLocale.referenceGRC + ex + ' le scénario courant a été arrêté');
		data.ppCouranteAnalyse.notes.contexteAnalyseStoppee = 'Adhésion non analysée - Problème technique';
		ActivInfinitev7.pTabDeBord.start(data.webData.tabDeBordURL);
    sc.endScenario();
	});
	sc.setMode(e.scenario.mode.clearIfRunning);
	// add steps here...
	
	sc.step(ActivInfinitev7.steps.stInitRechercheOptrsContentieux);
	sc.step(ActivInfinitev7.steps.stConsultProduitsGaranties);
	sc.step(ActivInfinitev7.steps.stInitParcoursListesOptrs);
	sc.step(ActivInfinitev7.steps.stParcourirListeOperts);
	sc.step(ActivInfinitev7.steps.stListeOprtsSuivante);
	sc.step(ActivInfinitev7.steps.stFinRechercheOptrsContentieux);	
}});


/** Description */
ActivInfinitev7.step({ stInitRechercheOptrsContentieux: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stInitRechercheOptrsContentieux (voir la liste des OPERATIONS) indice du contrat : '+data.ppCouranteAnalyse.dataEnLigne.indexContrat);
	if(data.ppCouranteAnalyse.dataEnLigne.statusCCourant === 'I'){
		//voir la date de radiation
		ActivInfinitev7.pIdentContratRechResu.oProdGaran.click();
		sc.endStep();
		return;
	}else{
		//passer à la page des historiques des optrs
		ActivInfinitev7.pIdentContratRechResu.oHistoriqueOpts.click();
		sc.endStep(ActivInfinitev7.steps.stInitParcoursListesOptrs);
		return;
	}
}});


/** Description */
ActivInfinitev7.step({ stConsultProduitsGaranties: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stConsultProduitsGaranties (voir la liste des PRODUITS) indice du contrat : '+data.ppCouranteAnalyse.dataEnLigne.indexContrat);
	ActivInfinitev7.pProdGaranConsul.wait(function(ev){
		ActivInfinitev7.pIdentContratRechResu.oHistoriqueOpts.click();
		sc.endStep();
		return;
	});
}});


/** Description */
ActivInfinitev7.step({ stInitParcoursListesOptrs: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stInitParcoursListesOptrs indice du contrat : '+data.ppCouranteAnalyse.dataEnLigne.indexContrat);
	ActivInfinitev7.pHistoriqueOptsConsul.wait(function(){
		sc.endStep();
		return;
	});
}});

/** Description */
ActivInfinitev7.step({ stParcourirListeOperts : function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stParcourirListeOperts, indice du contrat : '+ data.ppCouranteAnalyse.dataEnLigne.indexContrat);
  var contextes = ActivInfinitev7.pHistoriqueOptsConsul.oContexte.getAll();
	
	var index = 0;
	while(data.ppCouranteAnalyse.dataEnLigne.tracePCXExist === false && index < contextes.length){
		var  contexte = ActivInfinitev7.pHistoriqueOptsConsul.oContexte.i(index);
		var valContexte = contexte.get();
    if (valContexte.indexOf('PCX') !== -1){
			data.ppCouranteAnalyse.dataEnLigne.tracePCXExist = true;
			ctx.traceF.infoTxt('La trace PCX EXISTE, indice du contrat : '+data.ppCouranteAnalyse.dataEnLigne.indexContrat);
			data.ppCouranteAnalyse.notes.contexteAnalyseStoppee = 'Non conformité - présence d’un précontentieux';
		}
		index ++;
	}
	if(data.ppCouranteAnalyse.dataEnLigne.tracePCXExist === true){
		ctx.traceF.infoTxt('La trace PCX existe ---> Fin analyse de la PP courante');
		sc.endStep(ActivInfinitev7.steps.stFinRechercheOptrsContentieux);
		return;
	}else{
		ctx.traceF.infoTxt('La trace PCX n existe pas das le tableau courant ---> on passe à la page suivante (Next) ou au contrat suivant');
		sc.endStep();
    return;
	}

}});


/** Description */
ActivInfinitev7.step({ stListeOprtsSuivante: function(ev, sc, st) {
	var data = sc.data;
	var html = ActivInfinitev7.pHistoriqueOptsConsul.btNext.html();
	var exist = html.indexOf('disabled');
	if(exist !== -1){
		sc.endStep();
	  return;	
	}else{
		ActivInfinitev7.pHistoriqueOptsConsul.btNext.click();
		sc.endStep(ActivInfinitev7.steps.stParcourirListeOperts);
		return;
	}
}});


/** Description */
ActivInfinitev7.step({ stFinRechercheOptrsContentieux: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stFinRechercheOptrsContentieux, indice du contrat : '+  data.ppCouranteAnalyse.dataEnLigne.indexContrat);
	
	sc.endStep();
	return;
}});


