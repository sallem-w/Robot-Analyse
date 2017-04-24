ctx.config = (function() {
	
	var pathFileConfig = 'C:\\Users\\RICHARD-MAX\\excel\\config.json';
	var config = {};
	
	var configFile = {};
	
	config.loadConfigFile = function() {
		ctx.fso.init();
		var pathConfigFile = ctx.fso.file.read(pathFileConfig);
		ctx.fso.end();
		configFile = JSON.parse(pathConfigFile);
	};
	
	config.getConfigACS = function() {
		return configFile.ACS;
	}

	return config;
}) ();
