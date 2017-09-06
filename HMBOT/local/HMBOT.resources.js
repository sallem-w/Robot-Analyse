// Contextor Studio
// Auto-generated declaration file : do not modify !



var ActivInfinitev7 = ctx.addApplication('ActivInfinitev7', {"comment":"v7","nature":"WEB3","path":"http://infinite-haum0a/mdg/auth/Login.do"});

ActivInfinitev7.pConnexion = ActivInfinitev7.addPage('pConnexion', {"comment":"Activ Infinite - Module de gestion","path":"http://infinite-haum0a/mdg/auth/Login.do?logout"});
ActivInfinitev7.pConnexion.oLogin = ActivInfinitev7.pConnexion.addItem('oLogin', {"mustExist":true});
ActivInfinitev7.pConnexion.oPassword = ActivInfinitev7.pConnexion.addItem('oPassword');
ActivInfinitev7.pConnexion.btLogin = ActivInfinitev7.pConnexion.addItem('btLogin', {"mustExist":true});

ActivInfinitev7.pDashboard = ActivInfinitev7.addPage('pDashboard', {"comment":"haum0a - Activ Infinite - Module de gestion","path":"http://infinite-haum0a/mdg/"});
ActivInfinitev7.pDashboard.btSynthesisMenu = ActivInfinitev7.pDashboard.addItem('btSynthesisMenu', {"mustExist":true});
ActivInfinitev7.pDashboard.btIndividualContract = ActivInfinitev7.pDashboard.addItem('btIndividualContract');
ActivInfinitev7.pDashboard.btContractContexte = ActivInfinitev7.pDashboard.addItem('btContractContexte');
ActivInfinitev7.pDashboard.btIndivContractMenu = ActivInfinitev7.pDashboard.addItem('btIndivContractMenu');
ActivInfinitev7.pDashboard.btConsultation = ActivInfinitev7.pDashboard.addItem('btConsultation');
ActivInfinitev7.pDashboard.btCoverageChangeMenu = ActivInfinitev7.pDashboard.addItem('btCoverageChangeMenu');
ActivInfinitev7.pDashboard.btCoverageChange = ActivInfinitev7.pDashboard.addItem('btCoverageChange');
ActivInfinitev7.pDashboard.btTerminatedContract = ActivInfinitev7.pDashboard.addItem('btTerminatedContract');
ActivInfinitev7.pDashboard.btMembershipCollectiv = ActivInfinitev7.pDashboard.addItem('btMembershipCollectiv');
ActivInfinitev7.pDashboard.btSanteSouscription = ActivInfinitev7.pDashboard.addItem('btSanteSouscription');
ActivInfinitev7.pDashboard.btTerminatedMenu = ActivInfinitev7.pDashboard.addItem('btTerminatedMenu');
ActivInfinitev7.pDashboard.btTerminatedCMU = ActivInfinitev7.pDashboard.addItem('btTerminatedCMU');
ActivInfinitev7.pDashboard.btTerminatedInAdvance = ActivInfinitev7.pDashboard.addItem('btTerminatedInAdvance');
ActivInfinitev7.pDashboard.btTerminatedProduct = ActivInfinitev7.pDashboard.addItem('btTerminatedProduct');
ActivInfinitev7.pDashboard.btParticularSituation = ActivInfinitev7.pDashboard.addItem('btParticularSituation');

ActivInfinitev7.pRecherSynthese = ActivInfinitev7.addPage('pRecherSynthese', {"comment":"Contexte Contrat - haum0a - Activ Infinite - Module de gestion","path":"http://infinite-haum0a/mdg/Go.do?id=ACW1\u0026action=afficherContrat"});
ActivInfinitev7.pRecherSynthese.oTitlePage2 = ActivInfinitev7.pRecherSynthese.addItem('oTitlePage2', {"mustNotExist":true});
ActivInfinitev7.pRecherSynthese.btSearch = ActivInfinitev7.pRecherSynthese.addItem('btSearch');
ActivInfinitev7.pRecherSynthese.oBenefIdentification = ActivInfinitev7.pRecherSynthese.addItem('oBenefIdentification', {"mustExist":true});
ActivInfinitev7.pRecherSynthese.oTypeIdentification = ActivInfinitev7.pRecherSynthese.addItem('oTypeIdentification', {"mustExist":true});

ActivInfinitev7.pSynthese = ActivInfinitev7.addPage('pSynthese', {"comment":"Contexte Contrat - haum0a - Activ Infinite - Module de gestion","path":"http://infinite-haum0a/mdg/AccueilMenu.do?method=rechercher"});
ActivInfinitev7.pSynthese.oTitlePage = ActivInfinitev7.pSynthese.addItem('oTitlePage', {"mustExist":true});
ActivInfinitev7.pSynthese.oDateEnd = ActivInfinitev7.pSynthese.addItem('oDateEnd', {"occurs":1});
ActivInfinitev7.pSynthese.oIndividualContract = ActivInfinitev7.pSynthese.addItem('oIndividualContract', {"occurs":1});
ActivInfinitev7.pSynthese.oTitlePage2 = ActivInfinitev7.pSynthese.addItem('oTitlePage2');

ActivInfinitev7.pContratIndivNonTrouv = ActivInfinitev7.addPage('pContratIndivNonTrouv', {"comment":"Contract indiv - not found - Activ Infinite - Module de gestion","path":"http://infinite-haum0a/mdg/contrat/ACIC.do?method=rechercher\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCO03STSO_74\u0026CONTAINER_NOM_FONCTION=ACIC_100\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pContratIndivNonTrouv.oIndividualContract = ActivInfinitev7.pContratIndivNonTrouv.addItem('oIndividualContract', {"mustExist":true});
ActivInfinitev7.pContratIndivNonTrouv.btSearch = ActivInfinitev7.pContratIndivNonTrouv.addItem('btSearch', {"mustExist":true});
ActivInfinitev7.pContratIndivNonTrouv.btClose = ActivInfinitev7.pContratIndivNonTrouv.addItem('btClose');
ActivInfinitev7.pContratIndivNonTrouv.btCloseError = ActivInfinitev7.pContratIndivNonTrouv.addItem('btCloseError');
ActivInfinitev7.pContratIndivNonTrouv.oDIVError = ActivInfinitev7.pContratIndivNonTrouv.addItem('oDIVError', {"mustExist":true});

ActivInfinitev7.pRecherContratIndiv = ActivInfinitev7.addPage('pRecherContratIndiv', {"comment":"Sans effet - Changement couverture - haum04 - Activ Infinite - Module de gestion","path":"http://infinite-haum04/mdg/Go.do?id=ACCC04STD"});
ActivInfinitev7.pRecherContratIndiv.oIndividualContract = ActivInfinitev7.pRecherContratIndiv.addItem('oIndividualContract', {"mustExist":true});
ActivInfinitev7.pRecherContratIndiv.oDateContract = ActivInfinitev7.pRecherContratIndiv.addItem('oDateContract');
ActivInfinitev7.pRecherContratIndiv.btNext = ActivInfinitev7.pRecherContratIndiv.addItem('btNext', {"mustNotExist":true});
ActivInfinitev7.pRecherContratIndiv.btSearch = ActivInfinitev7.pRecherContratIndiv.addItem('btSearch', {"mustExist":true});
ActivInfinitev7.pRecherContratIndiv.btClose = ActivInfinitev7.pRecherContratIndiv.addItem('btClose');

ActivInfinitev7.pContratTrouve = ActivInfinitev7.addPage('pContratTrouve', {"comment":"Sans effet - Changement couverture - N°03043298 - Valide - Adhérent : Madame JEANNE FRANCOISE - haum04 - Activ Infinite - Module de gestion","path":"http://infinite-haum04/mdg/contrat/ACIC.do?method=rechercher\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCC04STD_9\u0026CONTAINER_NOM_FONCTION=ACIC_100\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pContratTrouve.btNext = ActivInfinitev7.pContratTrouve.addItem('btNext');
ActivInfinitev7.pContratTrouve.btNavigateBlockNote = ActivInfinitev7.pContratTrouve.addItem('btNavigateBlockNote');
ActivInfinitev7.pContratTrouve.btClose = ActivInfinitev7.pContratTrouve.addItem('btClose');
ActivInfinitev7.pContratTrouve.btSearch = ActivInfinitev7.pContratTrouve.addItem('btSearch', {"mustExist":true});
ActivInfinitev7.pContratTrouve.btNavigateInsuredIden = ActivInfinitev7.pContratTrouve.addItem('btNavigateInsuredIden');
ActivInfinitev7.pContratTrouve.oDemandDate = ActivInfinitev7.pContratTrouve.addItem('oDemandDate');

ActivInfinitev7.pBlockNotes = ActivInfinitev7.addPage('pBlockNotes', {"comment":"Consultation - N°21998269 - Résilié - Adhérent : Madame RUIZ SANDRINE - haum0a - Activ Infinite - Module de gestion","path":"http://infinite-haum0a/mdg/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCO03STSO_25\u0026CONTAINER_NOM_FONCTION=ACBN_102\u0026AFFICHAGE_CONTAINER=OK\u0026CONTAINER_FONCTION_FORCAGE_VALIDATION=FALSE\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCO03STSO_25\u0026CONTAINER_NOM_FONCTION=ACIC_100\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pBlockNotes.oContentBlockNote = ActivInfinitev7.pBlockNotes.addItem('oContentBlockNote');
ActivInfinitev7.pBlockNotes.oTitlePage = ActivInfinitev7.pBlockNotes.addItem('oTitlePage', {"mustExist":true});
ActivInfinitev7.pBlockNotes.btInsuredIdentPage = ActivInfinitev7.pBlockNotes.addItem('btInsuredIdentPage');
ActivInfinitev7.pBlockNotes.btNext = ActivInfinitev7.pBlockNotes.addItem('btNext');
ActivInfinitev7.pBlockNotes.btClose = ActivInfinitev7.pBlockNotes.addItem('btClose');

ActivInfinitev7.pIdentAssures = ActivInfinitev7.addPage('pIdentAssures', {"comment":"Consultation - N°00293756 - Résilié - Adhérent : Monsieur CALVEZ DANIEL - haum0a - Activ Infinite - Module de gestion","path":"http://infinite-haum0a/mdg/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCO03STSO_6\u0026CONTAINER_NOM_FONCTION=ACIA_400\u0026AFFICHAGE_CONTAINER=OK\u0026CONTAINER_FONCTION_FORCAGE_VALIDATION=FALSE\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCO03STSO_6\u0026CONTAINER_NOM_FONCTION=ACIC_100\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pIdentAssures.btHelpCSCertificate = ActivInfinitev7.pIdentAssures.addItem('btHelpCSCertificate');
ActivInfinitev7.pIdentAssures.oTitlePage = ActivInfinitev7.pIdentAssures.addItem('oTitlePage', {"mustExist":true});
ActivInfinitev7.pIdentAssures.btInfoRo = ActivInfinitev7.pIdentAssures.addItem('btInfoRo');
ActivInfinitev7.pIdentAssures.btClose = ActivInfinitev7.pIdentAssures.addItem('btClose');
ActivInfinitev7.pIdentAssures.oInsuredROCheck = ActivInfinitev7.pIdentAssures.addItem('oInsuredROCheck');
ActivInfinitev7.pIdentAssures.oEntitleROCheck = ActivInfinitev7.pIdentAssures.addItem('oEntitleROCheck');
ActivInfinitev7.pIdentAssures.btNext = ActivInfinitev7.pIdentAssures.addItem('btNext', {"mustExist":true});

ActivInfinitev7.pEditIdentAssures = ActivInfinitev7.addPage('pEditIdentAssures', {"comment":"Consultation - N°00293756 - Résilié - Adhérent : Monsieur CALVEZ DANIEL - haum0a - Activ Infinite - Module de gestion","path":"http://infinite-haum0a/mdg/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCO03STSO_6\u0026CONTAINER_NOM_FONCTION=ACIA_400\u0026AFFICHAGE_CONTAINER=OK\u0026CONTAINER_FONCTION_FORCAGE_VALIDATION=FALSE\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCO03STSO_6\u0026CONTAINER_NOM_FONCTION=ACIC_100\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pEditIdentAssures.oTitlePage = ActivInfinitev7.pEditIdentAssures.addItem('oTitlePage', {"mustExist":true});
ActivInfinitev7.pEditIdentAssures.btClose = ActivInfinitev7.pEditIdentAssures.addItem('btClose');
ActivInfinitev7.pEditIdentAssures.oInsuredROCheck = ActivInfinitev7.pEditIdentAssures.addItem('oInsuredROCheck');
ActivInfinitev7.pEditIdentAssures.oEntitleROCheck = ActivInfinitev7.pEditIdentAssures.addItem('oEntitleROCheck');
ActivInfinitev7.pEditIdentAssures.oRankBirthday = ActivInfinitev7.pEditIdentAssures.addItem('oRankBirthday');
ActivInfinitev7.pEditIdentAssures.oNumberRO = ActivInfinitev7.pEditIdentAssures.addItem('oNumberRO');
ActivInfinitev7.pEditIdentAssures.oKeyRO = ActivInfinitev7.pEditIdentAssures.addItem('oKeyRO');
ActivInfinitev7.pEditIdentAssures.oFamilySite = ActivInfinitev7.pEditIdentAssures.addItem('oFamilySite');
ActivInfinitev7.pEditIdentAssures.oMaidenName = ActivInfinitev7.pEditIdentAssures.addItem('oMaidenName');
ActivInfinitev7.pEditIdentAssures.oInsuredType = ActivInfinitev7.pEditIdentAssures.addItem('oInsuredType');
ActivInfinitev7.pEditIdentAssures.oSexe = ActivInfinitev7.pEditIdentAssures.addItem('oSexe');
ActivInfinitev7.pEditIdentAssures.oBirthday = ActivInfinitev7.pEditIdentAssures.addItem('oBirthday');
ActivInfinitev7.pEditIdentAssures.oSocialCategorie = ActivInfinitev7.pEditIdentAssures.addItem('oSocialCategorie');
ActivInfinitev7.pEditIdentAssures.oCheckTeletrans = ActivInfinitev7.pEditIdentAssures.addItem('oCheckTeletrans');
ActivInfinitev7.pEditIdentAssures.btValid = ActivInfinitev7.pEditIdentAssures.addItem('btValid', {"mustExist":true});

ActivInfinitev7.pAttestationsAssures = ActivInfinitev7.addPage('pAttestationsAssures', {"comment":"Consultation - Adhérent : Monsieur CHARLOT GUY - haum0a - Activ Infinite - Module de gestion","path":"http://infinite-haum0a/mdg/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCO03STSO_1\u0026CONTAINER_NOM_FONCTION=ACAC_403\u0026AFFICHAGE_CONTAINER=OK\u0026CONTAINER_FONCTION_FORCAGE_VALIDATION=FALSE\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCO03STSO_1\u0026CONTAINER_NOM_FONCTION=ACIA_400\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pAttestationsAssures.oType = ActivInfinitev7.pAttestationsAssures.addItem('oType', {"occurs":1});
ActivInfinitev7.pAttestationsAssures.oStartDate = ActivInfinitev7.pAttestationsAssures.addItem('oStartDate', {"occurs":1});
ActivInfinitev7.pAttestationsAssures.oEndDate = ActivInfinitev7.pAttestationsAssures.addItem('oEndDate', {"occurs":1});
ActivInfinitev7.pAttestationsAssures.oTitlePage = ActivInfinitev7.pAttestationsAssures.addItem('oTitlePage', {"mustExist":true});
ActivInfinitev7.pAttestationsAssures.btVisuCotisation = ActivInfinitev7.pAttestationsAssures.addItem('btVisuCotisation');
ActivInfinitev7.pAttestationsAssures.btClose = ActivInfinitev7.pAttestationsAssures.addItem('btClose');

ActivInfinitev7.pListeProduits = ActivInfinitev7.addPage('pListeProduits', {"comment":"Consultation - N°00248886 - Valide - Adhérent : Monsieur GOURIO LOIC - haum0a - Activ Infinite - Module de gestion","path":"http://infinite-haum0a/mdg/contrat/ACG2.do?method=doSelectionAssure\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCO03STSO_17\u0026CONTAINER_NOM_FONCTION=ACG2\u0026AFFICHAGE_CONTAINER\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCO03STSO_17\u0026CONTAINER_NOM_FONCTION=ACG2_500\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pListeProduits.oTitlePage = ActivInfinitev7.pListeProduits.addItem('oTitlePage', {"mustExist":true});
ActivInfinitev7.pListeProduits.oInsuredList = ActivInfinitev7.pListeProduits.addItem('oInsuredList', {"occurs":1});
ActivInfinitev7.pListeProduits.oNameBenef = ActivInfinitev7.pListeProduits.addItem('oNameBenef', {"occurs":1});
ActivInfinitev7.pListeProduits.oTypeBenef = ActivInfinitev7.pListeProduits.addItem('oTypeBenef', {"occurs":1});
ActivInfinitev7.pListeProduits.oCodeProduct = ActivInfinitev7.pListeProduits.addItem('oCodeProduct', {"occurs":1});
ActivInfinitev7.pListeProduits.oEndDateProduct = ActivInfinitev7.pListeProduits.addItem('oEndDateProduct', {"occurs":1});
ActivInfinitev7.pListeProduits.oStateProduct = ActivInfinitev7.pListeProduits.addItem('oStateProduct', {"occurs":1});
ActivInfinitev7.pListeProduits.btVisuCotisation = ActivInfinitev7.pListeProduits.addItem('btVisuCotisation');
ActivInfinitev7.pListeProduits.oProductPaging = ActivInfinitev7.pListeProduits.addItem('oProductPaging');
ActivInfinitev7.pListeProduits.btUpdatePage = ActivInfinitev7.pListeProduits.addItem('btUpdatePage', {"mustExist":true});
ActivInfinitev7.pListeProduits.btClose = ActivInfinitev7.pListeProduits.addItem('btClose');
ActivInfinitev7.pListeProduits.btNext = ActivInfinitev7.pListeProduits.addItem('btNext');

ActivInfinitev7.pContribution = ActivInfinitev7.addPage('pContribution', {"comment":"Consultation - N°00248886 - Valide - Adhérent : Monsieur GOURIO LOIC - haum0a - Activ Infinite - Module de gestion","path":"http://infinite-haum0a/mdg/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCO03STSO_114\u0026CONTAINER_NOM_FONCTION=AC36_900\u0026AFFICHAGE_CONTAINER=OK\u0026CONTAINER_FONCTION_FORCAGE_VALIDATION=FALSE\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCO03STSO_114\u0026CONTAINER_NOM_FONCTION=AC3Q_800\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pContribution.oTitlePage = ActivInfinitev7.pContribution.addItem('oTitlePage', {"mustExist":true});
ActivInfinitev7.pContribution.oDateEch = ActivInfinitev7.pContribution.addItem('oDateEch', {"occurs":1});
ActivInfinitev7.pContribution.oBalanceEch = ActivInfinitev7.pContribution.addItem('oBalanceEch', {"occurs":1});
ActivInfinitev7.pContribution.btProductList = ActivInfinitev7.pContribution.addItem('btProductList');
ActivInfinitev7.pContribution.btClose = ActivInfinitev7.pContribution.addItem('btClose');

ActivInfinitev7.pMajProduits = ActivInfinitev7.addPage('pMajProduits', {"comment":"Sans effet - Changement couverture - N°03043298 - Valide - Adhérent : Madame JEANNE FRANCOISE - haum04 - Activ Infinite - Module de gestion","path":"http://infinite-haum04/mdg/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCC04STD_31\u0026CONTAINER_NOM_FONCTION=ACG2_200\u0026AFFICHAGE_CONTAINER=OK\u0026BOUTON_CONTAINER=BOUTON_SUIVANT\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCC04STD_31\u0026CONTAINER_NOM_FONCTION=ACIC_100\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pMajProduits.oTitlePage = ActivInfinitev7.pMajProduits.addItem('oTitlePage', {"mustExist":true});
ActivInfinitev7.pMajProduits.btUpdatePage = ActivInfinitev7.pMajProduits.addItem('btUpdatePage', {"mustExist":true});
ActivInfinitev7.pMajProduits.btNext = ActivInfinitev7.pMajProduits.addItem('btNext');
ActivInfinitev7.pMajProduits.btClose = ActivInfinitev7.pMajProduits.addItem('btClose');
ActivInfinitev7.pMajProduits.btUpdateProduct = ActivInfinitev7.pMajProduits.addItem('btUpdateProduct');
ActivInfinitev7.pMajProduits.btAddProduct = ActivInfinitev7.pMajProduits.addItem('btAddProduct');
ActivInfinitev7.pMajProduits.oInputNewCodeProduct = ActivInfinitev7.pMajProduits.addItem('oInputNewCodeProduct');
ActivInfinitev7.pMajProduits.oCodeProduct = ActivInfinitev7.pMajProduits.addItem('oCodeProduct', {"occurs":1});
ActivInfinitev7.pMajProduits.btSaveNewCodeProduct = ActivInfinitev7.pMajProduits.addItem('btSaveNewCodeProduct');
ActivInfinitev7.pMajProduits.btSaveUpdateProduct = ActivInfinitev7.pMajProduits.addItem('btSaveUpdateProduct');
ActivInfinitev7.pMajProduits.btNewProduct = ActivInfinitev7.pMajProduits.addItem('btNewProduct');
ActivInfinitev7.pMajProduits.oPopUpTitle = ActivInfinitev7.pMajProduits.addItem('oPopUpTitle');
ActivInfinitev7.pMajProduits.btBtnContinuer = ActivInfinitev7.pMajProduits.addItem('btBtnContinuer');

ActivInfinitev7.pParamDivers = ActivInfinitev7.addPage('pParamDivers', {"comment":"Sans effet - Changement couverture - N°03043298 - Valide - Adhérent : Madame JEANNE FRANCOISE - haum04 - Activ Infinite - Module de gestion","path":"http://infinite-haum04/mdg/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCC04STD_31\u0026CONTAINER_NOM_FONCTION=ACPD_300\u0026AFFICHAGE_CONTAINER=OK\u0026BOUTON_CONTAINER=BOUTON_SUIVANT\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCC04STD_31\u0026CONTAINER_NOM_FONCTION=ACG2_200\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pParamDivers.oTitlePage = ActivInfinitev7.pParamDivers.addItem('oTitlePage', {"mustExist":true});
ActivInfinitev7.pParamDivers.btNext = ActivInfinitev7.pParamDivers.addItem('btNext');
ActivInfinitev7.pParamDivers.btClose = ActivInfinitev7.pParamDivers.addItem('btClose');

ActivInfinitev7.pParamDeCalcul = ActivInfinitev7.addPage('pParamDeCalcul', {"comment":"Sans effet - Changement couverture - N°03043298 - Valide - Adhérent : Madame JEANNE FRANCOISE - haum04 - Activ Infinite - Module de gestion","path":"http://infinite-haum04/mdg/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCC04STD_31\u0026CONTAINER_NOM_FONCTION=AC32_400\u0026AFFICHAGE_CONTAINER=OK\u0026BOUTON_CONTAINER=BOUTON_SUIVANT\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCC04STD_31\u0026CONTAINER_NOM_FONCTION=ACPD_300\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pParamDeCalcul.oTitlePage = ActivInfinitev7.pParamDeCalcul.addItem('oTitlePage', {"mustExist":true});
ActivInfinitev7.pParamDeCalcul.btNext = ActivInfinitev7.pParamDeCalcul.addItem('btNext');
ActivInfinitev7.pParamDeCalcul.oCalculCheck = ActivInfinitev7.pParamDeCalcul.addItem('oCalculCheck');
ActivInfinitev7.pParamDeCalcul.btClose = ActivInfinitev7.pParamDeCalcul.addItem('btClose');
ActivInfinitev7.pParamDeCalcul.oIndividualContractNu = ActivInfinitev7.pParamDeCalcul.addItem('oIndividualContractNu');
ActivInfinitev7.pParamDeCalcul.oNoCalculStatic = ActivInfinitev7.pParamDeCalcul.addItem('oNoCalculStatic');
ActivInfinitev7.pParamDeCalcul.oCalculCotisNonAutorise = ActivInfinitev7.pParamDeCalcul.addItem('oCalculCotisNonAutorise');

ActivInfinitev7.pHistoContribution = ActivInfinitev7.addPage('pHistoContribution', {"comment":"Sans effet - Changement couverture - N°03043298 - Valide - Adhérent : Madame JEANNE FRANCOISE - haum04 - Activ Infinite - Module de gestion","path":"http://infinite-haum04/mdg/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCC04STD_32\u0026CONTAINER_NOM_FONCTION=AC3Q_500\u0026AFFICHAGE_CONTAINER=OK\u0026BOUTON_CONTAINER=BOUTON_SUIVANT\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCC04STD_32\u0026CONTAINER_NOM_FONCTION=AC32_400\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pHistoContribution.oTitlePage = ActivInfinitev7.pHistoContribution.addItem('oTitlePage', {"mustExist":true});
ActivInfinitev7.pHistoContribution.btNext = ActivInfinitev7.pHistoContribution.addItem('btNext');
ActivInfinitev7.pHistoContribution.btClose = ActivInfinitev7.pHistoContribution.addItem('btClose');

ActivInfinitev7.pVisuContribution = ActivInfinitev7.addPage('pVisuContribution', {"comment":"Sans effet - Changement couverture - N°03043298 - Valide - Adhérent : Madame JEANNE FRANCOISE - haum04 - Activ Infinite - Module de gestion","path":"http://infinite-haum04/mdg/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCC04STD_32\u0026CONTAINER_NOM_FONCTION=AC36_600\u0026AFFICHAGE_CONTAINER=OK\u0026BOUTON_CONTAINER=BOUTON_SUIVANT\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCC04STD_32\u0026CONTAINER_NOM_FONCTION=AC3Q_500\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pVisuContribution.oTitlePage = ActivInfinitev7.pVisuContribution.addItem('oTitlePage', {"mustExist":true});
ActivInfinitev7.pVisuContribution.oTitlePage2 = ActivInfinitev7.pVisuContribution.addItem('oTitlePage2', {"mustExist":true});
ActivInfinitev7.pVisuContribution.oValidation = ActivInfinitev7.pVisuContribution.addItem('oValidation', {"type":"Key"});
ActivInfinitev7.pVisuContribution.btNext = ActivInfinitev7.pVisuContribution.addItem('btNext');
ActivInfinitev7.pVisuContribution.btClose = ActivInfinitev7.pVisuContribution.addItem('btClose');

ActivInfinitev7.pSauvegardeMaj = ActivInfinitev7.addPage('pSauvegardeMaj', {"comment":"Sans effet - Changement couverture - N°03043298 - Valide - Adhérent : Madame JEANNE FRANCOISE - haum04 - Activ Infinite - Module de gestion","path":"http://infinite-haum04/mdg/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCC04STD_52\u0026CONTAINER_NOM_FONCTION=ACVV_700\u0026AFFICHAGE_CONTAINER=OK\u0026BOUTON_CONTAINER=BOUTON_SUIVANT\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCC04STD_52\u0026CONTAINER_NOM_FONCTION=AC36_600\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pSauvegardeMaj.oTitlePage = ActivInfinitev7.pSauvegardeMaj.addItem('oTitlePage', {"mustExist":true});
ActivInfinitev7.pSauvegardeMaj.btSave = ActivInfinitev7.pSauvegardeMaj.addItem('btSave', {"mustExist":true});
ActivInfinitev7.pSauvegardeMaj.btClose = ActivInfinitev7.pSauvegardeMaj.addItem('btClose');

ActivInfinitev7.pChangEtatProduit = ActivInfinitev7.addPage('pChangEtatProduit', {"comment":"Changement de couverture - N°00248886 - Valide - Adhérent : Monsieur GOURIO LOIC - haum04 - Activ Infinite - Module de gestion","path":"http://infinite-haum04/mdg/contrat/ACG2.do?method=doModifierCouverture\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCC01STD_67\u0026CONTAINER_NOM_FONCTION=ACG2\u0026AFFICHAGE_CONTAINER\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCC01STD_67\u0026CONTAINER_NOM_FONCTION=ACG2_300\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pChangEtatProduit.oStateProduct = ActivInfinitev7.pChangEtatProduit.addItem('oStateProduct', {"mustExist":true,"type":"Key"});
ActivInfinitev7.pChangEtatProduit.btSave = ActivInfinitev7.pChangEtatProduit.addItem('btSave', {"mustExist":true});
ActivInfinitev7.pChangEtatProduit.btClose = ActivInfinitev7.pChangEtatProduit.addItem('btClose');

ActivInfinitev7.pCouvertureImmedEche = ActivInfinitev7.addPage('pCouvertureImmedEche', {"comment":"Changement de couverture - N°00248886 - Valide - Adhérent : Monsieur GOURIO LOIC - haum04 - Activ Infinite - Module de gestion","path":"http://infinite-haum04/mdg/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCC01STD_14\u0026CONTAINER_NOM_FONCTION=AC3U_900\u0026AFFICHAGE_CONTAINER=OK\u0026BOUTON_CONTAINER=BOUTON_SUIVANT\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCC01STD_14\u0026CONTAINER_NOM_FONCTION=AC36_800\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pCouvertureImmedEche.oTitlePage = ActivInfinitev7.pCouvertureImmedEche.addItem('oTitlePage', {"mustExist":true});
ActivInfinitev7.pCouvertureImmedEche.oEditionSelect = ActivInfinitev7.pCouvertureImmedEche.addItem('oEditionSelect', {"mustExist":true,"type":"Key"});
ActivInfinitev7.pCouvertureImmedEche.btNext = ActivInfinitev7.pCouvertureImmedEche.addItem('btNext');
ActivInfinitev7.pCouvertureImmedEche.btClose = ActivInfinitev7.pCouvertureImmedEche.addItem('btClose');

ActivInfinitev7.pCouvertureImmediateC = ActivInfinitev7.addPage('pCouvertureImmediateC', {"comment":"Changement de couverture - N°00248886 - Valide - Adhérent : Monsieur GOURIO LOIC - haum04 - Activ Infinite - Module de gestion","path":"http://infinite-haum04/mdg/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCC01STD_14\u0026CONTAINER_NOM_FONCTION=ACEK_1000\u0026AFFICHAGE_CONTAINER=OK\u0026BOUTON_CONTAINER=BOUTON_SUIVANT\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCC01STD_14\u0026CONTAINER_NOM_FONCTION=AC3U_900\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pCouvertureImmediateC.oEditionCheck = ActivInfinitev7.pCouvertureImmediateC.addItem('oEditionCheck', {"mustExist":true});
ActivInfinitev7.pCouvertureImmediateC.oNoEdit = ActivInfinitev7.pCouvertureImmediateC.addItem('oNoEdit', {"mustExist":true});
ActivInfinitev7.pCouvertureImmediateC.oTitlePage = ActivInfinitev7.pCouvertureImmediateC.addItem('oTitlePage', {"mustExist":true});
ActivInfinitev7.pCouvertureImmediateC.btNext = ActivInfinitev7.pCouvertureImmediateC.addItem('btNext');
ActivInfinitev7.pCouvertureImmediateC.btClose = ActivInfinitev7.pCouvertureImmediateC.addItem('btClose');

ActivInfinitev7.pEditInfoRo = ActivInfinitev7.addPage('pEditInfoRo', {"comment":"Changement situation particulière - N°00502420 - Valide - Adhérent : Mademoiselle DESILE MONIQUE - haum0a - Activ Infinite - Module de gestion","path":"http://infinite-haum0a/mdg/contrat/ACRO.do?method=modifierAssures\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACMA01MASP_160\u0026CONTAINER_NOM_FONCTION=ACRO_400\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pEditInfoRo.btCreateSituation = ActivInfinitev7.pEditInfoRo.addItem('btCreateSituation');
ActivInfinitev7.pEditInfoRo.btValidate = ActivInfinitev7.pEditInfoRo.addItem('btValidate');
ActivInfinitev7.pEditInfoRo.oCodeSitPart0 = ActivInfinitev7.pEditInfoRo.addItem('oCodeSitPart0');
ActivInfinitev7.pEditInfoRo.btClose = ActivInfinitev7.pEditInfoRo.addItem('btClose');
ActivInfinitev7.pEditInfoRo.oNoSituation = ActivInfinitev7.pEditInfoRo.addItem('oNoSituation');
ActivInfinitev7.pEditInfoRo.btCancel = ActivInfinitev7.pEditInfoRo.addItem('btCancel');

ActivInfinitev7.pInfoRo = ActivInfinitev7.addPage('pInfoRo', {"comment":"Consultation - N°21309938 - Valide - Adhérent : Monsieur HASANI MENTOR - haum04 - Activ Infinite - Module de gestion","path":"http://infinite-haum04/mdg/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCO03STSO_1\u0026CONTAINER_NOM_FONCTION=ACRO_402\u0026AFFICHAGE_CONTAINER=OK\u0026CONTAINER_FONCTION_FORCAGE_VALIDATION=FALSE\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCO03STSO_1\u0026CONTAINER_NOM_FONCTION=ACIA_400\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pInfoRo.oTitlePage = ActivInfinitev7.pInfoRo.addItem('oTitlePage', {"mustExist":true});
ActivInfinitev7.pInfoRo.oTitlePage2 = ActivInfinitev7.pInfoRo.addItem('oTitlePage2');
ActivInfinitev7.pInfoRo.oTypeInsured = ActivInfinitev7.pInfoRo.addItem('oTypeInsured', {"occurs":1});
ActivInfinitev7.pInfoRo.oStateProduct = ActivInfinitev7.pInfoRo.addItem('oStateProduct', {"occurs":1});
ActivInfinitev7.pInfoRo.oRangeInsured = ActivInfinitev7.pInfoRo.addItem('oRangeInsured', {"occurs":1});
ActivInfinitev7.pInfoRo.oEndEffectProductDate = ActivInfinitev7.pInfoRo.addItem('oEndEffectProductDate', {"occurs":1});
ActivInfinitev7.pInfoRo.oCodeProduct = ActivInfinitev7.pInfoRo.addItem('oCodeProduct', {"occurs":1});
ActivInfinitev7.pInfoRo.btNavigateProductList = ActivInfinitev7.pInfoRo.addItem('btNavigateProductList');
ActivInfinitev7.pInfoRo.oInsuredList = ActivInfinitev7.pInfoRo.addItem('oInsuredList', {"occurs":1});
ActivInfinitev7.pInfoRo.btClose = ActivInfinitev7.pInfoRo.addItem('btClose');
ActivInfinitev7.pInfoRo.btEdit = ActivInfinitev7.pInfoRo.addItem('btEdit');
ActivInfinitev7.pInfoRo.btNext = ActivInfinitev7.pInfoRo.addItem('btNext');

ActivInfinitev7.pRecherContratAdhesio = ActivInfinitev7.addPage('pRecherContratAdhesio', {"comment":"Adhésions en collectif - haum04 - Activ Infinite - Module de gestion","path":"http://infinite-haum04/mdg/Go.do?id=ACSO01ASOB"});
ActivInfinitev7.pRecherContratAdhesio.oNumberContractCol = ActivInfinitev7.pRecherContratAdhesio.addItem('oNumberContractCol', {"mustExist":true});
ActivInfinitev7.pRecherContratAdhesio.oInsureGroup = ActivInfinitev7.pRecherContratAdhesio.addItem('oInsureGroup', {"mustExist":true});
ActivInfinitev7.pRecherContratAdhesio.oContractType = ActivInfinitev7.pRecherContratAdhesio.addItem('oContractType', {"mustExist":true});
ActivInfinitev7.pRecherContratAdhesio.btNext = ActivInfinitev7.pRecherContratAdhesio.addItem('btNext', {"mustNotExist":true});
ActivInfinitev7.pRecherContratAdhesio.btSearch = ActivInfinitev7.pRecherContratAdhesio.addItem('btSearch');
ActivInfinitev7.pRecherContratAdhesio.oStartDateEffect = ActivInfinitev7.pRecherContratAdhesio.addItem('oStartDateEffect', {"mustExist":true});
ActivInfinitev7.pRecherContratAdhesio.btClose = ActivInfinitev7.pRecherContratAdhesio.addItem('btClose');

ActivInfinitev7.pAdhesionRecherBenef = ActivInfinitev7.addPage('pAdhesionRecherBenef', {"comment":"Adhésions en collectif - N°22401301 - EN COURS - - VETIR ERAM ENSEMBLE DU PERSONNEL - haum04 - Activ Infinite - Module de gestion","path":"http://infinite-haum04/mdg/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACSO01ASOB_28\u0026CONTAINER_NOM_FONCTION=ACIN_200\u0026AFFICHAGE_CONTAINER=OK\u0026BOUTON_CONTAINER=BOUTON_SUIVANT\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACSO01ASOB_28\u0026CONTAINER_NOM_FONCTION=ACIC_100\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pAdhesionRecherBenef.oNumberINSEE = ActivInfinitev7.pAdhesionRecherBenef.addItem('oNumberINSEE');
ActivInfinitev7.pAdhesionRecherBenef.btSearch = ActivInfinitev7.pAdhesionRecherBenef.addItem('btSearch');
ActivInfinitev7.pAdhesionRecherBenef.oSearchValid = ActivInfinitev7.pAdhesionRecherBenef.addItem('oSearchValid');
ActivInfinitev7.pAdhesionRecherBenef.btValid = ActivInfinitev7.pAdhesionRecherBenef.addItem('btValid');
ActivInfinitev7.pAdhesionRecherBenef.btCancel = ActivInfinitev7.pAdhesionRecherBenef.addItem('btCancel');
ActivInfinitev7.pAdhesionRecherBenef.oResultNameBenef = ActivInfinitev7.pAdhesionRecherBenef.addItem('oResultNameBenef', {"occurs":1});
ActivInfinitev7.pAdhesionRecherBenef.oRowResultNameBenef = ActivInfinitev7.pAdhesionRecherBenef.addItem('oRowResultNameBenef', {"occurs":1});
ActivInfinitev7.pAdhesionRecherBenef.oTitlePage = ActivInfinitev7.pAdhesionRecherBenef.addItem('oTitlePage', {"mustExist":true});

ActivInfinitev7.pPrincipalAdhesionBen = ActivInfinitev7.addPage('pPrincipalAdhesionBen', {"comment":"Adhésions en collectif - N°22468406 - EN COURS - - VETIR ERAM ENSEMBLE DU PERSONNEL - haum0a - Activ Infinite - Module de gestion","path":"http://infinite-haum0a/mdg/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACSO01ASOB_18\u0026CONTAINER_NOM_FONCTION=ACIS_300\u0026AFFICHAGE_CONTAINER=OK\u0026BOUTON_CONTAINER=BOUTON_SUIVANT\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACSO01ASOB_18\u0026CONTAINER_NOM_FONCTION=ACIN_200\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pPrincipalAdhesionBen.oCivility = ActivInfinitev7.pPrincipalAdhesionBen.addItem('oCivility', {"mustExist":true});
ActivInfinitev7.pPrincipalAdhesionBen.oName = ActivInfinitev7.pPrincipalAdhesionBen.addItem('oName', {"mustExist":true});
ActivInfinitev7.pPrincipalAdhesionBen.oFirstname = ActivInfinitev7.pPrincipalAdhesionBen.addItem('oFirstname', {"mustExist":true});
ActivInfinitev7.pPrincipalAdhesionBen.oPostalCode = ActivInfinitev7.pPrincipalAdhesionBen.addItem('oPostalCode', {"mustExist":true});
ActivInfinitev7.pPrincipalAdhesionBen.oPostalCodeNoControl = ActivInfinitev7.pPrincipalAdhesionBen.addItem('oPostalCodeNoControl');
ActivInfinitev7.pPrincipalAdhesionBen.oAddress = ActivInfinitev7.pPrincipalAdhesionBen.addItem('oAddress');
ActivInfinitev7.pPrincipalAdhesionBen.oModePaymentPrestatio = ActivInfinitev7.pPrincipalAdhesionBen.addItem('oModePaymentPrestatio', {"mustExist":true,"type":"Key"});
ActivInfinitev7.pPrincipalAdhesionBen.oModePaymentContribut = ActivInfinitev7.pPrincipalAdhesionBen.addItem('oModePaymentContribut', {"mustExist":true,"type":"Key"});
ActivInfinitev7.pPrincipalAdhesionBen.oPaymentFrequency = ActivInfinitev7.pPrincipalAdhesionBen.addItem('oPaymentFrequency', {"mustExist":true,"type":"Key"});
ActivInfinitev7.pPrincipalAdhesionBen.oTermeType = ActivInfinitev7.pPrincipalAdhesionBen.addItem('oTermeType', {"mustExist":true,"type":"Key"});
ActivInfinitev7.pPrincipalAdhesionBen.oFrequencyEch = ActivInfinitev7.pPrincipalAdhesionBen.addItem('oFrequencyEch', {"mustExist":true,"type":"Key"});
ActivInfinitev7.pPrincipalAdhesionBen.btNext = ActivInfinitev7.pPrincipalAdhesionBen.addItem('btNext');
ActivInfinitev7.pPrincipalAdhesionBen.oLocality = ActivInfinitev7.pPrincipalAdhesionBen.addItem('oLocality');
ActivInfinitev7.pPrincipalAdhesionBen.oLocalityNoControl = ActivInfinitev7.pPrincipalAdhesionBen.addItem('oLocalityNoControl');
ActivInfinitev7.pPrincipalAdhesionBen.oAddressNumber = ActivInfinitev7.pPrincipalAdhesionBen.addItem('oAddressNumber');
ActivInfinitev7.pPrincipalAdhesionBen.oCountry = ActivInfinitev7.pPrincipalAdhesionBen.addItem('oCountry');
ActivInfinitev7.pPrincipalAdhesionBen.btClose = ActivInfinitev7.pPrincipalAdhesionBen.addItem('btClose');

ActivInfinitev7.pServerWebFerme = ActivInfinitev7.addPage('pServerWebFerme', {"comment":"Weblogic Bridge Message","path":"http://infinite-haum04/mdg/auth/login"});
ActivInfinitev7.pServerWebFerme.oFailureOfServerAPA = ActivInfinitev7.pServerWebFerme.addItem('oFailureOfServerAPA');
