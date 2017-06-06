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
	
	excelHelper.openFile = function(pathFileExcel) {
		ctx.excel.initialize();
		try {
			ctx.excel.file.open(pathFileExcel);
		} catch (ex) {
			ctx.trace.writeError('Can not copy open excel file, ' + pathFileExcel);
		}
	}
	
	excelHelper.copyFile = function(pathFileExcel, startRowIndex, writeColumn) {
		try {
			ctx.excel.file.saveAs(pathFileExcel); 
			ctx.excelHelper.write(startRowIndex, writeColumn);
			ctx.trace.writeInfo("Create Output Excel file succeed");
		} catch (ex) {
			ctx.trace.writeError('Can not copy save excel file, ' + pathFileExcel);
		}
	}
	
	excelHelper.closeFile = function() {
		var workbook = ctx.excel.getWorkbooks()[0];
		ctx.excel.file.close(workbook, true);
		ctx.excel.release();
		ctx.excel.end();
	}

	return excelHelper;
}) ();
