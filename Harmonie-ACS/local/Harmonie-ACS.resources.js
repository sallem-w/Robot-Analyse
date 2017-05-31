// Contextor Studio
// Auto-generated declaration file : do not modify !



var ActivInfinite = ctx.addApplication('ActivInfinite', {"comment":"v6","nature":"WEB3","path":"http://infinite-haur05/WebAneto/ValiderIdentification.do#"});

ActivInfinite.pDashboard = ActivInfinite.addPage('pDashboard', {"comment":"Activ Infinite - Site 01 - SAPCTOR1 (Utilisateur)","path":"http://infinite-haur05/WebAneto/ValiderIdentification.do"});
ActivInfinite.pDashboard.btMenu = ActivInfinite.pDashboard.addItem('btMenu');

ActivInfinite.pCoverageImmediateCar = ActivInfinite.addPage('pCoverageImmediateCar', {"comment":"[frameInitial0] - Web Aneto","path":"http://infinite-haur05/WebAneto/container/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCC01STD_88\u0026CONTAINER_NOM_FONCTION=ACEK_1000\u0026AFFICHAGE_CONTAINER=OK\u0026BOUTON_CONTAINER=BOUTON_SUIVANT"});
ActivInfinite.pCoverageImmediateCar.oTypeDiffere = ActivInfinite.pCoverageImmediateCar.addItem('oTypeDiffere');
ActivInfinite.pCoverageImmediateCar.oBtNext = ActivInfinite.pCoverageImmediateCar.addItem('oBtNext');
ActivInfinite.pCoverageImmediateCar.oTitlePage = ActivInfinite.pCoverageImmediateCar.addItem('oTitlePage', {"mustExist":true});

ActivInfinite.pEffectParamCalc = ActivInfinite.addPage('pEffectParamCalc', {"comment":"[frameInitial0] - Web Aneto","path":"http://infinite-haur05/WebAneto/container/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACRE04RE4S_416\u0026CONTAINER_NOM_FONCTION=AC32_200\u0026AFFICHAGE_CONTAINER=OK\u0026BOUTON_CONTAINER=BOUTON_SUIVANT"});
ActivInfinite.pEffectParamCalc.oBtNext = ActivInfinite.pEffectParamCalc.addItem('oBtNext');
ActivInfinite.pEffectParamCalc.oTitlePage = ActivInfinite.pEffectParamCalc.addItem('oTitlePage', {"mustExist":true});
ActivInfinite.pEffectParamCalc.oCheckCalcul = ActivInfinite.pEffectParamCalc.addItem('oCheckCalcul');

ActivInfinite.pConsultContratIndiv = ActivInfinite.addPage('pConsultContratIndiv', {"comment":"[frameInitial0] - Web Aneto","path":"http://infinite-haur05/WebAneto/ValiderIdentification.do#"});
ActivInfinite.pConsultContratIndiv.oIndividualContract = ActivInfinite.pConsultContratIndiv.addItem('oIndividualContract', {"mustExist":true});
ActivInfinite.pConsultContratIndiv.btSearch = ActivInfinite.pConsultContratIndiv.addItem('btSearch', {"mustExist":true});
ActivInfinite.pConsultContratIndiv.oDateContract = ActivInfinite.pConsultContratIndiv.addItem('oDateContract');
ActivInfinite.pConsultContratIndiv.oBtClose = ActivInfinite.pConsultContratIndiv.addItem('oBtClose');

ActivInfinite.pContratIndivFound = ActivInfinite.addPage('pContratIndivFound', {"comment":"[frameInitial0] - Web Aneto","path":"http://infinite-haur05/WebAneto/contrat/ACIC.do?method=rechercher\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCO03STSO_59\u0026CONTAINER_NOM_FONCTION=ACIC_100\u0026AFFICHAGE_CONTAINER="});
ActivInfinite.pContratIndivFound.oIndividualContract = ActivInfinite.pContratIndivFound.addItem('oIndividualContract', {"mustExist":true});
ActivInfinite.pContratIndivFound.oBtNext = ActivInfinite.pContratIndivFound.addItem('oBtNext');
ActivInfinite.pContratIndivFound.oBtClose = ActivInfinite.pContratIndivFound.addItem('oBtClose');
ActivInfinite.pContratIndivFound.btNavigateBlockNote = ActivInfinite.pContratIndivFound.addItem('btNavigateBlockNote');

ActivInfinite.pContractIndivNotFoun = ActivInfinite.addPage('pContractIndivNotFoun', {"comment":"[frameInitial0] - Web Aneto","path":"http://infinite-haur05/WebAneto/contrat/ACIC.do?method=rechercher\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCO03STSO_201\u0026CONTAINER_NOM_FONCTION=ACIC_100\u0026AFFICHAGE_CONTAINER="});
ActivInfinite.pContractIndivNotFoun.oDetailError = ActivInfinite.pContractIndivNotFoun.addItem('oDetailError');
ActivInfinite.pContractIndivNotFoun.oTitlePage = ActivInfinite.pContractIndivNotFoun.addItem('oTitlePage', {"mustExist":true});
ActivInfinite.pContractIndivNotFoun.oBtClose = ActivInfinite.pContractIndivNotFoun.addItem('oBtClose');
ActivInfinite.pContractIndivNotFoun.oBtCloseThisPage = ActivInfinite.pContractIndivNotFoun.addItem('oBtCloseThisPage');

ActivInfinite.pBlockNotes = ActivInfinite.addPage('pBlockNotes', {"comment":"[frameInitial0] - Web Aneto","path":"http://infinite-haur05/WebAneto/container/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCO03STSO_139\u0026CONTAINER_NOM_FONCTION=ACBN_102\u0026AFFICHAGE_CONTAINER=OK\u0026CONTAINER_FONCTION_FORCAGE_VALIDATION=FALSE"});
ActivInfinite.pBlockNotes.oBlockNotes = ActivInfinite.pBlockNotes.addItem('oBlockNotes', {"mustExist":true});
ActivInfinite.pBlockNotes.oContentBlockNote = ActivInfinite.pBlockNotes.addItem('oContentBlockNote');
ActivInfinite.pBlockNotes.oBtClose = ActivInfinite.pBlockNotes.addItem('oBtClose');
ActivInfinite.pBlockNotes.btHelpCSCertificate = ActivInfinite.pBlockNotes.addItem('btHelpCSCertificate');
ActivInfinite.pBlockNotes.oNodeInsuredIdent = ActivInfinite.pBlockNotes.addItem('oNodeInsuredIdent');
ActivInfinite.pBlockNotes.oBtNext = ActivInfinite.pBlockNotes.addItem('oBtNext');

ActivInfinite.pProductList = ActivInfinite.addPage('pProductList', {"comment":"[frameInitial0] - Web Aneto","path":"http://infinite-haur05/WebAneto/container/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCO03STSO_33\u0026CONTAINER_NOM_FONCTION=ACPG_500\u0026AFFICHAGE_CONTAINER=OK\u0026CONTAINER_FONCTION_FORCAGE_VALIDATION=FALSE"});
ActivInfinite.pProductList.oTextContract = ActivInfinite.pProductList.addItem('oTextContract', {"mustExist":true});
ActivInfinite.pProductList.oBtClose = ActivInfinite.pProductList.addItem('oBtClose');
ActivInfinite.pProductList.oRowInformation = ActivInfinite.pProductList.addItem('oRowInformation', {"occurs":1});
ActivInfinite.pProductList.btVisuContribution = ActivInfinite.pProductList.addItem('btVisuContribution');
ActivInfinite.pProductList.oImpactHidden = ActivInfinite.pProductList.addItem('oImpactHidden', {"mustExist":true});
ActivInfinite.pProductList.oValidSupp = ActivInfinite.pProductList.addItem('oValidSupp', {"mustExist":true});

ActivInfinite.pSynthesisContract = ActivInfinite.addPage('pSynthesisContract', {"comment":"[frameInitial0] - Accueil","path":"http://infinite-haur05/WebAneto/AccueilMenu.do?method=afficher\u0026redirection_action=FicheSynthesePersonne\u0026redirection_method=afficherPersonne\u0026NumCtr=00248886\u0026IdfSys=389324\u0026submitSyntheseDate=true"});
ActivInfinite.pSynthesisContract.oDateEnd = ActivInfinite.pSynthesisContract.addItem('oDateEnd', {"occurs":1});
ActivInfinite.pSynthesisContract.oContrats = ActivInfinite.pSynthesisContract.addItem('oContrats', {"mustExist":true});
ActivInfinite.pSynthesisContract.oIndividualContract = ActivInfinite.pSynthesisContract.addItem('oIndividualContract', {"occurs":1});

ActivInfinite.pSynthesisSearch = ActivInfinite.addPage('pSynthesisSearch', {"comment":"[frameInitial0] - Accueil","path":"http://infinite-haur05/WebAneto/AccueilMenu.do?SAPCTOR1\u00261493915114793\u0026method=afficher\u0026redirection_action=ACW1\u0026redirection_method=afficherContrat\u0026tailleFenetre=507"});
ActivInfinite.pSynthesisSearch.oTypeIdentification = ActivInfinite.pSynthesisSearch.addItem('oTypeIdentification');
ActivInfinite.pSynthesisSearch.oBenefIdentification = ActivInfinite.pSynthesisSearch.addItem('oBenefIdentification');
ActivInfinite.pSynthesisSearch.btSearch = ActivInfinite.pSynthesisSearch.addItem('btSearch', {"mustExist":true});

ActivInfinite.pContribution = ActivInfinite.addPage('pContribution', {"comment":"[frameInitial0] - Web Aneto","path":"http://infinite-haur05/WebAneto/container/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCO03STSO_92\u0026CONTAINER_NOM_FONCTION=AC36_900\u0026AFFICHAGE_CONTAINER=OK\u0026CONTAINER_FONCTION_FORCAGE_VALIDATION=FALSE"});
ActivInfinite.pContribution.oIdTableEch = ActivInfinite.pContribution.addItem('oIdTableEch', {"mustExist":true});
ActivInfinite.pContribution.oDateEch = ActivInfinite.pContribution.addItem('oDateEch', {"occurs":1});
ActivInfinite.pContribution.oBalanceEch = ActivInfinite.pContribution.addItem('oBalanceEch', {"occurs":1});
ActivInfinite.pContribution.oBtClose = ActivInfinite.pContribution.addItem('oBtClose');
ActivInfinite.pContribution.btHistoOperation = ActivInfinite.pContribution.addItem('btHistoOperation', {"mustExist":true});
ActivInfinite.pContribution.oListeDesOperations = ActivInfinite.pContribution.addItem('oListeDesOperations', {"mustExist":true});

ActivInfinite.pHistoOperationSearch = ActivInfinite.addPage('pHistoOperationSearch', {"comment":"[frameInitial0] - Web Aneto","path":"http://infinite-haur05/WebAneto/container/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCO03STSO_208\u0026CONTAINER_NOM_FONCTION=ACHO_200\u0026AFFICHAGE_CONTAINER=OK\u0026CONTAINER_FONCTION_FORCAGE_VALIDATION=FALSE"});
ActivInfinite.pHistoOperationSearch.oTitlePage = ActivInfinite.pHistoOperationSearch.addItem('oTitlePage', {"mustExist":true});
ActivInfinite.pHistoOperationSearch.btSearch = ActivInfinite.pHistoOperationSearch.addItem('btSearch');
ActivInfinite.pHistoOperationSearch.oPending = ActivInfinite.pHistoOperationSearch.addItem('oPending');
ActivInfinite.pHistoOperationSearch.oCanceled = ActivInfinite.pHistoOperationSearch.addItem('oCanceled');
ActivInfinite.pHistoOperationSearch.oCalcul = ActivInfinite.pHistoOperationSearch.addItem('oCalcul');
ActivInfinite.pHistoOperationSearch.oFlux = ActivInfinite.pHistoOperationSearch.addItem('oFlux');
ActivInfinite.pHistoOperationSearch.oRefuse = ActivInfinite.pHistoOperationSearch.addItem('oRefuse');
ActivInfinite.pHistoOperationSearch.oEdition = ActivInfinite.pHistoOperationSearch.addItem('oEdition');
ActivInfinite.pHistoOperationSearch.oWithoutEffet = ActivInfinite.pHistoOperationSearch.addItem('oWithoutEffet');
ActivInfinite.pHistoOperationSearch.oOperationLabel = ActivInfinite.pHistoOperationSearch.addItem('oOperationLabel', {"occurs":2});
ActivInfinite.pHistoOperationSearch.oEffectDate = ActivInfinite.pHistoOperationSearch.addItem('oEffectDate', {"occurs":2});
ActivInfinite.pHistoOperationSearch.oBtClose = ActivInfinite.pHistoOperationSearch.addItem('oBtClose');
ActivInfinite.pHistoOperationSearch.oContexte = ActivInfinite.pHistoOperationSearch.addItem('oContexte', {"occurs":2});

ActivInfinite.pCertificateHelpCS = ActivInfinite.addPage('pCertificateHelpCS', {"comment":"[frameInitial0] - Web Aneto","path":"http://infinite-haur05/WebAneto/container/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCO03STSO_776\u0026CONTAINER_NOM_FONCTION=ACAC_403\u0026AFFICHAGE_CONTAINER=OK\u0026CONTAINER_FONCTION_FORCAGE_VALIDATION=FALSE"});
ActivInfinite.pCertificateHelpCS.oCertificateTitle = ActivInfinite.pCertificateHelpCS.addItem('oCertificateTitle', {"mustExist":true});
ActivInfinite.pCertificateHelpCS.oType = ActivInfinite.pCertificateHelpCS.addItem('oType', {"occurs":1});
ActivInfinite.pCertificateHelpCS.oStartDate = ActivInfinite.pCertificateHelpCS.addItem('oStartDate', {"occurs":1});
ActivInfinite.pCertificateHelpCS.oEndDate = ActivInfinite.pCertificateHelpCS.addItem('oEndDate', {"occurs":1});
ActivInfinite.pCertificateHelpCS.oBtClose = ActivInfinite.pCertificateHelpCS.addItem('oBtClose');
ActivInfinite.pCertificateHelpCS.btProductList = ActivInfinite.pCertificateHelpCS.addItem('btProductList');

ActivInfinite.pEffectHistoCoti = ActivInfinite.addPage('pEffectHistoCoti', {"comment":"[frameInitial0] - Web Aneto","path":"http://infinite-haur05/WebAneto/container/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACRE04RE4S_416\u0026CONTAINER_NOM_FONCTION=AC3Q_300\u0026AFFICHAGE_CONTAINER=OK\u0026BOUTON_CONTAINER=BOUTON_SUIVANT"});
ActivInfinite.pEffectHistoCoti.oTitlePage = ActivInfinite.pEffectHistoCoti.addItem('oTitlePage', {"mustExist":true});
ActivInfinite.pEffectHistoCoti.oBtNext = ActivInfinite.pEffectHistoCoti.addItem('oBtNext');

ActivInfinite.pEffectVisuCotis = ActivInfinite.addPage('pEffectVisuCotis', {"comment":"[frameInitial0] - Web Aneto","path":"http://infinite-haur05/WebAneto/container/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACRE04RE4S_416\u0026CONTAINER_NOM_FONCTION=AC36_400\u0026AFFICHAGE_CONTAINER=OK\u0026BOUTON_CONTAINER=BOUTON_SUIVANT"});
ActivInfinite.pEffectVisuCotis.oBtNext = ActivInfinite.pEffectVisuCotis.addItem('oBtNext');
ActivInfinite.pEffectVisuCotis.oTitlePage2 = ActivInfinite.pEffectVisuCotis.addItem('oTitlePage2', {"mustExist":true});
ActivInfinite.pEffectVisuCotis.oValidation = ActivInfinite.pEffectVisuCotis.addItem('oValidation', {"type":"Key"});
ActivInfinite.pEffectVisuCotis.oTitlePage = ActivInfinite.pEffectVisuCotis.addItem('oTitlePage', {"mustExist":true});

ActivInfinite.pEffectValidation = ActivInfinite.addPage('pEffectValidation', {"comment":"[frameInitial0] - Web Aneto","path":"http://infinite-haur05/WebAneto/container/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACRE04RE4S_416\u0026CONTAINER_NOM_FONCTION=ACVV_500\u0026AFFICHAGE_CONTAINER=OK\u0026BOUTON_CONTAINER=BOUTON_SUIVANT"});
ActivInfinite.pEffectValidation.oTitlePage = ActivInfinite.pEffectValidation.addItem('oTitlePage', {"mustExist":true});
ActivInfinite.pEffectValidation.oBtSave = ActivInfinite.pEffectValidation.addItem('oBtSave');

ActivInfinite.pPopupCloseEffect = ActivInfinite.addPage('pPopupCloseEffect', {"comment":"Confirmation","path":"http://infinite-haur05/WebAneto/jsp/container/vue/ConfirmationActe.jsp"});
ActivInfinite.pPopupCloseEffect.btNo = ActivInfinite.pPopupCloseEffect.addItem('btNo', {"mustExist":true});
ActivInfinite.pPopupCloseEffect.btYes = ActivInfinite.pPopupCloseEffect.addItem('btYes', {"mustExist":true});
ActivInfinite.pPopupCloseEffect.btCancel = ActivInfinite.pPopupCloseEffect.addItem('btCancel', {"mustExist":true});

ActivInfinite.pCoverageProduct = ActivInfinite.addPage('pCoverageProduct', {"comment":"[frameInitial0] - Web Aneto","path":"http://infinite-haur05/WebAneto/container/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCC01STD_22\u0026CONTAINER_NOM_FONCTION=ACPG_300\u0026AFFICHAGE_CONTAINER=OK\u0026BOUTON_CONTAINER=BOUTON_SUIVANT"});
ActivInfinite.pCoverageProduct.oBtNext = ActivInfinite.pCoverageProduct.addItem('oBtNext');
ActivInfinite.pCoverageProduct.btEdit = ActivInfinite.pCoverageProduct.addItem('btEdit', {"mustExist":true});
ActivInfinite.pCoverageProduct.oImpactVisible = ActivInfinite.pCoverageProduct.addItem('oImpactVisible', {"mustExist":true});

ActivInfinite.pCoverageEditProduct = ActivInfinite.addPage('pCoverageEditProduct', {"comment":"[frameInitial0] - Web Aneto","path":"http://infinite-haur05/WebAneto/contrat/ACPG.do?method=selectionProduit\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCC01STD_22\u0026CONTAINER_NOM_FONCTION=ACPG_300\u0026AFFICHAGE_CONTAINER="});
ActivInfinite.pCoverageEditProduct.btValidate = ActivInfinite.pCoverageEditProduct.addItem('btValidate');
ActivInfinite.pCoverageEditProduct.oCheckProduct = ActivInfinite.pCoverageEditProduct.addItem('oCheckProduct', {"occurs":1});
ActivInfinite.pCoverageEditProduct.oCodeProduct = ActivInfinite.pCoverageEditProduct.addItem('oCodeProduct', {"occurs":1});
ActivInfinite.pCoverageEditProduct.oTitlePage = ActivInfinite.pCoverageEditProduct.addItem('oTitlePage', {"mustExist":true});
ActivInfinite.pCoverageEditProduct.oBtClose = ActivInfinite.pCoverageEditProduct.addItem('oBtClose');

ActivInfinite.pCoverageValidProduct = ActivInfinite.addPage('pCoverageValidProduct', {"comment":"[frameInitial0] - Web Aneto","path":"http://infinite-haur05/WebAneto/contrat/ACPG.do?method=selectionGarantie\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCC01STD_88\u0026CONTAINER_NOM_FONCTION=ACPG_300\u0026AFFICHAGE_CONTAINER="});
ActivInfinite.pCoverageValidProduct.btValidate = ActivInfinite.pCoverageValidProduct.addItem('btValidate', {"mustExist":true});
ActivInfinite.pCoverageValidProduct.oValide = ActivInfinite.pCoverageValidProduct.addItem('oValide', {"mustExist":true});

ActivInfinite.pCoverageImmediateEch = ActivInfinite.addPage('pCoverageImmediateEch', {"comment":"[frameInitial0] - Web Aneto","path":"http://infinite-haur05/WebAneto/container/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCC01STD_88\u0026CONTAINER_NOM_FONCTION=AC3U_900\u0026AFFICHAGE_CONTAINER=OK\u0026BOUTON_CONTAINER=BOUTON_SUIVANT"});
ActivInfinite.pCoverageImmediateEch.oEditContract = ActivInfinite.pCoverageImmediateEch.addItem('oEditContract', {"mustExist":true,"type":"Key"});
ActivInfinite.pCoverageImmediateEch.oBtNext = ActivInfinite.pCoverageImmediateEch.addItem('oBtNext');


var ActivInfinitev7 = ctx.addApplication('ActivInfinitev7', {"comment":"v7","nature":"WEB3","path":"http://infinite-haum0a/mdg/auth/Login.do"});

ActivInfinitev7.pDashboard = ActivInfinitev7.addPage('pDashboard', {"comment":"haum0a - Activ Infinite - Module de gestion","path":"http://infinite-haum0a/mdg/"});
ActivInfinitev7.pDashboard.oMenuHidden = ActivInfinitev7.pDashboard.addItem('oMenuHidden', {"mustExist":true});

ActivInfinitev7.pSynthesis = ActivInfinitev7.addPage('pSynthesis', {"comment":"Contexte Contrat - haum0a - Activ Infinite - Module de gestion","path":"http://infinite-haum0a/mdg/AccueilMenu.do?method=rechercher"});
ActivInfinitev7.pSynthesis.oTitlePage = ActivInfinitev7.pSynthesis.addItem('oTitlePage', {"mustExist":true});
ActivInfinitev7.pSynthesis.btSearch = ActivInfinitev7.pSynthesis.addItem('btSearch');
ActivInfinitev7.pSynthesis.oBenefIdentification = ActivInfinitev7.pSynthesis.addItem('oBenefIdentification');
ActivInfinitev7.pSynthesis.oTypeIdentification = ActivInfinitev7.pSynthesis.addItem('oTypeIdentification');
ActivInfinitev7.pSynthesis.oDateEnd = ActivInfinitev7.pSynthesis.addItem('oDateEnd', {"occurs":1});
ActivInfinitev7.pSynthesis.oIndividualContract = ActivInfinitev7.pSynthesis.addItem('oIndividualContract', {"occurs":1});

ActivInfinitev7.pTerminatedContractFo = ActivInfinitev7.addPage('pTerminatedContractFo', {"comment":"Sans effet - Changement couverture - N°03043298 - Valide - Adhérent : Madame JEANNE FRANCOISE - haum04 - Activ Infinite - Module de gestion","path":"http://infinite-haum04/mdg/contrat/ACIC.do?method=rechercher\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCC04STD_9\u0026CONTAINER_NOM_FONCTION=ACIC_100\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pTerminatedContractFo.btNext = ActivInfinitev7.pTerminatedContractFo.addItem('btNext');
ActivInfinitev7.pTerminatedContractFo.btNavigateBlockNote = ActivInfinitev7.pTerminatedContractFo.addItem('btNavigateBlockNote');
ActivInfinitev7.pTerminatedContractFo.btSearch = ActivInfinitev7.pTerminatedContractFo.addItem('btSearch', {"mustExist":true});

ActivInfinitev7.pSearchContractIndiv = ActivInfinitev7.addPage('pSearchContractIndiv', {"comment":"Sans effet - Changement couverture - haum04 - Activ Infinite - Module de gestion","path":"http://infinite-haum04/mdg/Go.do?id=ACCC04STD"});
ActivInfinitev7.pSearchContractIndiv.oIndividualContract = ActivInfinitev7.pSearchContractIndiv.addItem('oIndividualContract');
ActivInfinitev7.pSearchContractIndiv.btSearch = ActivInfinitev7.pSearchContractIndiv.addItem('btSearch', {"mustExist":true});
ActivInfinitev7.pSearchContractIndiv.oDateContract = ActivInfinitev7.pSearchContractIndiv.addItem('oDateContract');
ActivInfinitev7.pSearchContractIndiv.btClose = ActivInfinitev7.pSearchContractIndiv.addItem('btClose');

ActivInfinitev7.pBlockNotes = ActivInfinitev7.addPage('pBlockNotes', {"comment":"Consultation - N°21998269 - Résilié - Adhérent : Madame RUIZ SANDRINE - haum0a - Activ Infinite - Module de gestion","path":"http://infinite-haum0a/mdg/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCO03STSO_25\u0026CONTAINER_NOM_FONCTION=ACBN_102\u0026AFFICHAGE_CONTAINER=OK\u0026CONTAINER_FONCTION_FORCAGE_VALIDATION=FALSE\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCO03STSO_25\u0026CONTAINER_NOM_FONCTION=ACIC_100\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pBlockNotes.oContentBlockNote = ActivInfinitev7.pBlockNotes.addItem('oContentBlockNote');
ActivInfinitev7.pBlockNotes.oTitlePage = ActivInfinitev7.pBlockNotes.addItem('oTitlePage', {"mustExist":true});
ActivInfinitev7.pBlockNotes.btInsuredIdentPage = ActivInfinitev7.pBlockNotes.addItem('btInsuredIdentPage');

ActivInfinitev7.pInsuredIdent = ActivInfinitev7.addPage('pInsuredIdent', {"comment":"Consultation - N°00293756 - Résilié - Adhérent : Monsieur CALVEZ DANIEL - haum0a - Activ Infinite - Module de gestion","path":"http://infinite-haum0a/mdg/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCO03STSO_6\u0026CONTAINER_NOM_FONCTION=ACIA_400\u0026AFFICHAGE_CONTAINER=OK\u0026CONTAINER_FONCTION_FORCAGE_VALIDATION=FALSE\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCO03STSO_6\u0026CONTAINER_NOM_FONCTION=ACIC_100\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pInsuredIdent.btHelpCSCertificate = ActivInfinitev7.pInsuredIdent.addItem('btHelpCSCertificate');
ActivInfinitev7.pInsuredIdent.oTitlePage = ActivInfinitev7.pInsuredIdent.addItem('oTitlePage', {"mustExist":true});

ActivInfinitev7.pCertificateHelpCS = ActivInfinitev7.addPage('pCertificateHelpCS', {"comment":"Consultation - Adhérent : Monsieur CHARLOT GUY - haum0a - Activ Infinite - Module de gestion","path":"http://infinite-haum0a/mdg/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCO03STSO_1\u0026CONTAINER_NOM_FONCTION=ACAC_403\u0026AFFICHAGE_CONTAINER=OK\u0026CONTAINER_FONCTION_FORCAGE_VALIDATION=FALSE\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCO03STSO_1\u0026CONTAINER_NOM_FONCTION=ACIA_400\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pCertificateHelpCS.oType = ActivInfinitev7.pCertificateHelpCS.addItem('oType', {"occurs":1});
ActivInfinitev7.pCertificateHelpCS.oStartDate = ActivInfinitev7.pCertificateHelpCS.addItem('oStartDate', {"occurs":1});
ActivInfinitev7.pCertificateHelpCS.oEndDate = ActivInfinitev7.pCertificateHelpCS.addItem('oEndDate', {"occurs":1});
ActivInfinitev7.pCertificateHelpCS.btProductList = ActivInfinitev7.pCertificateHelpCS.addItem('btProductList');
ActivInfinitev7.pCertificateHelpCS.oTitlePage = ActivInfinitev7.pCertificateHelpCS.addItem('oTitlePage', {"mustExist":true});

ActivInfinitev7.pProductUpdate = ActivInfinitev7.addPage('pProductUpdate', {"comment":"Sans effet - Changement couverture - N°03043298 - Valide - Adhérent : Madame JEANNE FRANCOISE - haum04 - Activ Infinite - Module de gestion","path":"http://infinite-haum04/mdg/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCC04STD_31\u0026CONTAINER_NOM_FONCTION=ACG2_200\u0026AFFICHAGE_CONTAINER=OK\u0026BOUTON_CONTAINER=BOUTON_SUIVANT\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCC04STD_31\u0026CONTAINER_NOM_FONCTION=ACIC_100\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pProductUpdate.oTitlePage = ActivInfinitev7.pProductUpdate.addItem('oTitlePage', {"mustExist":true});
ActivInfinitev7.pProductUpdate.btNext = ActivInfinitev7.pProductUpdate.addItem('btNext');

ActivInfinitev7.pDiversParam = ActivInfinitev7.addPage('pDiversParam', {"comment":"Sans effet - Changement couverture - N°03043298 - Valide - Adhérent : Madame JEANNE FRANCOISE - haum04 - Activ Infinite - Module de gestion","path":"http://infinite-haum04/mdg/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCC04STD_31\u0026CONTAINER_NOM_FONCTION=ACPD_300\u0026AFFICHAGE_CONTAINER=OK\u0026BOUTON_CONTAINER=BOUTON_SUIVANT\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCC04STD_31\u0026CONTAINER_NOM_FONCTION=ACG2_200\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pDiversParam.oTitlePage = ActivInfinitev7.pDiversParam.addItem('oTitlePage', {"mustExist":true});
ActivInfinitev7.pDiversParam.btNext = ActivInfinitev7.pDiversParam.addItem('btNext');

ActivInfinitev7.pCalculParam = ActivInfinitev7.addPage('pCalculParam', {"comment":"Sans effet - Changement couverture - N°03043298 - Valide - Adhérent : Madame JEANNE FRANCOISE - haum04 - Activ Infinite - Module de gestion","path":"http://infinite-haum04/mdg/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCC04STD_31\u0026CONTAINER_NOM_FONCTION=AC32_400\u0026AFFICHAGE_CONTAINER=OK\u0026BOUTON_CONTAINER=BOUTON_SUIVANT\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCC04STD_31\u0026CONTAINER_NOM_FONCTION=ACPD_300\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pCalculParam.oTitlePage = ActivInfinitev7.pCalculParam.addItem('oTitlePage', {"mustExist":true});
ActivInfinitev7.pCalculParam.btNext = ActivInfinitev7.pCalculParam.addItem('btNext');

ActivInfinitev7.pContributionHistory = ActivInfinitev7.addPage('pContributionHistory', {"comment":"Sans effet - Changement couverture - N°03043298 - Valide - Adhérent : Madame JEANNE FRANCOISE - haum04 - Activ Infinite - Module de gestion","path":"http://infinite-haum04/mdg/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCC04STD_32\u0026CONTAINER_NOM_FONCTION=AC3Q_500\u0026AFFICHAGE_CONTAINER=OK\u0026BOUTON_CONTAINER=BOUTON_SUIVANT\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCC04STD_32\u0026CONTAINER_NOM_FONCTION=AC32_400\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pContributionHistory.oTitlePage1 = ActivInfinitev7.pContributionHistory.addItem('oTitlePage1', {"mustExist":true});
ActivInfinitev7.pContributionHistory.oTitlePage2 = ActivInfinitev7.pContributionHistory.addItem('oTitlePage2', {"mustExist":true});
ActivInfinitev7.pContributionHistory.btNext = ActivInfinitev7.pContributionHistory.addItem('btNext');

ActivInfinitev7.pContributionVisu = ActivInfinitev7.addPage('pContributionVisu', {"comment":"Sans effet - Changement couverture - N°03043298 - Valide - Adhérent : Madame JEANNE FRANCOISE - haum04 - Activ Infinite - Module de gestion","path":"http://infinite-haum04/mdg/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCC04STD_32\u0026CONTAINER_NOM_FONCTION=AC36_600\u0026AFFICHAGE_CONTAINER=OK\u0026BOUTON_CONTAINER=BOUTON_SUIVANT\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCC04STD_32\u0026CONTAINER_NOM_FONCTION=AC3Q_500\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pContributionVisu.oValidation = ActivInfinitev7.pContributionVisu.addItem('oValidation', {"mustExist":true,"type":"Key"});
ActivInfinitev7.pContributionVisu.btNext = ActivInfinitev7.pContributionVisu.addItem('btNext');

ActivInfinitev7.pSaveUpdate = ActivInfinitev7.addPage('pSaveUpdate', {"comment":"Sans effet - Changement couverture - N°03043298 - Valide - Adhérent : Madame JEANNE FRANCOISE - haum04 - Activ Infinite - Module de gestion","path":"http://infinite-haum04/mdg/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCC04STD_52\u0026CONTAINER_NOM_FONCTION=ACVV_700\u0026AFFICHAGE_CONTAINER=OK\u0026BOUTON_CONTAINER=BOUTON_SUIVANT\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCC04STD_52\u0026CONTAINER_NOM_FONCTION=AC36_600\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pSaveUpdate.oTitlePage = ActivInfinitev7.pSaveUpdate.addItem('oTitlePage', {"mustExist":true});
ActivInfinitev7.pSaveUpdate.btSave = ActivInfinitev7.pSaveUpdate.addItem('btSave', {"mustExist":true});
ActivInfinitev7.pSaveUpdate.btClose = ActivInfinitev7.pSaveUpdate.addItem('btClose');
