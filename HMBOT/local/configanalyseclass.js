//Délaration d'une classe pour le fichier config.json permettant ainsi de reconnaitre les attributs chargés

/** @constructor */
var confFileANALYSEClass = function() {
  this.ANALYSE ={
       afficherMenu : '',
       cheminRacine: '',
		   touteTraceActive : '',
       excel : {
            debutIndexLigne : '',
				    debutIndexCol : '',
            indexColonne : {
      	        nom : '',
                prenom : '',
                dateDeNaissance : '', 
                referenceGRC : '',
                type : '',
                numeroRO : '',
							  gammeProduit: '',
							  debDateEffet: '',
							  numProduit1 : '',
							  numSEQ : '',
							  numExtCtt : '',
								contexteAnalyseStoppee : '',
							  dateTraitementAnalyse : '',
							  presenceHPP : '',
								paiementAdhesion : '',
								dateEffetAControler : '',
								payeurSouscriptDifferent : '',
								clauseBenefAdh : '',
								clauseBenefConjoint : '',
								controleGestion : ''
            }
        },
			 tabGammeCode : [],
			 listeProduits : []
	}
	this.Version = '1.1'
};