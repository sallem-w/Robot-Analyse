ActivInfinitev7.scenario({ terminatedProduct: function(ev, sc) {
	var data = sc.data;
	sc.onTimeout(ctx.config.getTimeout(), function(sc, st) { sc.endScenario();	});
	sc.onError(function(sc, st, ex) { sc.endScenario();	});
	sc.setMode(e.scenario.mode.noStartIfRunning);
	sc.step(ActivInfinitev7.steps.initializeTerminatedProduct);
	sc.step(ActivInfinitev7.steps.searchIndividualContractEffect);
	sc.step(ActivInfinitev7.steps.endTerminatedProduct);
}});

ActivInfinitev7.step({ initializeTerminatedProduct: function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP START - product terminated');
	sc.data.commentContract += 'Radiation du produit \n';
	
	function navigateToTerminatedProduct() {
		setTimeout(function() {
			window.location.href = '/mdg/Go.do?id=ACCC04STD';
		}, 1500);
	};
	
	ActivInfinitev7.pDashboard.injectFunction(navigateToTerminatedProduct);
	ActivInfinitev7.pDashboard.execScript('navigateToTerminatedProduct()');
	ActivInfinitev7.pSearchContractIndiv.wait(function() {
		sc.endStep();
	});
}});

ActivInfinitev7.step({ searchIndividualContractEffect: function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - searchIndividualContractEffect');
	ActivInfinitev7.pSearchContractIndiv.oIndividualContract.set(sc.data.contract.individualContract);
	ActivInfinitev7.pSearchContractIndiv.btSearch.click();
	
	ActivInfinitev7.pTerminatedContractFo.events.LOAD.on(function() {
		ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - contract found');
		
		sc.data.commentContract += 'Contrat trouvé \n';
		sc.data.statusContract = ctx.excelHelper.constants.status.Success;
		
		sc.endStep();
	});
}});

ActivInfinitev7.step({ endTerminatedProduct: function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP END - product terminated');
	sc.endStep();
}});
