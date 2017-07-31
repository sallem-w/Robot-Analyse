ctx.endScenario = function endScenario(sc, message, comment, status) {
	status = status || ctx.excelHelper.constants.status.Fail;
	
	if (message) {
		ctx.trace.writeInfo(message);
	}
	
	if (comment) {
		sc.data.commentContract = comment;
		sc.data.statusContract = status;
	}
	
	sc.data.countCaseBackToCenter += 1;
	
	if (ActivInfinitev7.pDashboard.exist())	{
		return sc.endScenario();
	}
	
	ctx.scenarioHelper.goHome(function(error) {
		if (error) {
			throw new Error('Error while trying to go home at scenario end ' + error.message);
		}
		return sc.endScenario();
	});
}
