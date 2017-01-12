'use strict';
// initialising the new flattened array.
let flattenedArray = [];

function Flatten(array) {
	// Initally call the flattenArry function passing in the array.
	flattenArray(array);

	// return the flattened array.
	return flattenedArray;
}

function flattenArray(array) {
	// Looping through the length of the array
	for (let i = 0; i < array.length; i++) {
		// if the element in the array is of type number then push it onto the array.
		if (typeof array[i] === 'number') {
			flattenedArray.push(array[i]);
		// else if (if the current element is an array) repeat the cycle and flatten this element of the current array.
		} else if (typeof array[i] === 'object') {
			flattenArray(array[i]);
		// fallback if the current element in the array is not an array or a number.
		} else {
			console.log('This elemrnt of the array is not an array or a number: ' + array[i]);
		}
	}
}

export default Flatten;
