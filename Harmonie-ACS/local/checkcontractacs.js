ActivInfinitev7.scenario({ checkContract: function(ev, sc) {
	var data = sc.data;
	sc.onTimeout(ctx.config.getTimeout(), function(sc, st) { sc.endScenario();	});
	sc.onError(function(sc, st, ex) { sc.endScenario();	});
	sc.setMode(e.scenario.mode.noStartIfRunning);
	sc.step(ActivInfinitev7.steps.initializeCheckContract);
	sc.step(ActivInfinitev7.steps.navigateToSynthesis);
	sc.step(ActivInfinitev7.steps.searchBenefInSynthesis);
	sc.step(ActivInfinitev7.steps.checkSynthesis);
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
		sc.endScenario();
	} else if (countOpenContractLists === 1 && isOpenCurrentContract) {
		ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - checkSynthesis - One contract open and it\'s current contract');
		sc.endStep();
	}
	else if (countOpenContractLists === 0 && dateEndCurrentContract !== undefined && String(sc.data.contract.ACSCertificateEndDate) === String(dateEndCurrentContract)) {
		ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - checkSynthesis - All contract close and current contract correspond with date (outputDate: ' + sc.data.contract.ACSCertificateEndDate + ' / WebsiteDate: ' + dateEndCurrentContract + ' )');
		sc.endStep();
	} else {
		ctx.trace.writeInfo(sc.data.contract.individualContract + ' - END SCENARIO - does not under any cases');
		sc.data.commentContract = 'Ne rentre dans aucun cas - page synthèse';
		sc.data.statusContract = ctx.excelHelper.constants.status.Fail;
		sc.endScenario();
	}
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
	var content = ActivInfinitev7.pSynthesis.execScript('getValueToolTipSynthesis(' + idRow + ')');
	
	var pattern = /\d+/g;
	var result = content.match(pattern);
	for (var index = 0; index < result.length; index++) {
		if (result[index] === individualContract) {
			return true;
		}
	}
	return false;
}
