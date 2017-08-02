ctx.endScenario = function endScenario(sc, currentPage, message, comment, status) {
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

	if (!currentPage) {
		return ctx.scenarioHelper.goHomeFromUnknowPage(function(error) {
			if (error) {
				throw new Error('Error while trying to go home at scenario end ' + error.message);
			}
			return sc.endScenario();
		});
	}

	return ctx.scenarioHelper.goHome(currentPage, function(error) {
		if (error) {
			throw new Error('Error while trying to go home at scenario end ' + error.message);
		}
		return sc.endScenario();
	});
}
