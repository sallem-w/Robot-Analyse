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
		var message = ctx.string.trim(ActivInfinitev7.currentPage.evalScript('getMessages()'));
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
		ctx.setValue(ActivInfinitev7.pSearchContractIndiv.oIndividualContract, sc.data.contract.individualContract);
		if (date) {
			ctx.setValue(ActivInfinitev7.pSearchContractIndiv.oDateContract, date);
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
	
	scenarioHelper.searchCollectiveContract = function (sc, date, foundCb, notFoundCb) {
		ctx.setValue(ActivInfinitev7.pMembershipColSearch.oNumberContractCol, sc.data.contract.individualContractCollectif);
		ctx.setValue(ActivInfinitev7.pMembershipColSearch.oInsureGroup, sc.data.contract.insureGroup);
		if (date) {
			ctx.setValue(ActivInfinitev7.pMembershipColSearch.oStartDateEffect, date);
		}
		ActivInfinitev7.pMembershipColSearch.btSearch.click();
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
			function loop() {
				try {
					var noBtn = $('.bootbox.modal.fade.in .modal-footer > button[data-bb-handler="no"]');
					if (noBtn && noBtn.is(':visible')) {
						noBtn.click();
						return;
					}
				} catch (error) {}
				setTimeout(loop, 500);
			}
			setTimeout(loop, 500);
		};
		ActivInfinitev7.currentPage.injectFunction(cancelSave);
		ActivInfinitev7.currentPage.evalScript('cancelSave()');
		scenarioHelper.focusClick(btn);
	}
	
	scenarioHelper.focusClick = function focusClick(btn) {
		btn.setFocus();
		btn.click();
	}

	scenarioHelper.goHome = function goHome(callback) {
		ctx.trace.writeInfo('executing goHome()');
		ctx.trace.writeInfo('ActivInfinitev7.currentPage : ' + ActivInfinitev7.currentPage);
		if (ActivInfinitev7.currentPage) {
			ctx.trace.writeInfo('ActivInfinitev7.currentPage.notExist() : ' + ActivInfinitev7.currentPage.notExist());
		}
		ctx.trace.writeInfo('isPageLoaded : ' + !ActivInfinitev7.currentPage || (ActivInfinitev7.currentPage && ActivInfinitev7.currentPage.notExist()));
		if (!ActivInfinitev7.currentPage || (ActivInfinitev7.currentPage && ActivInfinitev7.currentPage.notExist())) {
			ctx.trace.writeInfo('Waiting for page to load before going to home');
			ctx.sleep();
			return goHome(callback);
		}
		if (ActivInfinitev7.currentPage.btClose && ActivInfinitev7.currentPage.btClose.exist()) {
			ctx.trace.writeInfo('Clicking close button');
			scenarioHelper.forceClick(ActivInfinitev7.currentPage.btClose);
			return ActivInfinitev7.pDashboard.wait(function() {
				callback();
			});
		}
		if (ActivInfinitev7.currentPage.btCancel && ActivInfinitev7.currentPage.btCancel.exist()) {
			ctx.trace.writeInfo('Clicking cancel button');
			scenarioHelper.focusClick(ActivInfinitev7.currentPage.btCancel);
			return ActivInfinitev7.events.LOAD.once(function() {
				return goHome(callback);
			});
		}

		ctx.trace.writeInfo('No close button found on current page: navigating to dashboard directly');
		ctx.scenarioHelper.goTo(ctx.scenarioHelper.pageLinks.dashboard);
		return ActivInfinitev7.pDashboard.wait(function() {
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
		ctx.trace.writeInfo('Reconnecting ...');
		ctx.exec('taskkill /f /im iexplore.exe');
		ActivInfinitev7.notify(ActivInfinitev7.events.QUIT);
		ActivInfinitev7.notify(ActivInfinitev7.events.END);
		ActivInfinitev7.waitClose(function () {
			ctx.trace.writeInfo('IE closed');
			ctx.shellexec(ctx.config.getPathStartProcessusBat(), sc.data.path);
			ActivInfinitev7.events.START.once(function (ev) {
				ctx.trace.writeInfo('IE restarted');
				sc.setDefaultInst(ev);
				ActivInfinitev7.pConnection.wait(function () {
					ctx.trace.writeInfo('login page loaded');
					ctx.setValue(ActivInfinitev7.pConnection.oLogin, sc.data.login);
					ctx.setValue(ActivInfinitev7.pConnection.oPassword, sc.data.password);
					ActivInfinitev7.pConnection.btLogin.setFocus();
					ActivInfinitev7.pConnection.btLogin.click();
				
					ActivInfinitev7.pDashboard.wait(function() {
						ctx.trace.writeInfo('relogged loading next line');
						return ctx.endScenario(sc, "Connection auto Infinite", "Déconnexion lors du traitement du contrat");
					});
				});
			});
		});
	}

	scenarioHelper.goNextPageTill = function goNextPageTill(page, callback) {
		ctx.trace.writeInfo('Navigating to ' + page.name);
		function loop() {
			if (!ActivInfinitev7.currentPage || !ActivInfinitev7.currentPage.exist()) {
				return ctx.wait(loop);
			}
			ctx.trace.writeInfo('Page : ' + ActivInfinitev7.currentPage.name);
			if (ActivInfinitev7.currentPage.name !== page.name) {
				ActivInfinitev7.currentPage.btNext.setFocus();
				ActivInfinitev7.currentPage.btNext.click();
				return ActivInfinitev7.currentPage.events.UNLOAD.once(loop);
			}
			
			return page.wait(callback);
		}
		
		loop();
	}
	


	return scenarioHelper;
}) ();
