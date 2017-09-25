
/** Description */
ActivInfinitev7.step({ stImporterDonneesExcelAdhesion : function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape - stImporterDonneesExcelAdhesion');
	 
	var temp_contrat=ctx.dataF.contratAdhesionAttributs;
	 var temp_ligne=data.varGlobales.ligneCourante;
	// on récupère les infos de toutes les lignes associées à la demande d'adhesion
	var numeroSeq= ctx.excel.sheet.getCell(data.varGlobales.ligneCourante, data.scenarioConfig.Adhesion.excel.indexColonne.NUM_SEQ_CT);
	var tmpNumeroSeq=numeroSeq;
	ctx.log('current row: '+data.varGlobales.ligneCourante);
//	data.temp_contract = {};
	while (numeroSeq !== undefined && numeroSeq === tmpNumeroSeq) {
		temp_contrat.NUM_SEQ_CT = numeroSeq;
		temp_contrat.DISCRIMINANT = ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.Adhesion.excel.indexColonne.DISCRIMINANT);
		temp_contrat.DATE_DEBUT_EFFET = ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.Adhesion.excel.indexColonne.DATE_DEBUT_EFFET);
		temp_contrat.TYPE_ASSURE = ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.Adhesion.excel.indexColonne.TYPE_ASSURE);
		temp_contrat.CONTACT_SEX = ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.Adhesion.excel.indexColonne.CONTACT_SEX);
		temp_contrat.BRTH_DAY_GREG = ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.Adhesion.excel.indexColonne.BRTH_DAY_GREG);
		temp_contrat.SITUATION_FAMILLE = ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.Adhesion.excel.indexColonne.SITUATION_FAMILLE);
		temp_contrat.CAT_SOCIALE = ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.Adhesion.excel.indexColonne.CAT_SOCIALE);
		temp_contrat.CONTACT_NOM = ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.Adhesion.excel.indexColonne.CONTACT_NOM);
		temp_contrat.CONTACT_PRENOM = ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.Adhesion.excel.indexColonne.CONTACT_PRENOM);
		temp_contrat.NOM_JEUNE_FILLE = ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.Adhesion.excel.indexColonne.NOM_JEUNE_FILLE);
		temp_contrat.COMP_IDENT_DEST = ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.Adhesion.excel.indexColonne.COMP_IDENT_DEST);
		temp_contrat.COMP_IDENTIF_GEO = ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.Adhesion.excel.indexColonne.COMP_IDENTIF_GEO);
		temp_contrat.NUMERO_VOIE = ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.Adhesion.excel.indexColonne.NUMERO_VOIE);
		temp_contrat.COMP_NUM_VOIE = ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.Adhesion.excel.indexColonne.COMP_NUM_VOIE);
		temp_contrat.ADRESSE_NAT_VOIE = ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.Adhesion.excel.indexColonne.ADRESSE_NAT_VOIE);
		temp_contrat.LIBELLE_VOIE = ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.Adhesion.excel.indexColonne.LIBELLE_VOIE);
		temp_contrat.LIBELLE_LIEU_DIT = ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.Adhesion.excel.indexColonne.LIBELLE_LIEU_DIT);
		temp_contrat.CODE_POSTAL = ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.Adhesion.excel.indexColonne.CODE_POSTAL);
		temp_contrat.LIBELLE_LOCALITE = ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.Adhesion.excel.indexColonne.LIBELLE_LOCALITE);
		temp_contrat.CODE_CEDEX = ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.Adhesion.excel.indexColonne.CODE_CEDEX);
		temp_contrat.NOM_BUREAU_CEDEX = ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.Adhesion.excel.indexColonne.NOM_BUREAU_CEDEX);
		temp_contrat.DEPARTEMENT = ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.Adhesion.excel.indexColonne.DEPARTEMENT);
		temp_contrat.CODE_PAYS = ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.Adhesion.excel.indexColonne.CODE_PAYS);
		temp_contrat.CODE_RNVP = ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.Adhesion.excel.indexColonne.CODE_RNVP);
		temp_contrat.TEL_DOM = ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.Adhesion.excel.indexColonne.TEL_DOM);
		temp_contrat.TEL_PRO = ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.Adhesion.excel.indexColonne.TEL_PRO);
		temp_contrat.TEL_POR = ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.Adhesion.excel.indexColonne.TEL_POR);
		temp_contrat.ADDR_MAIL = ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.Adhesion.excel.indexColonne.ADDR_MAIL);
		temp_contrat.FAX = ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.Adhesion.excel.indexColonne.FAX);
		temp_contrat.FAX = ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.Adhesion.excel.indexColonne.FAX);
		temp_contrat.FAX = ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.Adhesion.excel.indexColonne.FAX);
		temp_contrat.FAX = ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.Adhesion.excel.indexColonne.FAX);
		temp_contrat.FAX = ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.Adhesion.excel.indexColonne.FAX);
		temp_contrat.FAX = ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.Adhesion.excel.indexColonne.FAX);
		temp_contrat.FAX = ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.Adhesion.excel.indexColonne.FAX);
		temp_contrat.FAX = ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.Adhesion.excel.indexColonne.FAX);
		temp_contrat.FAX = ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.Adhesion.excel.indexColonne.FAX);
		temp_contrat.FAX = ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.Adhesion.excel.indexColonne.FAX);
temp_contrat.FAX = ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.Adhesion.excel.indexColonne.FAX);

		temp_contrat.FAX = ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.Adhesion.excel.indexColonne.FAX);
		temp_contrat.FAX = ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.Adhesion.excel.indexColonne.FAX);
		temp_contrat.FAX = ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.Adhesion.excel.indexColonne.FAX);
		  temp_contract.codeProduit = ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.Adhesion.excel.indexColonne.codeProduitSouscrit);
		  temp_contract.dateDebEffContrat = ctx.excel.sheet.getCell(temp_ligne,data.scenarioConfig.Adhesion.excel.indexColonne.dateDebutEffetProduitSouscrit);
			temp_contract.dateFinEffContrat = ctx.excel.sheet.getCell(temp_ligne,data.scenarioConfig.Adhesion.excel.indexColonne.dateFinEffetProduitSouscrit);
	    temp_contract.typeAssure = ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.Adhesion.excel.indexColonne.type);
		  temp_contract.dateFinEffSituatParti = ctx.excel.sheet.getCell(temp_ligne,data.scenarioConfig.Adhesion.excel.indexColonne.dateFinSituationParticuliere);
		
		  //
			ctx.log('type contrat: '+temp_contract.typeAssure);
		  if(temp_contract.typeAssure === ctx.configF.constantes.ASSPRI){
				data.contratCourantAdhesion.dataLocale.dateFinEffSituatParti = temp_contract.dateFinEffSituatParti;
			}
		  data.contratCourantAdhesion.dataLocale.dictContratsCourantAdhesion.push(temp_contract);
		  temp_ligne+=1;
			tempNumContratIndiv = ctx.stringF.remplissageGauche(ctx.string.trim(String(ctx.excel.sheet.getCell(temp_ligne,data.scenarioConfig.Adhesion.excel.indexColonne.numeroContratIndiv))), '00000000');
	}
//	ctx.log('numéro courant: '+ numContratIndiv);
	ctx.log('ligne Courante: '+ data.varGlobales.ligneCourante);
//	if(data.varGlobales.ligneCourante < data.varGlobales.indexLastRow){
//		sc.endStep(ActivInfinitev7.steps.stSelectAdhesionContractFromExcel);
//		return;
//	}
	sc.endStep();
	return;
}});