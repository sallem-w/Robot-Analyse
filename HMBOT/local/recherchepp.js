
/** Description */
ActivInfinitev7.scenario({ scRecherchePP: function(ev, sc) {
	var data = sc.data;
	sc.onTimeout(30000, function(sc, st) { sc.endScenario();	}); // default timeout handler for each step
	sc.onError(function(sc, st, ex) { sc.endScenario();	}); // default error handler
	sc.setMode(e.scenario.mode.clearIfRunning);
	// add steps here...
	
  sc.step(ActivInfinitev7.steps.stInitConsultationPP);
	sc.step(ActivInfinitev7.steps.stConsultationPP);
	sc.step(ActivInfinitev7.steps.stResultRecherchePP);
//	sc.step(ActivInfinitev7.steps.stTraiterResultatRecherchePP);
	sc.step(ActivInfinitev7.steps.stInitRecherchePPParRO);
	sc.step(ActivInfinitev7.steps.stRecherchePPParRO);
	sc.step(ActivInfinitev7.steps.stResultRecherchePPParRO);
	
	sc.step(ActivInfinitev7.steps.stFinRechercePP);
}});


/** Description */
ActivInfinitev7.step({ stInitRecherchePP: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stInitRechercheEtAnalysePP - reference GRC: ' + data.ppCouranteAnalyse.dataLocale.referenceGRC);
	ActivInfinitev7.pTabDeBord.wait(function () {	
	ActivInfinitev7.pTabDeBord.btConsultation.click();
		sc.endStep();
		return;
	});
}});


/** Description */
ActivInfinitev7.step({ stInitConsultationPP: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stInitConsultationPP: ' + data.ppCouranteAnalyse.dataLocale.referenceGRC);
	ActivInfinitev7.pIdentContratRechConsul.wait(function(){
			ActivInfinitev7.pIdentContratRechConsul.oBonHommeRecherche.click();
		  sc.endStep();
	    return;
	});
}});


/** Description */
ActivInfinitev7.step({ stConsultationPP : function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stConsultationPP: ' + data.ppCouranteAnalyse.dataLocale.referenceGRC);
	
	ActivInfinitev7.pRecherchePPRefGRC.wait(function(){
	ActivInfinitev7.pRecherchePPRefGRC.oSystemeExterne.set('GRC');
		ActivInfinitev7.pRecherchePPRefGRC.oIdentifiantGRC.set(data.ppCouranteAnalyse.dataLocale.referenceGRC);
		ActivInfinitev7.pRecherchePPRefGRC.btRecherchePP.click();
	  sc.endStep();
	  return;
	});
}});


/** Description */
ActivInfinitev7.step({ stResultRecherchePP : function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stResultRecherchePP: ' + data.ppCouranteAnalyse.dataLocale.referenceGRC);
	ActivInfinitev7.pRecherchePPRefGRCRes.wait(function(){
		ctx.sleep(100);
		if(ActivInfinitev7.pRecherchePPRefGRCRes.oAucunContratDispo.exist()){
	  	ctx.traceF.infoTxt('La PP n existe pas selon la recherche par Ref GRC, on lance la recherche par Numéro RO');
			ActivInfinitev7.pRecherchePPRefGRCRes.btAnnuler.click();
			sc.endStep(ActivInfinitev7.steps.stInitRecherchePPParRO);
	  	return;
		}else if(ActivInfinitev7.pRecherchePPRefGRCRes.oResultatParRelation.exist()){
			data.ppCouranteAnalyse.dataEnLigne.typeRelation = ActivInfinitev7.pRecherchePPRefGRCRes.oTypeRelation.i(0).get();
			data.ppCouranteAnalyse.dataEnLigne.identiteRelation = ActivInfinitev7.pRecherchePPRefGRCRes.oIdentiteRelation.i(0).get();
			if(data.ppCouranteAnalyse.dataEnLigne.typeRelation === '' && data.ppCouranteAnalyse.dataEnLigne.identiteRelation === ''){
				ctx.traceF.infoTxt('Champs type relation / identité relation vides: '+ data.ppCouranteAnalyse.dataLocale.referenceGRC);
	    	data.ppCouranteAnalyse.notes.contexteAnalyseStoppee = 'Création - type relation / identité relation vides';
		  	sc.endStep(ActivInfinitev7.steps.stFinRechercheAnalysePP);
	    	return;
			}else if(data.ppCouranteAnalyse.dataEnLigne.typeRelation !== '' && data.ppCouranteAnalyse.dataEnLigne.identiteRelation !== ''){
				ctx.traceF.infoTxt('Un ou plusieurs contrats sont associe(s) à la PP courante, voir l HISTORIQUE de chaque contrat');
				data.ppCouranteAnalyse.dataEnLigne.nbContrat = ActivInfinitev7.pRecherchePPRefGRCRes.oStatus.count();
				sc.endStep(ActivInfinitev7.steps.stInitAnalyseContratsIA);
				return;
			}	
		}
	});
}});



///** Description */
//ActivInfinitev7.step({ stTraiterResultatRecherchePP: function(ev, sc, st) {
//	var data = sc.data;
//	ctx.traceF.infoTxt('Etape stTraiterResultatRecherchePP: '+ data.ppCouranteAnalyse.dataLocale.referenceGRC);
	
////	st.onTimeout(10000, function (sc, st) {
////		ctx.traceF.errorTxt('TimeOut - Etape  stTraiterResultatRecherchePP');
////		ActivInfinitev7.pTabDeBord.start(data.webData.tabDeBordURL);
////		sc.endScenario();
////	});
////	st.onError(function (sc, st, ex) {
////		ctx.traceF.errorTxt('OnError - Etape stTraiterResultatRecherchePP');
////		ActivInfinitev7.pTabDeBord.start(data.webData.tabDeBordURL);
////		sc.endScenario();
////	});

//		if(ActivInfinitev7.pRecherchePPRefGRCRes.oResultatParRelation.exist()){
//			data.ppCouranteAnalyse.dataEnLigne.typeRelation = ActivInfinitev7.pRecherchePPRefGRCRes.oTypeRelation.i(0).get();
//			data.ppCouranteAnalyse.dataEnLigne.identiteRelation = ActivInfinitev7.pRecherchePPRefGRCRes.oIdentiteRelation.i(0).get();
//			if(data.ppCouranteAnalyse.dataEnLigne.typeRelation === '' && data.ppCouranteAnalyse.dataEnLigne.identiteRelation === ''){
//				ctx.traceF.infoTxt('Champs type relation / identité relation vides: '+ data.ppCouranteAnalyse.dataLocale.referenceGRC);
//	    	data.ppCouranteAnalyse.notes.contexteAnalyseStoppee = 'Création - type relation / identité relation vides';
//		  	sc.endStep(ActivInfinitev7.steps.stFinRechercheAnalysePP);
//	    	return;
//			}else if(data.ppCouranteAnalyse.dataEnLigne.typeRelation !== '' && data.ppCouranteAnalyse.dataEnLigne.identiteRelation !== ''){
//				ctx.traceF.infoTxt('Un ou plusieurs contrats sont associe(s) à la PP courante, voir l HISTORIQUE de chaque contrat');
//				data.ppCouranteAnalyse.dataEnLigne.nbContrat = ActivInfinitev7.pRecherchePPRefGRCRes.oStatus.count();
//				sc.endStep(ActivInfinitev7.steps.stInitAnalyseContratsIA);
//				return;
//			}	
//	}else{
//		sc.endStep(ActivInfinitev7.steps.stFinRechercheAnalysePP);
//		return;
//	}
	
//}});


/** cet étape initialise la recherche de la PP par num RO */
ActivInfinitev7.step({ stInitRecherchePPParRO: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stInitRecherchePPParRO: lecture des données du fichier Excel' + data.ppCouranteAnalyse.dataLocale.referenceGRC);	
	ActivInfinitev7.pIdentContratRechConsul.wait(function(){
	  data.ppCouranteAnalyse.dataLocale.numeroRO = ctx.excel.sheet.getCell(data.varGlobales.ligneCourante, data.scenarioConfig.excel.indexColonne.numeroRO);
	  data.ppCouranteAnalyse.dataLocale.nom = ctx.excel.sheet.getCell(data.varGlobales.ligneCourante, data.scenarioConfig.excel.indexColonne.nom);
	  data.ppCouranteAnalyse.dataLocale.prenom = ctx.excel.sheet.getCell(data.varGlobales.ligneCourante, data.scenarioConfig.excel.indexColonne.prenom);
	  data.ppCouranteAnalyse.dataLocale.dateDeNaissance = ctx.excel.sheet.getCell(data.varGlobales.ligneCourante, data.scenarioConfig.excel.indexColonne.dateDeNaissance);
		ActivInfinitev7.pIdentContratRechConsul.oBonHommeRecherche.click();
		sc.endStep();
		return;
	});
}});


/** Description */
ActivInfinitev7.step({ stRecherchePPParRO: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stRecherchePPParRO, Numéro RO : ' + data.ppCouranteAnalyse.dataLocale.numeroRO);	
	ActivInfinitev7.pRecherchePPRefGRC.wait(function(){
			ActivInfinitev7.pRecherchePPRefGRC.oNom.set(data.ppCouranteAnalyse.dataLocale.nom);
		  ActivInfinitev7.pRecherchePPRefGRC.oPrenom.set(data.ppCouranteAnalyse.dataLocale.prenom);
		  ActivInfinitev7.pRecherchePPRefGRC.oDateNaissance.set(ctx.dateF.formatDateIAE(data.ppCouranteAnalyse.dataLocale.dateDeNaissance+''));
			ActivInfinitev7.pRecherchePPRefGRC.oNumeroRo.set(data.ppCouranteAnalyse.dataLocale.numeroRO);
			ActivInfinitev7.pRecherchePPRefGRC.btRecherchePP.click();
			sc.endStep();
	    return;
	});
}});



/** Description */
ActivInfinitev7.step({ stResultRecherchePPParRO : function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stResultRecherchePPParRO, Numéro RO : ' + data.ppCouranteAnalyse.dataLocale.numeroRO);
	ActivInfinitev7.pRecherchePPRefGRCRes.wait(function(){
		ctx.sleep(100);
		if(ActivInfinitev7.pRecherchePPRefGRCRes.oAucunContratDispo.exist()){
			data.ppCouranteAnalyse.notes.contexteAnalyseStoppee = 'création contrat';
			sc.endStep(ActivInfinitev7.steps.stFinRechercheAnalysePP);
			return;
		}else if(ActivInfinitev7.pRecherchePPRefGRCRes.oResultatParRelation.exist()){
			data.ppCouranteAnalyse.dataEnLigne.typeRelation = ActivInfinitev7.pRecherchePPRefGRCRes.oTypeRelation.i(0).get();
			data.ppCouranteAnalyse.dataEnLigne.identiteRelation = ActivInfinitev7.pRecherchePPRefGRCRes.oIdentiteRelation.i(0).get();
			if(data.ppCouranteAnalyse.dataEnLigne.typeRelation === '' && data.ppCouranteAnalyse.dataEnLigne.identiteRelation === ''){
				ctx.traceF.infoTxt('Champs type relation / identité relation vides: '+ data.ppCouranteAnalyse.dataLocale.referenceGRC);
	    	data.ppCouranteAnalyse.notes.contexteAnalyseStoppee = 'Création - type relation / identité relation vides';
		  	sc.endStep(ActivInfinitev7.steps.stFinRechercheAnalysePP);
	    	return;
			}else if(data.ppCouranteAnalyse.dataEnLigne.typeRelation !== '' && data.ppCouranteAnalyse.dataEnLigne.identiteRelation !== ''){
				ctx.traceF.infoTxt('Un ou plusieurs contrats sont associe(s) à la PP courante, voir l HISTORIQUE de chaque contrat');
				data.ppCouranteAnalyse.dataEnLigne.nbContrat = ActivInfinitev7.pRecherchePPRefGRCRes.oStatus.count();
				sc.endStep(ActivInfinitev7.steps.stInitAnalyseContratsIA);
				return;
			}	
	}
//			sc.endStep(ActivInfinitev7.steps.stTraiterResultatRecherchePP);
//			return;

	});

}});
