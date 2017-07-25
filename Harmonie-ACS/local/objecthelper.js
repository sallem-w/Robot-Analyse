var _ =  _ || {};

_.getObjectValues = function getObjectValues(obj) {
	return ctx.map(function(key) {
		return obj[key];
	}, Object.keys(obj));
}
