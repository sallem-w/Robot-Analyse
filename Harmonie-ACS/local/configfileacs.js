var rootPathACS = 'C:\\Users\\RICHARD-MAX\\excel\\';
var fileNameExcelACS = 'Contrats et Assurés AccèsSanté date fin inf 30042017 CHEQUE coll non Rad....xls';
var pathFileExcelACS = rootPathACS + fileNameExcelACS;

var rootOutputPathACS = 'C:\\Users\\RICHARD-MAX\\excel\\';
var fileNameOutputExcelACS = 'Contrats et Assurés AccèsSanté date fin inf 30042017 CHEQUE coll non Rad...1.xls';
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