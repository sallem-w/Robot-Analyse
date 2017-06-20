// Contextor Studio
// Auto-generated declaration file : do not modify !



var ActivInfinitev7 = ctx.addApplication('ActivInfinitev7', {"comment":"v7","nature":"WEB3","path":"http://infinite-haum0a/mdg/auth/Login.do"});

ActivInfinitev7.pDashboard = ActivInfinitev7.addPage('pDashboard', {"comment":"haum0a - Activ Infinite - Module de gestion","path":"http://infinite-haum0a/mdg/"});
ActivInfinitev7.pDashboard.oMenuHidden = ActivInfinitev7.pDashboard.addItem('oMenuHidden', {"mustExist":true});

ActivInfinitev7.pSynthesisSearch = ActivInfinitev7.addPage('pSynthesisSearch', {"comment":"Contexte Contrat - haum0a - Activ Infinite - Module de gestion","path":"http://infinite-haum0a/mdg/Go.do?id=ACW1\u0026action=afficherContrat"});
ActivInfinitev7.pSynthesisSearch.oTitlePage = ActivInfinitev7.pSynthesisSearch.addItem('oTitlePage', {"mustExist":true});
ActivInfinitev7.pSynthesisSearch.oTitlePage2 = ActivInfinitev7.pSynthesisSearch.addItem('oTitlePage2', {"mustNotExist":true});
ActivInfinitev7.pSynthesisSearch.btSearch = ActivInfinitev7.pSynthesisSearch.addItem('btSearch');
ActivInfinitev7.pSynthesisSearch.oBenefIdentification = ActivInfinitev7.pSynthesisSearch.addItem('oBenefIdentification');
ActivInfinitev7.pSynthesisSearch.oTypeIdentification = ActivInfinitev7.pSynthesisSearch.addItem('oTypeIdentification');

ActivInfinitev7.pSynthesis = ActivInfinitev7.addPage('pSynthesis', {"comment":"Contexte Contrat - haum0a - Activ Infinite - Module de gestion","path":"http://infinite-haum0a/mdg/AccueilMenu.do?method=rechercher"});
ActivInfinitev7.pSynthesis.oTitlePage = ActivInfinitev7.pSynthesis.addItem('oTitlePage', {"mustExist":true});
ActivInfinitev7.pSynthesis.oDateEnd = ActivInfinitev7.pSynthesis.addItem('oDateEnd', {"occurs":1});
ActivInfinitev7.pSynthesis.oIndividualContract = ActivInfinitev7.pSynthesis.addItem('oIndividualContract', {"occurs":1});
ActivInfinitev7.pSynthesis.oTitlePage2 = ActivInfinitev7.pSynthesis.addItem('oTitlePage2', {"mustExist":true});

ActivInfinitev7.pSearchContractIndiv = ActivInfinitev7.addPage('pSearchContractIndiv', {"comment":"Sans effet - Changement couverture - haum04 - Activ Infinite - Module de gestion","path":"http://infinite-haum04/mdg/Go.do?id=ACCC04STD"});
ActivInfinitev7.pSearchContractIndiv.oIndividualContract = ActivInfinitev7.pSearchContractIndiv.addItem('oIndividualContract', {"mustExist":true});
ActivInfinitev7.pSearchContractIndiv.oDateContract = ActivInfinitev7.pSearchContractIndiv.addItem('oDateContract');
ActivInfinitev7.pSearchContractIndiv.btNext = ActivInfinitev7.pSearchContractIndiv.addItem('btNext', {"mustNotExist":true});
ActivInfinitev7.pSearchContractIndiv.btSearch = ActivInfinitev7.pSearchContractIndiv.addItem('btSearch', {"mustExist":true});
ActivInfinitev7.pSearchContractIndiv.btClose = ActivInfinitev7.pSearchContractIndiv.addItem('btClose');

ActivInfinitev7.pTerminatedContractFo = ActivInfinitev7.addPage('pTerminatedContractFo', {"comment":"Sans effet - Changement couverture - N°03043298 - Valide - Adhérent : Madame JEANNE FRANCOISE - haum04 - Activ Infinite - Module de gestion","path":"http://infinite-haum04/mdg/contrat/ACIC.do?method=rechercher\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCC04STD_9\u0026CONTAINER_NOM_FONCTION=ACIC_100\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pTerminatedContractFo.btNext = ActivInfinitev7.pTerminatedContractFo.addItem('btNext');
ActivInfinitev7.pTerminatedContractFo.btNavigateBlockNote = ActivInfinitev7.pTerminatedContractFo.addItem('btNavigateBlockNote');
ActivInfinitev7.pTerminatedContractFo.btClose = ActivInfinitev7.pTerminatedContractFo.addItem('btClose');
ActivInfinitev7.pTerminatedContractFo.btSearch = ActivInfinitev7.pTerminatedContractFo.addItem('btSearch', {"mustExist":true});
ActivInfinitev7.pTerminatedContractFo.btNavigateInsuredIden = ActivInfinitev7.pTerminatedContractFo.addItem('btNavigateInsuredIden');

ActivInfinitev7.pBlockNotes = ActivInfinitev7.addPage('pBlockNotes', {"comment":"Consultation - N°21998269 - Résilié - Adhérent : Madame RUIZ SANDRINE - haum0a - Activ Infinite - Module de gestion","path":"http://infinite-haum0a/mdg/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCO03STSO_25\u0026CONTAINER_NOM_FONCTION=ACBN_102\u0026AFFICHAGE_CONTAINER=OK\u0026CONTAINER_FONCTION_FORCAGE_VALIDATION=FALSE\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCO03STSO_25\u0026CONTAINER_NOM_FONCTION=ACIC_100\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pBlockNotes.oContentBlockNote = ActivInfinitev7.pBlockNotes.addItem('oContentBlockNote');
ActivInfinitev7.pBlockNotes.oTitlePage = ActivInfinitev7.pBlockNotes.addItem('oTitlePage', {"mustExist":true});
ActivInfinitev7.pBlockNotes.btInsuredIdentPage = ActivInfinitev7.pBlockNotes.addItem('btInsuredIdentPage');
ActivInfinitev7.pBlockNotes.btNext = ActivInfinitev7.pBlockNotes.addItem('btNext');
ActivInfinitev7.pBlockNotes.btClose = ActivInfinitev7.pBlockNotes.addItem('btClose');

ActivInfinitev7.pInsuredIdent = ActivInfinitev7.addPage('pInsuredIdent', {"comment":"Consultation - N°00293756 - Résilié - Adhérent : Monsieur CALVEZ DANIEL - haum0a - Activ Infinite - Module de gestion","path":"http://infinite-haum0a/mdg/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCO03STSO_6\u0026CONTAINER_NOM_FONCTION=ACIA_400\u0026AFFICHAGE_CONTAINER=OK\u0026CONTAINER_FONCTION_FORCAGE_VALIDATION=FALSE\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCO03STSO_6\u0026CONTAINER_NOM_FONCTION=ACIC_100\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pInsuredIdent.btHelpCSCertificate = ActivInfinitev7.pInsuredIdent.addItem('btHelpCSCertificate');
ActivInfinitev7.pInsuredIdent.oTitlePage = ActivInfinitev7.pInsuredIdent.addItem('oTitlePage', {"mustExist":true});
ActivInfinitev7.pInsuredIdent.btInfoRo = ActivInfinitev7.pInsuredIdent.addItem('btInfoRo');

ActivInfinitev7.pCertificateHelpCS = ActivInfinitev7.addPage('pCertificateHelpCS', {"comment":"Consultation - Adhérent : Monsieur CHARLOT GUY - haum0a - Activ Infinite - Module de gestion","path":"http://infinite-haum0a/mdg/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCO03STSO_1\u0026CONTAINER_NOM_FONCTION=ACAC_403\u0026AFFICHAGE_CONTAINER=OK\u0026CONTAINER_FONCTION_FORCAGE_VALIDATION=FALSE\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCO03STSO_1\u0026CONTAINER_NOM_FONCTION=ACIA_400\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pCertificateHelpCS.oType = ActivInfinitev7.pCertificateHelpCS.addItem('oType', {"occurs":1});
ActivInfinitev7.pCertificateHelpCS.oStartDate = ActivInfinitev7.pCertificateHelpCS.addItem('oStartDate', {"occurs":1});
ActivInfinitev7.pCertificateHelpCS.oEndDate = ActivInfinitev7.pCertificateHelpCS.addItem('oEndDate', {"occurs":1});
ActivInfinitev7.pCertificateHelpCS.oTitlePage = ActivInfinitev7.pCertificateHelpCS.addItem('oTitlePage', {"mustExist":true});
ActivInfinitev7.pCertificateHelpCS.btVisuCotisation = ActivInfinitev7.pCertificateHelpCS.addItem('btVisuCotisation');

ActivInfinitev7.pProductList = ActivInfinitev7.addPage('pProductList', {"comment":"Consultation - N°00248886 - Valide - Adhérent : Monsieur GOURIO LOIC - haum0a - Activ Infinite - Module de gestion","path":"http://infinite-haum0a/mdg/contrat/ACG2.do?method=doSelectionAssure\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCO03STSO_17\u0026CONTAINER_NOM_FONCTION=ACG2\u0026AFFICHAGE_CONTAINER\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCO03STSO_17\u0026CONTAINER_NOM_FONCTION=ACG2_500\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pProductList.oTitlePage = ActivInfinitev7.pProductList.addItem('oTitlePage', {"mustExist":true});
ActivInfinitev7.pProductList.oNameBenef = ActivInfinitev7.pProductList.addItem('oNameBenef', {"occurs":1});
ActivInfinitev7.pProductList.oTypeBenef = ActivInfinitev7.pProductList.addItem('oTypeBenef', {"occurs":1});
ActivInfinitev7.pProductList.oCodeProduct = ActivInfinitev7.pProductList.addItem('oCodeProduct', {"occurs":1});
ActivInfinitev7.pProductList.oEndDateProduct = ActivInfinitev7.pProductList.addItem('oEndDateProduct', {"occurs":1});
ActivInfinitev7.pProductList.oStateProduct = ActivInfinitev7.pProductList.addItem('oStateProduct', {"occurs":1});
ActivInfinitev7.pProductList.btVisuCotisation = ActivInfinitev7.pProductList.addItem('btVisuCotisation');

ActivInfinitev7.pContribution = ActivInfinitev7.addPage('pContribution', {"comment":"Consultation - N°00248886 - Valide - Adhérent : Monsieur GOURIO LOIC - haum0a - Activ Infinite - Module de gestion","path":"http://infinite-haum0a/mdg/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCO03STSO_114\u0026CONTAINER_NOM_FONCTION=AC36_900\u0026AFFICHAGE_CONTAINER=OK\u0026CONTAINER_FONCTION_FORCAGE_VALIDATION=FALSE\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCO03STSO_114\u0026CONTAINER_NOM_FONCTION=AC3Q_800\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pContribution.oTitlePage = ActivInfinitev7.pContribution.addItem('oTitlePage', {"mustExist":true});
ActivInfinitev7.pContribution.oDateEch = ActivInfinitev7.pContribution.addItem('oDateEch', {"occurs":1});
ActivInfinitev7.pContribution.oBalanceEch = ActivInfinitev7.pContribution.addItem('oBalanceEch', {"occurs":1});
ActivInfinitev7.pContribution.btProductList = ActivInfinitev7.pContribution.addItem('btProductList');

ActivInfinitev7.pProductUpdate = ActivInfinitev7.addPage('pProductUpdate', {"comment":"Sans effet - Changement couverture - N°03043298 - Valide - Adhérent : Madame JEANNE FRANCOISE - haum04 - Activ Infinite - Module de gestion","path":"http://infinite-haum04/mdg/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCC04STD_31\u0026CONTAINER_NOM_FONCTION=ACG2_200\u0026AFFICHAGE_CONTAINER=OK\u0026BOUTON_CONTAINER=BOUTON_SUIVANT\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCC04STD_31\u0026CONTAINER_NOM_FONCTION=ACIC_100\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pProductUpdate.oTitlePage = ActivInfinitev7.pProductUpdate.addItem('oTitlePage', {"mustExist":true});
ActivInfinitev7.pProductUpdate.btNext = ActivInfinitev7.pProductUpdate.addItem('btNext');
ActivInfinitev7.pProductUpdate.btClose = ActivInfinitev7.pProductUpdate.addItem('btClose');
ActivInfinitev7.pProductUpdate.btUpdatePage = ActivInfinitev7.pProductUpdate.addItem('btUpdatePage');
ActivInfinitev7.pProductUpdate.btUpdateProduct = ActivInfinitev7.pProductUpdate.addItem('btUpdateProduct');
ActivInfinitev7.pProductUpdate.btAddProduct = ActivInfinitev7.pProductUpdate.addItem('btAddProduct');
ActivInfinitev7.pProductUpdate.oInputNewCodeProduct = ActivInfinitev7.pProductUpdate.addItem('oInputNewCodeProduct');
ActivInfinitev7.pProductUpdate.oCodeProduct = ActivInfinitev7.pProductUpdate.addItem('oCodeProduct', {"occurs":1});
ActivInfinitev7.pProductUpdate.btSaveNewCodeProduct = ActivInfinitev7.pProductUpdate.addItem('btSaveNewCodeProduct');
ActivInfinitev7.pProductUpdate.btSaveUpdateProduct = ActivInfinitev7.pProductUpdate.addItem('btSaveUpdateProduct');

ActivInfinitev7.pDiversParam = ActivInfinitev7.addPage('pDiversParam', {"comment":"Sans effet - Changement couverture - N°03043298 - Valide - Adhérent : Madame JEANNE FRANCOISE - haum04 - Activ Infinite - Module de gestion","path":"http://infinite-haum04/mdg/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCC04STD_31\u0026CONTAINER_NOM_FONCTION=ACPD_300\u0026AFFICHAGE_CONTAINER=OK\u0026BOUTON_CONTAINER=BOUTON_SUIVANT\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCC04STD_31\u0026CONTAINER_NOM_FONCTION=ACG2_200\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pDiversParam.oTitlePage = ActivInfinitev7.pDiversParam.addItem('oTitlePage', {"mustExist":true});
ActivInfinitev7.pDiversParam.btNext = ActivInfinitev7.pDiversParam.addItem('btNext');

ActivInfinitev7.pCalculParam = ActivInfinitev7.addPage('pCalculParam', {"comment":"Sans effet - Changement couverture - N°03043298 - Valide - Adhérent : Madame JEANNE FRANCOISE - haum04 - Activ Infinite - Module de gestion","path":"http://infinite-haum04/mdg/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCC04STD_31\u0026CONTAINER_NOM_FONCTION=AC32_400\u0026AFFICHAGE_CONTAINER=OK\u0026BOUTON_CONTAINER=BOUTON_SUIVANT\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCC04STD_31\u0026CONTAINER_NOM_FONCTION=ACPD_300\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pCalculParam.oTitlePage = ActivInfinitev7.pCalculParam.addItem('oTitlePage', {"mustExist":true});
ActivInfinitev7.pCalculParam.btNext = ActivInfinitev7.pCalculParam.addItem('btNext');
ActivInfinitev7.pCalculParam.oCalculCheck = ActivInfinitev7.pCalculParam.addItem('oCalculCheck');

ActivInfinitev7.pContributionHistory = ActivInfinitev7.addPage('pContributionHistory', {"comment":"Sans effet - Changement couverture - N°03043298 - Valide - Adhérent : Madame JEANNE FRANCOISE - haum04 - Activ Infinite - Module de gestion","path":"http://infinite-haum04/mdg/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCC04STD_32\u0026CONTAINER_NOM_FONCTION=AC3Q_500\u0026AFFICHAGE_CONTAINER=OK\u0026BOUTON_CONTAINER=BOUTON_SUIVANT\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCC04STD_32\u0026CONTAINER_NOM_FONCTION=AC32_400\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pContributionHistory.oTitlePage = ActivInfinitev7.pContributionHistory.addItem('oTitlePage', {"mustExist":true});
ActivInfinitev7.pContributionHistory.btNext = ActivInfinitev7.pContributionHistory.addItem('btNext');

ActivInfinitev7.pContributionVisu = ActivInfinitev7.addPage('pContributionVisu', {"comment":"Sans effet - Changement couverture - N°03043298 - Valide - Adhérent : Madame JEANNE FRANCOISE - haum04 - Activ Infinite - Module de gestion","path":"http://infinite-haum04/mdg/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCC04STD_32\u0026CONTAINER_NOM_FONCTION=AC36_600\u0026AFFICHAGE_CONTAINER=OK\u0026BOUTON_CONTAINER=BOUTON_SUIVANT\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCC04STD_32\u0026CONTAINER_NOM_FONCTION=AC3Q_500\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pContributionVisu.oTitlePage = ActivInfinitev7.pContributionVisu.addItem('oTitlePage', {"mustExist":true});
ActivInfinitev7.pContributionVisu.oTitlePage2 = ActivInfinitev7.pContributionVisu.addItem('oTitlePage2', {"mustExist":true});
ActivInfinitev7.pContributionVisu.oValidation = ActivInfinitev7.pContributionVisu.addItem('oValidation', {"type":"Key"});
ActivInfinitev7.pContributionVisu.btNext = ActivInfinitev7.pContributionVisu.addItem('btNext');

ActivInfinitev7.pSaveUpdate = ActivInfinitev7.addPage('pSaveUpdate', {"comment":"Sans effet - Changement couverture - N°03043298 - Valide - Adhérent : Madame JEANNE FRANCOISE - haum04 - Activ Infinite - Module de gestion","path":"http://infinite-haum04/mdg/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCC04STD_52\u0026CONTAINER_NOM_FONCTION=ACVV_700\u0026AFFICHAGE_CONTAINER=OK\u0026BOUTON_CONTAINER=BOUTON_SUIVANT\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCC04STD_52\u0026CONTAINER_NOM_FONCTION=AC36_600\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pSaveUpdate.oTitlePage = ActivInfinitev7.pSaveUpdate.addItem('oTitlePage', {"mustExist":true});
ActivInfinitev7.pSaveUpdate.btSave = ActivInfinitev7.pSaveUpdate.addItem('btSave', {"mustExist":true});
ActivInfinitev7.pSaveUpdate.btClose = ActivInfinitev7.pSaveUpdate.addItem('btClose');

ActivInfinitev7.pChangeStateProduct = ActivInfinitev7.addPage('pChangeStateProduct', {"comment":"Changement de couverture - N°00248886 - Valide - Adhérent : Monsieur GOURIO LOIC - haum04 - Activ Infinite - Module de gestion","path":"http://infinite-haum04/mdg/contrat/ACG2.do?method=doModifierCouverture\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCC01STD_67\u0026CONTAINER_NOM_FONCTION=ACG2\u0026AFFICHAGE_CONTAINER\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCC01STD_67\u0026CONTAINER_NOM_FONCTION=ACG2_300\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pChangeStateProduct.oStateProduct = ActivInfinitev7.pChangeStateProduct.addItem('oStateProduct', {"mustExist":true,"type":"Key"});
ActivInfinitev7.pChangeStateProduct.btSave = ActivInfinitev7.pChangeStateProduct.addItem('btSave', {"mustExist":true});

ActivInfinitev7.pCoverageImmediateEch = ActivInfinitev7.addPage('pCoverageImmediateEch', {"comment":"Changement de couverture - N°00248886 - Valide - Adhérent : Monsieur GOURIO LOIC - haum04 - Activ Infinite - Module de gestion","path":"http://infinite-haum04/mdg/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCC01STD_14\u0026CONTAINER_NOM_FONCTION=AC3U_900\u0026AFFICHAGE_CONTAINER=OK\u0026BOUTON_CONTAINER=BOUTON_SUIVANT\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCC01STD_14\u0026CONTAINER_NOM_FONCTION=AC36_800\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pCoverageImmediateEch.oTitlePage = ActivInfinitev7.pCoverageImmediateEch.addItem('oTitlePage', {"mustExist":true});
ActivInfinitev7.pCoverageImmediateEch.oEditionSelect = ActivInfinitev7.pCoverageImmediateEch.addItem('oEditionSelect', {"mustExist":true,"type":"Key"});
ActivInfinitev7.pCoverageImmediateEch.btNext = ActivInfinitev7.pCoverageImmediateEch.addItem('btNext');

ActivInfinitev7.pCoverageImmediateCar = ActivInfinitev7.addPage('pCoverageImmediateCar', {"comment":"Changement de couverture - N°00248886 - Valide - Adhérent : Monsieur GOURIO LOIC - haum04 - Activ Infinite - Module de gestion","path":"http://infinite-haum04/mdg/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCC01STD_14\u0026CONTAINER_NOM_FONCTION=ACEK_1000\u0026AFFICHAGE_CONTAINER=OK\u0026BOUTON_CONTAINER=BOUTON_SUIVANT\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCC01STD_14\u0026CONTAINER_NOM_FONCTION=AC3U_900\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pCoverageImmediateCar.oEditionCheck = ActivInfinitev7.pCoverageImmediateCar.addItem('oEditionCheck', {"mustExist":true});
ActivInfinitev7.pCoverageImmediateCar.oTitlePage = ActivInfinitev7.pCoverageImmediateCar.addItem('oTitlePage', {"mustExist":true});
ActivInfinitev7.pCoverageImmediateCar.btNext = ActivInfinitev7.pCoverageImmediateCar.addItem('btNext');

ActivInfinitev7.pInfoRo = ActivInfinitev7.addPage('pInfoRo', {"comment":"Consultation - N°21309938 - Valide - Adhérent : Monsieur HASANI MENTOR - haum04 - Activ Infinite - Module de gestion","path":"http://infinite-haum04/mdg/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCO03STSO_1\u0026CONTAINER_NOM_FONCTION=ACRO_402\u0026AFFICHAGE_CONTAINER=OK\u0026CONTAINER_FONCTION_FORCAGE_VALIDATION=FALSE\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCO03STSO_1\u0026CONTAINER_NOM_FONCTION=ACIA_400\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pInfoRo.oTitlePage = ActivInfinitev7.pInfoRo.addItem('oTitlePage', {"mustExist":true});
ActivInfinitev7.pInfoRo.oTitlePage2 = ActivInfinitev7.pInfoRo.addItem('oTitlePage2');
ActivInfinitev7.pInfoRo.oTypeInsured = ActivInfinitev7.pInfoRo.addItem('oTypeInsured', {"occurs":1});
ActivInfinitev7.pInfoRo.oStateProduct = ActivInfinitev7.pInfoRo.addItem('oStateProduct', {"occurs":1});
ActivInfinitev7.pInfoRo.oRangeInsured = ActivInfinitev7.pInfoRo.addItem('oRangeInsured', {"occurs":1});
ActivInfinitev7.pInfoRo.oEndEffectProductDate = ActivInfinitev7.pInfoRo.addItem('oEndEffectProductDate', {"occurs":1});
ActivInfinitev7.pInfoRo.oCodeProduct = ActivInfinitev7.pInfoRo.addItem('oCodeProduct', {"occurs":1});
ActivInfinitev7.pInfoRo.btNavigateProductList = ActivInfinitev7.pInfoRo.addItem('btNavigateProductList');

ActivInfinitev7.pMembershipColSearch = ActivInfinitev7.addPage('pMembershipColSearch', {"comment":"Adhésions en collectif - haum04 - Activ Infinite - Module de gestion","path":"http://infinite-haum04/mdg/Go.do?id=ACSO01ASOB"});
ActivInfinitev7.pMembershipColSearch.oNumberContractCol = ActivInfinitev7.pMembershipColSearch.addItem('oNumberContractCol', {"mustExist":true});
ActivInfinitev7.pMembershipColSearch.oInsureGroup = ActivInfinitev7.pMembershipColSearch.addItem('oInsureGroup', {"mustExist":true});
ActivInfinitev7.pMembershipColSearch.oContractType = ActivInfinitev7.pMembershipColSearch.addItem('oContractType');
ActivInfinitev7.pMembershipColSearch.btNext = ActivInfinitev7.pMembershipColSearch.addItem('btNext', {"mustNotExist":true});
ActivInfinitev7.pMembershipColSearch.btSearch = ActivInfinitev7.pMembershipColSearch.addItem('btSearch');

ActivInfinitev7.pMembershipSearchBene = ActivInfinitev7.addPage('pMembershipSearchBene', {"comment":"Adhésions en collectif - N°22401301 - EN COURS - - VETIR ERAM ENSEMBLE DU PERSONNEL - haum04 - Activ Infinite - Module de gestion","path":"http://infinite-haum04/mdg/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACSO01ASOB_28\u0026CONTAINER_NOM_FONCTION=ACIN_200\u0026AFFICHAGE_CONTAINER=OK\u0026BOUTON_CONTAINER=BOUTON_SUIVANT\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACSO01ASOB_28\u0026CONTAINER_NOM_FONCTION=ACIC_100\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pMembershipSearchBene.oNumberINSEE = ActivInfinitev7.pMembershipSearchBene.addItem('oNumberINSEE', {"mustExist":true});
ActivInfinitev7.pMembershipSearchBene.btSearch = ActivInfinitev7.pMembershipSearchBene.addItem('btSearch');
ActivInfinitev7.pMembershipSearchBene.oSearchValid = ActivInfinitev7.pMembershipSearchBene.addItem('oSearchValid');
ActivInfinitev7.pMembershipSearchBene.btValid = ActivInfinitev7.pMembershipSearchBene.addItem('btValid');
ActivInfinitev7.pMembershipSearchBene.btCancel = ActivInfinitev7.pMembershipSearchBene.addItem('btCancel');

ActivInfinitev7.pMembershipMainBenef = ActivInfinitev7.addPage('pMembershipMainBenef', {"comment":"Adhésions en collectif - N°22468406 - EN COURS - - VETIR ERAM ENSEMBLE DU PERSONNEL - haum0a - Activ Infinite - Module de gestion","path":"http://infinite-haum0a/mdg/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACSO01ASOB_18\u0026CONTAINER_NOM_FONCTION=ACIS_300\u0026AFFICHAGE_CONTAINER=OK\u0026BOUTON_CONTAINER=BOUTON_SUIVANT\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACSO01ASOB_18\u0026CONTAINER_NOM_FONCTION=ACIN_200\u0026AFFICHAGE_CONTAINER"});
