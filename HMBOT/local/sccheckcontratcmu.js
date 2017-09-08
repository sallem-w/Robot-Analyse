
/** Description */
ActivInfinitev7.scenario( {
	scVerifContratCMU: function (ev, sc) {
		var data = sc.data;
		sc.onTimeout(30000, function (sc, st) {
			sc.endScenario();
		}); // default timeout handler for each step
		sc.onError(function (sc, st, ex) {
			sc.endScenario();
		}); // default error handler
		sc.setMode(e.scenario.mode.clearIfRunning);
		// add steps here...

		sc.step(ActivInfinitev7.steps.stInitScVerifContratCMU);
		sc.step(ActivInfinitev7.steps.stNavigationConsultationCMU);
		sc.step(ActivInfinitev7.steps.stRecherContratIndivCMU);
		sc.step(ActivInfinitev7.steps.stNavigationInfoRo);
		sc.step(ActivInfinitev7.steps.stInitAffichageInforRO);
		sc.step(ActivInfinitev7.steps.stInitVerifBenef);
		sc.step(ActivInfinitev7.steps.stVerifBenefCMU);
		sc.step(ActivInfinitev7.steps.stBenefCMUSuivant);
		//	sc.step(ActivInfinitev7.steps.stNavigationListeProduitCMU);
		//	sc.step(ActivInfinitev7.steps.stVerifEtatProduitCMU);
		//	sc.step(ActivInfinitev7.steps.stProduitCMUSuivant);
		//	sc.step(ActivInfinitev7.steps.stVisuaContributionCMU);
		//	sc.step(ActivInfinitev7.steps.stVerifContributionCMU);
		//  sc.step(ActivInfinitev7.steps.stContratCMUTermine);
		sc.step(ActivInfinitev7.steps.stFinScVerifContratCMU);

	}
});


/** Description */
ActivInfinitev7.step( { stInitScVerifContratCMU : function (ev, sc, st) {
		var data = sc.data;
		ctx.trace.infoTxt(ctx.dataF.contratCourantCMU.dataLocale.numeroContratIndiv + ' - Début - scénario scVerifContrat');
		sc.endStep();
		return ;
	}
});

/** navigation au ab de bord Choisir menu consultation */
ActivInfinitev7.step( { stNavigationConsultationCMU : function (ev, sc, st) {
		var data = sc.data;
		ctx.trace.infoTxt(ctx.dataF.contratCourantCMU.dataLocale.numeroContratIndiv + ' - Début - Etape stNavigationConsultationCMU');
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
		ctx.trace.infoTxt(ctx.dataF.contratCourantCMU.dataLocale.numeroContratIndiv + ' - Début - Etape stRecherContratIndivCMU ');

		st.onTimeout(10000, function (sc, st) {
			ctx.trace.errorTxt(ctx.dataF.contratCourantCMU.dataLocale.numeroContratIndiv + 'TimeOut - recherche contrat');
			ctx.dataF.contratCourantCMU.notes.commentContract = 'Revoir centre: Erreur recherche contrat : Contrat non Accessible ';
			//ctx.dataF.contratCourantCMU.notes.statusContract = //ctx.excelHelper.constants.status.Fail
			ActivInfinitev7.pTabDeBord.start(ctx.dataF.webData.tableauDeBordURL);
			ActivInfinitev7.pTabDeBord.wait(function (ev) {
				sc.endScenario();
			});
		});
		st.onError(function (sc, st, ex) {
			ctx.trace.errorTxt(ctx.dataF.contratCourantCMU.dataLocale.numeroContratIndiv + 'OnError - erreur recherche contract');
			ctx.dataF.contratCourantCMU.notes.commentContract = 'Revoir centre: Erreur recherche contrat';
			//ctx.dataF.contratCourantCMU.notes.statusContract=  // ctx.excelHelper.constants.status.Fail;
			ActivInfinitev7.pTabDeBord.start(ctx.dataF.webData.tableauDeBordURL);
			ActivInfinitev7.pTabDeBord.wait(function (ev) {
				sc.endScenario();
			});
		});
		ActivInfinitev7.pRecherContratIndiv.wait(function () {
			ActivInfinitev7.pRecherContratIndiv.oContratIndiv.set(ctx.dataF.contratCourantCMU.dataLocale.numeroContratIndiv);
			ActivInfinitev7.pRecherContratIndiv.btRecherche.click();
			sc.endStep();
			return ;
		});
		var contratTrouveListener, contratNonTrouveListener;
		contratNonTrouveListener = ActivInfinitev7.pContratIndivNonTrouv.wait(function () {
			var msgErreur = ActivInfinitev7.pContratIndivNonTrouv.titreErreur.get().trim();
			ctx.trace.errorTxt(ctx.dataF.contratCourantCMU.dataLocale.numeroContratIndiv + ' - erreur recherche contrat : ' + msgErreur);
			ctx.dataF.contratCourantCMU.notes.commentContract = 'Revoir centre: Erreur recherche contrat : ' + msgErreur;
			//	ctx.dataF.contratCourantCMU.notes.statusContract = //ctx.excelHelper.constants.status.Fail;
			ctx.off(contratTrouveListener);
			ActivInfinitev7.pTabDeBord.start(ctx.dataF.webData.tableauDeBordURL);
			ActivInfinitev7.pTabDeBord.wait(function (ev) {
				sc.endScenario();
			});
		});
		contratTrouveListener = ActivInfinitev7.pContratTrouve.wait(function () {
			ctx.trace.infoTxt(ctx.dataF.contratCourantCMU.dataLocale.numeroContratIndiv + ' - contract trouve');
			//	ctx.dataF.contratCourantCMU.notes.statusContract = // ctx.excelHelper.constants.status.Success;
			ctx.off(contratNonTrouveListener);
			sc.endStep();
			return ;
		});
	}
});


/** click sur le bouton info RO */
ActivInfinitev7.step( { stNavigationInfoRo : function (ev, sc, st) {
		var data = sc.data;
		ctx.trace.infoTxt(ctx.dataF.contratCourantCMU.dataLocale.numeroContratIndiv + ' - Début - Etape stNavigationInfoRo ');
		ActivInfinitev7.pContratTrouve.btIdentAssures.click();
		sc.endStep();
		return ;
	}
});


/** choisir option btInfoRO */
ActivInfinitev7.step( {
	stInitAffichageInforRO : function (ev, sc, st) {
		var data = sc.data;
		ctx.trace.infoTxt(ctx.dataF.contratCourantCMU.dataLocale.numeroContratIndiv + ' - Début - Etape stInitAffichageInforRO');
		ActivInfinitev7.pIdentAssures.wait(function (ev) {
			ActivInfinitev7.pIdentAssures.btInfoRo.click();
		});
		sc.endStep();
		return ;
	}
});

/** initialisation des paramètres utilisés pour la vérification */
ActivInfinitev7.step( {
	stInitVerifBenef : function (ev, sc, st) {
		var data = sc.data;
		ctx.trace.infoTxt(ctx.dataF.contratCourantCMU.dataLocale.numeroContratIndiv + ' - Début - Etape stInitVerifBenef');
		ActivInfinitev7.pInfoRo.wait(function (ev) {
			data.indiceBenef = 0;
			data.somBenef = ActivInfinitev7.pInfoRo.oTypeAssure.count();
			data.contratProlonge = false;
			data.ASSPRITermine = false;
			data.assureValid = false;
			sc.endStep();
			return ;
		});
	}
});

/** début de la vérification */
ActivInfinitev7.step( {
	stVerifBenefCMU : function (ev, sc, st) {
		var data = sc.data;
		//début du step
		ctx.trace.infoTxt(ctx.dataF.contratCourantCMU.dataLocale.numeroContratIndiv + ' - Début - Etape stVerifBenefCMU - beneficiaire numéro: ' + data.indiceBenef);
		sc.endStep();
		return ;
	}
});



ActivInfinitev7.step( {
	stLireBenefInfinite : function (ev, sc, st) {
		var data = sc.data;
		ctx.trace.infoTxt(ctx.dataF.contratCourantCMU.dataLocale.numeroContratIndiv + ' - Début - Etape stLireBenefInfinite');
		data.benefCourantInfinite = ActivInfinitev7.pInfoRo.oTypeAssure.i(data.indiceBenef);
		data.typeAssure = benefCourantInfinite.get();
		data.etatCourant = ActivInfinitev7.pInfoRo.oEtatProduit.i(data.indiceBenef).get();
		data.rangeAssure = ActivInfinitev7.pInfoRo.oRangeAssure.i(data.indiceBenef).get();
		sc.endStep();
		return ;
	}
});


/** lire le benef local qui a le meme type que le benef Infinite (on récupère la première instance si on a plusieurs) si aucune données dispo ==> stProchainBenefCMU dans le meme contrat */
ActivInfinitev7.step( {
	stLireBenefLocal: function (ev, sc, st) {
		var data = sc.data;
		ctx.trace.infoTxt(ctx.dataF.contratCourantCMU.dataLocale.numeroContratIndiv + ' - Début - Etape stLireBenefLocal');
		ctx.dataF.CMUtemp_contractF = {};
		for (var i in ctx.dataF.contratCourantCMU.dataLocale.dictContratsCourantCMU) {
			if (ctx.dataF.contratCourantCMU.dataLocale.dictContratsCourantCMU[i].type === data.typeAssure) {
				//return beneficiaries[i];
				ctx.dataF.CMUtemp_contractF = ctx.dataF.contratCourantCMU.dataLocale.dictContratsCourantCMU[i];
			}
		}
		if(!ctx.dataF.CMUtemp_contractF){
			sc.endStep(ActivInfinitev7.steps.stBenefCMUSuivant);
			return;
		}else{
			sc.endStep();
		  return ;
		}
	}
});


/** Description */
ActivInfinitev7.step({ stVerifValiditeRange: function(ev, sc, st) {
	var data = sc.data;
	ctx.trace.infoTxt(ctx.dataF.contratCourantCMU.dataLocale.numeroContratIndiv + ' - Début - Etape stVerifValiditeRange');
	//déclaration du tableau de correspondance
	var correspondenceRange = {
		ASSPRI: ['1'],
		CONJOI: ['11'],
		ENFANT: ['21', '22', '23', '24', '25', '26', '27', '28', '29']
	};
	var tabRang = correspondenceRange[data.typeAssure];
	if(correspondenceRange){
		for (var i in correspondenceRange){
			if(tabRange[i] === data.rangeAssure){
				//cohérence entre les rangs 
				ctx.trace.infoTxt(ctx.dataF.contratCourantCMU.dataLocale.numeroContratIndiv + ' - les rangs sont cohérents');
				sc.endStep();
	      return;
			}
		}
		//incoherence entre les rangs
		ctx.trace.infoTxt(ctx.dataF.contratCourantCMU.dataLocale.numeroContratIndiv + ' - incohérece entre les rangs');
		ctx.dataF.contratCourantCMU.notes.commentContract = 'Revoir centre: Incohérence entre les rangs et type d\'assuré';
		ctx.dataF.statistiquesF.countCaseBackToCenter += 1;
		//ctx.dataF.contratCourantCMU.notes.statusContract = //  ctx.excelHelper.constants.status.Fail;
		ctx.dataF.FinCMUProcessus = true;
		sc.endStep(ActivInfinitev7.steps.stBenefCMUSuivant);
		return;
	}
	
}});


/** Description */
ActivInfinitev7.step({ stBenefPrinciTermineAutresBenefonTermines : function(ev, sc, st) {
	var data = sc.data;
	ctx.trace.infoTxt(ctx.dataF.contratCourantCMU.dataLocale.numeroContratIndiv + ' - Début - Etape stBenefPrinciTermineAutresBenefonTermines');
	
	var constantes = {
		ASSPRI: 'ASSPRI',
		produitValid: 'VA',
		produitTermine : 'RA'
	};
	
	if(data.data.typeAssure === constantes.ASSPRI){
		data.ASSPRITermine = (data.etatCourant === constantes.produitTermine);
	}else if(data.etatCourant === constantes.produitValid){
		data.assureValid = true;	
	}
	
	if(data.ASSPRITermine && data.assureValid){
		ctx.trace.infoTxt(ctx.dataF.contratCourantCMU.dataLocale.numeroContratIndiv + ' - ASSPRI est terminé mais un ou plusieurs autres beneficiaries e sont pas terminé(s)');
		ctx.dataF.contratCourantCMU.notes.commentContract = 'Revoir centre: L\'assuré principal est radié, mais un ou plusieurs bénéficiaire ne sont pas radié pour CMU';
		ctx.dataF.statistiquesF.countCaseBackToCenter += 1;
		//ctx.dataF.contratCourantCMU.notes.statusContract = //  ctx.excelHelper.constants.status.Fail;
		ctx.dataF.FinCMUProcessus = true;
		sc.endStep(ActivInfinitev7.steps.stBenefCMUSuivant);
		return;
	}else{
		sc.endStep();
		return;
	}
}});


/** Description */
ActivInfinitev7.step({ stLireDateFinEffetInfinite: function(ev, sc, st) {
	var data = sc.data;
	ctx.trace.infoTxt(ctx.dataF.contratCourantCMU.dataLocale.numeroContratIndiv + ' - Début - Etape stLireDateFinEffetInfinite');
	var infiniteLignesSituationParticuliere = ActivInfinitev7.pInfoRo.oCodeProduit.getAll();
	var dateFinEffet;
	for (var i in infiniteLignesSituationParticuliere){
		if(infiniteLignesSituationParticuliere[i] === ctx.configF.scenario.CMU){
			var dateCourante = ctx.string.trim( ActivInfinitev7.pInfoRo.oDateFinEffetProduit.i(i).get());
			if(dateCourante === ''){
				continue;
			}
			dateCourante = ctx.date.parseToDate(currentDate);
			if(dateFinEffet === undefined || ctx.date.isBefore(dateFinEffet, dateCourante)){
				 dateFinEffet = dateCourante;
			}
		}
	}
	data.dateFinEffetInfinite = dateFinEffet;
	sc.endStep();
	return;
}});


/** Description */
ActivInfinitev7.step({ stVerifDateFinEffetInfinite : function(ev, sc, st) {
	var data = sc.data;
	ctx.trace.infoTxt(ctx.dataF.contratCourantCMU.dataLocale.numeroContratIndiv + ' - Début - Etape stVerifDateFinEffetInfinite');
	
	if(!data.dateEndEffectInfinite){
		ctx.trace.infoTxt(ctx.dataF.contratCourantCMU.dataLocale.numeroContratIndiv+ ' - Date fin effet CMU non trouvé');
		ctx.dataF.contratCourantCMU.notes.commentContract = 'Revoir centre: Aucune date de fin d\'effet n\'a été trouvé pour le produit CMU';
		//ctx.dataF.contratCourantCMU.notes.statusContract = //  ctx.excelHelper.constants.status.Fail;
		ctx.dataF.FinCMUProcessus = true;
		sc.endStep(ActivInfinitev7.steps.stBenefCMUSuivant);
		return;
	}else{
	  sc.endStep();
	  return;
	}
}});



/** vérifier si la date infinite est après la date Excel ==> si oui fin checkbenef*/
ActivInfinitev7.step({ stVerifOrdreSurDateInfiniteEtDateExcel: function(ev, sc, st) {
	var data = sc.data;

	sc.endStep();
	return;
}});


/** Description */
ActivInfinitev7.step({ stVerfiIOrdreSurDateBenefEtDateASSPRI: function(ev, sc, st) {
	var data = sc.data;
	
	sc.endStep();
	return;
}});


/** mise à juor des attribus et rebouclage sur le step stVerifBenefCMU */
ActivInfinitev7.step( {
	stBenefCMUSuivant : function (ev, sc, st) {
		var data = sc.data;
		ctx.trace.infoTxt(ctx.dataF.contratCourantCMU.dataLocale.numeroContratIndiv + ' - Début - Etape stBenefCMUSuivant');
		if (data.indiceBenef === data.somBenef - 1) {
			if (data.contratProlonge) {
//				return ctx.endScenario(sc, ActivInfinitev7.pInfoRo);  ==> a voir
			}
//			return sc.endStep(ActivInfinitev7.steps.navigateToProductList);
			sc.endStep(ActivInfinitev7.steps.stNavigationListeProduitCMU);
			return;
		}

		data.indiceBenef += 1;
		ActivInfinitev7.pInfoRo.oTypeAssure.i(data.indiceBenef).click();
		ActivInfinitev7.pInfoRo.events.LOAD.wait(function(){
			sc.endStep(ActivInfinitev7.steps.stVerifBenefCMU);
			return;
		});
	
	}
});


/** Description */
ActivInfinitev7.step( { stFinScVerifContratCMU : function (ev, sc, st) {
		var data = sc.data;

		//retour au dashboard
		
		sc.endScenario();
		return ;
	}
});

