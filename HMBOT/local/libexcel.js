ctx.excelF = (function() {
	
	var config;
	var configExcel;
	var codeScenario;
	
	var excelF = {};
	
	//Constantes
	//excelHelper.constants
	excelF.constantes = {
		status: {
			Succes: "Traité",
			Echec: "Non traité",
			DejaTraite : "Déjà Fait"
		}
	}
	//
	
	
	excelF.configExcel = function(codeScenario) {
			
		config = ctx.configF.recupConfigScenario(codeScenario);
		configExcel = config.excel;
	}
//	getHeaderFile
	excelF.modifierEntete = function() {
		var tab = [
			{ columnIndex: configExcel.indexColonne.dateTraitementContrat, value: "Date traitement contrat" },
			{ columnIndex: configExcel.indexColonne.statusContrat, value: "Status contrat" },
			{ columnIndex: configExcel.indexColonne.commentaireContrat, value: "Commentaire" }
		];
		return tab;
	}
	//startRowIndex
	excelF.debutIndexLigne = function() {
		return configExcel.debutIndexLigne - 1;
	}
	
	excelF.indexDerniereLigne = function() {
		var nligne = ctx.excel.sheet.getLastRow(ctx.excelF.conversionNomCol(configExcel.debutIndexCol) + configExcel.debutIndexLigne) - 1;
		return nligne;
	}

//	excelF.getContractRowACS = function(indexRow) {
//		if (!isValidRow(indexRow)) {
//			return undefined;
//		}
		
//		var contract = {
//			row : indexRow,
//			individualContract: ctx.stringHelper.padLeft(ctx.string.trim(String(ctx.excel.sheet.getCell(indexRow, configExcel.columnIndex.individualContract))), '00000000'),
//			insuredIdentifiant: ctx.string.trim(String(ctx.excel.sheet.getCell(indexRow, configExcel.columnIndex.insuredIdentifiant))),
//			insuredName: String(ctx.excel.sheet.getCell(indexRow, configExcel.columnIndex.insuredName)),
//			insuredSurName: String(ctx.excel.sheet.getCell(indexRow, configExcel.columnIndex.insuredSurName)),
//			subscribedCodeProduct: String(ctx.excel.sheet.getCell(indexRow, configExcel.columnIndex.subscribedCodeProduct)),
//			ACSCertificateStartDate: ctx.excel.sheet.getCell(indexRow, configExcel.columnIndex.ACSCertificateStartDate),
//			ACSCertificateEndDate: ctx.excel.sheet.getCell(indexRow, configExcel.columnIndex.ACSCertificateEndDate),
//			scheduleCode: String(ctx.excel.sheet.getCell(indexRow, configExcel.columnIndex.scheduleCode)),
//			paymentTypeLabel: String(ctx.excel.sheet.getCell(indexRow, configExcel.columnIndex.paymentTypeLabel))
//		};
		
//		return contract;
//	}

//	excelF.getContractRowCMU = function(indexRow) {
//		if (!isValidRow(indexRow)) {
//			return undefined;
//		}
		
//		var insured = [];
//		var individualContractNumber = getIndividualContractNumber(indexRow);
//		var newIndividualContractNumber = individualContractNumber;
		
//		while (newIndividualContractNumber !== undefined && individualContractNumber === newIndividualContractNumber) {
//			var contract = createInsuredObject(indexRow);
//			contract.row = indexRow;
//			contract.individualContract = individualContractNumber;
//			insured.push(contract)
			
//			indexRow += 1;
//			newnumeroContratIndiv = getIndividualContractNumber(indexRow);
//		}
//		return insured;
//	}

	//writeStats
	excelF.remplirStats = function(obj) {
		ctx.statsF.remplir(obj);
	}
	
//	function getIndividualContractNumber(index) {
//		return ctx.stringHelper.padLeft(ctx.string.trim(String(ctx.excel.sheet.getCell(index, configExcel.columnIndex.individualContract))), '00000000');
//	}
	
//	function createInsuredObject(indexOfExcel) {
//		var res = {};
//		var keys = Object.keys(configExcel.columnIndex);
//		for (var i in keys) {
//			var key = keys[i];
//			res[key] = ctx.excel.sheet.getCell(indexOfExcel, configExcel.columnIndex[key]);
//		}
//		return res;
//	}
	
//	function isValidRow(indexRow) {
//		var dateProceedContract = ctx.excel.sheet.getCell(indexRow, configExcel.columnIndex.dateProceedContract);
//		if (dateProceedContract !== undefined && ctx.string.trim(String(dateProceedContract)) !== '') {
//			return false;
//		}
		
//		return true;
//	}
	
	/// Fonctions de manipulation
	
	
//	toColumnName
excelF.conversionNomCol = function(nombre) {
	for (var ret = '', a = 1, b = 26; (nombre -= a) >= 0; a = b, b *= 26) {
		ret = String.fromCharCode(parseInt((nombre % b) / a, 10) + 65) + ret;
	}
	return ret;
};
//writeArrayObject
excelF.remplirObjetTableau = function(Index, arrayMessage) {
		for (var i in arrayMessage) {
			var message = arrayMessage[i];
			ctx.excel.sheet.setCell(Index, message.columnIndex, String(message.value));
		}
	};
//.writeArray
excelF.remplirTableau = function(rowIndex, arrayMessage) {
		for (var i in arrayMessage) {
			var message = arrayMessage[i];
			ctx.excel.sheet.setCell(rowIndex, parseInt(i) + 1, String(message));
		}
	}
//.createFile
	excelF.creerFichier = function() {
		ctx.excel.release();
		ctx.excel.initialize();
		try {
			ctx.excel.file.create();
		} catch (ex) {
			ctx.traceF.errorTxt('Impossible de créer un fichier Excel');
		}
	}
//	.openFile
	excelF.ouvertureFichier = function(chemin) {
		ctx.excel.release();
		ctx.excel.initialize();
		try {
			ctx.excel.file.open(chemin);
		} catch (ex) {
			ctx.traceF.errorTxt('Can not copy open excel file, ' + chemin);
		}
	}
	//.copyFile
	excelF.copieFichier = function(cheminFichierExcel, debutIndexLigne, remplirCol) {
		try {
			ctx.excel.file.saveAs(cheminFichierExcel); 
			ctx.excelF.remplirObjetTableau(debutIndexLigne, remplirCol);
			ctx.traceF.infoTxt(" La création du fichier résultat Excel est réussie");
		} catch (ex) {
			ctx.traceF.errorTxt('Impossible d\'enregistrer le fichier excel : ' + cheminFichierExcel);
		}
	}
	
	
excelF.sauverFichier = function(chemin) {
		try {
			if (chemin) {
				ctx.excel.file.saveAs(chemin);
			}
			else {
				ctx.excel.file.save(); 
			}
		} catch (ex) {
			ctx.traceF.errorTxt('Impossible d\'enregistrer le fichier excel');
		}
	}
	
	excelF.fermerFichier = function() {
		var feuille = ctx.excel.getWorkbooks()[0];
		ctx.excel.file.close(feuille, true);
		ctx.excel.end();
		ctx.excel.release();
	}
	
	
	return excelF;
}) ();
