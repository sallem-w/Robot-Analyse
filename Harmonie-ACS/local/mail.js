ctx.mail = (function() {
	var mail = {};
	var templatePath;
	var mailFolderPath;
	
	var createMailFolder = function() {
		if (!mailFolderPath) {
			throw new Error('no mail folder path found');
		}
		if (!ctx.fso.folder.exist(mailFolderPath)) {
			ctx.fso.folder.create(mailFolderPath);	
		}
	}
	
	mail.init = function(customerName) {
		ctx.word.init();
		var templatePathFolder = ctx.config.getPathTemplate();
		var config = ctx.config.getConfig(ctx.config.SIRH);
		mailFolderPath = config.rootPath + 'courriers\\';
		var f = ctx.fso.folder.getFileCollection(templatePathFolder);
		for (; !f.atEnd(); f.moveNext()) {
			var file = f.item();
			var filename = file.Name;
			if (filename.toLowerCase().indexOf(customerName.toLowerCase()) !== -1 && filename.toLowerCase().indexOf('.docx') !== -1) {
				createMailFolder();
				templatePath = templatePathFolder + filename;
				return templatePath;
			}
		}
		
		//If we are here, it seems that we don't found the template file
		ctx.popupHelper.newPopup('Aucun fichier word correspondant au template '+ customerName +' n\'a été trouvé au chemin suivant : ' + templatePathFolder, 'Template introuvable');
		throw new Error('No template file found');
	};
	
	mail.createMail = function(infoContract) {
		if (!templatePath || !mailFolderPath) {
			throw new Error('The mail object is not initialized');
		}
		ctx.word.file.open(templatePath);
		ctx.word.document.setBookmarkValue('civility', infoContract.civility);
		ctx.word.document.setBookmarkValue('address', infoContract.address);
		ctx.word.document.setBookmarkValue('addressNumber', infoContract.addressNumber);
		ctx.word.document.setBookmarkValue('locality', infoContract.locality);
		ctx.word.document.setBookmarkValue('postalCode', infoContract.postalCode);
		ctx.word.document.setBookmarkValue('name', infoContract.name);
		ctx.word.document.setBookmarkValue('firstName', infoContract.firstName);
		ctx.word.document.setBookmarkValue('date', ctx.date.formatDDMMYYYY(new Date()));
		
		var resultFilename = infoContract.name + '_'+ infoContract.firstName + '_mail.docx';
		var mailPath = mailFolderPath + resultFilename;
		ctx.word.file.saveAs(mailPath);
		ctx.word.file.close();
		return mailPath;
	};

	mail.end = function() {
		ctx.word.end();
	}
	
	return mail;
}) ();
