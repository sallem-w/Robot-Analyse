
/** Description */
ActivInfinitev7.scenario({ scRechercheAnalysePP: function(ev, sc) {
	var data = sc.data;
	sc.onTimeout(30000, function(sc, st) {
		ctx.traceF.errorTxt(data.ppCouranteAnalyse.dataLocale.referenceGRC + ' Timeout le scénario courant a été arrêté');
		data.ppCouranteAnalyse.notes.contexteAnalyseStoppee = ctx.notes.constantes.statuts.AdhNonAnalyseeInfinite;
		ActivInfinitev7.pTabDeBord.start(data.webData.tabDeBordURL);
    sc.endScenario();
	});
	sc.onError(function(sc, st, ex) {
		ctx.traceF.errorTxt(data.ppCouranteAnalyse.dataLocale.referenceGRC + ex + ' le scénario courant a été arrêté');
		data.ppCouranteAnalyse.notes.contexteAnalyseStoppee = ctx.notes.constantes.statuts.AdhNonAnalyseeInfinite;
		ActivInfinitev7.pTabDeBord.start(data.webData.tabDeBordURL);
    sc.endScenario();
	});
	sc.setMode(e.scenario.mode.clearIfRunning);
	// add steps here...
  //sc.step(ActivInfinitev7.steps.stDemarrageServeurInfinite);
	sc.step(ActivInfinitev7.steps.stInitRechercheEtAnalysePP);
	sc.step(ActivInfinitev7.steps.stInitConsultationPP);
	sc.step(ActivInfinitev7.steps.stConsultationPP);
	sc.step(ActivInfinitev7.steps.stResultRecherchePP);
	sc.step(ActivInfinitev7.steps.stTraiterResultatRecherchePP);
	sc.step(ActivInfinitev7.steps.stInitRecherchePPParRO);
	sc.step(ActivInfinitev7.steps.stRecherchePPParRO);
	sc.step(ActivInfinitev7.steps.stResultRecherchePPParRO);
	sc.step(ActivInfinitev7.steps.stInitAnalyseContratsIA);
  sc.step(ActivInfinitev7.steps.stOuvertureContrat);
	sc.step(ActivInfinitev7.steps.stResOuvertureContrat);
	sc.step(ActivInfinitev7.steps.stAnalyseContratsIA);
	sc.step(ActivInfinitev7.steps.stRechercheTracePCX);
	sc.step(ActivInfinitev7.steps.stVerifTracePCX);
	sc.step(ActivInfinitev7.steps.stVerifAdhEnreg);
	sc.step(ActivInfinitev7.steps.stContratsIASuivant);
	sc.step(ActivInfinitev7.steps.stFinAnalyseContratsIA);
	sc.step(ActivInfinitev7.steps.stFinRechercheAnalysePP);

}});


///** Description */
ActivInfinitev7.step({ stDemarrageServeurInfinite: function(ev, sc, st) {
	var data = sc.data;
		ctx.traceF.infoTxt('Début étape - stDemarrageServeurInfinite');
		ActivInfinitev7.pTabDeBord.wait(function(ev) {
			var infos = ActivInfinitev7.pTabDeBord.getInfos();
			data.webData.tabDeBordURL=infos.document.URL;
			ctx.traceF.infoTxt('URL de Tableau de bord : ' + data.webData.tabDeBordURL);
			sc.endStep();
			return;
		});
}});


/** Description */
ActivInfinitev7.step({ stInitRechercheEtAnalysePP: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stInitRechercheEtAnalysePP - reference GRC: ' + data.ppCouranteAnalyse.dataLocale.referenceGRC);
	ActivInfinitev7.pTabDeBord.wait(function () {	
	ctx.polling({
		delay: 100,
		nbMax: 10,
		test: function(index) { 
			return	ActivInfinitev7.pTabDeBord.btConsultation.exist(); 
		},
		done: function() { 
			// add code here
			ActivInfinitev7.pTabDeBord.btConsultation.click();
			sc.endStep();
		  return;
		},
		fail: function() { 
			// add code here
			data.ppCouranteAnalyse.notes.contexteAnalyseStoppee = ctx.notes.constantes.statuts.AdhNonAnalyseeInfinite;
			 sc.endStep(ActivInfinitev7.steps.stFinRechercheAnalysePP);
	     return;
		}
	});

	});
}});


/** Description */
ActivInfinitev7.step({ stInitConsultationPP: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stInitConsultationPP: ' + data.ppCouranteAnalyse.dataLocale.referenceGRC);
	
	ActivInfinitev7.pIdentContratRechConsul.wait(function(){
		var nbcount = 0;
		ctx.polling({
		delay: 100,
		nbMax: 10,
		test: function(index) { 
			nbcount ++;
			return ActivInfinitev7.pIdentContratRechConsul.oBonHommeRecherche.exist(); 
		},
		done: function() { 
			// add code here
			ctx.traceF.infoTxt('nbcount: '+nbcount);
				ActivInfinitev7.pIdentContratRechConsul.oDateDebEffet.set(data.ppCouranteAnalyse.dataEnLigne.dateEffetConst);
				ActivInfinitev7.pIdentContratRechConsul.oBonHommeRecherche.click();
			  sc.endStep();
	      return;
		},
		fail: function() { 
			// add code here
			data.ppCouranteAnalyse.notes.contexteAnalyseStoppee = ctx.notes.constantes.statuts.AdhNonAnalyseeInfinite;
			 sc.endStep(ActivInfinitev7.steps.stFinRechercheAnalysePP);
	     return;
		}
	});
	});
}});

/** Description */
ActivInfinitev7.step({ stConsultationPP : function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stConsultationPP: ' + data.ppCouranteAnalyse.dataLocale.referenceGRC);
	ActivInfinitev7.pRecherchePPRefGRC.wait(function(){		
				if(ActivInfinitev7.pRecherchePPRefGRC.oSystemeExterne.exist()){
					ActivInfinitev7.pRecherchePPRefGRC.oSystemeExterne.set('GRC');
					ActivInfinitev7.pRecherchePPRefGRC.oIdentifiantGRC.set(data.ppCouranteAnalyse.dataLocale.referenceGRC);
		    	ActivInfinitev7.pRecherchePPRefGRC.btRecherchePP.click();
					sc.endStep();
	      	return;
				}else{
					data.ppCouranteAnalyse.notes.contexteAnalyseStoppee = ctx.notes.constantes.statuts.AdhNonAnalyseeInfinite;
			  	sc.endStep(ActivInfinitev7.steps.stFinRechercheAnalysePP);
	      	return;
			} 
	});
}});



/** Description */
ActivInfinitev7.step({ stResultRecherchePP : function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stResultRecherchePP: ' + data.ppCouranteAnalyse.dataLocale.referenceGRC);
	ActivInfinitev7.pRecherchePPRefGRCRes.wait(function(){
		if(ActivInfinitev7.pRecherchePPRefGRCRes.oAucunContratDispo.exist() && !ActivInfinitev7.pRecherchePPRefGRCRes.oResultatParRelation.exist()){
			ctx.traceF.infoTxt('La PP n existe pas selon la recherche par Ref GRC, on lance la recherche par Numéro RO');
  		ActivInfinitev7.pRecherchePPRefGRCRes.btAnnuler.click();
			sc.endStep(ActivInfinitev7.steps.stInitRecherchePPParRO);
 	  	return;
		}else{
				sc.endStep();
  			return;
		}
	});
}});


///** Description */
ActivInfinitev7.step({ stTraiterResultatRecherchePP: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stTraiterResultatRecherchePP: '+ data.ppCouranteAnalyse.dataLocale.referenceGRC);
	
	ctx.wait(function(ev){
		ctx.polling({
		delay: 400,
		nbMax: 10,
		test: function(index) { 
			return ActivInfinitev7.pRecherchePPRefGRCRes.oResultatParRelation.exist(); 
		},
		done: function() { 
			// add code here
			data.ppCouranteAnalyse.dataEnLigne.typeRelation = ActivInfinitev7.pRecherchePPRefGRCRes.oTypeRelation.i(0).get();
			data.ppCouranteAnalyse.dataEnLigne.identiteRelation = ActivInfinitev7.pRecherchePPRefGRCRes.oIdentiteRelation.i(0).get();
			if(data.ppCouranteAnalyse.dataEnLigne.typeRelation === '' && data.ppCouranteAnalyse.dataEnLigne.identiteRelation === ''){
				ctx.traceF.infoTxt('Champs type relation / identité relation vides: '+ data.ppCouranteAnalyse.dataLocale.referenceGRC);
	    	data.ppCouranteAnalyse.notes.contexteAnalyseStoppee = 'Création de contrat – PP créée sur Infinite sans lien avec un contrat';
		  	sc.endStep(ActivInfinitev7.steps.stFinRechercheAnalysePP);
	    	return;
			}else if(data.ppCouranteAnalyse.dataEnLigne.typeRelation !== '' && data.ppCouranteAnalyse.dataEnLigne.identiteRelation !== ''){
				ctx.traceF.infoTxt('Un ou plusieurs contrats sont associe(s) à la PP courante, voir l HISTORIQUE de chaque contrat');
				/*
				* Récupérer le nombre total des contrats de la PP
				*/
				data.ppCouranteAnalyse.dataEnLigne.nbContrat = ActivInfinitev7.pRecherchePPRefGRCRes.oStatus.count();
				/*
				*	Dans cette partie, on vérifie le status de tous les contrats
				*	un flag qui prend la valeur true si tous les status === I de tous les CONTARTS associés à la PP
				*/
				var nbInactif = 0;
				for(var i in ActivInfinitev7.pRecherchePPRefGRCRes.oListeContrats.getAll()){
					if(ActivInfinitev7.pRecherchePPRefGRCRes.oStatus.i(i).get()+'' === 'I'){
						nbInactif += 1;
					}
				}
				/*
				* On fait ce test pour décider sur la recheche de la date de radiation
				*/
				if(data.ppCouranteAnalyse.dataEnLigne.nbContrat === nbInactif){
					data.ppCouranteAnalyse.dataEnLigne.tousStatutInactifs = true;
				}
				sc.endStep(ActivInfinitev7.steps.stInitAnalyseContratsIA);
				return;
			}else{
				sc.endStep(ActivInfinitev7.steps.stInitAnalyseContratsIA);
				return;
			}	
		},
		fail: function() { 
			// add code here
			data.ppCouranteAnalyse.notes.contexteAnalyseStoppee = ctx.notes.constantes.statuts.AdhNonAnalyseeInfinite;
			sc.endStep(ActivInfinitev7.steps.stFinRechercheAnalysePP);
			return;
		}
	});
	},2000);
}});

/** cet étape initialise la recherche de la PP par num RO */
ActivInfinitev7.step({ stInitRecherchePPParRO: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stInitRecherchePPParRO: lecture des données du fichier Excel' + data.ppCouranteAnalyse.dataLocale.referenceGRC);
	
	ActivInfinitev7.pIdentContratRechConsul.wait(function(){
		ctx.polling({
		delay: 300,
		nbMax: 10,
		test: function(index) {
			return ActivInfinitev7.pIdentContratRechConsul.oBonHommeRecherche.exist(); 
		},
		done: function() { 
			// add code here
			ActivInfinitev7.pIdentContratRechConsul.oBonHommeRecherche.click();
				sc.endStep();
				return;
		},
		fail: function() { 
			// add code here
			 data.ppCouranteAnalyse.notes.contexteAnalyseStoppee = ctx.notes.constantes.statuts.AdhNonAnalyseeInfinite;
			 sc.endStep(ActivInfinitev7.steps.stFinRechercheAnalysePP);
	     return;
		}
	});
	 
	});
}});

/** Description */
ActivInfinitev7.step({ stRecherchePPParRO: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stRecherchePPParRO, Numéro RO : ' + data.ppCouranteAnalyse.dataLocale.numeroRO);		
	ActivInfinitev7.pRecherchePPRefGRC.wait(function(){
		var nbCount = 0;
		ctx.polling({
			delay: 300,
			nbMax: 10,
			test: function(index) { 
				return ActivInfinitev7.pRecherchePPRefGRC.oNumeroRo.exist(); 
			},
			done: function() { 
				// add code here
				ActivInfinitev7.pRecherchePPRefGRC.oNom.set(data.ppCouranteAnalyse.dataLocale.nom);
		  	ActivInfinitev7.pRecherchePPRefGRC.oPrenom.set(data.ppCouranteAnalyse.dataLocale.prenom);
		  	ActivInfinitev7.pRecherchePPRefGRC.oDateNaissance.set(ctx.dateF.formatDateIAE(data.ppCouranteAnalyse.dataLocale.dateDeNaissance+''));
				ActivInfinitev7.pRecherchePPRefGRC.oNumeroRo.set(data.ppCouranteAnalyse.dataLocale.numeroRO);
				ActivInfinitev7.pRecherchePPRefGRC.btRecherchePP.click();
				sc.endStep();
	    	return;
			},
			fail: function() { 
				// add code here
				data.ppCouranteAnalyse.notes.contexteAnalyseStoppee = ctx.notes.constantes.statuts.AdhNonAnalyseeInfinite;
			  sc.endStep(ActivInfinitev7.steps.stFinRechercheAnalysePP);
	      return;
			}
		});
	});
}});


/** Description */
ActivInfinitev7.step({ stResultRecherchePPParRO : function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stResultRecherchePPParRO, Numéro RO : ' + data.ppCouranteAnalyse.dataLocale.numeroRO);
	ActivInfinitev7.pRecherchePPRefGRCRes.wait(function(){
		if(ActivInfinitev7.pRecherchePPRefGRCRes.oAucunContratDispo.exist() && !ActivInfinitev7.pRecherchePPRefGRCRes.oResultatParRelation.exist()){
			data.ppCouranteAnalyse.notes.contexteAnalyseStoppee = ctx.notes.constantes.statuts.CreationPPInconnue;
			sc.endStep(ActivInfinitev7.steps.stFinRechercheAnalysePP);
			return;
		}else{
			//data.ppCouranteAnalyse.dataEnLigne.critereRecherche = 2;
			sc.endStep(ActivInfinitev7.steps.stTraiterResultatRecherchePP);
			return;
	}
	});
}});


/** Rentrer sur le ième contrat */
ActivInfinitev7.step({ stInitAnalyseContratsIA : function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stInitAnalyseContratsIA: ' + data.ppCouranteAnalyse.dataLocale.referenceGRC);
	if(data.ppCouranteAnalyse.dataEnLigne.indexContrat < data.ppCouranteAnalyse.dataEnLigne.nbContrat){
		if(ActivInfinitev7.pRecherchePPRefGRCRes.oStatus.i(data.ppCouranteAnalyse.dataEnLigne.indexContrat).get() === 'A'){
			//si le contrat est actif, on met à jour le flag 'contratEstActif' à TRUE ==> utile pour l'étape de la vérif d'enreg de la PP
			data.ppCouranteAnalyse.dataEnLigne.contratEstActif = true;
		}
		//click sur le ième contrat
		ActivInfinitev7.pRecherchePPRefGRCRes.oStatus.i(data.ppCouranteAnalyse.dataEnLigne.indexContrat).click();
		ActivInfinitev7.pRecherchePPRefGRCRes.btValider.click();
		sc.endStep();
	  return;
	}else{
		sc.endStep(ActivInfinitev7.steps.stFinAnalyseContratsIA);
		return;
	}	
}});


/** Description */
ActivInfinitev7.step({ stOuvertureContrat: function(ev, sc, st) {
	var data = sc.data;	
	ctx.traceF.infoTxt('Etape stOuvertureContrat: ' + data.ppCouranteAnalyse.dataLocale.referenceGRC);
	ActivInfinitev7.pIdentContratRechConsul.wait(function(){	
		ctx.polling({
			delay: 100,
			nbMax: 10,
			test: function(index) { 
				return ActivInfinitev7.pIdentContratRechConsul.btRecherche.exist(); 
			},
			done: function() { 
				// add code here
				ActivInfinitev7.pIdentContratRechConsul.btRecherche.click();
		    sc.endStep();
	      return;
			},
			fail: function() { 
				// add code here
				data.ppCouranteAnalyse.notes.contexteAnalyseStoppee = ctx.notes.constantes.statuts.AdhNonAnalyseeInfinite;
				sc.endStep();
	      return;
			}
		});
	});
}});


/** Description */
/*ActivInfinitev7.step({ stResOuvertureContrat: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stResOuvertureContrat: ' + data.ppCouranteAnalyse.dataLocale.referenceGRC);
	ActivInfinitev7.pIdentContratRechResu.wait(function(){
		if(ActivInfinitev7.pIdentContratRechResu.btDETAIL.exist()){
			ctx.traceF.infoTxt('Aucune opération valide pour le numéro de contrat saisi à la date de début d effet (date courante)');
			sc.endStep(ActivInfinitev7.steps.stContratsIASuivant);
			return;
	  }else if(data.ppCouranteAnalyse.dataEnLigne.contratEstActif){
		    			//deb modif 11-10-2017*/ /** lecture de : datedebuteffet, codeoffre (EN LIGNE) 
			  			data.ppCouranteAnalyse.dataEnLigne.codeOffre = ActivInfinitev7.pIdentContratRechResu.oCodeOffre.get();
		    			data.ppCouranteAnalyse.dataEnLigne.debDateEffet = ActivInfinitev7.pIdentContratRechResu.oDateDebutEffet.get();
			  			
	      			var debDateEffet = ctx.excel.sheet.getCell(data.varGlobales.ligneCourante, data.scenarioConfig.ANALYSE.excel.indexColonne.debDateEffet);
	      			data.ppCouranteAnalyse.dataLocale.debDateEffet = ctx.dateF.formatDateIAE(debDateEffet+'');
							var res = [];
							for(var i in data.ppCouranteAnalyse.dataLocale.tabGammeCode){
								  res = data.ppCouranteAnalyse.dataLocale.tabGammeCode[i].split(':');
		      				if(res[0] === data.ppCouranteAnalyse.dataLocale.gammeProduit+''){
			      						data.ppCouranteAnalyse.dataLocale.codeOffre = res[1];
										    ctx.traceF.infoTxt('/////////// res[0]: '+ res[0]+', res[1]: '+res[1]+', gammeProduitGRC: '+data.ppCouranteAnalyse.dataLocale.gammeProduit);
										    if(res[2] == 1){
													data.ppCouranteAnalyse.dataEnLigne.produitGammeCompatible = true;
												}
			      						break;
		      				}
	      			}
			  			if(ctx.dateF.estEgale(data.ppCouranteAnalyse.dataEnLigne.debDateEffet, data.ppCouranteAnalyse.dataLocale.debDateEffet) && data.ppCouranteAnalyse.dataEnLigne.codeOffre === data.ppCouranteAnalyse.dataLocale.codeOffre){
		      				data.ppCouranteAnalyse.dataEnLigne.adhesionEstEnregistree = true;
									sc.endStep(ActivInfinitev7.steps.stFinAnalyseContratsIA);
									return;
	      			}else{
								//modif le 31/10/2017
									ActivInfinitev7.pIdentContratRechResu.oHistoriqueOpts.click(); //choisir l'historique des opérations
		      				sc.endStep(); 
	        				return;	 
							}
					}else{
						//modif le 31/10/2017
							ActivInfinitev7.pIdentContratRechResu.oHistoriqueOpts.click(); //choisir l'historique des opérations
		  				sc.endStep(); 
	    				return;	 
					}
	});
}});*/



ActivInfinitev7.step({ stResOuvertureContrat: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stResOuvertureContrat: ' + data.ppCouranteAnalyse.dataLocale.referenceGRC);
	ActivInfinitev7.pIdentContratRechResu.wait(function(){
		if(ActivInfinitev7.pIdentContratRechResu.btDETAIL.exist()){
			ctx.traceF.infoTxt('Aucune opération valide pour le numéro de contrat saisi à la date de début d effet (date courante)');
			sc.endStep(ActivInfinitev7.steps.stContratsIASuivant);
			return;
	  }else{
			//peut importe le status du contrat, on récupère le code d'offre et la date d'effet  ==> Utile pour l'étape de la vérif d'enreg de la PP sur Infinite
			data.ppCouranteAnalyse.dataEnLigne.codeOffre = ActivInfinitev7.pIdentContratRechResu.oCodeOffre.get();
		  data.ppCouranteAnalyse.dataEnLigne.debDateEffet = ActivInfinitev7.pIdentContratRechResu.oDateDebutEffet.get();
			//on cherche la trace PCX
			ActivInfinitev7.pIdentContratRechResu.oHistoriqueOpts.click();
		  sc.endStep(); 
	    return;	 
		}		  
	});
}});


/** recherche la trace dans le contrat courant */
ActivInfinitev7.step({ stAnalyseContratsIA: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stAnalyseContratsIA: ' + data.ppCouranteAnalyse.dataLocale.referenceGRC);	
	ActivInfinitev7.pHistoriqueOptsConsul.wait(function(){
		sc.endStep();
		return;
	});
}});


/** Description */
ActivInfinitev7.step({ stRechercheTracePCX: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stRechercheTracePCX: ' + data.ppCouranteAnalyse.dataLocale.referenceGRC);	
	st.disableTimeout();
	ActivInfinitev7.scenarios.scRechercheOprtsContentieux.start(data).onEnd(function(sc3) {
		  sc.data=sc3.data;
		  ctx.traceF.infoTxt(' Fin du sous-scenario - scRechercheOprtsContentieux');
		  sc.endStep();
    });
}});

/**
* Vérifier si on a la trace PCX, si EXISTE ==> fin du traitement
* Si la trace EXISTE ==> fin du traitement ======> sorite
*/

/** Description */
ActivInfinitev7.step({ stVerifTracePCX: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stVerifTracePCX'+  data.ppCouranteAnalyse.dataLocale.referenceGRC);
	if(data.ppCouranteAnalyse.dataEnLigne.tracePCXExist){
		ctx.traceF.infoTxt('La trace PCX existe dans le contexte - Fin recherche et analyse');//si on trouve la trace PCX avec le premier contrat, on s'arrete on continue pas le parcours des autres contrats
		data.ppCouranteAnalyse.notes.contexteAnalyseStoppee = ctx.notes.constantes.statuts.TracePCX;
		sc.endStep(ActivInfinitev7.steps.stFinRechercheAnalysePP);
		return;
	}else{
		sc.endStep();
		return;
	}
}});


/** Dans cette étape, on vérifie si le contrat courant a un status ACTIF la PP est enregistrée ou no sur Infinite
* Si la PP est enregistrée sur Infinite ==> data.ppCouranteAnalyse.notes.contexteAnalyseStoppee = 'Adhésion déjà enregistrée – A vérifier manuellement'; et on passe à la PP suivante
* Sinon , on passe à l'étape suivante
*/
ActivInfinitev7.step({ stVerifAdhEnreg: function(ev, sc, st) {
	var data = sc.data;
	ctx.log('dans cette étape on vérifie si la PP est enregistrer ou non , uniquement sur un contrat actif');
	if(data.ppCouranteAnalyse.dataEnLigne.contratEstActif && data.ppCouranteAnalyse.dataEnLigne.adhesionEstEnregistree === false){
		ctx.log('====================== LE CONTRAT COURANT EST ACTIF, ON VERIFIE SI LA PP EST ENREGISTREE SUR INFINITE ========================');
		var debDateEffet = ctx.excel.sheet.getCell(data.varGlobales.ligneCourante, data.scenarioConfig.ANALYSE.excel.indexColonne.debDateEffet);
	  data.ppCouranteAnalyse.dataLocale.debDateEffet = ctx.dateF.formatDateIAE(debDateEffet+'');
		if(ctx.dateF.estEgale(data.ppCouranteAnalyse.dataEnLigne.debDateEffet, data.ppCouranteAnalyse.dataLocale.debDateEffet) && data.ppCouranteAnalyse.dataEnLigne.codeOffre === data.ppCouranteAnalyse.dataLocale.codeOffre){
		  data.ppCouranteAnalyse.dataEnLigne.adhesionEstEnregistree = true;
			sc.endStep();
			return;
	  }else{
			sc.endStep();
			return;
		}
	}else{
		sc.endStep();
		return;
	}
}});

/** 
*
* Avant de passer au contrat suivant on vérifie l'indice du contrat courant par rapport au nmbre totale des contrats 
*/
ActivInfinitev7.step({ stContratsIASuivant: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stContratsIASuivant: ' + data.ppCouranteAnalyse.dataLocale.referenceGRC);
	
	if(data.ppCouranteAnalyse.dataEnLigne.indexContrat < data.ppCouranteAnalyse.dataEnLigne.nbContrat - 1){
		ctx.traceF.infoTxt('+++++++++++++++++++++++++ Rebouclage sur le contrat suivant pour la recherche de la trace PCX +++++++++++++++++++++++++');
		data.ppCouranteAnalyse.dataEnLigne.indexContrat += 1;
		ActivInfinitev7.pTabDeBord.start(data.webData.tabDeBordURL);
		data.ppCouranteAnalyse.dataEnLigne.contratEstActif = false;
		sc.endStep(ActivInfinitev7.steps.stInitRechercheEtAnalysePP);
		return;
	}else{ //cas ou on a traité tous les contrats de la PP (pas de trace PCX, adhésion n'est pas enregistrée sur Infinite
		ctx.traceF.infoTxt('On a traité tous les contrats pour la recherche de la trace PCX et la vérif de l\'enregistrement de la PP');
		sc.endStep();
		return;
	}
}});


/** Description */
ActivInfinitev7.step({ stFinAnalyseContratsIA: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape stFinAnalyseContratsIA' + data.ppCouranteAnalyse.dataLocale.referenceGRC);
	//cas 1: pas de trace PCX et tous les contrats sont radiés (status = 'I')
	if(data.ppCouranteAnalyse.dataEnLigne.dateRadSupDjour === false && data.ppCouranteAnalyse.dataEnLigne.nbContratRad === data.ppCouranteAnalyse.dataEnLigne.nbContrat){
		data.ppCouranteAnalyse.notes.contexteAnalyseStoppee = ctx.notes.constantes.statuts.CréationPasDeContratActif;
		sc.endStep();
		return;
	}else if(data.ppCouranteAnalyse.dataEnLigne.adhesionEstEnregistree === true){
		data.ppCouranteAnalyse.notes.contexteAnalyseStoppee = ctx.notes.constantes.statuts.AdhEnregistree;
		sc.endStep();
		return;
	}else{
	  data.ppCouranteAnalyse.notes.contexteAnalyseStoppee = ctx.notes.constantes.statuts.GestionManuelle;
    sc.endStep();
		return;
	}
}});



/** Description */
ActivInfinitev7.step({ stFinRechercheAnalysePP: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('****************** Etape stFinRechercheAnalysePP: ' + data.ppCouranteAnalyse.dataLocale.referenceGRC);
	//maj des variables 
	data.ppCouranteAnalyse.dataEnLigne.indexContrat = 0;
	data.ppCouranteAnalyse.dataEnLigne.nbContrat = 0;
	data.ppCouranteAnalyse.dataEnLigne.nbContratRadie = 0;
	data.ppCouranteAnalyse.dataEnLigne.nbContratRad = 0;
	
	data.ppCouranteAnalyse.dataEnLigne.adhesionEstEnregistree = false;
	data.ppCouranteAnalyse.dataEnLigne.tracePCXExist = false;
	data.ppCouranteAnalyse.dataEnLigne.contratEstActif = false;
	data.ppCouranteAnalyse.dataEnLigne.tousStatutInactifs = false;
	data.ppCouranteAnalyse.dataEnLigne.dateRadSupDjour = false;
	
	ActivInfinitev7.pTabDeBord.start(data.webData.tabDeBordURL);
	sc.endScenario();
	return;
}});


