
/** Description */
GLOBAL.scenario({ scOperationsDate: function(ev, sc) {
	var data = sc.data;
	sc.onTimeout(30000, function(sc, st) { sc.endScenario();	}); // default timeout handler for each step
	sc.onError(function(sc, st, ex) { sc.endScenario();	}); // default error handler
	sc.setMode(e.scenario.mode.clearIfRunning);
	
	sc.step(GLOBAL.steps.testDate);
	sc.step(GLOBAL.steps.testDateObj);
	
	
}});


/** Description */
GLOBAL.step({ testDate: function(ev, sc, st) {
	ctx.log('--> testDate : ');
	var data = sc.data;
	var date1='28/02/2015';
	var ndate1= ctx.dateF.ajouterJour(date1,1,0,1);
	ctx.log(date1 + ' + 1 an et 1 jour : ' +ndate1);
	var date2='2015-01-31';
	var ndate2= ctx.dateF.ajouterJour(date2,1,0,0);
	ctx.log( date2 + ' + 1 jour : ' +ndate2);
	var date3='2016-12-31';
	var ndate3= ctx.dateF.ajouterJour(date3,1,0,0);
	ctx.log( date3 + ' + 1 jour : ' +ndate3);
	var date4='2016-02-28';
	var ndate4= ctx.dateF.ajouterJour(date4,1,0,1);
	ctx.log(date4 + ' + 1 an et 1 jour : ' +ndate4);
	sc.endStep();
	return;
}});




GLOBAL.step({ testDateObj: function(ev, sc, st) {
	ctx.log('--> testDateObj : ');
	var data = sc.data;
	var date1='28/02/2015';
	//ctx.date.formatDDMMYYYY(ctx.date.addYear(new Date('2015-02-28'), 1));
	var dateO=new Date(2015,02,28);
	ctx.log(dateO);
	var strDate = dateO.getDate();
	ctx.log('strDate : '+strDate);
	var ndate1= ctx.dateOb.formatDDMMYYYY(ctx.dateOb.addYear(ctx.dateOb.addDay(new Date(2015,02,28), 1), 1));
	ctx.log(date1 + ' + 1 an et 1 jour : ' +ndate1);
	var date2='2015-01-31';
	
	var ndate2= ctx.dateOb.formatDDMMYYYY(ctx.dateOb.addDay(new Date(2015,01,31), 1));
	ctx.log( date2 + ' + 1 jour : ' +ndate2);
	var date3='2016-12-31';
	var ndate3= ctx.dateOb.formatDDMMYYYY(ctx.dateOb.addDay(new Date(2016,12,31), 1));
	ctx.log( date3 + ' + 1 jour : ' +ndate3);
	var date4='2016-02-28';
	var ndate4= ctx.dateOb.formatDDMMYYYY(ctx.dateOb.addYear(ctx.dateOb.addDay(new Date(2016,02,28), 1), 1));
	ctx.log(date4 + ' + 1 an et 1 jour : ' +ndate4);
	sc.endStep();
	return;
}});