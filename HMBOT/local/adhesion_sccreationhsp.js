
/** Description */
ActivInfinitev7.scenario({ scCreationHSP: function(ev, sc) {
	var data = sc.data;
	sc.onTimeout(30000, function(sc, st) { 
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
				delay: 300,
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
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.contratAdhesionAttributs.NUM_SEQ_CT + ' Etape - stResultatRecherchePersonneAdhesionIndiv');
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


/** Description */
ActivInfinitev7.step({ stCreationIdentificationPersonneAdhesionIndiv: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.contratAdhesionAttributs.NUM_SEQ_CT + ' Etape - stCreationIdentificationPersonneAdhesionIndiv');
	ActivInfinitev7.pAdhIndivIdPrinRechResu.wait(function(ev){
		ctx.log('--> Creation intervenant principal ');
		sc.endStep(ActivInfinitev7.steps.stAdhesionIndiv_IdentificationAdherent);
		return;
	});
}});


ActivInfinitev7.step({ stModifIdentificationPersonneAdhesionIndiv: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.contratAdhesionAttributs.NUM_SEQ_CT + ' Etape - stModifIdentificationPersonneAdhesionIndiv');
	sc.endStep(ActivInfinitev7.steps.stAdhesionIndiv_IdentificationAdherent);
	return;
}});



/** Description */
ActivInfinitev7.step({ stAdhesionIndiv_IdentificationAdherent: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.contratAdhesionAttributs.NUM_SEQ_CT + ' Etape - stAdhesionIndiv_IdentificationAdherent');
	// Identification Adherent
	var civilite= data.contratCourantAdhesion.dataLocale.tabPersonnesPhysiques[0].CONTACT_CIVILITE;
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
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.contratAdhesionAttributs.NUM_SEQ_CT + ' Etape - stAdhesionIndiv_AdresseAdherent');
	
	
//	par defaut Type Adresse
	ActivInfinitev7.pAdhIndivIntervtPrin.oTypeAdresse.setFocus();
	ActivInfinitev7.pAdhIndivIntervtPrin.oTypeAdresse.set('DOM');
	// Pays
	var codePays=data.contratCourantAdhesion.dataLocale.tabPersonnesPhysiques[0].CODE_PAYS;
	//Normalement les codes pays sont les memes pour GRC et infinite ( à confirmer )
	ActivInfinitev7.pAdhIndivIntervtPrin.oPaysAdresse.set(codePays);
	// Code Cedex ( a voir )
	
	
	ctx.log('----');
	sc.endStep();
	return;
}});

ActivInfinitev7.step({ stAdhesionIndiv_AdresseAdherent_CodePostal: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.contratAdhesionAttributs.NUM_SEQ_CT + ' Etape - stAdhesionIndiv_AdresseAdherent_CodePostal');
	var cp = data.contratCourantAdhesion.dataLocale.tabPersonnesPhysiques[0].CODE_POSTAL;
	// comme plusieurs communes peuvent avoir le meme code postal , on ajoute le nom de la commune
	cp = cp + ' - '+ data.contratCourantAdhesion.dataLocale.tabPersonnesPhysiques[0].LIBELLE_LOCALITE;
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
					/// il y a plusieur PP on renvoi au centre
					ctx.traceF.errorTxt(' La ville n\'est pas unique');
					data.contratCourantAdhesion.notes.commentaireContrat = 'Erreur Code Postal :  La ville n\'est pas unique';
					data.contratCourantAdhesion.notes.statutsContrat = ctx.excelF.constantes.statuts.Echec;
					data.contratCourantAdhesion.statuts.finCreation = true;
					sc.endStep(ActivInfinitev7.steps.stFinScCreationHSP);
					return;
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
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.contratAdhesionAttributs.NUM_SEQ_CT + ' Etape - stAdhesionIndiv_AdresseAdherent_Adresse');
	// Escalier  Etage ..
	var complementAdresse_1 = data.contratCourantAdhesion.dataLocale.tabPersonnesPhysiques[0].COMP_IDENT_DEST;
	var complementAdresse_2 = data.contratCourantAdhesion.dataLocale.tabPersonnesPhysiques[0].COMP_IDENTIF_GEO;
	var numeroVoie = data.contratCourantAdhesion.dataLocale.tabPersonnesPhysiques[0].NUMERO_VOIE;
	var complementVoie = data.contratCourantAdhesion.dataLocale.tabPersonnesPhysiques[0].COMP_NUM_VOIE 
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
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.contratAdhesionAttributs.NUM_SEQ_CT + ' Etape - stAdhesionIndiv_AdresseAdherent_Adresse_selectionVoie');
	var code = data.contratCourantAdhesion.dataLocale.tabPersonnesPhysiques[0].ADRESSE_NAT_VOIE;
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
	var nomVoie = data.contratCourantAdhesion.dataLocale.tabPersonnesPhysiques[0].LIBELLE_VOIE;
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
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.contratAdhesionAttributs.NUM_SEQ_CT + ' Etape - stAdhesionIndiv_AdresseAdherent_Adresse_selectionVoie_lib_court');
	/// la selection de la voie avec un libellé long n'a pas marché on tente avec une libellé court
	var code = data.contratCourantAdhesion.dataLocale.tabPersonnesPhysiques[0].ADRESSE_NAT_VOIE;
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
	var nomVoie = data.contratCourantAdhesion.dataLocale.tabPersonnesPhysiques[0].LIBELLE_VOIE;
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
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.contratAdhesionAttributs.NUM_SEQ_CT + ' Etape - stAdhesionIndiv_AdresseAdherent_Adresse_France_ss_controle');
	// L'adresse est introuvable dans la base Infinite, on enregistre l'adresse en "france sans controle "
	/// Pays : France ss ctrl
	ActivInfinitev7.pAdhIndivIntervtPrin.oPaysAdresse.setFocus();
	ActivInfinitev7.pAdhIndivIntervtPrin.oPaysAdresse.set('ZZZ');
	// Code postal :
	var cp = data.contratCourantAdhesion.dataLocale.tabPersonnesPhysiques[0].CODE_POSTAL;
	ActivInfinitev7.pAdhIndivIntervtPrin.oCodePostal.setFocus();
	ActivInfinitev7.pAdhIndivIntervtPrin.oCodePostal.set('');
	ActivInfinitev7.pAdhIndivIntervtPrin.oCodePostal.set(cp);
	// Localite
	var localite = data.contratCourantAdhesion.dataLocale.tabPersonnesPhysiques[0].LIBELLE_LOCALITE;
	ActivInfinitev7.pAdhIndivIntervtPrin.oLocalite.setFocus();
	ActivInfinitev7.pAdhIndivIntervtPrin.oLocalite.set('');
	ActivInfinitev7.pAdhIndivIntervtPrin.oLocalite.set(localite);
	// Escalier
	var complementAdresse_1 = data.contratCourantAdhesion.dataLocale.tabPersonnesPhysiques[0].COMP_IDENT_DEST;
	ActivInfinitev7.pAdhIndivIntervtPrin.oEscalierEtage.setFocus();
	ActivInfinitev7.pAdhIndivIntervtPrin.oEscalierEtage.set('');
	ActivInfinitev7.pAdhIndivIntervtPrin.oEscalierEtage.set(complementAdresse_1);
	// Résidence, Batiment..
	var complementAdresse_2 = data.contratCourantAdhesion.dataLocale.tabPersonnesPhysiques[0].COMP_IDENTIF_GEO;
	ActivInfinitev7.pAdhIndivIntervtPrin.oBatimentAdresse.setFocus();
		ActivInfinitev7.pAdhIndivIntervtPrin.oBatimentAdresse.set('');
	ActivInfinitev7.pAdhIndivIntervtPrin.oBatimentAdresse.set(complementAdresse_2);
	// numéro de voie
	var numeroVoie = data.contratCourantAdhesion.dataLocale.tabPersonnesPhysiques[0].NUMERO_VOIE;
	ActivInfinitev7.pAdhIndivIntervtPrin.oNumeroAdresse.setFocus();
	ActivInfinitev7.pAdhIndivIntervtPrin.oNumeroAdresse.set('');
	ActivInfinitev7.pAdhIndivIntervtPrin.oNumeroAdresse.set(numeroVoie);
	// Complement Voie
	var complementVoie = data.contratCourantAdhesion.dataLocale.tabPersonnesPhysiques[0].COMP_NUM_VOIE 
	ActivInfinitev7.pAdhIndivIntervtPrin.oBtqAdresse.setFocus();
	ActivInfinitev7.pAdhIndivIntervtPrin.oBtqAdresse.set('');
	ActivInfinitev7.pAdhIndivIntervtPrin.oBtqAdresse.set(complementVoie); 
	
	sc.endStep(ActivInfinitev7.steps.stAdhesionIndiv_Prestation);
	return;
	
	
}});






/** Description */
ActivInfinitev7.step({ stAdhesionIndiv_Prestation: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.contratAdhesionAttributs.NUM_SEQ_CT + ' Etape - stAdhesionIndiv_Prestation');
	var typeAbo = data.contratCourantAdhesion.dataLocale.tabPersonnesPhysiques[0].TOP_ABONN_DEC;
	var cptBanque= data.contratCourantAdhesion.dataLocale.tabPersonnesPhysiques[0].COMPTE_BANQUE_PREST;
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
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.contratAdhesionAttributs.NUM_SEQ_CT + ' Etape - stAdhesionIndiv_Cotisation');
	/// Mode de reglement
	var modePrelvt = data.contratCourantAdhesion.dataLocale.tabPersonnesPhysiques[0].MODE_PAIE;
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
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.contratAdhesionAttributs.NUM_SEQ_CT + ' Etape - stAdhesionIndiv_Cotisation_PrelvtBancaire');

	ActivInfinitev7.pAdhIndivIntervtPrin.oModeReglement.set('3');
	ActivInfinitev7.pAdhIndivIntervtPrin.events.LOAD.on(function(ev){
		var jourPrelev = ctx.dateF.format2c(data.contratCourantAdhesion.dataLocale.tabPersonnesPhysiques[0].JOUR_PRELEV);
		var freqReglt = data.contratCourantAdhesion.dataLocale.tabPersonnesPhysiques[0].PERIODICITE;
		var freqAvisEch = data.contratCourantAdhesion.dataLocale.tabPersonnesPhysiques[0].FREQ_AVIS_ECH;
		var typeTerme =  data.contratCourantAdhesion.dataLocale.tabPersonnesPhysiques[0].TYPE_TERME;
		ctx.log('Code Echeancier : '+jourPrelev);
		if(  jourPrelev !=''){
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
		}
		else{
			ctx.traceF.errorTxt(' Erreur lors du remplissage du mode prelevement : données incomplètes');
			data.contratCourantAdhesion.notes.statutsContrat = ctx.excelF.constantes.statuts.Echec;
			data.contratCourantAdhesion.statuts.finCreation = true;
			sc.endStep(ActivInfinitev7.steps.stFinScCreationHSP);
			return;
		}
			
	});
	

	
}});

/** Description */
ActivInfinitev7.step({ stAdhesionIndiv_Cotisation_Cheque: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.contratAdhesionAttributs.NUM_SEQ_CT + ' Etape - stAdhesionIndiv_Cotisation_Cheque');
	ActivInfinitev7.pAdhIndivIntervtPrin.oModeReglement.set('1');
	ActivInfinitev7.pAdhIndivIntervtPrin.events.LOAD.on(function(ev){
	var freqReglt = data.contratCourantAdhesion.dataLocale.tabPersonnesPhysiques[0].PERIODICITE;
	var freqAvisEch = data.contratCourantAdhesion.dataLocale.tabPersonnesPhysiques[0].FREQ_AVIS_ECH;
	var typeTerme =  data.contratCourantAdhesion.dataLocale.tabPersonnesPhysiques[0].TYPE_TERME;
	sc.endStep(ActivInfinitev7.steps.stAdhesionIndiv_Remplissage_RIB);
	return;
			});
}});



ActivInfinitev7.step({ stAdhesionIndiv_Remplissage_RIB: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.contratAdhesionAttributs.NUM_SEQ_CT + ' Etape - stAdhesionIndiv_Remplissage_RIB');
	// Titulaire
	var titulaire=data.contratCourantAdhesion.dataLocale.tabPersonnesPhysiques[0].TITU_COMPTE;
	ActivInfinitev7.pAdhIndivIntervtPrin.oTitulaireRib.setFocus();
	ActivInfinitev7.pAdhIndivIntervtPrin.oTitulaireRib.set('');
	ActivInfinitev7.pAdhIndivIntervtPrin.oTitulaireRib.set(titulaire);
	// Numero de compte
	var numCpt = data.contratCourantAdhesion.dataLocale.tabPersonnesPhysiques[0].NUM_COMPTE;
	ActivInfinitev7.pAdhIndivIntervtPrin.oCompteRib.setFocus();
	ActivInfinitev7.pAdhIndivIntervtPrin.oCompteRib.set(numCpt);
	// Clef RIB
	var cleRIB = data.contratCourantAdhesion.dataLocale.tabPersonnesPhysiques[0].CLE_RIB;
	ActivInfinitev7.pAdhIndivIntervtPrin.oCleRib.setFocus();
	ActivInfinitev7.pAdhIndivIntervtPrin.oCleRib.set(cleRIB);
	// Code banque et guichet sont remplis dans les steps suivantes
	sc.endStep();
	return;
}});


/** Description */
ActivInfinitev7.step({ stAdhesionIndiv_Remplissage_RIB_Etablissement: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.contratAdhesionAttributs.NUM_SEQ_CT + ' Etape - stAdhesionIndiv_Remplissage_Etablissement');
	// Etablissement
	var codeEtblt=data.contratCourantAdhesion.dataLocale.tabPersonnesPhysiques[0].CODE_BANQUE;
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
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.contratAdhesionAttributs.NUM_SEQ_CT + ' Etape - stAdhesionIndiv_Remplissage_RIB_Guichet');
	// Guichet
	var codeGuichet=data.contratCourantAdhesion.dataLocale.tabPersonnesPhysiques[0].CODE_GUICHET;
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
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.contratAdhesionAttributs.NUM_SEQ_CT + ' Etape - stAdhesionIndiv_Remplissage_IBAN');
	// Clef IBAN
	var cleIBAN = data.contratCourantAdhesion.dataLocale.tabPersonnesPhysiques[0].CLE_IBAN;
	cleIBAN = cleIBAN.substr(2,2);
	ActivInfinitev7.pAdhIndivIntervtPrin.oCleIBAN.setFocus();
	ActivInfinitev7.pAdhIndivIntervtPrin.oCleIBAN.set(cleIBAN);
	// Identificateur National
	
	/// Bic
	var bic = data.contratCourantAdhesion.dataLocale.tabPersonnesPhysiques[0].BIC;
	ActivInfinitev7.pAdhIndivIntervtPrin.oNumBic.setFocus();
	ActivInfinitev7.pAdhIndivIntervtPrin.oNumBic.set(bic);
	sc.endStep();
	return;
}});

/** Description */
ActivInfinitev7.step({ stAdhesionIndiv_Remplissage_IBAN_PAYS: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.contratAdhesionAttributs.NUM_SEQ_CT + ' Etape - stAdhesionIndiv_Remplissage_IBAN_PAYS');
	var codeIBAN = data.contratCourantAdhesion.dataLocale.tabPersonnesPhysiques[0].CLE_IBAN;
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
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.contratAdhesionAttributs.NUM_SEQ_CT + ' Etape - stAdhesionIndiv_DonneesMandat');
	var dateSign = data.contratCourantAdhesion.dataLocale.tabPersonnesPhysiques[0].DATE_SIGN_MANDAT;
	ActivInfinitev7.pAdhIndivIntervtPrin.oDateSignature.setFocus();
	ActivInfinitev7.pAdhIndivIntervtPrin.oDateSignature.set(dateSign);
	 
	
	sc.endStep();
	return;
}});



/** Description */
ActivInfinitev7.step({ stAdhesionIndiv_VerificationDesDonnees: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.contratAdhesionAttributs.NUM_SEQ_CT + ' Etape - stAdhesionIndiv_VerificationDesDonnees');
	/// on quitte la page intervenant principal
	//ActivInfinitev7.pAdhIndivIntervtPrin.btSuivant.setFocus();
	ActivInfinitev7.pAdhIndivIntervtPrin.btSuivant.click();
	sc.endStep();
	return;
}});



/** Description */
ActivInfinitev7.step({ stAdhesionIndiv_GestionsDesErreurs: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantAdhesion.dataLocale.contratAdhesionAttributs.NUM_SEQ_CT + ' Etape - stAdhesionIndiv_GestionsDesErreurs');
	// on verifie qu'il n'y a pas d'erreurs, si oui on continue sinon on traite l'erreur
	
	
	
//	ActivInfinitev7.pAdhIndivIntervtPrin.wait(function () {
//		ActivInfinitev7.pIdentContratRechConsul.oContratIndiv.set(data.contratCourantCMU.dataLocale.numeroContratIndiv);
//		ActivInfinitev7.pIdentContratRechConsul.btRecherche.click();
//	});
	

	 ActivInfinitev7.pAdhIndivIntervtPrin.wait(function () {
		 if(ActivInfinitev7.pAdhIndivIntervtPrin.oPopUpTitre.exist()){
		 		var msg = ActivInfinitev7.pAdhIndivIntervtPrin.oPopUpTitre.get().trim();
			 if(msg.indexOf('RIB')!=-1){
			 	// le blocage concerne le RIB
				// On modifie la prestation en mode cheque annuel
				 
			 }
				
				sc.endStep();
				return ;
		 }
		 else{
		 	ctx.traceF.infoTxt(data.contratCourantCMU.dataLocale.numeroContratIndiv + ' - contract trouve');
			data.contratCourantCMU.notes.statutsContrat = ctx.excelF.constantes.statuts.Succes;
			sc.endStep();
			return ;
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
