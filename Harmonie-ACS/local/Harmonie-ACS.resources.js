// Contextor Studio
// Auto-generated declaration file : do not modify !



var ActivInfinite = ctx.addApplication('ActivInfinite', {"nature":"WEB3","path":"http://infinite-haur05/WebAneto/ValiderIdentification.do#"});

ActivInfinite.pDashboard = ActivInfinite.addPage('pDashboard', {"comment":"Activ Infinite - Site 01 - SAPCTOR1 (Utilisateur)","path":"http://infinite-haur05/WebAneto/ValiderIdentification.do"});
ActivInfinite.pDashboard.btMenu = ActivInfinite.pDashboard.addItem('btMenu');

ActivInfinite.pEffectParamCalc = ActivInfinite.addPage('pEffectParamCalc', {"comment":"[frameInitial0] - Web Aneto","path":"http://infinite-haur05/WebAneto/container/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACRE04RE4S_416\u0026CONTAINER_NOM_FONCTION=AC32_200\u0026AFFICHAGE_CONTAINER=OK\u0026BOUTON_CONTAINER=BOUTON_SUIVANT"});
ActivInfinite.pEffectParamCalc.oBtNext = ActivInfinite.pEffectParamCalc.addItem('oBtNext');
ActivInfinite.pEffectParamCalc.oTitlePage = ActivInfinite.pEffectParamCalc.addItem('oTitlePage', {"mustExist":true});

ActivInfinite.pConsultContratIndiv = ActivInfinite.addPage('pConsultContratIndiv', {"comment":"[frameInitial0] - Web Aneto","path":"http://infinite-haur05/WebAneto/ValiderIdentification.do#"});
ActivInfinite.pConsultContratIndiv.oIndividualContract = ActivInfinite.pConsultContratIndiv.addItem('oIndividualContract', {"mustExist":true});
ActivInfinite.pConsultContratIndiv.btSearch = ActivInfinite.pConsultContratIndiv.addItem('btSearch', {"mustExist":true});
ActivInfinite.pConsultContratIndiv.oDateContract = ActivInfinite.pConsultContratIndiv.addItem('oDateContract', {"mustExist":true});
ActivInfinite.pConsultContratIndiv.oTitleMenu = ActivInfinite.pConsultContratIndiv.addItem('oTitleMenu', {"mustExist":true});

ActivInfinite.pContratIndivFound = ActivInfinite.addPage('pContratIndivFound', {"comment":"[frameInitial0] - Web Aneto","path":"http://infinite-haur05/WebAneto/contrat/ACIC.do?method=rechercher\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCO03STSO_59\u0026CONTAINER_NOM_FONCTION=ACIC_100\u0026AFFICHAGE_CONTAINER="});
ActivInfinite.pContratIndivFound.oIndividualContract = ActivInfinite.pContratIndivFound.addItem('oIndividualContract', {"mustExist":true});
ActivInfinite.pContratIndivFound.oBtNext = ActivInfinite.pContratIndivFound.addItem('oBtNext');
ActivInfinite.pContratIndivFound.oBtClose = ActivInfinite.pContratIndivFound.addItem('oBtClose');
ActivInfinite.pContratIndivFound.btNavigateBlockNote = ActivInfinite.pContratIndivFound.addItem('btNavigateBlockNote', {"mustExist":true});

ActivInfinite.pContractIndivNotFoun = ActivInfinite.addPage('pContractIndivNotFoun', {"comment":"[frameInitial0] - Web Aneto","path":"http://infinite-haur05/WebAneto/contrat/ACIC.do?method=rechercher\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCO03STSO_201\u0026CONTAINER_NOM_FONCTION=ACIC_100\u0026AFFICHAGE_CONTAINER="});
ActivInfinite.pContractIndivNotFoun.oDetailError = ActivInfinite.pContractIndivNotFoun.addItem('oDetailError');
ActivInfinite.pContractIndivNotFoun.oTitlePage = ActivInfinite.pContractIndivNotFoun.addItem('oTitlePage', {"mustExist":true});
ActivInfinite.pContractIndivNotFoun.oBtClose = ActivInfinite.pContractIndivNotFoun.addItem('oBtClose');

ActivInfinite.pBlockNotes = ActivInfinite.addPage('pBlockNotes', {"comment":"[frameInitial0] - Web Aneto","path":"http://infinite-haur05/WebAneto/container/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCO03STSO_139\u0026CONTAINER_NOM_FONCTION=ACBN_102\u0026AFFICHAGE_CONTAINER=OK\u0026CONTAINER_FONCTION_FORCAGE_VALIDATION=FALSE"});
ActivInfinite.pBlockNotes.oBlockNotes = ActivInfinite.pBlockNotes.addItem('oBlockNotes', {"mustExist":true});
ActivInfinite.pBlockNotes.oContentBlockNote = ActivInfinite.pBlockNotes.addItem('oContentBlockNote');
ActivInfinite.pBlockNotes.oBtClose = ActivInfinite.pBlockNotes.addItem('oBtClose');
ActivInfinite.pBlockNotes.btHelpCSCertificate = ActivInfinite.pBlockNotes.addItem('btHelpCSCertificate');
ActivInfinite.pBlockNotes.oNodeInsuredIdent = ActivInfinite.pBlockNotes.addItem('oNodeInsuredIdent');

ActivInfinite.pProductList = ActivInfinite.addPage('pProductList', {"comment":"[frameInitial0] - Web Aneto","path":"http://infinite-haur05/WebAneto/container/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCO03STSO_33\u0026CONTAINER_NOM_FONCTION=ACPG_500\u0026AFFICHAGE_CONTAINER=OK\u0026CONTAINER_FONCTION_FORCAGE_VALIDATION=FALSE"});
ActivInfinite.pProductList.oTextContract = ActivInfinite.pProductList.addItem('oTextContract', {"mustExist":true});
ActivInfinite.pProductList.oBtClose = ActivInfinite.pProductList.addItem('oBtClose');
ActivInfinite.pProductList.oRowInformation = ActivInfinite.pProductList.addItem('oRowInformation', {"occurs":1});
ActivInfinite.pProductList.btVisuContribution = ActivInfinite.pProductList.addItem('btVisuContribution');

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

ActivInfinite.pEffectConsultContrac = ActivInfinite.addPage('pEffectConsultContrac', {"comment":"[frameInitial0] - Web Aneto","path":"http://infinite-haur05/WebAneto/container/LancementScenario.do?SAPCTOR1\u00261494580799195\u0026method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACRE04RE4S\u0026tailleFenetre=526"});
ActivInfinite.pEffectConsultContrac.oIndividualContract = ActivInfinite.pEffectConsultContrac.addItem('oIndividualContract');
ActivInfinite.pEffectConsultContrac.btSearch = ActivInfinite.pEffectConsultContrac.addItem('btSearch');
ActivInfinite.pEffectConsultContrac.oResiliationHidden = ActivInfinite.pEffectConsultContrac.addItem('oResiliationHidden', {"mustExist":true});

ActivInfinite.pEffectContractFound = ActivInfinite.addPage('pEffectContractFound', {"comment":"[frameInitial0] - Web Aneto","path":"http://infinite-haur05/WebAneto/contrat/ACIC.do?method=rechercher\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACRE04RE4S_416\u0026CONTAINER_NOM_FONCTION=ACIC_100\u0026AFFICHAGE_CONTAINER="});
ActivInfinite.pEffectContractFound.oResiliationDisplay = ActivInfinite.pEffectContractFound.addItem('oResiliationDisplay', {"mustExist":true});
ActivInfinite.pEffectContractFound.oBtNext = ActivInfinite.pEffectContractFound.addItem('oBtNext');

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
