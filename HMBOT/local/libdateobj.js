ctx.dateOb = (function() {
	
	var dateOb = {};
	
	dateOb.formatYYYMMDD = function(dateObj) {
		var month = dateOb.padLeft(dateObj.getMonth() + 1);
		var day = dateOb.padLeft(dateObj.getDate());
		var year = dateObj.getFullYear();
		return "" + year +  month + day
	};
	
	dateOb.formatDDMMYYYY = function(dateObj, separator) {
		if (typeof dateObj !== 'object') {
			dateObj = new Date(dateObj);
		}
		separator = separator || '/';
		var month = dateOb.padLeft(dateObj.getMonth() + 1);
		var day = dateOb.padLeft(dateObj.getDate());
		var year = dateObj.getFullYear();
		return [day, month, year].join(separator);
	};
	
	dateOb.formatTrace = function(dateObj) {
		if (typeof dateObj === 'number') {
			dateObj = new Date(dateObj);
		}
		return dateObj.getFullYear() + "-" + dateOb.padLeft(dateObj.getMonth()+1) + "-" + dateOb.padLeft(dateObj.getDate()) + " " 
				   + dateOb.padLeft(dateObj.getHours()) + ":" + dateOb.padLeft(dateObj.getMinutes()) + ":" + dateOb.padLeft(dateObj.getSeconds());
	};
	
	dateOb.diffTime = function(startDate, endDate) {
		return endDate.getTime() - startDate.getTime();
	}
	
	dateOb.addYear = function(dateObj, number) {
		var result = new Date(dateObj);
		number = number || 0;
		result.setFullYear(result.getFullYear() + number);
		return result;
	}
	
	dateOb.addMonth = function(dateObj, number) {
		var result = new Date(dateObj);
		number = number || 0;
		result.setMonth(result.getMonth() + number);
		return result;
	}
	
	dateOb.addDay = function(dateObj, number) {
		var result = new Date(dateObj);
		number = number || 0;
		result.setDate(result.getDate() + number);
		return result;
	}
	
	dateOb.isOnlyOneYearDifference = function(startDate, endDate) {
		 return (startDate.getDate() === endDate.getDate() 
					&& startDate.getMonth() === endDate.getMonth() 
					&& (endDate.getFullYear() - startDate.getFullYear()) === 1) 
	}

	dateOb.padLeft = function(number) {
	    return String("00" + number).slice(-2);
	}
	
	dateOb.parseToDate = function(dateString, separator) {
		separator = separator || '/';
		var parts = dateString.split(separator);
		return new Date(parts[2], parts[1]-1, parts[0]); 
	}
	
	dateOb.isEqual = function(dateStart, dateEnd) {
		return (dateStart.getTime() === dateEnd.getTime());
	}
	
	dateOb.isBefore = function(dateStart, dateEnd) {
		return (dateStart.getTime() < dateEnd.getTime());
	}
	
	dateOb.now = function() {
		return new Date().getTime();
	}
	
	dateOb.getTimeElapsedSince = function(time) {
		var SECONDE = 1000;
		var MINUTE = 60 * SECONDE;
		var HOUR = 60 * MINUTE;
		var hour = Math.floor(time / HOUR);
		var min = Math.floor((time % HOUR) / MINUTE);
		var sec = Math.floor(((time % HOUR) % MINUTE) / SECONDE);
		var message = sec + " seconde" + (sec > 1 ? 's' : '') + ".";
			if (time >= MINUTE) {
				message = min + " minute" + (min > 1 ? 's' : '') + " et " + message;
				if (time >= HOUR) {
					message = hour + " heure" + (hour > 1 ? 's' : '') + ", " + message;
				}
			}	
		return message;
	}
	
	
	
	dateOb.getTimeElapsed = function(time) {
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
	
	
	
	
	dateOb.convertTimeSeconds  = function(time) {
		var SECONDE = 1000;
		var MINUTE = 60 * SECONDE;
		var HOUR = 60 * MINUTE;
		var hour = Math.floor(time / HOUR);
		var min = Math.floor((time % HOUR) / MINUTE);
		var sec = Math.floor(((time % HOUR) % MINUTE) / SECONDE);
		var result = hour * 60 * 60 + min * 60 + sec; 
		return result;
	}
	
	dateOb.setDate = function(dateObj, day) {
		var result = new Date(dateObj);
		result.setDate(day);
		return result;
	}
	
	dateOb.today = dateOb.formatDDMMYYYY(dateOb.now());
	dateOb.monthStart = dateOb.formatDDMMYYYY(dateOb.setDate(dateOb.now(), 1));

	return dateOb;
}) ();
