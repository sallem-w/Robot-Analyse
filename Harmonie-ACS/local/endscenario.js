ctx.endScenario = function endScenario(sc, message, comment) {
	
	if (message) {
		ctx.trace.writeInfo(message);
	}
	
	if (comment) {
		sc.data.commentContract = comment;
		sc.data.statusContract = ctx.excelHelper.constants.status.Fail;
	}
	
	sc.data.countCaseBackToCenter += 1;
	
	if (ActivInfinitev7.pDashboard.exist())	{
		return sc.endScenario();
	}
	
	ctx.scenarioHelper.goHome(function() {
		return sc.endScenario();
	});
}
