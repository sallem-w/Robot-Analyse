
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
	sc.step(ActivInfinitev7.steps.stRemplirIdentificationContratHSP_GroupeGestion);
	sc.step(ActivInfinitev7.steps.stRemplirIdentificationContratHSP_CentreGestion);
	sc.step(ActivInfinitev7.steps.stRecherchePersonneAdhesionIndiv);
	sc.step(ActivInfinitev7.steps.stResultatRecherchePersonneAdhesionIndiv);
	sc.step(ActivInfinitev7.steps.stCreationIdentificationPersonneAdhesionIndiv);
	sc.step(ActivInfinitev7.steps.stSelectionPersonneAdhesionIndiv);
	sc.step(ActivInfinitev7.steps.stModifIdentificationPersonneAdhesionIndiv);
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
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.contratAdhesionAttributs.NUM_SEQ_CT + ' Etape - stRemplirIdentificationContratHSP_GroupeGestion');
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
	ActivInfinitev7.pAdhIndivIdentContrat.oGroupeGestion.set('');
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
					if(ActivInfinitev7.pAdhIndivIdentContrat.oSelectGroupeGestion.count()>0){
						return true;
					}
					else{
						return false;
					}
				},
				done: function() { 
				/// on cherche parmis les resultats du tableau celui qui correspond à l'offre
				var tabGG = ActivInfinitev7.pAdhIndivIdentContrat.oSelectGroupeGestion.getAll();
				for (var i in tabGG ){
					var existance = tabGG[i].indexOf(codeGG);
					if(existance!=-1){
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



ActivInfinitev7.step({ stRemplirIdentificationContratHSP_CentreGestion: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.contratAdhesionAttributs.NUM_SEQ_CT + ' Etape - stRemplirIdentificationContratHSP_CentreGestion');
	var codeCG = data.contratCourantAdhesion.dataLocale.centreGestion;
	//==================================================================================
	ActivInfinitev7.pAdhIndivIdentContrat.oCentreGestion.setFocus();
	ActivInfinitev7.pAdhIndivIdentContrat.oCentreGestion.set('');
	ActivInfinitev7.pAdhIndivIdentContrat.oCentreGestion.keyStroke(codeCG);
	ActivInfinitev7.pAdhIndivIdentContrat.oCentreGestion.setFocus();
	
		var countPoll=0;	
		var indexCG = -1;
			ctx.polling({
				delay: 200,
				nbMax: 10,
				test: function(index) { 
					countPoll++;
					ctx.log('counter : '+countPoll);
					if(ActivInfinitev7.pAdhIndivIdentContrat.oSelectCentreGestion.count()>0){
						return true;
					}
					else{
						return false;
					}
				},
				done: function() { 
				/// on cherche parmis les resultats du tableau celui qui correspond à l'offre
				var tabCG = ActivInfinitev7.pAdhIndivIdentContrat.oSelectCentreGestion.getAll();
				for (var i in tabCG ){
					var existance = tabCG[i].indexOf(codeCG);
					if(existance!=-1){
						indexCG=i;
						break;
					}
				}
				ActivInfinitev7.pAdhIndivIdentContrat.oSelectCentreGestion.i(indexCG).click();
				// Fin du remplissage des données on clique sur le bouton suivant
				ActivInfinitev7.pAdhIndivIdentContrat.btBtnSuivant.click();
				sc.endStep();
				return;
				},
				fail: function() { 
					ctx.traceF.errorTxt(' Erreur lors du remplissage du centre de gestion');
					sc.endStep(ActivInfinitev7.steps.stFinScCreationHSP);
					return;
				}
		});
}});


/** Description */
ActivInfinitev7.step({ stRecherchePersonneAdhesionIndiv: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.contratAdhesionAttributs.NUM_SEQ_CT + ' Etape - stRecherchePersonneAdhesionIndiv');
//	var nom=data.contratCourantAdhesion.dataLocale.tabPersonnesPhysiques[0].contratAdhesionAttributs.CONTACT_NOM;
	var nom=data.contratCourantAdhesion.dataLocale.tabPersonnesPhysiques[0].CONTACT_NOM;
	var prenom = data.contratCourantAdhesion.dataLocale.tabPersonnesPhysiques[0].CONTACT_PRENOM;
	var dateNaissance = data.contratCourantAdhesion.dataLocale.tabPersonnesPhysiques[0].BRTH_DAY_GREG;
	var numRo = data.contratCourantAdhesion.dataLocale.tabPersonnesPhysiques[0].NUM_RO;
	ctx.log('Données - nom : '+nom+' prenom : '+prenom+' date naissance : '+dateNaissance+' numRo : '+numRo );
	ctx.log('Données - nom : '+nom+' prenom : '+prenom+' date naissance : '+dateNaissance+' numRo : '+numRo );
	ActivInfinitev7.pAdhIndivIdPrinRech.wait(function(ev) {
		ActivInfinitev7.pAdhIndivIdPrinRech.oNom.setFocus();
		ActivInfinitev7.pAdhIndivIdPrinRech.oNom.keyStroke(nom);
		ActivInfinitev7.pAdhIndivIdPrinRech.oPrenom.set(prenom);
		ActivInfinitev7.pAdhIndivIdPrinRech.oDateNaissance.set(dateNaissance);
		ActivInfinitev7.pAdhIndivIdPrinRech.oNumeroRo.set(numRo);
		ActivInfinitev7.pAdhIndivIdPrinRech.btRechercher.click();
		sc.endStep();
		return;
	});
}});


/** Description */
ActivInfinitev7.step({ stResultatRecherchePersonneAdhesionIndiv: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.contratAdhesionAttributs.NUM_SEQ_CT + ' Etape - stResultatRecherchePersonneAdhesionIndiv');
	ActivInfinitev7.pAdhIndivIdPrinRechResu.wait(function(ev){
		if(ActivInfinitev7.pAdhIndivIdPrinRechResu.oAucunePersonne){
			ActivInfinitev7.pAdhIndivIdPrinRechResu.btAnnuler.click();
			sc.endStep(ActivInfinitev7.steps.stCreationIdentificationPersonneAdhesionIndiv);
			return;
		}
		else{
			var countPoll=0;	
		ctx.polling({	
			delay: 200,	
			nbMax: 10,		
			test: function(index) { 		
				countPoll++;
				ctx.log('countP :'+countPoll);
				return ActivInfinitev7.pAdhIndivIdPrinRechResu.oNom.count()>0;
			},
			done: function() { 
				/// on cherche parmis les resultats du tableau celui qui correspond à l'offre
				var nbPP = ActivInfinitev7.pAdhIndivIdPrinRechResu.oNom.count();
				if(nbPP==1){
					// la Personne physique est unique on peut continuer avec
					ActivInfinitev7.pAdhIndivIdPrinRechResu.oNom.i(0).click();
					sc.endStep(ActivInfinitev7.steps.stSelectionPersonneAdhesionIndiv);
					return;
				}
				else{
					/// il y a plusieur PP on renvoi au centre
					ctx.traceF.errorTxt(' La PP n\'est pas unique , on ne traite pas le dossier ');
					data.contratCourantAdhesion.notes.commentaireContrat = 'Revoir centre: il y a plusieurs PP identiques ';
					data.contratCourantAdhesion.notes.statutsContrat = ctx.excelF.constantes.statuts.Echec;
					data.contratCourantAdhesion.statuts.finCreation = true;
					sc.endStep(ActivInfinitev7.steps.stFinScCreationHSP);
					return;
				}
			},
			fail: function() { 
				ctx.traceF.errorTxt(' Erreur lors du remplissage de l\'offre ');
				sc.endStep(ActivInfinitev7.steps.stFinScCreationHSP);
				return;
			}
		});
		}
	});
}});




/** Description */
ActivInfinitev7.step({ stCreationIdentificationPersonneAdhesionIndiv: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.contratAdhesionAttributs.NUM_SEQ_CT + ' Etape - stCreationIdentificationPersonneAdhesionIndiv');
	sc.endStep();
	return;
}});


ActivInfinitev7.step({ stSelectionPersonneAdhesionIndiv: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.contratAdhesionAttributs.NUM_SEQ_CT + ' Etape - stSelectionPersonneAdhesionIndiv');
	//on fait un polling pour attendre l'apparation du bouton valider
	var countPoll=0;
	ctx.polling({	
		delay: 200,	
		nbMax: 10,		
		test: function(index) { 		
			countPoll++;
			ctx.log('countP :'+countPoll);
			return ActivInfinitev7.pAdhIndivIdPrinRechResu.btValider.exist();
		},
		done: function() { 
		ActivInfinitev7.pAdhIndivIdPrinRechResu.btValider.click();
			sc.endStep(ActivInfinitev7.steps.stModifIdentificationPersonneAdhesionIndiv);
			return;

		},
		fail: function() { 
			ctx.traceF.errorTxt(' Erreur lors de la selection de la PP ');
			sc.endStep(ActivInfinitev7.steps.stFinScCreationHSP);
			return;
		}
	});
}});


ActivInfinitev7.step({ stModifIdentificationPersonneAdhesionIndiv: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.contratAdhesionAttributs.NUM_SEQ_CT + ' Etape - stModifIdentificationPersonneAdhesionIndiv');
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
