var rootPathACS = 'C:\\Users\\RICHARD-MAX\\excel\\ACS-20170420-1\\';
var codeScenario = "ACS";

var fileNameExcelACS = 'Contrats et Assurés AccèsSanté date fin inf 30042017 CHEQUE coll non Rad1....xls';
var pathFileExcelACS = rootPathACS + fileNameExcelACS;

try {
	var extensionExcelACS = ctx.fso.file.getExtensionName(fileNameExcelACS);
} catch (ex) {
	ctx.log('hum, issues during the process...'+ex.description+' [number='+ex.number+', message='+ex.message+']', e.logIconType.Error);
}

var fileNameOutputExcelACS =  ctx.date.formatYYYMMDD(new Date()) + "_" + codeScenario + "_" + ctx.string.left(fileNameExcelACS, fileNameExcelACS.length - extensionExcelACS.length - 1)  + "_Result" + "." + extensionExcelACS;
var pathFileOutputExcelACS = rootPathACS + fileNameOutputExcelACS;
