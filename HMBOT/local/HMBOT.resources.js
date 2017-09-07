// Contextor Studio
// Auto-generated declaration file : do not modify !



var ActivInfinitev7 = ctx.addApplication('ActivInfinitev7', {"comment":"v7","nature":"WEB3","path":"http://infinite-haum0a/mdg/auth/Login.do"});

ActivInfinitev7.pConnexion = ActivInfinitev7.addPage('pConnexion', {"comment":"Activ Infinite - Module de gestion","path":"http://infinite-haum0a/mdg/auth/Login.do?logout"});
ActivInfinitev7.pConnexion.oIdentifiant = ActivInfinitev7.pConnexion.addItem('oIdentifiant', {"mustExist":true});
ActivInfinitev7.pConnexion.oPwd = ActivInfinitev7.pConnexion.addItem('oPwd');
ActivInfinitev7.pConnexion.btConnexion = ActivInfinitev7.pConnexion.addItem('btConnexion', {"mustExist":true});

ActivInfinitev7.pTabDeBord = ActivInfinitev7.addPage('pTabDeBord', {"comment":"haum0a - Activ Infinite - Module de gestion","path":"http://infinite-haum0a/mdg/"});
ActivInfinitev7.pTabDeBord.btMenuSynthese = ActivInfinitev7.pTabDeBord.addItem('btMenuSynthese', {"mustExist":true});
ActivInfinitev7.pTabDeBord.btContratIndiv = ActivInfinitev7.pTabDeBord.addItem('btContratIndiv');
ActivInfinitev7.pTabDeBord.btContexteContrat = ActivInfinitev7.pTabDeBord.addItem('btContexteContrat');
ActivInfinitev7.pTabDeBord.btMenuContratIndiv = ActivInfinitev7.pTabDeBord.addItem('btMenuContratIndiv');
ActivInfinitev7.pTabDeBord.btConsultation = ActivInfinitev7.pTabDeBord.addItem('btConsultation');
ActivInfinitev7.pTabDeBord.btMenuChangeCouver = ActivInfinitev7.pTabDeBord.addItem('btMenuChangeCouver');
ActivInfinitev7.pTabDeBord.btCangeCouverSTD = ActivInfinitev7.pTabDeBord.addItem('btCangeCouverSTD');
ActivInfinitev7.pTabDeBord.btSansEffetChangC = ActivInfinitev7.pTabDeBord.addItem('btSansEffetChangC');
ActivInfinitev7.pTabDeBord.btAdhesionCollect = ActivInfinitev7.pTabDeBord.addItem('btAdhesionCollect');
ActivInfinitev7.pTabDeBord.btSouscriptionSante = ActivInfinitev7.pTabDeBord.addItem('btSouscriptionSante');
ActivInfinitev7.pTabDeBord.btMenuResiCourante = ActivInfinitev7.pTabDeBord.addItem('btMenuResiCourante');
ActivInfinitev7.pTabDeBord.btFinCMU = ActivInfinitev7.pTabDeBord.addItem('btFinCMU');
ActivInfinitev7.pTabDeBord.btFinACS = ActivInfinitev7.pTabDeBord.addItem('btFinACS');
ActivInfinitev7.pTabDeBord.btSansEffetResiC = ActivInfinitev7.pTabDeBord.addItem('btSansEffetResiC');
ActivInfinitev7.pTabDeBord.btCagSituatPart = ActivInfinitev7.pTabDeBord.addItem('btCagSituatPart');

ActivInfinitev7.pRecherSynthese = ActivInfinitev7.addPage('pRecherSynthese', {"comment":"Contexte Contrat - haum0a - Activ Infinite - Module de gestion","path":"http://infinite-haum0a/mdg/Go.do?id=ACW1\u0026action=afficherContrat"});
ActivInfinitev7.pRecherSynthese.oTitrePage2 = ActivInfinitev7.pRecherSynthese.addItem('oTitrePage2', {"mustNotExist":true});
ActivInfinitev7.pRecherSynthese.btRecherche = ActivInfinitev7.pRecherSynthese.addItem('btRecherche');
ActivInfinitev7.pRecherSynthese.onIdentificationBenef = ActivInfinitev7.pRecherSynthese.addItem('onIdentificationBenef', {"mustExist":true});
ActivInfinitev7.pRecherSynthese.oTypeIdentification = ActivInfinitev7.pRecherSynthese.addItem('oTypeIdentification', {"mustExist":true});

ActivInfinitev7.pSynthese = ActivInfinitev7.addPage('pSynthese', {"comment":"Contexte Contrat - haum0a - Activ Infinite - Module de gestion","path":"http://infinite-haum0a/mdg/AccueilMenu.do?method=rechercher"});
ActivInfinitev7.pSynthese.oTitrePage = ActivInfinitev7.pSynthese.addItem('oTitrePage', {"mustExist":true});
ActivInfinitev7.pSynthese.oDateFinEffet = ActivInfinitev7.pSynthese.addItem('oDateFinEffet', {"occurs":1});
ActivInfinitev7.pSynthese.oContratIndiv = ActivInfinitev7.pSynthese.addItem('oContratIndiv', {"occurs":1});
ActivInfinitev7.pSynthese.oTitrePage2 = ActivInfinitev7.pSynthese.addItem('oTitrePage2');

ActivInfinitev7.pContratIndivNonTrouv = ActivInfinitev7.addPage('pContratIndivNonTrouv', {"comment":"Contract indiv - not found - Activ Infinite - Module de gestion","path":"http://infinite-haum0a/mdg/contrat/ACIC.do?method=rechercher\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCO03STSO_74\u0026CONTAINER_NOM_FONCTION=ACIC_100\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pContratIndivNonTrouv.oContratIndiv = ActivInfinitev7.pContratIndivNonTrouv.addItem('oContratIndiv', {"mustExist":true});
ActivInfinitev7.pContratIndivNonTrouv.btRecherche = ActivInfinitev7.pContratIndivNonTrouv.addItem('btRecherche', {"mustExist":true});
ActivInfinitev7.pContratIndivNonTrouv.btFermeture = ActivInfinitev7.pContratIndivNonTrouv.addItem('btFermeture');
ActivInfinitev7.pContratIndivNonTrouv.btFermAvecErreur = ActivInfinitev7.pContratIndivNonTrouv.addItem('btFermAvecErreur');
ActivInfinitev7.pContratIndivNonTrouv.oDIVErreur = ActivInfinitev7.pContratIndivNonTrouv.addItem('oDIVErreur', {"mustExist":true});

ActivInfinitev7.pRecherContratIndiv = ActivInfinitev7.addPage('pRecherContratIndiv', {"comment":"Sans effet - Changement couverture - haum04 - Activ Infinite - Module de gestion","path":"http://infinite-haum04/mdg/Go.do?id=ACCC04STD"});
ActivInfinitev7.pRecherContratIndiv.oContratIndiv = ActivInfinitev7.pRecherContratIndiv.addItem('oContratIndiv', {"mustExist":true});
ActivInfinitev7.pRecherContratIndiv.oDateDebEffet = ActivInfinitev7.pRecherContratIndiv.addItem('oDateDebEffet');
ActivInfinitev7.pRecherContratIndiv.btSuivant = ActivInfinitev7.pRecherContratIndiv.addItem('btSuivant', {"mustNotExist":true});
ActivInfinitev7.pRecherContratIndiv.btRecherche = ActivInfinitev7.pRecherContratIndiv.addItem('btRecherche', {"mustExist":true});
ActivInfinitev7.pRecherContratIndiv.btFermeture = ActivInfinitev7.pRecherContratIndiv.addItem('btFermeture');

ActivInfinitev7.pContratTrouve = ActivInfinitev7.addPage('pContratTrouve', {"comment":"Sans effet - Changement couverture - N°03043298 - Valide - Adhérent : Madame JEANNE FRANCOISE - haum04 - Activ Infinite - Module de gestion","path":"http://infinite-haum04/mdg/contrat/ACIC.do?method=rechercher\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCC04STD_9\u0026CONTAINER_NOM_FONCTION=ACIC_100\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pContratTrouve.btSuivant = ActivInfinitev7.pContratTrouve.addItem('btSuivant');
ActivInfinitev7.pContratTrouve.btNavigBlockNote = ActivInfinitev7.pContratTrouve.addItem('btNavigBlockNote');
ActivInfinitev7.pContratTrouve.btFermeture = ActivInfinitev7.pContratTrouve.addItem('btFermeture');
ActivInfinitev7.pContratTrouve.btRecherche = ActivInfinitev7.pContratTrouve.addItem('btRecherche', {"mustExist":true});
ActivInfinitev7.pContratTrouve.btIdentAssures = ActivInfinitev7.pContratTrouve.addItem('btIdentAssures');
ActivInfinitev7.pContratTrouve.oDemandDate = ActivInfinitev7.pContratTrouve.addItem('oDemandDate');

ActivInfinitev7.pBlockNotes = ActivInfinitev7.addPage('pBlockNotes', {"comment":"Consultation - N°21998269 - Résilié - Adhérent : Madame RUIZ SANDRINE - haum0a - Activ Infinite - Module de gestion","path":"http://infinite-haum0a/mdg/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCO03STSO_25\u0026CONTAINER_NOM_FONCTION=ACBN_102\u0026AFFICHAGE_CONTAINER=OK\u0026CONTAINER_FONCTION_FORCAGE_VALIDATION=FALSE\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCO03STSO_25\u0026CONTAINER_NOM_FONCTION=ACIC_100\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pBlockNotes.oContenuBlockNote = ActivInfinitev7.pBlockNotes.addItem('oContenuBlockNote');
ActivInfinitev7.pBlockNotes.oTitrePage = ActivInfinitev7.pBlockNotes.addItem('oTitrePage', {"mustExist":true});
ActivInfinitev7.pBlockNotes.btIdentAssures = ActivInfinitev7.pBlockNotes.addItem('btIdentAssures');
ActivInfinitev7.pBlockNotes.btSuivant = ActivInfinitev7.pBlockNotes.addItem('btSuivant');
ActivInfinitev7.pBlockNotes.btFermeture = ActivInfinitev7.pBlockNotes.addItem('btFermeture');

ActivInfinitev7.pIdentAssures = ActivInfinitev7.addPage('pIdentAssures', {"comment":"Consultation - N°00293756 - Résilié - Adhérent : Monsieur CALVEZ DANIEL - haum0a - Activ Infinite - Module de gestion","path":"http://infinite-haum0a/mdg/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCO03STSO_6\u0026CONTAINER_NOM_FONCTION=ACIA_400\u0026AFFICHAGE_CONTAINER=OK\u0026CONTAINER_FONCTION_FORCAGE_VALIDATION=FALSE\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCO03STSO_6\u0026CONTAINER_NOM_FONCTION=ACIC_100\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pIdentAssures.btAttestAideCompl = ActivInfinitev7.pIdentAssures.addItem('btAttestAideCompl');
ActivInfinitev7.pIdentAssures.oTitrePage = ActivInfinitev7.pIdentAssures.addItem('oTitrePage', {"mustExist":true});
ActivInfinitev7.pIdentAssures.btInfoRo = ActivInfinitev7.pIdentAssures.addItem('btInfoRo');
ActivInfinitev7.pIdentAssures.btFermeture = ActivInfinitev7.pIdentAssures.addItem('btFermeture');
ActivInfinitev7.pIdentAssures.oAssureRO = ActivInfinitev7.pIdentAssures.addItem('oAssureRO');
ActivInfinitev7.pIdentAssures.oDroitROAdherent = ActivInfinitev7.pIdentAssures.addItem('oDroitROAdherent');
ActivInfinitev7.pIdentAssures.btSuivant = ActivInfinitev7.pIdentAssures.addItem('btSuivant', {"mustExist":true});

ActivInfinitev7.pEditIdentAssures = ActivInfinitev7.addPage('pEditIdentAssures', {"comment":"Consultation - N°00293756 - Résilié - Adhérent : Monsieur CALVEZ DANIEL - haum0a - Activ Infinite - Module de gestion","path":"http://infinite-haum0a/mdg/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCO03STSO_6\u0026CONTAINER_NOM_FONCTION=ACIA_400\u0026AFFICHAGE_CONTAINER=OK\u0026CONTAINER_FONCTION_FORCAGE_VALIDATION=FALSE\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCO03STSO_6\u0026CONTAINER_NOM_FONCTION=ACIC_100\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pEditIdentAssures.oTitrePage = ActivInfinitev7.pEditIdentAssures.addItem('oTitrePage', {"mustExist":true});
ActivInfinitev7.pEditIdentAssures.btFermeture = ActivInfinitev7.pEditIdentAssures.addItem('btFermeture');
ActivInfinitev7.pEditIdentAssures.oAssureRO = ActivInfinitev7.pEditIdentAssures.addItem('oAssureRO');
ActivInfinitev7.pEditIdentAssures.oDroitROAdherent = ActivInfinitev7.pEditIdentAssures.addItem('oDroitROAdherent');
ActivInfinitev7.pEditIdentAssures.oRgNaissance = ActivInfinitev7.pEditIdentAssures.addItem('oRgNaissance');
ActivInfinitev7.pEditIdentAssures.oNumRO = ActivInfinitev7.pEditIdentAssures.addItem('oNumRO');
ActivInfinitev7.pEditIdentAssures.oCleRO = ActivInfinitev7.pEditIdentAssures.addItem('oCleRO');
ActivInfinitev7.pEditIdentAssures.oSituationFamil = ActivInfinitev7.pEditIdentAssures.addItem('oSituationFamil');
ActivInfinitev7.pEditIdentAssures.oNomNaissance = ActivInfinitev7.pEditIdentAssures.addItem('oNomNaissance');
ActivInfinitev7.pEditIdentAssures.oTypeAssure = ActivInfinitev7.pEditIdentAssures.addItem('oTypeAssure');
ActivInfinitev7.pEditIdentAssures.oSexe = ActivInfinitev7.pEditIdentAssures.addItem('oSexe');
ActivInfinitev7.pEditIdentAssures.DateDeNaiss = ActivInfinitev7.pEditIdentAssures.addItem('DateDeNaiss');
ActivInfinitev7.pEditIdentAssures.oCategSociale = ActivInfinitev7.pEditIdentAssures.addItem('oCategSociale');
ActivInfinitev7.pEditIdentAssures.oTeletrans = ActivInfinitev7.pEditIdentAssures.addItem('oTeletrans');
ActivInfinitev7.pEditIdentAssures.btValider = ActivInfinitev7.pEditIdentAssures.addItem('btValider', {"mustExist":true});

ActivInfinitev7.pAttestationsAssures = ActivInfinitev7.addPage('pAttestationsAssures', {"comment":"Consultation - Adhérent : Monsieur CHARLOT GUY - haum0a - Activ Infinite - Module de gestion","path":"http://infinite-haum0a/mdg/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCO03STSO_1\u0026CONTAINER_NOM_FONCTION=ACAC_403\u0026AFFICHAGE_CONTAINER=OK\u0026CONTAINER_FONCTION_FORCAGE_VALIDATION=FALSE\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCO03STSO_1\u0026CONTAINER_NOM_FONCTION=ACIA_400\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pAttestationsAssures.oType = ActivInfinitev7.pAttestationsAssures.addItem('oType', {"occurs":1});
ActivInfinitev7.pAttestationsAssures.oDateDeb = ActivInfinitev7.pAttestationsAssures.addItem('oDateDeb', {"occurs":1});
ActivInfinitev7.pAttestationsAssures.oDateFin = ActivInfinitev7.pAttestationsAssures.addItem('oDateFin', {"occurs":1});
ActivInfinitev7.pAttestationsAssures.oTitrePage = ActivInfinitev7.pAttestationsAssures.addItem('oTitrePage', {"mustExist":true});
ActivInfinitev7.pAttestationsAssures.btVisuCotisation = ActivInfinitev7.pAttestationsAssures.addItem('btVisuCotisation');
ActivInfinitev7.pAttestationsAssures.btFermeture = ActivInfinitev7.pAttestationsAssures.addItem('btFermeture');

ActivInfinitev7.pListeProduits = ActivInfinitev7.addPage('pListeProduits', {"comment":"Consultation - N°00248886 - Valide - Adhérent : Monsieur GOURIO LOIC - haum0a - Activ Infinite - Module de gestion","path":"http://infinite-haum0a/mdg/contrat/ACG2.do?method=doSelectionAssure\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCO03STSO_17\u0026CONTAINER_NOM_FONCTION=ACG2\u0026AFFICHAGE_CONTAINER\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCO03STSO_17\u0026CONTAINER_NOM_FONCTION=ACG2_500\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pListeProduits.oTitrePage = ActivInfinitev7.pListeProduits.addItem('oTitrePage', {"mustExist":true});
ActivInfinitev7.pListeProduits.oListeAssures = ActivInfinitev7.pListeProduits.addItem('oListeAssures', {"occurs":1});
ActivInfinitev7.pListeProduits.oNomPrenomBenef = ActivInfinitev7.pListeProduits.addItem('oNomPrenomBenef', {"occurs":1});
ActivInfinitev7.pListeProduits.oTypeBenef = ActivInfinitev7.pListeProduits.addItem('oTypeBenef', {"occurs":1});
ActivInfinitev7.pListeProduits.oCodeProduit = ActivInfinitev7.pListeProduits.addItem('oCodeProduit', {"occurs":1});
ActivInfinitev7.pListeProduits.oDateRadProduit = ActivInfinitev7.pListeProduits.addItem('oDateRadProduit', {"occurs":1});
ActivInfinitev7.pListeProduits.oEtatProduit = ActivInfinitev7.pListeProduits.addItem('oEtatProduit', {"occurs":1});
ActivInfinitev7.pListeProduits.btVisuCotisation = ActivInfinitev7.pListeProduits.addItem('btVisuCotisation');
ActivInfinitev7.pListeProduits.oLongTableGaranties = ActivInfinitev7.pListeProduits.addItem('oLongTableGaranties');
ActivInfinitev7.pListeProduits.btMajPage = ActivInfinitev7.pListeProduits.addItem('btMajPage', {"mustExist":true});
ActivInfinitev7.pListeProduits.btFermeture = ActivInfinitev7.pListeProduits.addItem('btFermeture');
ActivInfinitev7.pListeProduits.btSuivant = ActivInfinitev7.pListeProduits.addItem('btSuivant');

ActivInfinitev7.pContribution = ActivInfinitev7.addPage('pContribution', {"comment":"Consultation - N°00248886 - Valide - Adhérent : Monsieur GOURIO LOIC - haum0a - Activ Infinite - Module de gestion","path":"http://infinite-haum0a/mdg/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCO03STSO_114\u0026CONTAINER_NOM_FONCTION=AC36_900\u0026AFFICHAGE_CONTAINER=OK\u0026CONTAINER_FONCTION_FORCAGE_VALIDATION=FALSE\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCO03STSO_114\u0026CONTAINER_NOM_FONCTION=AC3Q_800\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pContribution.oTitrePage = ActivInfinitev7.pContribution.addItem('oTitrePage', {"mustExist":true});
ActivInfinitev7.pContribution.oDateEch = ActivInfinitev7.pContribution.addItem('oDateEch', {"occurs":1});
ActivInfinitev7.pContribution.oSoldeCompt = ActivInfinitev7.pContribution.addItem('oSoldeCompt', {"occurs":1});
ActivInfinitev7.pContribution.oListeProduits = ActivInfinitev7.pContribution.addItem('oListeProduits');
ActivInfinitev7.pContribution.btFermeture = ActivInfinitev7.pContribution.addItem('btFermeture');

ActivInfinitev7.pMajProduits = ActivInfinitev7.addPage('pMajProduits', {"comment":"Sans effet - Changement couverture - N°03043298 - Valide - Adhérent : Madame JEANNE FRANCOISE - haum04 - Activ Infinite - Module de gestion","path":"http://infinite-haum04/mdg/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCC04STD_31\u0026CONTAINER_NOM_FONCTION=ACG2_200\u0026AFFICHAGE_CONTAINER=OK\u0026BOUTON_CONTAINER=BOUTON_SUIVANT\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCC04STD_31\u0026CONTAINER_NOM_FONCTION=ACIC_100\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pMajProduits.oTitrePage = ActivInfinitev7.pMajProduits.addItem('oTitrePage', {"mustExist":true});
ActivInfinitev7.pMajProduits.btMajPage = ActivInfinitev7.pMajProduits.addItem('btMajPage', {"mustExist":true});
ActivInfinitev7.pMajProduits.btSuivant = ActivInfinitev7.pMajProduits.addItem('btSuivant');
ActivInfinitev7.pMajProduits.btFermeture = ActivInfinitev7.pMajProduits.addItem('btFermeture');
ActivInfinitev7.pMajProduits.btMajProduit = ActivInfinitev7.pMajProduits.addItem('btMajProduit');
ActivInfinitev7.pMajProduits.btAjoutProduit = ActivInfinitev7.pMajProduits.addItem('btAjoutProduit');
ActivInfinitev7.pMajProduits.oNouvCodeProduit = ActivInfinitev7.pMajProduits.addItem('oNouvCodeProduit');
ActivInfinitev7.pMajProduits.oCodeProduit = ActivInfinitev7.pMajProduits.addItem('oCodeProduit', {"occurs":1});
ActivInfinitev7.pMajProduits.btSauvNouvCodeProd = ActivInfinitev7.pMajProduits.addItem('btSauvNouvCodeProd');
ActivInfinitev7.pMajProduits.btSauvMajProduit = ActivInfinitev7.pMajProduits.addItem('btSauvMajProduit');
ActivInfinitev7.pMajProduits.btNouvProduit = ActivInfinitev7.pMajProduits.addItem('btNouvProduit');
ActivInfinitev7.pMajProduits.oTitrePopUp = ActivInfinitev7.pMajProduits.addItem('oTitrePopUp');
ActivInfinitev7.pMajProduits.btContinuer = ActivInfinitev7.pMajProduits.addItem('btContinuer');

ActivInfinitev7.pParamDivers = ActivInfinitev7.addPage('pParamDivers', {"comment":"Sans effet - Changement couverture - N°03043298 - Valide - Adhérent : Madame JEANNE FRANCOISE - haum04 - Activ Infinite - Module de gestion","path":"http://infinite-haum04/mdg/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCC04STD_31\u0026CONTAINER_NOM_FONCTION=ACPD_300\u0026AFFICHAGE_CONTAINER=OK\u0026BOUTON_CONTAINER=BOUTON_SUIVANT\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCC04STD_31\u0026CONTAINER_NOM_FONCTION=ACG2_200\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pParamDivers.oTitrePage = ActivInfinitev7.pParamDivers.addItem('oTitrePage', {"mustExist":true});
ActivInfinitev7.pParamDivers.btSuivant = ActivInfinitev7.pParamDivers.addItem('btSuivant');
ActivInfinitev7.pParamDivers.btFermeture = ActivInfinitev7.pParamDivers.addItem('btFermeture');

ActivInfinitev7.pParamDeCalcul = ActivInfinitev7.addPage('pParamDeCalcul', {"comment":"Sans effet - Changement couverture - N°03043298 - Valide - Adhérent : Madame JEANNE FRANCOISE - haum04 - Activ Infinite - Module de gestion","path":"http://infinite-haum04/mdg/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCC04STD_31\u0026CONTAINER_NOM_FONCTION=AC32_400\u0026AFFICHAGE_CONTAINER=OK\u0026BOUTON_CONTAINER=BOUTON_SUIVANT\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCC04STD_31\u0026CONTAINER_NOM_FONCTION=ACPD_300\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pParamDeCalcul.oTitrePage = ActivInfinitev7.pParamDeCalcul.addItem('oTitrePage', {"mustExist":true});
ActivInfinitev7.pParamDeCalcul.btSuivant = ActivInfinitev7.pParamDeCalcul.addItem('btSuivant');
ActivInfinitev7.pParamDeCalcul.oPasDeCalcul = ActivInfinitev7.pParamDeCalcul.addItem('oPasDeCalcul');
ActivInfinitev7.pParamDeCalcul.btFermeture = ActivInfinitev7.pParamDeCalcul.addItem('btFermeture');
ActivInfinitev7.pParamDeCalcul.oContratIndiv = ActivInfinitev7.pParamDeCalcul.addItem('oContratIndiv');
ActivInfinitev7.pParamDeCalcul.oPasCalculStat = ActivInfinitev7.pParamDeCalcul.addItem('oPasCalculStat');
ActivInfinitev7.pParamDeCalcul.oCalculCotisNonAutori = ActivInfinitev7.pParamDeCalcul.addItem('oCalculCotisNonAutori');

ActivInfinitev7.pHistoContribution = ActivInfinitev7.addPage('pHistoContribution', {"comment":"Sans effet - Changement couverture - N°03043298 - Valide - Adhérent : Madame JEANNE FRANCOISE - haum04 - Activ Infinite - Module de gestion","path":"http://infinite-haum04/mdg/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCC04STD_32\u0026CONTAINER_NOM_FONCTION=AC3Q_500\u0026AFFICHAGE_CONTAINER=OK\u0026BOUTON_CONTAINER=BOUTON_SUIVANT\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCC04STD_32\u0026CONTAINER_NOM_FONCTION=AC32_400\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pHistoContribution.oTitrePage = ActivInfinitev7.pHistoContribution.addItem('oTitrePage', {"mustExist":true});
ActivInfinitev7.pHistoContribution.btSuivant = ActivInfinitev7.pHistoContribution.addItem('btSuivant');
ActivInfinitev7.pHistoContribution.btFermeture = ActivInfinitev7.pHistoContribution.addItem('btFermeture');

ActivInfinitev7.pVisuContribution = ActivInfinitev7.addPage('pVisuContribution', {"comment":"Sans effet - Changement couverture - N°03043298 - Valide - Adhérent : Madame JEANNE FRANCOISE - haum04 - Activ Infinite - Module de gestion","path":"http://infinite-haum04/mdg/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCC04STD_32\u0026CONTAINER_NOM_FONCTION=AC36_600\u0026AFFICHAGE_CONTAINER=OK\u0026BOUTON_CONTAINER=BOUTON_SUIVANT\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCC04STD_32\u0026CONTAINER_NOM_FONCTION=AC3Q_500\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pVisuContribution.oTitrePage = ActivInfinitev7.pVisuContribution.addItem('oTitrePage', {"mustExist":true});
ActivInfinitev7.pVisuContribution.oTitrePage2 = ActivInfinitev7.pVisuContribution.addItem('oTitrePage2', {"mustExist":true});
ActivInfinitev7.pVisuContribution.oValidation = ActivInfinitev7.pVisuContribution.addItem('oValidation', {"type":"Key"});
ActivInfinitev7.pVisuContribution.btSuivant = ActivInfinitev7.pVisuContribution.addItem('btSuivant');
ActivInfinitev7.pVisuContribution.btFermeture = ActivInfinitev7.pVisuContribution.addItem('btFermeture');

ActivInfinitev7.pSauvegardeMaj = ActivInfinitev7.addPage('pSauvegardeMaj', {"comment":"Sans effet - Changement couverture - N°03043298 - Valide - Adhérent : Madame JEANNE FRANCOISE - haum04 - Activ Infinite - Module de gestion","path":"http://infinite-haum04/mdg/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCC04STD_52\u0026CONTAINER_NOM_FONCTION=ACVV_700\u0026AFFICHAGE_CONTAINER=OK\u0026BOUTON_CONTAINER=BOUTON_SUIVANT\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCC04STD_52\u0026CONTAINER_NOM_FONCTION=AC36_600\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pSauvegardeMaj.oTitrePage = ActivInfinitev7.pSauvegardeMaj.addItem('oTitrePage', {"mustExist":true});
ActivInfinitev7.pSauvegardeMaj.btSauvegarde = ActivInfinitev7.pSauvegardeMaj.addItem('btSauvegarde', {"mustExist":true});
ActivInfinitev7.pSauvegardeMaj.btFermeture = ActivInfinitev7.pSauvegardeMaj.addItem('btFermeture');

ActivInfinitev7.pChangEtatProduit = ActivInfinitev7.addPage('pChangEtatProduit', {"comment":"Changement de couverture - N°00248886 - Valide - Adhérent : Monsieur GOURIO LOIC - haum04 - Activ Infinite - Module de gestion","path":"http://infinite-haum04/mdg/contrat/ACG2.do?method=doModifierCouverture\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCC01STD_67\u0026CONTAINER_NOM_FONCTION=ACG2\u0026AFFICHAGE_CONTAINER\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCC01STD_67\u0026CONTAINER_NOM_FONCTION=ACG2_300\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pChangEtatProduit.oEtatProduit = ActivInfinitev7.pChangEtatProduit.addItem('oEtatProduit', {"mustExist":true,"type":"Key"});
ActivInfinitev7.pChangEtatProduit.btSauvegarde = ActivInfinitev7.pChangEtatProduit.addItem('btSauvegarde', {"mustExist":true});
ActivInfinitev7.pChangEtatProduit.btFermeture = ActivInfinitev7.pChangEtatProduit.addItem('btFermeture');

ActivInfinitev7.pCouvertureImmedEche = ActivInfinitev7.addPage('pCouvertureImmedEche', {"comment":"Changement de couverture - N°00248886 - Valide - Adhérent : Monsieur GOURIO LOIC - haum04 - Activ Infinite - Module de gestion","path":"http://infinite-haum04/mdg/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCC01STD_14\u0026CONTAINER_NOM_FONCTION=AC3U_900\u0026AFFICHAGE_CONTAINER=OK\u0026BOUTON_CONTAINER=BOUTON_SUIVANT\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCC01STD_14\u0026CONTAINER_NOM_FONCTION=AC36_800\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pCouvertureImmedEche.oTitrePage = ActivInfinitev7.pCouvertureImmedEche.addItem('oTitrePage', {"mustExist":true});
ActivInfinitev7.pCouvertureImmedEche.oSelectEdition = ActivInfinitev7.pCouvertureImmedEche.addItem('oSelectEdition', {"mustExist":true,"type":"Key"});
ActivInfinitev7.pCouvertureImmedEche.btSuivant = ActivInfinitev7.pCouvertureImmedEche.addItem('btSuivant');
ActivInfinitev7.pCouvertureImmedEche.btFermeture = ActivInfinitev7.pCouvertureImmedEche.addItem('btFermeture');

ActivInfinitev7.pCouvertureImmediateC = ActivInfinitev7.addPage('pCouvertureImmediateC', {"comment":"Changement de couverture - N°00248886 - Valide - Adhérent : Monsieur GOURIO LOIC - haum04 - Activ Infinite - Module de gestion","path":"http://infinite-haum04/mdg/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCC01STD_14\u0026CONTAINER_NOM_FONCTION=ACEK_1000\u0026AFFICHAGE_CONTAINER=OK\u0026BOUTON_CONTAINER=BOUTON_SUIVANT\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCC01STD_14\u0026CONTAINER_NOM_FONCTION=AC3U_900\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pCouvertureImmediateC.oTypeEditionDiff = ActivInfinitev7.pCouvertureImmediateC.addItem('oTypeEditionDiff', {"mustExist":true});
ActivInfinitev7.pCouvertureImmediateC.oNonTypeEdition = ActivInfinitev7.pCouvertureImmediateC.addItem('oNonTypeEdition', {"mustExist":true});
ActivInfinitev7.pCouvertureImmediateC.oTitrePage = ActivInfinitev7.pCouvertureImmediateC.addItem('oTitrePage', {"mustExist":true});
ActivInfinitev7.pCouvertureImmediateC.btSuivant = ActivInfinitev7.pCouvertureImmediateC.addItem('btSuivant');
ActivInfinitev7.pCouvertureImmediateC.btFermeture = ActivInfinitev7.pCouvertureImmediateC.addItem('btFermeture');

ActivInfinitev7.pEditInfoRo = ActivInfinitev7.addPage('pEditInfoRo', {"comment":"Changement situation particulière - N°00502420 - Valide - Adhérent : Mademoiselle DESILE MONIQUE - haum0a - Activ Infinite - Module de gestion","path":"http://infinite-haum0a/mdg/contrat/ACRO.do?method=modifierAssures\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACMA01MASP_160\u0026CONTAINER_NOM_FONCTION=ACRO_400\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pEditInfoRo.btCreationNouvSituati = ActivInfinitev7.pEditInfoRo.addItem('btCreationNouvSituati');
ActivInfinitev7.pEditInfoRo.btValider = ActivInfinitev7.pEditInfoRo.addItem('btValider');
ActivInfinitev7.pEditInfoRo.oCodeSitPart0 = ActivInfinitev7.pEditInfoRo.addItem('oCodeSitPart0');
ActivInfinitev7.pEditInfoRo.btFermeture = ActivInfinitev7.pEditInfoRo.addItem('btFermeture');
ActivInfinitev7.pEditInfoRo.oSituationParti = ActivInfinitev7.pEditInfoRo.addItem('oSituationParti');
ActivInfinitev7.pEditInfoRo.btAnnuler = ActivInfinitev7.pEditInfoRo.addItem('btAnnuler');

ActivInfinitev7.pInfoRo = ActivInfinitev7.addPage('pInfoRo', {"comment":"Consultation - N°21309938 - Valide - Adhérent : Monsieur HASANI MENTOR - haum04 - Activ Infinite - Module de gestion","path":"http://infinite-haum04/mdg/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCO03STSO_1\u0026CONTAINER_NOM_FONCTION=ACRO_402\u0026AFFICHAGE_CONTAINER=OK\u0026CONTAINER_FONCTION_FORCAGE_VALIDATION=FALSE\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCO03STSO_1\u0026CONTAINER_NOM_FONCTION=ACIA_400\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pInfoRo.oTitrePage = ActivInfinitev7.pInfoRo.addItem('oTitrePage', {"mustExist":true});
ActivInfinitev7.pInfoRo.oTitrePage2 = ActivInfinitev7.pInfoRo.addItem('oTitrePage2');
ActivInfinitev7.pInfoRo.oTypeAssure = ActivInfinitev7.pInfoRo.addItem('oTypeAssure', {"occurs":1});
ActivInfinitev7.pInfoRo.oEtatProduit = ActivInfinitev7.pInfoRo.addItem('oEtatProduit', {"occurs":1});
ActivInfinitev7.pInfoRo.oRangeAssure = ActivInfinitev7.pInfoRo.addItem('oRangeAssure', {"occurs":1});
ActivInfinitev7.pInfoRo.oDateFinEffetProduit = ActivInfinitev7.pInfoRo.addItem('oDateFinEffetProduit', {"occurs":1});
ActivInfinitev7.pInfoRo.oCodeProduit = ActivInfinitev7.pInfoRo.addItem('oCodeProduit', {"occurs":1});
ActivInfinitev7.pInfoRo.btNavigListeProduits = ActivInfinitev7.pInfoRo.addItem('btNavigListeProduits');
ActivInfinitev7.pInfoRo.oListeAssures = ActivInfinitev7.pInfoRo.addItem('oListeAssures', {"occurs":1});
ActivInfinitev7.pInfoRo.btFermeture = ActivInfinitev7.pInfoRo.addItem('btFermeture');
ActivInfinitev7.pInfoRo.btModifListeAssures = ActivInfinitev7.pInfoRo.addItem('btModifListeAssures');
ActivInfinitev7.pInfoRo.btSuivant = ActivInfinitev7.pInfoRo.addItem('btSuivant');

ActivInfinitev7.pRecherContratAdhesio = ActivInfinitev7.addPage('pRecherContratAdhesio', {"comment":"Adhésions en collectif - haum04 - Activ Infinite - Module de gestion","path":"http://infinite-haum04/mdg/Go.do?id=ACSO01ASOB"});
ActivInfinitev7.pRecherContratAdhesio.oNumContratCollec = ActivInfinitev7.pRecherContratAdhesio.addItem('oNumContratCollec', {"mustExist":true});
ActivInfinitev7.pRecherContratAdhesio.oGroupAssures = ActivInfinitev7.pRecherContratAdhesio.addItem('oGroupAssures', {"mustExist":true});
ActivInfinitev7.pRecherContratAdhesio.oTypeContrat = ActivInfinitev7.pRecherContratAdhesio.addItem('oTypeContrat', {"mustExist":true});
ActivInfinitev7.pRecherContratAdhesio.btSuivant = ActivInfinitev7.pRecherContratAdhesio.addItem('btSuivant', {"mustNotExist":true});
ActivInfinitev7.pRecherContratAdhesio.btRecherche = ActivInfinitev7.pRecherContratAdhesio.addItem('btRecherche');
ActivInfinitev7.pRecherContratAdhesio.oDateDebEffet = ActivInfinitev7.pRecherContratAdhesio.addItem('oDateDebEffet', {"mustExist":true});
ActivInfinitev7.pRecherContratAdhesio.btFermeture = ActivInfinitev7.pRecherContratAdhesio.addItem('btFermeture');

ActivInfinitev7.pAdhesionRecherBenef = ActivInfinitev7.addPage('pAdhesionRecherBenef', {"comment":"Adhésions en collectif - N°22401301 - EN COURS - - VETIR ERAM ENSEMBLE DU PERSONNEL - haum04 - Activ Infinite - Module de gestion","path":"http://infinite-haum04/mdg/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACSO01ASOB_28\u0026CONTAINER_NOM_FONCTION=ACIN_200\u0026AFFICHAGE_CONTAINER=OK\u0026BOUTON_CONTAINER=BOUTON_SUIVANT\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACSO01ASOB_28\u0026CONTAINER_NOM_FONCTION=ACIC_100\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pAdhesionRecherBenef.oNumINSEE = ActivInfinitev7.pAdhesionRecherBenef.addItem('oNumINSEE');
ActivInfinitev7.pAdhesionRecherBenef.btRecherche = ActivInfinitev7.pAdhesionRecherBenef.addItem('btRecherche');
ActivInfinitev7.pAdhesionRecherBenef.oResParPersonne = ActivInfinitev7.pAdhesionRecherBenef.addItem('oResParPersonne');
ActivInfinitev7.pAdhesionRecherBenef.btValider = ActivInfinitev7.pAdhesionRecherBenef.addItem('btValider');
ActivInfinitev7.pAdhesionRecherBenef.btAnnuler = ActivInfinitev7.pAdhesionRecherBenef.addItem('btAnnuler');
ActivInfinitev7.pAdhesionRecherBenef.oResNomBenef = ActivInfinitev7.pAdhesionRecherBenef.addItem('oResNomBenef', {"occurs":1});
ActivInfinitev7.pAdhesionRecherBenef.oLigneResNomBenef = ActivInfinitev7.pAdhesionRecherBenef.addItem('oLigneResNomBenef', {"occurs":1});
ActivInfinitev7.pAdhesionRecherBenef.oTitrePage = ActivInfinitev7.pAdhesionRecherBenef.addItem('oTitrePage', {"mustExist":true});

ActivInfinitev7.pPrincipalAdhesionBen = ActivInfinitev7.addPage('pPrincipalAdhesionBen', {"comment":"Adhésions en collectif - N°22468406 - EN COURS - - VETIR ERAM ENSEMBLE DU PERSONNEL - haum0a - Activ Infinite - Module de gestion","path":"http://infinite-haum0a/mdg/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACSO01ASOB_18\u0026CONTAINER_NOM_FONCTION=ACIS_300\u0026AFFICHAGE_CONTAINER=OK\u0026BOUTON_CONTAINER=BOUTON_SUIVANT\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACSO01ASOB_18\u0026CONTAINER_NOM_FONCTION=ACIN_200\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pPrincipalAdhesionBen.oCivilite = ActivInfinitev7.pPrincipalAdhesionBen.addItem('oCivilite', {"mustExist":true});
ActivInfinitev7.pPrincipalAdhesionBen.oNom = ActivInfinitev7.pPrincipalAdhesionBen.addItem('oNom', {"mustExist":true});
ActivInfinitev7.pPrincipalAdhesionBen.oPrenom = ActivInfinitev7.pPrincipalAdhesionBen.addItem('oPrenom', {"mustExist":true});
ActivInfinitev7.pPrincipalAdhesionBen.oCodePostal = ActivInfinitev7.pPrincipalAdhesionBen.addItem('oCodePostal', {"mustExist":true});
ActivInfinitev7.pPrincipalAdhesionBen.oCodePostalAdresse = ActivInfinitev7.pPrincipalAdhesionBen.addItem('oCodePostalAdresse');
ActivInfinitev7.pPrincipalAdhesionBen.oAdresse = ActivInfinitev7.pPrincipalAdhesionBen.addItem('oAdresse');
ActivInfinitev7.pPrincipalAdhesionBen.oModePaiementPrest = ActivInfinitev7.pPrincipalAdhesionBen.addItem('oModePaiementPrest', {"mustExist":true,"type":"Key"});
ActivInfinitev7.pPrincipalAdhesionBen.oModeReglmetCotis = ActivInfinitev7.pPrincipalAdhesionBen.addItem('oModeReglmetCotis', {"mustExist":true,"type":"Key"});
ActivInfinitev7.pPrincipalAdhesionBen.oFrequenceDeregl = ActivInfinitev7.pPrincipalAdhesionBen.addItem('oFrequenceDeregl', {"mustExist":true,"type":"Key"});
ActivInfinitev7.pPrincipalAdhesionBen.oTypeTerme = ActivInfinitev7.pPrincipalAdhesionBen.addItem('oTypeTerme', {"mustExist":true,"type":"Key"});
ActivInfinitev7.pPrincipalAdhesionBen.oFrequenceAvisEch = ActivInfinitev7.pPrincipalAdhesionBen.addItem('oFrequenceAvisEch', {"mustExist":true,"type":"Key"});
ActivInfinitev7.pPrincipalAdhesionBen.btSuivant = ActivInfinitev7.pPrincipalAdhesionBen.addItem('btSuivant');
ActivInfinitev7.pPrincipalAdhesionBen.oLocaliteAdresse = ActivInfinitev7.pPrincipalAdhesionBen.addItem('oLocaliteAdresse');
ActivInfinitev7.pPrincipalAdhesionBen.oLocaliteAdrNonContro = ActivInfinitev7.pPrincipalAdhesionBen.addItem('oLocaliteAdrNonContro');
ActivInfinitev7.pPrincipalAdhesionBen.oNumAdresse = ActivInfinitev7.pPrincipalAdhesionBen.addItem('oNumAdresse');
ActivInfinitev7.pPrincipalAdhesionBen.oPays = ActivInfinitev7.pPrincipalAdhesionBen.addItem('oPays');
ActivInfinitev7.pPrincipalAdhesionBen.btFermeture = ActivInfinitev7.pPrincipalAdhesionBen.addItem('btFermeture');

ActivInfinitev7.pServerWebFerme = ActivInfinitev7.addPage('pServerWebFerme', {"comment":"Weblogic Bridge Message","path":"http://infinite-haum04/mdg/auth/login"});
ActivInfinitev7.pServerWebFerme.TitrePage = ActivInfinitev7.pServerWebFerme.addItem('TitrePage');
