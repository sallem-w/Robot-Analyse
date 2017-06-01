ActivInfinitev7.scenario({ coverageChangeContract: function(ev, sc) {
	var data = sc.data;
	sc.onTimeout(ctx.config.getTimeout(), function(sc, st) { sc.endScenario();	});
	sc.onError(function(sc, st, ex) { sc.endScenario();	});
	sc.setMode(e.scenario.mode.noStartIfRunning);
	sc.step(ActivInfinitev7.steps.initializeCoverageChangeContract);
	sc.step(ActivInfinitev7.steps.searchCoverageContract);
	sc.step(ActivInfinitev7.steps.goToProductUpdatePage);
	sc.step(ActivInfinitev7.steps.updateProduct);
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
	sc.data.commentContract += 'Changement de couverture du contrat \n';
	
	function navigateToCoverageChange() {
		window.location.href = '/mdg/Go.do?id=ACCC01STD';
	};
	
	ActivInfinitev7.pDashboard.injectFunction(navigateToCoverageChange);
	ActivInfinitev7.pDashboard.execScript('navigateToCoverageChange()');
	ActivInfinitev7.pSearchContractIndiv.wait(function() {
		sc.endStep();
	});
}});

ActivInfinitev7.step({ searchCoverageContract: function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - searchCoverageContract');
	
	ActivInfinitev7.pSearchContractIndiv.oIndividualContract.set(sc.data.contract.individualContract);
	ActivInfinitev7.pSearchContractIndiv.oDateContract.set(ctx.date.formatDDMMYYYY(ctx.date.addDay(new Date(sc.data.contract.ACSCertificateEndDate), 1)));
	ActivInfinitev7.pSearchContractIndiv.btSearch.click();
	
	ActivInfinitev7.pSearchContractIndiv.events.UNLOAD.on(function() {
		ctx.scenarioHelper.checkIfContractFound(sc, function() {
			ctx.log("MERD3");
			sc.endStep(ActivInfinitev7.steps.closeContractUpdate);
		});
		
		ActivInfinitev7.pTerminatedContractFo.events.LOAD.on(function() {
			ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - contract found');
			
			sc.data.commentContract += 'Contrat trouvé \n';
			sc.data.statusContract = ctx.excelHelper.constants.status.Success
			sc.endStep();
		});
	});
}});
	
ActivInfinitev7.step({ goToProductUpdatePage: function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - goToProductUpdatePage');
	ActivInfinitev7.pTerminatedContractFo.btNext.click();
	ActivInfinitev7.pBlockNotes.wait(function() {
		ActivInfinitev7.pBlockNotes.btNext.click();
		ActivInfinitev7.pProductUpdate.wait(function() {
			sc.endStep();
		});
	});
}});

ActivInfinitev7.step({ updateProduct: function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - updateProduct');
	ActivInfinitev7.pProductUpdate.btUpdatePage.click();
	ActivInfinitev7.pProductUpdate.events.UNLOAD.on(function() {
			ActivInfinitev7.pProductUpdate.events.LOAD.on(function() {
				var newCodeProduct = ctx.configACS.getCodeProductCorrespond(sc.data.contract.subscribedCodeProduct);
				
				if (newCodeProduct === undefined || newCodeProduct === '') {
					ctx.trace.writeInfo(sc.data.contract.individualContract + ' - END SCENARIO - product code correspond not found');
					sc.data.commentContract = 'Impossible de trouver le code produit correspondant à ' + sc.data.contract.subscribedCodeProduct + '\n';
					sc.data.statusContract = ctx.excelHelper.constants.status.Fail;
					sc.endStep(ActivInfinitev7.steps.closeContractUpdate);
				}
				
				for (var index in ActivInfinitev7.pProductUpdate.oCodeProduct.getAll()) {
					var codeProduct = ctx.string.trim(ActivInfinitev7.pProductUpdate.oCodeProduct.i(index).get());
					
					if (codeProduct === sc.data.contract.subscribedCodeProduct) {
						ActivInfinitev7.pProductUpdate.oCodeProduct.i(index).click();
						ActivInfinitev7.pProductUpdate.btUpdateProduct.click();
						ActivInfinitev7.pChangeStateProduct.wait(function() {
							ActivInfinitev7.pChangeStateProduct.oStateProduct.set("Radié");
							ActivInfinitev7.pChangeStateProduct.btSave.click();
							ActivInfinitev7.pProductUpdate.wait(function() {
								//TODO
								sc.endStep();	
							});
						});
						break;
					}
				}
		});
	});
}});

ActivInfinitev7.step({ goToVisualizationContributionFromCoverageChange: function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - goToVisualizationContributionFromCoverageChange');
	ActivInfinitev7.pProductUpdate.btNext.click();
	
	//pDiversParam is an optional page, so we check if it is loaded for click on the next button instead of wait this page directly
	ActivInfinitev7.pDiversParam.events.LOAD.on(function() {
		ActivInfinitev7.pDiversParam.btNext.click();
	});
	
	ActivInfinitev7.pCalculParam.wait(function() {
		ActivInfinitev7.pCalculParam.btNext.click();
		ActivInfinitev7.pContributionHistory.wait(function() {
			ActivInfinitev7.pContributionHistory.btNext.click();
			ActivInfinitev7.pContributionVisu.wait(function() {
				sc.endStep();	
			});
		});
	});
}});

ActivInfinitev7.step({ selectElementDiffereIntoImmediateNotice: function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - selectElementDiffereIntoImmediateNotice');
	ActivInfinitev7.pCoverageImmediateEch.wait(function() {
		ActivInfinitev7.pCoverageImmediateEch.oEditionSelect.set('Différé');
		ActivInfinitev7.pCoverageImmediateEch.btNext.click();
		sc.endStep();
	});
}});

ActivInfinitev7.step({ checkElementDiffereIntoAskThirdPartyPayment: function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - checkElementDiffereIntoAskThirdPartyPayment');
	ActivInfinitev7.pCoverageImmediateCar.wait(function() {
		ActivInfinitev7.pCoverageImmediateCar.oEditionCheck.click();
		ActivInfinitev7.pCoverageImmediateCar.btNext.click();
		sc.endStep();
	});
}});

ActivInfinitev7.step({ endCoverageChangeContract: function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP END - coverage change');
	ActivInfinitev7.pDashboard.wait(function() {
		sc.endStep();
	});
}});
