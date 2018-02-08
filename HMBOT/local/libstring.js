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
<<<<<<< HEAD

		//padLeft
	stringF.format2c = function(nombre) {
	    return String("00" + nombre).slice(-2);
	}
	
	stringF.formatTel = function(nombre) {
		var str = {
			length :''
		}
		if(nombre !=  undefined){
			str=String(nombre);
			if(str.length==9){
				return String('0'+str);
			}
			else if(str.indexOf('+33') & str.length==12){
				return (String('0'+str.substr(3,9)));
			}
			else if(str.indexOf('33') & str.length==11){
				return (String('0'+str.substr(2,9)));
			}
		}
		else{
			return '';
		}
	}
=======
>>>>>>> scAnalyseSituBis
	
	return stringF;
}) ();
