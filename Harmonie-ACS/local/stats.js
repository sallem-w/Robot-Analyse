ctx.stats = (function() {
	
	var _fileName = ctx.date.formatYYYMMDD(new Date()) + '_{0}_Stats.html';
	var stats = {};
	var _pathFileStats;

	stats.initFileStats = function(pathDirectory, nameScenario) {
		var pathFile = pathDirectory + fileName.replace('{0}', nameScenario);
		if (!ctx.fso.file.exist(pathFile)) {
			ctx.fso.file.create(pathFile);
		}

		pathFileStats = pathFile;
	};
	
	stats.write = function() {
		if (str.length === 0) {
			return;
		}

		ctx.fso.file.write(pathFileTrace, "");
	};
	
	return stats;
}) ();
