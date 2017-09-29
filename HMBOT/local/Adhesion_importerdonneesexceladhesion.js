
/** Description */
ActivInfinitev7.step({ stImporterDonneesExcelAdhesion : function(ev, sc, st) {
	var data = sc.data;
	ctx.traceF.infoTxt('Etape - stImporterDonneesExcelAdhesion');
	var configAdhesion = new confFileAdhesionClass();
	var contratAdhesionAttributs = configAdhesion.ADHESION.excel.indexColonne;
	var temp_contrat=contratAdhesionAttributs;
	var temp_ligne=data.varGlobales.ligneCourante;
	// on récupère les infos de toutes les lignes associées à la demande d'adhesion
	var numeroSeq= ctx.excel.sheet.getCell(data.varGlobales.ligneCourante, data.scenarioConfig.Adhesion.excel.indexColonne.NUM_SEQ_CT);
	ctx.log('Gamme : '+ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.Adhesion.excel.indexColonne.GAMME))
	data.contratCourantAdhesion.dataLocale.contratAdhesionAttributs.GAMME = ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.Adhesion.excel.indexColonne.GAMME);
	data.contratCourantAdhesion.dataLocale.contratAdhesionAttributs.contexteAnalyseStoppee = ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.Adhesion.excel.indexColonne.contexteAnalyseStoppee);
	data.contratCourantAdhesion.dataLocale.contratAdhesionAttributs.DATE_DEBUT_EFFET=ctx.dateF.formatDateGRC(String(ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.Adhesion.excel.indexColonne.DATE_DEBUT_EFFET)));
	data.contratCourantAdhesion.dataLocale.contratAdhesionAttributs.DISCRIMINANT = ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.Adhesion.excel.indexColonne.DISCRIMINANT);
	data.contratCourantAdhesion.dataLocale.contratAdhesionAttributs.NUM_EXT_CTT = ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.Adhesion.excel.indexColonne.NUM_EXT_CTT);
	if( numeroSeq == undefined){
		ctx.traceF.infoTxt(' Le numero de Seq est vide');
		sc.endStep(ActivInfinitev7.steps.stContratAdhesionSuivant);
		return;
	}
	else{
		data.contratCourantAdhesion.dataLocale.NUM_SEQ_CT=numeroSeq;
	var tmpNumeroSeq=numeroSeq;
	ctx.log('Ligne courante : '+data.varGlobales.ligneCourante);
	ctx.log('numeroSeq : '+ numeroSeq);
	while (numeroSeq !== undefined && numeroSeq === tmpNumeroSeq) {
		temp_contrat.NUM_SEQ_CT = numeroSeq;
		temp_contrat.DISCRIMINANT = ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.Adhesion.excel.indexColonne.DISCRIMINANT);
		temp_contrat.DATE_DEBUT_EFFET =ctx.dateF.formatDateGRC(String(ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.Adhesion.excel.indexColonne.DATE_DEBUT_EFFET)))
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
		temp_contrat.TITU_COMPTE = ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.Adhesion.excel.indexColonne.TITU_COMPTE);
		temp_contrat.CODE_BANQUE = ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.Adhesion.excel.indexColonne.CODE_BANQUE);
		temp_contrat.CODE_GUICHET = ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.Adhesion.excel.indexColonne.CODE_GUICHET);
		temp_contrat.NUM_COMPTE = ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.Adhesion.excel.indexColonne.NUM_COMPTE);
		temp_contrat.CLE_RIB = ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.Adhesion.excel.indexColonne.CLE_RIB);
		temp_contrat.CLE_IBAN = ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.Adhesion.excel.indexColonne.CLE_IBAN);
		temp_contrat.BIC = ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.Adhesion.excel.indexColonne.BIC);
		temp_contrat.DATE_SIGN_MANDAT = ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.Adhesion.excel.indexColonne.DATE_SIGN_MANDAT);
		temp_contrat.CODE_PAYS_RIB = ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.Adhesion.excel.indexColonne.CODE_PAYS_RIB);
		temp_contrat.CODE_GR = ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.Adhesion.excel.indexColonne.CODE_GR);
		temp_contrat.CAISSE_RO = ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.Adhesion.excel.indexColonne.CAISSE_RO);
		temp_contrat.CENTRE_PAIEMENT = ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.Adhesion.excel.indexColonne.CENTRE_PAIEMENT);
		temp_contrat.NUM_RO = ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.Adhesion.excel.indexColonne.NUM_RO);
		temp_contrat.CLE_NUM_RO = ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.Adhesion.excel.indexColonne.CLE_NUM_RO);
		temp_contrat.RANG_GEM_RO = ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.Adhesion.excel.indexColonne.RANG_GEM_RO);
		temp_contrat.ASSURE_RO = ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.Adhesion.excel.indexColonne.ASSURE_RO);
		temp_contrat.NUM_PROD_1 = ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.Adhesion.excel.indexColonne.NUM_PROD_1);
		temp_contrat.NUM_PROD_2 = ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.Adhesion.excel.indexColonne.NUM_PROD_2);
		temp_contrat.NUM_PROD_3 = ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.Adhesion.excel.indexColonne.NUM_PROD_3);
		temp_contrat.NUM_PROD_4 = ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.Adhesion.excel.indexColonne.NUM_PROD_4);
		temp_contrat.NUM_PROD_5 = ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.Adhesion.excel.indexColonne.NUM_PROD_5);
		temp_contrat.NUM_PROD_6 = ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.Adhesion.excel.indexColonne.NUM_PROD_6);
		temp_contrat.NUM_PROD_7 = ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.Adhesion.excel.indexColonne.NUM_PROD_7);
		temp_contrat.NUM_PROD_8 = ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.Adhesion.excel.indexColonne.NUM_PROD_8);
		temp_contrat.NUM_PROD_9 = ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.Adhesion.excel.indexColonne.NUM_PROD_9);
		temp_contrat.NUM_PROD_10 = ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.Adhesion.excel.indexColonne.NUM_PROD_10);
		temp_contrat.NUM_EXT_CTT = ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.Adhesion.excel.indexColonne.NUM_EXT_CTT);
		temp_contrat.MADELIN = ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.Adhesion.excel.indexColonne.MADELIN);
		temp_contrat.ANCIEN_CT = ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.Adhesion.excel.indexColonne.ANCIEN_CT);
		temp_contrat.TITU_COMTPE_PREST = ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.Adhesion.excel.indexColonne.TITU_COMTPE_PREST);
		temp_contrat.BANQUE_PREST = ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.Adhesion.excel.indexColonne.BANQUE_PREST);
		temp_contrat.GUICHE_BANQUE_PREST = ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.Adhesion.excel.indexColonne.GUICHE_BANQUE_PREST);
		temp_contrat.COMPTE_BANQUE_PREST = ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.Adhesion.excel.indexColonne.COMPTE_BANQUE_PREST);
		temp_contrat.CLE_RIB_PREST = ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.Adhesion.excel.indexColonne.CLE_RIB_PREST);
		temp_contrat.CLE_IBAN_PREST = ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.Adhesion.excel.indexColonne.CLE_IBAN_PREST);
		temp_contrat.BIC_PREST = ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.Adhesion.excel.indexColonne.BIC_PREST);
		temp_contrat.CODE_PAYS_PREST = ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.Adhesion.excel.indexColonne.CODE_PAYS_PREST);
		temp_contrat.MODE_PAIE = ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.Adhesion.excel.indexColonne.MODE_PAIE);
		temp_contrat.PERIODICITE = ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.Adhesion.excel.indexColonne.PERIODICITE);
		temp_contrat.JOUR_PRELEV = ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.Adhesion.excel.indexColonne.JOUR_PRELEV);
		temp_contrat.FREQ_AVIS_ECH = ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.Adhesion.excel.indexColonne.FREQ_AVIS_ECH);
		temp_contrat.TYPE_TERME = ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.Adhesion.excel.indexColonne.TYPE_TERME);
		temp_contrat.IND_TLT = ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.Adhesion.excel.indexColonne.IND_TLT);
		temp_contrat.ANCIEN_ASSURE = ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.Adhesion.excel.indexColonne.ANCIEN_ASSURE);
		temp_contrat.REF_EXT = ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.Adhesion.excel.indexColonne.REF_EXT);
		ctx.log('Numero Sequence: '+tmpNumeroSeq); 
		ctx.log('Type contrat: '+ temp_contrat.GAMME); 
		data.contratCourantAdhesion.dataLocale.tabPersonnesPhysiques.push(temp_contrat);
		temp_ligne+=1;
		tmpNumeroSeq = ctx.excel.sheet.getCell(temp_ligne, data.scenarioConfig.Adhesion.excel.indexColonne.NUM_SEQ_CT);
	}
	ctx.log('ligne Courante: '+ data.varGlobales.ligneCourante);
	sc.endStep();
	return;
	}
	
	
}});