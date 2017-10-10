ctx.popupF = (function() {
	
//	popupHelper
	var popupF = {};
	
	popupF.newPopup = function(messageStr, title, callback) { 
		title = title || 'Erreur';
		var popup = ctx.popup('pClose').init({
			template: e.popup.template.Ok,
			title: title,
			CX: 500,
			CY: 180,
			message: messageStr,
			icon: e.popup.icon64.hello
		});
		popup.open();
		if (callback!=null)
		{
			popup.waitResult(function(res) {
  			callback(); 
			});
		}
	};

	
	popupF.finTraitement = function(){
		popupF.newPopup("Fin du traitement ",'Fin', function() {
		GLOBAL.notify(GLOBAL.events.PRESTOPCTX);
		});
	}
	
	return popupF;
}) ();
