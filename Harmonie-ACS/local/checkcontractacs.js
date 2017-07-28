(function () {	
	ActivInfinitev7.scenario({ checkContractACS: function(ev, sc) {
		sc.data.codeScenario = ctx.config.ACS;
		sc.onTimeout(ctx.config.getTimeout(), function(sc, st) {
			ctx.trace.writeError(sc.data.contract.individualContract + ' Timeout aborting current scenario');
			st.endStep(ActivInfinitev7.steps.abort);
		});
		sc.onError(function(sc, st, ex) {
			ctx.trace.writeError(sc.data.contract.individualContract + ex + ' aborting current scenario');
			st.endStep(ActivInfinitev7.steps.abort);
		});
		sc.setMode(e.scenario.mode.noStartIfRunning);
		sc.step(ActivInfinitev7.steps.initializeCheckContract);
		sc.step(ActivInfinitev7.steps.navigateToSynthesis);
		sc.step(ActivInfinitev7.steps.searchBenefInSynthesis);
		sc.step(ActivInfinitev7.steps.checkSynthesis);
		sc.step(ActivInfinitev7.steps.navigateToConsultation);
		sc.step(ActivInfinitev7.steps.searchIndividualContract);
		sc.step(ActivInfinitev7.steps.acsIndividualContractNotFound);
		sc.step(ActivInfinitev7.steps.acsIndividualContractFound);
		sc.step(ActivInfinitev7.steps.checkBlockNote);
		sc.step(ActivInfinitev7.steps.gotToHelpCsCertificate);
		sc.step(ActivInfinitev7.steps.checkCertificateHelpCS);
		sc.step(ActivInfinitev7.steps.conditionControlContribution);
		sc.step(ActivInfinitev7.steps.checkContribution);
		sc.step(ActivInfinitev7.steps.goToProductList);
		sc.step(ActivInfinitev7.steps.initProductLoop);
		sc.step(ActivInfinitev7.steps.checkProductList);
		sc.step(ActivInfinitev7.steps.manageDataProductList);
		sc.step(ActivInfinitev7.steps.endCheckContract);
		sc.step(ActivInfinitev7.steps.abort);
	}});

	ActivInfinitev7.step({ initializeCheckContract: function(ev, sc, st) {
		ctx.trace.writeInfo(sc.data.contract.individualContract + ' - START - checkContract - ' + sc.data.codeScenario);
		return sc.endStep();
	}});

	ActivInfinitev7.step({ searchBenefInSynthesis : function(ev, sc, st) {
		ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - searchBenefInSynthesis');
		ctx.setValue(ActivInfinitev7.pSynthesisSearch.oTypeIdentification, 'PEPE'); // Select "Personne" on list
		ctx.setValue(ActivInfinitev7.pSynthesisSearch.oBenefIdentification, sc.data.contract.insuredIdentifiant);
		ActivInfinitev7.pSynthesisSearch.btSearch.click();
		ActivInfinitev7.pSynthesis.wait(function() {
			return sc.endStep();
		});
	}});

	ActivInfinitev7.step({ navigateToConsultation : function(ev, sc, st) {
		ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - navigateToConsultation');
		ActivInfinitev7.pDashboard.btConsultation.click();
		ActivInfinitev7.pSearchContractIndiv.wait(function() {
			return sc.endStep();
		});
	}});

	ActivInfinitev7.step({ searchIndividualContract : function(ev, sc, st) {
		ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - searchIndividualContract');
		
		ctx.scenarioHelper.searchContract(sc, ctx.date.formatDDMMYYYY(ctx.date.addYear(new Date(), sc.data.config.addYearSearchContract)), function () {
			sc.endStep(ActivInfinitev7.steps.acsIndividualContractFound);
		}, function () {
			sc.endStep(ActivInfinitev7.steps.acsIndividualContractNotFound);
		});
	}});

	ActivInfinitev7.step({ acsIndividualContractNotFound : function(ev, sc, st) {
		ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - contract not found');
		var message = sc.data.contract.individualContract + ' - END SCENARIO - contract not found';
	 	var comment = 'Revoir centre : ' +  ctx.scenarioHelper.withEmptyMessagesPopup(ctx.scenarioHelper.getMessagesPopup());
	 	return ctx.endScenario(sc, message, comment);
	} });

	ActivInfinitev7.step({ acsIndividualContractFound : function(ev, sc, st) {
		ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - contract found');
		
		sc.data.commentContract = 'Contrat trouvé';
		sc.data.statusContract = ctx.excelHelper.constants.status.Success;
		
		ActivInfinitev7.pTerminatedContractFo.btNavigateBlockNote.click();
		ActivInfinitev7.pBlockNotes.wait(function() {
			return sc.endStep();
		});
	} });

	ActivInfinitev7.step({ checkBlockNote: function(ev, sc, st) {
		ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - checkBlockNote');
		
		var contentBlockNote = ActivInfinitev7.pBlockNotes.oContentBlockNote.exist() && ActivInfinitev7.pBlockNotes.oContentBlockNote.get();
		if (ctx.string.trim(contentBlockNote) !== '' && sc.data.config.controlBlockNote) {
			var message = sc.data.contract.individualContract + ' - END SCENARIO - block note not empty';
			var comment = 'Revoir centre: Bloc note non vide, contenu : ' + contentBlockNote;
			return ctx.endScenario(sc, message, comment);
		}
		
		ActivInfinitev7.pBlockNotes.btInsuredIdentPage.click();
		ActivInfinitev7.pInsuredIdent.wait(function() {
			return sc.endStep();
		});
	}});

	ActivInfinitev7.step({ gotToHelpCsCertificate: function(ev, sc, st) {
		// Sometimes we have a "Confirmation" POPUP, but we are in consultation mode... (bug Infinite)
		ctx.scenarioHelper.forceClick(ActivInfinitev7.pInsuredIdent.btHelpCSCertificate);
		ActivInfinitev7.pCertificateHelpCS.wait(function() {
			return sc.endStep();
		});
	} });

	ActivInfinitev7.step({ checkCertificateHelpCS: function(ev, sc, st) {
		ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - checkCertificateHelpCS');

		var allTypes = ActivInfinitev7.pCertificateHelpCS.oType.getAll(true) || [];
		var isCertificateValid = _.reduce(function (acc, type, index) {
			if (ctx.string.trim(type) !== 'Attestat° CPAM' || acc) {
				return acc;
			}

			var startDate = ctx.date.parseToDate(ctx.string.trim(ActivInfinitev7.pCertificateHelpCS.oStartDate.i(index).get()));
			var endDate = ctx.date.addDay(ctx.date.parseToDate(ctx.string.trim(ActivInfinitev7.pCertificateHelpCS.oEndDate.i(index).get())), 1);

			return ctx.date.isOnlyOneYearDifference(startDate, endDate);
		}, false, allTypes);

		if (!isCertificateValid) {
			var message = sc.data.contract.individualContract + ' - END SCENARIO - contract hasn\'t year difference';
			var comment = 'Revoir centre: La durée du contrat n\'est pas d\'un an';
			return ctx.endScenario(sc, message, comment);
		}

		ActivInfinitev7.pCertificateHelpCS.btVisuCotisation.click();
		ActivInfinitev7.pContribution.wait(function() {
			return sc.endStep();
		});
	}});

	ActivInfinitev7.step({ conditionControlContribution : function(ev, sc, st) {
		ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - conditionControlContribution');
		if (sc.data.config.controlContribution) {
			return sc.endStep();
		}
		
		return sc.endStep(ActivInfinitev7.steps.goToProductList);
	}});

	ActivInfinitev7.step({ checkContribution : function(ev, sc, st) {
		ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - checkContribution');
		
		if (ActivInfinitev7.pContribution.oDateEch.count() === 1 &&
			  ctx.string.trim(ActivInfinitev7.pContribution.oDateEch.i(0).get()) === "Aucune donnée disponible dans le tableau") {
			return sc.endStep();
		}

		var compareDate = ctx.date.addMonth(ctx.date.now(), -1);
		
		var allDate = _.map(ctx.string.trim, ActivInfinitev7.pContribution.oDateEch.getAll());
		var allBalance = _.map(ctx.string.trim, ActivInfinitev7.pContribution.oBalanceEch.getAll())
					
		var isValidContribution = allDate.reduce(function (acc, dateEch, index) {
			if (acc) return acc;

			var balanceEch = allBalance[index];
			if (ctx.date.parseToDate(dateEch) <= compareDate) {
				return (parseFloat(balanceEch) < 1);
			}

			return acc;
		}, false, allDate);

		if (!isValidContribution) {
			var message = sc.data.contract.individualContract + ' - END SCENARIO - balance not up to date';
			var comment = 'Revoir centre: Solde comptable non à jour';
			return ctx.endScenario(sc, message, comment);
		}

		return sc.endStep();
	}});

	ActivInfinitev7.step({ goToProductList : function(ev, sc, st) {
		ActivInfinitev7.pContribution.btProductList.click();
		ActivInfinitev7.pProductList.wait(function() {
			return sc.endStep();
		});
	}});

	ActivInfinitev7.step({ initProductLoop : function(ev, sc, st) {
		sc.data.indexBenef = 0;
		sc.data.countBenef = ActivInfinitev7.pProductList.oNameBenef.count();
		sc.data.dataBenef = [];
		return sc.endStep();
	} });

	ActivInfinitev7.step({ checkProductList : function(ev, sc, st) {
		ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - checkProductList');
		var nameBenefElement = ActivInfinitev7.pProductList.oNameBenef.i(sc.data.indexBenef);
		var nameBenef = nameBenefElement.get();
		
		sc.data.dataBenef = sc.data.dataBenef.concat(GetDataProductPage(nameBenef));
		sc.data.indexBenef += 1;

		if (sc.data.indexBenef >= sc.data.countBenef) {
			return sc.endStep();
		}
		var nextBenef = ActivInfinitev7.pProductList.oNameBenef.i(sc.data.indexBenef);
		nextBenef.setFocus();
		nextBenef.click();

		return ActivInfinitev7.pProductList.events.LOAD.once(function () {
			return sc.endStep(ActivInfinitev7.steps.checkProductList);
		});
	}});

	ActivInfinitev7.step({ manageDataProductList : function(ev, sc, st) {
		ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - manageDataProductList');
		
		var tempEndDate;
		var allContractSameEndDate = true;
		var validDateCurrentProduct = false;
		
		for (var index in sc.data.dataBenef) {
			var benef = sc.data.dataBenef[index];
			tempEndDate = tempEndDate || benef.endDateProduct;

			// Need to add one day, Infinite have one day early
			if (benef.codeProduct === sc.data.contract.subscribedCodeProduct &&
			  benef.endDateProduct !== undefined && 
			  ctx.date.isEqual(benef.endDateProduct, ctx.date.addDay(new Date(sc.data.contract.ACSCertificateEndDate), 1))) {	
				validDateCurrentProduct = true;
			}
			
			if (benef.endDateProduct !== undefined && !ctx.date.isEqual(tempEndDate, benef.endDateProduct)) {
				allContractSameEndDate = false;
			}
		}
		
		if (allContractSameEndDate && validDateCurrentProduct) {
			sc.data.commentContract = 'Cas d\'un contrat résilié, tous les produits ont la même date de fin --> Faire sans-effet contrat + Changement de couverture + Résiliation programmée'
			sc.data.statusContract = ctx.excelHelper.constants.status.Success;
			sc.data.isContractTerminated = true;
			ctx.trace.writeInfo('All contracts are terminated: going home');
			return ctx.scenarioHelper.goHome(function(error) {
				if (error) {
					return ctx.endScenario(sc, error.message, 'Erreur en essayant de refermer le contrat aprés vérification, merci de communiquer les logs au service technique', 'erreur');
				}
				return sc.endStep();
			});
		} else if (validDateCurrentProduct) {
			sc.data.commentContract = 'Cas d\'un contrat non résilié mais avec le produit Accès Santé radié, tous les produits ne sont pas fermé et le produit courant à la bonne date de fin --> Faire sans-effet produit + Changement couverture produit + Résiliation programmée'
			sc.data.statusContract = ctx.excelHelper.constants.status.Success;
			sc.data.isContractWithProductACS = true;
			ctx.trace.writeInfo('contract not terminated but health access aborted : going home');
			return ctx.scenarioHelper.goHome(function(error) {
				if (error) {
					return ctx.endScenario(sc, error.message, 'Erreur en essayant de refermer le contrat aprés vérification, merci de communiquer les logs au service technique', 'erreur');
				}
				return sc.endStep();
			});
		} else {
			var message = sc.data.contract.individualContract + ' - END SCENARIO - Contract is in no case - product page';
			var comment = 'Revoir centre: Ne rentre dans aucun cas lors de la vérification de de la page produit';
			ctx.trace.writeInfo('contract not in handled case : ending scenario');
			return ctx.endScenario(sc, message, comment);
		}
	}});
		
	ActivInfinitev7.step({ endCheckContract : function(ev, sc, st) {
		ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - endSearchContract');
		ctx.trace.writeInfo(sc.data.contract.individualContract + ' - END - searchContract - ' + sc.data.codeScenario);
		return sc.endScenario();
	}});

	function GetDataProductPage(nameBenef) {
		ctx.setValue(ActivInfinitev7.pProductList.oProductPaging, '100');

		var allProductCode = _.map(ctx.string.trim, ActivInfinitev7.pProductList.oCodeProduct.getAll());
		var allEndDate = _.map(ctx.string.trim, ActivInfinitev7.pProductList.oEndDateProduct.getAll());
		allEndDate = _.map(function (date) {
			return date !== '' ? ctx.date.parseToDate(date) : undefined;
		}, allEndDate);
		
		return _.map(function (codeProduct, index) {
			var endDateProduct = allEndDate[index];
			
			return { nameBenef: nameBenef, codeProduct: codeProduct, endDateProduct: endDateProduct };
		}, allProductCode);		
	}
})();
