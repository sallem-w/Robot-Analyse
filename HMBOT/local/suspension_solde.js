
/** Description */
/*ActivInfinitev7.scenario({ scVerificationSoldeContratSuspension: function(ev, sc) {
	
	var data = sc.data;
		sc.onTimeout(120000, function(sc, st) { 
		ctx.traceF.infoTxt(data.contratCourantSuspension.infos['RONumber']  + 'onTimeOut :  On quitte le sous scenario scVerificationSoldeContratSuspension');
		data.contratCourantSuspension.notes.commentaireContrat = 'Contrat non Traité en raison d\'un Timeout';
		data.contratCourantSuspension.notes.statusContrat = ctx.excelF.constantes.status.Echec;
		data.contratCourantSuspension.status.finSuspensionProcessus = true;
		ActivInfinitev7.pTabDeBord.start(data.webData.tabDeBordURL); // retour au Tableau de bord
		sc.endScenario(); 
	}); 
		
		sc.onError(function(sc, st, ex) { 
		ctx.traceF.infoTxt(data.contratCourantSuspension.infos['RONumber']  + 'onError :  On quitte le sous scenario scVerificationSoldeContratSuspension');
		data.contratCourantSuspension.notes.commentaireContrat = 'Contrat non Traité en raison d\'un onError';
		data.contratCourantSuspension.notes.statusContrat = ctx.excelF.constantes.status.Echec;
		data.contratCourantSuspension.status.finSuspensionProcessus = true;
		ActivInfinitev7.pTabDeBord.start(data.webData.tabDeBordURL); // retour au Tableau de bord
		sc.endScenario();	
	});

	sc.setMode(e.scenario.mode.clearIfRunning);
		// add steps here...
	sc.step(ActivInfinitev7.steps.stInitVerificationSoldeSuspension);
	sc.step(ActivInfinitev7.steps.stRechercheSoldeSuspension);
	sc.step(ActivInfinitev7.steps.stVisualisationSoldeSuspension);
	sc.step(ActivInfinitev7.steps.stFinVisualisationSoldeSuspension);
	}
});*/





ActivInfinitev7.step( { stInitVerificationSoldeSuspension : function (ev, sc, st) {
		var data = sc.data;
		ctx.traceF.infoTxt(data.contratCourantSuspension.infos['RONumber'] + ' - Début - scénario scVerificationSoldeContratSuspension');
		ctx.traceF.infoTxt(data.contratCourantSuspension.infos['RONumber'] + ' - Etape - stInitVerificationSoldeSuspension');
		ActivInfinitev7.pTabDeBord.wait(function(){
			ActivInfinitev7.pTabDeBord.btVisuCompte.click();
	    sc.endStep();
	    return;
	});
	}
});


ActivInfinitev7.step( { stRechercheSoldeSuspension : function (ev, sc, st) {
		var data = sc.data;
		ctx.traceF.infoTxt(data.contratCourantSuspension.infos['RONumber'] + ' - Début - scénario scVerificationSoldeContratSuspension');
		ctx.traceF.infoTxt(data.contratCourantSuspension.infos['RONumber'] + ' - Etape - stRechercheSoldeSuspension');
		ActivInfinitev7.pContexteContratRech.wait(function(){
			ActivInfinitev7.pContexteContratRech.oTypeIdentification.set('ACAI');
			ActivInfinitev7.pContexteContratRech.onIdentificationBenef.set(data.contratCourantSuspension.noContrat);
			ActivInfinitev7.pContexteContratRech.btRecherche.click();
	    sc.endStep();
	    return;
	});
	}
});


ActivInfinitev7.step( { stVisualisationSoldeSuspension : function (ev, sc, st) {
		var data = sc.data;
		ctx.traceF.infoTxt(data.contratCourantSuspension.infos['RONumber'] + ' - Début - scénario scVerificationSoldeContratSuspension');
		ctx.traceF.infoTxt(data.contratCourantSuspension.infos['RONumber'] + ' - Etape - stVisualisationSoldeSuspension');
		ActivInfinitev7.pContexteContratOuvert.wait(function(){
			var tousSoldes = ActivInfinitev7.pContexteContratOuvert.oSoldeGlobal.getAll();
			var toutesParts = ActivInfinitev7.pContexteContratOuvert.oPart.getAll();
			var nombreSoldes = ActivInfinitev7.pContexteContratOuvert.oPart.count();
			
			for(var index = 0 ; index < nombreSoldes ; index++)
			{
				if((toutesParts[index]).indexOf(data.constantes.adhesion)!==-1 && (tousSoldes[index].indexOf(data.constantes.moins)!==-1))
				{
					ctx.traceF.simpleTxt('Un solde négatif de ' + tousSoldes[index] + ' euros est présent');
				}
			}
			
			
	    sc.endStep();
	    return;
	});
	}
});




ActivInfinitev7.step({ stFinVisualisationSoldeSuspension: function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt(data.contratCourantSuspension.infos['RONumber'] + ' - STEP END - stFinVisualisationSoldeSuspension');
	ActivInfinitev7.pTabDeBord.start(data.webData.tabDeBordURL);
	sc.endStep();
	return ;
}});


