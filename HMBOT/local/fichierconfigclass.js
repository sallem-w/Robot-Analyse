//Délaration d'une classe pour le fichier config.json permettant ainsi de reconnaitre les attributs chargés

/** @constructor */
var confFileClass = function() {
  this.cheminTemplate = ''; 
  this.ACS = {
    afficherMenu : '',
    cheminRacine : '',
		controlSeul : '',
		controlSolde : '',
		controlBlocNote : '',
		sauverMiseAJour : '',
		ajouterAnneeRechercheContrat : '',
		excel : {
			debutIndexCol : '',
			debutIndexLigne : '',
			indexColonne : {
				numeroContratIndiv : '', 
        dateDebutEffetContratIndiv : '',
        dateFinEffetContratIndiv : '',
        codeCentreGestion : '',
       	refContratColl : '',
        numeroPersonneAssure : '',
        nom : '',
        prenom : '',
        codeProduitSouscrit : '',
        ProduitSouscrit : '',
        dateDebutEffetProduitSouscrit : '',
        dateFinEffetProduitSouscrit : '',
        descriptionACS : '',
        dateDebutAttestationACS : '',
        dateFinAttestationACS : '',
        codeEcheancier : '',
        modeReglement : '',
        dateTraitementContrat : '',
        statutsContrat : '',
        commentaireContrat : ''
			}
		},
		produitAccesSante : {
			TPSAACSA : '',
      TPSAACSB : '',
      TPSAACSC : '',
      TPSARLACSA : '',
      TPSARLACSB : '',
      TPSARLACSC : ''
		}	
  }; 
  this.CMU = {
		afficherMenu : '',
    cheminRacine : '',
    controlSeul : '',
    controlSolde : '',
    sauverMiseAJour : '',
    excel : {
      debutIndexCol : '',
      debutIndexLigne : '',
      indexColonne : {
      	nom : '',
        prenom : '',
        numeroContratIndiv : '',
        type : '',
        dateDebutEffetContratIndiv : '',
        dateFinEffetContratIndiv : '',
        codeProduitSouscrit : '',
        dateDebutEffetProduitSouscrit : '',
        dateFinEffetProduitSouscrit : '',
        nbJourCouvCMU : '',
        dateDebutSituationParticuliere : '',
        dateFinSituationParticuliere : '',
        codeCentreGestion : '',
        dateTraitementContrat : '',
        statutsContrat : '',
        commentaireContrat : ''
      }
    }
	}; 
  this.SIRH = {
		afficherMenu : '',
		sauverMiseAJour : '',
		cheminRacine : ''
	}; 
	this.SIRHUpdate = {
		afficherMenu : '',
		sauverMiseAJour : '',
		cheminRacine : ''
	};
	this.DA = {
		afficherMenu : '',
		sauverMiseAJour : ''
	};
	this.ANALYSE ={
       afficherMenu : '',
       cheminRacine: '',
       excel : {
            debutIndexLigne : '',
            indexColonne : {
      	        nom : '',
                prenom : '',
                dateDeNaissance : '', 
                referenceGRC : '',
                type : '',
								dateTraitementContrat : '',
								commentaireContrat : ''
            }
        }
	}
};

