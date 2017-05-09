ActivInfinite.scenario({ searchContract: function(ev, sc) {
	var data = sc.data;
	sc.onTimeout(60000, function(sc, st) { sc.endScenario();	});
	sc.onError(function(sc, st, ex) { sc.endScenario();	});
	sc.setMode(e.scenario.mode.noStartIfRunning);
	sc.step(ActivInfinite.steps.initializePage);
	sc.step(ActivInfinite.steps.navigateToSynthesis);
	sc.step(ActivInfinite.steps.searchBenefInSynthesis);
	sc.step(ActivInfinite.steps.checkSynthesis);
	sc.step(ActivInfinite.steps.navigateToConsultation);
	sc.step(ActivInfinite.steps.searchIndividualContract);
	sc.step(ActivInfinite.steps.checkBlockNote);
	sc.step(ActivInfinite.steps.checkProductList);
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
	
	ActivInfinite.pBlockNotes.btProductList.click();
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
			tempEndDate = tempEndDate || currentEndDate
			
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
			else if (currentEndDate !== undefined && tempEndDate !== currentEndDate) {
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
		
	ActivInfinite.pProductList.oBtClose.click();
	sc.endStep();
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