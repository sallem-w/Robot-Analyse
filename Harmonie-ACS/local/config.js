ctx.config = (function() {
	
	var pathFileConfig = 'C:\\deploy\\config.json';
	var config = {};
	var configFile = {};
	
	config.CMU = 'CMU';
	config.ACS = 'ACS';
	config.SIRH = 'SIRH';
	
	config.loadConfigFile = function() {
		var pathConfigFile = ctx.fso.file.read(pathFileConfig);
		configFile = JSON.parse(pathConfigFile);
	};
	
	config.getPathTemplate = function() {
		return configFile.pathTemplate;
	}
	
	config.getConfig = function(codeScenario) {
		return configFile[codeScenario];
	}
	
	config.getTimeout = function() {
		// Time in millisecond 
		return 1000 * 60 * 5;
	}
	
	return config;
}) ();
