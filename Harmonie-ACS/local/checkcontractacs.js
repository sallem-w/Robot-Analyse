ActivInfinitev7.scenario({ checkContract: function(ev, sc) {
	sc.data.codeScenario = ctx.config.ACS;
	sc.onTimeout(ctx.config.getTimeout(), function(sc, st) { sc.endScenario();	});
	sc.onError(function(sc, st, ex) { sc.endScenario();	});
	sc.setMode(e.scenario.mode.noStartIfRunning);
	sc.step(ActivInfinitev7.steps.initializeCheckContract);
	sc.step(ActivInfinitev7.steps.navigateToSynthesis);
	sc.step(ActivInfinitev7.steps.searchBenefInSynthesis);
	sc.step(ActivInfinitev7.steps.checkSynthesis);
	sc.step(ActivInfinitev7.steps.navigateToConsultation);
	sc.step(ActivInfinitev7.steps.searchIndividualContract);
	sc.step(ActivInfinitev7.steps.checkBlockNote);
	sc.step(ActivInfinitev7.steps.checkCertificateHelpCS);
	sc.step(ActivInfinitev7.steps.conditionControlContribution);
	sc.step(ActivInfinitev7.steps.checkContribution);
	sc.step(ActivInfinitev7.steps.goToProductList);
	sc.step(ActivInfinitev7.steps.checkProductList);
	sc.step(ActivInfinitev7.steps.manageDataProductList);
	sc.step(ActivInfinitev7.steps.endCheckContract);
}});

ActivInfinitev7.step({ initializeCheckContract: function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - START - checkContract - ' + sc.data.codeScenario);
	sc.endStep();
}});

ActivInfinitev7.step({ searchBenefInSynthesis : function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - searchBenefInSynthesis');
	ActivInfinitev7.pSynthesisSearch.oTypeIdentification.set('PEPE'); // Select "Personne" on list
	ActivInfinitev7.pSynthesisSearch.oBenefIdentification.set(sc.data.contract.insuredIdentifiant);
	ActivInfinitev7.pSynthesisSearch.btSearch.click();
	ActivInfinitev7.pSynthesis.wait(function() {
		sc.endStep();
	});
}});

ActivInfinitev7.step({ navigateToConsultation : function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - navigateToConsultation');
	ActivInfinitev7.pDashboard.btConsultation.click();
	ActivInfinitev7.pSearchContractIndiv.wait(function() {
		sc.endStep();
	});
}});

ActivInfinitev7.step({ searchIndividualContract : function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - searchIndividualContract');
	
	ActivInfinitev7.pSearchContractIndiv.oIndividualContract.set(sc.data.contract.individualContract);
	ActivInfinitev7.pSearchContractIndiv.oDateContract.set(ctx.date.formatDDMMYYYY(ctx.date.addYear(new Date(), sc.data.config.addYearSearchContract)));
	ActivInfinitev7.pSearchContractIndiv.btSearch.click();
	
	ActivInfinitev7.pTerminatedContractFo.events.LOAD.on(function() {
		ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - contract found');
		
		sc.data.commentContract = 'Contrat trouvé';
		sc.data.statusContract = ctx.excelHelper.constants.status.Success;
		
		ActivInfinitev7.pTerminatedContractFo.btNavigateBlockNote.click();
		ActivInfinitev7.pBlockNotes.wait(function() {
			sc.endStep();
		});
	});
	
	ActivInfinitev7.pSearchContractIndiv.events.UNLOAD.on(function() {
		ActivInfinitev7.pSearchContractIndiv.events.LOAD.on(function() {
			var message = sc.data.contract.individualContract + ' - END SCENARIO - contract not found';
			var comment = 'Revoir centre : ' +  ctx.scenarioHelper.withEmptyMessagesPopup(ctx.scenarioHelper.getMessagesPopup());
			ctx.endScenario(sc, message, comment);
			return;
		});
	});
}});

ActivInfinitev7.step({ checkBlockNote: function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - checkBlockNote');
	
	var contentBlockNote = ActivInfinitev7.pBlockNotes.oContentBlockNote.get();
	if (ctx.string.trim(contentBlockNote) !== '') {
		var message = sc.data.contract.individualContract + ' - END SCENARIO - block note not empty';
		var comment = 'Revoir centre: Bloc note non vide, contenu : ' + contentBlockNote;
		ctx.endScenario(sc, message, comment);
		return;
	}
	
	ActivInfinitev7.pBlockNotes.btInsuredIdentPage.click();
	ActivInfinitev7.pInsuredIdent.wait(function() {
		ActivInfinitev7.pInsuredIdent.btHelpCSCertificate.click();
		ActivInfinitev7.pCertificateHelpCS.wait(function() {
			sc.endStep();
		});
	});
}});

ActivInfinitev7.step({ checkCertificateHelpCS: function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - checkCertificateHelpCS');
	
	var isCertificateValid = false;
	
	for (var index in ActivInfinitev7.pCertificateHelpCS.oType.getAll()) {
		var type = ctx.string.trim(ActivInfinitev7.pCertificateHelpCS.oType.i(index).get());
		
		if (type !== 'Attestat° CPAM') {
			continue;
		}
		
		var startDate = ctx.date.parseToDate(ctx.string.trim(ActivInfinitev7.pCertificateHelpCS.oStartDate.i(index).get()));
		var endDate = ctx.date.addDay(ctx.date.parseToDate(ctx.string.trim(ActivInfinitev7.pCertificateHelpCS.oEndDate.i(index).get())), 1);

		isCertificateValid = ctx.date.isOnlyOneYearDifference(startDate, endDate);
		break;
	}
	
	if (!isCertificateValid) {
		var message = sc.data.contract.individualContract + ' - END SCENARIO - contract hasn\'t year difference';
		var comment = 'Revoir centre: La durée du contrat n\'est pas d\'un an';
		ctx.endScenario(sc, message, comment);
		return;
	}
	
	ActivInfinitev7.pCertificateHelpCS.btVisuCotisation.click();
	ActivInfinitev7.pContribution.wait(function() {
		sc.endStep();
	});
}});

ActivInfinitev7.step({ conditionControlContribution : function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - conditionControlContribution');
	if (sc.data.config.controlContribution) {
		sc.endStep();
		return;
	}
	
	sc.endStep(ActivInfinitev7.steps.goToProductList);
}});

ActivInfinitev7.step({ checkContribution : function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - checkContribution');
	
	if (ActivInfinitev7.pContribution.oDateEch.count() === 1 &&
		  ctx.string.trim(ActivInfinitev7.pContribution.oDateEch.i(0).get()) === "Aucune donnée disponible dans le tableau") {
		sc.endStep();
		return;
	}

	var compareDate = ctx.date.addMonth(ctx.date.now(), -1);
	var isValidContribution = false;
	
	for (var index in ActivInfinitev7.pContribution.oDateEch.getAll()) {
		var dateEch = ctx.string.trim(ActivInfinitev7.pContribution.oDateEch.i(index).get());
		var balanceEch = ctx.string.trim(ActivInfinitev7.pContribution.oBalanceEch.i(index).get());
		
		if (ctx.date.parseToDate(dateEch) <= compareDate) {
			isValidContribution = (parseFloat(balanceEch) < 1)
			break;
		}
	}
	
	if (!isValidContribution) {
		var message = sc.data.contract.individualContract + ' - END SCENARIO - balance not up to date';
		var comment = 'Revoir centre: Solde comptable non à jour';
		ctx.endScenario(sc, message, comment);
		return;
	}
	
	sc.endStep();
}});

ActivInfinitev7.step({ goToProductList : function(ev, sc, st) {
	ActivInfinitev7.pContribution.btProductList.click();
	ActivInfinitev7.pProductList.wait(function() {
		sc.data.indexBenef = 0;
		sc.data.countBenef = ActivInfinitev7.pProductList.oNameBenef.count();
		sc.data.dataBenef = [];
		sc.endStep();
	});
}});

ActivInfinitev7.step({ checkProductList : function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - checkProductList');
	
	if (sc.data.indexBenef === sc.data.countBenef) {
		sc.endStep();
		return;
	}
	
	var nameBenefElement = ActivInfinitev7.pProductList.oNameBenef.i(sc.data.indexBenef);
	var nameBenef = nameBenefElement.get();
	
	if (sc.data.indexBenef === 0) {
		sc.data.dataBenef = sc.data.dataBenef.concat(GetDataProductPage(nameBenef));
		sc.data.indexBenef += 1;
		sc.endStep(ActivInfinitev7.steps.checkProductList);
		return;
	}
	
	nameBenefElement.click();
	
	ActivInfinitev7.pProductList.events.UNLOAD.on(function() {
		ActivInfinitev7.pProductList.events.LOAD.on(function() {
			sc.data.dataBenef = sc.data.dataBenef.concat(GetDataProductPage(nameBenef));
			sc.data.indexBenef += 1;
			sc.endStep(ActivInfinitev7.steps.checkProductList);
		});
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
		ctx.scenarioHelper.goHome(function() {
			sc.endStep();
		});
	}
	else if (validDateCurrentProduct) {
		sc.data.commentContract = 'Cas d\'un contrat non résilié mais avec le produit Accès Santé radié, tous les produits ne sont pas fermé et le produit courant à la bonne date de fin --> Faire sans-effet produit + Changement couverture produit + Résiliation programmée'
		sc.data.statusContract = ctx.excelHelper.constants.status.Success;
		sc.data.isContractWithProductACS = true;
		ctx.scenarioHelper.goHome(function() {
			sc.endStep();
		});
	}
	else {
		var message = sc.data.contract.individualContract + ' - END SCENARIO - Contract is in no case - product page';
		var comment = 'Revoir centre: Ne rentre dans aucun cas lors de la vérification de de la page produit';
		ctx.endScenario(sc, message, comment);
		return;
	}
}});
	
ActivInfinitev7.step({ endCheckContract : function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - endSearchContract');
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - END - searchContract - ' + ctx.config.ACS);
	sc.endStep();
}});

function GetDataProductPage(nameBenef) {
	
	ActivInfinitev7.pProductList.oProductPaging.set('100');
	
	var data = [];
	for (var indexProduct in ActivInfinitev7.pProductList.oCodeProduct.getAll()) {
		var codeProduct = ctx.string.trim(ActivInfinitev7.pProductList.oCodeProduct.i(indexProduct).get());
		var endDateProduct = ctx.string.trim(ActivInfinitev7.pProductList.oEndDateProduct.i(indexProduct).get());
		endDateProduct = (endDateProduct !== '' ? ctx.date.parseToDate(endDateProduct) : undefined)
		
		data.push({nameBenef: nameBenef, codeProduct: codeProduct, endDateProduct: endDateProduct });
	}
		
	return data;
}
