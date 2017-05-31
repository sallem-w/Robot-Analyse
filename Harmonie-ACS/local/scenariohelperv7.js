 ctx.scenarioHelper = (function() {
	
	var scenarioHelper = {};
	
	scenarioHelper.getMessagesPopup = function() {
		function getMessages() {
			return $('#cgd-toast-container-right .toast-message > .row:first-child').text();
		}
		
		ActivInfinitev7.currentPage.injectFunction(getMessages);
		var message = ActivInfinitev7.currentPage.evalScript('getMessages()');
		return message;
	}

	scenarioHelper.withEmptyMessagesPopup = function(message) {
		if (ctx.string.trim(message) === '' || message === undefined) {
			message = 'Problème inconnu, impossible de récupérer le message de la POPUP d\'erreur \n';
		}
		return message;
	}
	
	return scenarioHelper;
}) ();
