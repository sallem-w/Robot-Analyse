ctx.trace = (function() {
	
	var nomFichier = ctx.dateF.formatAAAAMMJJ(new Date()) + '_{0}_Logs.log';
	var trace = {};
	var cheminFichierTrace;
	var txtTrace;
	
	
	
	trace.constants = {
		typeM: { //typeM
			Info: "INFO",
			Warning: "WARNING",
			Error: "ERROR"
		}
	}		
	
	//initFileTrace
	trace.initFichierTrace = function(cheminDossier, nomScenario) {
		var cheminFichier = cheminDossier + nomFichier.replace('{0}', nomScenario);
		if (!ctx.fso.file.exist(cheminFichier)) {
			ctx.fso.file.create(cheminFichier);
		}

		cheminFichierTrace = cheminFichier;
		txtTrace = ctx.fso.file.read(cheminFichierTrace);
	};
	
//	trace.writeInfo
	trace.infoTxt = function(str, dateObj, separateur) {
		trace.tracer(str, trace.constants.typeM.Info, dateObj, separateur)
	};
	//trace.writeError
	trace.errorTxt = function(str, dateObj, separateur) {
		trace.tracer(str, trace.constants.typeM.Error, dateObj, separateur)
	};
	//trace.writeWarning
	trace.warningTxt = function(str, dateObj, separateur) {
		trace.tracer(str, trace.constants.typeM.Warning, dateObj, separateur)
	};
	
	trace.tracer = function(str, typeM, dateObj, separateur) {
		if (!str || str.length === 0) {
			return;
		}

		separateur = separateur || '    ';
		dateObj = dateObj || new Date();
		typeM = typeM || trace.constants.typeM.Info;
		
		txtTrace = txtTrace + ctx.dateF.formatTrace(dateObj) + separateur + typeM + separateur + str + '\r\n';
		ctx.fso.file.write(cheminFichierTrace, txtTrace);
		
		if (ctx.options.isDebug) {
			ctx.log(typeM + '		' + str);
		}
	};
	
	return trace;
}) ();
