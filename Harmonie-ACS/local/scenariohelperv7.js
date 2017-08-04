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
		var rawMessage = currentPage.evalScript('getMessages()');
		var message = ctx.string.trim(rawMessage);
		return message;
	}

	scenarioHelper.withEmptyMessagesPopup = function(message) {
		if (ctx.string.trim(message) === '' || message === undefined) {
			message = 'Problème inconnu, impossible de récupérer le message de la POPUP d\'erreur \n';
		}
		message = ctx.stringHelper.removeReturnAndTab(message);
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
			errorMessage = ctx.stringHelper.removeReturnAndTab(errorMessage);
			sc.data.commentContract = 'Revoir centre: Erreur recherche contrat : ' + errorMessage;
			sc.data.statusContract = ctx.excelHelper.constants.status.Fail;
			notFoundCb(ActivInfinitev7.pContractIndivNotFoun);
		  ctx.off(foundListener);
		});

		foundListener = ActivInfinitev7.pTerminatedContractFo.wait(function() {
			ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - contract found');
			sc.data.statusContract = ctx.excelHelper.constants.status.Success;
			foundCb(ActivInfinitev7.pTerminatedContractFo);
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
			errorMessage = ctx.stringHelper.removeReturnAndTab(errorMessage);
			sc.data.commentContract = 'Revoir centre: Erreur recherche contrat : ' + errorMessage;
			sc.data.statusContract = ctx.excelHelper.constants.status.Fail;
			notFoundCb(ActivInfinitev7.pContractIndivNotFoun);
		  ctx.off(foundListener);
		});

		foundListener = ActivInfinitev7.pTerminatedContractFo.wait(function() {
			ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - contract found');
			sc.data.statusContract = ctx.excelHelper.constants.status.Success;
			foundCb(ActivInfinitev7.pTerminatedContractFo);
			ctx.off(notFoundListener);
		});
	}

	/*
	 * Click a button, and then detect if there is a save current operation modal, and click "non" 
	 * Needed, because of a bug on infinite, that randomly ask for confirmation when navigating with the next button
	 */
	scenarioHelper.forceClick = function forceClick(btn) {
		function cancelSave() { // check if a modal opened on the curent page every 500ms, this script will automatically unload when the page change
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
	
	/* 
	 * helper that focus and click on a button
	 * You should always focus a button before clicking it, otherwise if the focus is on an input, this can have weird effect, such as reloading the page.
	 * btn: the button we want clicked
	 */
	scenarioHelper.click = function click(btn) {
		btn.setFocus();
		btn.click();
	}

	/*
	 * Allow to go to dashboard page from startPage
	 * When we need to return home from a scenario that could not be finished
	 * We must use the close button present on almost all page to abort the current operation.
	 * Not doing so would resut in the current edited contract to be blocked
	 * We also check for a cancel button, to close popup that would hide the close button
	 * startPage: the currentPage of the application
	 * callback: will get called with an error if any, or when we arrived on dashboard
	 */
	scenarioHelper.goHome = function goHome(startPage, callback) {
		ctx.trace.writeInfo('executing goHome()');

		// recursive loop will call itself on each page change until it arrive on dashboard
		function loop(currentPage) {
			try {
				ctx.trace.writeInfo('executing goHome loop(), page : ' + currentPage && currentPage.name);

				if (!currentPage || currentPage.notExist()) { // A page is currently loading, waiting for it
					ctx.trace.writeInfo('Waiting for page to load before going to home');
					return ctx.scenarioHelper.waitPageChange(currentPage, function (error, page) {
						if (error) {
							return callback(error);
						}
						return loop(page); // going to the next loop with the new Page
					});
				}

				if (currentPage.name === ActivInfinitev7.pConnection.name) { // Are we on login page
					return callback(new Error('Application got disconnected, we cannot return to dashboard'));
				}
				if(currentPage.name === ActivInfinitev7.pDashboard.name) {  // Are we on dashboard page 
					return callback(); // done
				}
				if (currentPage.btClose && currentPage.btClose.exist()) { // Is there a close button (lead on dashboard, and cancel the current operation) on the current page
					ctx.trace.writeInfo('Clicking close button');
					scenarioHelper.forceClick(currentPage.btClose);
					return ActivInfinitev7.pDashboard.wait(function() { // wait for dashboard
						callback(); // done
					});
				}
				if (currentPage.btCancel && currentPage.btCancel.exist()) { // Is there a cancel button ?
					ctx.trace.writeInfo('Clicking cancel button');
					scenarioHelper.click(currentPage.btCancel);
					return scenarioHelper.waitPageChange(currentPage, function (error, newPage) {
						if (error) {
							return callback(error);
						}
						return loop(newPage);
					});
				}

				// no close nor cancel button, we enter the url directly (happen on synthesis pages)
				ctx.trace.writeInfo('No close button found on current page: navigating to dashboard directly');
				ctx.scenarioHelper.goTo(currentPage, ctx.scenarioHelper.pageLinks.dashboard);
				return ActivInfinitev7.pDashboard.wait(function() {
					callback();
				});
			} catch (error) {
				callback(error);
			}
		}

		loop(startPage);
	}

	/*
	 * Allow to return to the dashboard page, during an error recovery, when we are not sure of the state of the application
	 * if you know the current page, use goHome
	 * callback : will be called with an error if any, or when the dashboard has loaded
	 */
	scenarioHelper.goHomeFromUnknowPage = function goHomeFromUnknowPage(callback) {
		ctx.trace.writeInfo('executing goHomeFromUnknowPage()');

		scenarioHelper.getCurrentPage(function (error, currentPage) {
			if (error) {
				return callback(error);
			}
			ctx.trace.writeInfo('detected currentPage : ' + currentPage.name);
			return scenarioHelper.goHome(currentPage, callback);
		});
	}

	/*
	 * go to link by changing the href directly
	 * Should only be used when there is no link tag toward the desired page
	 * currentPage: The page we are currently on
	 * the link (url) we want to go to
	 */
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

	/*
	 * launch the application and login then go to the next line (scenario)
	 * used during error recovery
	 * sc: the current scenario object
	 */
	function restartApplicationAndReconnect(sc) {
		ctx.trace.writeInfo('IE closed');
		ctx.shellexec(ctx.config.getPathStartProcessusBat(), sc.data.path); // lauch IE from the command line
		ActivInfinitev7.events.START.once(function (ev) {
			ctx.trace.writeInfo('IE restarted');
			sc.setDefaultInst(ev); // Pass the start event to the current scenario, allowing it to resume
			ActivInfinitev7.pConnection.wait(function () {
				ctx.trace.writeInfo('login page loaded');
				ctx.setValue(ActivInfinitev7.pConnection.oLogin, sc.data.login);
				ctx.setValue(ActivInfinitev7.pConnection.oPassword, sc.data.password);
				ActivInfinitev7.pConnection.btLogin.setFocus();
				ActivInfinitev7.pConnection.btLogin.click(); // logging in
			
				ActivInfinitev7.pDashboard.wait(function() {
					ctx.trace.writeInfo('relogged loading next line');
					return ctx.endScenario(sc, ActivInfinitev7.pDashboard, "Connection auto Infinite", "Déconnexion lors du traitement du contrat"); // ending current scenario, thus allowing the next one to start
				});
			});
		});
	}

	/*
	 * Close the application, relaunch and connect it then go to the next line
	 * used during error recovery
	 * sc: the current scenario object
	 */
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

	/* Helper that will try to go from startPage to endPage by clicking on the btNext button on the page until it arrive, or encounter an error.
	 * startPage: the page we are on at the start
	 * endPage: the page we want to arrive at
	 * callback: the function that will get called once arrived at endPage or with an error if any.
	*/
	scenarioHelper.goNextFromPageToPage = function goNextFromPageToPage(startPage, endPage, callback) {
		ctx.trace.writeInfo('Navigating to ' + endPage.name + ' from ' + startPage.name);
		var previousPageName = null;

		function loop(currentPage) { // recursive loop function will keep calling itself, until it arrive at the target page
			try {
				ctx.trace.writeInfo('Now on page : ' + currentPage.name);
				if(currentPage.name === previousPageName) { // We did not change page although a page did load, this would keep repeating, so we abort with an error
					return callback(new Error('Error while trying to go to ' + endPage.name + ' Blocked on page : ' + previousPageName));
				}
				previousPageName = currentPage.name;
				if(currentPage.name === endPage.name) { // We arrived at the target page 
					return callback();
				}
				if (!currentPage.btNext || !currentPage.btNext.exist()) { // There is no btNext button on the page to continue, aborting
					return callback(new Error('Error while trying to go to ' + endPage.name + ' No btNext on page : ' + currentPage.name));
				}
				try {
					currentPage.btNext.setFocus();
					currentPage.btNext.click();
				} catch (error) { // we were not able to click on the btNext button, aborting
					return callback(new Error('Error while trying to go to ' + endPage.name + ' Error when trying to click btNext on page : ' + currentPage.name));
				}

				return scenarioHelper.waitPageChange(currentPage, function (error, newPage) { // Waiting for a page to load.
					if (error) {
						return callback(new Error('Error while trying to go to ' + endPage.name + ' : ' + error.message));
					}
					return loop(newPage); // calling the next loop
				});
			} catch (error) {
				return callback(new Error('Error while trying to go to ' + endPage.name + ' : ' + error.message));
			}
		}

		return loop(startPage); // initiate loop from the starting page
	}

	/*
	 * Wait for a page to change : the current page has unloaded (UNLOAD event), and another (or the same one) has reloaded(LOAD event)
	 * currentPage: the page we are currently on
	 * callback: the function that will receive an error if any, and the new page that has loaded
	 * targetPages: Optional, an array of page we are supposed to arrive at, default to all page of the application
	 */
	scenarioHelper.waitPageChange = function (currentPage, callback, targetPages) {
		ctx.trace.writeInfo('waiting for page to change');
		var unloadListener, timeoutListener;
		unloadListener = currentPage.events.UNLOAD.once(function () {
			ctx.off(timeoutListener);
			ctx.trace.writeInfo('page : ' + currentPage.name + ' has unloaded');
			scenarioHelper.waitPageLoad(callback, targetPages);
		});
		timeoutListener = ctx.wait(function () {
			callback(new Error('Timeout of 30s reached while waiting for page ' + currentPage.name + ' to unload.'));
			ctx.off(unloadListener);
		}, 30000);
	}

	/*
	 * Wait for a page to load, assume that a page is currently loading (A UNLOAD event has fired, but not load event)
	 * used by waitPageChange, and getCurrentPage.
	 * In the case of getCurrentPage, it allow to recover from an uncertain situation, when an unhandled error as aborted the current scenario (line in excel)
	 * while a page was loading
	 * This should never be used directly otherwise, use waitPageChange instead.
	 * callback: callback that will get called wit an error if any, and with the page that has loaded
	 * targetPages: Optional, an array of page we are supposed to arrive at, default to all page of the application
	 */
	scenarioHelper.waitPageLoad = function (callback, targetPages) {
		ctx.trace.writeInfo('waiting for a page to load');
		targetPages = targetPages || _.map(function (pageName) { // default targetPages to all pages
			return ActivInfinitev7.pages[pageName];
		}, Object.keys(ActivInfinitev7.pages));
		var resolved = false;
		var listeners = null;
		var timeoutListener;
		var callbackWrapper = function (page) { // Add some operation before calling the callback with the loaded page
			if (listeners) { // a listener can be triggered before the listeners array has finished being initialised
				_.map(ctx.off, listeners); // Disable all other listeners
				delete listeners;
			}
			if (resolved) { // check if the callback has already been called
				return;
			}
			resolved = true;
			ctx.off(timeoutListener); // disable the timeout
			ctx.trace.writeInfo('page loaded : ' + page.name);
			return callback(null, page); // return the loaded page
		}

		listeners = _.map(function (page) {
			return page.events.LOAD.once(function () { // Add a LOAD listener on all targetPages
				ctx.trace.writeInfo('detected : ' + page.name);
				if (page.name === '_Undefined_') { // if the page is _Undefined_, then it is a page we do not know (probably the spinner between two page) so we ignore it
					return;
				}
				callbackWrapper(page); // A page has loaded, triggering the callback operation
			});
		}, targetPages);
		timeoutListener = ctx.wait(function () { // Wait for ten seconds and if no page has loaded abort with an error
			resolved = true;
			_.map(ctx.off, listeners); // disable all o LOAD listener
			callback(new Error('Timeout of 30s reached while waiting for a page to load.'));
		}, 30000);
	};
	
	/*
	 * getCurrentPage determine which page we are on 
	 * Used only during error recovery, whe we cannot be sure of the state of the application (Is a page currently loading ?)
	 * callback function that will get called with an error if any, and with the current page
	 */
	scenarioHelper.getCurrentPage = function (callback) {
		try {
			ctx.trace.writeInfo('Determining current page');
			if(ActivInfinitev7.notExist()) { // first we check if the application is open
				return callback(new Error('IE is currently closed'));
			}
			var currentPage = ActivInfinitev7.currentPage || ActivInfinitev7.getCurrentPage(); // We try to get the currentPage
			if (currentPage && currentPage.name !== '_Undefined_') {
				return callback(null, currentPage);
			}
			 
			// No currentPage, we wait for a page to load
			return scenarioHelper.waitPageLoad(callback);
		} catch(error) {
			callback(error);
		}
	};

	return scenarioHelper;
}) ();
