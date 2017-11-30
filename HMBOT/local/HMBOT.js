
// *** Choose language (en|fr|de) ***
//GLOBAL.labels.setLanguage(e.language.English);
GLOBAL.labels.setLanguage('fr');

// Global Systray object
var systray = ctx.systray();
var _ = {};

/** String table (English/French/German) */
GLOBAL.labels.set({
	menu: {
		about: { en:"About...", fr:"A propos...", de:"Uber..." },
		restart: { en:"Restart", fr:"Redémarrage", de:"Wieder starten" },
		stop: { en:"Shutdown", fr:"Arrêt", de:"Schließen" },
		main: { en:"Main Menu", fr:"Menu principal", de:"Hauptmenü" },
		test: { en:"Test Menu", fr:"Menu test", de:"Testmenü" },
		reportIncident: { en:"Report an incident", fr:"Signaler un incident", de:"Report an incident" },
		recordTraces: { en:"Record traces", fr:"Enregistrer des traces", de:"Record traces" }
	},
	aboutPopup: {
		title: { en:"About...", fr:"A propos...", de:"Uber..." },
		projectLabel: { en:"Project", fr:"Projet", de:"Projekt" },
		projectVersion: { en:"Project version", fr:"Version projet", de:"Projektversion" },
		productVersion: { en:"Product version", fr:"Version produit", de:"Produktversion" },
		studioVersion: { en:"Studio version", fr:"Version Studio", de:"Studio version" },
		environment: { en:"Environment", fr:"Environnement", de:"Environment" },
		frameworkVersion: { en:"Framework version", fr:"Version langage", de:"Framework-Version" }
	},
	stopPopup: {
		title: { en:"Contextor shutdown", fr:"Arrêt Contextor", de:"Schließen" },
		label: { 
			en:"Are you sure you want to stop Contextor ?", 
			fr:"Etes-vous certain de quitter Contextor ?",
			de:"Are you sure you want to stop Contextor ?"}
	},
	updatePopup: {
		title: { en:"Contextor update", fr:"Mise à jour Contextor", de:"Contextor update" },
		label: { 
			en:"A new version is available, do you want to restart now ?", 
			fr:"Une nouvelle version est disponible, voulez-vous redémarrer maintenant ?",
			de:"A new version is available, do you want to restart now ?"}
	},
	env: {
		prod: { en:"Production", fr:"Production", de:"Production" },
		qual: { en:"Qualification", fr:"Qualification", de:"Qualification" },
		dev: { en:"Development", fr:"Développement", de:"Development"}
	}
});

/** Show diagnostic popup */
GLOBAL.addOn({ evShowDiagnostic: function(ev) {
	ctx.diagnostic.showSubmitPopup();
}});

/** Show diagnostic recorder popup */
GLOBAL.addOn({ evShowDiagRecorder: function(ev) {
	ctx.diagnostic.showRecordInitPopup();
}});

/** main process start handler */
GLOBAL.events.START.on(function (ev) {

	// *** Create Systray ***
	systray.loadImage('stop', 'FILE', ctx.options.resourceURL + '/bmp/stop.png');
	systray.loadImage('restart', 'FILE', ctx.options.resourceURL + '/bmp/repeat.png');
	systray.loadImage('about', 'FILE', ctx.options.resourceURL + '/bmp/help.png');
	systray.createSystrayMenu(ctx.options.projectName, 'ICON1');

	/** 'About...' menu handler */
	systray.addMenu('', 'evCtxtAbout', GLOBAL.labels.menu.about, 'about', function (ev) {
		var label = "<H4>" + ctx.options.projectLabel + "</H4>" 
			+ GLOBAL.labels.aboutPopup.projectVersion + ": <b>" + ctx.options.projectVersion + "</b>&nbsp; (<b>" + ctx.options.projectDate + "</b>)<br/>" 
			+ GLOBAL.labels.aboutPopup.productVersion + ": <b>" + ctx.options.productVersion + "</b><br/>" 
			+ GLOBAL.labels.aboutPopup.frameworkVersion + ": <b>" + ctx.options.frameworkVersion + "</b><br/>";
		if (ctx.options.productVersions && ctx.options.productVersions['UnifiedStudio'])
			label += GLOBAL.labels.aboutPopup.studioVersion + ": <b>" + ctx.options.productVersions['UnifiedStudio'] + "</b><br/>" 
		if (ctx.options.env != e.env.prod)
			label += GLOBAL.labels.aboutPopup.environment + ": <b>" + GLOBAL.labels.env[ctx.options.env] + "</b><br/>";
		
		ctx.popup('pAbout', e.popup.template.Ok).open({
			title:  GLOBAL.labels.aboutPopup.title,
			CX: 500,
			CY: 300,
			message: label, 
			icon: ctx.options.resourceURL + '/bmp64/hello128.png'
		});
	});
	
	/** Stop menu handler */
	systray.addMenu('', 'evCtxtStop', GLOBAL.labels.menu.stop, 'stop', function(ev) {
		ctx.popup('pClose', e.popup.template.YesNo).open({
			title: GLOBAL.labels.stopPopup.title,
			CX: 500,
			CY: 180,
			message: '<br/><br/><b>' + GLOBAL.labels.stopPopup.label + '</b><br/><br/>', 
			icon: ctx.options.resourceURL + '/bmp64/hello.png'
		}).waitResult(function(res) {
			if (res == e.popup.button.Yes) {
				GLOBAL.notify(GLOBAL.events.PRESTOPCTX);				
			}
		});
	});

	systray.loadImage('ICON2', 'FILE', ctx.options.resourceURL + '/bmp/record.png');
	/** Diagnostic */
	ctx.regHotKey(e.key.Ctrl + e.key.Shift + 'D', GLOBAL.events.evShowDiagnostic);	// shortcut Ctrl+Shift+D to display diagnostic
	systray.addMenu('', 'evReportBug', GLOBAL.labels.menu.reportIncident + ' (Ctrl+Shift+D)', 'ICON2', function(ev) {
		GLOBAL.notify(GLOBAL.events.evShowDiagnostic);
	});

	/** Trace recorder */
	ctx.regHotKey(e.key.Ctrl + e.key.Shift + 'R', GLOBAL.events.evShowDiagRecorder);  // shortcut Ctrl+Shift+R to display recorder
	systray.addMenu('', 'evRecordTraces', GLOBAL.labels.menu.recordTraces + ' (Ctrl+Shift+R)', 'ICON2', function(ev) {
		GLOBAL.notify(GLOBAL.events.evShowDiagRecorder);
	});
	
	// Déclatation des types perso de contextor;
	ctx.string.init(); // Afin d'utiliser la librairie string
	
	ctx.configF.chargementFichierConfig();
	var configACS = ctx.configF.recupConfigScenario(ctx.configF.scenario.ACS);
	var configCMU = ctx.configF.recupConfigScenario(ctx.configF.scenario.CMU);
	var configSIRH = ctx.configF.recupConfigScenario(ctx.configF.scenario.SIRH);
	var configDA = ctx.configF.recupConfigScenario(ctx.configF.scenario.DA);
	var configSIRHUpdate = ctx.configF.recupConfigScenario(ctx.configF.scenario.SIRHUpdate);
	var configANALYSE = ctx.configF.recupConfigScenario(ctx.configF.scenario.Analyse);
	
	
		if (configACS.afficherMenu) {
		systray.addMenu('', 'ACS', 'Scenario ACS ');
		systray.addMenu('ACS', 'ACSCompletV7', 'ACS Complet V7', '', function(ev) {
//			ctx.traceF.initFichierTrace(configACS.cheminRacine, ctx.configF.scenario.ACS);
//			ctx.traceF.infoTxt('Version du projet : ' + GLOBAL.data.projectVersion + ' - Date de la Version : ' + GLOBAL.data.projectDate);
//			ctx.statsF.initFileStats(ctx.configF.cheminVersTemplate, configACS.cheminRacine, ctx.configF.scenario.ACS);
				var data = {};
				ActivInfinitev7.scenarios.ACSScenarioPrincipal.start(data).onEnd(function(){});
		});	
	}
	
		if (configCMU.afficherMenu) {
		systray.addMenu('', 'CMU', 'Scenario CMU ');
		systray.addMenu('CMU', 'CMUCompletV7', 'CMU Complet V7', '', function(ev) {
			
			
			var data = {};
			ActivInfinitev7.scenarios.CMUScenarioPrincipal.start(data).onEnd(function(){});
			
			
		});	
	}
		
		if(configANALYSE.afficherMenu){
			systray.addMenu('', 'Analyse situation', 'Scenario ANALYSE');
		  systray.addMenu('Analyse situation', 'ANALYSECompletV7', 'ANALYSE Complet 1.1', '', function(ev) {
//		  ctx.traceF.initFichierTrace(configANALYSE.cheminRacine, ctx.configF.scenario.Analyse);
    		
//			ctx.statsF.initFileStats(ctx.configF.cheminVersTemplate, configANALYSE.cheminRacine, ctx.configF.scenario.Analyse);
			var data = {};
			GRCHarMu.scenarios.scVerifDataGRC.start(data).onEnd(function(){});
		});	
		}
	
		
	if (configDA.afficherMenu) {
		systray.addMenu('', 'DA', 'Scenario DA ');
		systray.addMenu('DA', 'DACompletV7', 'DA Complet V7', '', function(ev) {
			ctx.traceF.initFichierTrace(configDA.cheminRacine, ctx.configF.scenario.DA);
			ctx.traceF.infoTxt('Version du projet : ' + GLOBAL.data.projectVersion + ' - Date de la Version : ' + GLOBAL.data.projectDate);
			ctx.statsF.initFileStats(ctx.configF.recupererCheminTemplate(), configDA.cheminRacine, ctx.configF.scenario.DA);
			var data = {};
			ActivInfinitev7.scenarios.scScenarioPrincipalDA.start(data).onEnd(function(){});
			
		});	
	}
	
	ctx.siebel.setViewName(GRCHarMu.pDetailAdhesion, 'SIHM%20Individual%20Policy%20Complement%20View');
	ctx.siebel.setViewName(GRCHarMu.pRechercheAI, 'SIHM%20All%20Individual%20Policy%20Search%20View');
	ctx.siebel.setViewName(GRCHarMu.pBulletinAdhesion, 'SIHM%20Individual%20Policy%20View');
	ctx.siebel.setViewName(GRCHarMu.pPersonnesPhysiques, 'Contact%20List%20View');

	ctx.siebel.initApplication(GRCHarMu.pMain);

});

/** Auto-update menu handler */
GLOBAL.events.UPDATECTX.on(function(ev) {
	if (ctx.options.updateConfirmation) {
		ctx.popup('pUpdate', e.popup.template.YesNo).open({
			title: GLOBAL.labels.updatePopup.title,
			CX: 500,
			CY: 180,
			message: '<br/><br/><b>' + GLOBAL.labels.updatePopup.label + '</b><br/><br/>', 
			icon: ctx.options.resourceURL + '/bmp64/hello.png'
		}).waitResult(function(res) {
			if (res == e.popup.button.Yes) {
				CtxtRestart();
				GLOBAL.notify(GLOBAL.events.PRESTOPCTX);				
			}
		});
	} else {
		CtxtRestart();
		GLOBAL.notify(GLOBAL.events.PRESTOPCTX);				
	}
});


