ActivInfinitev7.scenario({ checkContract: function(ev, sc) {
	var data = sc.data;
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
	sc.step(ActivInfinitev7.steps.checkProductList);
	sc.step(ActivInfinitev7.steps.manageDataProductList);
	sc.step(ActivInfinitev7.steps.endCheckContract);
}});

ActivInfinitev7.step({ initializeCheckContract: function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - START - checkContract - ' + ctx.config.getCodeScenarioACS());
	sc.endStep();
}});

ActivInfinitev7.step({ navigateToSynthesis : function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - navigateToSynthesis');

	function navigateToSynthesisInjection() {
		setTimeout(function() {
			window.location.href = '/mdg/Go.do?id=ACW1&action=afficherContrat';
		}, 1500);
	};
	
	ActivInfinitev7.pDashboard.injectFunction(navigateToSynthesisInjection);
	ActivInfinitev7.pDashboard.execScript('navigateToSynthesisInjection()');
	ActivInfinitev7.pSynthesis.wait(function() {
		sc.endStep();
	});
}});

ActivInfinitev7.step({ searchBenefInSynthesis : function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - searchBenefInSynthesis');
	ActivInfinitev7.pSynthesis.oTypeIdentification.set('PEPE'); // Select "Personne" on list
	ActivInfinitev7.pSynthesis.oBenefIdentification.set(sc.data.contract.insuredIdentifiant);
	ActivInfinitev7.pSynthesis.btSearch.click();
	ActivInfinitev7.pSynthesis.events.UNLOAD.on(function() {
		ActivInfinitev7.pSynthesis.events.LOAD.on(function() {
			sc.endStep();
		});
	});
}});

ActivInfinitev7.step({ checkSynthesis : function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - checkSynthesis');
	
	if (ActivInfinitev7.pSynthesis.oIndividualContract.i(0).get() === "Aucune donnée disponible dans le tableau") {
		ctx.trace.writeInfo(sc.data.contract.individualContract + ' - END SCENARIO - benef id not found');
		sc.data.commentContract = 'Le numéro de personne assuré n\'existe pas (' + sc.data.contract.insuredIdentifiant + ') - page synthèse';
		sc.data.statusContract = ctx.excelHelper.constants.status.Fail;
		ctx.scenarioHelper.goHome(function() {
			sc.endScenario();
		});
		return;
	}
	
	var countOpenContractLists = 0;
	var isOpenCurrentContract = false;
	var dateEndCurrentContract;
	
	for (var index in ActivInfinitev7.pSynthesis.oIndividualContract.getAll()) {
		var endDate = ActivInfinitev7.pSynthesis.oDateEnd.i(index).get();

		// Get individual contract in tooltip on i (get only number in tooltip, represent mostly individual contract)
		var idRow = ActivInfinitev7.pSynthesis.oIndividualContract.i(index).scriptItem({ id: null });
		var isEndDateEmpty = ((endDate === undefined) || (ctx.string.trim(endDate) === '')) 

		if (isEndDateEmpty) {
			countOpenContractLists += 1;
		}
		
		if (isCurrentIndividualContractTooltip(idRow, sc.data.contract.individualContract)) {
			isOpenCurrentContract = isEndDateEmpty;
			dateEndCurrentContract = isEndDateEmpty ? undefined : ctx.date.parseToDate(endDate);
		}
	}
	
	if (countOpenContractLists > 1) {
		ctx.trace.writeInfo(sc.data.contract.individualContract + ' - END SCENARIO - multiple contract open');
		sc.data.commentContract = 'Plusieurs contrats sont ouverts pour la personne - page synthèse';
		sc.data.statusContract = ctx.excelHelper.constants.status.Fail;
		ctx.scenarioHelper.goHome(function() {
			sc.endScenario();
		});
	} else if (countOpenContractLists === 1 && isOpenCurrentContract) {
		ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - checkSynthesis - One contract open and it\'s current contract');
		ctx.scenarioHelper.goHome(function() {
			sc.endStep();
		});
	}
	else if (countOpenContractLists === 0 && dateEndCurrentContract !== undefined && String(sc.data.contract.ACSCertificateEndDate) === String(dateEndCurrentContract)) {
		ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - checkSynthesis - All contract close and current contract correspond with date (outputDate: ' + sc.data.contract.ACSCertificateEndDate + ' / WebsiteDate: ' + dateEndCurrentContract + ' )');
		ctx.scenarioHelper.goHome(function() {
			sc.endStep();
		});
	} else {
		ctx.trace.writeInfo(sc.data.contract.individualContract + ' - END SCENARIO - does not under any cases');
		sc.data.commentContract = 'Ne rentre dans aucun cas - page synthèse';
		sc.data.statusContract = ctx.excelHelper.constants.status.Fail;
		ctx.scenarioHelper.goHome(function() {
			sc.endScenario();
		});
	}
}});

ActivInfinitev7.step({ navigateToConsultation : function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - navigateToConsultation');
	
	function navigateToConsultation() {
		setTimeout(function() {
			window.location.href = '/mdg/Go.do?id=ACCO03STSO';
		}, 1500);
	};
	
	ActivInfinitev7.pDashboard.injectFunction(navigateToConsultation);
	ActivInfinitev7.pDashboard.execScript('navigateToConsultation()');
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
		
		sc.data.commentContract = 'Contrat trouvé \n';
		sc.data.statusContract = ctx.excelHelper.constants.status.Success;
		
		ActivInfinitev7.pTerminatedContractFo.btNavigateBlockNote.click();
		ActivInfinitev7.pBlockNotes.wait(function() {
			sc.endStep();
		});
	});
	
	ActivInfinitev7.pSearchContractIndiv.events.UNLOAD.on(function() {
		ActivInfinitev7.pSearchContractIndiv.events.LOAD.on(function() {
			var message = ctx.scenarioHelper.withEmptyMessagesPopup(ctx.scenarioHelper.getMessagesPopup());
			ctx.trace.writeInfo(sc.data.contract.individualContract + ' - END SCENARIO - contract not found');
			sc.data.commentContract = message + '\n';
			sc.data.statusContract = ctx.excelHelper.constants.status.Fail;
			ctx.scenarioHelper.goHome(function() {
				sc.endScenario();
			});
		});
	});
}});

ActivInfinitev7.step({ checkBlockNote: function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - checkBlockNote');
	
	var contentBlockNote = ActivInfinitev7.pBlockNotes.oContentBlockNote.get();
	if (ctx.string.trim(contentBlockNote) !== '') {
		ctx.trace.writeInfo(sc.data.contract.individualContract + ' - END SCENARIO - block note not empty');
		sc.data.commentContract = 'Bloc note non vide, contenu : \n' + contentBlockNote + ' \n';
		sc.data.statusContract = ctx.excelHelper.constants.status.Fail;
		ctx.scenarioHelper.goHome(function() {
			sc.endScenario();
		});
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
		ctx.trace.writeInfo(sc.data.contract.individualContract + ' - END SCENARIO - contract hasn\'t year difference');
		sc.data.commentContract = 'La durée du contrat n\'est pas d\'un an \n';
		sc.data.statusContract = ctx.excelHelper.constants.status.Fail;
		ctx.scenarioHelper.goHome(function() {
			sc.endScenario();
		});
		return;
	}
	
	ActivInfinitev7.pCertificateHelpCS.btProductList.click();
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
		sc.data.dataBenef.push(GetDataProduct(nameBenef));
		sc.data.indexBenef += 1;
		sc.endStep(ActivInfinitev7.steps.checkProductList);
		return;
	}
	
	nameBenefElement.click();
	
	ActivInfinitev7.pProductList.events.UNLOAD.on(function() {
		ActivInfinitev7.pProductList.events.LOAD.on(function() {
			sc.data.dataBenef.push(GetDataProduct(nameBenef));
			sc.data.indexBenef += 1;
			sc.endStep(ActivInfinitev7.steps.checkProductList);
		});
	});
}});

ActivInfinitev7.step({ manageDataProductList : function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - manageDataProductList');
	
	var tempEndDate;
	
	for (var index in sc.data.dataBenef) {
		var benef = sc.data.dataBenef[index];
		tempEndDate = tempEndDate || benef.endDateProduct;

		// Need to add one day, Infinite have one day early
		if (benef.endDateProduct !== undefined && !ctx.date.isEqual(ctx.date.addDay(benef.endDateProduct, 1), new Date(sc.data.contract.ACSCertificateEndDate))) {	
			ctx.trace.writeInfo(sc.data.contract.individualContract + ' - END SCENARIO - not end date found');
			sc.data.commentContract = 'Pas de date de fin trouvée ou date différente \n';
			sc.data.statusContract = ctx.excelHelper.constants.status.Fail;
			ctx.scenarioHelper.goHome(function() {
				sc.endScenario();
			});
			return;
		}
		
		if (benef.endDateProduct !== undefined && !ctx.date.isEqual(tempEndDate, benef.endDateProduct)) {
			ctx.trace.writeInfo(sc.data.contract.individualContract + ' - END SCENARIO - not same end date for all');
			sc.data.commentContract = 'Les produits n\'ont pas tous la même date de fin \n';
			sc.data.statusContract = ctx.excelHelper.constants.status.Fail;
			ctx.scenarioHelper.goHome(function() {
				sc.endScenario();
			});
			return;
		}
	}
	
	sc.data.commentContract += (sc.data.dataBenef.count === 1 ) ? 'Cas simple \n' : 'Cas complexe \n';
	sc.data.statusContract = ctx.excelHelper.constants.status.Success;
	
	ctx.scenarioHelper.goHome(function() {
		sc.endStep();
	});
}});
	
ActivInfinitev7.step({ endCheckContract : function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - endSearchContract');
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - END - searchContract - ' + ctx.config.getCodeScenarioACS());
	sc.endStep();
}});

function isCurrentIndividualContractTooltip(idRow, individualContract) {
	
	function getValueToolTipSynthesis(idRow) {
		return $('tr[id="' + idRow + '"] td:nth-child(2) i').tooltipster('content');
	};
	
	ActivInfinitev7.pSynthesis.injectFunction(getValueToolTipSynthesis);
	var content = ActivInfinitev7.pSynthesis.evalScript('getValueToolTipSynthesis(' + idRow + ')');
	
	var pattern = /\d+/g;
	var result = content.match(pattern);
	for (var index = 0; index < result.length; index++) {
		if (result[index] === individualContract) {
			return true;
		}
	}
	return false;
}

function GetDataProduct(nameBenef) {
	
	var data = [];
		
	for (var indexProduct in ActivInfinitev7.pProductList.oCodeProduct.getAll()) {
		var codeProduct = ctx.string.trim(ActivInfinitev7.pProductList.oCodeProduct.i(indexProduct).get());
		var endDateProduct = ctx.string.trim(ActivInfinitev7.pProductList.oEndDateProduct.i(indexProduct).get());
		endDateProduct = (endDateProduct !== '' ? ctx.date.parseToDate(endDateProduct) : undefined)
		
		data.push({nameBenef: nameBenef, codeProduct: codeProduct, endDateProduct: endDateProduct });
	}
		
	return data;
}
