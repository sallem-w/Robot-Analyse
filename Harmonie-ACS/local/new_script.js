InfiniteACS.scenario({ readExcel: function(ev, sc) {
	var data = sc.data;
	sc.onTimeout(30000, function(sc, st) { sc.endScenario();	});
	sc.onError(function(sc, st, ex) { sc.endScenario();	});
	sc.setMode(e.scenario.mode.clearIfRunning);
	sc.step(InfiniteACS.steps.openFile);
	sc.step(InfiniteACS.steps.copyFile);
	sc.step(InfiniteACS.steps.readFile);
	sc.step(InfiniteACS.steps.closeFile);
}});

InfiniteACS.step({ openFile : function(ev, sc, st) {
	ctx.excel.initialize();
	ctx.excel.file.open(pathFileExcelACS);
	sc.endStep();
}});

InfiniteACS.step({ copyFile : function(ev, sc, st) {
	ctx.excel.sheet.copySheet(pathFileExcelACS, rootOutputPathACS, pathFileExcelACS, 'test');
}});

InfiniteACS.step({ readFile : function(ev, sc, st) {
	ctx.excel.initialize();
	ctx.excel.file.open(pathFileExcelACS);
	var lastIndexRow = ctx.excel.sheet.getLastRow(toColumnName(configExcelACS.startColumnIndex) + configExcelACS.startRowIndex);
	var  a= 1;
}});

InfiniteACS.step({ openFile : function(ev, sc, st) {
	ctx.excel.end();
	ctx.excel.release();
	sc.endStep();
}});