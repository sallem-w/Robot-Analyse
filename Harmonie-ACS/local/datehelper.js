 ctx.date = (function() {
	
	var date = {};
	
	date.formatYYYMMDD = function(dateObj) {
		var month = date.padLeft(dateObj.getUTCMonth() + 1);
		var day = date.padLeft(dateObj.getUTCDate());
		var year = dateObj.getUTCFullYear();
		return "" + year +  month + day
	};
	
	date.formatDDMMYYYY = function(dateObj, separator) {
		separator = separator || '/';
		var month = date.padLeft(dateObj.getUTCMonth() + 1);
		var day = date.padLeft(dateObj.getUTCDate());
		var year = dateObj.getUTCFullYear();
		return [day, month, year].join(separator);
	};
	
	date.formatTrace = function(dateObj) {
		return dateObj.getFullYear() + "-" + date.padLeft(dateObj.getMonth()+1) + "-" + date.padLeft(dateObj.getDate()) + " " 
				   + date.padLeft(dateObj.getHours()) + ":" + date.padLeft(dateObj.getMinutes()) + ":" + date.padLeft(dateObj.getSeconds());
	};
	
	date.diffToSecond = function(startDate, endDate) {
		var diff = endDate.getTime() - startDate.getTime();
		return diff / 1000;
	}
	
	date.addYear = function(dateObj, number) {
		dateObj = dateObj || new Date();
		number = number || 0;
		dateObj.setFullYear(dateObj.getFullYear() + number);
		return dateObj;
	}

	date.padLeft = function(number) {
	    return String("00" + number).slice(-2);
	}
	
	date.parseToDate = function(dateString, separator) {
		separator = separator || '/';
		var parts = dateString.split(separator);
		return new Date(parts[2], parts[1]-1, parts[0]); 
	}
 
	return date;
}) ();
