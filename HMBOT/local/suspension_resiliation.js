
/** Description */
ActivInfinitev7.scenario({ scResiliationContratSuspension: function(ev, sc) {
	
	var data = sc.data;
		sc.onTimeout(40000, function(sc, st) { 
		ctx.traceF.infoTxt(data.contratCourantSuspension.infos['RONumber']  + 'onTimeOut :  On quitte le sous scenario scResiliationContratSuspension');
		data.contratCourantSuspension.notes.commentaireContrat = 'Contrat non Traité en raison d\'un Timeout';
		data.contratCourantSuspension.notes.statusContrat = ctx.excelF.constantes.status.Echec;
		data.contratCourantSuspension.status.finSuspensionProcessus = true;
		ActivInfinitev7.pTabDeBord.start(data.webData.tabDeBordURL); // retour au Tableau de bord
		sc.endScenario(); 
	}); 
		
		sc.onError(function(sc, st, ex) { 
		ctx.traceF.infoTxt(data.contratCourantSuspension.infos['RONumber']  + 'onError :  On quitte le sous scenario scResiliationContratSuspension');
		data.contratCourantSuspension.notes.commentaireContrat = 'Contrat non Traité en raison d\'un onError';
		data.contratCourantSuspension.notes.statusContrat = ctx.excelF.constantes.status.Echec;
		data.contratCourantSuspension.status.finSuspensionProcessus = true;
		ActivInfinitev7.pTabDeBord.start(data.webData.tabDeBordURL); // retour au Tableau de bord
		sc.endScenario();	
	});

	sc.setMode(e.scenario.mode.clearIfRunning);
		// add steps here...
	sc.step(ActivInfinitev7.steps.stInitScResiliationContratSuspension)
	sc.step(ActivInfinitev7.steps.stGoToResiliationSuspensionContratPageDebut);
	
	sc.step(ActivInfinitev7.steps.stFinScResiliationContratSuspension);
	}
});


ActivInfinitev7.step( { stInitScVerifContratSuspension : function (ev, sc, st) {
		var data = sc.data;
		ctx.traceF.infoTxt(data.contratCourantSuspension.infos['RONumber'] + ' - Début - scénario scResiliationContratSuspension');
		ctx.traceF.infoTxt(data.contratCourantSuspension.infos['RONumber'] + ' - Etape - stInitScVerifContratSuspension');
		sc.endStep();
		return ;
	}
});



ActivInfinitev7.step( { stGoToResiliationSuspensionContratPageDebut : function (ev, sc, st) {
		var data = sc.data;
		ctx.traceF.infoTxt(data.contratCourantSuspension.infos['RONumber'] + ' - Etape - stGoToResiliationSuspensionContratPageDebut');
		ActivInfinitev7.pTabDeBord.btCongeParentSab.click();
		sc.endStep();
		return ;
	}
});



ActivInfinitev7.step( { stRechercherContratResiliationSuspension : function (ev, sc, st) {
		var data = sc.data;
		ctx.traceF.infoTxt(data.contratCourantSuspension.infos['RONumber'] + ' - Etape - stRechercherContratResiliationSuspension');
		ActivInfinitev7.pIdentContRechContratColl.oNumContratCollec.set(data.contratCourantSuspension.noContrat);
		ActivInfinitev7.pIdentContRechContratColl.oDateDebEffet.set(data.contratCourantSuspension.infos['DateExtraction'])

		sc.endStep();
		return ;
	}
});


ActivInfinitev7.step( { stFinScResiliationContratSuspension : function (ev, sc, st) {
		var data = sc.data;
    ctx.traceF.infoTxt(data.contratCourantSuspension.infos['RONumber'] + ' Etape - stFinScResiliationContratSuspension');
		ActivInfinitev7.pTabDeBord.start(data.webData.tabDeBordURL);
		sc.endScenario();
		return ;
	}
});