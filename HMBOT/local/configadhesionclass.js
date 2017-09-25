//Délaration d'une classe pour le fichier config.json permettant ainsi de reconnaitre les attributs chargés

/** @constructor */
var confFileAdhesionClass = function() {
  this.cheminTemplate = ''; 
  this.ADHESION = {
		afficherMenu : '',
    cheminRacine : '',
    controlSeul : '',
    controlSolde : '',
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
	}
	this.Version = '1.1'
};

