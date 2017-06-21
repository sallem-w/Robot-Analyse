﻿ActivInfinitev7.scenario({ checkMembership: function(ev, sc) {
	sc.data.codeScenario = ctx.config.SIRH;
	sc.onTimeout(ctx.config.getTimeout(), function(sc, st) { sc.endScenario();	});
	sc.onError(function(sc, st, ex) { sc.endScenario();	});
	sc.setMode(e.scenario.mode.noStartIfRunning);
	sc.step(ActivInfinitev7.steps.initializeCheckMembership);
	sc.step(ActivInfinitev7.steps.navigateToMembership);
	sc.step(ActivInfinitev7.steps.setListSearchMembership);
	sc.step(ActivInfinitev7.steps.searchMembership);
	sc.step(ActivInfinitev7.steps.searchMembershipBenef);
	sc.step(ActivInfinitev7.steps.endCheckMembership);
}});

ActivInfinitev7.step({ initializeCheckMembership: function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContractCollectif + ' - START - checkMembership - ' + sc.data.codeScenario);
	sc.endStep();
}});

ActivInfinitev7.step({ navigateToMembership : function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContractCollectif + ' - STEP - navigateToMembership');
	ctx.scenarioHelper.goTo(ctx.scenarioHelper.pageLinks.membershipCollective);
	ActivInfinitev7.pMembershipColSearch.wait(function() {
		sc.endStep();
	});
}});

ActivInfinitev7.step({ setListSearchMembership : function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContractCollectif + ' - STEP - setListSearchMembership');
	
	// need to force onchange on list
	// Select 'Adhésion' on contract select list
	var selectValue = '2';
	if (ActivInfinitev7.pMembershipColSearch.oContractType.get() !== selectValue) {
		ActivInfinitev7.pMembershipColSearch.oContractType.set(selectValue);
	}
	
	function forceOnChange() {
		$('select[name="typeCtt"]').change();
	};
	
	ActivInfinitev7.pMembershipColSearch.injectFunction(forceOnChange);
	ActivInfinitev7.pMembershipColSearch.evalScript('forceOnChange()');
	
	ActivInfinitev7.pMembershipColSearch.events.UNLOAD.on(function() {
		ActivInfinitev7.pMembershipColSearch.events.LOAD.on(function() {
			sc.endStep();
		});
	});
}});

ActivInfinitev7.step({ searchMembership : function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContractCollectif + ' - STEP - searchMembership');
	
	ActivInfinitev7.pMembershipColSearch.oNumberContractCol.set(sc.data.contract.individualContractCollectif);
	ActivInfinitev7.pMembershipColSearch.oInsureGroup.set(sc.data.contract.insureGroup);
	ActivInfinitev7.pMembershipColSearch.oStartDateEffect.set(ctx.date.formatDDMMYYYY(new Date(ctx.date.now())));
	
	if (ctx.options.isDebug) {
		ctx.log('Need to click on button');
	}
	// ActivInfinitev7.pMembershipColSearch.btSearch.click();
	
	ActivInfinitev7.pTerminatedContractFo.events.LOAD.on(function() {
		ctx.trace.writeInfo(sc.data.contract.individualContractCollectif + ' - STEP - membership found');
		
		sc.data.commentContract = 'Adhésion trouvé';
		sc.data.statusContract = ctx.excelHelper.constants.status.Success;
		
		ActivInfinitev7.pTerminatedContractFo.oDemandDate.set(ctx.date.formatDDMMYYYY(ctx.date.setFirstDayOfMonth(ctx.date.now())));
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

ActivInfinitev7.step({ searchMembershipBenef : function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContractCollectif + ' - STEP - searchMembershipBenef');
	
	ActivInfinitev7.pMembershipSearchBene.oNumberINSEE.set(sc.data.contract.inseeNumber);
	ActivInfinitev7.pMembershipSearchBene.btSearch.click();
	
	ActivInfinitev7.pMembershipSearchBene.events.UNLOAD.on(function() {
		ActivInfinitev7.pMembershipSearchBene.events.LOAD.on(function() {
			var benefExist = ActivInfinitev7.pMembershipSearchBene.oSearchValid.exist();			
			if (!benefExist) {
				ActivInfinitev7.pMembershipSearchBene.btCancel.click();
				sc.data.isNewBenef = true;
				ActivInfinitev7.pMembershipMainBenef.wait(function() {
					sc.endStep();
				});
				return;
			}
			
			var isBenefFound = false;
			var contractBenefName = sc.data.contract.name + ' ' + sc.data.contract.firstName;
			for (var index in ActivInfinitev7.pMembershipSearchBene.oResultNameBenef.getAll()) {
				var benefName = ctx.string.trim(ActivInfinitev7.pMembershipSearchBene.oResultNameBenef.i(index).get());
				if (benefName.indexOf(contractBenefName) !== -1) {
					ActivInfinitev7.pMembershipSearchBene.oResultNameBenef.i(index).click();
					isBenefFound = true;
				}
			}
			
			if (isBenefFound) {
				ActivInfinitev7.pMembershipSearchBene.btValid.click();
				sc.data.isUpdateBenef = true;
				ActivInfinitev7.pMembershipMainBenef.wait(function() {
					sc.endStep();
				});
				return;
			}
			
			sc.data.commentContract = 'Revoir centre: impossible de trouver l\'adhérent ' + contractBenefName;
			sc.data.statusContract = ctx.excelHelper.constants.status.Fail;
			ctx.scenarioHelper.goHome(function() {
				sc.endScenario();
			});
		});
	});
}});
	
ActivInfinitev7.step({ endCheckMembership : function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContractCollectif + ' - STEP - endCheckMembership');
	ctx.trace.writeInfo(sc.data.contract.individualContractCollectif + ' - END - checkMembership - ' + sc.data.codeScenario);
	sc.endStep();
}});
