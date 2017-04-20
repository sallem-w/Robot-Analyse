ActivInfinite.scenario({ readExcel: function(ev, sc) {
	var data = sc.data;
	sc.onTimeout(30000, function(sc, st) { sc.endScenario();	});
	sc.onError(function(sc, st, ex) { sc.endScenario();	});
	sc.setMode(e.scenario.mode.clearIfRunning);
	sc.step(ActivInfinite.steps.openFile);
	sc.step(ActivInfinite.steps.copyFile);
	sc.step(ActivInfinite.steps.readFile);
	sc.step(ActivInfinite.steps.closeFile);
}});

ActivInfinite.step({ openFile : function(ev, sc, st) {
	ctx.excel.initialize();
	ctx.excel.file.open(pathFileExcelACS);
	sc.endStep();
}});

ActivInfinite.step({ copyFile : function(ev, sc, st) {
	ctx.excel.sheet.copySheet(pathFileExcelACS, rootOutputPathACS, pathFileExcelACS, 'test');
}});

ActivInfinite.step({ readFile : function(ev, sc, st) {
	ctx.excel.initialize();
	ctx.excel.file.open(pathFileExcelACS);
	var lastIndexRow = ctx.excel.sheet.getLastRow(toColumnName(configExcelACS.startColumnIndex) + configExcelACS.startRowIndex);
	var a = 1;
}});

ActivInfinite.step({ closeFile : function(ev, sc, st) {
	ctx.excel.end();
	ctx.excel.release();
	sc.endStep();
}});