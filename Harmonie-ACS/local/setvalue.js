ctx.setValue = function set(input, value) {
	input.setFocus();
	var currentValue = input.get();
	if(currentValue !== value) {
		input.set(value);
		return;
	}

	input.page.evalScript('$(\'#' + input.scriptItem({ id: null }) + '\').change();');
}
