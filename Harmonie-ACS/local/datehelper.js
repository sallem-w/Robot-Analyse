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
	
	date.diffToSecond = function(startDate, endDate) {
		var diff = endDate.getTime() - startDate.getTime();
		return diff / 1000;
	}
	
	date.addYear = function(dateObj, number) {
		var result = new Date(dateObj);
		number = number || 0;
		result.setFullYear(result.getFullYear() + number);
		return result;
	}
	
	date.addDay = function(dateObj, number) {
		var result = new Date(dateObj);
		result.setDate(result.getDate() + number);
    return result;
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
