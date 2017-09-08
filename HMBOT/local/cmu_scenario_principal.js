
/** Description */
ActivInfinitev7.scenario( { CMUScenarioPrincipal: function (ev, sc) {
		var data = sc.data;
		sc.onTimeout(30000, function (sc, st) {
			sc.endScenario();
		}); // default timeout handler for each step
		sc.onError(function (sc, st, ex) {
			sc.endScenario();
		}); // default error handler
		sc.setMode(e.scenario.mode.clearIfRunning);
		
		// add steps here...
		sc.step(ActivInfinitev7.steps.stInitScenarioCMU);
		sc.step(ActivInfinitev7.steps.stServerConnexionCMU);
		sc.step(ActivInfinitev7.steps.stInitSelectContratCMUExcel);
		sc.step(ActivInfinitev7.steps.stSelectCMUContratCMUExcel);
		sc.step(ActivInfinitev7.steps.stLireDonneesCMUExcel);
		sc.step(ActivInfinitev7.steps.stVerifExistanceAssurePrincipal);
		sc.step(ActivInfinitev7.steps.stConsultationContratCMU);
//		sc.step(ActivInfinitev7.steps.stFinScenarioCMU);
		sc.step(ActivInfinitev7.steps.stMiseAjourVarGloblales);
		sc.step(ActivInfinitev7.steps.stInsertDonneesCMUExcel);
		sc.step(ActivInfinitev7.steps.stContratCMUSuivant);
		sc.step(ActivInfinitev7.steps.stFinScenarioCMU);

	}
});


/** Description */
ActivInfinitev7.step({ stInitScenarioCMU : function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Début étape - stInitScenarioCMU');
	data=ctx.dataF.initialisationScenarioCMU();//ctx.dataF.initialisationScenario(ctx.configF.scenario.CMU);
	data.scenarioCode = ctx.configF.scenario.CMU;
  ctx.log('Récupération des données du config');
	ctx.configF.init(data.scenarioCode);
	ctx.excelF.initConfig(data.scenarioCode);
	data.config = ctx.configF.recupConfigScenario(data.scenarioCode);
	data.configExcel = data.config.excel;
	data.globalVariables.currentRow = data.configExcel.startRowIndex;
	
	ctx.traceF.infoTxt('Ouverture du fichier : ' +  ctx.configFile.getPathFile());
	ctx.excelHelper.openFile(ctx.configFile.getPathFile());
	data.globalVariables.indexLastRow = ctx.excelFile.getLastIndexRow();
	ctx.traceF.infoTxt('Création du fichier résultat');	
	ctx.excelHelper.copyFile(ctx.configFile.getPathFileOutput(), ctx.excelFile.startRowIndex(), ctx.excelFile.getHeaderFile());
	ctx.log('fichier résultat créé');
	
	sc.endStep();
	return;
}});


/** Description */
ActivInfinitev7.step({ stServerConnexionCMU : function(ev, sc, st) {
	var data = sc.data;
	ctx.trace.infoTxt('Début étape - stServerConnexionCMU');
		if (ActivInfinitev7.pWebServerClosed.exist() && ActivInfinitev7.pWebServerClosed.oFailureOfServerAPA.exist()) {
			ctx.traceF.infoTxt('Le serveur Infinite est fermé');
			ctx.popupF.newPopup('Le serveur Infinite est fermé');
			return ;
		}

		if (!ActivInfinitev7.pConnexion.exist()) {
			ctx.traceF.infoTxt('Open Infinite on connection page');
			ctx.popupF.newPopup('Il faut ouvrir et rentrer ces identifiants dans Infinite');
			return ;
		}

//		data.webData.url = ActivInfinitev7.pConnexion.getInfos().location.href;
//		data.webData.login = ActivInfinitev7.pConnexion.oIdentifiant.get();
//		data.webData.password = ActivInfinitev7.pConnexion.oPwd.get();
		
		//on entre dans Infinite
		ActivInfinitev7.pConnexion.btLogin.click();
		ActivInfinitev7.pTabDeBord.wait(function(ev) {
		var infos = ActivInfinitev7.pTabDeBord.getInfos();
		data.webData.dashboardURL=infos.document.URL;
		ctx.log('url of dashboard : ' + data.webData.dashboardURL);
			sc.endStep();
			return;
		});
}
});


/** Description */
ActivInfinitev7.step({ stInitSelectContratCMUExcel : function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Début étape - stInitSelectCMUContractFromExcel');
	
//	data.scenarioCode = ctx.configF.scenario.CMU;
//  ctx.log('Récupération des données du config');
//	ctx.configF.init(data.scenarioCode);
//	ctx.excelF.initConfig(data.scenarioCode);
//	data.config = ctx.configF.recupConfigScenario(data.scenarioCode);
//	data.configExcel = data.config.excel;
//	data.globalVariables.currentRow = data.configExcel.startRowIndex;
	
//	ctx.traceF.infoTxt('Ouverture du fichier : ' +  ctx.configFile.getPathFile());
//	ctx.excelHelper.openFile(ctx.configFile.getPathFile());
//	data.globalVariables.indexLastRow = ctx.excelFile.getLastIndexRow();
//	ctx.traceF.infoTxt('Création du fichier résultat');	
//	ctx.excelHelper.copyFile(ctx.configFile.getPathFileOutput(), ctx.excelFile.startRowIndex(), ctx.excelFile.getHeaderFile());
//	ctx.log('fichier résultat créé');
	sc.endStep();
	return;
}});


/** ce step consiste à parcurir le fichier excel et récupérer les lignes qui ont le meme numéro du contrat (dictionaire) */
ActivInfinitev7.step({ stSelectCMUContratCMUExcel : function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Début étape - stSelectCMUContract');
	ctx.traceF.infoTxt('Sélection du contrat numéro: '+ data.globalVariables.currentRow);
	sc.endStep();
  return;
}});



/** Description */
ActivInfinitev7.step({ stLireDonneesCMUExcel : function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Début étape - stReadCMUDataFromExcel');
	 
	var temp=ctx.tempContratF;
	/** numéro du contrat */
	data.contratCourantCMU.localData.individualContractNumber = ctx.stringF.remplissageGauche(ctx.string.trim(String(ctx.excel.sheet.getCell(data.globalVariables.currentRow, data.configExcel.columnIndex.individualContract))), '00000000');
	/** dans une boucle on récupère l'assuré principale et les bénéficiaires */
	var individualContractNumber = data.contratCourantCMU.localData.individualContractNumber;
	var newIndividualContractNumber = individualContractNumber;
	ctx.log('current row: '+data.globalVariables.currentRow);
  // Réinitialisation du dictionnaire
	data.contratCourantCMU.localData.dictContratsCourantCMU = [];
	data.temp_contract = {};
	while (newIndividualContractNumber !== undefined && individualContractNumber === newIndividualContractNumber) {
			//récupération des champs (type, .....)
		  // contrat.typeAssure = ctx.excel.sheet.getCell(data.globalVariables.currentRow, data.configExcel.columnIndex.type);
		  data.temp_contract.codeProduit = ctx.excel.sheet.getCell(data.globalVariables.currentRow, data.configExcel.columnIndex.suscribedCodeProduct);
		  data.temp_contract.dateDebEffContrat = ctx.excel.sheet.getCell(data.globalVariables.currentRow, data.configExcel.columnIndex.icStartDate);
			data.temp_contract.dateFinEffContrat = ctx.excel.sheet.getCell(data.globalVariables.currentRow, data.configExcel.columnIndex.icEndDate);
	    data.temp_contract.typeAssure = ctx.excel.sheet.getCell(data.globalVariables.currentRow, data.configExcel.columnIndex.type);
		
			ctx.log('type contrat: '+data.temp_contract.typeAssure);
		
		  data.contratCourantCMU.localData.dictContratsCourantCMU.push(data.temp_contract);
			
		  data.globalVariables.currentRow+=1;
			newIndividualContractNumber = ctx.stringF.remplissageGauche(ctx.string.trim(String(ctx.excel.sheet.getCell(data.globalVariables.currentRow, data.configExcel.columnIndex.individualContract))), '00000000');
	}
	ctx.log('numéro courant: '+individualContractNumber);
//	if(data.globalVariables.currentRow < data.globalVariables.indexLastRow){
//		sc.endStep(ActivInfinitev7.steps.stSelectCMUContractFromExcel);
//		return;
//	}
	sc.endStep();
	return;
}});



/** ce step permet de vérifier dans le dictionnaire l'existance de l'assuré principal, sil existe on lance le sous scénario scVerifContratCMU sinon on exécute le sous sc finCMU  */
ActivInfinitev7.step({ stVerifExistanceAssurePrincipal : function(ev, sc, st) {
	var data = sc.data;
	//ctx.trace
	//vérifier si le cotrat est vide ou non et insérer date, statu, comme dans le fichier excel resultat puis passer au contrat suivant.
	
	sc.endStep();
	return;
}});



/** step qui lance le sous scénario de vérification des données cmu */
ActivInfinitev7.step({ stConsultationContratCMU : function(ev, sc, st) {
	var data = sc.data;
	//ctx.trace
	//appeler le sous scénario : scVerifContratCMU
	sc.endStep();
	return;
}});





/** Step : Mise à jour des données globales ( stats ) */
ActivInfinitev7.step( { stMiseAjourVarGloblales: function (ev, sc, st) {
		var data = sc.data;
		ctx.trace.writeInfo(data.currentContractACS.localData.individualContractNumber  + ' stUpdatesACSGlobalInfos ');
		data.stats.countCaseProcessed +=1;
		data.stats.countCaseFindIntoExcel = data.globalVariables.indexLastRow  - data.configExcel.startRowIndex + 1;
		// (pas besoin de mettre à jour celle là) stats.countCaseReadyToRemove = sc.data.countCaseReadyToRemove;
		
		
		if (data.currentContractACS.notes.statusContract === ctx.excelHelper.constants.status.Success) {
				data.stats.countCaseSuccessProcessed += 1;
		}

		if (data.currentContractACS.notes.statusContract === ctx.excelHelper.constants.status.Fail) {
				data.stats.countCaseFailProcessed += 1;
		}
		
		if (data.currentContractACS.notes.commentContract.indexOf('centre')!==-1)
		{
			data.stats.countCaseBackToCenter +=1;
		}


		sc.endStep();
		return ;
	}
});



/** Description */
ActivInfinitev7.step({ stInsertDonneesCMUExcel: function(ev, sc, st) {
	var data = sc.data;
	
	sc.endStep();
	return;
}});



/** Description */
ActivInfinitev7.step({ stContratCMUSuivant: function(ev, sc, st) {
	var data = sc.data;
	
	sc.endStep();
	return;
}});


/** Description */
ActivInfinitev7.step({ stFinScenarioCMU : function(ev, sc, st) {
	var data = sc.data;
	
	sc.endScenario();
	return;
}});


