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
		dashboard: '/mdg/'
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

	scenarioHelper.searchContract = function (sc, date, foundCb, notFoundCb) {
		ActivInfinitev7.pSearchContractIndiv.oIndividualContract.setFocus();
		ActivInfinitev7.pSearchContractIndiv.oIndividualContract.set(sc.data.contract.individualContract);
		if (date) {
			ActivInfinitev7.pSearchContractIndiv.oDateContract.setFocus();
			ActivInfinitev7.pSearchContractIndiv.oDateContract.set(date);
		}
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
	
	scenarioHelper.forceClick = function forceClick(btn) {
		function cancelSave() {
			$('.modal-footer > button[data-bb-handler="no"]').click();
		};
		ActivInfinitev7.currentPage.injectFunction(cancelSave);
		btn.click();
		try {
			ActivInfinitev7.currentPage.evalScript('cancelSave();');
		} catch (error) {} // if it fail, then the the popup did not show
	}

	scenarioHelper.goHome = function(callback) {
		if(ActivInfinitev7.currentPage.btClose && ActivInfinitev7.currentPage.btClose.exist()) {
			scenarioHelper.forceClick(ActivInfinitev7.currentPage.btClose);
		} else {
			ctx.trace.writeWarning('No close button found on current page: navigating to dashboard directly');
			ctx.scenarioHelper.goTo(ctx.scenarioHelper.pageLinks.dashboard);
		}

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
	
	scenarioHelper.connectionAuto = function(sc) {
		if (!ActivInfinitev7.pConnection.exist()) {
			var message = (sc.data.contract.individualContract || sc.data.contract.individualContractCollectif) +  ' - Error undefined';
			var comment = 'Erreur traitement inconnue';
			return ctx.endScenario(sc, message, comment);
		}
		
		ActivInfinitev7.pConnection.oLogin.set(sc.data.login);
		ActivInfinitev7.pConnection.oPassword.set(sc.data.password);
		ActivInfinitev7.pConnection.btLogin.click();
	
		ActivInfinitev7.pDashboard.wait(function() {
			return ctx.endScenario(sc, "Connection auto Infinite", "Déconnexion lors du traitement du contrat");
		});
	}
		
	return scenarioHelper;
}) ();
