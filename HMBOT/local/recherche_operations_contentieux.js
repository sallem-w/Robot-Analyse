
/** Description */
ActivInfinitev7.scenario({ scRechercheOprtsContentieux: function(ev, sc) {
	var data = sc.data;
	sc.onTimeout(30000, function(sc, st) {
		ctx.traceF.errorTxt(data.ppCouranteAnalyse.dataLocale.referenceGRC + ' Timeout le scénario courant a été arrêté');
		ActivInfinitev7.pTabDeBord.start(data.webData.tabDeBordURL);
    sc.endScenario();
	});
	sc.onError(function(sc, st, ex) {
		ctx.traceF.errorTxt(data.ppCouranteAnalyse.dataLocale.referenceGRC + ex + ' le scénario courant a été arrêté');
		ActivInfinitev7.pTabDeBord.start(data.webData.tabDeBordURL);
    sc.endScenario();
	});
	sc.setMode(e.scenario.mode.clearIfRunning);
	// add steps here...
	
	sc.step(ActivInfinitev7.steps.stInitRechercheOptrsContentieux);
	sc.step(ActivInfinitev7.steps.stParcourirListeOperts);
	sc.step(ActivInfinitev7.steps.stListeOprtsSuivante);
	
	
	sc.step(ActivInfinitev7.steps.stFinRechercheOptrsContentieux);
	
}});


/** Description */
ActivInfinitev7.step({ stInitRechercheOptrsContentieux: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stInitRechercheOptrsContentieux: voir liste des opérations ++++++ indice du contrat courant vaut: '+data.ppCouranteAnalyse.dataEnLigne.indexContrat);
	sc.endStep();
	return;
}});


/** Description */
ActivInfinitev7.step({ stParcourirListeOperts : function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stParcourirListeOperts: '+ data.ppCouranteAnalyse.dataEnLigne.indexContrat);
  var contextes = ActivInfinitev7.pHistoriqueOptsConsul.oContexte.getAll();
	
	var index = 0;
	while(data.ppCouranteAnalyse.dataEnLigne.tracePCXExist === false && index < contextes.length){
		var  contexte = ActivInfinitev7.pHistoriqueOptsConsul.oContexte.i(index);
		var valContexte = contexte.get();
    if (valContexte.indexOf('PCX') !== -1){
			data.ppCouranteAnalyse.dataEnLigne.tracePCXExist = true;
			data.ppCouranteAnalyse.notes.contexteAnalyseStoppee = 'Non conformité - présence d un précontentieux';//insertion de la trace dans le fichier Excel
		}
		index ++;
	}
	if(data.ppCouranteAnalyse.dataEnLigne.tracePCXExist === true){
		ctx.traceF.infoTxt('La trace PCX existe ----> fin analyse de la PP courante');
		sc.endStep(ActivInfinitev7.steps.stFinRechercheOptrsContentieux);
		return;
	}else{
		ctx.traceF.infoTxt('La trace PCX n existe pas ----> on page à la page suivante ou au contrat suivant');
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
	ctx.traceF.infoTxt('Etape stFinRechercheOptrsContentieux: ');
	sc.endStep();
	return;
}});


