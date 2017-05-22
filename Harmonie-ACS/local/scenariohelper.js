
function contractNotFoundEvent(sc, callBack) {

	ActivInfinite.pContractIndivNotFoun.events.LOAD.on(function() {
		ctx.trace.writeInfo(sc.data.contract.individualContract + ' - END SCENARIO - contract not found');
		
		sc.data.commentContract = ActivInfinite.pContractIndivNotFoun.oDetailError.get() + '\n';
		sc.data.statusContract = ctx.excelHelper.constants.status.Fail;
		ActivInfinite.pContractIndivNotFoun.oBtClose.click();
		callBack();
	});
}

function closePopupEvent(callBack) {
	ActivInfinite.pPopupCloseEffect.events.LOAD.on(function() {
		ActivInfinite.pPopupCloseEffect.btNo.click();				
		callBack();
	});
}