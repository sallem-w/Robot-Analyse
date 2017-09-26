 ctx.dateF = (function() {
	
	var dateF = {};

	dateF.ajouterJour = function(tps,NbJour,NbMois,NbAnnees){
		
		
		//Format français
		var tpsFr=ctx.dateF.enTpsFr(tps);
		
		var t_Annee=Number(tpsFr.substr(6,4));
		var t_Mois=Number(tpsFr.substr(3,2));
		var t_Jour=Number(tpsFr.substr(0,2));
		//ctx.log('Année : '+t_Annee+' Mois : '+t_Mois+' Jour : '+thisDay);
		
		
		var joursDsLeMois=ctx.dateF.combienDeJours(t_Annee,t_Mois);
		//ctx.log('nb jour dans le mois : '+joursDsLeMois);
		var n_Jour=0;var n_Mois=0;var n_Annee=0;
		
		n_Jour=t_Jour+NbJour;
		while(n_Jour/joursDsLeMois>1){
			n_Jour=n_Jour-joursDsLeMois;
			t_Mois=t_Mois+1;
			joursDsLeMois=ctx.dateF.combienDeJours(t_Annee,t_Mois);
		}

		n_Mois=t_Mois+NbMois;
		while(n_Mois/12>1){
			n_Mois=n_Mois-12;
			t_Annee=t_Annee+1;
		}
		n_Annee=t_Annee+NbAnnees;
		//attention: pb si il se peut que l'on tombe sur un 29 fevrier hors année bisexxtile, dans ces conditions il faut ajouter un jour
		if(!ctx.dateF.estBissextile(n_Annee) && n_Jour==29){
			n_Jour=1;
			n_Mois=3;
		}
		// enfin il faut s'assurer que le format soit DD/MM/YYYY
		n_Jour=String(n_Jour);
		n_Mois=String(n_Mois);
		n_Annee=String(n_Annee);
		if(n_Jour.length == 1){n_Jour= '0' + n_Jour;}
		if(n_Mois.length == 1){n_Mois= '0' + n_Mois;}
		var str=n_Jour+'/'+n_Mois+'/'+n_Annee;
		return str;
	}
	dateF.combienDeJours= function(Annee,Mois){
	var jours=0;
	var bissextile=ctx.dateF.estBissextile(Annee);
	var D30=[4,6,9,11];
	var D31=[1,3,5,7,8,10,12];
	

	if(ctx.dateF.contains(D30,Mois)){
		jours=30;
	}
	else if(ctx.dateF.contains(D31,Mois)){
		jours=31;
	}
	else{
		if(bissextile){
			jours=29;
		}
		else{
			jours=28;
		}
	}
	return jours;
	}
	dateF.estBissextile = function (Annee){
	 	if((Annee % 4 == 0) && (Annee % 100 != 0)){
			var mod1=Annee % 4;
			return true;
		}
		else if(Annee % 400 ==0){
			var mod2=Annee % 400;
			return true;
		}	 
		else{
			return false;
		}
	}
	dateF.contains = function(a, obj) {
    for (var i = 0; i < a.length; i++) {
        if (a[i] === obj) {
            return true;
        }
    }
    return false;
	}
	
	//inFrTime
	dateF.enTpsFr = function(tps){
	var tt=String(tps);
	if((tt[2]== "-") || (tt[2]== "/")){
		return tt;
	}
	else{
		var jj=tt.substr(8,2);
		var mm=tt.substr(5,2);
		var yy=tt.substr(0,4);
		tps=jj+'/'+mm+'/'+yy;
		return tps;
	}
	
}
	dateF.dateEnString = function (tps){	
		var tt=new Date(tps); //creation de l'objet
		var jj = dateF.format2c(tt.getDate());
		var mm = dateF.format2c(tt.getMonth()+1);
		var yy = tt.getFullYear();
		var stTps=jj+'/'+mm+'/'+yy;
		return stTps;
	}
	
  dateF.formatDateIAE = function (tps){	
    var jj=tps.substr(6,2);
		var mm=tps.substr(4,2);
		var yy=tps.substr(0,4);
		return jj+'/'+mm+'/'+yy;
	}	

	dateF.enObjet = function(dateString, separator) {
		separator = separator || '/';
		var parts = dateString.split(separator);
		return new Date(parts[2], parts[1]-1, parts[0]); 
	}
	
	//isBefore
	dateF.estAvant = function(date1, date2) {
		return (date1.getTime() < date2.getTime());
	}
	
	
	
	//padLeft
	dateF.format2c = function(nombre) {
	    return String("00" + nombre).slice(-2);
	}
	
		dateF.estEgalle = function(date1, date2) {
		//ctx.log('isEqual  : dateStart'+dateStart+' =?  dateEnd :'+ dateEnd);
		return date1 === date2;
	}
		
//	formatDDMMYYYY	
		dateF.formatJJMMAAAA = function(dateObj, separateur) {
		if (typeof dateObj !== 'object') {
			dateObj = new Date(dateObj);
		}
		separateur = separateur || '/';
		var jj = dateF.format2c(dateObj.getDate());
		var mm = dateF.format2c(dateObj.getMonth() + 1);
		var aa = dateObj.getFullYear();
		return [jj, mm, aa].join(separateur);
	};	
		
//	formatYYYMMDD	
		dateF.formatAAAAMMJJ = function(dateObj) {
		var mm = dateF.format2c(dateObj.getMonth() + 1);
		var jj = dateF.format2c(dateObj.getDate());
		var aa = dateObj.getFullYear();
		return ( "" + aa +  mm + jj);
	};
		
	dateF.formatTrace = function(dateObj) {
		if (typeof dateObj === 'number') {
			dateObj = new Date(dateObj);
		}
		return dateObj.getFullYear() + "-" + dateF.format2c(dateObj.getMonth()+1) + "-" + dateF.format2c(dateObj.getDate()) + " " 
				   + dateF.format2c(dateObj.getHours()) + ":" + dateF.format2c(dateObj.getMinutes()) + ":" + dateF.format2c(dateObj.getSeconds());
	};
	
	dateF.afficherDuree = function(time) {
		var hour = Math.floor(time/(60*60));
		var min = Math.floor((time/60)-(hour*60));
		var sec = Math.floor(time-(hour*60*60)-(min*60));
		var message = sec + " seconde" + (sec > 1 ? 's' : '') + ".";
			if (min > 0) {
				message = min + " minute" + (min > 1 ? 's' : '') + " et " + message;
				if (hour > 0) {
					message = hour + " heure" + (hour > 1 ? 's' : '') + ", " + message;
				}
			}	
		return message;
	}
	
	dateF.conversionEnSecondes  = function(time) {
		var SECONDE = 1000;
		var MINUTE = 60 * SECONDE;
		var HOUR = 60 * MINUTE;
		var hour = Math.floor(time / HOUR);
		var min = Math.floor((time % HOUR) / MINUTE);
		var sec = Math.floor(((time % HOUR) % MINUTE) / SECONDE);
		var result = hour * 60 * 60 + min * 60 + sec; 
		return result;
	}
	
	dateF.premierJourDuMoisCourant = function (time) {
	 	var thisYear = Number(time.substr(6,4));
		var thisMonth = Number(time.substr(3,2));
		var thisDay = Number(time.substr(0,2));
		 
		var premierJour = dateF.format2c(1);
		var resultat = premierJour+'/'+dateF.format2c(thisMonth)+'/'+thisYear;
		return resultat;
	}
	 
	dateF.dateSansSeparatorEnFrancais = function (time){
		var dateInString = String(time);
		var day =  Number(time.substr(6,2));
		var month = Number(time.substr(4,2));
		var year = Number(time.substr(0,4));
		var resultat = month+'/'+day+'/'+year;
		//var resultat = day+'/'+year;
		return resultat;
	}	
	
	return dateF;
}) ();
