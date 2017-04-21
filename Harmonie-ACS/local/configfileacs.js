var rootPathACS = 'C:\\Users\\RICHARD-MAX\\excel\\ACS-20170420-1\\';
var codeScenario = "ACS";

var fileNameExcelACS = 'Contrats et Assurés AccèsSanté date fin inf 30042017 CHEQUE coll non Rad....xls';
var pathFileExcelACS = rootPathACS + fileNameExcelACS;
var extensionExcelACS = ctx.fso.file.getExtensionName(fileNameExcelACS);

var fileNameOutputExcelACS =  ctx.date.formatYYYMMDD(new Date()) + "_" + codeScenario + "_" + ctx.string.left(fileNameExcelACS, fileNameExcelACS.length - extensionExcelACS.length - 1)  + "_Result" + "." + extensionExcelACS;
var pathFileOutputExcelACS = rootPathACS + fileNameOutputExcelACS;
