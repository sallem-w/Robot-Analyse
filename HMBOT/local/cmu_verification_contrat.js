
/** Description */
ActivInfinitev7.scenario( {
	scVerifContratCMU: function (ev, sc) {
	var data = sc.data;
		sc.onTimeout(120000, function(sc, st) { 
			ctx.traceF.errorTxt(data.contratCourantCMU.dataLocale.numeroContratIndiv  + ' - onTimeOut -  On quitte le scenario '+ sc.name + ' durant le step : '+  st.name + ' sur la page ' +  data.varGlobales.nomPageCourante );
			data.contratCourantCMU.notes.commentaireContrat = 'Contrat non Traité en raison d\'un Timeout';
			data.contratCourantCMU.notes.statutsContrat = ctx.excelF.constantes.statuts.Echec;
			data.contratCourantCMU.statutsCMU.FinCMUProcessus = true;
			ActivInfinitev7.pTabDeBord.start(sc.data.webData.tabDeBordURL); // retour au Tableau de bord
			sc.endScenario(); 
	}); 
	
	sc.onError(function(sc, st, ex) { 
		ctx.traceF.errorTxt(data.contratCourantCMU.dataLocale.numeroContratIndiv  + ' - onError -  On quitte le scenario '+ sc.name + ' durant le step : '+  st.name + ' sur la page ' +  data.varGlobales.nomPageCourante + ' en raison de : '+ ex);
		data.contratCourantCMU.notes.commentaireContrat = 'Contrat non Traité en raison d\'un onError';
		data.contratCourantCMU.notes.statutsContrat = ctx.excelF.constantes.statuts.Echec;
		data.contratCourantCMU.statutsCMU.FinCMUProcessus = true;
		ActivInfinitev7.pTabDeBord.start(sc.data.webData.tabDeBordURL); // retour au Tableau de bord
		sc.endScenario();	
	}); 
		sc.setMode(e.scenario.mode.clearIfRunning);
		// add steps here...

		sc.step(ActivInfinitev7.steps.stInitScVerifContratCMU);
		sc.step(ActivInfinitev7.steps.stNavigationConsultationCMU);
		sc.step(ActivInfinitev7.steps.stRecherContratIndivCMU);
		sc.step(ActivInfinitev7.steps.stNavigationInfoRO);
		sc.step(ActivInfinitev7.steps.stInitAffichageInforRO);
		sc.step(ActivInfinitev7.steps.stInitVerifBenef);
		sc.step(ActivInfinitev7.steps.stVerifBenefCMU);
		sc.step(ActivInfinitev7.steps.stLireBenefInfinite);
		sc.step(ActivInfinitev7.steps.stLireBenefLocal);
		sc.step(ActivInfinitev7.steps.stVerifValiditeRange);
		sc.step(ActivInfinitev7.steps.stBenefPrinciTermineAutresBenefNonTermines);
		sc.step(ActivInfinitev7.steps.stLireDateFinEffetInfinite);
		sc.step(ActivInfinitev7.steps.stVerifDateFinEffetInfinite);
		sc.step(ActivInfinitev7.steps.stVerifOrdreSurDateInfiniteEtDateExcel);
		sc.step(ActivInfinitev7.steps.stVerfiIOrdreSurDateBenefEtDateASSPRI);
 		sc.step(ActivInfinitev7.steps.stBenefCMUSuivant);
		sc.step(ActivInfinitev7.steps.stNavigationListeProduitCMU);
		sc.step(ActivInfinitev7.steps.stListeProduitCMU);
		sc.step(ActivInfinitev7.steps.stInitVerifEtatProduitCMU);
		sc.step(ActivInfinitev7.steps.stVerifEtatProduitCMU);
		sc.step(ActivInfinitev7.steps.stProduitCMUSuivant);
		sc.step(ActivInfinitev7.steps.stInitContributionCMU);
		sc.step(ActivInfinitev7.steps.stVerifContributionCMU); //du scénario 	ACS
		//fin scenario
		sc.step(ActivInfinitev7.steps.stContratCMUtermine); // stToTerminated	
		sc.step(ActivInfinitev7.steps.stFinScVerifContratCMU);

	}
});


/** Description */
ActivInfinitev7.step( { stInitScVerifContratCMU : function (ev, sc, st) {
		var data = sc.data;
		ctx.traceF.infoTxt(data.contratCourantCMU.dataLocale.numeroContratIndiv + ' - Début - scénario scVerifContrat');
		ctx.traceF.infoTxt(data.contratCourantCMU.dataLocale.numeroContratIndiv + ' - Etape - stInitScVerifContratCMU');
		sc.endStep();
		return ;
	}
});

/** navigation au ab de bord Choisir menu consultation */
ActivInfinitev7.step( { stNavigationConsultationCMU : function (ev, sc, st) {
		var data = sc.data;
		ctx.traceF.infoTxt(data.contratCourantCMU.dataLocale.numeroContratIndiv + ' Etape - stNavigationConsultationCMU');
		ActivInfinitev7.pTabDeBord.wait(function () {
			ActivInfinitev7.pTabDeBord.btConsultation.click();
			sc.endStep();
			return ;
		});
	}
});

/** recherche du contrat cmu */
ActivInfinitev7.step( { stRecherContratIndivCMU : function (ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantCMU.dataLocale.numeroContratIndiv + ' Etape stRecherContratIndivCMU ');
	st.onTimeout(10000, function (sc, st) {
		ctx.traceF.errorTxt(data.contratCourantCMU.dataLocale.numeroContratIndiv + 'TimeOut - Etape stRecherContratIndivCMU ');
		data.contratCourantCMU.notes.commentaireContrat = 'Revoir centre: Erreur recherche contrat : Contrat non Accessible ';
		data.contratCourantCMU.notes.statutsContrat = ctx.excelF.constantes.statuts.Echec;
		sc.data.contratCourantCMU.statutsCMU.FinCMUProcessus = true;
		ActivInfinitev7.pTabDeBord.start(data.webData.tabDeBordURL);
		sc.endScenario();
	});
	st.onError(function (sc, st, ex) {
		ctx.traceF.errorTxt(data.contratCourantCMU.dataLocale.numeroContratIndiv + 'OnError - Etape stRecherContratIndivCMU ');
		data.contratCourantCMU.notes.commentaireContrat = 'Revoir centre: Erreur recherche contrat : ';
		data.contratCourantCMU.notes.statutsContrat = ctx.excelF.constantes.statuts.Echec;
		sc.data.contratCourantCMU.statutsCMU.FinCMUProcessus = true;
		ActivInfinitev7.pTabDeBord.start(data.webData.tabDeBordURL);
		sc.endScenario();
	});
	
	ActivInfinitev7.pIdentContratRechConsul.wait(function () {
		ActivInfinitev7.pIdentContratRechConsul.oContratIndiv.set(data.contratCourantCMU.dataLocale.numeroContratIndiv);
		ActivInfinitev7.pIdentContratRechConsul.btRecherche.click();
	});
	

	 ActivInfinitev7.pIdentContratRechResu.wait(function () {
		 if(ActivInfinitev7.pIdentContratRechResu.btDETAIL.exist()){
		 		var msgErreur = ActivInfinitev7.pIdentContratRechResu.oTitreErreur.get().trim();
				ctx.traceF.errorTxt(data.contratCourantCMU.dataLocale.numeroContratIndiv + ' - erreur recherche contrat : ' + msgErreur);
				data.contratCourantCMU.notes.commentaireContrat = 'Revoir centre: Erreur recherche contrat : ' + msgErreur;
				data.contratCourantCMU.notes.statutsContrat = ctx.excelF.constantes.statuts.Echec;
			 	sc.data.contratCourantCMU.statutsCMU.FinCMUProcessus = true;
				sc.endStep(ActivInfinitev7.steps.stFinScVerifContratCMU);
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


/** click sur le bouton info RO */
ActivInfinitev7.step( { stNavigationInfoRO : function (ev, sc, st) {
	var data = sc.data;
	data.varGlobales.nomPageCourante=ev.pageName;
	ctx.traceF.infoTxt(data.contratCourantCMU.dataLocale.numeroContratIndiv + ' - Etape - stNavigationInfoRO ');
	ActivInfinitev7.pIdentContratRechResu.oBtIdentAssures.click();
	sc.endStep();
		return ;
	}
});

/** choisir option btInfoRO */
ActivInfinitev7.step( { stInitAffichageInforRO : function (ev, sc, st) {
	var data = sc.data;
	data.varGlobales.nomPageCourante=ev.pageName;
	ctx.traceF.infoTxt(data.contratCourantCMU.dataLocale.numeroContratIndiv + ' - Etape stInitAffichageInforRO'+ '- Page : '+ ev.pageName);
	ActivInfinitev7.pIdentAssures.wait(function (ev) {
		ActivInfinitev7.pIdentAssures.btInfoRo.click();
		sc.endStep();
	  return ;
	});	
}});

/** initialisation des paramètres utilisés pour la vérification */
ActivInfinitev7.step( { stInitVerifBenef : function (ev, sc, st) {
	var data = sc.data;
	data.varGlobales.nomPageCourante=ev.pageName;
	ctx.traceF.infoTxt(data.contratCourantCMU.dataLocale.numeroContratIndiv + ' - Etape stInitVerifBenef');
	
	ActivInfinitev7.pIdentAssuresInfoRO.wait(function (ev) {
		data.contratCourantCMU.dataEnLigne.variables.indiceBenef = 0;
		data.contratCourantCMU.dataEnLigne.variables.nbBenef = ActivInfinitev7.pIdentAssuresInfoRO.oTypeAssure.count();
		data.contratCourantCMU.statutsCMU.contratProlonge = false;
		data.contratCourantCMU.statutsCMU.ASSPRITermine = false;
		data.contratCourantCMU.statutsCMU.assureValid = false;
		sc.endStep();
		return ;
	});
}});

/** début de la vérification */
ActivInfinitev7.step( { stVerifBenefCMU : function (ev, sc, st) {
	var data = sc.data;
	data.varGlobales.nomPageCourante=ev.pageName;
	//début du step
	ctx.traceF.infoTxt(data.contratCourantCMU.dataLocale.numeroContratIndiv + ' - Début - Etape stVerifBenefCMU - beneficiaire numéro: ' + data.contratCourantCMU.dataEnLigne.variables.indiceBenef);
	sc.endStep();
	return ;
}});

/** Description */ //ok
ActivInfinitev7.step( { stLireBenefInfinite : function (ev, sc, st) {
	var data = sc.data;
	data.varGlobales.nomPageCourante=ev.pageName;
	ctx.traceF.infoTxt(data.contratCourantCMU.dataLocale.numeroContratIndiv + ' - Début - Etape stLireBenefInfinite');
	data.contratCourantCMU.dataEnLigne.variables.etatCourant = ActivInfinitev7.pIdentAssuresInfoRO.oEtatProduit.i(data.contratCourantCMU.dataEnLigne.variables.indiceBenef).get();
	data.contratCourantCMU.dataEnLigne.variables.rangAssure = ActivInfinitev7.pIdentAssuresInfoRO.oRangeAssure.i(data.contratCourantCMU.dataEnLigne.variables.indiceBenef).get();
	data.contratCourantCMU.dataEnLigne.variables.typeAssure = ActivInfinitev7.pIdentAssuresInfoRO.oTypeAssure.i(data.contratCourantCMU.dataEnLigne.variables.indiceBenef).get();
	sc.endStep();
	return ;
}});

//ok
/** lire le benef local qui a le meme type que le benef Infinite (on récupère la première instance si on a plusieurs) si aucune données dispo ==> stProchainBenefCMU dans le meme contrat */
// retoure un résultat globale
ActivInfinitev7.step( { stLireBenefLocal: function (ev, sc, st) {
	var data = sc.data;
	data.varGlobales.nomPageCourante=ev.pageName;
	ctx.traceF.infoTxt(data.contratCourantCMU.dataLocale.numeroContratIndiv + ' - Début - Etape stLireBenefLocal');
	for (var i in data.contratCourantCMU.dataLocale.dictContratsCourantCMU) {
		if (data.contratCourantCMU.dataLocale.dictContratsCourantCMU[i].typeAssure === data.contratCourantCMU.dataEnLigne.variables.typeAssure) {
			//return beneficiaries[i];
			data.CMUtemp_contractF = data.contratCourantCMU.dataLocale.dictContratsCourantCMU[i];
		}
	}
	if (!data.CMUtemp_contractF) {
		sc.endStep(ActivInfinitev7.steps.stBenefCMUSuivant);
		return ;
	}else {
		sc.endStep();
		return ;
	}
}});

ActivInfinitev7.step( { stVerifValiditeRange: function (ev, sc, st) {
		var data = sc.data;
		ctx.traceF.infoTxt(data.contratCourantCMU.dataLocale.numeroContratIndiv + ' - Début - Etape stVerifValiditeRange');
		//déclaration du tableau de correspondance
		var tabRange = ctx.configF.constantes.correspondanceRang[data.contratCourantCMU.dataEnLigne.variables.typeAssure];
		var coherence = false;
			for (var i in tabRange) {
//				ctx.log(' tabRange : '+tabRange[i]+' Rang Assure : '+data.contratCourantCMU.dataEnLigne.variables.rangAssure)
				if (tabRange[i] === data.contratCourantCMU.dataEnLigne.variables.rangAssure) {
					coherence=true;
					break;
				}
			}
		
			if(coherence){
				//cohérence entre les rangs 
					ctx.traceF.infoTxt(data.contratCourantCMU.dataLocale.numeroContratIndiv + ' - les rangs sont cohérents');
					sc.endStep();
					return ;
			}
			else{
					//incoherence entre les rangs
				ctx.traceF.infoTxt(data.contratCourantCMU.dataLocale.numeroContratIndiv + ' - incohérece entre les rangs');
				data.contratCourantCMU.notes.commentaireContrat = 'Revoir centre: Incohérence entre les rangs et type d\'assuré';
				data.statistiquesF.nbCasRevoirCentre += 1;
				data.contratCourantCMU.notes.statutsContrat = ctx.excelF.constantes.statuts.Echec;
				sc.data.contratCourantCMU.statutsCMU.FinCMUProcessus = true;
				sc.endStep(ActivInfinitev7.steps.stFinScVerifContratCMU);
				return ;
			}
}});

/** Description */ //ok
ActivInfinitev7.step( { stBenefPrinciTermineAutresBenefNonTermines : function (ev, sc, st) {
	var data = sc.data;
	data.varGlobales.nomPageCourante=ev.pageName;
	ctx.traceF.infoTxt(data.contratCourantCMU.dataLocale.numeroContratIndiv + ' - Début - Etape stBenefPrinciTermineAutresBenefNonTermines');

	if (data.contratCourantCMU.dataEnLigne.variables.typeAssure === ctx.configF.constantes.ASSPRI) {
		data.contratCourantCMU.statutsCMU.ASSPRITermine = (data.contratCourantCMU.dataEnLigne.variables.etatCourant === ctx.configF.constantes.produitTermine);
	}else if (data.contratCourantCMU.dataEnLigne.variables.etatCourant === ctx.configF.constantes.produitValide) {
		data.contratCourantCMU.statutsCMU.assureValid = true;
	}

	if (data.contratCourantCMU.statutsCMU.ASSPRITermine && data.contratCourantCMU.statutsCMU.assureValid) {
		ctx.traceF.infoTxt(data.contratCourantCMU.dataLocale.numeroContratIndiv + ' - ASSPRI est terminé mais un ou plusieurs autres beneficiaries e sont pas terminé(s)');
		data.contratCourantCMU.notes.commentaireContrat = 'Revoir centre: L\'assuré principal est radié, mais un ou plusieurs bénéficiaire ne sont pas radié pour CMU';
		data.contratCourantCMU.notes.statutsContrat = ctx.excelF.constantes.statuts.Echec;
		data.contratCourantCMU.statutsCMU.FinCMUProcessus = true;
		sc.endStep(ActivInfinitev7.steps.stFinScVerifContratCMU);
		return ;
	}else {
		sc.endStep();
		return ;
	}
}});

/** Description */ //ok
ActivInfinitev7.step( { stLireDateFinEffetInfinite: function (ev, sc, st) {
	var data = sc.data;
	data.varGlobales.nomPageCourante=ev.pageName;
	ctx.traceF.infoTxt(data.contratCourantCMU.dataLocale.numeroContratIndiv + ' - Début - Etape stLireDateFinEffetInfinite');
	var infiniteLignesSituationParticuliere = ActivInfinitev7.pIdentAssuresInfoRO.oCodeProduit.getAll();
	var tabSituationParticuliereDateFinEffet = ActivInfinitev7.pIdentAssuresInfoRO.oDateFinEffetProduit.getAll();
	var dateFinEffet;
	for (var i in infiniteLignesSituationParticuliere) {
		if (infiniteLignesSituationParticuliere[i] === ctx.configF.scenario.CMU) {
			var dateCourante = ctx.string.trim(tabSituationParticuliereDateFinEffet[i]);
			if (dateCourante === '') {
				continue ;
			}
		
			dateCourante = ctx.dateF.enObjet(dateCourante);
			if (dateFinEffet === undefined || ctx.dateF.estAvant(dateFinEffet, dateCourante)) {
				dateFinEffet = dateCourante;
			}
		}
	}
	data.contratCourantCMU.dataEnLigne.variables.dateFinEffetInfinite = dateFinEffet;
	sc.endStep();
	return ;
}});

/** Description */ //ok
ActivInfinitev7.step( { stVerifDateFinEffetInfinite : function (ev, sc, st) {
	var data = sc.data;
	data.varGlobales.nomPageCourante=ev.pageName;
	ctx.traceF.infoTxt(data.contratCourantCMU.dataLocale.numeroContratIndiv + ' - Début - Etape stVerifDateFinEffetInfinite');

	if (!data.contratCourantCMU.dataEnLigne.variables.dateFinEffetInfinite) {
		ctx.traceF.infoTxt(data.contratCourantCMU.dataLocale.numeroContratIndiv + ' - Date fin effet CMU non trouvé');
		data.contratCourantCMU.notes.commentaireContrat = 'Revoir centre: Aucune date de fin d\'effet n\'a été trouvé pour le produit CMU';
		data.contratCourantCMU.notes.statutsContrat = ctx.excelF.constantes.statuts.Echec;
		sc.data.contratCourantCMU.statutsCMU.FinCMUProcessus = true;
		sc.endStep(ActivInfinitev7.steps.stFinScVerifContratCMU);
		return ;
	}else {
		sc.endStep();
		return ;
	}
}});


//ok
/* verifier si la date de situation particuliere de benefcourant est avant la date de fin d'effet infinite */
ActivInfinitev7.step( { stVerifOrdreSurDateInfiniteEtDateExcel: function (ev, sc, st) {
		var data = sc.data;
		//début du step
		ctx.traceF.infoTxt(data.contratCourantCMU.dataLocale.numeroContratIndiv + ' - Début - Etape stVerifOrdreSurDateInfiniteEtDateExcel - beneficiaire numéro: ' + data.contratCourantCMU.dataEnLigne.variables.indiceBenef);
		var date1=new Date(data.CMUtemp_contractF.dateFinEffSituatParti);
		var date2 = data.contratCourantCMU.dataEnLigne.variables.dateFinEffetInfinite;
//	ctx.log(' dateFinEffSituatParti : ' + date1.getTime());
//	ctx.log(' dateFinEffetInfinite : ' + date2.getTime());
		 if(ctx.dateF.estAvant(date1,date2)){
		  data.contratCourantCMU.notes.commentaireContrat = 'Contrat prolongé';
			data.contratCourantCMU.notes.statutsContrat = ctx.excelF.constantes.statuts.Succes;
			data.contratCourantCMU.statutsCMU.contratProlonge = true;
			sc.data.contratCourantCMU.statutsCMU.FinCMUProcessus = true;
//			sc.endStep(ActivInfinitev7.steps.stBenefCMUSuivant);
			 sc.endStep(ActivInfinitev7.steps.stFinScVerifContratCMU);
			return;
		}else{
			sc.endStep();
		  return ;
		}
}});

/** verifier si la date de fin de situ part de l'assure ASSPRI est avant la date de fin d'effet infinite*/
ActivInfinitev7.step( { stVerfiIOrdreSurDateBenefEtDateASSPRI: function (ev, sc, st) {
	var data = sc.data;
	data.varGlobales.nomPageCourante=ev.pageName;
	ctx.traceF.infoTxt(data.contratCourantCMU.dataLocale.numeroContratIndiv + ' - Debut - Etape stVerfiIOrdreSurDateBenefEtDateASSPRI - beneficiaire numero: ' + data.contratCourantCMU.dataEnLigne.variables.indiceBenef);
	if(	data.contratCourantCMU.dataEnLigne.variables.typeAssure !== ctx.configF.constantes.ASSPRI && ctx.dateF.estAvant(new Date(data.contratCourantCMU.dataLocale.dateFinEffSituatParti),data.contratCourantCMU.dataEnLigne.variables.dateFinEffetInfinite)){
	  data.contratCourantCMU.notes.commentaireContrat = 'Revoir centre: probleme sur les dates de fin d\'effet des beneficiaires';
		data.contratCourantCMU.statutsCMU.FinCMUProcessus = true;
		data.contratCourantCMU.notes.statutsContrat = ctx.excelF.constantes.statuts.Echec;
	  sc.endStep(ActivInfinitev7.steps.stFinScVerifContratCMU);
	  return;
	}else{
		sc.endStep();
		return ;
	}
}});


/** mise à juor des attribus et rebouclage sur le step stVerifBenefCMU */
ActivInfinitev7.step( { stBenefCMUSuivant : function (ev, sc, st) {
	var data = sc.data;
	data.varGlobales.nomPageCourante=ev.pageName;
	ctx.traceF.infoTxt(data.contratCourantCMU.dataLocale.numeroContratIndiv + ' - Début - Etape stBenefCMUSuivant *******');
	if (data.contratCourantCMU.dataEnLigne.variables.indiceBenef === data.contratCourantCMU.dataEnLigne.variables.nbBenef - 1) {
		if (data.contratCourantCMU.statutsCMU.contratProlonge) {
			sc.endStep(ActivInfinitev7.steps.stFinScVerifContratCMU);
			return ;
		}
		else{
			sc.endStep(ActivInfinitev7.steps.stNavigationListeProduitCMU);
			return ;
		}	
	}else{
			data.contratCourantCMU.dataEnLigne.variables.indiceBenef += 1;
		  ActivInfinitev7.pIdentAssuresInfoRO.oTypeAssure.i(data.contratCourantCMU.dataEnLigne.variables.indiceBenef).click();
		  ActivInfinitev7.pIdentAssuresInfoRO.events.LOAD.on(function(ev){
			  sc.endStep(ActivInfinitev7.steps.stVerifBenefCMU);
			  return ;
		  });
	}
}});

/** Description */
ActivInfinitev7.step( { stNavigationListeProduitCMU : function (ev, sc, st) {
	var data = sc.data;
	data.varGlobales.nomPageCourante=ev.pageName;
	ctx.traceF.infoTxt(data.contratCourantCMU.dataLocale.numeroContratIndiv + ' - Début - Etape stNavigationListeProduitCMU');
	ActivInfinitev7.pIdentAssuresInfoRO.btNavigListeProduits.click();
	sc.endStep();
	return ;
}});

/** Description */
ActivInfinitev7.step( { stListeProduitCMU : function (ev, sc, st) {
	var data = sc.data;
	data.varGlobales.nomPageCourante=ev.pageName;
	ctx.traceF.infoTxt(data.contratCourantCMU.dataLocale.numeroContratIndiv + ' - Début - Etape stListeProduitCMU');
	
	ActivInfinitev7.pProdGaranConsul.wait(function () {
		data.contratCourantCMU.dataEnLigne.variables.indiceBenef = 0;
		data.contratCourantCMU.dataEnLigne.variables.nbBenef = ActivInfinitev7.pProdGaranConsul.oTypeBenef.count();
		if (data.contratCourantCMU.dataEnLigne.variables.nbBenef === 0) {
			ctx.traceF.infoTxt(data.contratCourantCMU.dataLocale.numeroContratIndiv + ' Tous les produits sont terminés');
			data.contratCourantCMU.notes.commentaireContrat = 'Déjà fait';
			data.contratCourantCMU.statutsCMU.FinCMUProcessus = true;
			data.contratCourantCMU.notes.statutsContrat = ctx.excelF.constantes.statuts.Succes;
			sc.endStep(ActivInfinitev7.steps.stFinScVerifContratCMU);
			return ;
		}else {
			sc.endStep();
			return ;
		}
	});
}});


/** recuperer le contrat excel et la liste */
ActivInfinitev7.step( { stInitVerifEtatProduitCMU: function (ev, sc, st) {
	var data = sc.data;
	data.varGlobales.nomPageCourante=ev.pageName;
	ctx.traceF.infoTxt(data.contratCourantCMU.dataLocale.numeroContratIndiv + ' - Début - Etape stInitVerifEtatProduitCMU');
	var benefInfiniteCourant = ActivInfinitev7.pProdGaranConsul.oTypeBenef.i(data.contratCourantCMU.dataEnLigne.variables.indiceBenef);
	data.contratCourantCMU.dataEnLigne.variables.produitTrouve=false; /// initialisation
	var typeAssure = benefInfiniteCourant.get();
	//var 
	//rechercher le beneficiareCourat dans le contrat Excel
	for (var i in data.contratCourantCMU.dataLocale.dictContratsCourantCMU) {
		if (data.contratCourantCMU.dataLocale.dictContratsCourantCMU[i].typeAssure === data.contratCourantCMU.dataEnLigne.variables.typeAssure) {
			//return beneficiaries[i];
			data.CMUtemp_contractF = data.contratCourantCMU.dataLocale.dictContratsCourantCMU[i];
		}
	}
	if (!data.CMUtemp_contractF) {
		sc.endStep(ActivInfinitev7.steps.stProduitCMUSuivant);
		return ;
	}else {
		sc.endStep();
		return ;
	}
}});


/** Description */
ActivInfinitev7.step( { stVerifEtatProduitCMU: function (ev, sc, st) {
	var data = sc.data;
	data.varGlobales.nomPageCourante=ev.pageName;
	ctx.traceF.infoTxt(data.contratCourantCMU.dataLocale.numeroContratIndiv + ' - Début - Etape stVerifEtatProduitCMU');
	var verif = false;
	var tabstatuts = [];
	/// Polling sur l'existance du tableau Codeproduit
	ctx.wait(function(ev){ // on attends un peu car existance ne suffit pas...
		var countPoll=0;
		ctx.polling({
			delay: 300,
			nbMax: 10,
			test: function(index) { 
				ctx.log('countPoll : ' +countPoll);
				countPoll++;
				return ActivInfinitev7.pProdGaranConsul.oCodeProduit.count()>0; 
			},
			done: function() {
				
					var listeProduit = ActivInfinitev7.pProdGaranConsul.oCodeProduit.getAll();
					for (var i = 0; i<listeProduit.length;i++) {
						if (ActivInfinitev7.pProdGaranConsul.oCodeProduit.i(i).get() === data.CMUtemp_contractF.codeProduit) {
							data.contratCourantCMU.dataEnLigne.variables.produitTrouve = true;
							tabstatuts.push(ActivInfinitev7.pProdGaranConsul.oEtatProduit.i(i).get());
						}
					}
					for (var j=0;j<tabstatuts.length;j++) {
						if (tabstatuts[j] === ctx.configF.constantes.produitValide) {
							verif = true;
						}
					}
						if (tabstatuts.length> 0 && verif) {
						ctx.traceF.infoTxt(data.contratCourantCMU.dataLocale.numeroContratIndiv + 'un ou plusieurs produits sont valides, on continue la vérification');
						//goToContribution
						sc.endStep(ActivInfinitev7.steps.stInitContributionCMU);
						return ;
						}
						else{
							/// le produit a été radié
							sc.endStep();
							return ;		
						}
			

			},
			fail: function() { 
				ctx.traceF.infoTxt(data.contratCourantCMU.dataLocale.numeroContratIndiv + 'Erreur Serveur : Liste des produits introuvable');
				data.contratCourantCMU.notes.commentaireContrat = 'Revoir centre: Erreur Serveur : Liste des produits introuvable';
			  data.contratCourantCMU.notes.statutsContrat = ctx.excelF.constantes.statuts.Echec;
				data.contratCourantCMU.statutsCMU.FinCMUProcessus = true;
				sc.endStep(ActivInfinitev7.steps.stFinScVerifContratCMU);
				return ;
			}
		});
	},1000);

}});



/** Description */
ActivInfinitev7.step( { stInitContributionCMU : function (ev, sc, st) {
	var data = sc.data;
	data.varGlobales.nomPageCourante=ev.pageName;
	ctx.traceF.infoTxt(data.contratCourantCMU.dataLocale.numeroContratIndiv + ' - Début - Etape stInitContributionCMU');
	if (!data.scenarioConfig.CMU.controlSolde) {
		sc.endStep(ActivInfinitev7.steps.stContratCMUtermine);
		return ;
	}else {
		ActivInfinitev7.pProdGaranConsul.btVisuCotisation.click();
		sc.endStep();
		return ;
	}
}});

/* la meme etape que le chekc contribution de sc ACS*/
ActivInfinitev7.step( { stVerifContributionCMU : function (ev, sc, st) {
	var data = sc.data;
	data.varGlobales.nomPageCourante=ev.pageName;
	ctx.traceF.infoTxt(data.contratCourantCMU.dataLocale.numeroContratIndiv + ' - Début - Etape stVerifContributionCMU');
	ActivInfinitev7.pVisuCptCotisConsul.wait(function (ev) {
		if (ActivInfinitev7.pVisuCptCotisConsul.oDateEch.count() === 1 &&
		ctx.string.trim(ActivInfinitev7.pVisuCptCotisConsul.oDateEch.i(0).get()) === "Aucune donnée disponible dans le tableau") {
			sc.endStep();
			return ;
		}
		else {
			var compareDate = ctx.dateF.ajouterJour(ctx.getDate(), 0, 1, 0);
			var isValidContribution = false;
			for (var index in ActivInfinitev7.pVisuCptCotisConsul.oDateEch.getAll()) {
				var dateEch = ctx.string.trim(ActivInfinitev7.pVisuCptCotisConsul.oDateEch.i(index).get());
				var balanceEch = ctx.string.trim(ActivInfinitev7.pVisuCptCotisConsul.oSoldeCompt.i(index).get());
				if (ctx.dateF.enObjet(dateEch) <= compareDate) {
					isValidContribution = (parseFloat(balanceEch) < 1)
				break;
				}
			}
			if (!isValidContribution) {
				var message = data.contratCourantCMU.dataLocale.numeroContratIndiv + ' - END SCENARIO - balance not up to date';
				ctx.traceF.infoTxt(message);
				data.contratCourantCMU.notes.commentaireContrat = 'Revoir centre: Solde comptable non à jour';
			  data.contratCourantCMU.notes.statutsContrat = ctx.excelF.constantes.statuts.Echec;
				data.contratCourantCMU.statutsCMU.FinCMUProcessus = true;
				ActivInfinitev7.pTabDeBord.start(data.webData.tabDeBordURL);
					sc.endStep(ActivInfinitev7.steps.stFinScVerifContratCMU);
					return ;
			}
			else {
				sc.endStep();
				return ;
			}
		}
	});
}});


/** Description */
ActivInfinitev7.step( { stProduitCMUSuivant : function (ev, sc, st) {
	var data = sc.data;
	data.varGlobales.nomPageCourante=ev.pageName;
	ctx.traceF.infoTxt(data.contratCourantCMU.dataLocale.numeroContratIndiv + ' Etape stProduitCMUSuivant');
	data.contratCourantCMU.dataEnLigne.variables.indiceBenef += 1;
	if (data.contratCourantCMU.dataEnLigne.variables.indiceBenef >= data.contratCourantCMU.dataEnLigne.variables.nbBenef) {
		if(data.contratCourantCMU.dataEnLigne.variables.produitTrouve){
			ctx.traceF.infoTxt(data.contratCourantCMU.dataLocale.numeroContratIndiv + 'tous les produits sont terminés');
			data.contratCourantCMU.notes.commentaireContrat = 'Déjà fait';
			data.contratCourantCMU.statutsCMU.FinCMUProcessus = true;
			data.contratCourantCMU.notes.statutsContrat = ctx.excelF.constantes.statuts.Succes;
			sc.endStep(ActivInfinitev7.steps.stFinScVerifContratCMU);
			return ;
		}
		else {
		ctx.traceF.infoTxt(data.contratCourantCMU.dataLocale.numeroContratIndiv + 'un ou plusieurs produits ne sont pas valides');
		data.contratCourantCMU.notes.commentaireContrat = 'Revoir centre: le produit n\'a pas été trouvé';
		data.contratCourantCMU.notes.statutsContrat = ctx.excelF.constantes.statuts.Echec;
		data.contratCourantCMU.statutsCMU.FinCMUProcessus = true;
			// On annule la consultation et clique sur annuler pour retourner au tableau de bord 
		ActivInfinitev7.pProdGaranConsul.btFermeture.click();
		ActivInfinitev7.pTabDeBord.wait(function(ev){
				ctx.log('--> Retour au tableau de bord');
				sc.endStep(ActivInfinitev7.steps.stFinScVerifContratCMU);
				return ;
		});	
	
	}

	}else {
		ActivInfinitev7.pProdGaranConsul.oTypeBenef.i(data.contratCourantCMU.dataEnLigne.variables.indiceBenef).click();
		ActivInfinitev7.pProdGaranConsul.wait(function () {
				sc.endStep(ActivInfinitev7.steps.stVerifEtatProduitCMU);
				return;
		});
	}
}});

/** Description */ //stToTerminated
ActivInfinitev7.step( { stContratCMUtermine : function (ev, sc, st) {
	var data = sc.data;
	data.varGlobales.nomPageCourante=ev.pageName;
	ctx.traceF.infoTxt(data.contratCourantCMU.dataLocale.numeroContratIndiv + ' Etape stContratCMUtermine');
	data.contratCourantCMU.notes.commentaireContrat = 'À résilier';
  data.contratCourantCMU.statutsCMU.contratTermine = true; //nécessaire pour les stats
  data.contratCourantCMU.notes.statutsContrat = ctx.excelF.constantes.statuts.Succes;
	sc.endStep();
	return ;
}});





/** Description */
ActivInfinitev7.step( { stFinScVerifContratCMU : function (ev, sc, st) {
	var data = sc.data;
	data.varGlobales.nomPageCourante=ev.pageName;
  ctx.traceF.infoTxt(data.contratCourantCMU.dataLocale.numeroContratIndiv + ' Etape - stFinScVerifContratCMU');
	//retour au dashboard
  ActivInfinitev7.pTabDeBord.start(data.webData.tabDeBordURL);
	sc.endStep();
	return ;
}});


