ActivInfinitev7.scenario({ checkContractCMU: function(ev, sc) {
	sc.data.codeScenario = ctx.config.CMU;
	sc.onTimeout(ctx.config.getTimeout(), function(sc, st) { sc.endScenario(); });
	sc.onError(function(sc, st, ex) { sc.endScenario();	});
	sc.setMode(e.scenario.mode.clearIfRunning);
	sc.step(ActivInfinitev7.steps.initializeCheckContract);
	sc.step(ActivInfinitev7.steps.navigateToConsultation);
	sc.step(ActivInfinitev7.steps.searchIndividualContractEffect);
	sc.step(ActivInfinitev7.steps.navigateToInfoRo);
	sc.step(ActivInfinitev7.steps.initializeCheckBeneficiaries);
	sc.step(ActivInfinitev7.steps.checkBeneficiaries);
	sc.step(ActivInfinitev7.steps.closeConsultation);
	sc.step(ActivInfinitev7.steps.endCheckContract);
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
	sc.endStep();
}});

ActivInfinitev7.step({ checkBeneficiaries: function(ev, sc, st) {
	var currentBeneficiaryInfinite = ActivInfinitev7.pInfoRo.oTypeInsured.i(sc.data.indexBenef);
	var currentTypeText = currentBeneficiaryInfinite.get();
	var insuredInfoExcel = ctx.scenarioHelper.searchInsuredFromType(currentTypeText, sc.data.beneficiaries);

	if (!insuredInfoExcel) {
		sc.data.indexBenef += 1;
		sc.endStep(ActivInfinitev7.steps.checkBeneficiaries);
		return;
	}
	
	var dateEndEffectInfinite = getEndEffectInfiniteDate();
	if (!dateEndEffectInfinite) {
		ctx.trace.writeInfo(sc.data.contract.individualContract +  ' - No end effect date found for CMU');
		sc.data.commentContract = 'Revoir centre: Aucune date de fin d\'effet n\'a été trouvé pour le produit CMU';
		sc.data.statusContract = ctx.excelHelper.constants.status.Fail;
		sc.endStep(ActivInfinitev7.steps.closeConsultation);
		return;
	}
	
	if (sc.data.indexBenef === 0) {
		ctx.trace.writeInfo(sc.data.contract.individualContract +  ' - STEP - checkBeneficiaries');
		sc.data.dateEndEffectToCompare = dateEndEffectInfinite;
	}
	
	if (ctx.date.isBefore(ctx.date.parseToDate((String)(insuredInfoExcel.particularSituationEndDate)), sc.data.dateEndEffectToCompare)) {
		ctx.trace.writeInfo(sc.data.contract.individualContract +  ' - Contract prolonged');
		sc.data.commentContract = 'Contrat prolongé';
		sc.data.statusContract = ctx.excelHelper.constants.status.Success;
		sc.data.contractIsProlonged = true;
	}
	
	// TODO : compare date to other beneficiary

	if (sc.data.indexBenef === sc.data.countBenef - 1) {
		if (sc.data.contractIsProlonged) {
			sc.endStep(ActivInfinitev7.steps.closeConsultation);
			return;
		}
		sc.endStep();
		return;
	}
	
	sc.data.indexBenef += 1;
	ActivInfinitev7.pInfoRo.oTypeInsured.i(sc.data.indexBenef).click();
	ActivInfinitev7.pInfoRo.events.UNLOAD.on(function() {
		ActivInfinitev7.pInfoRo.events.LOAD.on(function() {
			sc.endStep(ActivInfinitev7.steps.checkBeneficiaries);
		});
	});
}});

ActivInfinitev7.step({ closeConsultation: function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract +  ' - STEP - closeConsultation');
	ctx.scenarioHelper.goHome(function() {
		sc.endStep();
	});
}});

function getEndEffectInfiniteDate() {
	var infiniteParticularSituationRows = ActivInfinitev7.pInfoRo.oCodeProduct.getAll();
	var dateEndEffect;
	
	for (var i in infiniteParticularSituationRows) {
		if (infiniteParticularSituationRows[i] === 'CMU') {
			var currentDate = ctx.date.parseToDate(ActivInfinitev7.pInfoRo.oEndEffectProductDate.i(i).get());
			if (dateEndEffect === undefined || ctx.date.isBefore(dateEndEffect, currentDate)) {
				dateEndEffect = currentDate;
			}
		}
	}
	return dateEndEffect;
}
