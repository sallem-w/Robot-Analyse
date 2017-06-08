 ctx.scenarioHelper = (function() {
	
	var scenarioHelper = {};
	scenarioHelper.constantes = {
		ASSPRI: 'ASSPRI',
		productValid: 'VA',
		productTerminated : 'RA'
	};
	
	scenarioHelper.pageLinks = {
		synthesis : '/mdg/Go.do?id=ACW1&action=afficherContrat'
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
  
	scenarioHelper.checkIfContractFound = function(sc, callback) {
		ActivInfinitev7.pSearchContractIndiv.events.LOAD.on(function() {
			var errorMessage = ctx.scenarioHelper.withEmptyMessagesPopup(ctx.scenarioHelper.getMessagesPopup());
			ctx.trace.writeError(sc.data.contract.individualContract + ' - error search contract : ' + errorMessage);
			sc.data.commentContract = 'Revoir centre: Erreur recherche contrat : ' + errorMessage;
			sc.data.statusContract = ctx.excelHelper.constants.status.Fail;
			if (callback) {
				callback();
			}
		});
	}
	
	scenarioHelper.goHome = function(callback) {
	
		function navigateToHome() {
			setTimeout(function() {
				window.location.href = '/mdg/';
			}, 1500);
		};
	
		ActivInfinitev7.currentPage.injectFunction(navigateToHome);
		ActivInfinitev7.currentPage.execScript('navigateToHome()');
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
