ctx.config = (function() {
	
	var fileName = 'config.json';
	var _config = {};
	
	var configFile = {};
	
	_config.loadConfigFile = function() {
		ctx.fso.init();
		var pathConfigFile = ctx.fso.file.read(ctx.options.currentURL + '\\' + fileName);
		ctx.fso.end();
		configFile = JSON.parse(pathConfigFile);
	};
	
	_config.getConfigACS = function() {
		return configFile.ACS;
	}

	return _config;
}) ();
