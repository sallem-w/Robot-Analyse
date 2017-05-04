ctx.excelHelper = (function() {
	
	var excelHelper = {};
	
	excelHelper.constants = {
		status: {
			Success: "Traité",
			Fail: "Non traité"
		}
	}
	
	/**
	* Takes a positive integer and returns the corresponding column name.
	* @param {number} The positive integer to convert to a column name.
	* @return {string} The column name.
	*/
	excelHelper.toColumnName = function(number) {
		for (var ret = '', a = 1, b = 26; (number -= a) >= 0; a = b, b *= 26) {
			ret = String.fromCharCode(parseInt((number % b) / a, 10) + 65) + ret;
		}
		return ret;
	};
		
	/**
	* Write in cells
	* @param {path} Excel Path file
	* @param {rowIndex} The positive integer to represents row
	* @param {arrayMessage} The Array of object with represents cells, like [{ columnIndex: 1, value: 'foo' }]
	*/
	excelHelper.write = function(rowIndex, arrayMessage) {
		for (var i in arrayMessage) {
			var message = arrayMessage[i];
			ctx.excel.sheet.setCell(rowIndex, message.columnIndex, String(message.value)); 
		}
	};

	return excelHelper;
}) ();
