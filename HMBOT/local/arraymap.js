_ = _ || {};

_.map = function map(fn, array) {
	var newArray = [];
	for(var index = 0; index < array.length; index++) {
		newArray[index] = fn(array[index], index, array);
	}
	
	return newArray;
}

_.reduce = function reduce(fn, acc, array) {
	for(var index = 0; index < array.length; index++) {
		acc = fn(acc, array[index], index, array);
	}
	
	return acc;
}

_.isArray = function (data) {
    return Object.prototype.toString.call(data) === '[object Array]';
}

_.toArray = function (data) {
	if (typeof data !== 'object') {
		throw new Error(JSON.stringify(data) + ' : Cannot be converted to array');
	}
	if(_.isArray(data)) {
		return data;
	}
	return _.map(function (key, index) {

		if (isNaN(parseInt(key,10))) {
			throw new Error(JSON.stringify(data) + ' : Cannot be converted to array, key : ' + key + ' is not a number');
		}
		return data[key];
	}, Object.keys(data));
}

_.join = function join(array, delimiter) {
	delimiter = delimiter || ',';
	return _.reduce(function (str, item) {
		if (!str) {
			return item;
		}
		return str + delimiter +  item;
	}, null, array);
}
