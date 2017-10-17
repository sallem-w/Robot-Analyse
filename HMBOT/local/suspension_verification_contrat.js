

/** Description */
/*ActivInfinitev7.scenario({ scVerifContratSuspension: function(ev, sc) {
	
	var data = sc.data;
		sc.onTimeout(120000, function(sc, st) { 
		ctx.traceF.infoTxt(data.contratCourantSuspension.infos['RONumber']  + 'onTimeOut :  On quitte le sous scenario scVerifContratSuspension');
		data.contratCourantSuspension.notes.commentaireContrat = 'Contrat non Traité en raison d\'un Timeout';
		data.contratCourantSuspension.notes.statutsContrat = ctx.excelF.constantes.statuts.Echec;
		data.contratCourantSuspension.statuts.finSuspensionProcessus = true;
		ActivInfinitev7.pTabDeBord.start(data.webData.tabDeBordURL); // retour au Tableau de bord
		sc.endScenario(); 
	}); 
		
		sc.onError(function(sc, st, ex) { 
		ctx.traceF.infoTxt(data.contratCourantSuspension.infos['RONumber']  + 'onError :  On quitte le sous scenario scVerifContratSuspension');
		data.contratCourantSuspension.notes.commentaireContrat = 'Contrat non Traité en raison d\'un onError';
		data.contratCourantSuspension.notes.statutsContrat = ctx.excelF.constantes.statuts.Echec;
		data.contratCourantSuspension.statuts.finSuspensionProcessus = true;
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
	//sc.step(ActivInfinitev7.steps.stClickPourRetourDashbord);
	//sc.step(ActivInfinitev7.steps.stRetourDashbord);
	sc.step(ActivInfinitev7.steps.stFinScVerifContratSuspension);
	}
});*/




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
	 
		ActivInfinitev7.pContexteContOuvDet.wait(function () {
			var nombreLignes = ActivInfinitev7.pContexteContOuvDet.oTypeRelation.count();
			
			if(nombreLignes===0)
			{
				ctx.traceF.infoTxt('Pas de contrat correspondant aux critères de recherche');
				data.contratCourantSuspension.notes.commentaireContrat = 'Revoir centre: Aucun contrat correspondant aux critères de recherche';
			  data.contratCourantSuspension.noContrat ='';
				data.contratCourantSuspension.notes.statutsContrat= ctx.excelF.constantes.statuts.Succes;
				sc.endStep(ActivInfinitev7.steps.stFinScVerifContratSuspension);
			}
			else
			{
				if(data.indexLectureSynthese < nombreLignes)
				{
					if(String(ActivInfinitev7.pContexteContOuvDet.oTypeRelation.i(data.indexLectureSynthese).get()).indexOf(data.constantes.adhesionIndividuelle)!==-1 && ActivInfinitev7.pContexteContOuvDet.ostatuts.i(data.indexLectureSynthese).get() === 'A')
					{
						data.statuts.faireResiliationContrat = true;
						var listeNumeros = ActivInfinitev7.pContexteContOuvDet.btNoInsee.i(data.indexLectureSynthese).get();
						data.contratCourantSuspension.noContrat = (listeNumeros.split('/')[1]).trim();
						ActivInfinitev7.pContexteContOuvDet.oTypeIdentification.set('ACAI');
						ActivInfinitev7.pContexteContOuvDet.onIdentificationBenef.set(data.contratCourantSuspension.noContrat);
						ActivInfinitev7.pContexteContOuvDet.btRecherche.click();
						sc.endStep();
						return;
					}
					else{
						data.indexLectureSynthese++ ;
						sc.endStep(ActivInfinitev7.steps.stLectureSynthese);
						return;
					}
				}
				else
				{
					ctx.traceF.infoTxt('Aucun contrat parmi ceux proposés ne correspondnt aux critères de recherche');
					data.contratCourantSuspension.notes.commentaireContrat = 'Revoir centre: Aucun contrat correspondant aux critères de recherche';
					data.contratCourantSuspension.noContrat ='';
					data.contratCourantSuspension.notes.statutsContrat= ctx.excelF.constantes.statuts.Succes;
					sc.endStep(ActivInfinitev7.steps.stFinScVerifContratSuspension);
				}
			}
		});
	}
});

ActivInfinitev7.step( { stComparaisonNomsPrenomsAdresse : function (ev, sc, st) {
		var data = sc.data;
    ctx.traceF.infoTxt(data.contratCourantSuspension.infos['RONumber'] + ' Etape - stComparaisonNomsPrenomsAdresse');
		
		
		ActivInfinitev7.pContexteContratOuvert.wait (function () {
			var detailsPersonneFichier = data.contratCourantSuspension.infos['Nom'] + " " + data.contratCourantSuspension.infos['Prenom'] + " " + data.contratCourantSuspension.infos['Adresse'] ;
			var detailsPersonneSite = ActivInfinitev7.pContexteContratOuvert.oDetailsPersonne.get();
			if (detailsPersonneSite.indexOf(detailsPersonneFichier)===-1)
			{
			 	ctx.traceF.simpleTxt('Des différences entre le nom, prénom ou adressse dans le fichier json et le fichier Json');
			 	ctx.traceF.simpleTxt('Données du fichier : ' + detailsPersonneFichier);
			 	ctx.traceF.simpleTxt('Données du site : ' + detailsPersonneSite);
			}
		sc.endStep();
		return ;	
		});
	  
	}
});


/*ActivInfinitev7.step( { stClickPourRetourDashbord : function (ev, sc, st) {
		var data = sc.data;
    ctx.traceF.infoTxt(data.contratCourantSuspension.infos['RONumber'] + ' Etape - stClickPourRetourDashbord');
		ActivInfinitev7.pTabDeBord.btConsultation.click();
		sc.endStep();
		return ;
	}
});


ActivInfinitev7.step( { stRetourDashbord : function (ev, sc, st) {
		var data = sc.data;
    ctx.traceF.infoTxt(data.contratCourantSuspension.infos['RONumber'] + ' Etape - stRetourDashbord');
		ActivInfinitev7.pIdentContratRechConsul.wait(function(){
			ActivInfinitev7.pIdentContratRechConsul.btFermeture.click();	
		});
		sc.endStep();
		return ;
	}
});*/


ActivInfinitev7.step( { stFinScVerifContratSuspension : function (ev, sc, st) {
		var data = sc.data;
    ctx.traceF.infoTxt(data.contratCourantSuspension.infos['RONumber'] + ' Etape - stFinScVerifContratSuspension');
		ActivInfinitev7.pTabDeBord.start(data.webData.tabDeBordURL);
		sc.endStep();
		return ;
	}
});







