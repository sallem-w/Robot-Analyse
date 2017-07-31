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
	
	scenarioHelper.getMessagesPopup = function(currentPage) {
		function getMessages() {
			return $('#cgd-toast-container-right .toast-message > .row:first-child').text();
		}
		
		currentPage.injectFunction(getMessages);
		var message = ctx.string.trim(currentPage.evalScript('getMessages()'));
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
			var errorMessage = ctx.scenarioHelper.withEmptyMessagesPopup(ctx.scenarioHelper.getMessagesPopup(ActivInfinitev7.pContractIndivNotFoun));
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
			var errorMessage = ctx.scenarioHelper.withEmptyMessagesPopup(ctx.scenarioHelper.getMessagesPopup(ActivInfinitev7.pContractIndivNotFoun));
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
		btn.page.injectFunction(cancelSave);
		btn.page.evalScript('cancelSave()');
		scenarioHelper.click(btn);
	}
	
	scenarioHelper.click = function click(btn) {
		btn.setFocus();
		btn.click();
	}

	scenarioHelper.goHome = function goHome(callback) {
		ctx.trace.writeInfo('executing goHome()');
		function loop(currentPage) {
			try {
				ctx.trace.writeInfo('executing goHome loop(), page : ' + currentPage && currentPage.name);

				if (!currentPage || currentPage.notExist()) {
					ctx.trace.writeInfo('Waiting for page to load before going to home');
					return ctx.scenarioHelper.waitPageChange(currentPage, function (error, page) {
						if (error) {
							return callback(error);
						}
						return loop(page);
					});
				}
				if(currentPage.name === ActivInfinitev7.pDashboard.name || currentPage.name === ActivInfinitev7.pConnection.name) {
					return callback();
				}
				if (currentPage.btClose && currentPage.btClose.exist()) {
					ctx.trace.writeInfo('Clicking close button');
					scenarioHelper.forceClick(currentPage.btClose);
					return ActivInfinitev7.pDashboard.wait(function() {
						callback();
					});
				}
				if (currentPage.btCancel && currentPage.btCancel.exist()) {
					ctx.trace.writeInfo('Clicking cancel button');
					scenarioHelper.click(currentPage.btCancel);
					return scenarioHelper.waitPageChange(currentPage, function (error, newPage) {
						if (error) {
							return callback(error);
						}
						return loop(newPage);
					});
				}

				ctx.trace.writeInfo('No close button found on current page: navigating to dashboard directly');
				ctx.scenarioHelper.goTo(currentPage, ctx.scenarioHelper.pageLinks.dashboard);
				return ActivInfinitev7.pDashboard.wait(function() {
					callback();
				});
			} catch (error) {
				callback(error);
			}
		}

		scenarioHelper.getCurrentPage(function (error, currentPage) {
			loop(currentPage);
		});
	}

	scenarioHelper.goTo = function(currentPage, link) {
		function navigateTo(pageToGo) {
			setTimeout(function() {
				window.location.href = pageToGo;
			}, 1500);
		}
		
		currentPage.injectFunction(navigateTo);
		currentPage.execScript('navigateTo(\''+ link +'\')');
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
	
	function restartApplicationAndReconnect(sc) {
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
		}
	
	scenarioHelper.connectionAuto = function(sc) {
		ctx.trace.writeInfo('Reconnecting ...');
		try {
			ActivInfinitev7.close();
			return ActivInfinitev7.waitClose(function () {
				restartApplicationAndReconnect(sc);
			});
		} catch (error) {
			ctx.trace.writeWarning('Error while trying to close IE : ' + error.message + ' supposing it is already closed');
			restartApplicationAndReconnect(sc);			
		}
	}

	scenarioHelper.goNextPageTill = function goNextPageTill(page, callback) {
		ctx.trace.writeInfo('Navigating to ' + page.name);
		var previousPageName = null;

		function loop(currentPage) {
			ctx.trace.writeInfo('Now on page : ' + currentPage.name);
			if(currentPage.name === previousPageName) {
				return callback(new Error('Error while trying to go to ' + page.name + ' Blocked on page : ' + previousPageName));
			}
			previousPageName = currentPage.name;
			if(currentPage.name === page.name) {
				return callback();
			}
			if (!currentPage.btNext || !currentPage.btNext.exist()) {
				return callback(new Error('Error while trying to go to ' + page.name + ' No btNext on page : ' + currentPage.name));
			}
			try {
				currentPage.btNext.setFocus();
				currentPage.btNext.click();
			} catch (error) {
				return callback(new Error('Error while trying to go to ' + page.name + ' Error when trying to click btNext on page : ' + currentPage.name));
			}

			return scenarioHelper.waitPageChange(currentPage, function (error, newPage) {
				if (error) {
					return callback(new Error('Error while trying to go to ' + page.name + ' : ' + error.message));
				}
				return loop(newPage);
			});
		}

		return scenarioHelper.getCurrentPage(function (error, currentPage) {
			if (error) {
				return callback(new Error('Error while trying to determine current page ' + error.message));
			}
			return loop(currentPage);
		});
	}

	scenarioHelper.waitPageChange = function (currentPage, callback, targetPages) {
		ctx.trace.writeInfo('waiting for page to change');
		var unloadListener, timeoutListener;
		unloadListener = currentPage.events.UNLOAD.once(function () {
			ctx.off(timeoutListener);
			ctx.trace.writeInfo('page : ' + currentPage.name + ' has unloaded');
			scenarioHelper.waitPageLoad(callback, targetPages);
		});
		timeoutListener = ctx.wait(function () {
			callback(new Error('Timeout of 10s reached while waiting for page ' + currentPage.name + ' to unload.'));
			ctx.off(unloadListener);
		}, 10000);
	}

	scenarioHelper.waitPageLoad = function (callback, targetPages) {
		ctx.trace.writeInfo('waiting for a page to load');
		targetPages = targetPages || _.map(function (pageName) {
			return ActivInfinitev7.pages[pageName];
		}, Object.keys(ActivInfinitev7.pages));
		var resolved = false;
		var listeners = null;
		var timeoutListener;
		var callbackWrapper = function (page) {
			if (listeners) { // a listener can be triggered before the listeners array has finished being initialised
				_.map(ctx.off, listeners);
				delete listeners;
			}
			if (resolved) {
				return;
			}
			resolved = true;
			ctx.off(timeoutListener);
			ctx.trace.writeInfo('page loaded : ' + page.name);
			return callback(null, page);
		}

		listeners = _.map(function (page) {
			return page.events.LOAD.once(function () {
				ctx.trace.writeInfo('detected : ' + page.name);
				if (page.name === '_Undefined_') {
					return;
				}
				callbackWrapper(page);
			});
		}, targetPages);
		timeoutListener = ctx.wait(function () {
			resolved = true;
			_.map(ctx.off, listeners);
			callback(new Error('Timeout of 10s reached while waiting for a page to load.'));
		}, 10000);
	};
	
	scenarioHelper.getCurrentPage  = function (callback) {
		try {
			ctx.trace.writeInfo('Determining current page');
			if(ActivInfinitev7.notExist()) {
				return callback(new Error('IE is currently closed'));
			}
			var currentPage = ActivInfinitev7.currentPage || ActivInfinitev7.getCurrentPage();
			if (currentPage && currentPage.name !== '_Undefined_') {
				return callback(null, currentPage);
			}
			
			return scenarioHelper.waitPageLoad(callback);
		} catch(error) {
			callback(error);
		}
	};

	return scenarioHelper;
}) ();
