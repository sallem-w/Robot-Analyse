(function () {
	ActivInfinitev7.step({ saveContract: function(ev, sc, st) {
		ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - saveContract');
		if (!sc.data.config.saveUpdate) {
			return ctx.endScenario(sc);
		}
			
		ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - saveContract');
		ActivInfinitev7.pSaveUpdate.btSave.click();
		sc.data.commentContract += ' | ' + sc.data.currentScenario + ' effectuée';
		sc.data.statusContract = ctx.excelHelper.constants.status.Success;

		// Next step possible load multiple page : Dashboard / MembershipSearch / SearchContractIndiv
		ctx.scenarioHelper.waitPageChange(ActivInfinitev7.pSaveUpdate, function (error, page) {
			if (error) {
				throw error;
			}
			ctx.trace.writeInfo('waitPageChange result : ' + page);
			ctx.trace.writeInfo('waitPageChange result name : ' + page.name);
			switch(page.name) {
				case ActivInfinitev7.pDashboard.name:
				case ActivInfinitev7.pSearchContractIndiv.name:
				case ActivInfinitev7.pMembershipColSearch.name:
					sc.data.page = page.name;
					return sc.endStep();
				default:
					throw new Error('Error during save contract, waited for either ' + ActivInfinitev7.pDashboard.name + ', ' + ActivInfinitev7.pSearchContractIndiv.name + ' or ' + ActivInfinitev7.pMembershipColSearch.name + ' to load ' + 'but got ' + page.name);
			}
			
		}, [ActivInfinitev7.pDashboard, ActivInfinitev7.pSearchContractIndiv, ActivInfinitev7.pMembershipColSearch]);
	}});

	ActivInfinitev7.step({ closeContractUpdate: function(ev, sc, st) {
		ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - closeContractUpdate');
		ctx.trace.writeInfo('sc.data.page ' + sc.data.page);
		var currentPage = ActivInfinitev7.pages[sc.data.page];
		delete sc.data.page;

		return ctx.scenarioHelper.goHome(currentPage, function (error) {
			if (error) {
				return ctx.endScenario(sc, currentPage, error.message, 'Erreur durant la fermeture du contrat, merci de communiquer les logs au service technique', 'erreur');
			}
			return sc.endStep();
		});
	}});
})();
