function getValueToolTipSynthesis(idRow) {
	return $('tr[id="' + idRow + '"] td:nth-child(2) i').tooltipster('content');
};

function isCurrentIndividualContractTooltip(idRow, individualContract) {
	ActivInfinitev7.pSynthesis.injectFunction(getValueToolTipSynthesis);
	var content = ActivInfinitev7.pSynthesis.evalScript('getValueToolTipSynthesis(' + idRow + ')');
	
	var pattern = /\d+/g;
	var result = content.match(pattern);
	for (var index = 0; index < result.length; index++) {
		if (result[index] === individualContract) {
			return true;
		}
	}
	return false;
}

ActivInfinitev7.step({ checkSynthesis : function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - checkSynthesis');
	
	if (ActivInfinitev7.pSynthesis.oIndividualContract.count() === 1 &&
		  ctx.string.trim(ActivInfinitev7.pSynthesis.oIndividualContract.i(0).get()) === "Aucune donnée disponible dans le tableau") {
		ctx.trace.writeInfo(sc.data.contract.individualContract + ' - END SCENARIO - benef id not found');
		sc.data.commentContract = 'Le numéro de personne assuré n\'existe pas (' + sc.data.contract.insuredIdentifiant + ') - page synthèse';
		sc.data.statusContract = ctx.excelHelper.constants.status.Fail;
		ctx.scenarioHelper.goHome(function() {
			sc.endScenario();
		});
		return;
	}
	
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
		sc.data.commentContract = 'Revoir centre: Plusieurs contrats sont ouverts pour la personne - page synthèse';
		sc.data.countCaseBackToCenter += 1;
		sc.data.statusContract = ctx.excelHelper.constants.status.Fail;
		ctx.scenarioHelper.goHome(function() {
			sc.endScenario();
		});
	} else if (countOpenContractLists === 1 && isOpenCurrentContract) {
		ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - checkSynthesis - One contract open and it\'s current contract');
		ctx.scenarioHelper.goHome(function() {
			sc.endStep();
		});
	}
	else if (countOpenContractLists === 0 && dateEndCurrentContract !== undefined && String(sc.data.contract.ACSCertificateEndDate) === String(dateEndCurrentContract)) {
		ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - checkSynthesis - All contract close and current contract correspond with date (outputDate: ' + sc.data.contract.ACSCertificateEndDate + ' / WebsiteDate: ' + dateEndCurrentContract + ' )');
		ctx.scenarioHelper.goHome(function() {
			sc.endStep();
		});
	} else {
		ctx.trace.writeInfo(sc.data.contract.individualContract + ' - END SCENARIO - does not under any cases');
		sc.data.commentContract = 'Revoir centre: Ne rentre dans aucun cas - page synthèse';
		sc.data.countCaseBackToCenter += 1;
		sc.data.statusContract = ctx.excelHelper.constants.status.Fail;
		ctx.scenarioHelper.goHome(function() {
			sc.endScenario();
		});
	}
}});
