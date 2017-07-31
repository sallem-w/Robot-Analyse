(function () {
	ActivInfinitev7.scenario({ checkMembership: function(ev, sc) {
		sc.data.codeScenario = ctx.config.SIRH;
		sc.data.currentScenario = 'Pré-adhésion - SIRH';
		sc.onTimeout(ctx.config.getTimeout(), function(sc, st) {
			ctx.trace.writeError(sc.data.contract.individualContractCollectif + ' Timeout aborting current scenario');
			sc.endStep(ActivInfinitev7.steps.abort);
		});
		sc.onError(function(sc, st, ex) {
			ctx.trace.writeError(sc.data.contract.individualContractCollectif + ex + ' aborting current scenario');
			sc.endStep(ActivInfinitev7.steps.abort);
		});
		sc.setMode(e.scenario.mode.noStartIfRunning);
		sc.step(ActivInfinitev7.steps.initializeCheckMembership);
		sc.step(ActivInfinitev7.steps.navigateToMembership);
		sc.step(ActivInfinitev7.steps.setListSearchMembership);
		sc.step(ActivInfinitev7.steps.searchMembership);
		sc.step(ActivInfinitev7.steps.searchMembershipBenef);
		sc.step(ActivInfinitev7.steps.isBeneficiaryInList);
		sc.step(ActivInfinitev7.steps.isBenefeciaryFound);
		sc.step(ActivInfinitev7.steps.beneficiaryNotFound);
		sc.step(ActivInfinitev7.steps.setPrincipalInterlocutorPayment);
		sc.step(ActivInfinitev7.steps.setPrincipalInterlocutorData);
		sc.step(ActivInfinitev7.steps.isPrincipalInterlocutorValid);
		sc.step(ActivInfinitev7.steps.validPrincipalInterlocutorError);
		sc.step(ActivInfinitev7.steps.validPrincipalInterlocutor);
		sc.step(ActivInfinitev7.steps.checkInfoPrincipalInterlocutor);
		sc.step(ActivInfinitev7.steps.nextToPInsuredIdent);
		sc.step(ActivInfinitev7.steps.setInsuredIndent);
		sc.step(ActivInfinitev7.steps.nextToPProductUpdate);
		sc.step(ActivInfinitev7.steps.editPProductUpdate);
		sc.step(ActivInfinitev7.steps.setupProductLoop);
		sc.step(ActivInfinitev7.steps.setProductPage);
		sc.step(ActivInfinitev7.steps.nextProductLoop);
		sc.step(ActivInfinitev7.steps.nextToCalculParam);
		sc.step(ActivInfinitev7.steps.getIndividualContractNumber);
		sc.step(ActivInfinitev7.steps.nextToContributionVisu);
		sc.step(ActivInfinitev7.steps.nextToCoverageImmediateEch);
		sc.step(ActivInfinitev7.steps.nextToCoverageImmediateCar);
		sc.step(ActivInfinitev7.steps.nextToSaveUpdate);
		sc.step(ActivInfinitev7.steps.saveContract); // from saveContract
		sc.step(ActivInfinitev7.steps.saveContractWaitMembershipColSearch); // from saveContract
		sc.step(ActivInfinitev7.steps.closeContractUpdate); // from saveContract
		sc.step(ActivInfinitev7.steps.endCheckMembership);
		sc.step(ActivInfinitev7.steps.abort);
	}});

	ActivInfinitev7.step({ initializeCheckMembership: function(ev, sc, st) {
		ctx.trace.writeInfo(sc.data.contract.individualContractCollectif + ' - START - checkMembership - ' + sc.data.codeScenario);
		return sc.endStep();
	}});

	ActivInfinitev7.step({ navigateToMembership: function(ev, sc, st) {
		ctx.trace.writeInfo(sc.data.contract.individualContractCollectif + ' - STEP - navigateToMembership');
		ActivInfinitev7.pDashboard.btMembershipCollectiv.click();
		ActivInfinitev7.pMembershipColSearch.wait(function() {
			return sc.endStep();
		});
	}});

	ActivInfinitev7.step({ setListSearchMembership: function(ev, sc, st) {
		ctx.trace.writeInfo(sc.data.contract.individualContractCollectif + ' - STEP - setListSearchMembership');	
		ctx.setValue(ActivInfinitev7.pMembershipColSearch.oContractType, 2);
		ActivInfinitev7.pMembershipColSearch.events.LOAD.once(function() {
			return sc.endStep();
		});
	}});

	ActivInfinitev7.step({ searchMembership: function(ev, sc, st) {
		ctx.trace.writeInfo(sc.data.contract.individualContractCollectif + ' - STEP - searchMembership');
		ctx.scenarioHelper.searchCollectiveContract(sc, ctx.date.monthStart, function () {
			ctx.trace.writeInfo(sc.data.contract.individualContractCollectif + ' - STEP - membership found');

			sc.data.commentContract = 'Adhésion trouvé';
			sc.data.statusContract = ctx.excelHelper.constants.status.Success;

			ctx.setValue(ActivInfinitev7.pTerminatedContractFo.oDemandDate, ctx.date.monthStart);
			ctx.scenarioHelper.goNextPageTill(ActivInfinitev7.pMembershipSearchBene, function (error) {
				if (error) {
					return ctx.endScenario(sc, error.message, 'Probléme lors de la navigation vers la page "Identification Contrat Recherche", merci de remonter les logs au service technique', 'Erreur');
				}
				return sc.endStep();
			});
		}, function () {
			ctx.trace.writeInfo(sc.data.contract.individualContractCollectif + ' - END SCENARIO - membership not found');
			return sc.endStep(ActivInfinitev7.steps.closeContractUpdate);
		});
	}});

	ActivInfinitev7.step({ searchMembershipBenef: function(ev, sc, st) {
		ctx.trace.writeInfo(sc.data.contract.individualContractCollectif + ' - STEP - searchMembershipBenef');

		ctx.setValue(ActivInfinitev7.pMembershipSearchBene.oNumberINSEE, sc.data.contract.inseeNumber);
		ActivInfinitev7.pMembershipSearchBene.btSearch.click();

		ActivInfinitev7.pMembershipSearchBene.events.LOAD.once(function() {
			return sc.endStep();
		});
	}});

	ActivInfinitev7.step({ isBeneficiaryInList: function(ev, sc, st) {
		ctx.trace.writeInfo(sc.data.contract.individualContractCollectif + ' - STEP - isBeneficiaryInList');
		var benefExist = ActivInfinitev7.pMembershipSearchBene.oSearchValid.exist();			
		if (!benefExist) {
			ActivInfinitev7.pMembershipSearchBene.btCancel.click();
			sc.data.isNewBenef = true;
			return ActivInfinitev7.pMembershipMainBenef.wait(function() {
				return sc.endStep(ActivInfinitev7.steps.setPrincipalInterlocutorPayment);
			});
		}

		var isBenefFound = false;
		var contractBenefName = sc.data.contract.name + ' ' + sc.data.contract.firstName;
		var allBenefName = ActivInfinitev7.pMembershipSearchBene.oResultNameBenef.getAll();
		for (var index = 0; index < allBenefName.length; index++) {
			var benefName = ctx.string.trim(allBenefName[index]);
			if (benefName.indexOf(contractBenefName) !== -1) {
				ActivInfinitev7.pMembershipSearchBene.oResultNameBenef.i(index).click();
				isBenefFound = true;
				break;
			}
		}

		if (isBenefFound) {
			ActivInfinitev7.pMembershipSearchBene.btValid.click();
			sc.data.isUpdateBenef = true;
			return sc.endStep();
		}

		var comment = 'Revoir centre: impossible de trouver l\'adhérent ' + contractBenefName;
		var message = sc.data.contract.individualContractCollectif + ' - Contractor not found';

		ActivInfinitev7.pMembershipSearchBene.btCancel.click();
		return ActivInfinitev7.pMembershipMainBenef.wait(function() {
			return ctx.endScenario(sc, message, comment);
		});
	} });

	ActivInfinitev7.step({ isBenefeciaryFound: function(ev, sc, st) {
		ctx.trace.writeInfo(sc.data.contract.individualContractCollectif + ' - STEP - isBenefeciaryFound');
		var foundListener, notFoundListener;
		notFoundListener = ActivInfinitev7.pMembershipSearchBene.events.LOAD.once(function() {
			ctx.off(foundListener);
			return sc.endStep();
		});

		foundListener = ActivInfinitev7.pMembershipMainBenef.wait(function() {
			ctx.off(notFoundListener);
			return sc.endStep(ActivInfinitev7.steps.checkInfoPrincipalInterlocutor);
		});
	}});

	ActivInfinitev7.step({ beneficiaryNotFound: function(ev, sc, st) {
		ctx.trace.writeInfo(sc.data.contract.individualContractCollectif + ' - STEP - beneficiaryNotFound');
		var comment = 'Revoir centre: impossible de trouver l\'adhérent';
		var message = sc.data.contract.individualContractCollectif + ' - Contract not found';

		// click on btValid reload page
		var messagePopup = ctx.scenarioHelper.getMessagesPopup(ActivInfinitev7.pMembershipSearchBene);
		if (messagePopup) {
			message = sc.data.contract.individualContractCollectif + ' - END SCENARIO - membership block';
			comment = 'Revoir centre: ' + messagePopup;
		}

		return ctx.endScenario(sc, message, comment);
	}});

	ActivInfinitev7.step({ setPrincipalInterlocutorPayment: function(ev, sc, st) {
		ctx.trace.writeInfo(sc.data.contract.individualContractCollectif + ' - STEP - setPrincipalInterlocutorPayment');
		ctx.setValue(ActivInfinitev7.pMembershipMainBenef.oModePaymentContribut, sc.data.contract.paymentMethodCoti);
		ActivInfinitev7.pMembershipMainBenef.events.LOAD.once(function() {
			return sc.endStep();
		});
	}});

	ActivInfinitev7.step({ setPrincipalInterlocutorData: function(ev, sc, st) {
		ctx.trace.writeInfo(sc.data.contract.individualContractCollectif + ' - STEP - setPrincipalInterlocutorData');
		ctx.setValue(ActivInfinitev7.pMembershipMainBenef.oCountry, 'FRA'); // Select 'France' into list
		ctx.setValue(ActivInfinitev7.pMembershipMainBenef.oCivility, sc.data.contract.civility);
		ctx.setValue(ActivInfinitev7.pMembershipMainBenef.oName, sc.data.contract.name);
		ctx.setValue(ActivInfinitev7.pMembershipMainBenef.oFirstname, sc.data.contract.firstName);
		ctx.setValue(ActivInfinitev7.pMembershipMainBenef.oPostalCode, sc.data.contract.postalCode);
		ctx.setValue(ActivInfinitev7.pMembershipMainBenef.oLocality, sc.data.contract.locality);
		ctx.setValue(ActivInfinitev7.pMembershipMainBenef.oAddressNumber, sc.data.contract.addressNumber);
		ctx.setValue(ActivInfinitev7.pMembershipMainBenef.oAddress, sc.data.contract.address);
		ctx.setValue(ActivInfinitev7.pMembershipMainBenef.oPaymentFrequency, sc.data.contract.paymentFrequency);
		ctx.setValue(ActivInfinitev7.pMembershipMainBenef.oModePaymentPrestatio, sc.data.contract.paymentMethodPresta);
		ctx.setValue(ActivInfinitev7.pMembershipMainBenef.oFrequencyEch, sc.data.contract.frequencyEch);
		ctx.setValue(ActivInfinitev7.pMembershipMainBenef.oTermeType, sc.data.contract.termType);
		ActivInfinitev7.pMembershipMainBenef.btNext.setFocus();
		ActivInfinitev7.pMembershipMainBenef.btNext.click();
		return sc.endStep();
	}});

	ActivInfinitev7.step({ isPrincipalInterlocutorValid: function(ev, sc, st) {
		ctx.trace.writeInfo(sc.data.contract.individualContractCollectif + ' - STEP - isPrincipalInterlocutorValid');
		var validListener, invalidListener;
		invalidListener = ActivInfinitev7.pMembershipMainBenef.events.LOAD.once(function() {
			ctx.off(validListener);
			return sc.endStep(ActivInfinitev7.steps.validPrincipalInterlocutorError);
		});
		validListener = ActivInfinitev7.pInsuredIdent.wait(function() {
			ctx.off(invalidListener);
			return sc.endStep(ActivInfinitev7.steps.setInsuredIndent);
		});
	} });

	ActivInfinitev7.step({ validPrincipalInterlocutorError: function(ev, sc, st) {
		ctx.trace.writeInfo(sc.data.contract.individualContractCollectif + ' - STEP - validPrincipalInterlocutorError');
		var errorMessage = ctx.scenarioHelper.getMessagesPopup(ActivInfinitev7.pMembershipMainBenef);
		if (errorMessage.indexOf('La localité est obligatoire') === -1) {
			ctx.trace.writeError(sc.data.contract.individualContractCollectif + errorMessage);
			sc.data.commentContract = 'Erreur inconnue : ' + errorMessage;
			sc.data.statusContract = ctx.excelHelper.constants.status.Fail;
			return sc.endStep(ActivInfinitev7.steps.closeContractUpdate);
		}

		return sc.endStep();
	} });

	ActivInfinitev7.step({ validPrincipalInterlocutor: function(ev, sc, st) {
		ctx.trace.writeInfo(sc.data.contract.individualContractCollectif + ' - STEP - validPrincipalInterlocutor');
		sc.data.noteContract = 'France sans contôle a séléctionné comme pays';
		ctx.setValue(ActivInfinitev7.pMembershipMainBenef.oCountry, 'ZZZ'); // Select 'pays inconnu' into list
		ctx.setValue(ActivInfinitev7.pMembershipMainBenef.oPostalCodeNoControl, sc.data.contract.postalCode);
		ctx.setValue(ActivInfinitev7.pMembershipMainBenef.oLocalityNoControl, sc.data.contract.locality);
		ctx.setValue(ActivInfinitev7.pMembershipMainBenef.oAddressNumber, '');
		ctx.setValue(ActivInfinitev7.pMembershipMainBenef.oAddress, sc.data.contract.addressNumber + ' ' + sc.data.contract.address);
		ActivInfinitev7.pMembershipMainBenef.btNext.setFocus();
		ActivInfinitev7.pMembershipMainBenef.btNext.click();
		ActivInfinitev7.pInsuredIdent.wait(function() {
			return sc.endStep(ActivInfinitev7.steps.setInsuredIndent);
		});
	}});

	ActivInfinitev7.step({ checkInfoPrincipalInterlocutor: function(ev, sc, st) {
		ctx.trace.writeInfo(sc.data.contract.individualContractCollectif + ' - STEP - checkInfoPrincipalInterlocutor');

		var listFieldToCheck = [
			{ infiniteValue: ActivInfinitev7.pMembershipMainBenef.oName.get(), pivotValue: sc.data.contract.name, elementName: 'Nom' },
			{ infiniteValue: ActivInfinitev7.pMembershipMainBenef.oPostalCode.get() || ActivInfinitev7.pMembershipMainBenef.oPostalCodeNoControl.get() , pivotValue: sc.data.contract.postalCode, elementName: 'Code postal' },
			{ infiniteValue: ActivInfinitev7.pMembershipMainBenef.oLocality.get() || ActivInfinitev7.pMembershipMainBenef.oLocalityNoControl.get() , pivotValue: sc.data.contract.locality, elementName: 'Localité' },
			{ infiniteValue: ActivInfinitev7.pMembershipMainBenef.oAddress.get(), pivotValue: sc.data.contract.address, elementName: 'Nom de voie' },
			{ infiniteValue: ActivInfinitev7.pMembershipMainBenef.oAddressNumber.get() || ActivInfinitev7.pMembershipMainBenef.oAddress.get(), pivotValue: sc.data.contract.addressNumber, elementName: 'Numéro de voie' }
		];

		for (var i in listFieldToCheck) {
			var fieldToCheck = listFieldToCheck[i];
			if (ctx.string.trim(fieldToCheck.infiniteValue).toLowerCase().indexOf(ctx.string.trim(fieldToCheck.pivotValue).toLowerCase()) === -1) {
				var message = 'Une valeur est différente : ' + fieldToCheck.elementName + ' a pour valeur \'' + fieldToCheck.infiniteValue + '\' dans infinite, mais \'' + fieldToCheck.pivotValue + '\' dans le fichier donné en entrée';
				ctx.trace.writeInfo(message);
				sc.data.noteContract = message;
			}
		}

		//Fill payment info
		ctx.setValue(ActivInfinitev7.pMembershipMainBenef.oPaymentFrequency, sc.data.contract.paymentFrequency);
		ctx.setValue(ActivInfinitev7.pMembershipMainBenef.oModePaymentPrestatio, sc.data.contract.paymentMethodPresta);
		ctx.setValue(ActivInfinitev7.pMembershipMainBenef.oFrequencyEch, sc.data.contract.frequencyEch);
		ctx.setValue(ActivInfinitev7.pMembershipMainBenef.oTermeType, sc.data.contract.termType);
		ctx.setValue(ActivInfinitev7.pMembershipMainBenef.oModePaymentContribut, sc.data.contract.paymentMethodCoti);
		ActivInfinitev7.pMembershipMainBenef.events.LOAD.once(function(){
			return sc.endStep();
		});
	}});

	ActivInfinitev7.step({ nextToPInsuredIdent: function(ev, sc, st) {
		ctx.scenarioHelper.goNextPageTill(ActivInfinitev7.pInsuredIdent, function (error) {
			if (error) {
				return ctx.endScenario(sc, error.message, 'Probléme lors de la navigation vers la page de "Paramétres de calcul", merci de remonter les logs au service technique', 'Erreur');
			}
			return sc.endStep();
		});
	} });

	ActivInfinitev7.step({ setInsuredIndent: function(ev, sc, st) {
		ctx.trace.writeInfo(sc.data.contract.individualContractCollectif + ' - STEP - setInsuredIndent');

		if (sc.data.contract.isInsuredRO) {
			ActivInfinitev7.pInsuredIdent.oInsuredROCheck.click();
		}
		else {
			ActivInfinitev7.pInsuredIdent.oEntitleROCheck.click();
		}
		ctx.setValue(ActivInfinitev7.pInsuredIdent.oCheckTeletrans, sc.data.contract.isTeletransCheck ? 1 : 0);
		ctx.setValue(ActivInfinitev7.pInsuredIdent.oNumberRO, sc.data.contract.inseeNumber);
		ctx.setValue(ActivInfinitev7.pInsuredIdent.oKeyRO, sc.data.contract.keyRO);
		ctx.setValue(ActivInfinitev7.pInsuredIdent.oFamilySite, sc.data.contract.familyStatus);
		ctx.setValue(ActivInfinitev7.pInsuredIdent.oMaidenName, sc.data.contract.maidenName);
		ctx.setValue(ActivInfinitev7.pInsuredIdent.oInsuredType, sc.data.contract.insuredType);
		ctx.setValue(ActivInfinitev7.pInsuredIdent.oSexe, sc.data.contract.sexe);
		ctx.setValue(ActivInfinitev7.pInsuredIdent.oBirthday, ctx.date.formatDDMMYYYY(sc.data.contract.birthDate));
		ctx.setValue(ActivInfinitev7.pInsuredIdent.oSocialCategorie, sc.data.contract.socialCategory);
		ctx.setValue(ActivInfinitev7.pInsuredIdent.oRankBirthday, sc.data.contract.rankBirthday);

		ActivInfinitev7.pInsuredIdent.btValid.click();

		ActivInfinitev7.pInsuredIdent.events.LOAD.once(function() {
			return sc.endStep();
		});
	}});

	ActivInfinitev7.step({ nextToPProductUpdate: function(ev, sc, st) {
		ctx.trace.writeInfo(sc.data.contract.individualContractCollectif + ' - STEP - nextToPProductUpdate');
		ActivInfinitev7.pInfoRo.btNext.click();
		ActivInfinitev7.pProductUpdate.events.LOAD.once(function() {
			return sc.endStep();
		});
	} });

	ActivInfinitev7.step({ editPProductUpdate: function(ev, sc, st) {
		ctx.trace.writeInfo(sc.data.contract.individualContractCollectif + ' - STEP - editPProductUpdate');
		ActivInfinitev7.pProductUpdate.btUpdatePage.click();
		ActivInfinitev7.pProductUpdate.events.LOAD.once(function() {
			return sc.endStep();
		});
	} });

	ActivInfinitev7.step({ setupProductLoop: function(ev, sc, st) {
		ctx.trace.writeInfo(sc.data.contract.individualContractCollectif + ' - STEP - setupProductLoop');
		sc.data.countProductCode = sc.data.contract.productCode.length;
		sc.data.indexProductCode = 0;
		return sc.endStep();
	} });

	ActivInfinitev7.step({ setProductPage: function(ev, sc, st) {
		ctx.trace.writeInfo(sc.data.contract.individualContractCollectif + ' - STEP - setProductPage');

		ctx.trace.writeInfo('setting product : ' + sc.data.contract.productCode[sc.data.indexProductCode]);

		ctx.setValue(ActivInfinitev7.pProductUpdate.oInputNewCodeProduct, sc.data.contract.productCode[sc.data.indexProductCode]);
		ActivInfinitev7.pProductUpdate.btSaveNewCodeProduct.click();
		sc.data.indexProductCode += 1;

		ActivInfinitev7.pProductUpdate.events.LOAD.once(function() {
			return sc.endStep();
		});
	}});

	ActivInfinitev7.step({ nextProductLoop: function(ev, sc, st) {
		ctx.trace.writeInfo(sc.data.contract.individualContractCollectif + ' - STEP - nextProductLoop');
		if (sc.data.indexProductCode >= sc.data.countProductCode) {
			ActivInfinitev7.pProductUpdate.btSaveUpdateProduct.click();
			return ActivInfinitev7.pProductUpdate.events.LOAD.once(function() {
				return sc.endStep();
			});
		}
		ActivInfinitev7.pProductUpdate.btNewProduct.click();
		return sc.endStep(ActivInfinitev7.steps.setProductPage);
	} });

	ActivInfinitev7.step({ nextToCalculParam: function(ev, sc, st) {
		ctx.trace.writeInfo(sc.data.contract.individualContractCollectif + ' - STEP - nextToCalculParam');
		ctx.scenarioHelper.goNextPageTill(ActivInfinitev7.pCalculParam, function (error)  {
			if (error) {
				return ctx.endScenario(sc, error.message, 'Probléme lors de la navigation vers la page de "Paramètres de calcul", merci de remonter les logs au service technique', 'Erreur');
			}
			return sc.endStep();
		});
	}});

	ActivInfinitev7.step({ getIndividualContractNumber: function(ev, sc, st) {
		ctx.trace.writeInfo(sc.data.contract.individualContractCollectif + ' - STEP - getIndividualContractNumber');
		sc.data.contract.individualContract = ActivInfinitev7.pCalculParam.oIndividualContractNu.get();
		return sc.endStep();
	} });

	ActivInfinitev7.step({ nextToContributionVisu: function(ev, sc, st) {
		ctx.trace.writeInfo(sc.data.contract.individualContractCollectif + ' - STEP - nextToContributionVisu');
		ctx.scenarioHelper.goNextPageTill(ActivInfinitev7.pContributionVisu, function (error) {
			if (error) {
				return ctx.endScenario(sc, error.message, 'Probléme lors de la navigation vers la page de "Visualisation du compte cotisant", merci de remonter les logs au service technique', 'Erreur');
			}
			return sc.endStep();
		});
	} });

	ActivInfinitev7.step({ nextToCoverageImmediateEch: function(ev, sc, st) {
		ctx.trace.writeInfo(sc.data.contract.individualContractCollectif + ' - STEP - nextToCoverageImmediateEch');
		ctx.setValue(ActivInfinitev7.pContributionVisu.oValidation, 'OUI');
		ctx.scenarioHelper.goNextPageTill(ActivInfinitev7.pCoverageImmediateEch, function (error) {
			if (error) {
				return ctx.endScenario(sc, error.message, 'Probléme lors de la navigation vers la page "Avis d\'échéance", merci de remonter les logs au service technique', 'Erreur');
			}
			return sc.endStep();
		});
	}});

	ActivInfinitev7.step({ nextToCoverageImmediateCar: function(ev, sc, st) {
		ctx.trace.writeInfo(sc.data.contract.individualContractCollectif + ' - STEP - nextToCoverageImmediateCar');
		ctx.setValue(ActivInfinitev7.pCoverageImmediateEch.oEditionSelect, 'Lettrage sans édition');
		ctx.scenarioHelper.goNextPageTill(ActivInfinitev7.pCoverageImmediateCar, function (error) {
			if (error) {
				return ctx.endScenario(sc, error.message, 'Probléme lors de la navigation vers la page "Demande de carte tiers", merci de remonter les logs au service technique', 'Erreur');
			}
			return sc.endStep();
		});
	}});

	ActivInfinitev7.step({ nextToSaveUpdate: function(ev, sc, st) {
		ctx.trace.writeInfo(sc.data.contract.individualContractCollectif + ' - STEP - nextToSaveUpdate');
		ActivInfinitev7.pCoverageImmediateCar.oNoEdit.setFocus();
		ActivInfinitev7.pCoverageImmediateCar.oNoEdit.click();
		ctx.scenarioHelper.goNextPageTill(ActivInfinitev7.pSaveUpdate, function (error) {
			if (error) {
				return ctx.endScenario(sc, error.message, 'Probléme lors de la navigation vers la page "Validation Acte", merci de remonter les logs au service technique', 'Erreur');
			}
			return sc.endStep();
		});
	}});

	// step saveContract from saveContract
	// step saveContractWaitMembershipColSearch from saveContract
	// step closeContractUpdate from saveContract

	ActivInfinitev7.step({ endCheckMembership: function(ev, sc, st) {
		ctx.trace.writeInfo(sc.data.contract.individualContractCollectif + ' - STEP - endCheckMembership');
		ctx.trace.writeInfo(sc.data.contract.individualContractCollectif + ' - END - checkMembership - ' + sc.data.codeScenario);
		return sc.endScenario();
	}});
})();
