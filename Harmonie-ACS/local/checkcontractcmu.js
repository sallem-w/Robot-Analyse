ActivInfinitev7.scenario({ checkContractCMU: function(ev, sc) {
	sc.data.codeScenario = ctx.config.CMU;
	sc.onTimeout(ctx.config.getTimeout(), function(sc, st) { sc.endScenario(); });
	sc.onError(function(sc, st, ex) {
		ctx.trace.writeError(sc.data.contract.individualContract +  ' - Error undefined');
		sc.data.commentContract = 'Erreur traitement inconnue';
		sc.data.countCaseFailProcessed += 1;
		sc.data.statusContract = ctx.excelHelper.constants.status.Fail;
		sc.endScenario();	
	});
	sc.setMode(e.scenario.mode.clearIfRunning);
	sc.step(ActivInfinitev7.steps.initializeCheckContract);
	sc.step(ActivInfinitev7.steps.navigateToConsultation);
	sc.step(ActivInfinitev7.steps.searchIndividualContractCMU);
	sc.step(ActivInfinitev7.steps.navigateToInfoRo);
	sc.step(ActivInfinitev7.steps.initializeCheckBeneficiaries);
	sc.step(ActivInfinitev7.steps.checkBeneficiaries);
	sc.step(ActivInfinitev7.steps.clickIntoBeneficiary);
	sc.step(ActivInfinitev7.steps.waitForBeneficiarySelection);
	sc.step(ActivInfinitev7.steps.navigateToProductList);
	sc.step(ActivInfinitev7.steps.checkProductState);
	sc.step(ActivInfinitev7.steps.nextProduct);
	sc.step(ActivInfinitev7.steps.waitForProduct);
	sc.step(ActivInfinitev7.steps.goToContribution);
	sc.step(ActivInfinitev7.steps.checkContribution);
	sc.step(ActivInfinitev7.steps.toTerminated);
	sc.step(ActivInfinitev7.steps.closeConsultation);
	sc.step(ActivInfinitev7.steps.endCheckContract);
}});

ActivInfinitev7.step({ searchIndividualContractCMU: function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - searchIndividualContractCMU');
	
	ctx.scenarioHelper.searchContract(sc, function foundCb() {
		sc.endStep();
	}, function notFoundCb() {
		ctx.scenarioHelper.goHome(function() {
			sc.endScenario();
		});
	});
}});

ActivInfinitev7.step({ navigateToInfoRo: function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract +  ' - STEP - navigateToInfoRo');
	ActivInfinitev7.pTerminatedContractFo.btNavigateInsuredIden.click();
	ActivInfinitev7.pInsuredIdent.wait(function() {
		ActivInfinitev7.pInsuredIdent.btInfoRo.click();
		ActivInfinitev7.pInfoRo.wait(function() {
			sc.endStep();
		});
	});
}});

ActivInfinitev7.step({ initializeCheckBeneficiaries: function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract +  ' - STEP - initializeCheckBeneficiaries');
	sc.data.indexBenef = 0;
	sc.data.countBenef = ActivInfinitev7.pInfoRo.oTypeInsured.count();
	sc.data.contractIsProlonged = false;
	sc.data.ASSPRIIsTerminated = false;
	sc.data.insuredIsValid = false;
	sc.endStep();
}});

ActivInfinitev7.step({ checkBeneficiaries: function(ev, sc, st) {
	
	if (sc.data.indexBenef === 0) {
		ctx.trace.writeInfo(sc.data.contract.individualContract +  ' - STEP - checkBeneficiaries');
	}

	var currentBeneficiaryInfinite = ActivInfinitev7.pInfoRo.oTypeInsured.i(sc.data.indexBenef);
	var typeInsured = currentBeneficiaryInfinite.get();
	var currentState = ActivInfinitev7.pInfoRo.oStateProduct.i(sc.data.indexBenef).get();
	var rangeInsured = ActivInfinitev7.pInfoRo.oRangeInsured.i(sc.data.indexBenef).get();

	var insuredInfoExcel = ctx.scenarioHelper.searchInsuredFromType(typeInsured, sc.data.beneficiaries);
	if (!insuredInfoExcel) {
		sc.endStep();
		return;
	}
	
	if (!rangeIsValid(typeInsured, rangeInsured)) {
		ctx.trace.writeInfo(sc.data.contract.individualContract +  ' - Range is not coherent');
		sc.data.commentContract = 'Revoir centre: Incohérence entre les rangs et type d\'assuré';
		sc.data.countCaseBackToCenter += 1;
		sc.data.statusContract = ctx.excelHelper.constants.status.Fail;
		sc.endStep(ActivInfinitev7.steps.closeConsultation);
		return;
	}
	
	if (isASSPRITerminatedAndOtherNotTerminated(sc, typeInsured, currentState)) {
		ctx.trace.writeInfo(sc.data.contract.individualContract +  ' - ASSPRI is terminated but one or more other beneficiaries are not');
		sc.data.commentContract = 'Revoir centre: L\'assuré principal est radié, mais un ou plusieurs bénéficiaire ne sont pas radié pour CMU';
		sc.data.countCaseBackToCenter += 1;
		sc.data.statusContract = ctx.excelHelper.constants.status.Fail;
		sc.endStep(ActivInfinitev7.steps.closeConsultation);
		return;
	}
	
	var dateEndEffectInfinite = getEndEffectInfiniteDate();
	if (!dateEndEffectInfinite) {
		ctx.trace.writeInfo(sc.data.contract.individualContract +  ' - No end effect date found for CMU');
		sc.data.commentContract = 'Revoir centre: Aucune date de fin d\'effet n\'a été trouvé pour le produit CMU';
		sc.data.countCaseBackToCenter += 1;
		sc.data.statusContract = ctx.excelHelper.constants.status.Fail;
		sc.endStep(ActivInfinitev7.steps.closeConsultation);
		return;
	}
	
	//Check if the infinite date is after the input file date
	if (ctx.date.isBefore(ctx.date.parseToDate(String(insuredInfoExcel.particularSituationEndDate)), dateEndEffectInfinite)) {
		ctx.trace.writeInfo(sc.data.contract.individualContract +  ' - Contract prolonged');
		sc.data.commentContract = 'Contrat prolongé';
		sc.data.statusContract = ctx.excelHelper.constants.status.Success;
		sc.data.contractIsProlonged = true;
		sc.endStep();
		return;
	}
	//Check if the beneficiary date is after the asspri date
	if (typeInsured !== ctx.scenarioHelper.constantes.ASSPRI && ctx.date.isBefore(new Date(sc.data.contract.particularSituationEndDate), dateEndEffectInfinite)) {
		ctx.trace.writeInfo(sc.data.contract.individualContract +  ' - Problem date end effect beneficiary');
		sc.data.commentContract = 'Revoir centre: problème sur les dates de fin d\'effet des bénéficiaires';
		sc.data.countCaseBackToCenter += 1;
		sc.data.statusContract = ctx.excelHelper.constants.status.Fail;
		sc.endStep(ActivInfinitev7.steps.closeConsultation);
		return;
	}
	
	sc.endStep();
}});

ActivInfinitev7.step({ clickIntoBeneficiary: function(ev, sc, st) {
	if (sc.data.indexBenef === sc.data.countBenef - 1) {
		if (sc.data.contractIsProlonged) {
			sc.endStep(ActivInfinitev7.steps.closeConsultation);
			return;
		}
		sc.endStep(ActivInfinitev7.steps.navigateToProductList);
		return;
	}
	
	sc.data.indexBenef += 1;
	ActivInfinitev7.pInfoRo.oInsuredList.i(sc.data.indexBenef).click();
	
	sc.endStep();
}});

ActivInfinitev7.step({ waitForBeneficiarySelection: function(ev, sc, st) {
	try {
		var classes = ActivInfinitev7.pInfoRo.oInsuredList.i(sc.data.indexBenef).getAttribute('className');
		if (classes.match(/selected/)) {
			sc.endStep(ActivInfinitev7.steps.checkBeneficiaries);
			return;
		}
	} catch (error) {}
	ctx.sleep();
	sc.endStep(ActivInfinitev7.steps.waitForBeneficiarySelection);
}});

ActivInfinitev7.step({ navigateToProductList: function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract +  ' - STEP - navigateToProductList');
	ActivInfinitev7.pInfoRo.btNavigateProductList.click();
	ActivInfinitev7.pProductList.wait(function() {
		sc.data.indexBenef = 0;
		sc.data.countBenef = ActivInfinitev7.pProductList.oTypeBenef.count();
		if (sc.data.countBenef === 0) {
			ctx.trace.writeInfo(sc.data.contract.individualContract +  ' - All product are already terminated');
			sc.data.commentContract = 'Déjà fait';
			sc.data.statusContract = ctx.excelHelper.constants.status.Success;
			sc.endStep(ActivInfinitev7.steps.closeConsultation);
		}
		
		sc.endStep();
	});
}});

ActivInfinitev7.step({ checkProductState: function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract +  ' - STEP - checkProductState Number ' + sc.data.indexBenef);
	var currentBeneficiaryInfinite = ActivInfinitev7.pProductList.oTypeBenef.i(sc.data.indexBenef);
	var typeInsured = currentBeneficiaryInfinite.get();
	var insuredInfoExcel = ctx.scenarioHelper.searchInsuredFromType(typeInsured, sc.data.beneficiaries);
	if (!insuredInfoExcel) {
		sc.endStep(ActivInfinitev7.steps.nextProduct);
		return;
	}
	
	var arrayStateSuscribedProduct = findStateSuscribedProduct(sc.data.contract.suscribedCodeProduct);
	if (arrayStateSuscribedProduct && containsValidProduct(arrayStateSuscribedProduct)) {
		ctx.trace.writeInfo(sc.data.contract.individualContract +  ' - one product or more is valid. Continue verifications');
		sc.endStep(ActivInfinitev7.steps.goToContribution);	
		return;
	}
	sc.endStep(ActivInfinitev7.steps.nextProduct);
}});

ActivInfinitev7.step({ nextProduct: function(ev, sc, st) {
	sc.data.indexBenef += 1;
	if (sc.data.indexBenef >= sc.data.countBenef) {
		ctx.trace.writeInfo(sc.data.contract.individualContract +  ' - All product are already terminated');
		sc.data.commentContract = 'Déjà fait';
		sc.data.statusContract = ctx.excelHelper.constants.status.Success;
		sc.endStep(ActivInfinitev7.steps.closeConsultation);
		return;
	}
	ActivInfinitev7.pProductList.oInsuredList.i(sc.data.indexBenef).click();
	sc.endStep();
}});

ActivInfinitev7.step({ waitForProduct: function(ev, sc, st) {
	ctx.sleep();
	try {
		var classes = ActivInfinitev7.pProductList.oInsuredList.i(sc.data.indexBenef).getAttribute('className');
		if (classes.match(/selected/)) {
			sc.endStep(ActivInfinitev7.steps.checkProductState);
			return;
		}
	} catch (error) {}
	sc.endStep(ActivInfinitev7.steps.waitForProduct);
}});

ActivInfinitev7.step({ goToContribution: function(ev, sc, st) {
	if (!sc.data.config.controlContribution) {
		sc.endStep(ActivInfinitev7.steps.toTerminated);
		return;
	}
	
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - goToContribution');
	ActivInfinitev7.pProductList.btVisuCotisation.click();
	ActivInfinitev7.pContribution.wait(function() {
		sc.endStep();
	});
}});

ActivInfinitev7.step({ toTerminated: function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract +  ' - Contract ready for terminated');
	sc.data.commentContract = 'À résilier';
	sc.data.toTerminated = true;
	sc.data.statusContract = ctx.excelHelper.constants.status.Success;
	sc.data.countCaseReadyToRemove += 1;
	sc.endStep();
}});

ActivInfinitev7.step({ closeConsultation: function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract +  ' - STEP - closeConsultation');
	ctx.scenarioHelper.goHome(function() {
		sc.endStep();
	});
}});

/**
 **
 ** Functions used by scenario
 **
 */
function getEndEffectInfiniteDate() {
	var infiniteParticularSituationRows = ActivInfinitev7.pInfoRo.oCodeProduct.getAll();
	var dateEndEffect;
	
	for (var i in infiniteParticularSituationRows) {
		if (infiniteParticularSituationRows[i] === ctx.config.CMU) {
			var currentDate = ctx.string.trim(ActivInfinitev7.pInfoRo.oEndEffectProductDate.i(i).get());
			if (currentDate === '') {
				continue;
			}
			currentDate = ctx.date.parseToDate(currentDate);
			if (dateEndEffect === undefined || ctx.date.isBefore(dateEndEffect, currentDate)) {
				dateEndEffect = currentDate;
			}
		}
	}
	return dateEndEffect;
}

function isASSPRITerminatedAndOtherNotTerminated(sc, typeInsured, stateProduct) {
	if (typeInsured === ctx.scenarioHelper.constantes.ASSPRI) {
		sc.data.ASSPRIIsTerminated = (stateProduct === ctx.scenarioHelper.constantes.productTerminated);
	} else if (stateProduct === ctx.scenarioHelper.constantes.productValid) {
		sc.data.insuredIsValid = true;
	}
	
	return (sc.data.insuredIsValid && sc.data.ASSPRIIsTerminated);
}

function findStateSuscribedProduct(codeProduct) {
	var arrayState = [];
	for (var i in ActivInfinitev7.pProductList.oCodeProduct.getAll()) {
		if (ActivInfinitev7.pProductList.oCodeProduct.i(i).get() === codeProduct) {
			arrayState.push(ActivInfinitev7.pProductList.oStateProduct.i(i).get());
		}
	}
	return (arrayState.length > 0 ? arrayState : false);
}

function containsValidProduct(arrayStateProduct) {
	for (var i in arrayStateProduct) {
		if (arrayStateProduct[i] === ctx.scenarioHelper.constantes.productValid) {
			return true;
		}
	}
	return false;
}

function rangeIsValid(type, range) {
	var arrayRange = ctx.scenarioHelper.correspondenceRange[type]
	if (arrayRange) {
		for (var i in arrayRange) {
			if (arrayRange[i] === range) {
				return true;
			}
		}
		return false;
	}
	return true;
}
