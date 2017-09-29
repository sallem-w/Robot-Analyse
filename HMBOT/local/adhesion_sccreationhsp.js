
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
	sc.step(ActivInfinitev7.steps.stRemplirIdentificationContratHSP);
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
	ActivInfinitev7.pAdhesions.wait(function(ev) {
		ActivInfinitev7.pAdhesions.oEntiteRattachement.setFocus();
		ActivInfinitev7.pAdhesions.oEntiteRattachement.keyStroke('P - HA'); // on insere 'P' pour faire apparaitre la boite cliquable
//		ActivInfinitev7.pAdhesions.oEntiteRattachement.set(ctx.keyStroke('P - HA',1500));
//		ActivInfinitev7.pAdhesions.oEntiteRattachement.setFocus();
		ctx.polling({
				delay: 50,
				nbMax: 10,
				test: function(index) { 
					ActivInfinitev7.pAdhesions.oEntiteRattachement.setFocus();
					return ActivInfinitev7.pAdhesions.oSelectPHarmonie.exist(); 
				},
				done: function() { 
						ActivInfinitev7.pAdhesions.oSelectPHarmonie.click();
				},
				fail: function() { 
					ctx.traceF.errorTxt(' Erreur lors du remplissage de l\'entite de rattachement');
				}
		});
			
		var dd=data.contratCourantAdhesion.dataLocale.contratAdhesionAttributs.DATE_DEBUT_EFFET;
		ctx.log('dd :'+dd);
		ActivInfinitev7.pAdhesions.oDateDebutEffet.setFocus();
		ActivInfinitev7.pAdhesions.oDateDebutEffet.set(dd);
		ActivInfinitev7.pAdhesions.btRecherche.click();
		sc.endStep();
		return;
	});
}});






/** Description */
ActivInfinitev7.step({ stRemplirIdentificationContratHSP: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.contratAdhesionAttributs.NUM_SEQ_CT + ' Etape - stRemplirIdentificationContratHSP');
	var numExterneContrat =data.contratCourantAdhesion.dataLocale.contratAdhesionAttributs.NUM_EXT_CTT;
	var OffreHSP = data.scenarioConfig.Adhesion.Offre.HSP;
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
	ctx.log('codeGG : '+codeGG+' , code CG : '+codeCG);
	
	//==================================================
	
	ActivInfinitev7.pAdhIndivIdentContrat.oOffre.setFocus();
	ActivInfinitev7.pAdhIndivIdentContrat.oOffre.keyStroke(OffreHSP);
	var offreExistance = false;
	var indexOffre = -1;
	ctx.polling({	
		delay: 50,	
		nbMax: 10,		
		test: function(index) { 		
			return ActivInfinitev7.pAdhIndivIdentContrat.oSelectOffre.exist(); 	
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
		},
		fail: function() { 
			ctx.traceF.errorTxt(' Erreur lors du remplissage de l\'offre ');
		}
	});
	
	ActivInfinitev7.pAdhIndivIdentContrat.oNumeroExterne.setFocus();
		ActivInfinitev7.pAdhIndivIdentContrat.oEcheancePrincip.setFocus();
	sc.endStep();
	return;
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
