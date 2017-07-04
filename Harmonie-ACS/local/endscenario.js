ctx.endScenario = function endScenario(sc, message, comment) {
	if (message) {
		ctx.trace.writeInfo(message);
	}
	if (comment) {
		sc.data.commentContract = comment;
		sc.data.statusContract = ctx.excelHelper.constants.status.Fail;
	}
	sc.data.countCaseBackToCenter += 1;
	ctx.scenarioHelper.goHome(function() {
		sc.endScenario();
	});
}
