ctx.mail = (function() {
	var mail = {};
	var templatePath;
	
	mail.init = function(codeScenario) {
		var pathTemplate = ctx.config.getPathTemplate();
		var f = ctx.fso.folder.getFileCollection('C:\\Users\\DEMOUGIN-D\\Projet\\Contextor\\template');//pathTemplate);
		for (; !f.atEnd(); f.moveNext()) {
			var file = f.item();
			var filename = file.Name;
			if (filename.toLowerCase().indexOf(codeScenario.toLowerCase()) !== -1 && filename.toLowerCase().indexOf('.docx') !== -1) {
				templatePath = pathTemplate + filename;
				return templatePath;
			}
		}
		
		//If we are here, it seems that we don't found the template file
		ctx.popupHelper.newPopup('Aucun fichier word correspondant au template '+ codeScenario +' n\'a été trouvé au chemin suivant : ' + pathTemplate, 'Template introuvable');
		throw new Error('No template file found');
	};

	return mail;
}) ();
