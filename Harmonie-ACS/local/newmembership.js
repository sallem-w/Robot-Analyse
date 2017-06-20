ActivInfinitev7.scenario({ newMembership: function(ev, sc) {
	sc.data.codeScenario = ctx.config.SIRH;
	sc.onTimeout(ctx.config.getTimeout(), function(sc, st) { sc.endScenario();	});
	sc.onError(function(sc, st, ex) { sc.endScenario();	});
	sc.setMode(e.scenario.mode.noStartIfRunning);
	sc.step(ActivInfinitev7.steps.initializeNewMembership);
	sc.step(ActivInfinitev7.steps.navigateToMembership);
	sc.step(ActivInfinitev7.steps.searchNewMembership);
	sc.step(ActivInfinitev7.steps.endNewMembership);
}});

ActivInfinitev7.step({ initializeNewMembership: function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContractCollectif + ' - START - newMembership - ' + sc.data.codeScenario);
	sc.endStep();
}});

ActivInfinitev7.step({ searchNewMembership : function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContractCollectif + ' - STEP - searchNewMembership');
	
	ActivInfinitev7.pMembershipColSearch.oNumberContractCol.set(sc.data.contract.individualContractCollectif);
	ActivInfinitev7.pMembershipColSearch.oInsureGroup.set(sc.data.contract.insureGroup);
	ActivInfinitev7.pMembershipColSearch.oStartDateEffect.set(ctx.date.formatDDMMYYYY(new Date(ctx.date.now())));
	ActivInfinitev7.pMembershipColSearch.oContractType.set('2'); // Select 'Adhésion' on contract select list
	ActivInfinitev7.pMembershipColSearch.btSearch.click();
	
	ActivInfinitev7.pTerminatedContractFo.events.LOAD.on(function() {
		ctx.trace.writeInfo(sc.data.contract.individualContractCollectif + ' - STEP - membership found');
		
		sc.data.commentContract = 'Adhésion trouvé';
		sc.data.statusContract = ctx.excelHelper.constants.status.Success;
		
		ActivInfinitev7.pTerminatedContractFo.oDemandDate.set(ctx.date.formatDDMMYYYY(new Date(ctx.date.now())));
		ActivInfinitev7.pTerminatedContractFo.btNext.click();
		ActivInfinitev7.pMembershipSearchBene.wait(function() {
			sc.endStep();
		});
	});
	
	ActivInfinitev7.pMembershipColSearch.events.UNLOAD.on(function() {
		ActivInfinitev7.pMembershipColSearch.events.LOAD.on(function() {
			var message = ctx.scenarioHelper.withEmptyMessagesPopup(ctx.scenarioHelper.getMessagesPopup());
			ctx.trace.writeInfo(sc.data.contract.individualContractCollectif + ' - END SCENARIO - membership not found');
			sc.data.commentContract = 'Revoir centre: ' + message;
			sc.data.statusContract = ctx.excelHelper.constants.status.Fail;
			ctx.scenarioHelper.goHome(function() {
				sc.endScenario();
			});
		});
	});
}});

ActivInfinitev7.step({ endNewMembership : function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContractCollectif + ' - STEP - endNewMembership');
	ctx.trace.writeInfo(sc.data.contract.individualContractCollectif + ' - END - newMembership - ' + sc.data.codeScenario);
	sc.endStep();
}});
