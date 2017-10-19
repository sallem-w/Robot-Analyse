//var utils = GLOBAL.functions;
var trace = {};
utils.trace = trace;
utils.trace.initFichierTrace = function (cheminDossier, nomScen) {
	
	var nomFichier = ctx.dateF.formatAAAAMMJJ(new Date()) + '_{0}_Logs.log';
	utils.trace.constantes = {
		touteTraceActive:false,
		typeM: { //typeM
			Info: "INFO",
			Warning: "WARNING",
			Error: "ERROR"
		}
	}
	var cheminFichierTrace;
	var cheminFichier = cheminDossier + nomFichier.replace('{0}', nomScen);
	if (!ctx.fso.file.exist(cheminFichier)) {
		ctx.fso.file.create(cheminFichier);
	}
	utils.trace.cheminFichierTrace = cheminFichier;
	utils.trace.constantes.touteTraceActive = ctx.configF.fichierConfigScenario[nomScen].touteTraceActive;

};

//	trace.writeInfo
utils.trace.infoTxt = function (str, dateObj, separateur) {
	if (utils.trace.constantes.touteTraceActive) {
		utils.trace.tracer(str, utils.trace.constantes.typeM.Info, dateObj, separateur)
	}
};

utils.trace.tracer = function (str, typeM, dateObj, separateur) {
	if (!str || str.length === 0) {
		return ;
	}

	separateur = separateur || '    ';
	dateObj = dateObj || new Date();
	//typeM = typeM || traceF.constantes.typeM.Info;
	var traceCourante = ctx.dateF.formatTrace(dateObj) + separateur + typeM + separateur + str + '\r\n';
	ctx.writeFile(utils.trace.cheminFichierTrace, traceCourante, true, true);
	if (ctx.options.isDebug) {
		ctx.log(typeM + '		' + str);
	}
};
