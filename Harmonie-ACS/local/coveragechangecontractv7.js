(function () {	
	ActivInfinitev7.scenario({ coverageChangeContract: function(ev, sc) {
		var data = sc.data;
		sc.data.currentScenario = 'Changement de couverture';
		sc.onTimeout(ctx.config.getTimeout(), function(sc, st) {
			ctx.trace.writeError(sc.data.contract.individualContract + ' Timeout aborting current scenario');
			sc.endStep(ActivInfinitev7.steps.abort);
		});
		sc.onError(function(sc, st, ex) {
			ctx.trace.writeError(sc.data.contract.individualContract + ex + ' aborting current scenario');
			sc.endStep(ActivInfinitev7.steps.abort);
		});
		sc.setMode(e.scenario.mode.noStartIfRunning);
		sc.step(ActivInfinitev7.steps.initializeCoverageChangeContract);
		sc.step(ActivInfinitev7.steps.searchCoverageContract);
		sc.step(ActivInfinitev7.steps.goToProductUpdatePage);
		sc.step(ActivInfinitev7.steps.updateProductPage);
		sc.step(ActivInfinitev7.steps.removeCurrentProduct);
		sc.step(ActivInfinitev7.steps.setProductStateToRemoved);
		sc.step(ActivInfinitev7.steps.addOutputProduct);
		sc.step(ActivInfinitev7.steps.saveUpdateProduct);
		sc.step(ActivInfinitev7.steps.goToVisualizationContribution); // from TerminatedProduct
		sc.step(ActivInfinitev7.steps.validationCalculCoverageChange);
		sc.step(ActivInfinitev7.steps.selectElementDiffereIntoImmediateNotice);
		sc.step(ActivInfinitev7.steps.checkElementDiffereIntoAskThirdPartyPayment);
		sc.step(ActivInfinitev7.steps.saveContract); // from saveContract
		sc.step(ActivInfinitev7.steps.saveContractWaitSearchContractIndiv); // from saveContract
		sc.step(ActivInfinitev7.steps.closeContractUpdate); // from saveContract
		sc.step(ActivInfinitev7.steps.endCoverageChangeContract);
		sc.step(ActivInfinitev7.steps.abort);
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
		ctx.scenarioHelper.goNextPageTill(ActivInfinitev7.pProductUpdate, function (error) {
			if (error) {
				return ctx.endScenario(sc, error.message, 'Probléme lors de la navigation vers la page "Produits/Garanties", merci de remonter les logs au service technique', 'Erreur');
			}
			return sc.endStep();
		});
	}});

	ActivInfinitev7.step({ updateProductPage: function(ev, sc, st) {
		ActivInfinitev7.pProductUpdate.btUpdatePage.click();
		ActivInfinitev7.pProductUpdate.events.LOAD.once(function() {
			return sc.endStep();
		});
	} });

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
				return sc.endStep();
			});
	}});

	ActivInfinitev7.step({ setProductStateToRemoved: function(ev, sc, st) {
		ActivInfinitev7.pChangeStateProduct.oStateProduct.set("Radié");
		ActivInfinitev7.pChangeStateProduct.btSave.click();
		ActivInfinitev7.pProductUpdate.wait(function() {
			return sc.endStep();
		});
	} });

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
		ActivInfinitev7.pProductUpdate.events.LOAD.once(function() {
			return sc.endStep();
		})
	}});

	ActivInfinitev7.step({ saveUpdateProduct: function(ev, sc, st) {
		ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - saveUpdateProduct');
		ActivInfinitev7.pProductUpdate.btSaveUpdateProduct.click();
		ActivInfinitev7.pProductUpdate.events.LOAD.once(function() {
			return sc.endStep();
		});
	}});

	// step goToVisualizationContribution from TerminatedProduct
	
	ActivInfinitev7.step({ validationCalculCoverageChange: function(ev, sc, st) {
		ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - validationCalcul');
		if (ActivInfinitev7.pContributionVisu.oValidation.exist()) {
			ctx.setValue(ActivInfinitev7.pContributionVisu.oValidation, 'OUI');
		}

		ctx.scenarioHelper.goNextPageTill(ActivInfinitev7.pCoverageImmediateEch, function (error) {
			if (error) {
				return ctx.endScenario(sc, error.message, 'Probléme lors de la navigation vers la page "Avis d\'échéance" , merci de remonter les logs au service technique', 'Erreur');
			}
			return sc.endStep();
		});
	}});

	ActivInfinitev7.step({ selectElementDiffereIntoImmediateNotice: function(ev, sc, st) {
		ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - selectElementDiffereIntoImmediateNotice');
		ActivInfinitev7.pCoverageImmediateEch.oEditionSelect.set('Différé');
		ActivInfinitev7.pCoverageImmediateEch.btNext.click();
		ActivInfinitev7.pCoverageImmediateCar.wait(function() {
			return sc.endStep();
		});
	}});

	ActivInfinitev7.step({ checkElementDiffereIntoAskThirdPartyPayment: function(ev, sc, st) {
		ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - checkElementDiffereIntoAskThirdPartyPayment');
		if (sc.data.isContractWithProductACS) {
			ActivInfinitev7.pCoverageImmediateCar.oNoEdit.click();
		} else {
			ActivInfinitev7.pCoverageImmediateCar.oEditionCheck.click();
		}

		ctx.scenarioHelper.goNextPageTill(ActivInfinitev7.pSaveUpdate, function (error) {
			if (error) {
				return ctx.endScenario(sc, error.message, 'Probléme lors de la navigation vers la page "Validation acte", merci de remonter les logs au service technique', 'Erreur');
			}
			return sc.endStep();
		});
	}});

	// step saveContract from saveContract
	// step saveContractWaitSearchContractIndiv from saveContract
	// step closeContractUpdate from saveContract

	ActivInfinitev7.step({ endCoverageChangeContract: function(ev, sc, st) {
		ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP END - coverage change');
		return sc.endScenario();
	}});
})();
