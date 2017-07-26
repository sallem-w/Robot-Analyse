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
