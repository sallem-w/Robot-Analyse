 ctx.date = (function() {
	
	var _date = {};
	
	_date.formatYYYMMDD = function(dateObj) {
		var month = dateObj.getUTCMonth() + 1;
		var day = dateObj.getUTCDate();
		var year = dateObj.getUTCFullYear();
		return "" + year +  month + day
	};
	
	return _date;
}) ();
