//Délaration d'une classe pour le fichier config.json permettant ainsi de reconnaitre les attributs chargés

/** @constructor */
var confFileACSClass = function() {
  this.cheminTemplate = ''; 
  this.ACS = {
    afficherMenu : '',
    cheminRacine : '',
		controlSeul : '',
		controlSolde : '',
		controlBlocNote : '',
		touteTraceActive : '',
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
  }
};





