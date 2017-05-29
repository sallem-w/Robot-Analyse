ActivInfinite.scenario({ coverageChangeContract: function(ev, sc) {
	var data = sc.data;
	sc.onTimeout(ctx.config.getTimeout(), function(sc, st) { sc.endScenario();	});
	sc.onError(function(sc, st, ex) { sc.endScenario();	});
	sc.setMode(e.scenario.mode.noStartIfRunning);
	sc.step(ActivInfinite.steps.initializeCoverageChangeContract);
	sc.step(ActivInfinite.steps.searchCoverageContract);
	sc.step(ActivInfinite.steps.editProductCoverageContract);
	sc.step(ActivInfinite.steps.goToImmediateNotice);
	sc.step(ActivInfinite.steps.selectElementInImmediateEch);
	sc.step(ActivInfinite.steps.checkElementInImmediateEch);
	sc.step(ActivInfinite.steps.saveContractCoverage);
	sc.step(ActivInfinite.steps.endCoverageChangeContract);
}});

ActivInfinite.step({ initializeCoverageChangeContract: function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP START - coverage change');
	sc.data.commentContract += 'Changement de couverture du contrat \n';
	
	function navigateToCoverageChange() {
		setTimeout(function() {
			$('a[menuINFcl="41"]').mouseover();
			$('a[menuINFcl="52"]').mouseover();
			$('a[menuINFcl="53"]').click();
		}, 1500);
	};
	
	ActivInfinite.pDashboard.injectFunction(navigateToCoverageChange);
	ActivInfinite.pDashboard.execScript('navigateToCoverageChange()');
	ActivInfinite.pConsultContratIndiv.wait(function() {
		sc.endStep();
	});
}});

ActivInfinite.step({ searchCoverageContract: function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - searchCoverageContract');
	
	ActivInfinite.pConsultContratIndiv.oIndividualContract.set(sc.data.contract.individualContract);
	ActivInfinite.pConsultContratIndiv.oDateContract.set(ctx.date.formatDDMMYYYY(ctx.date.addDay(new Date(sc.data.contract.ACSCertificateEndDate), 1)));
	ActivInfinite.pConsultContratIndiv.btSearch.click();

	ActivInfinite.pContratIndivFound.events.LOAD.on(function() {
		ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - contract found');
		
		sc.data.commentContract += 'Contrat trouvé \n';
		sc.data.statusContract = ctx.excelHelper.constants.status.Success;
		
		ActivInfinite.pContratIndivFound.oBtNext.click();
		ActivInfinite.pBlockNotes.wait(function() {
			ActivInfinite.pBlockNotes.oBtNext.click();
			ActivInfinite.pCoverageProduct.wait(function() {
				ActivInfinite.pCoverageProduct.btEdit.click();
				ActivInfinite.pCoverageEditProduct.wait(function() {
					sc.endStep();
				});
			});
		});
	});
	
	contractNotFoundEvent(sc, closePopupEvent(function() {
		sc.endScenario();
	}));

}});

ActivInfinite.step({ editProductCoverageContract: function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - edit product coverage change');

	var isUncheckOldProduct = false;
	var isCheckNewProduct = false;
	var newCodeProduct = ctx.configACS.getCodeProductCorrespond(sc.data.contract.subscribedCodeProduct);
	
	if (newCodeProduct === undefined || newCodeProduct === '') {
		ActivInfinite.pCoverageEditProduct.oBtClose.click();
		ctx.trace.writeInfo(sc.data.contract.individualContract + ' - END SCENARIO - product code correspond not found');
		sc.data.commentContract = 'Impossible de trouver le code produit correspondant à ' + sc.data.contract.subscribedCodeProduct + '\n';
		sc.data.statusContract = ctx.excelHelper.constants.status.Fail;
		sc.endScenario();
		return;
	}
	
	for (var index in ActivInfinite.pCoverageEditProduct.oCheckProduct.getAll()) {
		var checkProduct = ActivInfinite.pCoverageEditProduct.oCheckProduct.i(index).get() === '1';
		var codeProduct = ctx.string.trim(ActivInfinite.pCoverageEditProduct.oCodeProduct.i(index).get());
		
		// uncheck current product
		if (checkProduct && codeProduct === sc.data.contract.subscribedCodeProduct) {
			ActivInfinite.pCoverageEditProduct.oCheckProduct.i(index).click();
			isUncheckOldProduct = true;
		}
		
		// check new product
		if (!checkProduct && codeProduct === newCodeProduct) {
			ActivInfinite.pCoverageEditProduct.oCheckProduct.i(index).click();
			isCheckNewProduct = true;
		}
		
		if (isUncheckOldProduct && isCheckNewProduct) {
			break;
		}
	}
	
	ActivInfinite.pCoverageEditProduct.btValidate.click();
	sc.endStep();
}});

ActivInfinite.step({ goToImmediateNotice: function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - goToImmediateNotice');
	
	ActivInfinite.pCoverageValidProduct.wait(function() {
		ActivInfinite.pCoverageValidProduct.btValidate.click();
		ActivInfinite.pCoverageProduct.wait(function() {
			ActivInfinite.pCoverageProduct.oBtNext.click();
			ActivInfinite.pEffectParamCalc.wait(function() {
				ActivInfinite.pEffectParamCalc.oBtNext.click();
				ActivInfinite.pEffectHistoCoti.wait(function() {
					ActivInfinite.pEffectHistoCoti.oBtNext.click();
					ActivInfinite.pEffectVisuCotis.wait(function() {
						ActivInfinite.pEffectVisuCotis.oValidation.set('Oui');
						ActivInfinite.pEffectVisuCotis.oBtNext.click();
						ActivInfinite.pCoverageImmediateEch.wait(function() {
							sc.endStep();
						});
					});
				});
			});
		});
	});
}});

ActivInfinite.step({ selectElementInImmediateEch: function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - selectElementInImmediateEch');
	
	ActivInfinite.pCoverageImmediateEch.oEditContract.set('Différé');
	ActivInfinite.pCoverageImmediateEch.oBtNext.click();
	ActivInfinite.pCoverageImmediateCar.wait(function() {
		sc.endStep();
	});
}});

ActivInfinite.step({ checkElementInImmediateEch: function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - checkElementInImmediateEch');
	
	ActivInfinite.pCoverageImmediateCar.oTypeDiffere.click();
	ActivInfinite.pCoverageImmediateCar.oBtNext.click();
	
	ActivInfinite.pEffectValidation.events.LOAD.on(function() {
		sc.endStep();
	});
	
	contractNotFoundEvent(sc, closePopupEvent(function() {
		sc.endScenario();
	}));
}});

ActivInfinite.step({ saveContractCoverage: function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - saveContract');
	ActivInfinite.pEffectValidation.oBtSave.click();
	
	ActivInfinite.pConsultContratIndiv.events.LOAD.on(function() {
		ActivInfinite.pConsultContratIndiv.oBtClose.click();
		ActivInfinite.pPopupCloseEffect.events.LOAD.on(function() {
			ActivInfinite.pPopupCloseEffect.btNo.click();
			sc.endStep();
		});
	});
}});

ActivInfinite.step({ endCoverageChangeContract: function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP END - coverage change');
	sc.endStep();
}});
