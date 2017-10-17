﻿//Délaration d'une classe pour le fichier config.json permettant ainsi de reconnaitre les attributs chargés

/** @constructor */
var confFileAdhesionClass = function () {
  this.cheminTemplate = '';
	this.Version = '';
  this.ADHESION = {
    afficherMenu: '',
    cheminRacine: '',
    controlSeul: '',
    controlSolde: '',
    excel: {
      debutIndexCol: '',
      debutIndexLigne: '',
      indexColonne: {
        NUM_SEQ_CT:'',
        DISCRIMINANT: '',
        DATE_DEBUT_EFFET: '',
        TYPE_ASSURE: '',
        CONTACT_SEX: '',
        BRTH_DAY_GREG: '',
        SITUATION_FAMILLE: '',
        CAT_SOCIALE: '',
				CONTACT_CIVILITE:'',
        CONTACT_NOM: '',
        CONTACT_PRENOM: '',
        NOM_JEUNE_FILLE: '',
        COMP_IDENT_DEST: '',
        COMP_IDENTIF_GEO: '',
        NUMERO_VOIE: '',
        COMP_NUM_VOIE: '',
        ADRESSE_NAT_VOIE: '',
        LIBELLE_VOIE: '',
        LIBELLE_LIEU_DIT: '',
        CODE_POSTAL: '',
        LIBELLE_LOCALITE: '',
        CODE_CEDEX: '',
        NOM_BUREAU_CEDEX: '',
        DEPARTEMENT: '',
        CODE_PAYS: '',
        CODE_RNVP: '',
        TEL_DOM: '',
        TEL_PRO: '',
        TEL_POR: '',
        ADDR_MAIL: '',
        FAX: '',
        TITU_COMPTE: '',
        CODE_BANQUE: '',
        CODE_GUICHET: '',
        NUM_COMPTE: '',
        CLE_RIB: '',
        CLE_IBAN: '',
        BIC: '',
        DATE_SIGN_MANDAT: '',
        CODE_PAYS_RIB: '',
        CODE_GR: '',
        CAISSE_RO: '',
        CENTRE_PAIEMENT: '',
        NUM_RO: '',
        CLE_NUM_RO: '',
        RANG_GEM_RO: '',
        ASSURE_RO: '',
        GAMME: '',
        NUM_PROD_1: '',
        NUM_PROD_2: '',
        NUM_PROD_3: '',
        NUM_PROD_4: '',
        NUM_PROD_5: '',
        NUM_PROD_6: '',
        NUM_PROD_7: '',
        NUM_PROD_8: '',
        NUM_PROD_9: '',
        NUM_PROD_10: '',
        NUM_EXT_CTT: '',
        MADELIN: '',
        ANCIEN_CT: '',
        TITU_COMTPE_PREST: '',
        BANQUE_PREST: '',
        GUICHE_BANQUE_PREST: '',
        COMPTE_BANQUE_PREST: '',
        CLE_RIB_PREST: '',
        CLE_IBAN_PREST: '',
        BIC_PREST: '',
        CODE_PAYS_PREST: '',
        MODE_PAIE: '',
        PERIODICITE: '',
        JOUR_PRELEV: '',
        FREQ_AVIS_ECH: '',
        TYPE_TERME: '',
        IND_TLT: '',
        ANCIEN_ASSURE: '',
        REF_EXT: '',
				TOP_ABONN_DEC:'',
        contexteAnalyseStoppee: '',
        dateTraitementContrat: '',
        statutsContrat: '',
        commentaireContrat: ''
      }
    },
		Offre : {
			HSP :''
		},
		Gestion : {
			CGGRC : [],
			GroupeGestionInfinite : [],
			CentreGestionInfinite : []
		}
  }
};



