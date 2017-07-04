ActivInfinitev7.step({ searchContractByINSEE : function(ev, sc, st) {
	ctx.trace.writeInfo(sc.data.contract.individualContract + ' - STEP - searchContractByINSEE');
	ActivInfinitev7.pSynthesisSearch.oTypeIdentification.set('PEIN'); // Select "N° INSEE" on list
	ActivInfinitev7.pSynthesisSearch.oBenefIdentification.set(sc.data.contract.inseeNumber);
	ActivInfinitev7.pSynthesisSearch.btSearch.click();
	ActivInfinitev7.pSynthesis.wait(function() {
		if (!ActivInfinitev7.pSynthesis.oTitlePage2.exist()) {
			var message = sc.data.contract.individualContract + ' - END SCENARIO - contract hasn\'t been found';
			var comment = 'Revoir centre: L\'utilisateur n\'as pas été trouvé.';
			ctx.endScenario(sc, message, comment);
			return;
		}
		sc.endStep();
	});
}});
