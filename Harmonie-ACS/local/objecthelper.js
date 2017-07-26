_ =  _ || {};

_.getObjectValues = function getObjectValues(obj) {
	return _.map(function(key) {
		return obj[key];
	}, Object.keys(obj));
}
