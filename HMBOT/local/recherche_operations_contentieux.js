
/** Description */
ActivInfinitev7.scenario({ scRechercheOprtsContentieux: function(ev, sc) {
	var data = sc.data;
	sc.onTimeout(30000, function(sc, st) {
		ctx.traceF.errorTxt(data.ppCouranteAnalyse.dataLocale.referenceGRC + ' Timeout le scénario courant a été arrêté');
		data.ppCouranteAnalyse.notes.contexteAnalyseStoppee = ctx.notes.constantes.statuts.AdhNonAnalysee;
		ActivInfinitev7.pTabDeBord.start(data.webData.tabDeBordURL);
    sc.endScenario();
	});
	sc.onError(function(sc, st, ex) {
		ctx.traceF.errorTxt(data.ppCouranteAnalyse.dataLocale.referenceGRC + ex + ' le scénario courant a été arrêté');
		data.ppCouranteAnalyse.notes.contexteAnalyseStoppee = ctx.notes.constantes.statuts.AdhNonAnalysee;
		ActivInfinitev7.pTabDeBord.start(data.webData.tabDeBordURL);
    sc.endScenario();
	});
	sc.setMode(e.scenario.mode.clearIfRunning);
	// add steps here...
	
	sc.step(ActivInfinitev7.steps.stInitRechercheOptrsContentieux);
	sc.step(ActivInfinitev7.steps.stParcourirListeOperts);
	sc.step(ActivInfinitev7.steps.stListeOprtsSuivante);
	sc.step(ActivInfinitev7.steps.stInitConsultationProGaran);
	sc.step(ActivInfinitev7.steps.stConsultationProGaran);
	sc.step(ActivInfinitev7.steps.stListeProduitsSuivante);
	sc.step(ActivInfinitev7.steps.stInitIdentAssures);
	sc.step(ActivInfinitev7.steps.stDataIdentAssures);
	sc.step(ActivInfinitev7.steps.stListeAssuresSuivante);
	
	sc.step(ActivInfinitev7.steps.stFinRechercheOptrsContentieux);	
}});

ActivInfinitev7.step({ stInitRechercheOptrsContentieux: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stInitRechercheOptrsContentieux (voir la liste des OPERATIONS) indice du contrat : '+data.ppCouranteAnalyse.dataEnLigne.indexContrat);
	sc.endStep();
	return;
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
			//data.ppCouranteAnalyse.notes.contexteAnalyseStoppee = 'Non conformité - présence d’un précontentieux';
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
ActivInfinitev7.step({ stInitConsultationProGaran: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stInitConsultationProGaran, indice du contrat : '+ data.ppCouranteAnalyse.dataEnLigne.indexContrat);
	if(data.ppCouranteAnalyse.dataEnLigne.tousStatutInactifs === true){
		ActivInfinitev7.pHistoriqueOptsConsul.oProdGaran.click();
		sc.endStep();
		return;
	}else{
		sc.endStep(ActivInfinitev7.steps.stInitIdentAssures);
		return;
	}
}});


/** Si la date de radiation est > ctx.getDate() alors le contrat est actif à la date du jour et met à jour le flag contratEstActif 
* A interpréter dans le scénario RechercheEtAnalysePP
* Si dateRadSupDJour === FALSE  et pas de trace PCX alors tos les cobtrats sont radiés  ==> data.ppCouranteAnalyse.notes.contexteAnalyseStoppee = 'Création de contrat – Pas de contrat actif sur la PP';
*/
ActivInfinitev7.step({ stConsultationProGaran: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stConsultationProGaran, indice du contrat : '+ data.ppCouranteAnalyse.dataEnLigne.indexContrat);
	ActivInfinitev7.pProdGaranConsul.wait(function(ev){
		
		ctx.polling({
			delay: 300,
			nbMax: 10,
			test: function(index) { 
				return ActivInfinitev7.pProdGaranConsul.oTitrePage.exist(); 
			},
			done: function() { 
				// add code here
				var listeAdh = ActivInfinitev7.pProdGaranConsul.oListeAssures.getAll();
				var nomPre = '';
				var dNaiss = '';
				var nomPP = data.ppCouranteAnalyse.dataLocale.nom+'';
				var prenomPP	 = data.ppCouranteAnalyse.dataLocale.prenom+'';
				var dNaissPP = ctx.dateF.formatDateIAE(data.ppCouranteAnalyse.dataLocale.dateDeNaissance+'');
				//parcours de la liste des produits
				for(var i in listeAdh){
					nomPre = ActivInfinitev7.pProdGaranConsul.oNomPrenom.i(i).get();
					dNaiss = ActivInfinitev7.pProdGaranConsul.oDateNaissAdh.i(i).get();
					if(nomPre.indexOf(nomPP) !== -1 && nomPre.indexOf(prenomPP) !== -1 && ctx.dateF.estEgale(dNaiss, dNaissPP) && ctx.dateF.enObjet(data.ppCouranteAnalyse.dataEnLigne.dateRadiation) > ctx.getDate()){
						data.ppCouranteAnalyse.dataEnLigne.dateRadiation = ActivInfinitev7.pProdGaranConsul.oDateRadiation.i(i).get();
						//le conrat en cours est actif
						data.ppCouranteAnalyse.dataEnLigne.dateRadSupDjour = true;
						data.ppCouranteAnalyse.dataEnLigne.contratEstActif = true;
					}
				}
				if(data.ppCouranteAnalyse.dataEnLigne.contratEstActif === false){
					data.ppCouranteAnalyse.dataEnLigne.nbContratRad += 1;
				}
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
ActivInfinitev7.step({ stListeProduitsSuivante: function(ev, sc, st) {
	var data = sc.data;
	var html = ActivInfinitev7.pProdGaranConsul.btNext.html();
	var exist = html.indexOf('disabled');
	if(exist !== -1){
		sc.endStep();
	  return;	
	}else{
		ActivInfinitev7.pProdGaranConsul.btNext.click();
		sc.endStep(ActivInfinitev7.steps.stConsultationProGaran);
		return;
	}
}});

/**
* les steps suivant consistent à déterminer les coordonnées des bénéf si le contrat est actif
*
*/

/** Description */
ActivInfinitev7.step({ stInitIdentAssures: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stInitIdentAssures: ' + data.ppCouranteAnalyse.dataLocale.referenceGRC);
	if(data.ppCouranteAnalyse.dataEnLigne.contratEstActif === true){
		if(ActivInfinitev7.pHistoriqueOptsConsul.exist()){
			ActivInfinitev7.pHistoriqueOptsConsul.btIdentAssures.click();
			sc.endStep();
			return;
		}else{
			ActivInfinitev7.pProdGaranConsul.btIdentAssures.click();
			sc.endStep();
			return;
		}
	}else{
		sc.endStep(ActivInfinitev7.steps.stFinRechercheOptrsContentieux);
		return;
	}
}});


/** Description */
ActivInfinitev7.step({ stDataIdentAssures: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stDataIdentAssures: ' + data.ppCouranteAnalyse.dataLocale.referenceGRC);
	ActivInfinitev7.pIdentAssures.wait(function(ev){
		
		ctx.polling({
			delay: 300,
			nbMax: 10,
			test: function(index) { 
				return ActivInfinitev7.pIdentAssures.oTitrePage.exist();
			},
			done: function() { 
				// add code here
				var listeAssures = ActivInfinitev7.pIdentAssures.oListeAssures.getAll();
				var coordAssures = '';
				for(var i in listeAssures){
					coordAssures= ActivInfinitev7.pIdentAssures.oNomPrenom.i(i).get() + ':' + ActivInfinitev7.pIdentAssures.oDateNaissance.i(i).get();
					data.ppCouranteAnalyse.dataEnLigne.tabCoordAssures[i] = coordAssures;
					coordAssures = '';
				}
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
ActivInfinitev7.step({ stListeAssuresSuivante: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stListeAssuresSuivante, indice du contrat : '+ data.ppCouranteAnalyse.dataEnLigne.indexContrat);
	var html = ActivInfinitev7.pIdentAssures.btNext.html();
	var exist = html.indexOf('disabled');
	if(exist !== -1){
		sc.endStep();
	  return;	
	}else{
		ActivInfinitev7.pIdentAssures.btNext.click();
		sc.endStep(ActivInfinitev7.steps.stDataIdentAssures);
		return;
	}
}});

/** Description */
ActivInfinitev7.step({ stFinRechercheOptrsContentieux: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stFinRechercheOptrsContentieux, indice du contrat : '+  data.ppCouranteAnalyse.dataEnLigne.indexContrat);
	//on click sur identification des assurés, si le contrat courant est actif
	sc.endScenario();
	return;
}});


