 ctx.stringF = (function() {
	
	var stringF = {};
//	padLeft
	stringF.remplissageGauche = function(str, val) {
		return String(val + str).slice(-val.length);
	};
	
//	.removeReturnAndTab
	stringF.suppressionRetourEtTab = function(str){
		return str.replace(/\n|\r/g,' ');
	};

		//padLeft
	stringF.format2c = function(nombre) {
	    return String("00" + nombre).slice(-2);
	}
	
	return stringF;
}) ();
