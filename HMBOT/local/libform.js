 ctx.formF = (function() {
	
	var formF = {};

	var civilite = { 
		GRC:['MME','MLLE','M'],
		Infinite:['MME','MLLE','M']
	}
	formF.civilite=civilite
	
	var typeAdresse = { 	
		Domicile:'Domicile',
		Professionnelle : 'Professionnelle',
		Temporaire : 'Temporaire'
	}
	formF.typeAdresse=typeAdresse;
	
	var typeVoie  = {
		GRC:['R','AV','BD','RTE'],
		Infinite:['RUE','AVENUE','BOULEVARD','ROUTE']
	}
	formF.typeVoie=typeVoie;
	
	
	
	
	
	return formF;
}) ();

