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
ActivInfinitev7.pTabDeBord.btCongeParentSab = ActivInfinitev7.pTabDeBord.addItem('btCongeParentSab');
ActivInfinitev7.pTabDeBord.btVisuCompte = ActivInfinitev7.pTabDeBord.addItem('btVisuCompte');
ActivInfinitev7.pTabDeBord.btAdhesionIndiv = ActivInfinitev7.pTabDeBord.addItem('btAdhesionIndiv');

ActivInfinitev7.pContexteContratRech = ActivInfinitev7.addPage('pContexteContratRech', {"comment":"Contexte Contrat - haum0a - Activ Infinite - Module de gestion","path":"http://infinite-haum0a/mdg/Go.do?id=ACW1\u0026action=afficherContrat"});
ActivInfinitev7.pContexteContratRech.btRecherche = ActivInfinitev7.pContexteContratRech.addItem('btRecherche');
ActivInfinitev7.pContexteContratRech.onIdentificationBenef = ActivInfinitev7.pContexteContratRech.addItem('onIdentificationBenef', {"mustExist":true});
ActivInfinitev7.pContexteContratRech.oTypeIdentification = ActivInfinitev7.pContexteContratRech.addItem('oTypeIdentification');
ActivInfinitev7.pContexteContratRech.oRechPersDetail = ActivInfinitev7.pContexteContratRech.addItem('oRechPersDetail');

ActivInfinitev7.pContContratRechDet = ActivInfinitev7.addPage('pContContratRechDet', {"comment":"Contexte Contrat - haum03 - Activ Infinite - Module de gestion","path":"http://infinite-haum03/mdg/Go.do?id=RecherchePersonne\u0026action=afficher"});
ActivInfinitev7.pContContratRechDet.oNoInsee = ActivInfinitev7.pContContratRechDet.addItem('oNoInsee');
ActivInfinitev7.pContContratRechDet.btRechDetaillee = ActivInfinitev7.pContContratRechDet.addItem('btRechDetaillee', {"mustExist":true});

ActivInfinitev7.pContexteContOuvDet = ActivInfinitev7.addPage('pContexteContOuvDet', {"comment":"Contexte Contrat - haum03 - Activ Infinite - Module de gestion","path":"http://infinite-haum03/mdg/ficheSynthese/RecherchePersonne.do?method=doRecherchePersonne"});
ActivInfinitev7.pContexteContOuvDet.oPersonneDetailsTab = ActivInfinitev7.pContexteContOuvDet.addItem('oPersonneDetailsTab');
ActivInfinitev7.pContexteContOuvDet.oTypeRelation = ActivInfinitev7.pContexteContOuvDet.addItem('oTypeRelation', {"occurs":1});
ActivInfinitev7.pContexteContOuvDet.btNoInsee = ActivInfinitev7.pContexteContOuvDet.addItem('btNoInsee', {"occurs":1});
ActivInfinitev7.pContexteContOuvDet.ostatuts = ActivInfinitev7.pContexteContOuvDet.addItem('ostatuts', {"occurs":1});
ActivInfinitev7.pContexteContOuvDet.oTypeIdentification = ActivInfinitev7.pContexteContOuvDet.addItem('oTypeIdentification');
ActivInfinitev7.pContexteContOuvDet.onIdentificationBenef = ActivInfinitev7.pContexteContOuvDet.addItem('onIdentificationBenef');
ActivInfinitev7.pContexteContOuvDet.btRecherche = ActivInfinitev7.pContexteContOuvDet.addItem('btRecherche');

ActivInfinitev7.pContexteContratOuvert = ActivInfinitev7.addPage('pContexteContratOuvert', {"comment":"Contexte Contrat - haum0a - Activ Infinite - Module de gestion","path":"http://infinite-haum0a/mdg/AccueilMenu.do?method=rechercher"});
ActivInfinitev7.pContexteContratOuvert.oTitrePage = ActivInfinitev7.pContexteContratOuvert.addItem('oTitrePage', {"mustExist":true});
ActivInfinitev7.pContexteContratOuvert.oDateFinEffet = ActivInfinitev7.pContexteContratOuvert.addItem('oDateFinEffet', {"occurs":1});
ActivInfinitev7.pContexteContratOuvert.oContratIndiv = ActivInfinitev7.pContexteContratOuvert.addItem('oContratIndiv', {"occurs":1});
ActivInfinitev7.pContexteContratOuvert.oTitrePage2 = ActivInfinitev7.pContexteContratOuvert.addItem('oTitrePage2');
ActivInfinitev7.pContexteContratOuvert.btNoInsee = ActivInfinitev7.pContexteContratOuvert.addItem('btNoInsee', {"occurs":1});
ActivInfinitev7.pContexteContratOuvert.ostatuts = ActivInfinitev7.pContexteContratOuvert.addItem('ostatuts', {"occurs":1});
ActivInfinitev7.pContexteContratOuvert.oTypeRelation = ActivInfinitev7.pContexteContratOuvert.addItem('oTypeRelation', {"occurs":1});
ActivInfinitev7.pContexteContratOuvert.oSoldeGlobal = ActivInfinitev7.pContexteContratOuvert.addItem('oSoldeGlobal', {"occurs":1});
ActivInfinitev7.pContexteContratOuvert.oPart = ActivInfinitev7.pContexteContratOuvert.addItem('oPart', {"occurs":1});
ActivInfinitev7.pContexteContratOuvert.oDetailsPersonne = ActivInfinitev7.pContexteContratOuvert.addItem('oDetailsPersonne');

ActivInfinitev7.pIdentContratRechConsul = ActivInfinitev7.addPage('pIdentContratRechConsul', {"comment":"Sans effet - Changement couverture - haum04 - Activ Infinite - Module de gestion","path":"http://infinite-haum04/mdg/Go.do?id=ACCC04STD"});
ActivInfinitev7.pIdentContratRechConsul.oContratIndiv = ActivInfinitev7.pIdentContratRechConsul.addItem('oContratIndiv');
ActivInfinitev7.pIdentContratRechConsul.oDateDebEffet = ActivInfinitev7.pIdentContratRechConsul.addItem('oDateDebEffet');
ActivInfinitev7.pIdentContratRechConsul.btRecherche = ActivInfinitev7.pIdentContratRechConsul.addItem('btRecherche');
ActivInfinitev7.pIdentContratRechConsul.btFermeture = ActivInfinitev7.pIdentContratRechConsul.addItem('btFermeture');
ActivInfinitev7.pIdentContratRechConsul.oBtnPageCourante = ActivInfinitev7.pIdentContratRechConsul.addItem('oBtnPageCourante');
ActivInfinitev7.pIdentContratRechConsul.oTypeCttStatic = ActivInfinitev7.pIdentContratRechConsul.addItem('oTypeCttStatic');

ActivInfinitev7.pIdentContratRechResu = ActivInfinitev7.addPage('pIdentContratRechResu', {"comment":"Consultation - N°00023788 - Valide - Adhérent : Mademoiselle MAHE BEATRICE - haum03 - Activ Infinite - Module de gestion","path":"http://infinite-haum03/mdg/contrat/ACIC.do?method=rechercher\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCO03STSO_9\u0026CONTAINER_NOM_FONCTION=ACIC_100\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pIdentContratRechResu.oBtnPageCourante = ActivInfinitev7.pIdentContratRechResu.addItem('oBtnPageCourante');
ActivInfinitev7.pIdentContratRechResu.btBtnFooterSuivant = ActivInfinitev7.pIdentContratRechResu.addItem('btBtnFooterSuivant');
ActivInfinitev7.pIdentContratRechResu.btDETAIL = ActivInfinitev7.pIdentContratRechResu.addItem('btDETAIL');
ActivInfinitev7.pIdentContratRechResu.oTitreErreur = ActivInfinitev7.pIdentContratRechResu.addItem('oTitreErreur');
ActivInfinitev7.pIdentContratRechResu.oBtIdentAssures = ActivInfinitev7.pIdentContratRechResu.addItem('oBtIdentAssures');

ActivInfinitev7.pIdentContResilRech = ActivInfinitev7.addPage('pIdentContResilRech', {"comment":"Resiliation Contrat - N°22404280 - Valide - Adhérent : Monsieur RAKOTOARISOA MARTIAL - haum03 - Activ Infinite - Module de gestion","path":"http://infinite-haum03/mdg/contrat/ACIC.do?method=rechercher\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACRE01RE3F_426\u0026CONTAINER_NOM_FONCTION=ACIC_100\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pIdentContResilRech.btRecherche = ActivInfinitev7.pIdentContResilRech.addItem('btRecherche');
ActivInfinitev7.pIdentContResilRech.oContratIndiv = ActivInfinitev7.pIdentContResilRech.addItem('oContratIndiv');
ActivInfinitev7.pIdentContResilRech.oDateDebEffet = ActivInfinitev7.pIdentContResilRech.addItem('oDateDebEffet');
ActivInfinitev7.pIdentContResilRech.oBtnPageCourante = ActivInfinitev7.pIdentContResilRech.addItem('oBtnPageCourante');
ActivInfinitev7.pIdentContResilRech.btSuivant = ActivInfinitev7.pIdentContResilRech.addItem('btSuivant');
ActivInfinitev7.pIdentContResilRech.btBtnContinuer = ActivInfinitev7.pIdentContResilRech.addItem('btBtnContinuer');
ActivInfinitev7.pIdentContResilRech.btDETAIL = ActivInfinitev7.pIdentContResilRech.addItem('btDETAIL');
ActivInfinitev7.pIdentContResilRech.oDivErreur = ActivInfinitev7.pIdentContResilRech.addItem('oDivErreur', {"mustNotExist":true});
ActivInfinitev7.pIdentContResilRech.oDateDemande = ActivInfinitev7.pIdentContResilRech.addItem('oDateDemande');
ActivInfinitev7.pIdentContResilRech.oDetailPopup = ActivInfinitev7.pIdentContResilRech.addItem('oDetailPopup');

ActivInfinitev7.pIdentContResilRechRe = ActivInfinitev7.addPage('pIdentContResilRechRe', {"comment":"Resiliation Contrat - haum03 - Activ Infinite - Module de gestion","path":"http://infinite-haum03/mdg/contrat/ACIC.do?method=rechercher\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACRE01RE3F_403\u0026CONTAINER_NOM_FONCTION=ACIC_100\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pIdentContResilRechRe.oDivErreur = ActivInfinitev7.pIdentContResilRechRe.addItem('oDivErreur', {"mustExist":true});

ActivInfinitev7.pBlocNotesResil = ActivInfinitev7.addPage('pBlocNotesResil', {"comment":"Resiliation Contrat - N°22404280 - Valide - Adhérent : Monsieur RAKOTOARISOA MARTIAL - haum03 - Activ Infinite - Module de gestion","path":"http://infinite-haum03/mdg/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACRE01RE3F_438\u0026CONTAINER_NOM_FONCTION=ACBN_200\u0026AFFICHAGE_CONTAINER=OK\u0026BOUTON_CONTAINER=BOUTON_SUIVANT\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACRE01RE3F_438\u0026CONTAINER_NOM_FONCTION=ACIC_100\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pBlocNotesResil.oBtnPageCourante = ActivInfinitev7.pBlocNotesResil.addItem('oBtnPageCourante');
ActivInfinitev7.pBlocNotesResil.btSuivant = ActivInfinitev7.pBlocNotesResil.addItem('btSuivant');
ActivInfinitev7.pBlocNotesResil.oContenuBlocNote = ActivInfinitev7.pBlocNotesResil.addItem('oContenuBlocNote');

ActivInfinitev7.pBlocNotes = ActivInfinitev7.addPage('pBlocNotes', {"comment":"Consultation - N°21998269 - Résilié - Adhérent : Madame RUIZ SANDRINE - haum0a - Activ Infinite - Module de gestion","path":"http://infinite-haum0a/mdg/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCO03STSO_25\u0026CONTAINER_NOM_FONCTION=ACBN_102\u0026AFFICHAGE_CONTAINER=OK\u0026CONTAINER_FONCTION_FORCAGE_VALIDATION=FALSE\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCO03STSO_25\u0026CONTAINER_NOM_FONCTION=ACIC_100\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pBlocNotes.oContenuBlocNote = ActivInfinitev7.pBlocNotes.addItem('oContenuBlocNote');
ActivInfinitev7.pBlocNotes.oTitrePage = ActivInfinitev7.pBlocNotes.addItem('oTitrePage', {"mustExist":true});
ActivInfinitev7.pBlocNotes.btIdentAssures = ActivInfinitev7.pBlocNotes.addItem('btIdentAssures');
ActivInfinitev7.pBlocNotes.btSuivant = ActivInfinitev7.pBlocNotes.addItem('btSuivant');
ActivInfinitev7.pBlocNotes.btFermeture = ActivInfinitev7.pBlocNotes.addItem('btFermeture');
ActivInfinitev7.pBlocNotes.oBtnPageCourante = ActivInfinitev7.pBlocNotes.addItem('oBtnPageCourante', {"mustExist":true});

ActivInfinitev7.pIdentAssures = ActivInfinitev7.addPage('pIdentAssures', {"comment":"Consultation - N°00293756 - Résilié - Adhérent : Monsieur CALVEZ DANIEL - haum0a - Activ Infinite - Module de gestion","path":"http://infinite-haum0a/mdg/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCO03STSO_6\u0026CONTAINER_NOM_FONCTION=ACIA_400\u0026AFFICHAGE_CONTAINER=OK\u0026CONTAINER_FONCTION_FORCAGE_VALIDATION=FALSE\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCO03STSO_6\u0026CONTAINER_NOM_FONCTION=ACIC_100\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pIdentAssures.btAttestAideCompl = ActivInfinitev7.pIdentAssures.addItem('btAttestAideCompl');
ActivInfinitev7.pIdentAssures.oTitrePage = ActivInfinitev7.pIdentAssures.addItem('oTitrePage', {"mustExist":true});
ActivInfinitev7.pIdentAssures.btInfoRo = ActivInfinitev7.pIdentAssures.addItem('btInfoRo');
ActivInfinitev7.pIdentAssures.btFermeture = ActivInfinitev7.pIdentAssures.addItem('btFermeture');
ActivInfinitev7.pIdentAssures.oAssureRO = ActivInfinitev7.pIdentAssures.addItem('oAssureRO');
ActivInfinitev7.pIdentAssures.oDroitROAdherent = ActivInfinitev7.pIdentAssures.addItem('oDroitROAdherent');
ActivInfinitev7.pIdentAssures.btSuivant = ActivInfinitev7.pIdentAssures.addItem('btSuivant', {"mustExist":true});
ActivInfinitev7.pIdentAssures.oBtnPageCourante = ActivInfinitev7.pIdentAssures.addItem('oBtnPageCourante', {"mustExist":true});

ActivInfinitev7.pIdentAssuresEdit = ActivInfinitev7.addPage('pIdentAssuresEdit', {"comment":"Consultation - N°00293756 - Résilié - Adhérent : Monsieur CALVEZ DANIEL - haum0a - Activ Infinite - Module de gestion","path":"http://infinite-haum0a/mdg/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCO03STSO_6\u0026CONTAINER_NOM_FONCTION=ACIA_400\u0026AFFICHAGE_CONTAINER=OK\u0026CONTAINER_FONCTION_FORCAGE_VALIDATION=FALSE\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCO03STSO_6\u0026CONTAINER_NOM_FONCTION=ACIC_100\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pIdentAssuresEdit.oTitrePage = ActivInfinitev7.pIdentAssuresEdit.addItem('oTitrePage', {"mustExist":true});
ActivInfinitev7.pIdentAssuresEdit.btFermeture = ActivInfinitev7.pIdentAssuresEdit.addItem('btFermeture');
ActivInfinitev7.pIdentAssuresEdit.oAssureRO = ActivInfinitev7.pIdentAssuresEdit.addItem('oAssureRO');
ActivInfinitev7.pIdentAssuresEdit.oDroitROAdherent = ActivInfinitev7.pIdentAssuresEdit.addItem('oDroitROAdherent');
ActivInfinitev7.pIdentAssuresEdit.oRgNaissance = ActivInfinitev7.pIdentAssuresEdit.addItem('oRgNaissance');
ActivInfinitev7.pIdentAssuresEdit.oNumRO = ActivInfinitev7.pIdentAssuresEdit.addItem('oNumRO');
ActivInfinitev7.pIdentAssuresEdit.oCleRO = ActivInfinitev7.pIdentAssuresEdit.addItem('oCleRO');
ActivInfinitev7.pIdentAssuresEdit.oSituationFamil = ActivInfinitev7.pIdentAssuresEdit.addItem('oSituationFamil');
ActivInfinitev7.pIdentAssuresEdit.oNomNaissance = ActivInfinitev7.pIdentAssuresEdit.addItem('oNomNaissance');
ActivInfinitev7.pIdentAssuresEdit.oTypeAssure = ActivInfinitev7.pIdentAssuresEdit.addItem('oTypeAssure');
ActivInfinitev7.pIdentAssuresEdit.oSexe = ActivInfinitev7.pIdentAssuresEdit.addItem('oSexe');
ActivInfinitev7.pIdentAssuresEdit.DateDeNaiss = ActivInfinitev7.pIdentAssuresEdit.addItem('DateDeNaiss');
ActivInfinitev7.pIdentAssuresEdit.oCategSociale = ActivInfinitev7.pIdentAssuresEdit.addItem('oCategSociale');
ActivInfinitev7.pIdentAssuresEdit.oTeletrans = ActivInfinitev7.pIdentAssuresEdit.addItem('oTeletrans');
ActivInfinitev7.pIdentAssuresEdit.btValider = ActivInfinitev7.pIdentAssuresEdit.addItem('btValider', {"mustExist":true});
ActivInfinitev7.pIdentAssuresEdit.oBtnPageCourante = ActivInfinitev7.pIdentAssuresEdit.addItem('oBtnPageCourante', {"mustExist":true});

ActivInfinitev7.pIdentAssuresAttest = ActivInfinitev7.addPage('pIdentAssuresAttest', {"comment":"Consultation - Adhérent : Monsieur CHARLOT GUY - haum0a - Activ Infinite - Module de gestion","path":"http://infinite-haum0a/mdg/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCO03STSO_1\u0026CONTAINER_NOM_FONCTION=ACAC_403\u0026AFFICHAGE_CONTAINER=OK\u0026CONTAINER_FONCTION_FORCAGE_VALIDATION=FALSE\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCO03STSO_1\u0026CONTAINER_NOM_FONCTION=ACIA_400\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pIdentAssuresAttest.oType = ActivInfinitev7.pIdentAssuresAttest.addItem('oType', {"occurs":1});
ActivInfinitev7.pIdentAssuresAttest.oDateDeb = ActivInfinitev7.pIdentAssuresAttest.addItem('oDateDeb', {"occurs":1});
ActivInfinitev7.pIdentAssuresAttest.oDateFin = ActivInfinitev7.pIdentAssuresAttest.addItem('oDateFin', {"occurs":1});
ActivInfinitev7.pIdentAssuresAttest.oTitrePage = ActivInfinitev7.pIdentAssuresAttest.addItem('oTitrePage', {"mustExist":true});
ActivInfinitev7.pIdentAssuresAttest.btVisuCotisation = ActivInfinitev7.pIdentAssuresAttest.addItem('btVisuCotisation');
ActivInfinitev7.pIdentAssuresAttest.btFermeture = ActivInfinitev7.pIdentAssuresAttest.addItem('btFermeture');
ActivInfinitev7.pIdentAssuresAttest.oBtnPageCourante = ActivInfinitev7.pIdentAssuresAttest.addItem('oBtnPageCourante', {"mustExist":true});

ActivInfinitev7.pProdGaranConsul = ActivInfinitev7.addPage('pProdGaranConsul', {"comment":"Consultation - N°21213405 - Valide - Adhérent : Monsieur BOURGOIN JEAN HUGUES - haum03 - Activ Infinite - Module de gestion","path":"http://infinite-haum0a/mdg/contrat/ACG2.do?method=doSelectionAssure\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCO03STSO_17\u0026CONTAINER_NOM_FONCTION=ACG2\u0026AFFICHAGE_CONTAINER\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCO03STSO_17\u0026CONTAINER_NOM_FONCTION=ACG2_500\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pProdGaranConsul.oTitrePage = ActivInfinitev7.pProdGaranConsul.addItem('oTitrePage', {"mustExist":true});
ActivInfinitev7.pProdGaranConsul.oListeAssures = ActivInfinitev7.pProdGaranConsul.addItem('oListeAssures', {"occurs":1});
ActivInfinitev7.pProdGaranConsul.oNomPrenomBenef = ActivInfinitev7.pProdGaranConsul.addItem('oNomPrenomBenef', {"occurs":1});
ActivInfinitev7.pProdGaranConsul.oTypeBenef = ActivInfinitev7.pProdGaranConsul.addItem('oTypeBenef', {"occurs":1});
ActivInfinitev7.pProdGaranConsul.oCodeProduit = ActivInfinitev7.pProdGaranConsul.addItem('oCodeProduit', {"occurs":1});
ActivInfinitev7.pProdGaranConsul.oDateRadProduit = ActivInfinitev7.pProdGaranConsul.addItem('oDateRadProduit', {"occurs":1});
ActivInfinitev7.pProdGaranConsul.oEtatProduit = ActivInfinitev7.pProdGaranConsul.addItem('oEtatProduit', {"occurs":1});
ActivInfinitev7.pProdGaranConsul.btVisuCotisation = ActivInfinitev7.pProdGaranConsul.addItem('btVisuCotisation');
ActivInfinitev7.pProdGaranConsul.oLongTableGaranties = ActivInfinitev7.pProdGaranConsul.addItem('oLongTableGaranties');
ActivInfinitev7.pProdGaranConsul.btMajPage = ActivInfinitev7.pProdGaranConsul.addItem('btMajPage');
ActivInfinitev7.pProdGaranConsul.btFermeture = ActivInfinitev7.pProdGaranConsul.addItem('btFermeture');
ActivInfinitev7.pProdGaranConsul.btSuivant = ActivInfinitev7.pProdGaranConsul.addItem('btSuivant', {"mustExist":true});
ActivInfinitev7.pProdGaranConsul.oBtnPageCourante = ActivInfinitev7.pProdGaranConsul.addItem('oBtnPageCourante');

ActivInfinitev7.pVisuCptCotisConsul = ActivInfinitev7.addPage('pVisuCptCotisConsul', {"comment":"Consultation - N°00248886 - Valide - Adhérent : Monsieur GOURIO LOIC - haum0a - Activ Infinite - Module de gestion","path":"http://infinite-haum0a/mdg/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCO03STSO_114\u0026CONTAINER_NOM_FONCTION=AC36_900\u0026AFFICHAGE_CONTAINER=OK\u0026CONTAINER_FONCTION_FORCAGE_VALIDATION=FALSE\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCO03STSO_114\u0026CONTAINER_NOM_FONCTION=AC3Q_800\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pVisuCptCotisConsul.oTitrePage = ActivInfinitev7.pVisuCptCotisConsul.addItem('oTitrePage', {"mustExist":true});
ActivInfinitev7.pVisuCptCotisConsul.oDateEch = ActivInfinitev7.pVisuCptCotisConsul.addItem('oDateEch', {"occurs":1});
ActivInfinitev7.pVisuCptCotisConsul.oSoldeCompt = ActivInfinitev7.pVisuCptCotisConsul.addItem('oSoldeCompt', {"occurs":1});
ActivInfinitev7.pVisuCptCotisConsul.oListeProduits = ActivInfinitev7.pVisuCptCotisConsul.addItem('oListeProduits');
ActivInfinitev7.pVisuCptCotisConsul.btFermeture = ActivInfinitev7.pVisuCptCotisConsul.addItem('btFermeture');
ActivInfinitev7.pVisuCptCotisConsul.oBtnPageCourante = ActivInfinitev7.pVisuCptCotisConsul.addItem('oBtnPageCourante');

ActivInfinitev7.pProdGaranChgtCouv = ActivInfinitev7.addPage('pProdGaranChgtCouv', {"comment":"Sans effet - Changement couverture - N°03043298 - Valide - Adhérent : Madame JEANNE FRANCOISE - haum04 - Activ Infinite - Module de gestion","path":"http://infinite-haum04/mdg/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCC04STD_31\u0026CONTAINER_NOM_FONCTION=ACG2_200\u0026AFFICHAGE_CONTAINER=OK\u0026BOUTON_CONTAINER=BOUTON_SUIVANT\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCC04STD_31\u0026CONTAINER_NOM_FONCTION=ACIC_100\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pProdGaranChgtCouv.oTitrePage = ActivInfinitev7.pProdGaranChgtCouv.addItem('oTitrePage', {"mustExist":true});
ActivInfinitev7.pProdGaranChgtCouv.btMajPage = ActivInfinitev7.pProdGaranChgtCouv.addItem('btMajPage');
ActivInfinitev7.pProdGaranChgtCouv.btSuivant = ActivInfinitev7.pProdGaranChgtCouv.addItem('btSuivant');
ActivInfinitev7.pProdGaranChgtCouv.btFermeture = ActivInfinitev7.pProdGaranChgtCouv.addItem('btFermeture');
ActivInfinitev7.pProdGaranChgtCouv.btMajProduit = ActivInfinitev7.pProdGaranChgtCouv.addItem('btMajProduit');
ActivInfinitev7.pProdGaranChgtCouv.btAjoutProduit = ActivInfinitev7.pProdGaranChgtCouv.addItem('btAjoutProduit');
ActivInfinitev7.pProdGaranChgtCouv.oNouvCodeProduit = ActivInfinitev7.pProdGaranChgtCouv.addItem('oNouvCodeProduit');
ActivInfinitev7.pProdGaranChgtCouv.oCodeProduit = ActivInfinitev7.pProdGaranChgtCouv.addItem('oCodeProduit', {"occurs":1});
ActivInfinitev7.pProdGaranChgtCouv.btSauvNouvCodeProd = ActivInfinitev7.pProdGaranChgtCouv.addItem('btSauvNouvCodeProd');
ActivInfinitev7.pProdGaranChgtCouv.btSauvMajProduit = ActivInfinitev7.pProdGaranChgtCouv.addItem('btSauvMajProduit');
ActivInfinitev7.pProdGaranChgtCouv.btNouvProduit = ActivInfinitev7.pProdGaranChgtCouv.addItem('btNouvProduit');
ActivInfinitev7.pProdGaranChgtCouv.oTitrePopUp = ActivInfinitev7.pProdGaranChgtCouv.addItem('oTitrePopUp');
ActivInfinitev7.pProdGaranChgtCouv.btContinuer = ActivInfinitev7.pProdGaranChgtCouv.addItem('btContinuer');
ActivInfinitev7.pProdGaranChgtCouv.oBtnPageCourante = ActivInfinitev7.pProdGaranChgtCouv.addItem('oBtnPageCourante');

ActivInfinitev7.pParamDivers = ActivInfinitev7.addPage('pParamDivers', {"comment":"Sans effet - Changement couverture - N°03043298 - Valide - Adhérent : Madame JEANNE FRANCOISE - haum04 - Activ Infinite - Module de gestion","path":"http://infinite-haum04/mdg/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCC04STD_31\u0026CONTAINER_NOM_FONCTION=ACPD_300\u0026AFFICHAGE_CONTAINER=OK\u0026BOUTON_CONTAINER=BOUTON_SUIVANT\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCC04STD_31\u0026CONTAINER_NOM_FONCTION=ACG2_200\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pParamDivers.oTitrePage = ActivInfinitev7.pParamDivers.addItem('oTitrePage', {"mustExist":true});
ActivInfinitev7.pParamDivers.btSuivant = ActivInfinitev7.pParamDivers.addItem('btSuivant');
ActivInfinitev7.pParamDivers.btFermeture = ActivInfinitev7.pParamDivers.addItem('btFermeture');
ActivInfinitev7.pParamDivers.oBtnPageCourante = ActivInfinitev7.pParamDivers.addItem('oBtnPageCourante', {"mustExist":true});

ActivInfinitev7.pParamDiversConsul = ActivInfinitev7.addPage('pParamDiversConsul', {"comment":"Consultation - N°21213405 - Valide - Adhérent : Monsieur BOURGOIN JEAN HUGUES - haum03 - Activ Infinite - Module de gestion","path":"http://infinite-haum03/mdg/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCO03STSO_31\u0026CONTAINER_NOM_FONCTION=ACPD_700\u0026AFFICHAGE_CONTAINER=OK\u0026CONTAINER_FONCTION_FORCAGE_VALIDATION=FALSE\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCO03STSO_31\u0026CONTAINER_NOM_FONCTION=AC36_900\u0026AFFICHAGE_CONTAINER"});

ActivInfinitev7.pParamDeCalcul = ActivInfinitev7.addPage('pParamDeCalcul', {"comment":"Sans effet - Changement couverture - N°03043298 - Valide - Adhérent : Madame JEANNE FRANCOISE - haum04 - Activ Infinite - Module de gestion","path":"http://infinite-haum04/mdg/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCC04STD_31\u0026CONTAINER_NOM_FONCTION=AC32_400\u0026AFFICHAGE_CONTAINER=OK\u0026BOUTON_CONTAINER=BOUTON_SUIVANT\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCC04STD_31\u0026CONTAINER_NOM_FONCTION=ACPD_300\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pParamDeCalcul.oTitrePage = ActivInfinitev7.pParamDeCalcul.addItem('oTitrePage');
ActivInfinitev7.pParamDeCalcul.btSuivant = ActivInfinitev7.pParamDeCalcul.addItem('btSuivant');
ActivInfinitev7.pParamDeCalcul.oPasDeCalcul = ActivInfinitev7.pParamDeCalcul.addItem('oPasDeCalcul');
ActivInfinitev7.pParamDeCalcul.btFermeture = ActivInfinitev7.pParamDeCalcul.addItem('btFermeture');
ActivInfinitev7.pParamDeCalcul.oContratIndiv = ActivInfinitev7.pParamDeCalcul.addItem('oContratIndiv');
ActivInfinitev7.pParamDeCalcul.oPasCalculStat = ActivInfinitev7.pParamDeCalcul.addItem('oPasCalculStat');
ActivInfinitev7.pParamDeCalcul.oCalculCotisNonAutori = ActivInfinitev7.pParamDeCalcul.addItem('oCalculCotisNonAutori');
ActivInfinitev7.pParamDeCalcul.oBtnPageCourante = ActivInfinitev7.pParamDeCalcul.addItem('oBtnPageCourante');

ActivInfinitev7.pHistoCotisation = ActivInfinitev7.addPage('pHistoCotisation', {"comment":"Sans effet - Changement couverture - N°03043298 - Valide - Adhérent : Madame JEANNE FRANCOISE - haum04 - Activ Infinite - Module de gestion","path":"http://infinite-haum04/mdg/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCC04STD_32\u0026CONTAINER_NOM_FONCTION=AC3Q_500\u0026AFFICHAGE_CONTAINER=OK\u0026BOUTON_CONTAINER=BOUTON_SUIVANT\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCC04STD_32\u0026CONTAINER_NOM_FONCTION=AC32_400\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pHistoCotisation.oBtnPageCourante = ActivInfinitev7.pHistoCotisation.addItem('oBtnPageCourante', {"mustExist":true});
ActivInfinitev7.pHistoCotisation.btSuivant = ActivInfinitev7.pHistoCotisation.addItem('btSuivant');
ActivInfinitev7.pHistoCotisation.btFermeture = ActivInfinitev7.pHistoCotisation.addItem('btFermeture');

ActivInfinitev7.pValidationActeChgtCouv = ActivInfinitev7.addPage('pValidationActeChgtCouv', {"comment":"Sans effet - Changement couverture - N°03043298 - Valide - Adhérent : Madame JEANNE FRANCOISE - haum04 - Activ Infinite - Module de gestion","path":"http://infinite-haum04/mdg/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCC04STD_52\u0026CONTAINER_NOM_FONCTION=ACVV_700\u0026AFFICHAGE_CONTAINER=OK\u0026BOUTON_CONTAINER=BOUTON_SUIVANT\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCC04STD_52\u0026CONTAINER_NOM_FONCTION=AC36_600\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pValidationActeChgtCouv.oTitrePage = ActivInfinitev7.pValidationActeChgtCouv.addItem('oTitrePage', {"mustExist":true});
ActivInfinitev7.pValidationActeChgtCouv.btSauvegarde = ActivInfinitev7.pValidationActeChgtCouv.addItem('btSauvegarde', {"mustExist":true});
ActivInfinitev7.pValidationActeChgtCouv.btFermeture = ActivInfinitev7.pValidationActeChgtCouv.addItem('btFermeture');
ActivInfinitev7.pValidationActeChgtCouv.oBtnPageCourante = ActivInfinitev7.pValidationActeChgtCouv.addItem('oBtnPageCourante', {"mustExist":true});

ActivInfinitev7.pVisuCptCotisChgtCouv = ActivInfinitev7.addPage('pVisuCptCotisChgtCouv', {"comment":"Sans effet - Changement couverture - N°03043298 - Valide - Adhérent : Madame JEANNE FRANCOISE - haum04 - Activ Infinite - Module de gestion","path":"http://infinite-haum04/mdg/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCC04STD_32\u0026CONTAINER_NOM_FONCTION=AC36_600\u0026AFFICHAGE_CONTAINER=OK\u0026BOUTON_CONTAINER=BOUTON_SUIVANT\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCC04STD_32\u0026CONTAINER_NOM_FONCTION=AC3Q_500\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pVisuCptCotisChgtCouv.oTitrePage = ActivInfinitev7.pVisuCptCotisChgtCouv.addItem('oTitrePage');
ActivInfinitev7.pVisuCptCotisChgtCouv.oBtnPageCourante = ActivInfinitev7.pVisuCptCotisChgtCouv.addItem('oBtnPageCourante', {"mustExist":true});
ActivInfinitev7.pVisuCptCotisChgtCouv.oValidation = ActivInfinitev7.pVisuCptCotisChgtCouv.addItem('oValidation', {"type":"Key"});
ActivInfinitev7.pVisuCptCotisChgtCouv.btSuivant = ActivInfinitev7.pVisuCptCotisChgtCouv.addItem('btSuivant');
ActivInfinitev7.pVisuCptCotisChgtCouv.btFermeture = ActivInfinitev7.pVisuCptCotisChgtCouv.addItem('btFermeture');

ActivInfinitev7.pProdGaranChgtCouvEtat = ActivInfinitev7.addPage('pProdGaranChgtCouvEtat', {"comment":"Changement de couverture - N°00248886 - Valide - Adhérent : Monsieur GOURIO LOIC - haum04 - Activ Infinite - Module de gestion","path":"http://infinite-haum04/mdg/contrat/ACG2.do?method=doModifierCouverture\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCC01STD_67\u0026CONTAINER_NOM_FONCTION=ACG2\u0026AFFICHAGE_CONTAINER\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCC01STD_67\u0026CONTAINER_NOM_FONCTION=ACG2_300\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pProdGaranChgtCouvEtat.oEtatProduit = ActivInfinitev7.pProdGaranChgtCouvEtat.addItem('oEtatProduit', {"mustExist":true,"type":"Key"});
ActivInfinitev7.pProdGaranChgtCouvEtat.btSauvegarde = ActivInfinitev7.pProdGaranChgtCouvEtat.addItem('btSauvegarde', {"mustExist":true});
ActivInfinitev7.pProdGaranChgtCouvEtat.btFermeture = ActivInfinitev7.pProdGaranChgtCouvEtat.addItem('btFermeture');
ActivInfinitev7.pProdGaranChgtCouvEtat.oBtnPageCourante = ActivInfinitev7.pProdGaranChgtCouvEtat.addItem('oBtnPageCourante', {"mustExist":true});

ActivInfinitev7.pAvisEcheanceChgtCouv = ActivInfinitev7.addPage('pAvisEcheanceChgtCouv', {"comment":"Changement de couverture - N°00248886 - Valide - Adhérent : Monsieur GOURIO LOIC - haum04 - Activ Infinite - Module de gestion","path":"http://infinite-haum04/mdg/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCC01STD_14\u0026CONTAINER_NOM_FONCTION=AC3U_900\u0026AFFICHAGE_CONTAINER=OK\u0026BOUTON_CONTAINER=BOUTON_SUIVANT\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCC01STD_14\u0026CONTAINER_NOM_FONCTION=AC36_800\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pAvisEcheanceChgtCouv.oTitrePage = ActivInfinitev7.pAvisEcheanceChgtCouv.addItem('oTitrePage', {"mustExist":true});
ActivInfinitev7.pAvisEcheanceChgtCouv.oSelectEdition = ActivInfinitev7.pAvisEcheanceChgtCouv.addItem('oSelectEdition', {"mustExist":true,"type":"Key"});
ActivInfinitev7.pAvisEcheanceChgtCouv.btSuivant = ActivInfinitev7.pAvisEcheanceChgtCouv.addItem('btSuivant');
ActivInfinitev7.pAvisEcheanceChgtCouv.btFermeture = ActivInfinitev7.pAvisEcheanceChgtCouv.addItem('btFermeture');
ActivInfinitev7.pAvisEcheanceChgtCouv.oBtnPageCourante = ActivInfinitev7.pAvisEcheanceChgtCouv.addItem('oBtnPageCourante', {"mustExist":true});

ActivInfinitev7.pDemandeCartesChgtCouv = ActivInfinitev7.addPage('pDemandeCartesChgtCouv', {"comment":"Changement de couverture - N°00248886 - Valide - Adhérent : Monsieur GOURIO LOIC - haum04 - Activ Infinite - Module de gestion","path":"http://infinite-haum04/mdg/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCC01STD_14\u0026CONTAINER_NOM_FONCTION=ACEK_1000\u0026AFFICHAGE_CONTAINER=OK\u0026BOUTON_CONTAINER=BOUTON_SUIVANT\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCC01STD_14\u0026CONTAINER_NOM_FONCTION=AC3U_900\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pDemandeCartesChgtCouv.oTypeEditionDiff = ActivInfinitev7.pDemandeCartesChgtCouv.addItem('oTypeEditionDiff', {"mustExist":true});
ActivInfinitev7.pDemandeCartesChgtCouv.oNonTypeEdition = ActivInfinitev7.pDemandeCartesChgtCouv.addItem('oNonTypeEdition', {"mustExist":true});
ActivInfinitev7.pDemandeCartesChgtCouv.oTitrePage = ActivInfinitev7.pDemandeCartesChgtCouv.addItem('oTitrePage', {"mustExist":true});
ActivInfinitev7.pDemandeCartesChgtCouv.btSuivant = ActivInfinitev7.pDemandeCartesChgtCouv.addItem('btSuivant');
ActivInfinitev7.pDemandeCartesChgtCouv.btFermeture = ActivInfinitev7.pDemandeCartesChgtCouv.addItem('btFermeture');
ActivInfinitev7.pDemandeCartesChgtCouv.oBtnPageCourante = ActivInfinitev7.pDemandeCartesChgtCouv.addItem('oBtnPageCourante', {"mustExist":true});

ActivInfinitev7.pInformationRO = ActivInfinitev7.addPage('pInformationRO', {"comment":"Changement situation particulière - N°00502420 - Valide - Adhérent : Mademoiselle DESILE MONIQUE - haum0a - Activ Infinite - Module de gestion","path":"http://infinite-haum0a/mdg/contrat/ACRO.do?method=modifierAssures\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACMA01MASP_160\u0026CONTAINER_NOM_FONCTION=ACRO_400\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pInformationRO.btCreationNouvSituati = ActivInfinitev7.pInformationRO.addItem('btCreationNouvSituati');
ActivInfinitev7.pInformationRO.btValider = ActivInfinitev7.pInformationRO.addItem('btValider');
ActivInfinitev7.pInformationRO.oCodeSitPart0 = ActivInfinitev7.pInformationRO.addItem('oCodeSitPart0');
ActivInfinitev7.pInformationRO.btFermeture = ActivInfinitev7.pInformationRO.addItem('btFermeture');
ActivInfinitev7.pInformationRO.oSituationParti = ActivInfinitev7.pInformationRO.addItem('oSituationParti');
ActivInfinitev7.pInformationRO.btAnnuler = ActivInfinitev7.pInformationRO.addItem('btAnnuler');
ActivInfinitev7.pInformationRO.oBtnPageCourante = ActivInfinitev7.pInformationRO.addItem('oBtnPageCourante', {"mustExist":true});

ActivInfinitev7.pIdentAssuresInfoRO = ActivInfinitev7.addPage('pIdentAssuresInfoRO', {"comment":"Consultation - N°21309938 - Valide - Adhérent : Monsieur HASANI MENTOR - haum04 - Activ Infinite - Module de gestion","path":"http://infinite-haum04/mdg/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCO03STSO_1\u0026CONTAINER_NOM_FONCTION=ACRO_402\u0026AFFICHAGE_CONTAINER=OK\u0026CONTAINER_FONCTION_FORCAGE_VALIDATION=FALSE\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCO03STSO_1\u0026CONTAINER_NOM_FONCTION=ACIA_400\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pIdentAssuresInfoRO.oTitrePage = ActivInfinitev7.pIdentAssuresInfoRO.addItem('oTitrePage');
ActivInfinitev7.pIdentAssuresInfoRO.oTitrePage2 = ActivInfinitev7.pIdentAssuresInfoRO.addItem('oTitrePage2');
ActivInfinitev7.pIdentAssuresInfoRO.oTypeAssure = ActivInfinitev7.pIdentAssuresInfoRO.addItem('oTypeAssure', {"occurs":1});
ActivInfinitev7.pIdentAssuresInfoRO.oEtatProduit = ActivInfinitev7.pIdentAssuresInfoRO.addItem('oEtatProduit', {"occurs":1});
ActivInfinitev7.pIdentAssuresInfoRO.oRangeAssure = ActivInfinitev7.pIdentAssuresInfoRO.addItem('oRangeAssure', {"occurs":1});
ActivInfinitev7.pIdentAssuresInfoRO.oDateFinEffetProduit = ActivInfinitev7.pIdentAssuresInfoRO.addItem('oDateFinEffetProduit', {"occurs":1});
ActivInfinitev7.pIdentAssuresInfoRO.oCodeProduit = ActivInfinitev7.pIdentAssuresInfoRO.addItem('oCodeProduit', {"occurs":1});
ActivInfinitev7.pIdentAssuresInfoRO.btNavigListeProduits = ActivInfinitev7.pIdentAssuresInfoRO.addItem('btNavigListeProduits');
ActivInfinitev7.pIdentAssuresInfoRO.oListeAssures = ActivInfinitev7.pIdentAssuresInfoRO.addItem('oListeAssures', {"occurs":1});
ActivInfinitev7.pIdentAssuresInfoRO.btFermeture = ActivInfinitev7.pIdentAssuresInfoRO.addItem('btFermeture');
ActivInfinitev7.pIdentAssuresInfoRO.btModifListeAssures = ActivInfinitev7.pIdentAssuresInfoRO.addItem('btModifListeAssures');
ActivInfinitev7.pIdentAssuresInfoRO.btSuivant = ActivInfinitev7.pIdentAssuresInfoRO.addItem('btSuivant');
ActivInfinitev7.pIdentAssuresInfoRO.oBtnPageCourante = ActivInfinitev7.pIdentAssuresInfoRO.addItem('oBtnPageCourante');
ActivInfinitev7.pIdentAssuresInfoRO.oE = ActivInfinitev7.pIdentAssuresInfoRO.addItem('oE', {"mustExist":true});

ActivInfinitev7.pIntervPrinRechBenef = ActivInfinitev7.addPage('pIntervPrinRechBenef', {"comment":"Adhésions en collectif - N°22401301 - EN COURS - - VETIR ERAM ENSEMBLE DU PERSONNEL - haum04 - Activ Infinite - Module de gestion","path":"http://infinite-haum04/mdg/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACSO01ASOB_28\u0026CONTAINER_NOM_FONCTION=ACIN_200\u0026AFFICHAGE_CONTAINER=OK\u0026BOUTON_CONTAINER=BOUTON_SUIVANT\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACSO01ASOB_28\u0026CONTAINER_NOM_FONCTION=ACIC_100\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pIntervPrinRechBenef.oNumINSEE = ActivInfinitev7.pIntervPrinRechBenef.addItem('oNumINSEE');
ActivInfinitev7.pIntervPrinRechBenef.btRecherche = ActivInfinitev7.pIntervPrinRechBenef.addItem('btRecherche');
ActivInfinitev7.pIntervPrinRechBenef.oResParPersonne = ActivInfinitev7.pIntervPrinRechBenef.addItem('oResParPersonne');
ActivInfinitev7.pIntervPrinRechBenef.btValider = ActivInfinitev7.pIntervPrinRechBenef.addItem('btValider');
ActivInfinitev7.pIntervPrinRechBenef.btAnnuler = ActivInfinitev7.pIntervPrinRechBenef.addItem('btAnnuler');
ActivInfinitev7.pIntervPrinRechBenef.oResNomBenef = ActivInfinitev7.pIntervPrinRechBenef.addItem('oResNomBenef', {"occurs":1});
ActivInfinitev7.pIntervPrinRechBenef.oLigneResNomBenef = ActivInfinitev7.pIntervPrinRechBenef.addItem('oLigneResNomBenef', {"occurs":1});
ActivInfinitev7.pIntervPrinRechBenef.oTitrePage = ActivInfinitev7.pIntervPrinRechBenef.addItem('oTitrePage', {"mustExist":true});
ActivInfinitev7.pIntervPrinRechBenef.oBtnPageCourante = ActivInfinitev7.pIntervPrinRechBenef.addItem('oBtnPageCourante', {"mustExist":true});

ActivInfinitev7.pIntervenantPrincipal = ActivInfinitev7.addPage('pIntervenantPrincipal', {"comment":"Adhésions en collectif - N°22468406 - EN COURS - - VETIR ERAM ENSEMBLE DU PERSONNEL - haum0a - Activ Infinite - Module de gestion","path":"http://infinite-haum0a/mdg/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACSO01ASOB_18\u0026CONTAINER_NOM_FONCTION=ACIS_300\u0026AFFICHAGE_CONTAINER=OK\u0026BOUTON_CONTAINER=BOUTON_SUIVANT\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACSO01ASOB_18\u0026CONTAINER_NOM_FONCTION=ACIN_200\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pIntervenantPrincipal.oCivilite = ActivInfinitev7.pIntervenantPrincipal.addItem('oCivilite', {"mustExist":true});
ActivInfinitev7.pIntervenantPrincipal.oNom = ActivInfinitev7.pIntervenantPrincipal.addItem('oNom', {"mustExist":true});
ActivInfinitev7.pIntervenantPrincipal.oPrenom = ActivInfinitev7.pIntervenantPrincipal.addItem('oPrenom', {"mustExist":true});
ActivInfinitev7.pIntervenantPrincipal.oCodePostal = ActivInfinitev7.pIntervenantPrincipal.addItem('oCodePostal', {"mustExist":true});
ActivInfinitev7.pIntervenantPrincipal.oCodePostalAdresse = ActivInfinitev7.pIntervenantPrincipal.addItem('oCodePostalAdresse');
ActivInfinitev7.pIntervenantPrincipal.oAdresse = ActivInfinitev7.pIntervenantPrincipal.addItem('oAdresse');
ActivInfinitev7.pIntervenantPrincipal.oModePaiementPrest = ActivInfinitev7.pIntervenantPrincipal.addItem('oModePaiementPrest', {"mustExist":true,"type":"Key"});
ActivInfinitev7.pIntervenantPrincipal.oModeReglmetCotis = ActivInfinitev7.pIntervenantPrincipal.addItem('oModeReglmetCotis', {"mustExist":true,"type":"Key"});
ActivInfinitev7.pIntervenantPrincipal.oFrequenceDeregl = ActivInfinitev7.pIntervenantPrincipal.addItem('oFrequenceDeregl', {"mustExist":true,"type":"Key"});
ActivInfinitev7.pIntervenantPrincipal.oTypeTerme = ActivInfinitev7.pIntervenantPrincipal.addItem('oTypeTerme', {"mustExist":true,"type":"Key"});
ActivInfinitev7.pIntervenantPrincipal.oFrequenceAvisEch = ActivInfinitev7.pIntervenantPrincipal.addItem('oFrequenceAvisEch', {"mustExist":true,"type":"Key"});
ActivInfinitev7.pIntervenantPrincipal.btSuivant = ActivInfinitev7.pIntervenantPrincipal.addItem('btSuivant');
ActivInfinitev7.pIntervenantPrincipal.oLocaliteAdresse = ActivInfinitev7.pIntervenantPrincipal.addItem('oLocaliteAdresse');
ActivInfinitev7.pIntervenantPrincipal.oLocaliteAdrNonContro = ActivInfinitev7.pIntervenantPrincipal.addItem('oLocaliteAdrNonContro');
ActivInfinitev7.pIntervenantPrincipal.oNumAdresse = ActivInfinitev7.pIntervenantPrincipal.addItem('oNumAdresse');
ActivInfinitev7.pIntervenantPrincipal.oPays = ActivInfinitev7.pIntervenantPrincipal.addItem('oPays');
ActivInfinitev7.pIntervenantPrincipal.btFermeture = ActivInfinitev7.pIntervenantPrincipal.addItem('btFermeture');
ActivInfinitev7.pIntervenantPrincipal.oBtnPageCourante = ActivInfinitev7.pIntervenantPrincipal.addItem('oBtnPageCourante', {"mustExist":true});

ActivInfinitev7.pServeurWebFerme = ActivInfinitev7.addPage('pServeurWebFerme', {"comment":"Weblogic Bridge Message","path":"http://infinite-haum04/mdg/auth/login"});
ActivInfinitev7.pServeurWebFerme.oMessageErreur = ActivInfinitev7.pServeurWebFerme.addItem('oMessageErreur');

ActivInfinitev7.pAdhesionsIndividuelles = ActivInfinitev7.addPage('pAdhesionsIndividuelles', {"comment":"Adhésions individuelles - haum03 - Activ Infinite - Module de gestion","path":"http://infinite-haum03/mdg/Go.do?id=ACSO01ASOA"});
ActivInfinitev7.pAdhesionsIndividuelles.oDateDebutEffet = ActivInfinitev7.pAdhesionsIndividuelles.addItem('oDateDebutEffet');
ActivInfinitev7.pAdhesionsIndividuelles.btRecherche = ActivInfinitev7.pAdhesionsIndividuelles.addItem('btRecherche');
ActivInfinitev7.pAdhesionsIndividuelles.oSelectPHarmonie = ActivInfinitev7.pAdhesionsIndividuelles.addItem('oSelectPHarmonie');
ActivInfinitev7.pAdhesionsIndividuelles.oEntiteRattachement = ActivInfinitev7.pAdhesionsIndividuelles.addItem('oEntiteRattachement', {"mustExist":true});
ActivInfinitev7.pAdhesionsIndividuelles.btNon = ActivInfinitev7.pAdhesionsIndividuelles.addItem('btNon');
ActivInfinitev7.pAdhesionsIndividuelles.btFermer = ActivInfinitev7.pAdhesionsIndividuelles.addItem('btFermer');

ActivInfinitev7.pAdhIndivIdentContrat = ActivInfinitev7.addPage('pAdhIndivIdentContrat', {"comment":"Adhésions individuelles - N°22629359 - EN COURS - haum03 - Activ Infinite - Module de gestion","path":"http://infinite-haum03/mdg/contrat/ACIC.do?method=rechercher\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACSO01ASOA_341\u0026CONTAINER_NOM_FONCTION=ACIC_100\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pAdhIndivIdentContrat.oNumeroContrat = ActivInfinitev7.pAdhIndivIdentContrat.addItem('oNumeroContrat');
ActivInfinitev7.pAdhIndivIdentContrat.btBtnSuivant = ActivInfinitev7.pAdhIndivIdentContrat.addItem('btBtnSuivant');
ActivInfinitev7.pAdhIndivIdentContrat.oNumeroExterne = ActivInfinitev7.pAdhIndivIdentContrat.addItem('oNumeroExterne');
ActivInfinitev7.pAdhIndivIdentContrat.oEcheancePrincip = ActivInfinitev7.pAdhIndivIdentContrat.addItem('oEcheancePrincip');
ActivInfinitev7.pAdhIndivIdentContrat.oGroupeGestion = ActivInfinitev7.pAdhIndivIdentContrat.addItem('oGroupeGestion');
ActivInfinitev7.pAdhIndivIdentContrat.oCentreGestion = ActivInfinitev7.pAdhIndivIdentContrat.addItem('oCentreGestion');
ActivInfinitev7.pAdhIndivIdentContrat.btSuivant = ActivInfinitev7.pAdhIndivIdentContrat.addItem('btSuivant');
ActivInfinitev7.pAdhIndivIdentContrat.btMiseEnInstance = ActivInfinitev7.pAdhIndivIdentContrat.addItem('btMiseEnInstance');
ActivInfinitev7.pAdhIndivIdentContrat.oOffre = ActivInfinitev7.pAdhIndivIdentContrat.addItem('oOffre', {"mustExist":true});
ActivInfinitev7.pAdhIndivIdentContrat.oSelectGroupeGestion = ActivInfinitev7.pAdhIndivIdentContrat.addItem('oSelectGroupeGestion', {"occurs":1});
ActivInfinitev7.pAdhIndivIdentContrat.oSelectOffre = ActivInfinitev7.pAdhIndivIdentContrat.addItem('oSelectOffre', {"occurs":1});
ActivInfinitev7.pAdhIndivIdentContrat.oSelectCentreGestion = ActivInfinitev7.pAdhIndivIdentContrat.addItem('oSelectCentreGestion', {"occurs":1});
ActivInfinitev7.pAdhIndivIdentContrat.btFermer = ActivInfinitev7.pAdhIndivIdentContrat.addItem('btFermer');

ActivInfinitev7.pAdhIndivIdPrinRech = ActivInfinitev7.addPage('pAdhIndivIdPrinRech', {"comment":"Adhésions individuelles - N°22629425 - EN COURS - haum03 - Activ Infinite - Module de gestion","path":"http://infinite-haum03/mdg/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACSO01ASOA_78\u0026CONTAINER_NOM_FONCTION=ACIN_200\u0026AFFICHAGE_CONTAINER=OK\u0026BOUTON_CONTAINER=BOUTON_SUIVANT\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACSO01ASOA_78\u0026CONTAINER_NOM_FONCTION=ACIC_100\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pAdhIndivIdPrinRech.oNom = ActivInfinitev7.pAdhIndivIdPrinRech.addItem('oNom');
ActivInfinitev7.pAdhIndivIdPrinRech.oNumeroRo = ActivInfinitev7.pAdhIndivIdPrinRech.addItem('oNumeroRo');
ActivInfinitev7.pAdhIndivIdPrinRech.oPrenom = ActivInfinitev7.pAdhIndivIdPrinRech.addItem('oPrenom');
ActivInfinitev7.pAdhIndivIdPrinRech.oDateNaissance = ActivInfinitev7.pAdhIndivIdPrinRech.addItem('oDateNaissance');
ActivInfinitev7.pAdhIndivIdPrinRech.btRechercher = ActivInfinitev7.pAdhIndivIdPrinRech.addItem('btRechercher');
ActivInfinitev7.pAdhIndivIdPrinRech.btAnnuler = ActivInfinitev7.pAdhIndivIdPrinRech.addItem('btAnnuler');

ActivInfinitev7.pAdhIndivIdPrinRechResu = ActivInfinitev7.addPage('pAdhIndivIdPrinRechResu', {"comment":"Adhésions individuelles - N°22629433 - EN COURS - haum03 - Activ Infinite - Module de gestion","path":"http://infinite-haum03/mdg/personne/RecherchePersonne.do?method=doRecherchePersonne\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACSO01ASOA_88\u0026CONTAINER_NOM_FONCTION=ACIN_200\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pAdhIndivIdPrinRechResu.oAucunePersonne = ActivInfinitev7.pAdhIndivIdPrinRechResu.addItem('oAucunePersonne');
ActivInfinitev7.pAdhIndivIdPrinRechResu.oNom = ActivInfinitev7.pAdhIndivIdPrinRechResu.addItem('oNom', {"occurs":1});
ActivInfinitev7.pAdhIndivIdPrinRechResu.btValider = ActivInfinitev7.pAdhIndivIdPrinRechResu.addItem('btValider');
ActivInfinitev7.pAdhIndivIdPrinRechResu.btAnnuler = ActivInfinitev7.pAdhIndivIdPrinRechResu.addItem('btAnnuler');

ActivInfinitev7.pAdhIndivIntervtPrin = ActivInfinitev7.addPage('pAdhIndivIntervtPrin', {"comment":"Adhésions individuelles - N°22629439 - EN COURS - haum03 - Activ Infinite - Module de gestion","path":"http://infinite-haum03/mdg/personne/RecherchePersonne.do?method=retourFonctionPrincipale\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACSO01ASOA_325\u0026CONTAINER_NOM_FONCTION=ACIN_200\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pAdhIndivIntervtPrin.oCivilite = ActivInfinitev7.pAdhIndivIntervtPrin.addItem('oCivilite');
ActivInfinitev7.pAdhIndivIntervtPrin.oNom = ActivInfinitev7.pAdhIndivIntervtPrin.addItem('oNom');
ActivInfinitev7.pAdhIndivIntervtPrin.oPrenom = ActivInfinitev7.pAdhIndivIntervtPrin.addItem('oPrenom');
ActivInfinitev7.pAdhIndivIntervtPrin.oTypeAdresse = ActivInfinitev7.pAdhIndivIntervtPrin.addItem('oTypeAdresse');
ActivInfinitev7.pAdhIndivIntervtPrin.oPaysAdresse = ActivInfinitev7.pAdhIndivIntervtPrin.addItem('oPaysAdresse');
ActivInfinitev7.pAdhIndivIntervtPrin.oCedex = ActivInfinitev7.pAdhIndivIntervtPrin.addItem('oCedex');
ActivInfinitev7.pAdhIndivIntervtPrin.oCodePostal = ActivInfinitev7.pAdhIndivIntervtPrin.addItem('oCodePostal');
ActivInfinitev7.pAdhIndivIntervtPrin.oLocalite = ActivInfinitev7.pAdhIndivIntervtPrin.addItem('oLocalite');
ActivInfinitev7.pAdhIndivIntervtPrin.oEscalierEtage = ActivInfinitev7.pAdhIndivIntervtPrin.addItem('oEscalierEtage');
ActivInfinitev7.pAdhIndivIntervtPrin.oBatimentAdresse = ActivInfinitev7.pAdhIndivIntervtPrin.addItem('oBatimentAdresse');
ActivInfinitev7.pAdhIndivIntervtPrin.oNumeroAdresse = ActivInfinitev7.pAdhIndivIntervtPrin.addItem('oNumeroAdresse', {"mustExist":true});
ActivInfinitev7.pAdhIndivIntervtPrin.oBtqAdresse = ActivInfinitev7.pAdhIndivIntervtPrin.addItem('oBtqAdresse');
ActivInfinitev7.pAdhIndivIntervtPrin.oTelephonePersonnel = ActivInfinitev7.pAdhIndivIntervtPrin.addItem('oTelephonePersonnel');
ActivInfinitev7.pAdhIndivIntervtPrin.oTelephoneProfessionne = ActivInfinitev7.pAdhIndivIntervtPrin.addItem('oTelephoneProfessionne');
ActivInfinitev7.pAdhIndivIntervtPrin.oModePaiement = ActivInfinitev7.pAdhIndivIntervtPrin.addItem('oModePaiement');
ActivInfinitev7.pAdhIndivIntervtPrin.oModeReglement = ActivInfinitev7.pAdhIndivIntervtPrin.addItem('oModeReglement');
ActivInfinitev7.pAdhIndivIntervtPrin.oFrequenceReglement = ActivInfinitev7.pAdhIndivIntervtPrin.addItem('oFrequenceReglement');
ActivInfinitev7.pAdhIndivIntervtPrin.oFrequenceAvisEcheance = ActivInfinitev7.pAdhIndivIntervtPrin.addItem('oFrequenceAvisEcheance');
ActivInfinitev7.pAdhIndivIntervtPrin.oTypeTerme = ActivInfinitev7.pAdhIndivIntervtPrin.addItem('oTypeTerme');
ActivInfinitev7.pAdhIndivIntervtPrin.oCodeEcheancier = ActivInfinitev7.pAdhIndivIntervtPrin.addItem('oCodeEcheancier');
ActivInfinitev7.pAdhIndivIntervtPrin.oDateDebutPrelevement = ActivInfinitev7.pAdhIndivIntervtPrin.addItem('oDateDebutPrelevement');
ActivInfinitev7.pAdhIndivIntervtPrin.oTitulaireRib = ActivInfinitev7.pAdhIndivIntervtPrin.addItem('oTitulaireRib');
ActivInfinitev7.pAdhIndivIntervtPrin.oCodeBanque = ActivInfinitev7.pAdhIndivIntervtPrin.addItem('oCodeBanque');
ActivInfinitev7.pAdhIndivIntervtPrin.oCodeGuichet = ActivInfinitev7.pAdhIndivIntervtPrin.addItem('oCodeGuichet');
ActivInfinitev7.pAdhIndivIntervtPrin.oCompteRib = ActivInfinitev7.pAdhIndivIntervtPrin.addItem('oCompteRib');
ActivInfinitev7.pAdhIndivIntervtPrin.oCleRib = ActivInfinitev7.pAdhIndivIntervtPrin.addItem('oCleRib');
ActivInfinitev7.pAdhIndivIntervtPrin.oNumBic = ActivInfinitev7.pAdhIndivIntervtPrin.addItem('oNumBic');
ActivInfinitev7.pAdhIndivIntervtPrin.oPaysISO = ActivInfinitev7.pAdhIndivIntervtPrin.addItem('oPaysISO');
ActivInfinitev7.pAdhIndivIntervtPrin.oCleIBAN = ActivInfinitev7.pAdhIndivIntervtPrin.addItem('oCleIBAN');
ActivInfinitev7.pAdhIndivIntervtPrin.oIdfNational = ActivInfinitev7.pAdhIndivIntervtPrin.addItem('oIdfNational');
ActivInfinitev7.pAdhIndivIntervtPrin.oDateSignature = ActivInfinitev7.pAdhIndivIntervtPrin.addItem('oDateSignature');
ActivInfinitev7.pAdhIndivIntervtPrin.oMotifCloture = ActivInfinitev7.pAdhIndivIntervtPrin.addItem('oMotifCloture');
ActivInfinitev7.pAdhIndivIntervtPrin.oSelectCodePostal = ActivInfinitev7.pAdhIndivIntervtPrin.addItem('oSelectCodePostal', {"occurs":1});
ActivInfinitev7.pAdhIndivIntervtPrin.oSelectVoie = ActivInfinitev7.pAdhIndivIntervtPrin.addItem('oSelectVoie', {"occurs":1});
ActivInfinitev7.pAdhIndivIntervtPrin.oVoieAdresse = ActivInfinitev7.pAdhIndivIntervtPrin.addItem('oVoieAdresse');
ActivInfinitev7.pAdhIndivIntervtPrin.oSelectEtablissement = ActivInfinitev7.pAdhIndivIntervtPrin.addItem('oSelectEtablissement', {"occurs":1});
ActivInfinitev7.pAdhIndivIntervtPrin.oSelectGuichet = ActivInfinitev7.pAdhIndivIntervtPrin.addItem('oSelectGuichet', {"occurs":1});
ActivInfinitev7.pAdhIndivIntervtPrin.oSelectPaysISO = ActivInfinitev7.pAdhIndivIntervtPrin.addItem('oSelectPaysISO', {"occurs":1});
ActivInfinitev7.pAdhIndivIntervtPrin.btSuivant = ActivInfinitev7.pAdhIndivIntervtPrin.addItem('btSuivant');
ActivInfinitev7.pAdhIndivIntervtPrin.oInformationRattachem = ActivInfinitev7.pAdhIndivIntervtPrin.addItem('oInformationRattachem', {"mustNotExist":true});
ActivInfinitev7.pAdhIndivIntervtPrin.oCodeCedex = ActivInfinitev7.pAdhIndivIntervtPrin.addItem('oCodeCedex');

ActivInfinitev7.pAdhIndivIntervtPrinPageErreur = ActivInfinitev7.addPage('pAdhIndivIntervtPrinPageErreur', {"comment":"Adhésions individuelles - N°22629946 - EN COURS - haum03 - Activ Infinite - Module de gestion","path":"http://infinite-haum03/mdg/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACSO01ASOA_87\u0026CONTAINER_NOM_FONCTION=ACIS_300\u0026AFFICHAGE_CONTAINER=OK\u0026BOUTON_CONTAINER=BOUTON_SUIVANT\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACSO01ASOA_87\u0026CONTAINER_NOM_FONCTION=ACIN_200\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pAdhIndivIntervtPrinPageErreur.btClosePopUp = ActivInfinitev7.pAdhIndivIntervtPrinPageErreur.addItem('btClosePopUp');
ActivInfinitev7.pAdhIndivIntervtPrinPageErreur.oPopUpTitre = ActivInfinitev7.pAdhIndivIntervtPrinPageErreur.addItem('oPopUpTitre');

ActivInfinitev7.pAdhIndivIdentAssures = ActivInfinitev7.addPage('pAdhIndivIdentAssures', {"comment":"Adhésions individuelles - N°22629534 - EN COURS - haum03 - Activ Infinite - Module de gestion","path":"http://infinite-haum03/mdg/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACSO01ASOA_695\u0026CONTAINER_NOM_FONCTION=ACIS_300\u0026AFFICHAGE_CONTAINER=OK\u0026BOUTON_CONTAINER=BOUTON_SUIVANT\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACSO01ASOA_695\u0026CONTAINER_NOM_FONCTION=ACIN_200\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pAdhIndivIdentAssures.oInformationRattachem = ActivInfinitev7.pAdhIndivIdentAssures.addItem('oInformationRattachem', {"mustExist":true});
ActivInfinitev7.pAdhIndivIdentAssures.oNomJF = ActivInfinitev7.pAdhIndivIdentAssures.addItem('oNomJF');
ActivInfinitev7.pAdhIndivIdentAssures.oSexe = ActivInfinitev7.pAdhIndivIdentAssures.addItem('oSexe');
ActivInfinitev7.pAdhIndivIdentAssures.oDateNaissance = ActivInfinitev7.pAdhIndivIdentAssures.addItem('oDateNaissance');
ActivInfinitev7.pAdhIndivIdentAssures.oSituationFamille = ActivInfinitev7.pAdhIndivIdentAssures.addItem('oSituationFamille');
ActivInfinitev7.pAdhIndivIdentAssures.oTypAssRO = ActivInfinitev7.pAdhIndivIdentAssures.addItem('oTypAssRO');
ActivInfinitev7.pAdhIndivIdentAssures.oNumRO = ActivInfinitev7.pAdhIndivIdentAssures.addItem('oNumRO');
ActivInfinitev7.pAdhIndivIdentAssures.oCleRO = ActivInfinitev7.pAdhIndivIdentAssures.addItem('oCleRO');
ActivInfinitev7.pAdhIndivIdentAssures.oCaisseRO = ActivInfinitev7.pAdhIndivIdentAssures.addItem('oCaisseRO');
ActivInfinitev7.pAdhIndivIdentAssures.oCentreRO = ActivInfinitev7.pAdhIndivIdentAssures.addItem('oCentreRO');
ActivInfinitev7.pAdhIndivIdentAssures.oRegimeRO = ActivInfinitev7.pAdhIndivIdentAssures.addItem('oRegimeRO');
ActivInfinitev7.pAdhIndivIdentAssures.oSelectRegime = ActivInfinitev7.pAdhIndivIdentAssures.addItem('oSelectRegime', {"occurs":1});
ActivInfinitev7.pAdhIndivIdentAssures.btValider = ActivInfinitev7.pAdhIndivIdentAssures.addItem('btValider');
ActivInfinitev7.pAdhIndivIdentAssures.oTextPopUp = ActivInfinitev7.pAdhIndivIdentAssures.addItem('oTextPopUp');
ActivInfinitev7.pAdhIndivIdentAssures.btNouveau = ActivInfinitev7.pAdhIndivIdentAssures.addItem('btNouveau');
ActivInfinitev7.pAdhIndivIdentAssures.btModifier = ActivInfinitev7.pAdhIndivIdentAssures.addItem('btModifier');
ActivInfinitev7.pAdhIndivIdentAssures.oTitrePopUp = ActivInfinitev7.pAdhIndivIdentAssures.addItem('oTitrePopUp');
ActivInfinitev7.pAdhIndivIdentAssures.btClosePopUp2 = ActivInfinitev7.pAdhIndivIdentAssures.addItem('btClosePopUp2');
ActivInfinitev7.pAdhIndivIdentAssures.oTeletrans = ActivInfinitev7.pAdhIndivIdentAssures.addItem('oTeletrans');
ActivInfinitev7.pAdhIndivIdentAssures.oPageIdentiSouscripteur = ActivInfinitev7.pAdhIndivIdentAssures.addItem('oPageIdentiSouscripteur');
ActivInfinitev7.pAdhIndivIdentAssures.oCommunicationsAdhere = ActivInfinitev7.pAdhIndivIdentAssures.addItem('oCommunicationsAdhere', {"mustNotExist":true});
ActivInfinitev7.pAdhIndivIdentAssures.oCivilite = ActivInfinitev7.pAdhIndivIdentAssures.addItem('oCivilite');
ActivInfinitev7.pAdhIndivIdentAssures.oTypeAssure = ActivInfinitev7.pAdhIndivIdentAssures.addItem('oTypeAssure');
ActivInfinitev7.pAdhIndivIdentAssures.btSauvegarder = ActivInfinitev7.pAdhIndivIdentAssures.addItem('btSauvegarder');
ActivInfinitev7.pAdhIndivIdentAssures.btContinuer = ActivInfinitev7.pAdhIndivIdentAssures.addItem('btContinuer');
ActivInfinitev7.pAdhIndivIdentAssures.btSuivant = ActivInfinitev7.pAdhIndivIdentAssures.addItem('btSuivant');
ActivInfinitev7.pAdhIndivIdentAssures.oTypAssAyantDroit = ActivInfinitev7.pAdhIndivIdentAssures.addItem('oTypAssAyantDroit');
ActivInfinitev7.pAdhIndivIdentAssures.oRangAttach = ActivInfinitev7.pAdhIndivIdentAssures.addItem('oRangAttach');

ActivInfinitev7.pAdhIndivIdentSouscri = ActivInfinitev7.addPage('pAdhIndivIdentSouscri', {"comment":"Adhésions individuelles - N°22629615 - EN COURS - haum03 - Activ Infinite - Module de gestion","path":"http://infinite-haum03/mdg/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACSO01ASOA_584\u0026CONTAINER_NOM_FONCTION=ACIS_300\u0026AFFICHAGE_CONTAINER=OK\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACSO01ASOA_584\u0026CONTAINER_NOM_FONCTION=ACIA_400\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pAdhIndivIdentSouscri.oPersonne = ActivInfinitev7.pAdhIndivIdentSouscri.addItem('oPersonne');
ActivInfinitev7.pAdhIndivIdentSouscri.oCommunicationsAdhere = ActivInfinitev7.pAdhIndivIdentSouscri.addItem('oCommunicationsAdhere', {"mustExist":true});
ActivInfinitev7.pAdhIndivIdentSouscri.btNouveau = ActivInfinitev7.pAdhIndivIdentSouscri.addItem('btNouveau');
ActivInfinitev7.pAdhIndivIdentSouscri.oNature = ActivInfinitev7.pAdhIndivIdentSouscri.addItem('oNature');
ActivInfinitev7.pAdhIndivIdentSouscri.oType = ActivInfinitev7.pAdhIndivIdentSouscri.addItem('oType');
ActivInfinitev7.pAdhIndivIdentSouscri.oValeurCom = ActivInfinitev7.pAdhIndivIdentSouscri.addItem('oValeurCom');
ActivInfinitev7.pAdhIndivIdentSouscri.oSelectNature = ActivInfinitev7.pAdhIndivIdentSouscri.addItem('oSelectNature', {"occurs":1});
ActivInfinitev7.pAdhIndivIdentSouscri.oSelectType = ActivInfinitev7.pAdhIndivIdentSouscri.addItem('oSelectType', {"occurs":1});
ActivInfinitev7.pAdhIndivIdentSouscri.oSelectValeur = ActivInfinitev7.pAdhIndivIdentSouscri.addItem('oSelectValeur', {"occurs":1});
ActivInfinitev7.pAdhIndivIdentSouscri.btSuivant = ActivInfinitev7.pAdhIndivIdentSouscri.addItem('btSuivant');

ActivInfinitev7.pAdhIndivIdentAssurPageErreur = ActivInfinitev7.addPage('pAdhIndivIdentAssurPageErreur', {"comment":"Adhésions individuelles - N°22629738 - EN COURS - haum03 - Activ Infinite - Module de gestion","path":"http://infinite-haum03/mdg/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACSO01ASOA_1\u0026CONTAINER_NOM_FONCTION=ACVV_1500\u0026CONTAINER_MODE_EXECUTION_VALIDATION_SCENARIO=9\u0026AFFICHAGE_CONTAINER=OK\u0026BOUTON_CONTAINER=BOUTON_ENREGISTRER\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACSO01ASOA_1\u0026CONTAINER_NOM_FONCTION=ACIA_400\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pAdhIndivIdentAssurPageErreur.oPopUpErreur = ActivInfinitev7.pAdhIndivIdentAssurPageErreur.addItem('oPopUpErreur');
ActivInfinitev7.pAdhIndivIdentAssurPageErreur.btClosePopUp = ActivInfinitev7.pAdhIndivIdentAssurPageErreur.addItem('btClosePopUp');
ActivInfinitev7.pAdhIndivIdentAssurPageErreur.oTitrePopUp = ActivInfinitev7.pAdhIndivIdentAssurPageErreur.addItem('oTitrePopUp');
ActivInfinitev7.pAdhIndivIdentAssurPageErreur.oTypAssRO = ActivInfinitev7.pAdhIndivIdentAssurPageErreur.addItem('oTypAssRO');
ActivInfinitev7.pAdhIndivIdentAssurPageErreur.oNumRO = ActivInfinitev7.pAdhIndivIdentAssurPageErreur.addItem('oNumRO');
ActivInfinitev7.pAdhIndivIdentAssurPageErreur.oCleRO = ActivInfinitev7.pAdhIndivIdentAssurPageErreur.addItem('oCleRO');
ActivInfinitev7.pAdhIndivIdentAssurPageErreur.oRegimeRO = ActivInfinitev7.pAdhIndivIdentAssurPageErreur.addItem('oRegimeRO');
ActivInfinitev7.pAdhIndivIdentAssurPageErreur.oCaisseRO = ActivInfinitev7.pAdhIndivIdentAssurPageErreur.addItem('oCaisseRO');
ActivInfinitev7.pAdhIndivIdentAssurPageErreur.oCentreRO = ActivInfinitev7.pAdhIndivIdentAssurPageErreur.addItem('oCentreRO');
ActivInfinitev7.pAdhIndivIdentAssurPageErreur.oTeletrans = ActivInfinitev7.pAdhIndivIdentAssurPageErreur.addItem('oTeletrans');
ActivInfinitev7.pAdhIndivIdentAssurPageErreur.btSauvegarder = ActivInfinitev7.pAdhIndivIdentAssurPageErreur.addItem('btSauvegarder');
ActivInfinitev7.pAdhIndivIdentAssurPageErreur.btValider = ActivInfinitev7.pAdhIndivIdentAssurPageErreur.addItem('btValider');
ActivInfinitev7.pAdhIndivIdentAssurPageErreur.btBtnContinuer = ActivInfinitev7.pAdhIndivIdentAssurPageErreur.addItem('btBtnContinuer', {"mustNotExist":true});
ActivInfinitev7.pAdhIndivIdentAssurPageErreur.btBtRecherche = ActivInfinitev7.pAdhIndivIdentAssurPageErreur.addItem('btBtRecherche', {"mustNotExist":true});
ActivInfinitev7.pAdhIndivIdentAssurPageErreur.oTypAssAyantDroit = ActivInfinitev7.pAdhIndivIdentAssurPageErreur.addItem('oTypAssAyantDroit');
ActivInfinitev7.pAdhIndivIdentAssurPageErreur.oRangAttach = ActivInfinitev7.pAdhIndivIdentAssurPageErreur.addItem('oRangAttach');

ActivInfinitev7.pAdhIndivProdGaran = ActivInfinitev7.addPage('pAdhIndivProdGaran', {"comment":"Adhésions individuelles - N°22629703 - EN COURS - haum03 - Activ Infinite - Module de gestion","path":"http://infinite-haum03/mdg/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACSO01ASOA_74\u0026CONTAINER_NOM_FONCTION=ACIP_500\u0026AFFICHAGE_CONTAINER=OK\u0026BOUTON_CONTAINER=BOUTON_SUIVANT\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACSO01ASOA_74\u0026CONTAINER_NOM_FONCTION=ACIA_400\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pAdhIndivProdGaran.btModifier = ActivInfinitev7.pAdhIndivProdGaran.addItem('btModifier');
ActivInfinitev7.pAdhIndivProdGaran.oligneAdherent = ActivInfinitev7.pAdhIndivProdGaran.addItem('oligneAdherent', {"occurs":1});
ActivInfinitev7.pAdhIndivProdGaran.oCodeProduit = ActivInfinitev7.pAdhIndivProdGaran.addItem('oCodeProduit');
ActivInfinitev7.pAdhIndivProdGaran.oSelectCodeProduit = ActivInfinitev7.pAdhIndivProdGaran.addItem('oSelectCodeProduit', {"occurs":1});
ActivInfinitev7.pAdhIndivProdGaran.btContinuer = ActivInfinitev7.pAdhIndivProdGaran.addItem('btContinuer');
ActivInfinitev7.pAdhIndivProdGaran.oValiderProduit = ActivInfinitev7.pAdhIndivProdGaran.addItem('oValiderProduit');
ActivInfinitev7.pAdhIndivProdGaran.btNouveau = ActivInfinitev7.pAdhIndivProdGaran.addItem('btNouveau');
ActivInfinitev7.pAdhIndivProdGaran.btValiderCouverture = ActivInfinitev7.pAdhIndivProdGaran.addItem('btValiderCouverture');
ActivInfinitev7.pAdhIndivProdGaran.btSuivant = ActivInfinitev7.pAdhIndivProdGaran.addItem('btSuivant');

ActivInfinitev7.pAdhIndivParamDivers = ActivInfinitev7.addPage('pAdhIndivParamDivers', {"comment":"Adhésions individuelles - N°22629854 - EN COURS - haum03 - Activ Infinite - Module de gestion","path":"http://infinite-haum03/mdg/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACSO01ASOA_68\u0026CONTAINER_NOM_FONCTION=ACPP_800\u0026AFFICHAGE_CONTAINER=OK\u0026BOUTON_CONTAINER=BOUTON_SUIVANT\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACSO01ASOA_68\u0026CONTAINER_NOM_FONCTION=ACG2_700\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pAdhIndivParamDivers.btSuivant = ActivInfinitev7.pAdhIndivParamDivers.addItem('btSuivant');

ActivInfinitev7.pAdhIndivParamCalcul = ActivInfinitev7.addPage('pAdhIndivParamCalcul', {"comment":"Adhésions individuelles - N°22629854 - EN COURS - haum03 - Activ Infinite - Module de gestion","path":"http://infinite-haum03/mdg/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACSO01ASOA_68\u0026CONTAINER_NOM_FONCTION=AC32_1000\u0026AFFICHAGE_CONTAINER=OK\u0026BOUTON_CONTAINER=BOUTON_SUIVANT\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACSO01ASOA_68\u0026CONTAINER_NOM_FONCTION=ACPD_900\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pAdhIndivParamCalcul.btSuivant = ActivInfinitev7.pAdhIndivParamCalcul.addItem('btSuivant');

ActivInfinitev7.pAdhIndivHistoDesCoti = ActivInfinitev7.addPage('pAdhIndivHistoDesCoti', {"comment":"Adhésions individuelles - N°22629854 - EN COURS - haum03 - Activ Infinite - Module de gestion","path":"http://infinite-haum03/mdg/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACSO01ASOA_68\u0026CONTAINER_NOM_FONCTION=AC3Q_1100\u0026AFFICHAGE_CONTAINER=OK\u0026BOUTON_CONTAINER=BOUTON_SUIVANT\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACSO01ASOA_68\u0026CONTAINER_NOM_FONCTION=AC32_1000\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pAdhIndivHistoDesCoti.btSuivant = ActivInfinitev7.pAdhIndivHistoDesCoti.addItem('btSuivant');

ActivInfinitev7.pAdhIndivVisuCptCotis = ActivInfinitev7.addPage('pAdhIndivVisuCptCotis', {"comment":"Adhésions individuelles - N°22629854 - EN COURS - haum03 - Activ Infinite - Module de gestion","path":"http://infinite-haum03/mdg/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACSO01ASOA_68\u0026CONTAINER_NOM_FONCTION=AC36_1200\u0026AFFICHAGE_CONTAINER=OK\u0026BOUTON_CONTAINER=BOUTON_SUIVANT\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACSO01ASOA_68\u0026CONTAINER_NOM_FONCTION=AC3Q_1100\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pAdhIndivVisuCptCotis.oValidation = ActivInfinitev7.pAdhIndivVisuCptCotis.addItem('oValidation', {"mustExist":true});
ActivInfinitev7.pAdhIndivVisuCptCotis.btSuivant = ActivInfinitev7.pAdhIndivVisuCptCotis.addItem('btSuivant');

ActivInfinitev7.pAdhIndivAvisEcheance = ActivInfinitev7.addPage('pAdhIndivAvisEcheance', {"comment":"Adhésions individuelles - N°22629854 - EN COURS - haum03 - Activ Infinite - Module de gestion","path":"http://infinite-haum03/mdg/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACSO01ASOA_68\u0026CONTAINER_NOM_FONCTION=AC3U_1300\u0026AFFICHAGE_CONTAINER=OK\u0026BOUTON_CONTAINER=BOUTON_SUIVANT\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACSO01ASOA_68\u0026CONTAINER_NOM_FONCTION=AC36_1200\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pAdhIndivAvisEcheance.btSuivant = ActivInfinitev7.pAdhIndivAvisEcheance.addItem('btSuivant');

ActivInfinitev7.pAdhIndivDemandeCarte = ActivInfinitev7.addPage('pAdhIndivDemandeCarte', {"comment":"Adhésions individuelles - N°22629854 - EN COURS - haum03 - Activ Infinite - Module de gestion","path":"http://infinite-haum03/mdg/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACSO01ASOA_68\u0026CONTAINER_NOM_FONCTION=ACEK_1400\u0026AFFICHAGE_CONTAINER=OK\u0026BOUTON_CONTAINER=BOUTON_SUIVANT\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACSO01ASOA_68\u0026CONTAINER_NOM_FONCTION=AC3U_1300\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pAdhIndivDemandeCarte.btSuivant = ActivInfinitev7.pAdhIndivDemandeCarte.addItem('btSuivant');
ActivInfinitev7.pAdhIndivDemandeCarte.oTypeDiffere = ActivInfinitev7.pAdhIndivDemandeCarte.addItem('oTypeDiffere');
ActivInfinitev7.pAdhIndivDemandeCarte.oTypePasEdition = ActivInfinitev7.pAdhIndivDemandeCarte.addItem('oTypePasEdition');

ActivInfinitev7.pAdhIndivValidActe = ActivInfinitev7.addPage('pAdhIndivValidActe', {"comment":"Adhésions individuelles - N°22629854 - EN COURS - haum03 - Activ Infinite - Module de gestion","path":"http://infinite-haum03/mdg/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACSO01ASOA_68\u0026CONTAINER_NOM_FONCTION=ACVV_1500\u0026AFFICHAGE_CONTAINER=OK\u0026BOUTON_CONTAINER=BOUTON_SUIVANT\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACSO01ASOA_68\u0026CONTAINER_NOM_FONCTION=ACEK_1400\u0026AFFICHAGE_CONTAINER"});
ActivInfinitev7.pAdhIndivValidActe.btSauvegarder = ActivInfinitev7.pAdhIndivValidActe.addItem('btSauvegarder');
