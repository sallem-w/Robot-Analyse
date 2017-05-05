﻿ActivInfinite.scenario({ searchContract: function(ev, sc) {
	var data = sc.data;
	sc.onTimeout(60000, function(sc, st) { sc.endScenario();	});
	sc.onError(function(sc, st, ex) { sc.endScenario();	});
	sc.setMode(e.scenario.mode.noStartIfRunning);
	sc.step(ActivInfinite.steps.initializePage);
	sc.step(ActivInfinite.steps.navigateToConsultation);
	sc.step(ActivInfinite.steps.searchIndividualContract);
	sc.step(ActivInfinite.steps.checkBlockNote);
	sc.step(ActivInfinite.steps.searchBenefInSynthesis);
	sc.step(ActivInfinite.steps.checkSynthesis);
	//sc.step(ActivInfinite.steps.checkProductList);
	sc.step(ActivInfinite.steps.end);
}});

ActivInfinite.step({ initializePage: function(ev, sc, st) {
	sc.data.config = ctx.config.getConfigACS();
	sc.data.configExcel = sc.data.config.excel;
	sc.endStep();
}});

ActivInfinite.step({ navigateToConsultation : function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - START - searchContract - ' + ctx.config.getCodeScenarioACS());
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
	
	ActivInfinite.pBlockNotes.oBtClose.click();
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
	
	var openContractLists = [];
	var isOpenCurrentContract = false;
	var dateEndCurrentContract;
	
	var dateEndLists = ActivInfinite.pSynthesisContract.oDateEnd.getAll();
	
	for (var index in ActivInfinite.pSynthesisContract.oIndividualContract.getAll()) {
		var endDate = dateEndLists[index];

		// Get individual contract in alt on img
		var row = ActivInfinite.pSynthesisContract.oIndividualContract.i(index);
		var individualContract = getIndividualContract(row);
		
		var isEndDateEmpty = ((endDate === undefined) || (ctx.string.trim(endDate) === '')) 
		
		if (isEndDateEmpty) {
			openContractLists.push(individualContract);	
		}
		
		if (sc.data.contract.individualContract === individualContract) {
			isOpenCurrentContract = isEndDateEmpty;
		}
	}
	
	if (openContractLists.length > 1) {
		ctx.trace.writeInfo(sc.data.contract.individualContract + ' - END SCENARIO - multiple contract open');
		sc.data.commentContract = 'Plusieurs contrat sont ouvert pour la personne - page synthèse';
		sc.data.statusContract = ctx.excelHelper.constants.status.Fail;
		sc.endScenario();
		
	} else if (openContractLists.length === 1 && isOpenCurrentContract) {
		ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - checkSynthesis - One contract open and it\'s current contract');
		sc.endStep();

	}
	else if (openContractLists.length === 0 && sc.data.contract.ACSCertificateEndDate === dateEndCurrentContract) {
		ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - checkSynthesis - All contract close and current contract correspond with date (outputDate: ' +sc.data.contract.ACSCertificateEndDate + ' / WebsiteDate: ' + dateEndCurrentContract + ' )');
		sc.endStep();
	
	} else {
		ctx.trace.writeInfo(sc.data.contract.individualContract + ' - END SCENARIO - does not under any cases');
		sc.data.commentContract = 'Ne rentre dans aucun cas - page synthèse';
		sc.data.statusContract = ctx.excelHelper.constants.status.Fail;
		sc.endScenario();
	}
}});

//ActivInfinite.step({ checkProductList : function(ev, sc, st) {
//	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - checkProductList');
//	
//	var productInfoList = ActivInfinite.pProductList.oRowInformation.getAll();
//	var beneficiariesList = ActivInfinite.pProductList.oRowBenef.getAll();
//	for (var i in productInfoList) {
//		var productInfo = productInfoList[i];
//		var benefInfo = beneficiariesList[i];
//		
//		var benefFullName = ctx.string.trim(sc.data.contract.insuredName) + ' ' + ctx.string.trim(sc.data.contract.insuredSurName);
//		if (benefInfo.indexOf(benefFullName) === -1) {
//			continue;
//		}
//	
//		ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - checkProductList - benef found');
//		
//		if (isCodeProductFound(productInfo, sc.data.contract.subscribedCodeProduct)) {
//			ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - checkProductList - code product found');
//			
//			if (isEndDateFound(productInfo, sc.data.contract.ACSCertificateEndDate)) {
//				ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - checkProductList - end date certificate ACS found');
//			}
//		}
//	}
//	
//	ActivInfinite.pProductList.oBtClose.click();
//	sc.endStep();
//}});

ActivInfinite.step({ end : function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - end');
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - END - searchContract - ' + ctx.config.getCodeScenarioACS());
	sc.endStep();
}});


function isCodeProductFound(strProduct, codeProduct) {
	return (strProduct.indexOf(codeProduct) !== -1)
}

function isEndDateFound(strProduct, endDate) {
	var endDateIndex = strProduct.indexOf('au');
	return ((endDateIndex !== -1)  && (strProduct.indexOf(endDate, endDateIndex) !== -1))
}

function getIndividualContract(imageHTML) {
	var alt = imageHTML.scriptItem({ alt: null });
	return alt.match(/\d+/)[0];
}
