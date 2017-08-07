
var CMUExcelMap = {
	nameColumn:'1',
	surnameColumn:'2',
	contractNumberColumn:'3',
	insuredTypeColumn:'4',
	startIndividualContractDateColumn:'5',
	endIndividualContractDateColumn:'6',
	productCodeColumn:'7',
	startProductDateColumn:'8',
	endProductDateColumn:'9',
	numberOfDaysUnderSubscriptionColumn:'10',
	startParticularSituationDateColumn:'11',
	endParticularSituationDateColumn:'12',
	managementCenterCodeColumn:'13'
};

/**
* Class to store
* @Class CMUContractExcelRow
* @struct
* constructor
*/


var CMUContractExcelRow =function(rowNumber){
	this.rowNumber = rowNumber;
	this.name = String(ctx.excel.sheet.getCell(rowNumber, configExcel.CMUExcelMap.nameColumn)),
	this.surname = String(ctx.excel.sheet.getCell(rowNumber, CMUExcelMap.surnameColumn)),
	this.contractNumber = ctx.stringHelper.padLeft(ctx.string.trim(String(ctx.excel.sheet.getCell(rowNumber, CMUExcelMap.contractNumberColumn))), '00000000'),
	this.insuredType = ctx.string.trim(String(ctx.excel.sheet.getCell(rowNumber, CMUExcelMap.insuredType))),
	this.startIndividualContractDate = ctx.excel.sheet.getCell(rowNumber, CMUExcelMap.startIndividualContractDateColumn),
	this.endIndividualContractDateColumn = ctx.excel.sheet.getCell(rowNumber, CMUExcelMap.startIndividualContractDateColumn),
	this.productCode = String(ctx.excel.sheet.getCell(rowNumber, CMUExcelMap.productCodeColumn)),
	this.startProductDate = ctx.excel.sheet.getCell(rowNumber, CMUExcelMap.startProductDateColumn),
	this.endProductDate = ctx.excel.sheet.getCell(rowNumber, CMUExcelMap.endProductDateColumn),
	this.numberOfDaysUnderSubscription = String(ctx.excel.sheet.getCell(rowNumber, configExcel.CMUExcelMap.numberOfDaysUnderSubscriptionColumn)),
	this.startParticularSituationDate = ctx.excel.sheet.getCell(rowNumber, CMUExcelMap.startParticularSituationDateColumn),
	this.endParticularSituationDateColumn = ctx.excel.sheet.getCell(rowNumber,endParticularSituationDateColumn),
	this.managementCenterCode = String(ctx.excel.sheet.getCell(rowNumber, CMUExcelMap.managementCenterCodeColumn))	
}
;

/**
* Class to store
* @Class CMU_customer
* @struct
* constructor
*/





var CMU_customer= function(currentCMUContract) {
  this.rowNumber=currentCMUContract.rowNumber;
	this.name=name;
	this.surname=surname;
	this.contractNumber=contractNumber;
	this.assureType=assureType;
	this.startIndividualContractDate=startIndividualContractDate;
	this.endIndividualContractDate=endIndividualContractDate;
	this.productCode=productCode;
	this.startProductDate=startProductDate;
	this.endProductDate=endProductDate,
	this.numberOfDaysUnderSubscription=numberOfDaysUnderSubscription;
	this.startParticularSituationDate=startParticularSituationDate;
	this.endParticularSituationDate=endParticularSituationDate;
	this.managementCenterCode=managementCenterCode;
};

CMU_customer.prototype.reset = function() {
  this.rowNumber='';
	this.name='';
	this.surname='';
	this.contractNumber='';
	this.assureType='';
	this.startIndividualContractDate='';
	this.endIndividualContractDate='';
	this.productCode='';
	this.startProductDate='';
	this.endProductDate='',
	this.numberOfDaysUnderSubscription='';
	this.startParticularSituationDate='';
	this.endParticularSituationDate='';
	this.managementCenterCode='';
};



/**
* Class to store
* @Class CMU_localDataContract
* @struct
* constructor
*/

var CMU_localDataContract= {
	primary={},
	secondary=[]
};

CMU_localDataContract.prototype.set(currentExcelRow){
	//var typeA=
	
};

/**
* Class to store
* @Class CMU_localDataContract
* @struct
* constructor
*/

var CMU_onLineDataContract={
	rowNumber:0
	
	
};

/**
* Class to store
* @Class CMU_contract
* @struct
* constructor
*/

var CMU_contract = function(CMU_localDataContract,CMU_onlineDataContract,CMU_notes){
	this.CMU_localDataContract=CMU_localDataContract;
	this.CMU_onlineDatContracta=CMU_onlineDataContract;
	this.CMU_notes=CMU_notes;
};