 ctx.scenarioHelper = (function() {
	
	var scenarioHelper = {};
	scenarioHelper.constantes = {
		ASSPRI: 'ASSPRI',
		productValid: 'VA',
		productTerminated : 'RA'
	};
	
	scenarioHelper.correspondenceRange = {
		ASSPRI: ['1'],
		CONJOI: ['11'],
		ENFANT: ['21', '22', '23', '24', '25', '26', '27', '28', '29']
	};
	
	scenarioHelper.pageLinks = {
		dashboard: '/mdg/',
		consultation: '/mdg/Go.do?id=ACCO03STSO',
		coverageChange: '/mdg/Go.do?id=ACCC01STD',
		terminatedProduct: '/mdg/Go.do?id=ACCC04STD',
		terminatedContract: '/mdg/Go.do?id=ACRE04RE4S',
		terminatedInAdvance: '/mdg/Go.do?id=ACRE01REAC',
		terminatedCMU: '/mdg/Go.do?id=ACRE01RE3F',
		synthesis: '/mdg/Go.do?id=ACW1&action=afficherContrat',
		membershipCollective: '/mdg/Go.do?id=ACSO01ASOB'
	};
	
	scenarioHelper.getMessagesPopup = function() {
		function getMessages() {
			return $('#cgd-toast-container-right .toast-message > .row:first-child').text();
		}
		
		ActivInfinitev7.currentPage.injectFunction(getMessages);
		var message = ActivInfinitev7.currentPage.evalScript('getMessages()');
		return message;
	}

	scenarioHelper.withEmptyMessagesPopup = function(message) {
		if (ctx.string.trim(message) === '' || message === undefined) {
			message = 'Problème inconnu, impossible de récupérer le message de la POPUP d\'erreur \n';
		}
		return message;
	}

	scenarioHelper.searchContract = function (sc, foundCb, notFoundCb) {
		ActivInfinitev7.pSearchContractIndiv.oIndividualContract.set(sc.data.contract.individualContract);
		ActivInfinitev7.pSearchContractIndiv.oDateContract.set(ctx.date.formatDDMMYYYY(ctx.date.addDay(new Date(sc.data.contract.particularSituationEndDate), 1)));
		ActivInfinitev7.pSearchContractIndiv.btSearch.click();
		var foundListener, notFoundListener;
		notFoundListener = ActivInfinitev7.pContractIndivNotFoun.wait(function () {
			var errorMessage = ctx.scenarioHelper.withEmptyMessagesPopup(ctx.scenarioHelper.getMessagesPopup());
			ctx.trace.writeError(sc.data.contract.individualContract + ' - error search contract : ' + errorMessage);
			sc.data.commentContract = 'Revoir centre: Erreur recherche contrat : ' + errorMessage;
			sc.data.statusContract = ctx.excelHelper.constants.status.Fail;
			notFoundCb();
		  ctx.off(foundListener);
		});

		foundListener = ActivInfinitev7.pTerminatedContractFo.wait(function() {
			ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - contract found');
			sc.data.statusContract = ctx.excelHelper.constants.status.Success;
			foundCb();
			ctx.off(notFoundListener);
		});
	}

	scenarioHelper.goHome = function(callback) {
		ctx.scenarioHelper.goTo(ctx.scenarioHelper.pageLinks.dashboard);
		ActivInfinitev7.pDashboard.wait(function() {
			callback();
		});
	}

	scenarioHelper.goTo = function(page) {
		function navigateTo(pageToGo) {
			setTimeout(function() {
				window.location.href = pageToGo;
			}, 1500);
		}
		
		ActivInfinitev7.currentPage.injectFunction(navigateTo);
		ActivInfinitev7.currentPage.execScript('navigateTo(\''+ page +'\')');
	}

	/**
	 * Function use to find an insured into the list created by the input file.
	 * type : String 
	 * Array of contract
	 */	
	scenarioHelper.searchInsuredFromType = function(type, beneficiaries) {
		for (var i in beneficiaries) {
			if (beneficiaries[i].type === type) {
				return beneficiaries[i];
			}
		}
		return false;
	}
	
	return scenarioHelper;
}) ();
