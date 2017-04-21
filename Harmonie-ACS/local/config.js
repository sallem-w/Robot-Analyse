ctx.config = (function() {
	
	var _pathFileConfig = 'C:\\Users\\RICHARD-MAX\\excel\\config.json';
	var _config = {};
	
	var configFile = {};
	
	_config.loadConfigFile = function() {
		ctx.fso.init();
		var pathConfigFile = ctx.fso.file.read(_pathFileConfig);
		ctx.fso.end();
		configFile = JSON.parse(pathConfigFile);
	};
	
	_config.getConfigACS = function() {
		return configFile.ACS;
	}

	return _config;
}) ();
