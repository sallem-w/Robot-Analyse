ActivInfinite.scenario({ searchContract: function(ev, sc) {
	var data = sc.data;
	sc.onTimeout(ctx.config.getTimeout(), function(sc, st) { sc.endScenario();	});
	sc.onError(function(sc, st, ex) { sc.endScenario();	});
	sc.setMode(e.scenario.mode.noStartIfRunning);
	sc.step(ActivInfinite.steps.initializePage);
	sc.step(ActivInfinite.steps.navigateToSynthesis);
	sc.step(ActivInfinite.steps.searchBenefInSynthesis);
	sc.step(ActivInfinite.steps.checkSynthesis);
	sc.step(ActivInfinite.steps.navigateToConsultation);
	sc.step(ActivInfinite.steps.searchIndividualContract);
	sc.step(ActivInfinite.steps.checkBlockNote);
	sc.step(ActivInfinite.steps.checkCertificateHelpCS);
	sc.step(ActivInfinite.steps.checkProductList);
	sc.step(ActivInfinite.steps.checkContribution);
	sc.step(ActivInfinite.steps.searchHistory);
	sc.step(ActivInfinite.steps.checkHistory);
	sc.step(ActivInfinite.steps.end);
}});

ActivInfinite.step({ initializePage: function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - START - searchContract - ' + ctx.config.getCodeScenarioACS());
	sc.data.config = ctx.config.getConfigACS();
	sc.data.configExcel = sc.data.config.excel;
	sc.endStep();
}});

ActivInfinite.step({ navigateToSynthesis : function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - navigateToSynthesis');

function navigateToSynthesisInjection() {
		setTimeout(function() {
			$('a[menuINFcl="0"]').mouseover();
			$('a[menuINFcl="1"]').mouseover();
			$('a[menuINFcl="2"]').mouseover();
			$('a[menuINFcl="3"]').click();
		}, 1500);
	};
	
	ActivInfinite.pDashboard.injectFunction(navigateToSynthesisInjection);
	ActivInfinite.pDashboard.execScript('navigateToSynthesisInjection()');
	ActivInfinite.pSynthesisSearch.wait(function() {
		sc.endStep();
	});
}});

ActivInfinite.step({ searchBenefInSynthesis : function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - searchBenefInSynthesis');
	ActivInfinite.pSynthesisSearch.oTypeIdentification.set('PEPE'); // Select "Personne" on list
	ActivInfinite.pSynthesisSearch.oBenefIdentification.set(sc.data.contract.insuredIdentifiant);
	ActivInfinite.pSynthesisSearch.btSearch.click();
	ActivInfinite.pSynthesisContract.wait(function() {
		sc.endStep();
	});
}});

ActivInfinite.step({ checkSynthesis : function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - checkSynthesis');
	
	var countOpenContractLists = 0;
	var isOpenCurrentContract = false;
	var dateEndCurrentContract;
	
	var dateEndLists = ActivInfinite.pSynthesisContract.oDateEnd.getAll();
	
	for (var index in ActivInfinite.pSynthesisContract.oIndividualContract.getAll()) {
		var endDate = dateEndLists[index];

		// Get individual contract in alt on img (get only number in alt, represent mostly individual contract)
		var row = ActivInfinite.pSynthesisContract.oIndividualContract.i(index);
		var isEndDateEmpty = ((endDate === undefined) || (ctx.string.trim(endDate) === '')) 

		if (isEndDateEmpty) {
			countOpenContractLists += 1;
		}
		
		if (isCurrentIndividualContract(row, sc.data.contract.individualContract)) {
			isOpenCurrentContract = isEndDateEmpty;
			dateEndCurrentContract = isEndDateEmpty ? undefined : ctx.date.parseToDate(endDate);
		}
	}
	
	if (countOpenContractLists > 1) {
		ctx.trace.writeInfo(sc.data.contract.individualContract + ' - END SCENARIO - multiple contract open');
		sc.data.commentContract = 'Plusieurs contrats sont ouverts pour la personne - page synthèse';
		sc.data.statusContract = ctx.excelHelper.constants.status.Fail;
		sc.endScenario();
	} else if (countOpenContractLists === 1 && isOpenCurrentContract) {
		ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - checkSynthesis - One contract open and it\'s current contract');
		sc.endStep();
	}
	else if (countOpenContractLists === 0 && dateEndCurrentContract !== undefined && String(sc.data.contract.ACSCertificateEndDate) === String(dateEndCurrentContract)) {
		ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - checkSynthesis - All contract close and current contract correspond with date (outputDate: ' + sc.data.contract.ACSCertificateEndDate + ' / WebsiteDate: ' + dateEndCurrentContract + ' )');
		sc.endStep();
	} else {
		ctx.trace.writeInfo(sc.data.contract.individualContract + ' - END SCENARIO - does not under any cases');
		sc.data.commentContract = 'Ne rentre dans aucun cas - page synthèse';
		sc.data.statusContract = ctx.excelHelper.constants.status.Fail;
		sc.endScenario();
	}
}});

ActivInfinite.step({ navigateToConsultation : function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - navigateToConsultation');

	function navigateToConsulationInjection() {
		setTimeout(function() {
			$('a[menuINFcl="0"]').mouseover();
			$('a[menuinfcl="41"]').mouseover();
			$('a[menuinfcl="42"]').click();
		}, 1500);
	};
	
	ActivInfinite.pDashboard.injectFunction(navigateToConsulationInjection);
	ActivInfinite.pDashboard.execScript('navigateToConsulationInjection()');
	ActivInfinite.pConsultContratIndiv.wait(function() {
		sc.endStep();
	});
}});

ActivInfinite.step({ searchIndividualContract: function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - searchIndividualContract');
	
	ActivInfinite.pConsultContratIndiv.oIndividualContract.set(sc.data.contract.individualContract);
	ActivInfinite.pConsultContratIndiv.oDateContract.set(ctx.date.formatDDMMYYYY(ctx.date.addYear(new Date(), sc.data.config.addYearSearchContract)));
	ActivInfinite.pConsultContratIndiv.btSearch.click();

	ActivInfinite.pContratIndivFound.events.LOAD.on(function() {
		ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - contract found');
		
		sc.data.commentContract = 'Contrat trouvé \n';
		sc.data.statusContract = ctx.excelHelper.constants.status.Success;
		
		ActivInfinite.pContratIndivFound.btNavigateBlockNote.click();
		ActivInfinite.pBlockNotes.wait(function() {
			sc.endStep();
		});
	});
	
	ActivInfinite.pContractIndivNotFoun.events.LOAD.on(function() {
		ctx.trace.writeInfo(sc.data.contract.individualContract + ' - END SCENARIO - contract not found');
		
		sc.data.commentContract = ActivInfinite.pContractIndivNotFoun.oDetailError.get() + '\n';
		sc.data.statusContract = ctx.excelHelper.constants.status.Fail;
		ActivInfinite.pContractIndivNotFoun.oBtClose.click();
		sc.endScenario();
	});

}});

ActivInfinite.step({ checkBlockNote: function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - checkBlockNote');
	
	var contentBlockNote = ActivInfinite.pBlockNotes.oContentBlockNote.get();
	if (ctx.string.trim(contentBlockNote) !== '') {
		ctx.trace.writeInfo(sc.data.contract.individualContract + ' - END SCENARIO - block note not empty');
		sc.data.commentContract = 'Bloc note non vide, contenu : \n' + contentBlockNote + ' \n';
		sc.data.statusContract = ctx.excelHelper.constants.status.Fail;
		ActivInfinite.pBlockNotes.oBtClose.click();
		sc.endScenario();
		return;
	}
	
	ActivInfinite.pBlockNotes.oNodeInsuredIdent.click();
	ActivInfinite.pBlockNotes.btHelpCSCertificate.click();
	ActivInfinite.pCertificateHelpCS.wait(function() {
		sc.endStep();
	});
}});

ActivInfinite.step({ checkCertificateHelpCS: function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - checkCertificateHelpCS');
	
	var isCertificateValid = false;
	
	for (var index in ActivInfinite.pCertificateHelpCS.oType.getAll()) {
		var type = ctx.string.trim(ActivInfinite.pCertificateHelpCS.oType.i(index).get());
		
		if (type !== 'Attestat° CPAM') {
			continue;
		}
		
		var startDate = ctx.date.parseToDate(ctx.string.trim(ActivInfinite.pCertificateHelpCS.oStartDate.i(index).get()));
		var endDate = ctx.date.addDay(ctx.date.parseToDate(ctx.string.trim(ActivInfinite.pCertificateHelpCS.oEndDate.i(index).get())), 1);

		// same date with only one year difference
		if (startDate.getDate() === endDate.getDate() && startDate.getMonth() === endDate.getMonth() && (endDate.getFullYear() - startDate.getFullYear()) === 1) {
			isCertificateValid = true;	
		}
		
		break;
	}
	
	if (!isCertificateValid) {
		ctx.trace.writeInfo(sc.data.contract.individualContract + ' - END SCENARIO - contract hasn\'t year difference');
		sc.data.commentContract = 'La durée du contrat n\'est pas d\'un ans \n';
		sc.data.statusContract = ctx.excelHelper.constants.status.Fail;
		ActivInfinite.pCertificateHelpCS.oBtClose.click();
		sc.endScenario();
		return;
	}
	
	ActivInfinite.pCertificateHelpCS.btProductList.click();
	ActivInfinite.pProductList.wait(function() {
		sc.endStep();
	});
}});

ActivInfinite.step({ checkProductList : function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - checkProductList');

	var tempEndDate;
	
	for (var index in ActivInfinite.pProductList.oRowInformation.getAll()) {
		var currentRow = cleanRowHtml(ActivInfinite.pProductList.oRowInformation.i(index).innerHtml());
			
		if (isRowProduct(currentRow)) {
			
			var currentEndDate = getEndDate(currentRow);
			tempEndDate = tempEndDate || currentEndDate;
			
			if (!isCodeProductFound(currentRow, sc.data.contract.subscribedCodeProduct)) {
				ctx.trace.writeInfo(sc.data.contract.individualContract + ' - END SCENARIO - multiple code product found');
				sc.data.commentContract = 'Plusieurs codes produits trouvés \n';
				sc.data.statusContract = ctx.excelHelper.constants.status.Fail;
				ActivInfinite.pProductList.oBtClose.click();
				sc.endScenario();
				return;
			}
			else if (!isEndDateFound(currentRow, new Date(sc.data.contract.ACSCertificateEndDate))) {	
				ctx.trace.writeInfo(sc.data.contract.individualContract + ' - END SCENARIO - not end date found');
				sc.data.commentContract = 'Pas de date de fin trouvé ou date différente \n';
				sc.data.statusContract = ctx.excelHelper.constants.status.Fail;
				ActivInfinite.pProductList.oBtClose.click();
				sc.endScenario();
				return;
			}
			else if (currentEndDate !== undefined && !ctx.date.isEqual(tempEndDate, currentEndDate)) {
				ctx.trace.writeInfo(sc.data.contract.individualContract + ' - END SCENARIO - not same end date for all');
				sc.data.commentContract = 'Ils n\'ont pas tous la même date de fin \n';
				sc.data.statusContract = ctx.excelHelper.constants.status.Fail;
				ActivInfinite.pProductList.oBtClose.click();
				sc.endScenario();
				return;
			}
		}
	}
	
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - checkProductList - Simple case');
	sc.data.commentContract += 'Cas simple \n';
	sc.data.statusContract = ctx.excelHelper.constants.status.Success;
		
	ActivInfinite.pProductList.btVisuContribution.click();
	ActivInfinite.pContribution.wait(function() {
		sc.endStep();
	});
}});

ActivInfinite.step({ checkContribution : function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - checkContribution');
	
	var compareDate = ctx.date.addMonth(ctx.date.now(), -1);
	var isValidContribution = false
	
	for (var index in ActivInfinite.pContribution.oDateEch.getAll()) {
		var dateEch = ctx.string.trim(ActivInfinite.pContribution.oDateEch.i(index).get());
		var balanceEch = ctx.string.trim(ActivInfinite.pContribution.oBalanceEch.i(index).get());
		
		if (ctx.date.parseToDate(dateEch) <= compareDate) {
			isValidContribution = (parseFloat(balanceEch) < 1)
			break;
		}
	}
	
	if (!isValidContribution) {
		ctx.trace.writeInfo(sc.data.contract.individualContract + ' - END SCENARIO - balance not up to date');
		sc.data.commentContract = 'Solde comptable non à jour \n';
		sc.data.statusContract = ctx.excelHelper.constants.status.Fail;
		ActivInfinite.pContribution.oBtClose.click();
		sc.endScenario();
		return;
	}
	
	ActivInfinite.pContribution.btHistoOperation.click();
	ActivInfinite.pHistoOperationSearch.wait(function() {
		sc.endStep();
	});
}});

ActivInfinite.step({ searchHistory : function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - searchHistory');
	
	ActivInfinite.pHistoOperationSearch.oPending.click();
	ActivInfinite.pHistoOperationSearch.oCanceled.click();
	ActivInfinite.pHistoOperationSearch.oRefuse.click();
	ActivInfinite.pHistoOperationSearch.oCalcul.click();
	ActivInfinite.pHistoOperationSearch.oFlux.click();
	ActivInfinite.pHistoOperationSearch.oEdition.click();
	ActivInfinite.pHistoOperationSearch.oWithoutEffet.click();
		
	ActivInfinite.pHistoOperationSearch.btSearch.click();
	ActivInfinite.pHistoOperationSearch.events.UNLOAD.on(function() {
		ActivInfinite.pHistoOperationSearch.events.LOAD.on(function() {
			sc.endStep();
		});
	});
}});

ActivInfinite.step({ checkHistory : function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - checkHistory');
	
	var isContractTerminated = false
	var isContractWithAccesSante = false
		
	var compareDate = ctx.date.addDay(new Date(sc.data.contract.ACSCertificateEndDate), 1);
	
	for (var index in ActivInfinite.pHistoOperationSearch.oOperationLabel.getAll()) {
		var operationLabelLists = ActivInfinite.pHistoOperationSearch.oOperationLabel.i(index);
		for (var indexPaging in operationLabelLists.getAll()) {
			var operationLabel = ctx.string.trim(operationLabelLists.i(indexPaging).get());
			var effectDate = ctx.date.parseToDate(ctx.string.trim(ActivInfinite.pHistoOperationSearch.oEffectDate.i(index).i(indexPaging).get()));
			var contexte = ctx.string.trim(ActivInfinite.pHistoOperationSearch.oContexte.i(index).i(indexPaging).get());
			var isSameDate = ctx.date.formatDDMMYYYY(effectDate) === ctx.date.formatDDMMYYYY(compareDate);
			
			if (operationLabel === 'Résiliation CI' && contexte === 'Fin ACS' && isSameDate) {
				isContractTerminated = true;	
			}
			
			if (operationLabel === 'Changement de couv' && contexte === 'STD' && isSameDate) {
				isContractWithAccesSante = true;
			}
		}
	}
	
	if (isContractTerminated && isContractWithAccesSante) {
		ctx.trace.writeInfo(sc.data.contract.individualContract + ' - END SCENARIO - two scenario found');
		sc.data.commentContract = 'Le contract est résilié et en plus a un produit accès santé radié \n';
		sc.data.statusContract = ctx.excelHelper.constants.status.Fail;
		ActivInfinite.pHistoOperationSearch.oBtClose.click();
		sc.endScenario();
		return;
	}
	
	if (isContractTerminated) {
		ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - contract terminated');
		sc.data.commentContract += 'Cas d\'un contract résilié \n';
		sc.data.statusContract = ctx.excelHelper.constants.status.Success;
		ActivInfinite.pHistoOperationSearch.oBtClose.click();
		
		// TODO start new scenario
		
		sc.endStep();
		return;
	}
	
	if (isContractWithAccesSante) {
		ctx.trace.writeInfo(sc.data.contract.individualContract + ' - END SCENARIO - contract with product accès santé');
		sc.data.commentContract = 'Cas d\'un contrat non résilié mais avec le produit Accès Santé radié \n';
		sc.data.statusContract = ctx.excelHelper.constants.status.Fail;
		ActivInfinite.pHistoOperationSearch.oBtClose.click();
		sc.endScenario();
		return;
	}
	
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - END SCENARIO - Contract is in no case - history verification');
	sc.data.commentContract = 'Ne rentre dans aucun lors de la vérification de l\'historique \n';
	sc.data.statusContract = ctx.excelHelper.constants.status.Fail;
	ActivInfinite.pHistoOperationSearch.oBtClose.click();
	sc.endScenario();
}});

ActivInfinite.step({ end : function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - end');
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - END - searchContract - ' + ctx.config.getCodeScenarioACS());
	sc.endStep();
}});

function isRowProduct(strProduct) {
	return (strProduct.indexOf('Produit :') !== -1)
}

function isCodeProductFound(strProduct, codeProduct) {
	return (strProduct.indexOf(codeProduct) !== -1)
}

function isEndDateFound(strProduct, endDate) {
	var endDateIndex = strProduct.indexOf('au');
	// Need to add one day, Infinite have one day early
	return ((endDateIndex !== -1)  && (strProduct.indexOf(ctx.date.formatDDMMYYYY(ctx.date.addDay(endDate, 1)), endDateIndex) !== -1))
}

function isCurrentIndividualContract(imageHTML, individualContract) {
	var alt = imageHTML.scriptItem({ alt: null });
	var pattern = /\d+/g;
	var result = alt.match(pattern);
	for (var index = 0; index < result.length; index++) {
		if (result[index] === individualContract) {
			return true;
		}
	}
	return false;
}

function getCodeProduct(strProduct) {
	return ctx.string.trim(strProduct.spli('-')[1]);
}

function getEndDate(strProduct) {
	var endDateIndex = strProduct.indexOf('au');
	if (endDateIndex === -1) {
		return undefined;
	}
	
	var endDate = ctx.date.parseToDate(ctx.string.trim(strProduct.substring(endDateIndex + 2)));
	return endDate;
}

function cleanRowHtml(innerHtml) {
	return ctx.string.trim(innerHtml.split('</B>')[0].replace('<B>', ''));
}
