var rootPathACS = 'C:\\Users\\RICHARD-MAX\\excel\\ACS-20170420-1\\';
var codeScenario = "ACS";

var fileNameExcelACS = 'Contrats et Assurés AccèsSanté date fin inf 30042017 CHEQUE coll non Rad....xls';
var pathFileExcelACS = rootPathACS + fileNameExcelACS;

var extensionExcelACS = ctx.fso.file.getExtensionName(fileNameExcelACS);
var fileNameOutputExcelACS =  ctx.date.formatYYYMMDD(new Date()) + "_" + codeScenario + "_" + ctx.string.left(fileNameExcelACS, fileNameExcelACS.length - extensionExcelACS.length - 1)  + "_Result" + "." + extensionExcelACS;
var pathFileOutputExcelACS = rootPathACS + fileNameOutputExcelACS;

var configExcelACS = {
	startRowIndex: 2,
	startColumnIndex: 1,
	columnIndex: {
		individualContract: 1,
		insuredName: 7,
		insuredSurName: 8,
		subscribedProduct: 10,
		ACSCertificateStartDate: 14,
		ACSCertificateEndDate: 15,
		scheduleCode: 16,
		paymentTypeLabel: 17
	}
};
