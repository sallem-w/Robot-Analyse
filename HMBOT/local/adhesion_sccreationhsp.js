
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
	
	var natureVoie = ctx.configF.correspondanceTab(ctx.formF.typeVoie.GRC,ctx.formF.typeVoie.Infinite,data.contratCourantAdhesion.dataLocale.tabPersonnesPhysiques[0].ADRESSE_NAT_VOIE);
	var nomVoie = data.contratCourantAdhesion.dataLocale.tabPersonnesPhysiques[0].LIBELLE_VOIE;
	// comme plusieurs communes peuvent avoir le meme code postal , on ajoute le nom de la commune
	var voie = natureVoie + ' '+ nomVoie;
	ctx.log(' Voie : '+voie);
	ActivInfinitev7.pAdhIndivIntervtPrin.oVoieAdresse.setFocus();
	ActivInfinitev7.pAdhIndivIntervtPrin.oVoieAdresse.keyStroke(voie);
	
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
				if(ActivInfinitev7.pAdhIndivIntervtPrin.oSelectVoie.i(0).get()== voie){
					choixUnique = true;
				}
				if(choixUnique){
					// la Personne physique est unique on peut continuer avec
					ActivInfinitev7.pAdhIndivIntervtPrin.oSelectVoie.i(0).click();
					sc.endStep();
					return;
				}
				else{
					/// il y a plusieur PP on renvoi au centre
					ctx.traceF.errorTxt(' La voie n\'est pas unique');
					data.contratCourantAdhesion.notes.commentaireContrat = 'Erreur Nom de voie :  La voie n\'est pas unique';
					data.contratCourantAdhesion.notes.statutsContrat = ctx.excelF.constantes.statuts.Echec;
					data.contratCourantAdhesion.statuts.finCreation = true;
					sc.endStep(ActivInfinitev7.steps.stFinScCreationHSP);
					return;
				}
			},
			fail: function() { 
				ctx.traceF.errorTxt(' Erreur lors du remplissage du nom de la voie');
				sc.endStep(ActivInfinitev7.steps.stFinScCreationHSP);
				return;
			}
		});
}});


/** Description */
ActivInfinitev7.step({ stAdhesionIndiv_Telephone: function(ev, sc, st) {
	var data = sc.data;
	
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
	sc.endStep(ActivInfinitev7.steps.stAdhesionIndiv_IdentificationAdherent);
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
