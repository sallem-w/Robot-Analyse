

/** Description */
ActivInfinitev7.scenario({ scVerifContratSuspension: function(ev, sc) {
	
	var data = sc.data;
		sc.onTimeout(40000, function(sc, st) { 
		ctx.traceF.infoTxt(data.contratCourantSuspension.infos['RONumber']  + 'onTimeOut :  On quitte le sous scenario scVerifContratSuspension');
		data.contratCourantSuspension.notes.commentaireContrat = 'Contrat non Traité en raison d\'un Timeout';
		data.contratCourantSuspension.notes.statusContrat = ctx.excelF.constantes.status.Echec;
		data.contratCourantSuspension.status.finSuspensionProcessus = true;
		ActivInfinitev7.pTabDeBord.start(data.webData.tabDeBordURL); // retour au Tableau de bord
		sc.endScenario(); 
	}); 
		
		sc.onError(function(sc, st, ex) { 
		ctx.traceF.infoTxt(data.contratCourantSuspension.infos['RONumber']  + 'onError :  On quitte le sous scenario scVerifContratSuspension');
		data.contratCourantSuspension.notes.commentaireContrat = 'Contrat non Traité en raison d\'un onError';
		data.contratCourantSuspension.notes.statusContrat = ctx.excelF.constantes.status.Echec;
		data.contratCourantSuspension.status.finSuspensionProcessus = true;
		ActivInfinitev7.pTabDeBord.start(data.webData.tabDeBordURL); // retour au Tableau de bord
		sc.endScenario();	
	});

	sc.setMode(e.scenario.mode.clearIfRunning);
		// add steps here...
	sc.step(ActivInfinitev7.steps.stInitScVerifContratSuspension);
	sc.step(ActivInfinitev7.steps.stNavigationSyntheseSuspension);
	sc.step(ActivInfinitev7.steps.stDebutRechercheBenefSynthese);
	sc.step(ActivInfinitev7.steps.stFinRechercheBenefSynthese);
	sc.step(ActivInfinitev7.steps.stLectureSynthese);
	sc.step(ActivInfinitev7.steps.stComparaisonNomsPrenomsAdresse);
	sc.step(ActivInfinitev7.steps.stFinScVerifContratSuspension);
	}
});




/** Description */
ActivInfinitev7.step( { stInitScVerifContratSuspension : function (ev, sc, st) {
		var data = sc.data;
		ctx.traceF.infoTxt(data.contratCourantSuspension.infos['RONumber'] + ' - Début - scénario scVerifContratSuspension');
		ctx.traceF.infoTxt(data.contratCourantSuspension.infos['RONumber'] + ' - Etape - stInitScVerifContratSuspension');
		sc.endStep();
		return ;
	}
});




/** navigation au ab de bord Choisir menu consultation */
ActivInfinitev7.step( { stNavigationSyntheseSuspension : function (ev, sc, st) {
		var data = sc.data;
		ctx.traceF.infoTxt(data.contratCourantSuspension.infos['RONumber'] + ' Etape - stNavigationSyntheseSuspension');
		ActivInfinitev7.pTabDeBord.wait(function () {
			ActivInfinitev7.pTabDeBord.btContexteContrat.click();
			sc.endStep();
			return ;
		});
	}
});


/** navigation  */
ActivInfinitev7.step( { stDebutRechercheBenefSynthese : function (ev, sc, st) {
		var data = sc.data;
		ctx.traceF.infoTxt(data.contratCourantSuspension.infos['RONumber'] + ' Etape - stRechercheBenefSynthese');
		ActivInfinitev7.pContexteContratRech.wait(function () {
			ActivInfinitev7.pContexteContratRech.oRechPersDetail.click();
			sc.endStep();
			return ;
		});
	}
});


/** navigation  */
ActivInfinitev7.step( { stFinRechercheBenefSynthese : function (ev, sc, st) {
		var data = sc.data;
		ctx.traceF.infoTxt(data.contratCourantSuspension.infos['RONumber'] + ' Etape - stFinRechercheBenefSynthese');
		ActivInfinitev7.pContContratRechDet.wait(function () {
			ActivInfinitev7.pContContratRechDet.oNoInsee.set(data.contratCourantSuspension.infos['RONumber']);
			ActivInfinitev7.pContContratRechDet.btRechDetaillee.click();
			sc.endStep();
			return ;
		});
	}
});



ActivInfinitev7.step( { stLectureSynthese : function (ev, sc, st) {
		var data = sc.data;
		ctx.traceF.infoTxt(data.contratCourantSuspension.infos['RONumber'] + ' Etape - stLectureSynthese');
		ActivInfinitev7.pContexteContratOuvert.wait(function () {
			var index = 0;
			var listeLignes = ActivInfinitev7.pContexteContratOuvert.oPersonneDetailsTab.getAll();
			var nombreLignes = ActivInfinitev7.pContexteContratOuvert.oPersonneDetailsTab.count();
			if(nombreLignes==0)
			{
				ctx.traceF.infoTxt('Pas de contrat correspondant aux critères de recherche');
				sc.endStep(ActivInfinitev7.steps.stFinScVerifContratSuspension);
			}
			else
			{
				
				if(index < nombreLignes)
				{
					if(ActivInfinitev7.pContexteContratOuvert.oTypeRelation.i(index)== 'Adhésion indiv.' && ActivInfinitev7.pContexteContratOuvert.oStatus.i(index) == 'A')
					{
						data.status.faireResiliationContrat = true;
						ActivInfinitev7.pContexteContratOuvert.btNoInsee.i(index).click();
						sc.endStep()
					return;
					}
					else{
						index ++;
					}
				}
				else
				{
					ctx.traceF.infoTxt('Pas de contrat correspondant aux critères de recherche');
					sc.endStep(ActivInfinitev7.steps.stFinScVerifContratSuspension);
				}
			}
			sc.endStep();
			return ;
		});
	}
});

ActivInfinitev7.step( { stComparaisonNomsPrenomsAdresse : function (ev, sc, st) {
		var data = sc.data;
    ctx.traceF.infoTxt(data.contratCourantSuspension.infos['RONumber'] + ' Etape - stComparaisonNomsPrenomsAdresse');
		var detailsPersonneFichier = data.contratCourantSuspension.infos['Nom'] + " " + data.contratCourantSuspension.infos['Prenom'] +
		data.contratCourantSuspension.infos['Adresse'];
		var detailsPersonneSite = ActivInfinitev7.pContexteContratOuvert.oPersonneDetails.get();
		
	  if (!detailsPersonneSite.indexOf(detailsPersonneFichier))
		{
			 ctx.traceF.infoTxt('Des différences entre le nom, prénom ou adressse dans le fichier json et le fichier Json');
			 ctx.traceF.infoTxt('Données du fichier:' + detailsPersonneFichier);
			 ctx.traceF.infoTxt('Données du site:' + detailsPersonneSite);
		}
	
		sc.endScenario();
		return ;
	}
});


ActivInfinitev7.step( { stFinScVerifContratSuspension : function (ev, sc, st) {
		var data = sc.data;
    ctx.traceF.infoTxt(data.contratCourantSuspension.infos['RONumber'] + ' Etape - stFinScVerifContratSuspension');
		sc.endScenario();
		return ;
	}
});





