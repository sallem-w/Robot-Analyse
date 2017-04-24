 ctx.date = (function() {
	
	var date = {};
	
	date.formatYYYMMDD = function(dateObj) {
		var month = dateObj.getUTCMonth() + 1;
		var day = dateObj.getUTCDate();
		var year = dateObj.getUTCFullYear();
		return "" + year +  month + day
	};
	
	date.formatTrace = function(dateObj) {
		return dateObj.getFullYear() + "-" + (dateObj.getMonth()+1) + "-" + dateObj.getDate() + " " + dateObj.getHours() + ":" + dateObj.getMinutes() + ":" + dateObj.getSeconds();
	};
	
	return date;
}) ();
