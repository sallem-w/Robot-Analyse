(function () {
	ActivInfinitev7.step({ abort: function(ev, sc, st) {
		st.disableTimeout();
		st.onError(function (sc, st, ex) {
			ctx.trace.writeError('Error while trying to reconnect : ' + ex + ' closing contextor');
			ctx.popupHelper.newPopup('Erreur durant la tentative de reconnexion : Annulation du scénario.');
			GLOBAL.close();
		});
		ctx.scenarioHelper.goHome(function (error) {
			if (error) {
				ctx.trace.writeError('Error while trying going home before reconnecting : ' + error.message);
			}
			ctx.scenarioHelper.connectionAuto(sc); 
		});
	}});
})();
