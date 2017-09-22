_ =  _ || {};

_.getObjectValues = function getObjectValues(obj) {
	return _.map(function(key) {
		return obj[key];
	}, Object.keys(obj));
}

_.clone = function (obj) {
	return _.reduce(function (acc, key) {
		acc[key] = obj[key];
		return acc;
	}, {}, Object.keys(obj));
	
}