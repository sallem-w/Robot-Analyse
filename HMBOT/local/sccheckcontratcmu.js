
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
		sc.step(ActivInfinitev7.steps.stInitContributionCMU);
		sc.step(ActivInfinitev7.steps.stVerifContributionCMU); //du scénario 	ACS
		sc.step(ActivInfinitev7.steps.stContratCMUtermine); // stToTerminated
		sc.step(ActivInfinitev7.steps.stProduitCMUSuivant);
		sc.step(ActivInfinitev7.steps.stFinScVerifContratCMU);

	}
});


/** Description */
ActivInfinitev7.step( {
	stInitScVerifContratCMU : function (ev, sc, st) {
		var data = sc.data;
		ctx.trace.infoTxt(data.contratCourantCMU.dataLocale.numeroContratIndiv + ' - Début - scénario scVerifContrat');
		sc.endStep();
		return ;
	}
});

/** navigation au ab de bord Choisir menu consultation */
ActivInfinitev7.step( {
	stNavigationConsultationCMU : function (ev, sc, st) {
		var data = sc.data;
		ctx.traceF.infoTxt(data.contratCourantCMU.dataLocale.numeroContratIndiv + ' - Début - Etape stNavigationConsultationCMU');
		ActivInfinitev7.pTabDeBord.wait(function () {
			ActivInfinitev7.pTabDeBord.btConsultation.click();
			sc.endStep();
			return ;
		});
	}
});

/** recherche du contrat cmu */
ActivInfinitev7.step( {
	stRecherContratIndivCMU : function (ev, sc, st) {
		var data = sc.data;
		ctx.traceF.infoTxt(data.contratCourantCMU.dataLocale.numeroContratIndiv + ' - Début - Etape stRecherContratIndivCMU ');

		st.onTimeout(10000, function (sc, st) {

			ctx.traceF.errorTxt(data.currentContractACS.localData.numContratIndiv + 'TimeOut -  search contract ');
			data.currentContractACS.notes.commentContract = 'Revoir centre: Erreur recherche contrat : Contrat non Accessible ';
			data.currentContractACS.notes.statusContract = ctx.excelF.constantes.status.Echec;
			data.currentContractACS.states.exitACSProcess = true;
			ActivInfinitev7.pTabDeBord.start(data.webData.dashboardURL);
			ActivInfinitev7.pTabDeBord.wait(function (ev) {
				sc.endScenario();
			});
		});
		st.onError(function (sc, st, ex) {

			ctx.traceF.errorTxt(data.currentContractACS.localData.numeroContratIndiv + 'OnError - error search contract ');
			data.currentContractACS.notes.commentContract = 'Revoir centre: Erreur recherche contrat : ';
			data.currentContractACS.notes.statusContract = ctx.excelF.constantes.status.Echec;
			data.currentContractACS.states.exitACSProcess = true;
			ActivInfinitev7.pTabDeBord.start(data.webData.dashboardURL);
			ActivInfinitev7.pTabDeBord.wait(function (ev) {
				sc.endScenario();
			});
		});
		ActivInfinitev7.pRecherContratIndiv.wait(function () {
			ActivInfinitev7.pRecherContratIndiv.oContratIndiv.set(data.contratCourantCMU.dataLocale.numeroContratIndiv);
			ActivInfinitev7.pRecherContratIndiv.btRecherche.click();
			sc.endStep();
			return ;
		});
		var contratTrouveListener, contratNonTrouveListener;
		contratNonTrouveListener = ActivInfinitev7.pContratIndivNonTrouv.wait(function () {
			var msgErreur = ActivInfinitev7.pContratIndivNonTrouv.titreErreur.get().trim();
			ctx.traceFerrorTxt(data.contratCourantCMU.dataLocale.numeroContratIndiv + ' - erreur recherche contrat : ' + msgErreur);
			data.contratCourantCMU.notes.commentContract = 'Revoir centre: Erreur recherche contrat : ' + msgErreur;
			data.contratCourantCMU.notes.statusContract = ctx.excelF.constantes.status.Echec;
			ctx.off(contratTrouveListener);
			ActivInfinitev7.pTabDeBord.start(data.webData.tableauDeBordURL);
			ActivInfinitev7.pTabDeBord.wait(function (ev) {
				sc.endScenario();
			});
		});
		contratTrouveListener = ActivInfinitev7.pContratTrouve.wait(function () {
			ctx.traceF.infoTxt(data.contratCourantCMU.dataLocale.numeroContratIndiv + ' - contract trouve');
			data.contratCourantCMU.notes.statusContract = ctx.excelF.constantes.status.Succes;
			ctx.off(contratNonTrouveListener);
			sc.endStep();
			return ;
		});
	}
});


/** click sur le bouton info RO */
ActivInfinitev7.step( {
	stNavigationInfoRo : function (ev, sc, st) {
		var data = sc.data;
		ctx.traceF.infoTxt(data.contratCourantCMU.dataLocale.numeroContratIndiv + ' - Début - Etape stNavigationInfoRo ');
		ActivInfinitev7.pContratTrouve.btIdentAssures.click();
		sc.endStep();
		return ;
	}
});

/** choisir option btInfoRO */
ActivInfinitev7.step( {
	stInitAffichageInforRO : function (ev, sc, st) {
		var data = sc.data;
		ctx.trace.infoTxt(data.contratCourantCMU.dataLocale.numeroContratIndiv + ' - Début - Etape stInitAffichageInforRO');
		ActivInfinitev7.pIdentAssures.wait(function (ev) {
			ActivInfinitev7.pIdentAssures.btInfoRo.click();
			sc.endStep();
		  return ;
		});
		
	}
});

/** initialisation des paramètres utilisés pour la vérification */
ActivInfinitev7.step( {
	stInitVerifBenef : function (ev, sc, st) {
		var data = sc.data;
		ctx.trace.infoTxt(data.contratCourantCMU.dataLocale.numeroContratIndiv + ' - Début - Etape stInitVerifBenef');
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
		ctx.trace.infoTxt(data.contratCourantCMU.dataLocale.numeroContratIndiv + ' - Début - Etape stVerifBenefCMU - beneficiaire numéro: ' + data.indiceBenef);
		sc.endStep();
		return ;
	}
});

/** Description */ //ok
ActivInfinitev7.step( {
	stLireBenefInfinite : function (ev, sc, st) {
		var data = sc.data;
		ctx.traceF.infoTxt(data.contratCourantCMU.dataLocale.numeroContratIndiv + ' - Début - Etape stLireBenefInfinite');
		data.benefCourantInfinite = ActivInfinitev7.pInfoRo.oTypeAssure.i(data.indiceBenef);
		data.typeAssure = data.benefCourantInfinite.get();
		data.etatCourant = ActivInfinitev7.pInfoRo.oEtatProduit.i(data.indiceBenef).get();
		data.rangeAssure = ActivInfinitev7.pInfoRo.oRangeAssure.i(data.indiceBenef).get();
		sc.endStep();
		return ;
	}
});

//ok
/** lire le benef local qui a le meme type que le benef Infinite (on récupère la première instance si on a plusieurs) si aucune données dispo ==> stProchainBenefCMU dans le meme contrat */
// retoure un résultat globale
ActivInfinitev7.step( {
	stLireBenefLocal: function (ev, sc, st) {
		var data = sc.data;
		ctx.traceF.infoTxt(data.contratCourantCMU.dataLocale.numeroContratIndiv + ' - Début - Etape stLireBenefLocal');
		for (var i in data.contratCourantCMU.dataLocale.dictContratsCourantCMU) {
			if (data.contratCourantCMU.dataLocale.dictContratsCourantCMU[i].type === data.typeAssure) {
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
	}
});

/** Description */ //ok
ActivInfinitev7.step( {
	stVerifValiditeRange: function (ev, sc, st) {
		var data = sc.data;
		ctx.traceF.infoTxt(ctx.dataF.contratCourantCMU.dataLocale.numeroContratIndiv + ' - Début - Etape stVerifValiditeRange');
		//déclaration du tableau de correspondance
		var tabRange = ctx.configF.correspondenceRange[data.typeAssure];
		if (tabRange) {
			for (var i in tabRange) {
				if (tabRange[i] === data.rangeAssure) {
					//cohérence entre les rangs 
					ctx.traceF.infoTxt(ctx.dataF.contratCourantCMU.dataLocale.numeroContratIndiv + ' - les rangs sont cohérents');
					sc.endStep();
					return ;
				}
				//incoherence entre les rangs
				ctx.traceF.infoTxt(data.contratCourantCMU.dataLocale.numeroContratIndiv + ' - incohérece entre les rangs');
				data.contratCourantCMU.notes.commentContract = 'Revoir centre: Incohérence entre les rangs et type d\'assuré';
				data.statistiquesF.nbCasRevoirCentre += 1;
				data.contratCourantCMU.notes.statusContract = ctx.excelF.constantes.status.Echec;
				data.FinCMUProcessus = true;
				sc.endStep(ActivInfinitev7.steps.stBenefCMUSuivant);
				return ;
			}

		}
	}
});

/** Description */ //ok
ActivInfinitev7.step( {
	stBenefPrinciTermineAutresBenefNonTermines : function (ev, sc, st) {
		var data = sc.data;
		ctx.traceF.infoTxt(data.contratCourantCMU.dataLocale.numeroContratIndiv + ' - Début - Etape stBenefPrinciTermineAutresBenefNonTermines');

		if (data.typeAssure === ctx.configF.constantes.ASSPRI) {
			data.ASSPRITermine = (data.etatCourant === ctx.configF.constantes.produitTermine);
		}else if (data.etatCourant === ctx.configF.constantes.produitValide) {
			data.assureValid = true;
		}

		if (data.ASSPRITermine && data.assureValide) {
			ctx.traceF.infoTxt(data.contratCourantCMU.dataLocale.numeroContratIndiv + ' - ASSPRI est terminé mais un ou plusieurs autres beneficiaries e sont pas terminé(s)');
			data.contratCourantCMU.notes.commentContract = 'Revoir centre: L\'assuré principal est radié, mais un ou plusieurs bénéficiaire ne sont pas radié pour CMU';
			data.statistiquesF.nbCasRevoirCentre += 1;
			data.contratCourantCMU.notes.statusContract = ctx.excelF.constantes.status.Echec;
			data.FinCMUProcessus = true;
			sc.endStep(ActivInfinitev7.steps.stBenefCMUSuivant);
			return ;
		}else {
			sc.endStep();
			return ;
		}
	}
});

/** Description */ //ok
ActivInfinitev7.step( {
	stLireDateFinEffetInfinite: function (ev, sc, st) {
		var data = sc.data;
		ctx.traceF.infoTxt(ctx.dataF.contratCourantCMU.dataLocale.numeroContratIndiv + ' - Début - Etape stLireDateFinEffetInfinite');
		var infiniteLignesSituationParticuliere = ActivInfinitev7.pInfoRo.oCodeProduit.getAll();
		var dateFinEffet;
		for (var i in infiniteLignesSituationParticuliere) {
			if (infiniteLignesSituationParticuliere[i] === ctx.configF.scenario.CMU) {
				var dateCourante = ctx.string.trim(ActivInfinitev7.pInfoRo.oDateFinEffetProduit.i(i).get());
				if (dateCourante === '') {
					continue ;
				}
				dateCourante = ctx.date.parseToDate(dateCourante);
				if (dateFinEffet === undefined || ctx.date.isBefore(dateFinEffet, dateCourante)) {
					dateFinEffet = dateCourante;
				}
			}
			data.dateFinEffetInfinite = dateFinEffet;
			sc.endStep();
			return ;
		}
	}
});

/** Description */ //ok
ActivInfinitev7.step( {
	stVerifDateFinEffetInfinite : function (ev, sc, st) {
		var data = sc.data;
		ctx.traceF.infoTxt(data.contratCourantCMU.dataLocale.numeroContratIndiv + ' - Début - Etape stVerifDateFinEffetInfinite');

		if (!data.dateEndEffectInfinite) {
			ctx.traceF.infoTxt(data.contratCourantCMU.dataLocale.numeroContratIndiv + ' - Date fin effet CMU non trouvé');
			data.contratCourantCMU.notes.commentContract = 'Revoir centre: Aucune date de fin d\'effet n\'a été trouvé pour le produit CMU';
			data.contratCourantCMU.notes.statusContract = ctx.excelF.constantes.status.Echec;
			data.FinCMUProcessus = true;
			sc.endStep(ActivInfinitev7.steps.stBenefCMUSuivant);
			return ;
		}else {
			sc.endStep();
			return ;
		}
	}
});


//ok
/** vérifier si la date infinite est après la date Excel ==> si oui fin checkbenef*/
ActivInfinitev7.step( {
	stVerifOrdreSurDateInfiniteEtDateExcel: function (ev, sc, st) {
		var data = sc.data;
		//début du step
		ctx.traceF.infoTxt(data.contratCourantCMU.dataLocale.numeroContratIndiv + ' - Début - Etape stVerifOrdreSurDateInfiniteEtDateExcel - beneficiaire numéro: ' + data.indiceBenef);
		sc.endStep();
		return ;
	}
});

/** Description */ //ok
ActivInfinitev7.step( {
	stVerfiIOrdreSurDateBenefEtDateASSPRI: function (ev, sc, st) {
		var data = sc.data;

		sc.endStep();
		return ;
	}
});


/** mise à juor des attribus et rebouclage sur le step stVerifBenefCMU */
ActivInfinitev7.step( {
	stBenefCMUSuivant : function (ev, sc, st) {
		var data = sc.data;
		ctx.traceF.infoTxt(data.contratCourantCMU.dataLocale.numeroContratIndiv + ' - Début - Etape stBenefCMUSuivant');
		if (data.indiceBenef === data.somBenef - 1) {
			if (data.contratProlonge) {
				//				return ctx.endScenario(sc, ActivInfinitev7.pInfoRo);  ==> a voir
			}
			return sc.endStep(ActivInfinitev7.steps.stNavigationListeProduitCMU);
			sc.endStep(ActivInfinitev7.steps.stNavigationListeProduitCMU);
			return ;
		}

		data.indiceBenef += 1;
		ActivInfinitev7.pInfoRo.oTypeAssure.i(data.indiceBenef).click();
		ActivInfinitev7.pInfoRo.events.LOAD.wait(function () {
			sc.endStep(ActivInfinitev7.steps.stVerifBenefCMU);
			return ;
		});

	}
});

/** Description */
ActivInfinitev7.step( {
	stNavigationListeProduitCMU : function (ev, sc, st) {
		var data = sc.data;
		ctx.traceF.infoTxt(data.contratCourantCMU.dataLocale.numeroContratIndiv + ' - Début - Etape stNavigationListeProduitCMU');
		ActivInfinitev7.pInfoRo.btNavigListeProduits.click();
		sc.endStep();
		return ;
	}
});

/** Description */
ActivInfinitev7.step( {
	stListeProduitCMU : function (ev, sc, st) {
		var data = sc.data;
		ctx.traceF.infoTxt(data.contratCourantCMU.dataLocale.numeroContratIndiv + ' - Début - Etape stListeProduitCMU');
		ActivInfinitev7.pProdGarantCons.wait(function () {
			data.indiceBenef = 0;
			data.somBenef = ActivInfinitev7.pInfoRo.oTypeAssure.count();
			if (data.somBenef === 0) {
				ctx.traceF.infoTxt(data.contratCourantCMU.dataLocale.numeroContratIndiv + ' Tous les produits sont terminés');
				data.contratCourantCMU.notes.commentContract = 'Déjà fait';
				data.contratCourantCMU.notes.statusContract = ctx.excelF.constantes.status.Succes;
				sc.endStep(ActivInfinitev7.steps.stBenefCMUSuivant);
				return ;
			}else {
				sc.endStep();
				return ;
			}
		});
	}
});


/** recuperer le contrat excel et la liste */
ActivInfinitev7.step( {
	stInitVerifEtatProduit: function (ev, sc, st) {
		var data = sc.data;
		ctx.traceF.infoTxt(data.contratCourantCMU.dataLocale.numeroContratIndiv + ' - Début - Etape stInitVerifEtatProduitCMU');
		var benefInfiniteCourant = ActivInfinitev7.pListeProduits.oTypeBenef.i(data.indiceBenef);
		var typeAssure = benefInfiniteCourant.get();
		//var 
		//rechercher le beneficiareCourat dans le contrat Excel
		for (var i in data.contratCourantCMU.dataLocale.dictContratsCourantCMU) {
			if (data.contratCourantCMU.dataLocale.dictContratsCourantCMU[i].type === data.typeAssure) {
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

	}
});


/** Description */
ActivInfinitev7.step( {
	stVerifEtatProduitCMU: function (ev, sc, st) {
		var data = sc.data;
		ctx.traceF.infoTxt(data.contratCourantCMU.dataLocale.numeroContratIndiv + ' - Début - Etape stVerifEtatProduitCMU');
		var verif = false;
		var tabStatus = [];
		var listeProduit = ActivInfinitev7.pProdGarantCons.oCodeProduit.getAll();
		for (var i in listeProduit) {
			if (ActivInfinitev7.pProdGarantCons.oCodeProduit.i(i).get() === data.CMUtemp_contractF.codeProduit) {
				tabStatus.push(ActivInfinitev7.pProdGarantCons.oEtatProduit.i(i).get());
			}
		}
		for (var i in tabStatus) {
			if (tabStatus[i] === ctx.configF.constantes.produitValide) {
				verif = true;
			}
		}
		if (tabStatus.length> 0 && verif) {
			ctx.traceF.infoTxt(data.contratCourantCMU.dataLocale.numeroContratIndiv + 'un ou plusieurs produits sont valides, on continue la vérification');
			//goToContribution
			sc.step(ActivInfinitev7.steps.stContribution);
			return ;
		}else {
			sc.endStep(ActivInfinitev7.steps.stProduitCMUSuivant);
			return ;
		}
	}
});



/** Description */
ActivInfinitev7.step( {
	stInitContributionCMU : function (ev, sc, st) {
		var data = sc.data;
		ctx.traceF.infoTxt(data.contratCourantCMU.dataLocale.numeroContratIndiv + ' - Début - Etape stInitContributionCMU');
		if (!data.scenarioConfig.controlContribution) {
			sc.step(ActivInfinitev7.steps.stContratCMUtermine);
			return ;
		}else {
			ActivInfinitev7.pProdGarantCons.btVisuCotisation.click();
			sc.endStep();
			return ;
		}
	}
});

/* la meme etape que le chekc contribution de sc ACS*/
ActivInfinitev7.step( {
	stVerifContributionCMU : function (ev, sc, st) {
		var data = sc.data;
		ctx.traceF.infoTxt(data.contratCourantCMU.dataLocale.numeroContratIndiv + ' - Début - Etape stVerifContributionCMU');
		ActivInfinitev7.pVisuCptCotisantCons.wait(function (ev) {
			if (ActivInfinitev7.pVisuCptCotisantCons.oDateEch.count() === 1 &&
			ctx.string.trim(ActivInfinitev7.pVisuCptCotisantCons.oDateEch.i(0).get()) === "Aucune donnée disponible dans le tableau") {
				sc.endStep();
				return ;
			}
			else {
				//var compareDate = ctx.date.addMonth(ctx.date.now(), - 1);
				var compareDate = ctx.dateF.ajouterJour(ctx.getDate(), 0, 1, 0);
				var isValidContribution = false;

				for (var index in ActivInfinitev7.pVisuCptCotisantCons.oDateEch.getAll()) {
					var dateEch = ctx.string.trim(ActivInfinitev7.pVisuCptCotisantCons.oDateEch.i(index).get());
					var balanceEch = ctx.string.trim(ActivInfinitev7.pVisuCptCotisantCons.oBalanceEch.i(index).get());

					if (ctx.date.parseToDate(dateEch) <= compareDate) {
						isValidContribution = (parseFloat(balanceEch) < 1)
					break;
					}
				}
				if (!isValidContribution) {
					var message = data.currentContractACS.localData.individualContractNumber + ' - END SCENARIO - balance not up to date';
					ctx.traceFwriteInfo(message);
					data.currentContractACS.notes.commentContract = 'Revoir centre: Solde comptable non à jour';
				  data.contratCourantCMU.notes.statusContract = ctx.excelF.constantes.status.Echec;
					data.currentContractACS.states.exitACSProcess = true;
					ActivInfinitev7.pDashboard.start(data.webData.dashboardURL);
					ActivInfinitev7.pDashboard.wait(function (ev) {
						sc.endStep(ActivInfinitev7.steps.stEndCheckContract);
						return ;
					});
				}
				else {
					sc.endStep();
					return ;
				}
			}
		});

	}
});

/** Description */ //stToTerminated
ActivInfinitev7.step( {
	stContratCMUtermine : function (ev, sc, st) {
		var data = sc.data;
		ctx.traceF.infoTxt(data.contratCourantCMU.dataLocale.numeroContratIndiv + ' - Début - Etape stContratCMUtermine');
		data.contratCourantCMU.notes.commentContract = 'À résilier';
		data.toTerminated = true; //une variable ajoutée à l'objet data(c'est pas un flag)
	  data.contratCourantCMU.notes.statusContract = ctx.excelF.constantes.status.Succes;
		data.statistiquesF.nbCasRevoirCentre += 1;
		sc.endStep();
		return ;
	}
});


/** Description */
ActivInfinitev7.step( {
	stProduitCMUSuivant : function (ev, sc, st) {
		var data = sc.data;
		ctx.traceF.infoTxt(data.contratCourantCMU.dataLocale.numeroContratIndiv + ' - Début - Etape stProduitCMUSuivant');
		data.indiceBenef += 1;
		if (data.indiceBenef >= data.somBenef) {

			ctx.traceF.infoTxt(data.contratCourantCMU.dataLocale.numeroContratIndiv + 'tous les produits sont terminés');
			data.contratCourantCMU.notes.commentContract = 'Déjà fait';
			data.contratCourantCMU.notes.statusContract = ctx.excelF.constantes.status.Succes;
			//sc.endStep(ActivInfinitev7.steps.stInitVerifEtatProduit); //reveir sur la page pProductList  ############################################################## à revoir
			return ;
		}else {
			ActivInfinitev7.pListeProduits.oTypeBenef.i(sc.data.indexBenef).click();
			ActivInfinitev7.pListeProduits.events.LOAD.once(function () {
				sc.endStep(ActivInfinitev7.steps.stVerifEtatProduitCMU);
				return ;
			});
		}

	}
});

/** Description */
ActivInfinitev7.step( {
	stFinScVerifContratCMU : function (ev, sc, st) {
		var data = sc.data;

		ctx.traceF.infoTxt(data.contratCourantCMU.dataLocale.numeroContratIndiv + ' - Début - Etape stFinScVerifContratCMU');
		ctx.trace.infoTxt(data.contratCourantCMU.dataLocale.numeroContratIndiv + ' - Fin recherce contrat ');
		//retour au dashboard
		ActivInfinitev7.pDashboard.start(data.webData.dashboardURL);
		sc.endScenario();
		return ;
	}
});

