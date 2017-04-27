﻿// Contextor Studio
// Auto-generated declaration file : do not modify !



var ActivInfinite = ctx.addApplication('ActivInfinite', {"nature":"WEB3","path":"http://infinite-haur05/WebAneto/ValiderIdentification.do#"});

ActivInfinite.pConsultContratIndiv = ActivInfinite.addPage('pConsultContratIndiv', {"comment":"[frameInitial0] - Web Aneto","path":"http://infinite-haur05/WebAneto/ValiderIdentification.do#"});
ActivInfinite.pConsultContratIndiv.oNumeroContrat = ActivInfinite.pConsultContratIndiv.addItem('oNumeroContrat');
ActivInfinite.pConsultContratIndiv.btBtRecherche = ActivInfinite.pConsultContratIndiv.addItem('btBtRecherche', {"mustExist":true});
ActivInfinite.pConsultContratIndiv.oDateDebutEffet = ActivInfinite.pConsultContratIndiv.addItem('oDateDebutEffet');

ActivInfinite.pContratIndivFound = ActivInfinite.addPage('pContratIndivFound', {"comment":"[frameInitial0] - Web Aneto","path":"http://infinite-haur05/WebAneto/contrat/ACIC.do?method=rechercher\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCO03STSO_59\u0026CONTAINER_NOM_FONCTION=ACIC_100\u0026AFFICHAGE_CONTAINER="});
ActivInfinite.pContratIndivFound.oNumeroContrat2 = ActivInfinite.pContratIndivFound.addItem('oNumeroContrat2', {"mustExist":true});
ActivInfinite.pContratIndivFound.oBtSuivant = ActivInfinite.pContratIndivFound.addItem('oBtSuivant');
ActivInfinite.pContratIndivFound.oBtFermer = ActivInfinite.pContratIndivFound.addItem('oBtFermer');

ActivInfinite.pContractIndivNotFoun = ActivInfinite.addPage('pContractIndivNotFoun', {"comment":"[frameInitial0] - Web Aneto","path":"http://infinite-haur05/WebAneto/contrat/ACIC.do?method=rechercher\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCO03STSO_201\u0026CONTAINER_NOM_FONCTION=ACIC_100\u0026AFFICHAGE_CONTAINER="});
ActivInfinite.pContractIndivNotFoun.oErreurDetail = ActivInfinite.pContractIndivNotFoun.addItem('oErreurDetail');
ActivInfinite.pContractIndivNotFoun.oListeDesAnomalies = ActivInfinite.pContractIndivNotFoun.addItem('oListeDesAnomalies', {"mustExist":true});

ActivInfinite.pDashboard = ActivInfinite.addPage('pDashboard', {"comment":"Activ Infinite - Site 01 - SAPCTOR1 (Utilisateur)","path":"http://infinite-haur05/WebAneto/ValiderIdentification.do"});
ActivInfinite.pDashboard.btMenu = ActivInfinite.pDashboard.addItem('btMenu');
