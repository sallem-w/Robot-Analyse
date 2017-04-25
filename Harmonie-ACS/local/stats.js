ctx.stats = (function() {
	
	var fileName = ctx.date.formatYYYMMDD(new Date()) + '_{0}_Stats';
	var stats = {};
	var pathFileStats;
	var contentTemplate;

	stats.initFileStats = function(pathTemplate, pathDirectoryOutput, nameScenario) {
		var pathTemplateFile = pathTemplate + nameScenario + '.html';
			
		if (!ctx.fso.file.exist(pathTemplateFile)) {
			ctx.trace.writeError('Ressources template file not found for ' + nameScenario + ' scenario');
			return;
		}
		
		var pathFile = pathDirectoryOutput + fileName.replace('{0}', nameScenario);
		try {
			ctx.fso.file.copy(pathTemplateFile, pathFile + '.html', true);
		}
		catch(ex) {
			ctx.trace.writeError('Can not copy template file, ' + pathTemplateFile + ' to ' + pathFile + '.html');
		}

		pathFileStats = pathFile;
		try {
			contentTemplate = ctx.fso.file.read(pathFileStats + '.html');
		}
		catch(ex) {
			ctx.trace.writeError('Can not read template file, ' + pathFileStats + '.html');
		}
	};

	stats.write = function(obj) {
		stats.writeTemplate(obj);
		stats.writeJson(obj);
	}
	
	stats.writeTemplate = function(obj) {
		if (obj === undefined || pathFileStats === undefined) {
			return;
		}
		
		var tempContent = contentTemplate;
		for (var key in obj) {
			if (obj.hasOwnProperty(key)) {
				tempContent = tempContent.replace('{{ ' + key + ' }}', obj[key]);
			}
		}

		try {
			ctx.fso.file.write(pathFileStats + '.html', tempContent);
		}
		catch(ex) {
			ctx.trace.writeError('Can not write stats template, ' + pathFileStats + '.html');
		}
	};
	
	stats.writeJson = function(obj) {
		try {
			ctx.fso.file.write(pathFileStats + '.json', JSON.stringify(obj));
		}
		catch(ex) {
			ctx.trace.writeError('Can not write stats json, ' + pathFileStats + '.json');
		}
	}
	
	return stats;
}) ();
