// Contextor Studio
// Auto-generated declaration file : do not modify !



var ActivInfinite = ctx.addApplication('ActivInfinite', {"nature":"WEB3","path":"http://infinite-haur05/WebAneto/ValiderIdentification.do#"});

ActivInfinite.pConsultContratIndiv = ActivInfinite.addPage('pConsultContratIndiv', {"comment":"[frameInitial0] - Web Aneto","path":"http://infinite-haur05/WebAneto/ValiderIdentification.do#"});
ActivInfinite.pConsultContratIndiv.oIndividualContract = ActivInfinite.pConsultContratIndiv.addItem('oIndividualContract');
ActivInfinite.pConsultContratIndiv.btSearch = ActivInfinite.pConsultContratIndiv.addItem('btSearch', {"mustExist":true});
ActivInfinite.pConsultContratIndiv.oDateContract = ActivInfinite.pConsultContratIndiv.addItem('oDateContract');

ActivInfinite.pContratIndivFound = ActivInfinite.addPage('pContratIndivFound', {"comment":"[frameInitial0] - Web Aneto","path":"http://infinite-haur05/WebAneto/contrat/ACIC.do?method=rechercher\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCO03STSO_59\u0026CONTAINER_NOM_FONCTION=ACIC_100\u0026AFFICHAGE_CONTAINER="});
ActivInfinite.pContratIndivFound.oIndividualContract = ActivInfinite.pContratIndivFound.addItem('oIndividualContract', {"mustExist":true});
ActivInfinite.pContratIndivFound.oBtNext = ActivInfinite.pContratIndivFound.addItem('oBtNext');
ActivInfinite.pContratIndivFound.oBtClose = ActivInfinite.pContratIndivFound.addItem('oBtClose');
ActivInfinite.pContratIndivFound.btNavigateBlockNote = ActivInfinite.pContratIndivFound.addItem('btNavigateBlockNote');

ActivInfinite.pContractIndivNotFoun = ActivInfinite.addPage('pContractIndivNotFoun', {"comment":"[frameInitial0] - Web Aneto","path":"http://infinite-haur05/WebAneto/contrat/ACIC.do?method=rechercher\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCO03STSO_201\u0026CONTAINER_NOM_FONCTION=ACIC_100\u0026AFFICHAGE_CONTAINER="});
ActivInfinite.pContractIndivNotFoun.oDetailError = ActivInfinite.pContractIndivNotFoun.addItem('oDetailError');
ActivInfinite.pContractIndivNotFoun.oTitlePage = ActivInfinite.pContractIndivNotFoun.addItem('oTitlePage', {"mustExist":true});
ActivInfinite.pContractIndivNotFoun.oBtClose = ActivInfinite.pContractIndivNotFoun.addItem('oBtClose');

ActivInfinite.pDashboard = ActivInfinite.addPage('pDashboard', {"comment":"Activ Infinite - Site 01 - SAPCTOR1 (Utilisateur)","path":"http://infinite-haur05/WebAneto/ValiderIdentification.do"});
ActivInfinite.pDashboard.btMenu = ActivInfinite.pDashboard.addItem('btMenu');

ActivInfinite.pBlockNotes = ActivInfinite.addPage('pBlockNotes', {"comment":"[frameInitial0] - Web Aneto","path":"http://infinite-haur05/WebAneto/container/LancementFonction.do?method=debuter\u0026CONTAINER_NOM_SCENARIO_ENREGISTREMENT=ACCO03STSO_139\u0026CONTAINER_NOM_FONCTION=ACBN_102\u0026AFFICHAGE_CONTAINER=OK\u0026CONTAINER_FONCTION_FORCAGE_VALIDATION=FALSE"});
ActivInfinite.pBlockNotes.oBlockNotes = ActivInfinite.pBlockNotes.addItem('oBlockNotes', {"mustExist":true});
ActivInfinite.pBlockNotes.oContentBlockNote = ActivInfinite.pBlockNotes.addItem('oContentBlockNote');
ActivInfinite.pBlockNotes.oBtClose = ActivInfinite.pBlockNotes.addItem('oBtClose');
ActivInfinite.pBlockNotes.btProductList = ActivInfinite.pBlockNotes.addItem('btProductList');
