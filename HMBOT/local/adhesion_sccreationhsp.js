
/** Description */
ActivInfinitev7.scenario({ scCreationHSP: function(ev, sc) {
	var data = sc.data;
	sc.onTimeout(30000, function(sc, st) { sc.endScenario();	}); // default timeout handler for each step
	sc.onError(function(sc, st, ex) { sc.endScenario();	}); // default error handler
	sc.setMode(e.scenario.mode.clearIfRunning);
	// add steps here...
	sc.step(ActivInfinitev7.steps.stInitCreationHSP);
	sc.step(ActivInfinitev7.steps.stVersAdhesionIndividuelle);
	sc.step(ActivInfinitev7.steps.stOuvertureDossierHSP);
	sc.step(ActivInfinitev7.steps.stRemplirIdentificationContratHSP_Offre);
	sc.step(ActivInfinitev7.steps.stRemplirIdentificationContratHSP_NumExterne);
	sc.step(ActivInfinitev7.steps.stFinScCreationHSP);
	
	
}});



/** Description */
ActivInfinitev7.step({ stInitCreationHSP: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.contratAdhesionAttributs.NUM_SEQ_CT + ' - Etape - stInitCreationHSP');
	sc.endStep();
	return;
}});


/** Description */
ActivInfinitev7.step({ stVersAdhesionIndividuelle: function(ev, sc, st) {
	var data = sc.data;
	ActivInfinitev7.pTabDeBord.wait(function(ev) {
		ActivInfinitev7.pTabDeBord.btAdhesionIndiv.click();
		sc.endStep();
		return;
	})
}});


/** Description */
ActivInfinitev7.step({ stOuvertureDossierHSP: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.contratAdhesionAttributs.NUM_SEQ_CT + ' - Etape - stOuvertureDossierHSP');
	ActivInfinitev7.pAdhesions.wait(function(ev) {
		ActivInfinitev7.pAdhesions.oEntiteRattachement.setFocus();
		ActivInfinitev7.pAdhesions.oEntiteRattachement.keyStroke('P - HA'); // on insere 'P' pour faire apparaitre la boite cliquable
		ActivInfinitev7.pAdhesions.oEntiteRattachement.setFocus();
		var countPoll=0;		
			ctx.polling({
				delay: 200,
				nbMax: 10,
				test: function(index) { 
					countPoll++;
					ctx.log('counter : '+countPoll);
					if(ActivInfinitev7.pAdhesions.oSelectPHarmonie.exist()){
							ActivInfinitev7.pAdhesions.oSelectPHarmonie.click();
							return true;
					}
					else{
							return false;
					}
				},
				done: function() { 
					ctx.traceF.infoTxt(' L\'entite de rattachement a été trouvée');
					var dd=data.contratCourantAdhesion.dataLocale.contratAdhesionAttributs.DATE_DEBUT_EFFET;	
					ctx.log('dd :'+dd);
					ActivInfinitev7.pAdhesions.oDateDebutEffet.setFocus();
					ActivInfinitev7.pAdhesions.oDateDebutEffet.set(dd);
					ActivInfinitev7.pAdhesions.btRecherche.click();
					sc.endStep();
					return;
				},
				fail: function() { 
					ctx.traceF.errorTxt(' Erreur lors du remplissage de l\'entite de rattachement');
					sc.endStep(ActivInfinitev7.steps.stFinScCreationHSP);
					return;
					
				}
		});
	});
}});






/** Description */
ActivInfinitev7.step({ stRemplirIdentificationContratHSP_Offre: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.contratAdhesionAttributs.NUM_SEQ_CT + ' Etape - stRemplirIdentificationContratHSP_Offre');
	var OffreHSP = data.scenarioConfig.Adhesion.Offre.HSP;
	//==================================================
	ActivInfinitev7.pAdhIndivIdentContrat.wait(function(ev){
		ActivInfinitev7.pAdhIndivIdentContrat.oOffre.setFocus();
		ActivInfinitev7.pAdhIndivIdentContrat.oOffre.keyStroke(OffreHSP);
		ActivInfinitev7.pAdhIndivIdentContrat.oOffre.setFocus();
		var countPoll=0;	
		var offreExistance = false;
		var indexOffre = -1;
		ctx.polling({	
			delay: 200,	
			nbMax: 10,		
			test: function(index) { 		
				countPoll++;
				ctx.log('countP :'+countPoll);
				return ActivInfinitev7.pAdhIndivIdentContrat.oSelectOffre.count()>0;
			},
			done: function() { 
				/// on cherche parmis les resultats du tableau celui qui correspond à l'offre
				var tabOffre = ActivInfinitev7.pAdhIndivIdentContrat.oSelectOffre.getAll();
				for (var i in tabOffre){
					if(OffreHSP == tabOffre[i]){
						indexOffre=i;
						break;
					}
				}
				ActivInfinitev7.pAdhIndivIdentContrat.oSelectOffre.i(indexOffre).click();
				sc.endStep();
				return;
			},
			fail: function() { 
				ctx.traceF.errorTxt(' Erreur lors du remplissage de l\'offre ');
				sc.endStep(ActivInfinitev7.steps.stFinScCreationHSP);
				return;
			}
		});
	});
}});




/** Description */
ActivInfinitev7.step({ stRemplirIdentificationContratHSP_NumExterne: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.contratAdhesionAttributs.NUM_SEQ_CT + ' Etape - stRemplirIdentificationContratHSP_NumExterne');
	var numExterneContrat =data.contratCourantAdhesion.dataLocale.contratAdhesionAttributs.NUM_EXT_CTT;
	//==================================================
	ActivInfinitev7.pAdhIndivIdentContrat.oNumeroExterne.setFocus();
	ActivInfinitev7.pAdhIndivIdentContrat.oNumeroExterne.set(numExterneContrat);
	ActivInfinitev7.pAdhIndivIdentContrat.oEcheancePrincip.setFocus();
	sc.endStep();
	return;
}});


ActivInfinitev7.step({ stRemplirIdentificationContratHSP_GroupeGestion: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.contratAdhesionAttributs.NUM_SEQ_CT + ' Etape - stRemplirIdentificationContratHSP_NumExterne');
	var tabGestion = data.scenarioConfig.Adhesion.Gestion;
	
	/// on va rechercher dans la table de gestion les codes infinites correspondant au code GRC du contrat
	var codeGRC = data.contratCourantAdhesion.dataLocale.contratAdhesionAttributs.DISCRIMINANT;
	ctx.log('codeGRC : '+codeGRC);
	var codeGG = undefined;
	var codeCG = undefined;
	var index=-1;
	for(var i  in tabGestion.CGGRC){
		if(codeGRC==tabGestion.CGGRC[i]){
			index=i;
			break;
		}
	}
	
	if (index == -1){
		ctx.traceF.errorTxt(data.contratCourantAdhesion.dataLocale.contratAdhesionAttributs.NUM_SEQ_CT + ' PAS DE CORRESPONDANCE TROUVE ENTRE CODE GRC ET INFINITE ');
	}else{
		codeGG = tabGestion.GroupeGestionInfinite[index];
		codeCG =tabGestion.CentreGestionInfinite[index];
	}
	ctx.log('codeGG : '+codeGG+' , code CG : '+codeCG);
	data.contratCourantAdhesion.dataLocale.groupeGestion=codeGG;
	data.contratCourantAdhesion.dataLocale.centreGestion=codeCG;
	//==================================================================================
	ActivInfinitev7.pAdhIndivIdentContrat.oGroupeGestion.setFocus();
	ActivInfinitev7.pAdhIndivIdentContrat.oGroupeGestion.keyStroke(codeGG);
	ActivInfinitev7.pAdhIndivIdentContrat.oGroupeGestion.setFocus();
	
		var countPoll=0;	
		var indexGG = -1;
			ctx.polling({
				delay: 200,
				nbMax: 10,
				test: function(index) { 
					countPoll++;
					ctx.log('counter : '+countPoll);
					return ActivInfinitev7.pAdhIndivIdentContrat.oSelectGroupeGestion.exist();
				},
				done: function() { 
				/// on cherche parmis les resultats du tableau celui qui correspond à l'offre
				var tabGG = ActivInfinitev7.pAdhIndivIdentContrat.oSelectGroupeGestion.getAll();
				for (var i in tabGG ){
					if(codeGG == tabGG[i]){
						indexGG=i;
						break;
					}
				}
				ActivInfinitev7.pAdhIndivIdentContrat.oSelectGroupeGestion.i(indexGG).click();
				sc.endStep();
				return;
				},
				fail: function() { 
					ctx.traceF.errorTxt(' Erreur lors du remplissage du groupe de gestion');
					sc.endStep(ActivInfinitev7.steps.stFinScCreationHSP);
					return;
				}
		});
}});






/** Description */
ActivInfinitev7.step({ stFinScCreationHSP: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.contratAdhesionAttributs.NUM_SEQ_CT + ' Etape - stFinScCreationHSP');
	//retour au dashboard
  ActivInfinitev7.pTabDeBord.start(data.webData.tabDeBordURL);
	sc.endStep();
	return;
}});
