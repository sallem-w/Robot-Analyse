ctx.traceF = (function() {
	
	var nomFichier = ctx.dateF.formatAAAAMMJJ(new Date()) + '_{0}_Logs.log';
	var traceF = {};
	var cheminFichierTrace;
	traceF.cheminFichierTrace=cheminFichierTrace;
	
	traceF.constantes = {
		touteTraceActive:false,
		typeM: { //typeM
			Info: "INFO",
			Warning: "WARNING",
			Error: "ERROR"
		}
	}
	
	
	//initFileTrace
	traceF.initFichierTrace = function(cheminDossier, nomScen) {
		var cheminFichier = cheminDossier + nomFichier.replace('{0}', nomScen);
		if (!ctx.fso.file.exist(cheminFichier)) {
			ctx.fso.file.create(cheminFichier);
		}
		ctx.traceF.cheminFichierTrace = cheminFichier;
		ctx.traceF.constantes.touteTraceActive=ctx.configF.fichierConfigScenario[nomScen].touteTraceActive;
	};

	
//	trace.writeInfo
	traceF.infoTxt = function(str, dateObj, separateur) {
		if(ctx.traceF.constantes.touteTraceActive){
			traceF.tracer(str, traceF.constantes.typeM.Info, dateObj, separateur)
		}	
	};
	//trace.writeError
	traceF.errorTxt = function(str, dateObj, separateur) {
		traceF.tracer(str, traceF.constantes.typeM.Error, dateObj, separateur)
	};
	//trace.writeWarning
	traceF.warningTxt = function(str, dateObj, separateur) {
		traceF.tracer(str, traceF.constantes.typeM.Warning, dateObj, separateur)
	};
	
	//simple trace
	traceF.simpleTxt = function(str, dateObj, separateur) {
		traceF.tracer(str,'INFO LOG', dateObj, separateur)
	};
	
	
	traceF.tracer = function(str, typeM, dateObj, separateur) {
		if (!str || str.length === 0) {
			return;
		}

		separateur = separateur || '    ';
		dateObj = dateObj || new Date();	
		var traceCourante = ctx.dateF.formatTrace(dateObj) + separateur + typeM + separateur + str + '\r\n';
		//ctx.log('Chemin Fichier Trace : '+ctx.traceF.cheminFichierTrace);
		var cheminTr = ctx.traceF.cheminFichierTrace;
		ctx.writeFile(cheminTr,traceCourante,true,true);
		if (ctx.options.isDebug) {
			ctx.log(typeM + '		' + str);
		}
	};
	
	return traceF;
<<<<<<< HEAD
}) ();

=======
}) ();
>>>>>>> scAnalyseSituBis
