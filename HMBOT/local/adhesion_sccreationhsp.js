
/** Description */
ActivInfinitev7.scenario({ scCreationHSP: function(ev, sc) {
	var data = sc.data;
	sc.onTimeout(240000, function(sc, st) { 
		ActivInfinitev7.pTabDeBord.start(data.webData.tabDeBordURL);
		sc.endScenario();	
	}); // default timeout handler for each step
	sc.onError(function(sc, st, ex) { 
		ActivInfinitev7.pTabDeBord.start(data.webData.tabDeBordURL);
		sc.endScenario();	
	}); // default error handler
	sc.setMode(e.scenario.mode.clearIfRunning);
	// add steps here...
	sc.step(ActivInfinitev7.steps.stInitCreationHSP);
	sc.step(ActivInfinitev7.steps.stVersAdhesionIndividuelle);
	sc.step(ActivInfinitev7.steps.stOuvertureDossierHSP);
	sc.step(ActivInfinitev7.steps.stRemplirIdentificationContratHSP_Offre);
	sc.step(ActivInfinitev7.steps.stRemplirIdentificationContratHSP_SelectOffre);
	sc.step(ActivInfinitev7.steps.stRemplirIdentificationContratHSP_NumExterne);
	sc.step(ActivInfinitev7.steps.stRemplirIdentificationContratHSP_GroupeGestion);
	sc.step(ActivInfinitev7.steps.stRemplirIdentificationContratHSP_CentreGestion);
	sc.step(ActivInfinitev7.steps.stRecherchePersonneAdhesionIndiv);
	sc.step(ActivInfinitev7.steps.stResultatRecherchePersonneAdhesionIndiv);
	sc.step(ActivInfinitev7.steps.stCreationIdentificationPersonneAdhesionIndiv);
	sc.step(ActivInfinitev7.steps.stSelectionPersonneAdhesionIndiv);
	sc.step(ActivInfinitev7.steps.stModifIdentificationPersonneAdhesionIndiv);
//	sc.step(ActivInfinitev7.steps.stRecuperationDesChampsPageIntervenantPrincipal);
	sc.step(ActivInfinitev7.steps.stAdhesionIndiv_IdentificationAdherent);
	sc.step(ActivInfinitev7.steps.stAdhesionIndiv_AdresseAdherent);
	sc.step(ActivInfinitev7.steps.stAdhesionIndiv_AdresseAdherent_CodePostal);
	sc.step(ActivInfinitev7.steps.stAdhesionIndiv_AdresseAdherent_Adresse);
	sc.step(ActivInfinitev7.steps.stAdhesionIndiv_AdresseAdherent_Adresse_selectionVoie);
	sc.step(ActivInfinitev7.steps.stAdhesionIndiv_AdresseAdherent_Adresse_selectionVoie_lib_court);
	sc.step(ActivInfinitev7.steps.stAdhesionIndiv_AdresseAdherent_Adresse_France_ss_controle);
	sc.step(ActivInfinitev7.steps.stAdhesionIndiv_Prestation);
	sc.step(ActivInfinitev7.steps.stAdhesionIndiv_Cotisation);
	sc.step(ActivInfinitev7.steps.stAdhesionIndiv_Cotisation_PrelvtBancaire);
	sc.step(ActivInfinitev7.steps.stAdhesionIndiv_Cotisation_Cheque);
	sc.step(ActivInfinitev7.steps.stAdhesionIndiv_Remplissage_RIB);
	sc.step(ActivInfinitev7.steps.stAdhesionIndiv_Remplissage_RIB_Etablissement);
	sc.step(ActivInfinitev7.steps.stAdhesionIndiv_Remplissage_RIB_Guichet);
	sc.step(ActivInfinitev7.steps.stAdhesionIndiv_Remplissage_IBAN);
	sc.step(ActivInfinitev7.steps.stAdhesionIndiv_Remplissage_IBAN_PAYS);
	sc.step(ActivInfinitev7.steps.stAdhesionIndiv_DonneesMandat);
	sc.step(ActivInfinitev7.steps.stAdhesionIndiv_VerificationDesDonnees);
	sc.step(ActivInfinitev7.steps.stAdhesionIndiv_GestionsDesErreurs);
	sc.step(ActivInfinitev7.steps.stAdhesionIndiv_RIB_Erreur_Modif_Cheque_ParDefaut_setModeReglement);
	sc.step(ActivInfinitev7.steps.stAdhesionIndiv_RIB_Erreur_Modif_Cheque_ParDefaut);
	sc.step(ActivInfinitev7.steps.stPageIdentificationAssures);
	sc.step(ActivInfinitev7.steps.stPageIdentificationAssures_IdentifiantAdherent);
	sc.step(ActivInfinitev7.steps.stPageIdentificationAssures_InformationRO);
	sc.step(ActivInfinitev7.steps.stPageIdentificationAssures_InformationRO_SelectionRegime);
	sc.step(ActivInfinitev7.steps.stPageIdentificationAssures_Validation);
	sc.step(ActivInfinitev7.steps.stPageIdentificationAssures_Erreur_RO);
	sc.step(ActivInfinitev7.steps.stVersLaPageIdentificationSouscripteur);
	sc.step(ActivInfinitev7.steps.stVersLaPageIdentificationSouscripteur_ROValide);
	sc.step(ActivInfinitev7.steps.stPageIdentificationSouscripteur);
	sc.step(ActivInfinitev7.steps.stPageIdentificationSouscripteur_AjoutCommunication_Boucle);
	sc.step(ActivInfinitev7.steps.stPageIdentificationSouscripteur_AjoutCommunication);
	sc.step(ActivInfinitev7.steps.stPageIdentificationAssures_AjoutBeneficiaire);
	sc.step(ActivInfinitev7.steps.stPageIdentificationAssures_AjoutBeneficiaire_Boucle);
//	sc.step(ActivInfinitev7.steps.stRechercheBenefeciaireAdhesionIndiv);
//	sc.step(ActivInfinitev7.steps.stResultatRechercheBenefeciaireAdhesionIndiv);
//	sc.step(ActivInfinitev7.steps.stSelectionBenefeciaireAdhesionIndiv);
//	sc.step(ActivInfinitev7.steps.stCreationBenefeciaireAdhesionIndiv);
//	sc.step(ActivInfinitev7.steps.stPageIdentificationAssures_IdentifiantAdherent);
//	sc.step(ActivInfinitev7.steps.stPageIdentificationAssures_InformationRO);
//	sc.step(ActivInfinitev7.steps.stPageIdentificationAssures_InformationRO_SelectionRegime);
	sc.step(ActivInfinitev7.steps.stScenarioAjoutBeneficiaire);
	sc.step(ActivInfinitev7.steps.stAdhesionIndiv_ValidationBeneficiaire); 
//	sc.step(ActivInfinitev7.steps.stAdhesionIndiv_ModifIdentificationBeneficiaire); 
	sc.step(ActivInfinitev7.steps.stAdhesionIndividuelle_Modification_RIB_Prestation_condition);
	sc.step(ActivInfinitev7.steps.stAdhesionIndividuelle_Modification_RIB_Prestation);
	sc.step(ActivInfinitev7.steps.stAdhesionIndividuelle_VersLaPageDesProduits);
	sc.step(ActivInfinitev7.steps.stAdhesionIndividuelle_AjoutProduits_Boucle_Beneficiaire);
	sc.step(ActivInfinitev7.steps.stAdhesionIndividuelle_AjoutProduits_ListeProduit);
	sc.step(ActivInfinitev7.steps.stAdhesionIndividuelle_AjoutProduits_Boucle_Produits);
	sc.step(ActivInfinitev7.steps.stAdhesionIndividuelle_AjoutProduits);
	sc.step(ActivInfinitev7.steps.stVersLaPageParamDivers);
	sc.step(ActivInfinitev7.steps.stVersLaPageParamDeCalcul);
	sc.step(ActivInfinitev7.steps.stVersLaPageHistoDesCotisations);
	sc.step(ActivInfinitev7.steps.stPageVisuCompteCotisant_ValidationDuCalcul);
	sc.step(ActivInfinitev7.steps.stVersLaPageAvisEcheance);
	sc.step(ActivInfinitev7.steps.stAdhesionIndiv_PageDemandeCarteDeTiers_TypeEdition)
	sc.step(ActivInfinitev7.steps.stAdhesionIndiv_ValidationActe);
	sc.step(ActivInfinitev7.steps.stAdhesionIndiv_RetourPageIdentificationContrat);
	sc.step(ActivInfinitev7.steps.stFinScCreationHSP);
	
	
}});



/** Description */
ActivInfinitev7.step({ stInitCreationHSP: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.assurePrincipal.NUM_SEQ_CT + ' - Etape - stInitCreationHSP');
	data.contratCourantAdhesion.dataLocale.assurePrincipal=data.contratCourantAdhesion.dataLocale.tabPersonnesPhysiques[0]; // pour l'assure principal
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
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.assurePrincipal.NUM_SEQ_CT + ' - Etape - stOuvertureDossierHSP');
	ActivInfinitev7.pAdhesionsIndividuelles.wait(function(ev) {
		ActivInfinitev7.pAdhesionsIndividuelles.oEntiteRattachement.setFocus();
		ActivInfinitev7.pAdhesionsIndividuelles.oEntiteRattachement.keyStroke('P - HA'); // on insere 'P' pour faire apparaitre la boite cliquable
		ActivInfinitev7.pAdhesionsIndividuelles.oEntiteRattachement.setFocus();
		var countPoll=0;		
			ctx.polling({
				delay: 300,
				nbMax: 10,
				test: function(index) { 
					countPoll++;
					ctx.log('counter : '+countPoll);
					if(ActivInfinitev7.pAdhesionsIndividuelles.oSelectPHarmonie.exist()){
							ActivInfinitev7.pAdhesionsIndividuelles.oSelectPHarmonie.click();
							return true;
					}
					else{
							return false;
					}
				},
				done: function() { 
					ctx.traceF.infoTxt(' L\'entite de rattachement a été trouvée');
					var dd=data.contratCourantAdhesion.dataLocale.assurePrincipal.DATE_DEBUT_EFFET;	
					ctx.log('dd :'+dd);
					ActivInfinitev7.pAdhesionsIndividuelles.oDateDebutEffet.setFocus();
					ActivInfinitev7.pAdhesionsIndividuelles.oDateDebutEffet.set(dd);
					ActivInfinitev7.pAdhesionsIndividuelles.btRecherche.click();
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




ActivInfinitev7.step({ stRemplirIdentificationContratHSP_Offre: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.assurePrincipal.NUM_SEQ_CT + ' Etape - stRemplirIdentificationContratHSP_Offre');
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
			delay: 300,	
			nbMax: 10,		
			test: function(index) { 		
				countPoll++;
				ctx.log('countP :'+countPoll);
				return ActivInfinitev7.pAdhIndivIdentContrat.oOffre.exist();
			},
			done: function() { 
				sc.endStep(ActivInfinitev7.steps.stRemplirIdentificationContratHSP_SelectOffre);
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
ActivInfinitev7.step({ stRemplirIdentificationContratHSP_SelectOffre: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.assurePrincipal.NUM_SEQ_CT + ' Etape - stRemplirIdentificationContratHSP_Offre');
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
			delay: 300,	
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
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.assurePrincipal.NUM_SEQ_CT + ' Etape - stRemplirIdentificationContratHSP_NumExterne');
	var numExterneContrat =data.contratCourantAdhesion.dataLocale.assurePrincipal.NUM_EXT_CTT;
	//==================================================
	ActivInfinitev7.pAdhIndivIdentContrat.oNumeroExterne.setFocus();
	ActivInfinitev7.pAdhIndivIdentContrat.oNumeroExterne.set(numExterneContrat);
	ActivInfinitev7.pAdhIndivIdentContrat.oEcheancePrincip.setFocus();
	
	/// On enregistre aussi le numéro de contrat créé
	data.contratCourantAdhesion.dataEnLigne.numeroContratIndiv =  ActivInfinitev7.pAdhIndivIdentContrat.oNumeroContrat.get();
	
	sc.endStep();
	return;
}});


ActivInfinitev7.step({ stRemplirIdentificationContratHSP_GroupeGestion: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.assurePrincipal.NUM_SEQ_CT + ' Etape - stRemplirIdentificationContratHSP_GroupeGestion');
	var tabGestion =ctx.formF.codeGestion;
	
	/// on va rechercher dans la table de gestion les codes infinites correspondant au code GRC du contrat
	var codeGRC = data.contratCourantAdhesion.dataLocale.assurePrincipal.DISCRIMINANT;
	ctx.log('codeGRC : '+codeGRC);
	var codeGG = undefined;
	var codeCG = undefined;
	var index=-1;
	for(var i  in tabGestion){
		if(codeGRC == tabGestion[i].codeGRC){
			index=i;
			break;
		}
	}
	
	if (index == -1){
		ctx.traceF.errorTxt(data.contratCourantAdhesion.dataLocale.assurePrincipal.NUM_SEQ_CT + ' PAS DE CORRESPONDANCE TROUVE ENTRE CODE GRC ET INFINITE ');
	}else{
		codeGG = tabGestion[index].groupeGestionInfinite;
		codeCG = tabGestion[index].centreGestionInfinite;
		ctx.log('codeGG : '+codeGG+' , code CG : '+codeCG);
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
				delay: 300,
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
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.assurePrincipal.NUM_SEQ_CT + ' Etape - stRemplirIdentificationContratHSP_CentreGestion');
	var codeCG = data.contratCourantAdhesion.dataLocale.centreGestion;
	//==================================================================================
	ActivInfinitev7.pAdhIndivIdentContrat.oCentreGestion.setFocus();
	ActivInfinitev7.pAdhIndivIdentContrat.oCentreGestion.set('');
	ActivInfinitev7.pAdhIndivIdentContrat.oCentreGestion.keyStroke(codeCG);
	ActivInfinitev7.pAdhIndivIdentContrat.oCentreGestion.setFocus();
	
		var countPoll=0;	
		var indexCG = -1;
			ctx.polling({
				delay: 300,
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
				// On passe à la recherche sur la personne physique
				data.contratCourantAdhesion.dataLocale.personnePhysique=data.contratCourantAdhesion.dataLocale.tabPersonnesPhysiques[0]; // Assure Principal
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
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.assurePrincipal.NUM_SEQ_CT + ' Etape - stRecherchePersonneAdhesionIndiv');
//	var nom=data.contratCourantAdhesion.dataLocale.tabPersonnesPhysiques[0].contratAdhesionAttributs.CONTACT_NOM;
	var nom = data.contratCourantAdhesion.dataLocale.personnePhysique.CONTACT_NOM;
	var prenom = data.contratCourantAdhesion.dataLocale.personnePhysique.CONTACT_PRENOM;
	var dateNaissance = data.contratCourantAdhesion.dataLocale.personnePhysique.BRTH_DAY_GREG;
	var numRo = data.contratCourantAdhesion.dataLocale.personnePhysique.NUM_RO;
	ctx.log('Données - nom : '+nom+' prenom : '+prenom+' date naissance : '+dateNaissance+' numRo : '+numRo );
	ctx.log('Données - nom : '+nom+' prenom : '+prenom+' date naissance : '+dateNaissance+' numRo : '+numRo );
	ActivInfinitev7.pAdhIndivIdPrinRech.wait(function(ev) {
		var countPoll=0;	
		ctx.polling({	
			delay: 300,	
			nbMax: 10,		
			test: function(index) { 		
				countPoll++;
				ctx.log('countP :'+countPoll);
				return (ActivInfinitev7.pAdhIndivIdPrinRech.oNom.exist() && ActivInfinitev7.pAdhIndivIdPrinRech.btRechercher.exist());
			},
			done: function() { 
				ActivInfinitev7.pAdhIndivIdPrinRech.oNom.setFocus();
				ActivInfinitev7.pAdhIndivIdPrinRech.oNom.set(nom);
				ActivInfinitev7.pAdhIndivIdPrinRech.oPrenom.setFocus();
				ActivInfinitev7.pAdhIndivIdPrinRech.oPrenom.set(prenom);
				ActivInfinitev7.pAdhIndivIdPrinRech.oDateNaissance.setFocus();
				ActivInfinitev7.pAdhIndivIdPrinRech.oDateNaissance.set(dateNaissance);
				ActivInfinitev7.pAdhIndivIdPrinRech.oNumeroRo.setFocus();
				ActivInfinitev7.pAdhIndivIdPrinRech.oNumeroRo.set(numRo);
				ActivInfinitev7.pAdhIndivIdPrinRech.btRechercher.click();
				sc.endStep();
				return;	
			},
			fail: function() { 
				ctx.traceF.errorTxt(' Rercherche Personne Impossible : Element oNom introuvable ');
				data.contratCourantAdhesion.notes.commentaireContrat = 'Error Rercherche Personne Impossible ';
				data.contratCourantAdhesion.notes.statutsContrat = ctx.excelF.constantes.statuts.Echec;
				sc.endStep(ActivInfinitev7.steps.stFinScCreationHSP);
				return;
			}
		});
		

	});
}});


/** Description */
ActivInfinitev7.step({ stResultatRecherchePersonneAdhesionIndiv: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.assurePrincipal.NUM_SEQ_CT + ' Etape - stResultatRecherchePersonneAdhesionIndiv');
	ActivInfinitev7.pAdhIndivIdPrinRechResu.wait(function(ev){
		if(ActivInfinitev7.pAdhIndivIdPrinRechResu.oAucunePersonne){
			var countPoll=0;	
			ctx.polling({	
				delay: 300,	
				nbMax: 10,		
				test: function(index) { 		
					countPoll++;
					ctx.log('countP :'+countPoll);
					return ActivInfinitev7.pAdhIndivIdPrinRechResu.btAnnuler.exist();
				},
				done: function() { 
					ActivInfinitev7.pAdhIndivIdPrinRechResu.btAnnuler.click();
					sc.endStep(ActivInfinitev7.steps.stCreationIdentificationPersonneAdhesionIndiv);
					return;
				},
				fail: function() { 
					ctx.traceF.errorTxt('Error Recherche personne :  btAnnuler n\'existe pas');
					sc.endStep(ActivInfinitev7.steps.stFinScCreationHSP);
					return;
				}
			});
		}
		else{
			var countPoll=0;	
			ctx.polling({	
				delay: 300,	
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


ActivInfinitev7.step({ stSelectionPersonneAdhesionIndiv: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.assurePrincipal.NUM_SEQ_CT + ' Etape - stSelectionPersonneAdhesionIndiv');
	//on fait un polling pour attendre l'apparation du bouton valider
	var countPoll=0;
	ctx.polling({	
		delay: 300,	
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


/** Description */
ActivInfinitev7.step({ stCreationIdentificationPersonneAdhesionIndiv: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.assurePrincipal.NUM_SEQ_CT + ' Etape - stCreationIdentificationPersonneAdhesionIndiv');
	ActivInfinitev7.pAdhIndivIntervtPrin.wait(function(ev){
		ctx.log('--> Creation intervenant principal ');
		
//		sc.endStep(ActivInfinitev7.steps.stRecuperationDesChampsPageIntervenantPrincipal);
			sc.endStep(ActivInfinitev7.steps.stAdhesionIndiv_IdentificationAdherent);
		return;
	});
}});


/** Description */
ActivInfinitev7.step({ stRecuperationDesChampsPageIntervenantPrincipal: function(ev, sc, st) {
	var data = sc.data;
	var attributsEnLigne = data.contratCourantAdhesion.dataEnLigne.contratTemp;
	// Identification Adherent
	attributsEnLigne.CONTACT_CIVILITE = ActivInfinitev7.pAdhIndivIntervtPrin.oCivilite.innerHtml();
	attributsEnLigne.CONTACT_NOM = ActivInfinitev7.pAdhIndivIntervtPrin.oNom.get();
	attributsEnLigne.CONTACT_PRENOM = ActivInfinitev7.pAdhIndivIntervtPrin.oPrenom.get(true);
	attributsEnLigne.COMP_IDENT_DEST = ActivInfinitev7.pAdhIndivIntervtPrin.oEscalierEtage.get(true);
	attributsEnLigne.COMP_IDENTIF_GEO = ActivInfinitev7.pAdhIndivIntervtPrin.oBatimentAdresse.get(true);
	attributsEnLigne.NUMERO_VOIE = ActivInfinitev7.pAdhIndivIntervtPrin.oNumeroAdresse.get(true);
	attributsEnLigne.COMP_NUM_VOIE = ActivInfinitev7.pAdhIndivIntervtPrin.oBtqAdresse.get(true);
	////
	attributsEnLigne.ADRESSE_NAT_VOIE = ActivInfinitev7.pAdhIndivIntervtPrin.oVoieAdresse.get(true);
	attributsEnLigne.LIBELLE_VOIE = ActivInfinitev7.pAdhIndivIntervtPrin.oVoieAdresse.get(true);
	
	//
	attributsEnLigne.CODE_POSTAL = ActivInfinitev7.pAdhIndivIntervtPrin.oCodePostal.get(true);
	attributsEnLigne.LIBELLE_LOCALITE = ActivInfinitev7.pAdhIndivIntervtPrin.oLocalite.get(true);
	attributsEnLigne.CODE_CEDEX = ActivInfinitev7.pAdhIndivIntervtPrin.oCodeCedex.get(true);
	attributsEnLigne.CODE_PAYS = ActivInfinitev7.pAdhIndivIntervtPrin.oPaysAdresse.get(true);
	attributsEnLigne.TITU_COMPTE = ActivInfinitev7.pAdhIndivIntervtPrin.oTitulaireRib.get(true);
	attributsEnLigne.CODE_BANQUE = ActivInfinitev7.pAdhIndivIntervtPrin.oCodeBanque.get(true);
	attributsEnLigne.CODE_GUICHET = ActivInfinitev7.pAdhIndivIntervtPrin.oCodeGuichet.get(true);
	attributsEnLigne.NUM_COMPTE = ActivInfinitev7.pAdhIndivIntervtPrin.oCompteRib.get(true);
	attributsEnLigne.CLE_RIB = ActivInfinitev7.pAdhIndivIntervtPrin.oCleRib.get(true);
	attributsEnLigne.CLE_IBAN = ActivInfinitev7.pAdhIndivIntervtPrin.oCleIBAN.get(true);
	attributsEnLigne.BIC = ActivInfinitev7.pAdhIndivIntervtPrin.oNumBic.get(true);
	attributsEnLigne.DATE_SIGN_MANDAT = ActivInfinitev7.pAdhIndivIntervtPrin.oDateSignature.get(true);
	attributsEnLigne.CODE_PAYS_RIB = ActivInfinitev7.pAdhIndivIntervtPrin.oPaysISO.get(true);
	attributsEnLigne.MODE_PAIE = ActivInfinitev7.pAdhIndivIntervtPrin.oModeReglement.get(true);
	attributsEnLigne.PERIODICITE = ActivInfinitev7.pAdhIndivIntervtPrin.oFrequenceReglement.get(true);
	attributsEnLigne.JOUR_PRELEV = ActivInfinitev7.pAdhIndivIntervtPrin.oCodeEcheancier.get(true);
	attributsEnLigne.FREQ_AVIS_ECH = ActivInfinitev7.pAdhIndivIntervtPrin.oFrequenceAvisEcheance.get(true);
	attributsEnLigne.TYPE_TERME = ActivInfinitev7.pAdhIndivIntervtPrin.oTypeTerme.get(true);
	attributsEnLigne.TOP_ABONN_DEC= ActivInfinitev7.pAdhIndivIntervtPrin.oModePaiement.get(true);
	
	data.contratCourantAdhesion.dataEnLigne.contratTemp = attributsEnLigne;
	sc.endStep(ActivInfinitev7.steps.stAdhesionIndiv_IdentificationAdherent);
	return;
}});


ActivInfinitev7.step({ stModifIdentificationPersonneAdhesionIndiv: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.assurePrincipal.NUM_SEQ_CT + ' Etape - stModifIdentificationPersonneAdhesionIndiv');
	sc.endStep(ActivInfinitev7.steps.stAdhesionIndiv_IdentificationAdherent);
	return;
}});



/** Description */
ActivInfinitev7.step({ stAdhesionIndiv_IdentificationAdherent: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.assurePrincipal.NUM_SEQ_CT + ' Etape - stAdhesionIndiv_IdentificationAdherent');
	// Identification Adherent
	var civilite= data.contratCourantAdhesion.dataLocale.assurePrincipal.CONTACT_CIVILITE;
	ctx.log('Civilité : '+civilite);
	ctx.wait(function(ev){
		var countPoll=0;	
		ctx.polling({	
			delay: 300,	
			nbMax: 10,		
			test: function(index) { 		
				countPoll++;
				ctx.log('countP :'+countPoll);
				return ActivInfinitev7.pAdhIndivIntervtPrin.oCivilite.exist();
			},
			done: function() { 
				ActivInfinitev7.pAdhIndivIntervtPrin.oCivilite.setFocus();
				ActivInfinitev7.pAdhIndivIntervtPrin.oCivilite.set(civilite);
				sc.endStep();
				return;
			},
			fail: function() { 
				ctx.traceF.errorTxt(' Erreur lors du remplissage de la civilité ');
				data.contratCourantAdhesion.notes.statutsContrat = ctx.excelF.constantes.statuts.Echec;
				data.contratCourantAdhesion.statuts.finCreation = true;
				sc.endStep(ActivInfinitev7.steps.stFinScCreationHSP);
				return;
			}
		});
	},1000);

}});


ActivInfinitev7.step({ stAdhesionIndiv_AdresseAdherent: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.assurePrincipal.NUM_SEQ_CT + ' Etape - stAdhesionIndiv_AdresseAdherent');
	
	
//	par defaut Type Adresse
	ActivInfinitev7.pAdhIndivIntervtPrin.oTypeAdresse.setFocus();
	ActivInfinitev7.pAdhIndivIntervtPrin.oTypeAdresse.set('DOM');
	// Pays
	var codePays=data.contratCourantAdhesion.dataLocale.assurePrincipal.CODE_PAYS;
	//Normalement les codes pays sont les memes pour GRC et infinite ( à confirmer )
	ActivInfinitev7.pAdhIndivIntervtPrin.oPaysAdresse.set(codePays);
	// Code Cedex ( a voir )
	
	
	ctx.log('----');
	sc.endStep();
	return;
}});

ActivInfinitev7.step({ stAdhesionIndiv_AdresseAdherent_CodePostal: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.assurePrincipal.NUM_SEQ_CT + ' Etape - stAdhesionIndiv_AdresseAdherent_CodePostal');
	var cp = data.contratCourantAdhesion.dataLocale.assurePrincipal.CODE_POSTAL;
	// comme plusieurs communes peuvent avoir le meme code postal , on ajoute le nom de la commune
	cp = cp + ' - '+ data.contratCourantAdhesion.dataLocale.assurePrincipal.LIBELLE_LOCALITE;
	ActivInfinitev7.pAdhIndivIntervtPrin.oCodePostal.setFocus();
	ActivInfinitev7.pAdhIndivIntervtPrin.oCodePostal.keyStroke(cp);
	var countPoll=0;	
	ctx.polling({	
			delay: 300,	
			nbMax: 10,		
			test: function(index) { 		
				countPoll++;
				ctx.log('countP :'+countPoll);
				return ActivInfinitev7.pAdhIndivIntervtPrin.oSelectCodePostal.count()>0;
			},
			done: function() { 
				/// la combinaison ville + code postal doit etre unique
				var choixUnique = false;
				if(ActivInfinitev7.pAdhIndivIntervtPrin.oSelectCodePostal.i(0).get()==cp){
					choixUnique = true;
				}
				if(choixUnique){
					// la Personne physique est unique on peut continuer avec
					ActivInfinitev7.pAdhIndivIntervtPrin.oSelectCodePostal.i(0).click();
					sc.endStep();
					return;
				}
				else{
					// on essaye de reconnaitre le pattern dans les choix
					var trouve = false;
					var indexV = -1;
					ctx.log('ville courante : '+cp);
					for(var vv in ActivInfinitev7.pAdhIndivIntervtPrin.oSelectCodePostal.getAll()){
						var ville = ActivInfinitev7.pAdhIndivIntervtPrin.oSelectCodePostal.i(vv).get();
						ctx.log('Choix ville : '+ville);
						if(ville.indexOf(cp)!=-1){
							ctx.log('-->Trouvée');
							trouve=true;
							indexV=vv;
						}
					}
					if(trouve){
							ActivInfinitev7.pAdhIndivIntervtPrin.oSelectCodePostal.i(indexV).click();
							sc.endStep();
							return;
					}
					else{
						/// il y a plusieur PP on renvoi au centre
						ctx.traceF.errorTxt(' La ville n\'est pas unique - impossible à distinguer');
						data.contratCourantAdhesion.notes.commentaireContrat = 'Erreur Code Postal :  La ville n\'est pas unique - impossible à distinguer';
						data.contratCourantAdhesion.notes.statutsContrat = ctx.excelF.constantes.statuts.Echec;
						data.contratCourantAdhesion.statuts.finCreation = true;
						sc.endStep(ActivInfinitev7.steps.stFinScCreationHSP);
						return;
					}
					
				}
			},
			fail: function() { 
				ctx.traceF.errorTxt(' Erreur lors du remplissage du code postal ');
				sc.endStep(ActivInfinitev7.steps.stFinScCreationHSP);
				return;
			}
		});
}});




ActivInfinitev7.step({ stAdhesionIndiv_AdresseAdherent_Adresse: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.assurePrincipal.NUM_SEQ_CT + ' Etape - stAdhesionIndiv_AdresseAdherent_Adresse');
	// Escalier  Etage ..
	var complementAdresse_1 = data.contratCourantAdhesion.dataLocale.assurePrincipal.COMP_IDENT_DEST;
	var complementAdresse_2 = data.contratCourantAdhesion.dataLocale.assurePrincipal.COMP_IDENTIF_GEO;
	var numeroVoie = data.contratCourantAdhesion.dataLocale.assurePrincipal.NUMERO_VOIE;
	var complementVoie = data.contratCourantAdhesion.dataLocale.assurePrincipal.COMP_NUM_VOIE 
	ActivInfinitev7.pAdhIndivIntervtPrin.oEscalierEtage.setFocus();
	ActivInfinitev7.pAdhIndivIntervtPrin.oEscalierEtage.keyStroke(complementAdresse_1);
	ActivInfinitev7.pAdhIndivIntervtPrin.oBatimentAdresse.setFocus();
	ActivInfinitev7.pAdhIndivIntervtPrin.oBatimentAdresse.keyStroke(complementAdresse_2);
	ActivInfinitev7.pAdhIndivIntervtPrin.oNumeroAdresse.setFocus();
	ctx.log('numero de voie : '+numeroVoie);
	ActivInfinitev7.pAdhIndivIntervtPrin.oNumeroAdresse.keyStroke(numeroVoie);
	ActivInfinitev7.pAdhIndivIntervtPrin.oBtqAdresse.setFocus();
	ActivInfinitev7.pAdhIndivIntervtPrin.oBtqAdresse.keyStroke(complementVoie); /// Attention Select, il se peut que les codes GRC soient différents de ceux d'infinite
	
	sc.endStep();
	return;
}});


ActivInfinitev7.step({ stAdhesionIndiv_AdresseAdherent_Adresse_selectionVoie: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.assurePrincipal.NUM_SEQ_CT + ' Etape - stAdhesionIndiv_AdresseAdherent_Adresse_selectionVoie');
	var code = data.contratCourantAdhesion.dataLocale.assurePrincipal.ADRESSE_NAT_VOIE;
//	var natureVoie = ctx.configF.correspondanceTab(ctx.formF.typeVoie.GRC,ctx.formF.typeVoie.Infinite,natureVoieGRC);
	/// lib long
	var tab = { code :'',lib_court:'',lib_long:''};
	tab = ctx.formF.typeVoie ;
	var resultat2='';
	for ( var i in tab ){
		if(tab[i].code != undefined){
			if( code == tab[i].code){
				resultat2=tab[i].lib_long;
			}
		}
		else{
			ctx.traceF.errorTxt(' Le code ' + code + ' n\'existe pas pour ce tableau');
		}
	}
	if(resultat2 == ''){
		ctx.traceF.errorTxt('Pas de correspondance trouvée pour ' + code);
	}
	
	ctx.log(' NAT VOIE : '+ resultat2);
	var nomVoie = data.contratCourantAdhesion.dataLocale.assurePrincipal.LIBELLE_VOIE;
	// comme plusieurs communes peuvent avoir le meme code postal , on ajoute le nom de la commune
	var voie_nom_long = resultat2 + ' '+ nomVoie;
	ctx.log(' Voie : '+voie_nom_long);
	ActivInfinitev7.pAdhIndivIntervtPrin.oVoieAdresse.setFocus();
	ActivInfinitev7.pAdhIndivIntervtPrin.oVoieAdresse.keyStroke(voie_nom_long);
	
	var countPoll=0;	
	ctx.polling({	
			delay: 300,	
			nbMax: 10,		
			test: function(index) { 		
				countPoll++;
				ctx.log('countP :'+countPoll);
				return ActivInfinitev7.pAdhIndivIntervtPrin.oSelectVoie.count()>0;
			},
			done: function() { 
				/// la combinaison ville + code postal doit etre unique
				var choixUnique = false;
				if(ActivInfinitev7.pAdhIndivIntervtPrin.oSelectVoie.i(0).get() == voie_nom_long){
					choixUnique = true;
				}
				if(choixUnique){
					// la Personne physique est unique on peut continuer avec
					ActivInfinitev7.pAdhIndivIntervtPrin.oSelectVoie.i(0).click();
					sc.endStep(ActivInfinitev7.steps.stAdhesionIndiv_Prestation);
					return;
				}
				else{
					ctx.traceF.errorTxt(' La voie n\'est pas unique --> Passage en France ss ctrl');
					data.contratCourantAdhesion.notes.commentaireContrat = 'La voie n\'est pas unique --> Passage en France ss ctrl';
					sc.endStep(ActivInfinitev7.steps.stAdhesionIndiv_AdresseAdherent_Adresse_France_ss_controle);
					return;
				}
			},
			fail: function() { 
				ctx.traceF.errorTxt(' La voie n\'est pas unique --> Passage en France ss ctrl');
				data.contratCourantAdhesion.notes.commentaireContrat = 'La voie n\'est pas unique --> Passage en France ss ctrl';
				sc.endStep(ActivInfinitev7.steps.stAdhesionIndiv_AdresseAdherent_Adresse_France_ss_controle);
				return;
			}
		});
}});



ActivInfinitev7.step({ stAdhesionIndiv_AdresseAdherent_Adresse_selectionVoie_lib_court: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.assurePrincipal.NUM_SEQ_CT + ' Etape - stAdhesionIndiv_AdresseAdherent_Adresse_selectionVoie_lib_court');
	/// la selection de la voie avec un libellé long n'a pas marché on tente avec une libellé court
	var code = data.contratCourantAdhesion.dataLocale.assurePrincipal.ADRESSE_NAT_VOIE;
//	var natureVoie = ctx.configF.correspondanceTab(ctx.formF.typeVoie.GRC,ctx.formF.typeVoie.Infinite,natureVoieGRC);
	/// lib long
	var tab = { code :'',lib_court:'',lib_long:''};
	tab = ctx.formF.typeVoie ;
	var resultat1= '';
		for ( var i in tab ){
			if(tab[i].code != undefined){
				if( code == tab[i].code){
					resultat1=tab[i].lib_court;
				}
			}
			else{
				ctx.traceF.errorTxt(' Le code ' + code + ' n\'existe pas pour ce tableau');
			}
		}
		if(resultat1 == ''){
			ctx.traceF.errorTxt('Pas de correspondance trouvée pour ' + code);
		}
	ctx.log(' NAT VOIE : '+ resultat1);
	var nomVoie = data.contratCourantAdhesion.dataLocale.assurePrincipal.LIBELLE_VOIE;
	// comme plusieurs communes peuvent avoir le meme code postal , on ajoute le nom de la commune
	var voie_nom_court = resultat1 + ' '+ nomVoie;
	ctx.log(' Voie : '+ voie_nom_court);
	ActivInfinitev7.pAdhIndivIntervtPrin.oVoieAdresse.setFocus();
	ActivInfinitev7.pAdhIndivIntervtPrin.oVoieAdresse.set('');
	ActivInfinitev7.pAdhIndivIntervtPrin.oVoieAdresse.keyStroke(voie_nom_court);
	
	var countPoll=0;	
	ctx.polling({	
			delay: 300,	
			nbMax: 10,		
			test: function(index) { 		
				countPoll++;
				ctx.log('countP :'+countPoll);
				return ActivInfinitev7.pAdhIndivIntervtPrin.oSelectVoie.count()>0;
			},
			done: function() { 
				/// la combinaison ville + code postal doit etre unique
				var choixUnique = false;
				if(ActivInfinitev7.pAdhIndivIntervtPrin.oSelectVoie.i(0).get() == voie_nom_court){
					choixUnique = true;
				}
				if(choixUnique){
					// la voie est unique on peut continuer avec
					ActivInfinitev7.pAdhIndivIntervtPrin.oSelectVoie.i(0).click();
					sc.endStep(ActivInfinitev7.steps.stAdhesionIndiv_Prestation);
					return;
				}
				else{
					ctx.traceF.errorTxt(' La voie n\'est pas unique --> Passage en France ss ctrl');
					data.contratCourantAdhesion.notes.commentaireContrat = 'La voie n\'est pas unique --> Passage en France ss ctrl';
					sc.endStep(ActivInfinitev7.steps.stAdhesionIndiv_AdresseAdherent_Adresse_France_ss_controle);
					return;
				}
			},
			fail: function() { 
				ctx.traceF.errorTxt(' Erreur lors du remplissage du nom de la voie');
				data.contratCourantAdhesion.notes.commentaireContrat = ' Voie introuvable --> Passage en France ss ctrl';
				sc.endStep(ActivInfinitev7.steps.stAdhesionIndiv_AdresseAdherent_Adresse_France_ss_controle);
				return;
			}
		});
}});


ActivInfinitev7.step({ stAdhesionIndiv_AdresseAdherent_Adresse_France_ss_controle: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.assurePrincipal.NUM_SEQ_CT + ' Etape - stAdhesionIndiv_AdresseAdherent_Adresse_France_ss_controle');
	// L'adresse est introuvable dans la base Infinite, on enregistre l'adresse en "france sans controle "
	/// Pays : France ss ctrl
	ActivInfinitev7.pAdhIndivIntervtPrin.oPaysAdresse.setFocus();
	ActivInfinitev7.pAdhIndivIntervtPrin.oPaysAdresse.set('ZZZ');
	// Code postal :
	var cp = data.contratCourantAdhesion.dataLocale.assurePrincipal.CODE_POSTAL;
	ActivInfinitev7.pAdhIndivIntervtPrin.oCodePostal.setFocus();
	ActivInfinitev7.pAdhIndivIntervtPrin.oCodePostal.set('');
	ActivInfinitev7.pAdhIndivIntervtPrin.oCodePostal.set(cp);
	// Localite
	var localite = data.contratCourantAdhesion.dataLocale.assurePrincipal.LIBELLE_LOCALITE;
	ActivInfinitev7.pAdhIndivIntervtPrin.oLocalite.setFocus();
	ActivInfinitev7.pAdhIndivIntervtPrin.oLocalite.set('');
	ActivInfinitev7.pAdhIndivIntervtPrin.oLocalite.set(localite);
	// Escalier
	var complementAdresse_1 = data.contratCourantAdhesion.dataLocale.assurePrincipal.COMP_IDENT_DEST;
	ActivInfinitev7.pAdhIndivIntervtPrin.oEscalierEtage.setFocus();
	ActivInfinitev7.pAdhIndivIntervtPrin.oEscalierEtage.set('');
	ActivInfinitev7.pAdhIndivIntervtPrin.oEscalierEtage.set(complementAdresse_1);
	// Résidence, Batiment..
	var complementAdresse_2 = data.contratCourantAdhesion.dataLocale.assurePrincipal.COMP_IDENTIF_GEO;
	ActivInfinitev7.pAdhIndivIntervtPrin.oBatimentAdresse.setFocus();
		ActivInfinitev7.pAdhIndivIntervtPrin.oBatimentAdresse.set('');
	ActivInfinitev7.pAdhIndivIntervtPrin.oBatimentAdresse.set(complementAdresse_2);
	// numéro de voie
	var numeroVoie = data.contratCourantAdhesion.dataLocale.assurePrincipal.NUMERO_VOIE;
	ActivInfinitev7.pAdhIndivIntervtPrin.oNumeroAdresse.setFocus();
	ActivInfinitev7.pAdhIndivIntervtPrin.oNumeroAdresse.set('');
	ActivInfinitev7.pAdhIndivIntervtPrin.oNumeroAdresse.set(numeroVoie);
	// Complement Voie
	var complementVoie = data.contratCourantAdhesion.dataLocale.assurePrincipal.COMP_NUM_VOIE 
	ActivInfinitev7.pAdhIndivIntervtPrin.oBtqAdresse.setFocus();
	ActivInfinitev7.pAdhIndivIntervtPrin.oBtqAdresse.set('');
	ActivInfinitev7.pAdhIndivIntervtPrin.oBtqAdresse.set(complementVoie); 
	
	sc.endStep(ActivInfinitev7.steps.stAdhesionIndiv_Prestation);
	return;
	
	
}});






/** Description */
ActivInfinitev7.step({ stAdhesionIndiv_Prestation: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.assurePrincipal.NUM_SEQ_CT + ' Etape - stAdhesionIndiv_Prestation');
	var typeAbo = data.contratCourantAdhesion.dataLocale.assurePrincipal.TOP_ABONN_DEC;
	var cptBanque= data.contratCourantAdhesion.dataLocale.assurePrincipal.COMPTE_BANQUE_PREST;
	// 3 conditions
	ActivInfinitev7.pAdhIndivIntervtPrin.oModePaiement.setFocus();
	if(typeAbo == 'N' && cptBanque !=''){
		//Virement
		ActivInfinitev7.pAdhIndivIntervtPrin.oModePaiement.set('V');
		sc.endStep();
		return;
	}
	else if(typeAbo == 'N' && cptBanque ==''){
		// Rejet
		ctx.traceF.errorTxt(' Erreur lors du remplissage du nom de la voie');
		data.contratCourantAdhesion.notes.statutsContrat = ctx.excelF.constantes.statuts.Echec;
		data.contratCourantAdhesion.statuts.finCreation = true;
		sc.endStep(ActivInfinitev7.steps.stFinScCreationHSP);
		return;
	}
	else if(typeAbo == 'O'){
		// Virement email
		ActivInfinitev7.pAdhIndivIntervtPrin.oModePaiement.set('VE');
		sc.endStep();
		return;
	}
	
}});


/** Description */
ActivInfinitev7.step({ stAdhesionIndiv_Cotisation: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.assurePrincipal.NUM_SEQ_CT + ' Etape - stAdhesionIndiv_Cotisation');
	/// Mode de reglement
	var modePrelvt = data.contratCourantAdhesion.dataLocale.assurePrincipal.MODE_PAIE;
	ActivInfinitev7.pAdhIndivIntervtPrin.oModeReglement.setFocus();
	if(modePrelvt == '1'){
		//Cheque
		sc.endStep(ActivInfinitev7.steps.stAdhesionIndiv_Cotisation_Cheque);
		return;
	}
	else if(modePrelvt=='3'){
		//Prelev Bancaire
		sc.endStep(ActivInfinitev7.steps.stAdhesionIndiv_Cotisation_PrelvtBancaire);
		return;
	}
}});


/** Description */
ActivInfinitev7.step({ stAdhesionIndiv_Cotisation_PrelvtBancaire: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.assurePrincipal.NUM_SEQ_CT + ' Etape - stAdhesionIndiv_Cotisation_PrelvtBancaire');
	ActivInfinitev7.pAdhIndivIntervtPrin.oModeReglement.set('3');
	ActivInfinitev7.pAdhIndivIntervtPrin.wait(function(ev){
		var jourPrelev = ctx.dateF.format2c(data.contratCourantAdhesion.dataLocale.assurePrincipal.JOUR_PRELEV);
		var freqReglt = data.contratCourantAdhesion.dataLocale.assurePrincipal.PERIODICITE;
		var freqAvisEch = data.contratCourantAdhesion.dataLocale.assurePrincipal.FREQ_AVIS_ECH;
		var typeTerme =  data.contratCourantAdhesion.dataLocale.assurePrincipal.TYPE_TERME;
		ctx.log('Code Echeancier : '+jourPrelev);
		ctx.wait(function(ev){
			if(  jourPrelev !=''){
			var countPoll=0;
			ctx.polling({
				delay: 100,
				nbMax: 10,
				test: function(index) { 
					countPoll++;
					ctx.log( "Polling : "+countPoll);
					var ECE = ActivInfinitev7.pAdhIndivIntervtPrin.oCodeEcheancier.exist();
					var EFR = ActivInfinitev7.pAdhIndivIntervtPrin.oFrequenceReglement.exist();
					var EFA = ActivInfinitev7.pAdhIndivIntervtPrin.oFrequenceAvisEcheance.exist();
					var ETT = ActivInfinitev7.pAdhIndivIntervtPrin.oTypeTerme.exist();
					var existance = ECE * EFR * EFA * ETT ;
					return existance; 
				},
				done: function() { 
					// Date Debut Prelevement
					ActivInfinitev7.pAdhIndivIntervtPrin.oCodeEcheancier.setFocus();
					ActivInfinitev7.pAdhIndivIntervtPrin.oCodeEcheancier.set(jourPrelev);
					// Frequence Reglement
					ActivInfinitev7.pAdhIndivIntervtPrin.oFrequenceReglement.setFocus();
					ActivInfinitev7.pAdhIndivIntervtPrin.oFrequenceReglement.set(freqReglt);
					// Frequence Avis d'échéance
					ActivInfinitev7.pAdhIndivIntervtPrin.oFrequenceAvisEcheance.setFocus();
					ActivInfinitev7.pAdhIndivIntervtPrin.oFrequenceAvisEcheance.set('A'); // toujours annuel 
					// Type Terme
					ActivInfinitev7.pAdhIndivIntervtPrin.oTypeTerme.setFocus();
					ActivInfinitev7.pAdhIndivIntervtPrin.oTypeTerme.set('AE'); // toujours à échoir
					sc.endStep(ActivInfinitev7.steps.stAdhesionIndiv_Remplissage_RIB);
					return;
				},
				fail: function() { 
					ctx.traceF.errorTxt(' Erreur lors du remplissage des coordonnées bancaires : erreur Serveur Code echéancier  n\'existe pas ');
					data.contratCourantAdhesion.notes.commentaireContrat = 'Revoir centre:  Erreur lors du remplissage des coordonnées bancaire : erreur Serveur Code echéancier  n\'existe pas ';
					data.contratCourantAdhesion.notes.statutsContrat = ctx.excelF.constantes.statuts.Echec;
					data.contratCourantAdhesion.statuts.finCreation = true;
					sc.endStep(ActivInfinitev7.steps.stFinScCreationHSP);
					return;
				}
			});
		}
		else{
			ctx.traceF.errorTxt(' Erreur lors du remplissage du mode prelevement : données incomplètes');
			data.contratCourantAdhesion.notes.statutsContrat = ctx.excelF.constantes.statuts.Echec;
			data.contratCourantAdhesion.statuts.finCreation = true;
			sc.endStep(ActivInfinitev7.steps.stFinScCreationHSP);
			return;
		}	
		},1000);
		
	});
}});

/** Description */
ActivInfinitev7.step({ stAdhesionIndiv_Cotisation_Cheque: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.assurePrincipal.NUM_SEQ_CT + ' Etape - stAdhesionIndiv_Cotisation_Cheque');
	ActivInfinitev7.pAdhIndivIntervtPrin.oModeReglement.set('1');
	ActivInfinitev7.pAdhIndivIntervtPrin.events.LOAD.on(function(ev){
	var freqReglt = data.contratCourantAdhesion.dataLocale.assurePrincipal.PERIODICITE;
	var freqAvisEch = data.contratCourantAdhesion.dataLocale.assurePrincipal.FREQ_AVIS_ECH;
	var typeTerme =  data.contratCourantAdhesion.dataLocale.assurePrincipal.TYPE_TERME;
	sc.endStep(ActivInfinitev7.steps.stAdhesionIndiv_Remplissage_RIB);
	return;
			});
}});



ActivInfinitev7.step({ stAdhesionIndiv_Remplissage_RIB: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.assurePrincipal.NUM_SEQ_CT + ' Etape - stAdhesionIndiv_Remplissage_RIB');
	// Titulaire
	var titulaire=data.contratCourantAdhesion.dataLocale.assurePrincipal.TITU_COMPTE;
	ActivInfinitev7.pAdhIndivIntervtPrin.oTitulaireRib.setFocus();
	ActivInfinitev7.pAdhIndivIntervtPrin.oTitulaireRib.set('');
	ActivInfinitev7.pAdhIndivIntervtPrin.oTitulaireRib.set(titulaire);
	// Numero de compte
	var numCpt = data.contratCourantAdhesion.dataLocale.assurePrincipal.NUM_COMPTE;
	ActivInfinitev7.pAdhIndivIntervtPrin.oCompteRib.setFocus();
	ActivInfinitev7.pAdhIndivIntervtPrin.oCompteRib.set(numCpt);
	// Clef RIB
	var cleRIB = data.contratCourantAdhesion.dataLocale.assurePrincipal.CLE_RIB;
	ActivInfinitev7.pAdhIndivIntervtPrin.oCleRib.setFocus();
	ActivInfinitev7.pAdhIndivIntervtPrin.oCleRib.set(cleRIB);
	// Code banque et guichet sont remplis dans les steps suivantes
	sc.endStep();
	return;
}});


/** Description */
ActivInfinitev7.step({ stAdhesionIndiv_Remplissage_RIB_Etablissement: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.assurePrincipal.NUM_SEQ_CT + ' Etape - stAdhesionIndiv_Remplissage_Etablissement');
	// Etablissement
	var codeEtblt=data.contratCourantAdhesion.dataLocale.assurePrincipal.CODE_BANQUE;
	ActivInfinitev7.pAdhIndivIntervtPrin.oCodeBanque.setFocus();
	ActivInfinitev7.pAdhIndivIntervtPrin.oCodeBanque.keyStroke(codeEtblt);
	var countPoll=0;	
	ctx.polling({	
		delay: 300,	
		nbMax: 10,		
		test: function(index) { 		
			countPoll++;
			ctx.log('countP :'+countPoll);
			return ActivInfinitev7.pAdhIndivIntervtPrin.oSelectEtablissement.count()>0;
		},
		done: function() { 
			/// on cherche parmis les resultats du tableau celui qui correspond à l'offre
			var nbEt = ActivInfinitev7.pAdhIndivIntervtPrin.oSelectEtablissement.count();
			if(nbEt==1){
				//Il n'y a qu'un seul etablissement
				ActivInfinitev7.pAdhIndivIntervtPrin.oSelectEtablissement.i(0).click();
				sc.endStep();
				return;
			}
			else{
				/// il y a plusieur PP on renvoi au centre
				ctx.traceF.errorTxt(' Confusion sur le code etablissement , on ne traite pas le dossier ');
				data.contratCourantAdhesion.notes.commentaireContrat = 'Revoir centre: Confusion sur le code etablissement ';
				data.contratCourantAdhesion.notes.statutsContrat = ctx.excelF.constantes.statuts.Echec;
				data.contratCourantAdhesion.statuts.finCreation = true;
				sc.endStep(ActivInfinitev7.steps.stFinScCreationHSP);
				return;
			}
		},
		fail: function() { 
			ctx.traceF.errorTxt(' Erreur lors du remplissage du RIB : Code Etablissement ');
			data.contratCourantAdhesion.notes.commentaireContrat = 'Revoir centre:  Erreur lors du remplissage du RIB : Code Etablissement ';
			data.contratCourantAdhesion.notes.statutsContrat = ctx.excelF.constantes.statuts.Echec;
			data.contratCourantAdhesion.statuts.finCreation = true;
			sc.endStep(ActivInfinitev7.steps.stFinScCreationHSP);
			return;
		}
	});
}});



ActivInfinitev7.step({ stAdhesionIndiv_Remplissage_RIB_Guichet: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.assurePrincipal.NUM_SEQ_CT + ' Etape - stAdhesionIndiv_Remplissage_RIB_Guichet');
	// Guichet
	var codeGuichet=data.contratCourantAdhesion.dataLocale.assurePrincipal.CODE_GUICHET;
	ActivInfinitev7.pAdhIndivIntervtPrin.oCodeGuichet.setFocus();
	ActivInfinitev7.pAdhIndivIntervtPrin.oCodeGuichet.keyStroke(codeGuichet);
	var countPoll=0;	
	ctx.polling({	
		delay: 300,	
		nbMax: 10,		
		test: function(index) { 		
			countPoll++;
			ctx.log('countP :'+countPoll);
			return ActivInfinitev7.pAdhIndivIntervtPrin.oSelectGuichet.count()>0;
		},
		done: function() { 
			/// on cherche parmis les resultats du tableau celui qui correspond à l'offre
			var nbEt = ActivInfinitev7.pAdhIndivIntervtPrin.oSelectGuichet.count();
			if(nbEt==1){
				//Il n'y a qu'un seul etablissement
				ActivInfinitev7.pAdhIndivIntervtPrin.oSelectGuichet.i(0).click();
				sc.endStep();
				return;
			}
			else{
				/// il y a plusieur PP on renvoi au centre
				ctx.traceF.errorTxt(' Confusion sur le Code Guichet , on ne traite pas le dossier ');
				data.contratCourantAdhesion.notes.commentaireContrat = 'Revoir centre: Confusion sur le Code Guichet ';
				data.contratCourantAdhesion.notes.statutsContrat = ctx.excelF.constantes.statuts.Echec;
				data.contratCourantAdhesion.statuts.finCreation = true;
				sc.endStep(ActivInfinitev7.steps.stFinScCreationHSP);
				return;
			}
		},
		fail: function() { 
			ctx.traceF.errorTxt(' Erreur lors du remplissage du RIB : Code Guichet ');
			data.contratCourantAdhesion.notes.commentaireContrat = 'Revoir centre:  Erreur lors du remplissage du RIB : Code Guichet  ';
			data.contratCourantAdhesion.notes.statutsContrat = ctx.excelF.constantes.statuts.Echec;
			data.contratCourantAdhesion.statuts.finCreation = true;
			sc.endStep(ActivInfinitev7.steps.stFinScCreationHSP);
			return;
		}
	});
}});



/** Description */
ActivInfinitev7.step({ stAdhesionIndiv_Remplissage_IBAN: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.assurePrincipal.NUM_SEQ_CT + ' Etape - stAdhesionIndiv_Remplissage_IBAN');
	// Clef IBAN
	var cleIBAN = data.contratCourantAdhesion.dataLocale.assurePrincipal.CLE_IBAN;
	cleIBAN = cleIBAN.substr(2,2);
	ActivInfinitev7.pAdhIndivIntervtPrin.oCleIBAN.setFocus();
	ActivInfinitev7.pAdhIndivIntervtPrin.oCleIBAN.set(cleIBAN);
	// Identificateur National
	
	/// Bic
	var bic = data.contratCourantAdhesion.dataLocale.assurePrincipal.BIC;
	ActivInfinitev7.pAdhIndivIntervtPrin.oNumBic.setFocus();
	ActivInfinitev7.pAdhIndivIntervtPrin.oNumBic.set(bic);
	sc.endStep();
	return;
}});

/** Description */
ActivInfinitev7.step({ stAdhesionIndiv_Remplissage_IBAN_PAYS: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.assurePrincipal.NUM_SEQ_CT + ' Etape - stAdhesionIndiv_Remplissage_IBAN_PAYS');
	var codeIBAN = data.contratCourantAdhesion.dataLocale.assurePrincipal.CLE_IBAN;
	codeIBAN = codeIBAN.substr(0,2);
	ActivInfinitev7.pAdhIndivIntervtPrin.oPaysISO.setFocus();
	ActivInfinitev7.pAdhIndivIntervtPrin.oPaysISO.set('');
	ActivInfinitev7.pAdhIndivIntervtPrin.oPaysISO.keyStroke(codeIBAN);
	var countPoll=0;	
	ctx.polling({	
		delay: 300,	
		nbMax: 10,		
		test: function(index) { 		
			countPoll++;
			ctx.log('countP :'+countPoll);
			return ActivInfinitev7.pAdhIndivIntervtPrin.oSelectPaysISO.count()>0;
		},
		done: function() { 
			/// on cherche parmis les resultats du tableau celui qui correspond à l'offre
			var nbPays = ActivInfinitev7.pAdhIndivIntervtPrin.oSelectPaysISO.count();
			if(nbPays==1){
				//Il n'y a qu'un seul pays
				ActivInfinitev7.pAdhIndivIntervtPrin.oSelectPaysISO.i(0).click();
				sc.endStep();
				return;
			}
			else{
				/// il y a plusieurs pays possibles
				ctx.traceF.errorTxt(' Confusion sur le pays ISO , on ne traite pas le dossier ');
				data.contratCourantAdhesion.notes.commentaireContrat = 'Revoir centre: Confusion sur le Pays ISO ';
				data.contratCourantAdhesion.notes.statutsContrat = ctx.excelF.constantes.statuts.Echec;
				data.contratCourantAdhesion.statuts.finCreation = true;
				sc.endStep(ActivInfinitev7.steps.stFinScCreationHSP);
				return;
			}
		},
		fail: function() { 
			ctx.traceF.errorTxt(' Erreur lors du remplissage de l IBAN');
			data.contratCourantAdhesion.notes.commentaireContrat = 'Revoir centre:  Erreur lors du remplissage de l IBAN : Pays ISO  ';
			data.contratCourantAdhesion.notes.statutsContrat = ctx.excelF.constantes.statuts.Echec;
			data.contratCourantAdhesion.statuts.finCreation = true;
			sc.endStep(ActivInfinitev7.steps.stFinScCreationHSP);
			return;
		}
	});
}});





/** Description */
ActivInfinitev7.step({ stAdhesionIndiv_DonneesMandat: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.assurePrincipal.NUM_SEQ_CT + ' Etape - stAdhesionIndiv_DonneesMandat');
	var dateSign = data.contratCourantAdhesion.dataLocale.assurePrincipal.DATE_SIGN_MANDAT;
	ActivInfinitev7.pAdhIndivIntervtPrin.oDateSignature.setFocus();
	ActivInfinitev7.pAdhIndivIntervtPrin.oDateSignature.set(dateSign);
	ActivInfinitev7.pAdhIndivIntervtPrin.oDateSignature.setFocus(false);
	sc.endStep();
	return;
}});



/** Description */
ActivInfinitev7.step({ stAdhesionIndiv_VerificationDesDonnees: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.assurePrincipal.NUM_SEQ_CT + ' Etape - stAdhesionIndiv_VerificationDesDonnees');
	/// on quitte la page intervenant principal
	
//	ActivInfinitev7.pAdhIndivIntervtPrin.events.LOAD.once(function(ev){
		var countPoll=0;
		ctx.polling({	
			delay: 300,	
			nbMax: 10,		
			test: function(index) { 		
				countPoll++;
				ctx.log('countP :'+countPoll);
				return ActivInfinitev7.pAdhIndivIntervtPrin.btSuivant.exist();
			},
			done: function() { 
				ActivInfinitev7.pAdhIndivIntervtPrin.btSuivant.setFocus();
				ActivInfinitev7.pAdhIndivIntervtPrin.btSuivant.click();
				sc.endStep();
				return;
			},
			fail: function() { 
				 	ctx.traceF.errorTxt(' Blocage à la page : '+ev.pageName + ' Probleme Bouton suivant');
					data.contratCourantAdhesion.notes.commentaireContrat = 'Revoir centre: Blocage à la page : '+ev.pageName + ' click sur bouton suivant impossible';
					data.contratCourantAdhesion.notes.statutsContrat = ctx.excelF.constantes.statuts.Echec;
					data.contratCourantAdhesion.statuts.finCreation = true;
					sc.endStep(ActivInfinitev7.steps.stFinScCreationHSP);
					return;
			}
		});
//	});
	
}});



/** Description */
ActivInfinitev7.step({ stAdhesionIndiv_GestionsDesErreurs: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.assurePrincipal.NUM_SEQ_CT + ' Etape - stAdhesionIndiv_GestionsDesErreurs');
	// on verifie qu'il n'y a pas d'erreurs, si oui on continue sinon on traite l'erreur
	
	
	ActivInfinitev7.pAdhIndivIntervtPrin.wait(function () {
		var countPoll=0;
		ctx.polling({	
			delay: 300,	
			nbMax: 10,		
			test: function(index) { 		
				countPoll++;
				ctx.log('countP :'+countPoll);
				return ActivInfinitev7.pAdhIndivIntervtPrin.oPopUpTitre.exist();
			},
			done: function() { 
				var msg = ActivInfinitev7.pAdhIndivIntervtPrin.oPopUpTitre.get().trim();
				ActivInfinitev7.pAdhIndivIntervtPrin.btClosePopUp.click();
				 if(msg.indexOf('RIB')!=-1){
				 	// le blocage concerne le RIB
					// On modifie la prestation en mode cheque annuel
					sc.endStep(ActivInfinitev7.steps.stAdhesionIndiv_RIB_Erreur_Modif_Cheque_ParDefaut_setModeReglement);
					return ;
				 }
				 else{
				 	ctx.traceF.errorTxt(' Blocage PopUP à la page : '+ev.pageName +' Message  : '+ msg);
					data.contratCourantAdhesion.notes.commentaireContrat = 'Revoir centre: Blocage PopUP à la page : '+ev.pageName +' Message  : '+ msg ;
					data.contratCourantAdhesion.notes.statutsContrat = ctx.excelF.constantes.statuts.Echec;
					data.contratCourantAdhesion.statuts.finCreation = true;
					sc.endStep(ActivInfinitev7.steps.stFinScCreationHSP);
					return;
				 }
			},
			fail: function() { 
				if(ActivInfinitev7.pAdhIndivIntervtPrin.btSuivant.exist()){
				 	ActivInfinitev7.pAdhIndivIntervtPrin.btSuivant.click();
					sc.endStep(ActivInfinitev7.steps.stAdhesionIndiv_GestionsDesErreurs);
					return;
				}
				else{
				 	ctx.traceF.errorTxt(' Blocage à la page : '+ev.pageName + ' Probleme Bouton suivant');
					data.contratCourantAdhesion.notes.commentaireContrat = 'Revoir centre: Blocage à la page : '+ev.pageName + ' click sur bouton suivant impossible';
					data.contratCourantAdhesion.notes.statutsContrat = ctx.excelF.constantes.statuts.Echec;
					data.contratCourantAdhesion.statuts.finCreation = true;
					sc.endStep(ActivInfinitev7.steps.stFinScCreationHSP);
					return;
				}
			}
		});
	});
	
	ActivInfinitev7.pAdhIndivIdentAssures.wait(function () {
	 //Il n'y a pas d'erreur, on passe à la page Identification des assurés
		ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.assurePrincipal.NUM_SEQ_CT + '--> Page ' + ev.pageName);
		sc.endStep(ActivInfinitev7.steps.stPageIdentificationAssures);
		return ;
	});

}});


ActivInfinitev7.step({ stAdhesionIndiv_RIB_Erreur_Modif_Cheque_ParDefaut_setModeReglement: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.assurePrincipal.NUM_SEQ_CT + ' Etape - stAdhesionIndiv_RIB_Erreur_Modif_Cheque_ParDefaut_setModeReglement');
	var countPoll=0;
	ctx.polling({
			delay: 300,
			nbMax: 10,
			test: function(index) { 
				countPoll++;
				ctx.log('countP :'+countPoll);
				return ActivInfinitev7.pAdhIndivIntervtPrin.oModeReglement.exist(); 
			},
			done: function() { 
				ActivInfinitev7.pAdhIndivIntervtPrin.oModeReglement.set('1');
				sc.endStep(ActivInfinitev7.steps.stAdhesionIndiv_RIB_Erreur_Modif_Cheque_ParDefaut);
				return;
				
			},
			fail: function() { 
				ctx.traceF.errorTxt(' Erreur lors du chgt du mode de reglement : erreur Serveur Mode Reglement n\'existe pas ');
				data.contratCourantAdhesion.notes.commentaireContrat = 'Revoir centre:   Erreur lors du chgt du mode de reglement : erreur Serveur Mode Reglement n\'existe pas ';
				data.contratCourantAdhesion.notes.statutsContrat = ctx.excelF.constantes.statuts.Echec;
				data.contratCourantAdhesion.statuts.finCreation = true;
				sc.endStep(ActivInfinitev7.steps.stFinScCreationHSP);
				return;
			}
		});
}});

/** Description */
ActivInfinitev7.step({ stAdhesionIndiv_RIB_Erreur_Modif_Cheque_ParDefaut: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.assurePrincipal.NUM_SEQ_CT + ' Etape - stAdhesionIndiv_RIB_Erreur_Modif_Cheque_ParDefaut');
	ActivInfinitev7.pAdhIndivIntervtPrin.wait(function(ev){
		var countPoll=0;
		ctx.wait(function(ev) {
			ctx.polling({
				delay: 300,
				nbMax: 10,
				test: function(index) { 
					countPoll++;
					ctx.log('countP :'+countPoll);
					var EMP = ActivInfinitev7.pAdhIndivIntervtPrin.oModePaiement.exist();
					var EFR = ActivInfinitev7.pAdhIndivIntervtPrin.oFrequenceReglement.exist();
					var EFA = ActivInfinitev7.pAdhIndivIntervtPrin.oFrequenceAvisEcheance.exist();
					var existance = EMP * EFR * EFA ;
					return existance; 
				},
				done: function() { 
					ActivInfinitev7.pAdhIndivIntervtPrin.oModePaiement.setFocus();
					ActivInfinitev7.pAdhIndivIntervtPrin.oModePaiement.set('C');
					ActivInfinitev7.pAdhIndivIntervtPrin.oFrequenceReglement.setFocus();
					ActivInfinitev7.pAdhIndivIntervtPrin.oFrequenceReglement.set('TR');
					ActivInfinitev7.pAdhIndivIntervtPrin.oFrequenceAvisEcheance.setFocus();
					ActivInfinitev7.pAdhIndivIntervtPrin.oFrequenceAvisEcheance.set('A');
					data.contratCourantAdhesion.notes.commentaireContrat = ' RIB MANQUANT :ENVOI COURRIER';
					sc.endStep(ActivInfinitev7.steps.stAdhesionIndiv_GestionsDesErreurs);
					return;
					
				},
				fail: function() { 
					ctx.traceF.errorTxt(' Erreur lors du remplissage des coordonnées bancaires : erreur Serveur Mode Paiement n\'existe pas ');
					data.contratCourantAdhesion.notes.commentaireContrat = 'Revoir centre:  Erreur lors du remplissage des coordonnées bancaire : erreur Serveur Mode Paiement  n\'existe pas ';
					data.contratCourantAdhesion.notes.statutsContrat = ctx.excelF.constantes.statuts.Echec;
					data.contratCourantAdhesion.statuts.finCreation = true;
					sc.endStep(ActivInfinitev7.steps.stFinScCreationHSP);
					return;
				}
			});
		}, 1000);
		

	});
}});








/** Description */
ActivInfinitev7.step({ stPageIdentificationAssures: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.assurePrincipal.NUM_SEQ_CT + ' Etape - stPageIdentificationAssures');
	sc.endStep();
	return;
}});



ActivInfinitev7.step({ stPageIdentificationAssures_IdentifiantAdherent: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.assurePrincipal.NUM_SEQ_CT + ' Etape - stPageIdentificationAssures_IdentifiantAdherent');
	///
	var typeAssureGRC = data.contratCourantAdhesion.dataLocale.personnePhysique.TYPE_ASSURE;
	
	var tab = { GRC :'', Infinite:''};
	tab = ctx.formF.typeAssure ;
	var resultat='';
	for ( var i in tab ){
		if(tab[i].GRC != undefined){
			if( typeAssureGRC == tab[i].GRC){
				resultat=tab[i].Infinite;
			}
		}
		else{
			ctx.traceF.errorTxt(' Le code ' + typeAssureGRC + ' n\'existe pas pour ce tableau');
		}
	}
	if(resultat == ''){
		ctx.traceF.errorTxt('Pas de correspondance trouvée pour ' + typeAssureGRC);
	}
	
	ctx.log(' ->Civilité : '+ resultat);
	
	var typeAssure = resultat;
	///
	
	
	var civilite = data.contratCourantAdhesion.dataLocale.personnePhysique.CONTACT_CIVILITE;
	var nomDeNaissance = data.contratCourantAdhesion.dataLocale.personnePhysique.NOM_JEUNE_FILLE;
	var sexe = data.contratCourantAdhesion.dataLocale.personnePhysique.CONTACT_SEX;
	var dateNaissance = data.contratCourantAdhesion.dataLocale.personnePhysique.BRTH_DAY_GREG;
	var situFamille =  data.contratCourantAdhesion.dataLocale.personnePhysique.SITUATION_FAMILLE;
	ctx.log('Identification Adhérent');
	ctx.log(' Nom e de naissance : '+nomDeNaissance+'  Sexe : '+sexe+' Date de naissance : '+dateNaissance+' situation Famille : '+situFamille);
	var countPoll=0;
	ctx.polling({
		delay: 300,
		nbMax: 10,
		test: function(index) { 
			countPoll++;
			ctx.log('countP :'+countPoll);
			var ETA = ActivInfinitev7.pAdhIndivIdentAssures.oTypeAssure.exist();
			var EC = ActivInfinitev7.pAdhIndivIdentAssures.oCivilite.exist();
			var ENJF = ActivInfinitev7.pAdhIndivIdentAssures.oNomJF.exist();
			var ES = ActivInfinitev7.pAdhIndivIdentAssures.oSexe.exist();
			var EDN = ActivInfinitev7.pAdhIndivIdentAssures.oDateNaissance.exist();
			var ESF = ActivInfinitev7.pAdhIndivIdentAssures.oSituationFamille.exist();
			var existance = ETA * EC * ENJF * ES * EDN * ESF ;
			return existance; 
		},
		done: function() { 
			ActivInfinitev7.pAdhIndivIdentAssures.oTypeAssure.setFocus();
			ActivInfinitev7.pAdhIndivIdentAssures.oTypeAssure.set(typeAssure);
			ActivInfinitev7.pAdhIndivIdentAssures.oCivilite.setFocus();
			ActivInfinitev7.pAdhIndivIdentAssures.oCivilite.set(civilite);
			ActivInfinitev7.pAdhIndivIdentAssures.oNomJF.setFocus();
			ActivInfinitev7.pAdhIndivIdentAssures.oNomJF.keyStroke(nomDeNaissance);
			ActivInfinitev7.pAdhIndivIdentAssures.oSexe.setFocus();
			ActivInfinitev7.pAdhIndivIdentAssures.oSexe.set(sexe);
			ActivInfinitev7.pAdhIndivIdentAssures.oDateNaissance.setFocus();
			ActivInfinitev7.pAdhIndivIdentAssures.oDateNaissance.set(dateNaissance);	
			ActivInfinitev7.pAdhIndivIdentAssures.oSituationFamille.setFocus();
			ActivInfinitev7.pAdhIndivIdentAssures.oSituationFamille.set(situFamille);
			sc.endStep();
			return;
			
		},
		fail: function() { 
			ctx.traceF.errorTxt(' Erreur lors du remplissage de l\'identification Adhérent : erreur Serveur ');
			data.contratCourantAdhesion.notes.commentaireContrat += 'Revoir centre:  Erreur lors du remplissage de l\'identification Adhérent : erreur Serveur  ';
			data.contratCourantAdhesion.notes.statutsContrat = ctx.excelF.constantes.statuts.Echec;
			data.contratCourantAdhesion.statuts.finCreation = true;
			sc.endStep(ActivInfinitev7.steps.stFinScCreationHSP);
			return;
		}
	});
}});




ActivInfinitev7.step({ stPageIdentificationAssures_InformationRO: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.assurePrincipal.NUM_SEQ_CT + ' Etape - stPageIdentificationAssures_InformationRO');
	/// Assure RO
	var conditionAssureRO = data.contratCourantAdhesion.dataLocale.personnePhysique.ASSURE_RO; /// a valider : on coche par défaut Assurer RO
	if(conditionAssureRO == 'O'){
		ActivInfinitev7.pAdhIndivIdentAssures.oTypAssRO.click();
	}
	else{
		ActivInfinitev7.pAdhIndivIdentAssures.oTypAssAyantDroit.click();
	}
	
	/// Numero RO
	var numRO = data.contratCourantAdhesion.dataLocale.personnePhysique.NUM_RO;
	ActivInfinitev7.pAdhIndivIdentAssures.oNumRO.setFocus();
	ActivInfinitev7.pAdhIndivIdentAssures.oNumRO.set(numRO);
	/// Clef RO
	var cleRO = data.contratCourantAdhesion.dataLocale.personnePhysique.CLE_NUM_RO;
	ActivInfinitev7.pAdhIndivIdentAssures.oCleRO.setFocus();
	ActivInfinitev7.pAdhIndivIdentAssures.oCleRO.set(cleRO);
	
	/// caisse RO 
	var caisseRO = data.contratCourantAdhesion.dataLocale.personnePhysique.CAISSE_RO;
	ActivInfinitev7.pAdhIndivIdentAssures.oCaisseRO.setFocus();
	ActivInfinitev7.pAdhIndivIdentAssures.oCaisseRO.set(caisseRO);
	
	/// Centre RO
	var centrePaiement = data.contratCourantAdhesion.dataLocale.personnePhysique.CENTRE_PAIEMENT;
	ActivInfinitev7.pAdhIndivIdentAssures.oCentreRO.setFocus();
	ActivInfinitev7.pAdhIndivIdentAssures.oCentreRO.set(centrePaiement);
	
	// Teletransmission 
	var teletrans = data.contratCourantAdhesion.dataLocale.personnePhysique.IND_TLT;
	/// verifier si la case est cochée si teletrans O il faut la cocher sinon la décocher si necessaire
	
	
	sc.endStep();
	return;
}});

ActivInfinitev7.step({ stPageIdentificationAssures_InformationRO_SelectionRegime: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.assurePrincipal.NUM_SEQ_CT + ' Etape - stPageIdentificationAssures_InformationRO_SelectionRegime');
	
	/// Organisme RO
	var organismeRO = data.contratCourantAdhesion.dataLocale.personnePhysique.CODE_GR;
	ActivInfinitev7.pAdhIndivIdentAssures.oRegimeRO.setFocus();
	ActivInfinitev7.pAdhIndivIdentAssures.oRegimeRO.keyStroke(organismeRO);
	var countPoll=0;
	ctx.polling({	
		delay: 300,	
		nbMax: 10,		
		test: function(index) { 		
			countPoll++;
			ctx.log('countP :'+countPoll);
			return ActivInfinitev7.pAdhIndivIdentAssures.oSelectRegime.count()>0;
		},
		done: function() { 
			/// on cherche parmis les resultats du tableau celui qui correspond à l'offre
			var nbRegime = ActivInfinitev7.pAdhIndivIdentAssures.oSelectRegime.count();
			if(nbRegime==1){
				//Il n'y a qu'un seul pays
				ActivInfinitev7.pAdhIndivIdentAssures.oSelectRegime.i(0).click();
				sc.endStep();
				return;
			}
			else{
				/// il y a plusieurs  regimes possibles
				ctx.traceF.errorTxt(' Confusion sur le régime , on ne traite pas le dossier ');
				data.contratCourantAdhesion.notes.commentaireContrat = 'Revoir centre: Confusion sur le régime ';
				data.contratCourantAdhesion.notes.statutsContrat = ctx.excelF.constantes.statuts.Echec;
				data.contratCourantAdhesion.statuts.finCreation = true;
				sc.endStep(ActivInfinitev7.steps.stFinScCreationHSP);
				return;
			}
		},
		fail: function() { 
			ctx.traceF.errorTxt(' Erreur lors du remplissage de l organisme RO');
			data.contratCourantAdhesion.notes.commentaireContrat = 'Revoir centre:  Erreur lors du remplissage de l organisme RO  ';
			data.contratCourantAdhesion.notes.statutsContrat = ctx.excelF.constantes.statuts.Echec;
			data.contratCourantAdhesion.statuts.finCreation = true;
			sc.endStep(ActivInfinitev7.steps.stFinScCreationHSP);
			return;
		}
	});
}});


ActivInfinitev7.step({ stPageIdentificationAssures_Validation: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.assurePrincipal.NUM_SEQ_CT + ' Etape - stPageIdentificationAssures_Validation');
	ActivInfinitev7.pAdhIndivIdentAssures.btValider.click();
	ActivInfinitev7.pAdhIndivIdentAssures.wait(function(ev){
		sc.endStep(ActivInfinitev7.steps.stVersLaPageIdentificationSouscripteur);
			return ;
	});
}});


/** Description */
ActivInfinitev7.step({ stPageIdentificationAssures_Erreur_RO: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.assurePrincipal.NUM_SEQ_CT + ' Etape - stPageIdentificationAssures_Erreur_RO');
	// Ayant droit

	
	// Erreur sur le numero RO, On désactive la télétransmission
	ActivInfinitev7.pAdhIndivIdentAssures.oTeletrans.click();
	/// Numero RO
	ActivInfinitev7.pAdhIndivIdentAssures.oNumRO.setFocus();
	ActivInfinitev7.pAdhIndivIdentAssures.oNumRO.set('0000000000000');
	/// Clef RO
	ActivInfinitev7.pAdhIndivIdentAssures.oCleRO.setFocus();
	ActivInfinitev7.pAdhIndivIdentAssures.oCleRO.set('97');
	
	/// caisse RO 
	ActivInfinitev7.pAdhIndivIdentAssures.oCaisseRO.setFocus();
	ActivInfinitev7.pAdhIndivIdentAssures.oCaisseRO.set('');
	
	/// Centre RO
	ActivInfinitev7.pAdhIndivIdentAssures.oCentreRO.setFocus();
	ActivInfinitev7.pAdhIndivIdentAssures.oCentreRO.set('');
	ctx.traceF.errorTxt(' Erreur sur le RO --> Teletransmission Désactivée');
	data.contratCourantAdhesion.notes.commentaireContrat += ' Erreur sur le RO --> Teletransmission Désactivée + numero RO fictif';
	sc.endStep(ActivInfinitev7.steps.stPageIdentificationAssures_Validation);
	return;
}});


/** Description */
ActivInfinitev7.step({ stVersLaPageIdentificationSouscripteur: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.assurePrincipal.NUM_SEQ_CT + ' Etape - stVersLaPageIdentificationSouscripteur');
	var countPoll=0;
	ctx.wait(function(ev) {
		ctx.polling({	
			delay: 300,	
			nbMax: 10,		
			test: function(index) { 		
				countPoll++;
				ctx.log('countP :'+countPoll);
				return ActivInfinitev7.pAdhIndivIdentAssures.oPageIdentiSouscripteur.exist();
			},
			done: function() { 
				/// on cherche parmis les resultats du tableau celui qui correspond à l'offre
				ActivInfinitev7.pAdhIndivIdentAssures.oPageIdentiSouscripteur.setFocus();
				ActivInfinitev7.pAdhIndivIdentAssures.oPageIdentiSouscripteur.click();
				sc.endStep();
				return;
				
			},
			fail: function() { 
				ctx.traceF.errorTxt(' Erreur lors du click sur la page d\'identification du souscripteur');
				data.contratCourantAdhesion.notes.commentaireContrat = 'Erreur lors du click sur la page d\'identification du souscripteur ';
				data.contratCourantAdhesion.notes.statutsContrat = ctx.excelF.constantes.statuts.Echec;
				data.contratCourantAdhesion.statuts.finCreation = true;
				sc.endStep(ActivInfinitev7.steps.stFinScCreationHSP);
				return;
			}
		});	
	}, 1000);

}});


/** Description */
ActivInfinitev7.step({ stVersLaPageIdentificationSouscripteur_ROValide: function(ev, sc, st) {
	var data = sc.data;
		ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.assurePrincipal.NUM_SEQ_CT + ' Etape - stVersLaPageIdentificationSouscripteur_ROValide');
	ActivInfinitev7.pAdhIndivIdentAssures.wait(function(ev){
		var countPoll=0;
		ctx.polling({	
			delay: 300,	
			nbMax: 10,		
			test: function(index) { 		
				countPoll++;
				ctx.log('countP :'+countPoll);
				return ActivInfinitev7.pAdhIndivIdentAssures.oTitrePopUp.exist();
			},
			done: function() { 
				var msg = ActivInfinitev7.pAdhIndivIdentAssures.oTitrePopUp.get().trim();
				ActivInfinitev7.pAdhIndivIdentAssures.btClosePopUp2.click();
				if(msg.indexOf('RO')!=-1){
				 	// le blocage concerne le RO
					// On modifie la prestation en mode cheque annuel
					sc.endStep(ActivInfinitev7.steps.stPageIdentificationAssures_Erreur_RO);
					return ;
				 }
			},
			fail: function() { 
				ctx.traceF.errorTxt(' Erreur lors de la validation de l\'idnetification de l\'assure');
				data.contratCourantAdhesion.notes.commentaireContrat = ' Erreur lors de la validation de l\'idnetification de l\'assure';
				data.contratCourantAdhesion.notes.statutsContrat = ctx.excelF.constantes.statuts.Echec;
				data.contratCourantAdhesion.statuts.finCreation = true;
				sc.endStep(ActivInfinitev7.steps.stFinScCreationHSP);
				return;
			}
		});

	});
	
	ActivInfinitev7.pAdhIndivIdentSouscri.wait(function(ev){
		sc.endStep(ActivInfinitev7.steps.stPageIdentificationSouscripteur);
		return;
		
	});
	
	
}});


/** Description */
ActivInfinitev7.step({ stPageIdentificationSouscripteur: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.assurePrincipal.NUM_SEQ_CT + ' Etape - stPageIdentificationSouscripteur');
	/// On renseigne les infos disponibles

	
	var com = {
		nature : '',
		type : '',
		valeure : ''
	}; 
	
	//initialisations
	data.contratCourantAdhesion.dataLocale.variables.nbCom = 0;
	data.contratCourantAdhesion.dataLocale.variables.indexCom = 0;
	
	ctx.log('nbCom :'+data.contratCourantAdhesion.dataLocale.variables.nbCom+' , indexCom : '+data.contratCourantAdhesion.dataLocale.variables.indexCom);
	var telDom = {
		nature : '',
		type : '',
		valeure : ''
	};
	telDom.valeure = data.contratCourantAdhesion.dataLocale.assurePrincipal.TEL_DOM;
	var indicatif = telDom.valeure.substr(0,2);
	if((indicatif == '06') | (indicatif == '07')){
		telDom.type = ctx.formF.typeCommunication.telephonePortable.type;
	}
	else{
		telDom.type = ctx.formF.typeCommunication.telephoneDomicile.type;
	}
	
	telDom.nature = ctx.formF.typeCommunication.telephoneDomicile.nature;
	var val = data.contratCourantAdhesion.dataLocale.assurePrincipal.TEL_DOM;
	if(telDom.valeure != ''){
		data.contratCourantAdhesion.dataLocale.variables.listCom[data.contratCourantAdhesion.dataLocale.variables.nbCom]=telDom;
		data.contratCourantAdhesion.dataLocale.variables.nbCom += 1;
	}
	var telBur = {
		nature : '',
		type : '',
		valeure : ''
	};
	telBur.nature = ctx.formF.typeCommunication.telephoneBureau.nature;
	telBur.type = ctx.formF.typeCommunication.telephoneBureau.type;
	telBur.valeure = data.contratCourantAdhesion.dataLocale.assurePrincipal.TEL_PRO;
	if(telBur.valeure != ''){
		data.contratCourantAdhesion.dataLocale.variables.listCom[data.contratCourantAdhesion.dataLocale.variables.nbCom]=telBur;
		data.contratCourantAdhesion.dataLocale.variables.nbCom+=1;
	}
	var telPor = {
		nature : '',
		type : '',
		valeure : ''
	};
	telPor.nature = ctx.formF.typeCommunication.telephonePortable.nature;
	telPor.type = ctx.formF.typeCommunication.telephonePortable.type;
	telPor.valeure = data.contratCourantAdhesion.dataLocale.assurePrincipal.TEL_POR;
	if(telPor.valeure != ''){
		data.contratCourantAdhesion.dataLocale.variables.listCom[data.contratCourantAdhesion.dataLocale.variables.nbCom]=telPor;
		data.contratCourantAdhesion.dataLocale.variables.nbCom+=1;
	}	
		
	var adrMail = {
		nature : '',
		type : '',
		valeure : ''
	};
	adrMail.nature = ctx.formF.typeCommunication.adresseMail.nature;
	adrMail.type = ctx.formF.typeCommunication.adresseMail.type;
	if(data.contratCourantAdhesion.dataLocale.assurePrincipal.ADDR_MAIL == undefined ){
		adrMail.valeure = '';
	}
	else{
		adrMail.valeure = data.contratCourantAdhesion.dataLocale.assurePrincipal.ADDR_MAIL;
	}
	if(adrMail.valeure != ''){
		data.contratCourantAdhesion.dataLocale.variables.listCom[data.contratCourantAdhesion.dataLocale.variables.nbCom]=adrMail;
		data.contratCourantAdhesion.dataLocale.variables.nbCom+=1;
	}		
	
	var fax = {
		nature : '',
		type : '',
		valeure : ''
	};
	fax.nature = ctx.formF.typeCommunication.adresseMail.nature;
	fax.type = ctx.formF.typeCommunication.adresseMail.type;
	if(data.contratCourantAdhesion.dataLocale.assurePrincipal.FAX == undefined ){
		fax.valeure = '';
	}
	else{
		fax.valeure = data.contratCourantAdhesion.dataLocale.assurePrincipal.FAX;
	}
	if(fax.valeure != ''){
		data.contratCourantAdhesion.dataLocale.variables.listCom[data.contratCourantAdhesion.dataLocale.variables.nbCom]=fax;
		data.contratCourantAdhesion.dataLocale.variables.nbCom +=1;
	}		
	
	ctx.log(' nbCom : '+ data.contratCourantAdhesion.dataLocale.variables.nbCom);
	sc.endStep(ActivInfinitev7.steps.stPageIdentificationSouscripteur_AjoutCommunication_Boucle);
	return;
}});



/** Description */
ActivInfinitev7.step({ stPageIdentificationSouscripteur_AjoutCommunication_Boucle: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.assurePrincipal.NUM_SEQ_CT + ' Etape - stPageIdentificationSouscripteur_AjoutCommunication');
	
	if(data.contratCourantAdhesion.dataLocale.variables.indexCom<data.contratCourantAdhesion.dataLocale.variables.nbCom){
		sc.endStep(ActivInfinitev7.steps.stPageIdentificationSouscripteur_AjoutCommunication);
		return;
	}else{
		ActivInfinitev7.pAdhIndivIdentSouscri.btSuivant.click();
		ActivInfinitev7.pAdhIndivIdentAssures.wait(function(ev){
			data.contratCourantAdhesion.dataLocale.variables.indexBenef = 1; // on commence au 1er benef ( 0 étant l'assure principal)
			sc.endStep(ActivInfinitev7.steps.stPageIdentificationAssures_AjoutBeneficiaire_Boucle);
			return;
		});
	}
}});

/** Description */
ActivInfinitev7.step({ stPageIdentificationSouscripteur_AjoutCommunication: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.assurePrincipal.NUM_SEQ_CT + ' Etape - stPageIdentificationSouscripteur_AjoutCommunication');
	ActivInfinitev7.pAdhIndivIdentSouscri.btNouveau.click();
	ActivInfinitev7.pAdhIndivIdentSouscri.events.LOAD.once(function(ev){
		var index = data.contratCourantAdhesion.dataLocale.variables.indexCom;
		var nat = data.contratCourantAdhesion.dataLocale.variables.listCom[index].nature;
		var typ = data.contratCourantAdhesion.dataLocale.variables.listCom[index].type;
		var val = data.contratCourantAdhesion.dataLocale.variables.listCom[index].valeure;
		ctx.log('nature : '+nat+' , type : '+typ+' valeure : '+val);
		var countPoll=0;
		ctx.polling({
			delay: 300,
			nbMax: 10,
			test: function(index) { 
				countPoll++;
				ctx.log('countP :'+countPoll);
				var EN = ActivInfinitev7.pAdhIndivIdentSouscri.oSelectNature.count()>0;
				var ET = ActivInfinitev7.pAdhIndivIdentSouscri.oSelectType.count()>0;
				var EV = ActivInfinitev7.pAdhIndivIdentSouscri.oSelectValeur.count()>0;
				var existance = EN * ET * EV;
				return existance; 
			},
			done: function() { 
				ActivInfinitev7.pAdhIndivIdentSouscri.oSelectNature.i(index).setFocus();
				ActivInfinitev7.pAdhIndivIdentSouscri.oSelectNature.i(index).set(nat);
				ActivInfinitev7.pAdhIndivIdentSouscri.oSelectType.i(index).setFocus();
				ActivInfinitev7.pAdhIndivIdentSouscri.oSelectType.i(index).set(typ);
				ActivInfinitev7.pAdhIndivIdentSouscri.oSelectValeur.i(index).setFocus();
				ActivInfinitev7.pAdhIndivIdentSouscri.oSelectValeur.i(index).set(val);
				data.contratCourantAdhesion.dataLocale.variables.indexCom += 1;
				sc.endStep(ActivInfinitev7.steps.stPageIdentificationSouscripteur_AjoutCommunication_Boucle);
				return;
				
			},
			fail: function() { 
				ctx.traceF.errorTxt(' Erreur lors du remplissage des communications adherents : erreur Serveur ');
				data.contratCourantAdhesion.notes.commentaireContrat += 'Erreur lors du remplissage des communications adherents : erreur Serveur ';
				data.contratCourantAdhesion.notes.statutsContrat = ctx.excelF.constantes.statuts.Echec;
				data.contratCourantAdhesion.statuts.finCreation = true;
				sc.endStep(ActivInfinitev7.steps.stFinScCreationHSP);
				return;
			}
		});
	});
}});



/** Description */
ActivInfinitev7.step({ stPageIdentificationAssures_AjoutBeneficiaire_Boucle: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.assurePrincipal.NUM_SEQ_CT + ' Etape - stPageIdentificationAssures_AjoutBeneficiaire_Boucle');
	ctx.log("test");
	var AdhesionObj = new confFileAdhesionClass();
	var contratBeneficiaire = AdhesionObj.ADHESION.excel.indexColonne;
	contratBeneficiaire = data.contratCourantAdhesion.dataLocale.tabPersonnesPhysiques[data.contratCourantAdhesion.dataLocale.variables.indexBenef] ;
	if(contratBeneficiaire!= undefined){
		data.contratCourantAdhesion.dataLocale.personnePhysique=contratBeneficiaire;
		data.contratCourantAdhesion.dataLocale.variables.indexBenef++;
		ActivInfinitev7.pAdhIndivIdentAssures.btNouveau.click();
		sc.endStep(ActivInfinitev7.steps.stScenarioAjoutBeneficiaire);
		return;
	}
	else{
		/// Il n'y a plus de beneficiaire, on clique sur Next
		var countPoll=0;
		ctx.polling({	
			delay: 300,	
			nbMax: 10,		
			test: function(index) { 		
				countPoll++;
				ctx.log('countP :'+countPoll);
				return ActivInfinitev7.pAdhIndivIdentAssures.btSuivant.exist();
			},
			done: function() { 
				ActivInfinitev7.pAdhIndivIdentAssures.btSuivant.setFocus();
				ActivInfinitev7.pAdhIndivIdentAssures.btSuivant.click();
				sc.endStep(ActivInfinitev7.steps.stAdhesionIndividuelle_Modification_RIB_Prestation_condition);
				return;
			},
			fail: function() { 
				 	ctx.traceF.errorTxt(' Blocage à la page : '+ev.pageName + ' Probleme Bouton suivant');
					data.contratCourantAdhesion.notes.commentaireContrat = 'Revoir centre: Blocage à la page : '+ev.pageName + ' click sur bouton suivant impossible';
					data.contratCourantAdhesion.notes.statutsContrat = ctx.excelF.constantes.statuts.Echec;
					data.contratCourantAdhesion.statuts.finCreation = true;
					sc.endStep(ActivInfinitev7.steps.stFinScCreationHSP);
					return;
			}
		});
	}
}});

ActivInfinitev7.step({ stPageIdentificationAssures_AjoutBeneficiaire: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.assurePrincipal.NUM_SEQ_CT + ' Etape - stPageIdentificationAssures_AjoutBeneficiaire');
	ActivInfinitev7.pAdhIndivIdentAssures.wait(function(ev){
		ActivInfinitev7.pAdhIndivIdentAssures.btNouveau.click();
		sc.endStep(ActivInfinitev7.steps.stRechercheBenefeciaireAdhesionIndiv);
		return;
		
	});
	
}});





/** Description */
ActivInfinitev7.step({ stRechercheBenefeciaireAdhesionIndiv: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.assurePrincipal.NUM_SEQ_CT + ' Etape - stRechercheBenefeciaireAdhesionIndiv');
//	var nom=data.contratCourantAdhesion.dataLocale.tabPersonnesPhysiques[0].contratAdhesionAttributs.CONTACT_NOM;
	var nom = data.contratCourantAdhesion.dataLocale.personnePhysique.CONTACT_NOM;
	var prenom = data.contratCourantAdhesion.dataLocale.personnePhysique.CONTACT_PRENOM;
	var dateNaissance = data.contratCourantAdhesion.dataLocale.personnePhysique.BRTH_DAY_GREG;
	var numRo = data.contratCourantAdhesion.dataLocale.personnePhysique.NUM_RO;
	ctx.log('Données - nom : '+nom+' prenom : '+prenom+' date naissance : '+dateNaissance+' numRo : '+numRo );
	ctx.log('Données - nom : '+nom+' prenom : '+prenom+' date naissance : '+dateNaissance+' numRo : '+numRo );
	ActivInfinitev7.pAdhIndivIdPrinRech.wait(function(ev) {
		var countPoll=0;	
		ctx.polling({	
			delay: 300,	
			nbMax: 10,		
			test: function(index) { 		
				countPoll++;
				ctx.log('countP :'+countPoll);
				return (ActivInfinitev7.pAdhIndivIdPrinRech.oNom.exist() && ActivInfinitev7.pAdhIndivIdPrinRech.btRechercher.exist());
			},
			done: function() { 
				ActivInfinitev7.pAdhIndivIdPrinRech.oNom.setFocus();
				ActivInfinitev7.pAdhIndivIdPrinRech.oNom.set(nom);
				ActivInfinitev7.pAdhIndivIdPrinRech.oPrenom.setFocus();
				ActivInfinitev7.pAdhIndivIdPrinRech.oPrenom.set(prenom);
				ActivInfinitev7.pAdhIndivIdPrinRech.oDateNaissance.setFocus();
				ActivInfinitev7.pAdhIndivIdPrinRech.oDateNaissance.set(dateNaissance);
				ActivInfinitev7.pAdhIndivIdPrinRech.oNumeroRo.setFocus();
				ActivInfinitev7.pAdhIndivIdPrinRech.oNumeroRo.set(numRo);
				ActivInfinitev7.pAdhIndivIdPrinRech.btRechercher.click();
				sc.endStep(ActivInfinitev7.steps.stResultatRechercheBenefeciaireAdhesionIndiv);
				return;	
			},
			fail: function() { 
				ctx.traceF.errorTxt(' Rercherche Personne Impossible : Element oNom introuvable ');
				data.contratCourantAdhesion.notes.commentaireContrat = 'Error Rercherche Personne Impossible ';
				data.contratCourantAdhesion.notes.statutsContrat = ctx.excelF.constantes.statuts.Echec;
				sc.endStep(ActivInfinitev7.steps.stFinScCreationHSP);
				return;
			}
		});
		

	});
}});


/** Description */
ActivInfinitev7.step({ stResultatRechercheBenefeciaireAdhesionIndiv: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.assurePrincipal.NUM_SEQ_CT + ' Etape - stResultatRechercheBenefeciaireAdhesionIndiv');
	ActivInfinitev7.pAdhIndivIdPrinRechResu.wait(function(ev){
		if(ActivInfinitev7.pAdhIndivIdPrinRechResu.oAucunePersonne){
			var countPoll=0;	
			ctx.polling({	
				delay: 300,	
				nbMax: 10,		
				test: function(index) { 		
					countPoll++;
					ctx.log('countP :'+countPoll);
					return ActivInfinitev7.pAdhIndivIdPrinRechResu.btAnnuler.exist();
				},
				done: function() { 
					ActivInfinitev7.pAdhIndivIdPrinRechResu.btAnnuler.click();
					sc.endStep(ActivInfinitev7.steps.stCreationBenefeciaireAdhesionIndiv);
					return;
				},
				fail: function() { 
					ctx.traceF.errorTxt('Error Recherche personne :  btAnnuler n\'existe pas');
					sc.endStep(ActivInfinitev7.steps.stFinScCreationHSP);
					return;
				}
			});
		}
		else{
			var countPoll=0;	
			ctx.polling({	
				delay: 300,	
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
						sc.endStep(ActivInfinitev7.steps.stSelectionBenefeciaireAdhesionIndiv);
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


ActivInfinitev7.step({ stSelectionBenefeciaireAdhesionIndiv: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.assurePrincipal.NUM_SEQ_CT + ' Etape - stSelectionBenefeciaireAdhesionIndiv');
	//on fait un polling pour attendre l'apparation du bouton valider
	var countPoll=0;
	ctx.polling({	
		delay: 300,	
		nbMax: 10,		
		test: function(index) { 		
			countPoll++;
			ctx.log('countP :'+countPoll);
			return ActivInfinitev7.pAdhIndivIdPrinRechResu.btValider.exist();
		},
		done: function() { 
		ActivInfinitev7.pAdhIndivIdPrinRechResu.btValider.click();
			sc.endStep(ActivInfinitev7.steps.stAdhesionIndiv_ModifIdentificationBeneficiaire);
			return;

		},
		fail: function() { 
			ctx.traceF.errorTxt(' Erreur lors de la selection de la PP ');
			sc.endStep(ActivInfinitev7.steps.stFinScCreationHSP);
			return;
		}
	});
}});


/** Description */
ActivInfinitev7.step({ stCreationBenefeciaireAdhesionIndiv: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.assurePrincipal.NUM_SEQ_CT + ' Etape - stCreationBenefeciaireAdhesionIndiv');
	ActivInfinitev7.pAdhIndivIdentAssures.wait(function(ev){
		ctx.log('--> Creation Benefeciaire ');
		
//		sc.endStep(ActivInfinitev7.steps.stRecuperationDesChampsPageIntervenantPrincipal);
			sc.endStep();
		return;
	});
}});



/** Description */
ActivInfinitev7.step({ stAdhesionIndiv_IdentificationBeneficiaire: function(ev, sc, st) {
	var data = sc.data;
	
	sc.endStep();
	return;
}});




/** Description */
ActivInfinitev7.step({ stAdhesionIndiv_ValidationBeneficiaire: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.assurePrincipal.NUM_SEQ_CT + ' Etape - stAdhesionIndiv_ValidationBeneficiaire');
	var countPoll=0;
	ctx.polling({	
		delay: 300,	
		nbMax: 10,		
		test: function(index) { 		
			countPoll++;
			ctx.log('countP :'+countPoll);
			return ActivInfinitev7.pAdhIndivIdentAssures.btValider.exist();
		},
		done: function() { 
			ActivInfinitev7.pAdhIndivIdentAssures.btValider.click();
			sc.endStep();
			return;
		},
		fail: function() { 
			 	ctx.traceF.errorTxt(' Blocage à la page : '+ev.pageName + ' Probleme Bouton valider introuvable');
				data.contratCourantAdhesion.notes.commentaireContrat = ' Revoir Centre : Blocage à la page : '+ev.pageName + ' Probleme Bouton valider introuvable';
				data.contratCourantAdhesion.notes.statutsContrat = ctx.excelF.constantes.statuts.Echec;
				data.contratCourantAdhesion.statuts.finCreation = true;
				sc.endStep(ActivInfinitev7.steps.stFinScCreationHSP);
				return;
	}
});
	
	
	ActivInfinitev7.pAdhIndivIdentAssures.wait(function(ev){
		sc.endStep(ActivInfinitev7.steps.stPageIdentificationAssures_AjoutBeneficiaire_Boucle);
			return ;
	});
}});



ActivInfinitev7.step({ stAdhesionIndiv_ModifIdentificationBeneficiaire: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.assurePrincipal.NUM_SEQ_CT + ' Etape - stAdhesionIndiv_ModifIdentificationBeneficiaire');
	sc.endStep(ActivInfinitev7.steps.stAdhesionIndiv_IdentificationAdherent);
	return;
}});



/** Description */
ActivInfinitev7.step({ stScenarioAjoutBeneficiaire: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape - stScenarioCreation - Lancement du sous-scenario : stScenarioAjoutBeneficiaire');
	// on desactive le TimeOut principal afin que le timeOut execute soit celui du sous-scenario
	st.disableTimeout();	
	var scA = ActivInfinitev7.scenarios.scCreationHSP_AjoutBenef.start(data).onEnd(function(scAB){
		sc.data=scAB.data;
		ctx.traceF.infoTxt(' Fin du sous-scenario - stScenarioAjoutBeneficiaire');
		sc.endStep();
	});
}});




/** Description */
ActivInfinitev7.step({ stAdhesionIndividuelle_Modification_RIB_Prestation_condition: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.assurePrincipal.NUM_SEQ_CT + ' Etape - stAdhesionIndividuelle_Modification_RIB_Prestation_condition');
	
	// on va comparer les RIB prestation et cotisation, si différents on doit modifier le RIB prestation sinon on passe à l'étape suivant
	var RIBPrestation = data.contratCourantAdhesion.dataLocale.assurePrincipal.CODE_BANQUE + data.contratCourantAdhesion.dataLocale.assurePrincipal.CODE_GUICHET + data.contratCourantAdhesion.dataLocale.assurePrincipal.NUM_COMPTE  + data.contratCourantAdhesion.dataLocale.assurePrincipal.CLE_RIB;
	var RIBCotisation = data.contratCourantAdhesion.dataLocale.assurePrincipal.BANQUE_PREST + data.contratCourantAdhesion.dataLocale.assurePrincipal.GUICHE_BANQUE_PREST + data.contratCourantAdhesion.dataLocale.assurePrincipal.COMPTE_BANQUE_PREST  + data.contratCourantAdhesion.dataLocale.assurePrincipal.CLE_RIB_PREST;
	ctx.log('RIB Prestation : '+RIBPrestation+' , RIB Cotisation : '+RIBCotisation);
	if(RIBPrestation == RIBCotisation){
		
		sc.endStep(ActivInfinitev7.steps.stAdhesionIndividuelle_VersLaPageDesProduits);
		return;
	}
	else{
	
	sc.endStep(ActivInfinitev7.steps.stAdhesionIndividuelle_Modification_RIB_Prestation);
	return;
	}
	
}});

/** Description */
ActivInfinitev7.step({ stAdhesionIndividuelle_Modification_RIB_Prestation: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.assurePrincipal.NUM_SEQ_CT + ' Etape - stAdhesionIndividuelle_Modification_RIB_Prestation');
	sc.endStep();
	return;
	
}});



/** Description */
ActivInfinitev7.step({ stAdhesionIndividuelle_VersLaPageDesProduits: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.assurePrincipal.NUM_SEQ_CT + ' Etape - stAdhesionIndividuelle_VersLaPageDesProduits');
	ActivInfinitev7.pAdhIndivProdGaran.wait(function(ev){
		if(ActivInfinitev7.pAdhIndivProdGaran.btContinuer.exist()){
			ActivInfinitev7.pAdhIndivProdGaran.btContinuer.click();

		}
		data.contratCourantAdhesion.dataLocale.variables.indexBenef = 0; 
		sc.endStep();
		return;
	});

}});



/** Description */
ActivInfinitev7.step({ stAdhesionIndividuelle_AjoutProduits_Boucle_Beneficiaire: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.assurePrincipal.NUM_SEQ_CT + ' Etape - stAdhesionIndividuelle_AjoutProduits_Boucle_Beneficiaire');
	
	var indexB = data.contratCourantAdhesion.dataLocale.variables.indexBenef;
	var contratBenef = data.contratCourantAdhesion.dataLocale.tabPersonnesPhysiques[indexB];
	if(contratBenef != undefined){
		data.contratCourantAdhesion.dataLocale.personnePhysique=contratBenef
		data.contratCourantAdhesion.dataLocale.variables.indexBenef++;
		// A l'exception de l'assurer principal ( index = 1), on doit cliquer sur la ligne de l'adherent
		if(indexB==0){
			sc.endStep(ActivInfinitev7.steps.stAdhesionIndividuelle_AjoutProduits_ListeProduit);
			return;
		}
		else{
			ActivInfinitev7.pAdhIndivProdGaran.oligneAdherent.i(indexB).click();
			ActivInfinitev7.pAdhIndivProdGaran.events.LOAD.once(function(ev){
				sc.endStep(ActivInfinitev7.steps.stAdhesionIndividuelle_AjoutProduits_ListeProduit);
				return;
			});
		}
	
	}
	else{
		// Tous les produits ont été rajoutés --> on avance
		ActivInfinitev7.pAdhIndivProdGaran.btSuivant.click();
		sc.endStep(ActivInfinitev7.steps.stVersLaPageParamDivers);
	return;
	}
}});



/** Description */
ActivInfinitev7.step({ stAdhesionIndividuelle_AjoutProduits_ListeProduit: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.assurePrincipal.NUM_SEQ_CT + ' Etape - stAdhesionIndividuelle_AjoutProduits_ListeProduit');
	// on récupère la table des produits
	var listProd =[];
	var np = 0;
	var p1 = data.contratCourantAdhesion.dataLocale.personnePhysique.NUM_PROD_1;
	if(p1 != undefined){
		listProd[np] = p1 ;
		np++;
	}
	var p2 = data.contratCourantAdhesion.dataLocale.personnePhysique.NUM_PROD_2;
	if(p2 != undefined){
		listProd[np] = p2 ;
		np++;
	}
	var p3 = data.contratCourantAdhesion.dataLocale.personnePhysique.NUM_PROD_3;
	if(p3 != undefined){
		listProd[np] = p3 ;
		np++;
	}
	var p4 = data.contratCourantAdhesion.dataLocale.personnePhysique.NUM_PROD_4;
	if(p4 != undefined){
		listProd[np] = p4 ;
		np++;
	}
	var p5 = data.contratCourantAdhesion.dataLocale.personnePhysique.NUM_PROD_5;
	if(p5 != undefined){
		listProd[np] = p5 ;
		np++;
	}
	var p6 = data.contratCourantAdhesion.dataLocale.personnePhysique.NUM_PROD_6;
	if(p6 != undefined){
		listProd[np] = p6 ;
		np++;
	}
	var p7 = data.contratCourantAdhesion.dataLocale.personnePhysique.NUM_PROD_7;
	if(p7 != undefined){
		listProd[np] = p7 ;
		np++;
	}
	var p8 = data.contratCourantAdhesion.dataLocale.personnePhysique.NUM_PROD_8;
	if(p8 != undefined){
		listProd[np] = p8 ;
		np++;
	}
	var p9 = data.contratCourantAdhesion.dataLocale.personnePhysique.NUM_PROD_9;
	if(p9 != undefined){
		listProd[np] = p9 ;
		np++;
	}
	var p10 = data.contratCourantAdhesion.dataLocale.personnePhysique.NUM_PROD_10;
	if(p10 != undefined){
		listProd[np] = p10 ;
		np++;
	}

	
	
	data.contratCourantAdhesion.dataLocale.listProd=listProd;
	
	/// on va ajouter les produits un à un 
	data.contratCourantAdhesion.dataLocale.indexProd=0;
	data.contratCourantAdhesion.dataLocale.nbProd = np;
	
	///Polling sur l'existence de bt Modifier

	var countPoll=0;
	ctx.polling({	
		delay: 300,	
		nbMax: 10,		
		test: function(index) { 		
			countPoll++;
			ctx.log('countP :'+countPoll);
			return ActivInfinitev7.pAdhIndivProdGaran.btModifier.exist();
		},
		done : function() { 
			ActivInfinitev7.pAdhIndivProdGaran.btModifier.click();
				ActivInfinitev7.pAdhIndivProdGaran.events.LOAD.once(function(ev){
					sc.endStep();
					return;
			});
		},
		fail: function() { 
			ctx.traceF.errorTxt(' Erreur Serveur lors de l\'ajout des produits - Bouton <Modifier> introuvable ');
			data.contratCourantAdhesion.notes.commentaireContrat = 'Revoir centre :  Erreur Serveur lors de l\'ajout des produits - Bouton <Modifier> introuvable ';
			data.contratCourantAdhesion.notes.statutsContrat = ctx.excelF.constantes.statuts.Echec;
			data.contratCourantAdhesion.statuts.finCreation = true;
			sc.endStep(ActivInfinitev7.steps.stFinScenarioAjoutBenef);
			return;
		}
	});

}});


/** Description */
ActivInfinitev7.step({ stAdhesionIndividuelle_AjoutProduits_Boucle_Produits: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.assurePrincipal.NUM_SEQ_CT + ' Etape - stAdhesionIndividuelle_AjoutProduits_Boucle_Produits');
	if(data.contratCourantAdhesion.dataLocale.indexProd<data.contratCourantAdhesion.dataLocale.nbProd){
		ctx.log(' index Produit : '+data.contratCourantAdhesion.dataLocale.indexProd+'  Nombre Produits : '+data.contratCourantAdhesion.dataLocale.nbProd);
		// A l'exception du premier ajout , on doit cliquer sur nouveau
		if(data.contratCourantAdhesion.dataLocale.indexProd!=0){
			ActivInfinitev7.pAdhIndivProdGaran.btNouveau.click();
		}
		
		sc.endStep(ActivInfinitev7.steps.stAdhesionIndividuelle_AjoutProduits);
		return;
		
		
	}else{
		ActivInfinitev7.pAdhIndivProdGaran.btValiderCouverture.click()
		ActivInfinitev7.pAdhIndivProdGaran.events.LOAD.once(function(ev){
			if(ActivInfinitev7.pAdhIndivProdGaran.btContinuer.exist()){
				ActivInfinitev7.pAdhIndivProdGaran.btContinuer.click();
			}
			sc.endStep(ActivInfinitev7.steps.stAdhesionIndividuelle_AjoutProduits_Boucle_Beneficiaire);
			return;
		});
	
	}
	
	
}});




/** Description */
ActivInfinitev7.step({ stAdhesionIndividuelle_AjoutProduits: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.assurePrincipal.NUM_SEQ_CT + ' Etape - stAdhesionIndividuelle_AjoutProduits');
	// on recherche si le produit est bien dans la base infinite 
	var codeCourant = data.contratCourantAdhesion.dataLocale.listProd[data.contratCourantAdhesion.dataLocale.indexProd];
	var gammeCourante = data.contratCourantAdhesion.dataLocale.personnePhysique.GAMME;
	var tabProduits = ctx.formF.gammeProd;
	ctx.log('codeCourant : '+codeCourant);
	var codeProdInfinite = undefined;
	var codeInfinite = undefined;
	var index=-1;
	for(var i  in tabProduits){
	//	ctx.log('Gamme  : '+gammeCourante + ', Code Courant : '+codeCourant+ ', tabGamme : '+tabProduits[i].gamme+', tabGRC : ' + tabProduits[i].codeGRC);
		if(codeCourant == tabProduits[i].codeGRC && gammeCourante ==  tabProduits[i].gamme){
			index=i;
			break;
		}
	}
	
	if (index == -1){
		ctx.traceF.errorTxt(data.contratCourantAdhesion.dataLocale.personnePhysique.NUM_SEQ_CT + ' PAS DE CORRESPONDANCE TROUVE ENTRE CODE GRC ET INFINITE ');
	}else{
		codeProdInfinite = tabProduits[index].codeProduitInfinite;
		ctx.log('Code infinite : '+codeProdInfinite);
	}
	
	ActivInfinitev7.pAdhIndivProdGaran.oCodeProduit.setFocus();
	ActivInfinitev7.pAdhIndivProdGaran.oCodeProduit.keyStroke(codeProdInfinite);
	var countPoll=0;	
	var indexP = -1;
		ctx.polling({
			delay: 500,
			nbMax: 10,
			test: function(index) { 
				countPoll++;
				ctx.log('countP : '+countPoll);
				return ActivInfinitev7.pAdhIndivProdGaran.oSelectCodeProduit.count()>0;
			},
			done: function() { 
			/// on cherche parmis les resultats du tableau celui qui correspond à l'offre
				
				var nbP = ActivInfinitev7.pAdhIndivProdGaran.oSelectCodeProduit.count();
					if(nbP==1){
						// la Personne physique est unique on peut continuer avec
						ActivInfinitev7.pAdhIndivProdGaran.oSelectCodeProduit.i(0).click();
						ActivInfinitev7.pAdhIndivProdGaran.oValiderProduit.click();
						ActivInfinitev7.pAdhIndivProdGaran.events.LOAD.once(function(ev){
							data.contratCourantAdhesion.dataLocale.indexProd++;
							
							sc.endStep(ActivInfinitev7.steps.stAdhesionIndividuelle_AjoutProduits_Boucle_Produits);
							return;
						});
						
					}
					else{
						/// il y a plusieur produits possible on renvoi au centre
						ctx.traceF.errorTxt(' Le code produit n\'est pas unique , on ne traite pas le dossier ');
						data.contratCourantAdhesion.notes.commentaireContrat = 'Revoir centre: il y a plusieurs produits possibles ';
						data.contratCourantAdhesion.notes.statutsContrat = ctx.excelF.constantes.statuts.Echec;
						data.contratCourantAdhesion.statuts.finCreation = true;
						sc.endStep(ActivInfinitev7.steps.stFinScCreationHSP);
						return;
					}
			},
			fail: function() { 
				ctx.traceF.errorTxt(' Erreur lors du remplissage du code produit');
				sc.endStep(ActivInfinitev7.steps.stFinScCreationHSP);
				return;
			}
	});
}});




/** Description */
ActivInfinitev7.step({ stVersLaPageParamDivers: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.assurePrincipal.NUM_SEQ_CT + ' Etape - stVersLaPageParamDivers');
	ActivInfinitev7.pAdhIndivParamDivers.wait(function(ev){
		ActivInfinitev7.pAdhIndivParamDivers.btSuivant.click();
		sc.endStep();
		return;
	});
}});

/** Description */
ActivInfinitev7.step({ stVersLaPageParamDeCalcul: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.assurePrincipal.NUM_SEQ_CT + ' Etape - stVersLaPageParamDeCalcul');
	ActivInfinitev7.pAdhIndivParamCalcul.wait(function(ev){
		ActivInfinitev7.pAdhIndivParamCalcul.btSuivant.click();
			sc.endStep();
			return;
	});
}});

/** Description */
ActivInfinitev7.step({ stVersLaPageHistoDesCotisations: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.assurePrincipal.NUM_SEQ_CT + ' Etape - stVersLaPageHistoDesCotisations');
	ActivInfinitev7.pAdhIndivHistoDesCoti.wait(function(ev){
		ActivInfinitev7.pAdhIndivHistoDesCoti.btSuivant.click();
		sc.endStep();
		return;
	});
}});



/** Description */
ActivInfinitev7.step({ stPageVisuCompteCotisant_ValidationDuCalcul: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.assurePrincipal.NUM_SEQ_CT + ' Etape - stVersLaPageVisuCompteCotisant');
	ActivInfinitev7.pAdhIndivVisuCptCotis.wait(function(ev){
		ActivInfinitev7.pAdhIndivVisuCptCotis.oValidation.setFocus();
		ActivInfinitev7.pAdhIndivVisuCptCotis.oValidation.set('OUI');
		ActivInfinitev7.pAdhIndivVisuCptCotis.btSuivant.click();
		sc.endStep(ActivInfinitev7.steps.stVersLaPageAvisEcheance);
		return;
	});
}});


ActivInfinitev7.step({ stVersLaPageAvisEcheance: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.assurePrincipal.NUM_SEQ_CT + ' Etape - stVersLaPageAvisEcheance');
	ActivInfinitev7.pAdhIndivAvisEcheance.wait(function(ev){
		ActivInfinitev7.pAdhIndivAvisEcheance.btSuivant.click();
		sc.endStep();
		return;
	});
}});


/** Description */
ActivInfinitev7.step({ stAdhesionIndiv_PageDemandeCarteDeTiers_TypeEdition: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.assurePrincipal.NUM_SEQ_CT + ' Etape - stAdhesionIndiv_PageDemandeCarteDeTiers_TypeEdition');
	ActivInfinitev7.pAdhIndivDemandeCarte.wait(function(ev){
		ActivInfinitev7.pAdhIndivDemandeCarte.btSuivant.click();
			sc.endStep();
			return;
	});
}});


/** Description */
ActivInfinitev7.step({ stAdhesionIndiv_ValidationActe: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.assurePrincipal.NUM_SEQ_CT + ' Etape - stAdhesionIndiv_ValidationActe');
	ActivInfinitev7.pAdhIndivValidActe.wait(function(ev){
		ActivInfinitev7.pAdhIndivValidActe.btSauvegarder.click();
		data.contratCourantAdhesion.notes.statutsContrat=ctx.excelF.constantes.statuts.Succes;
		sc.endStep();
		return;
	});
}});


/** Description */
ActivInfinitev7.step({ stAdhesionIndiv_RetourPageIdentificationContrat: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.assurePrincipal.NUM_SEQ_CT + ' Etape - stAdhesionIndiv_RetourPageIdentificationContrat');
	ActivInfinitev7.pAdhesionsIndividuelles.wait(function(ev){
		ActivInfinitev7.pAdhesionsIndividuelles.btFermer.click();
		ctx.wait(function(ev){
			var countPoll=0;	
			ctx.polling({	
				delay: 400,	
				nbMax: 10,		
				test: function(index) { 		
					countPoll++;
					ctx.log('countP :'+countPoll);
					return ActivInfinitev7.pAdhesionsIndividuelles.btNon.exist();
				},
				done: function() { 
					ActivInfinitev7.pAdhesionsIndividuelles.btNon.click();
					ActivInfinitev7.pTabDeBord.wait(function(ev){
						sc.endStep();
						return;
					});
				},
				fail: function() { 
					ctx.traceF.errorTxt(' Erreur lors du retour au tableau de bord ');
					sc.endStep(ActivInfinitev7.steps.stFinScCreationHSP);
					return;
				}
			});
		},500);
	});
}});


/** Description */
ActivInfinitev7.step({ stFinScCreationHSP: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.assurePrincipal.NUM_SEQ_CT + ' Etape - stFinScCreationHSP');
	//retour au dashboard
  ActivInfinitev7.pTabDeBord.start(data.webData.tabDeBordURL);
	sc.endStep();
	return;
}});
