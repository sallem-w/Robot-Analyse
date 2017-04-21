ctx.excelHelper = (function() {
	
	var _excelHelper = {};
	
	/**
	* Takes a positive integer and returns the corresponding column name.
	* @param {number} num  The positive integer to convert to a column name.
	* @return {string}  The column name.
	*/
	_excelHelper.toColumnName = function(number) {
		for (var ret = '', a = 1, b = 26; (number -= a) >= 0; a = b, b *= 26) {
			ret = String.fromCharCode(parseInt((number % b) / a, 10) + 65) + ret;
		}
		return ret;
	};

	return _excelHelper;
}) ();
