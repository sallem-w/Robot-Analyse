ActivInfinitev7.scenario({ coverageChangeContract: function(ev, sc) {
	var data = sc.data;
	sc.data.currentScenario = 'Changement de couverture';
	sc.onTimeout(ctx.config.getTimeout(), function(sc, st) { ctx.scenarioHelper.connectionAuto(sc);	});
	sc.onError(function(sc, st, ex) { ctx.scenarioHelper.connectionAuto(sc);	});
	sc.setMode(e.scenario.mode.noStartIfRunning);
	sc.step(ActivInfinitev7.steps.initializeCoverageChangeContract);
	sc.step(ActivInfinitev7.steps.searchCoverageContract);
	sc.step(ActivInfinitev7.steps.goToProductUpdatePage);
	sc.step(ActivInfinitev7.steps.removeCurrentProduct);
	sc.step(ActivInfinitev7.steps.addOutputProduct);
	sc.step(ActivInfinitev7.steps.saveUpdateProduct);
	sc.step(ActivInfinitev7.steps.goToVisualizationContributionFromCoverageChange);
	sc.step(ActivInfinitev7.steps.validationCalcul); 
	sc.step(ActivInfinitev7.steps.selectElementDiffereIntoImmediateNotice);
	sc.step(ActivInfinitev7.steps.checkElementDiffereIntoAskThirdPartyPayment);
	sc.step(ActivInfinitev7.steps.saveContract);
	sc.step(ActivInfinitev7.steps.closeContractUpdate);
	sc.step(ActivInfinitev7.steps.endCoverageChangeContract);
}});

ActivInfinitev7.step({ initializeCoverageChangeContract: function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP START - coverage change');
	ActivInfinitev7.pDashboard.btCoverageChange.click();
	ActivInfinitev7.pSearchContractIndiv.wait(function() {
		return sc.endStep();
	});
}});

ActivInfinitev7.step({ searchCoverageContract: function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - searchCoverageContract');
	var date  = ctx.date.formatDDMMYYYY(ctx.date.addDay(new Date(sc.data.contract.ACSCertificateEndDate), 1));
	ctx.scenarioHelper.searchContract(sc, date, function foundCb() {
		return sc.endStep();
	}, function notFoundCb() {
		return ctx.endScenario(sc);
	});
}});
	
ActivInfinitev7.step({ goToProductUpdatePage: function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - goToProductUpdatePage');
	ActivInfinitev7.pTerminatedContractFo.btNext.click();
	ActivInfinitev7.pBlockNotes.wait(function() {
		ActivInfinitev7.pBlockNotes.btNext.click();
		ActivInfinitev7.pProductUpdate.wait(function() {
			ActivInfinitev7.pProductUpdate.btUpdatePage.click();
			ActivInfinitev7.pProductUpdate.events.UNLOAD.once(function() {
				ActivInfinitev7.pProductUpdate.events.LOAD.once(function() {
					return sc.endStep();
				});
			});
		});
	});
}});

ActivInfinitev7.step({ removeCurrentProduct: function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - removeCurrentProduct');
		var found = false;
		var index = 0;
		for (index in ActivInfinitev7.pProductUpdate.oCodeProduct.getAll()) {
			var codeProduct = ctx.string.trim(ActivInfinitev7.pProductUpdate.oCodeProduct.i(index).get());
			
			if (codeProduct === sc.data.contract.subscribedCodeProduct) {
				found = true;
				break;
			}
		}
		
		if (!found) {
			ctx.trace.writeInfo(sc.data.contract.individualContract + ' - END SCENARIO - product code not found into product page');
			sc.data.commentContract = 'Impossible de trouver le code produit "' + sc.data.contract.subscribedCodeProduct + '" dans la page produit';
			sc.data.statusContract = ctx.excelHelper.constants.status.Fail;
			return sc.endStep(ActivInfinitev7.steps.closeContractUpdate);
		}
		
		ActivInfinitev7.pProductUpdate.oCodeProduct.i(index).click();
		ActivInfinitev7.pProductUpdate.btUpdateProduct.click();
		ActivInfinitev7.pChangeStateProduct.wait(function() {
			ActivInfinitev7.pChangeStateProduct.oStateProduct.set("Radié");
			ActivInfinitev7.pChangeStateProduct.btSave.click();
			ActivInfinitev7.pProductUpdate.wait(function() {
				return sc.endStep();
			});
		});
}});


ActivInfinitev7.step({ addOutputProduct: function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - addOutputProduct');
	var newCodeProduct = ctx.configFile.getCodeProductCorrespond(sc.data.contract.subscribedCodeProduct);

	if (newCodeProduct === undefined || newCodeProduct === '') {
		ctx.trace.writeInfo(sc.data.contract.individualContract + ' - END SCENARIO - product code correspond not found');
		sc.data.commentContract = 'Impossible de trouver le code produit correspondant à ' + sc.data.contract.subscribedCodeProduct;
		sc.data.statusContract = ctx.excelHelper.constants.status.Fail;
		return sc.endStep(ActivInfinitev7.steps.closeContractUpdate);
	}
	
	ActivInfinitev7.pProductUpdate.btAddProduct.click();
	ActivInfinitev7.pProductUpdate.oInputNewCodeProduct.set(newCodeProduct);
	ActivInfinitev7.pProductUpdate.btSaveNewCodeProduct.click();
	ActivInfinitev7.pProductUpdate.events.UNLOAD.once(function() {
		ActivInfinitev7.pProductUpdate.events.LOAD.once(function() {
			return sc.endStep();
		})
	});
}});

ActivInfinitev7.step({ saveUpdateProduct: function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - saveUpdateProduct');
	ActivInfinitev7.pProductUpdate.btSaveUpdateProduct.click();
	ActivInfinitev7.pProductUpdate.events.UNLOAD.once(function() {
		ActivInfinitev7.pProductUpdate.events.LOAD.once(function() {
			return sc.endStep();
		});
	});
}});

ActivInfinitev7.step({ goToVisualizationContributionFromCoverageChange: function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - goToVisualizationContributionFromCoverageChange');
	ActivInfinitev7.pProductUpdate.btNext.click();
	
	//pDiversParam is an optional page, so we check if it is loaded for click on the next button instead of wait this page directly
	ActivInfinitev7.pDiversParam.events.LOAD.once(function() {
		ActivInfinitev7.pDiversParam.btNext.click();
	});
	
	ActivInfinitev7.pCalculParam.wait(function() {
		ActivInfinitev7.pCalculParam.btNext.click();
		ActivInfinitev7.pContributionHistory.wait(function() {
			ActivInfinitev7.pContributionHistory.btNext.click();
			ActivInfinitev7.pContributionVisu.wait(function() {
				return sc.endStep();	
			});
		});
	});
}});

ActivInfinitev7.step({ selectElementDiffereIntoImmediateNotice: function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - selectElementDiffereIntoImmediateNotice');
	ActivInfinitev7.pCoverageImmediateEch.wait(function() {
		ActivInfinitev7.pCoverageImmediateEch.oEditionSelect.set('Différé');
		ActivInfinitev7.pCoverageImmediateEch.btNext.click();
		return sc.endStep();
	});
}});

ActivInfinitev7.step({ checkElementDiffereIntoAskThirdPartyPayment: function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - checkElementDiffereIntoAskThirdPartyPayment');
	ActivInfinitev7.pCoverageImmediateCar.wait(function() {
		if (sc.data.isContractWithProductACS) {
			ActivInfinitev7.pCoverageImmediateCar.oNoEditionCheck.click();
		} else {
			ActivInfinitev7.pCoverageImmediateCar.oEditionCheck.click();
		}
		
		ActivInfinitev7.pCoverageImmediateCar.btNext.click();
		return sc.endStep();
	});
}});

ActivInfinitev7.step({ endCoverageChangeContract: function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP END - coverage change');
	ActivInfinitev7.pDashboard.wait(function() {
		return sc.endStep();
	});
}});
