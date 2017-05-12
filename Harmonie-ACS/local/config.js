ctx.config = (function() {
	
	var pathFileConfig = 'C:\\deploy\\config.json';
	var config = {};
	
	var configFile = {};
	
	config.loadConfigFile = function() {
		var pathConfigFile = ctx.fso.file.read(pathFileConfig);
		configFile = JSON.parse(pathConfigFile);
	};
	
	config.getPathTemplate = function() {
		return configFile.pathTemplate;
	}
	
	config.getConfigACS = function() {
		return configFile.ACS;
	}
	
	config.getCodeScenarioACS = function() {
		return 'ACS';
	}
	
	config.getTimeout = function() {
		// Time in millisecond 
		return 1000 * 60 * 5;
	}
	
	return config;
}) ();
