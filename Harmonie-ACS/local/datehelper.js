 ctx.date = (function() {
	
	var date = {};
	
	date.formatYYYMMDD = function(dateObj) {
		var month = date.padLeft(dateObj.getMonth() + 1);
		var day = date.padLeft(dateObj.getDate());
		var year = dateObj.getFullYear();
		return "" + year +  month + day
	};
	
	date.formatDDMMYYYY = function(dateObj, separator) {
		separator = separator || '/';
		var month = date.padLeft(dateObj.getMonth() + 1);
		var day = date.padLeft(dateObj.getDate());
		var year = dateObj.getFullYear();
		return [day, month, year].join(separator);
	};
	
	date.formatTrace = function(dateObj) {
		return dateObj.getFullYear() + "-" + date.padLeft(dateObj.getMonth()+1) + "-" + date.padLeft(dateObj.getDate()) + " " 
				   + date.padLeft(dateObj.getHours()) + ":" + date.padLeft(dateObj.getMinutes()) + ":" + date.padLeft(dateObj.getSeconds());
	};
	
	date.diffTime = function(startDate, endDate) {
		return endDate.getTime() - startDate.getTime();
	}
	
	date.addYear = function(dateObj, number) {
		var result = new Date(dateObj);
		number = number || 0;
		result.setFullYear(result.getFullYear() + number);
		return result;
	}
	
	date.addMonth = function(dateObj, number) {
		var result = new Date(dateObj);
		number = number || 0;
		result.setMonth(result.getMonth() + number);
		return result;
	}
	
	date.addDay = function(dateObj, number) {
		var result = new Date(dateObj);
		number = number || 0;
		result.setDate(result.getDate() + number);
		return result;
	}
	
	date.isOnlyOneYearDifference = function(startDate, endDate) {
		 return (startDate.getDate() === endDate.getDate() 
					&& startDate.getMonth() === endDate.getMonth() 
					&& (endDate.getFullYear() - startDate.getFullYear()) === 1) 
	}

	date.padLeft = function(number) {
	    return String("00" + number).slice(-2);
	}
	
	date.parseToDate = function(dateString, separator) {
		separator = separator || '/';
		var parts = dateString.split(separator);
		return new Date(parts[2], parts[1]-1, parts[0]); 
	}
	
	date.isEqual = function(dateStart, dateEnd) {
		return (dateStart.getTime() === dateEnd.getTime());
	}
	
	date.isBefore = function(dateStart, dateEnd) {
		return (dateStart.getTime() < dateEnd.getTime());
	}
	
	date.now = function() {
		return new Date().getTime();
	}
	
	date.getTimeElapsedSince = function(time) {
     var SECONDE = 1000;
     var MINUTE = 60 * SECONDE;
     var HOUR = 60 * MINUTE;
 
     var hour = Math.floor(time / HOUR);
     var min = Math.floor((time % HOUR) / MINUTE);
     var sec = Math.floor(((time % HOUR) % MINUTE) / SECONDE);
 
     var message = sec +" seconde" + (sec > 1 ? 's' : '') + ".";
       if (time >= MINUTE) {
	       message = min + " minute" + (min > 1 ? 's' : '') + " et " + message;
	       if (time >= HOUR) {
	      	message = hour + " heure" + (hour > 1 ? 's' : '') + ", " + message;
	     	}
     	}

     return message;
 }

	return date;
}) ();
