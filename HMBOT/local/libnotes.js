ctx.notes = (function() {
	var notes = {};
	
	//Constantes
	//excelHelper.constants
	notes.constantes = {
		statuts: {
			CreationPPInconnue: "Création contrat – PP inconnue sur Infinite",
			CreationPasDeContratActif: "Création de contrat – Pas de contrat actif sur la PP",
			TracePCX: "Non conformité - présence d’un précontentieux",
			GestionManuelle : "Gestion manuelle – Présence d’un contrat actif",
			AdhEnregistree : "Adhésion déjà enregistrée – A vérifier manuellement",
			AdhNonAnalyseeInfinite: "Adhésion non analysée sur Infinite - Problème technique",
			AdhNonAnalyseeGRC : "Adhésion non analysée sur Siebel - Problème technique"
		}
	}
	
	
	notes.popup =  {
		msg : {
			dataIndispo : "Fichiers des rejets IAE introuvables"
		}
	}
	return notes;
	//
})();