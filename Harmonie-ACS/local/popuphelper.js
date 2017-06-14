ctx.popupHelper = (function() {
	
	var popupHelper = {};
	
	popupHelper.newPopup = function(messageStr, title) {
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
	};

	return popupHelper;
}) ();
