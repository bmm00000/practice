export function validateStringNotEmpty(value) {
	if (value.trim().length === 0) {
		throw new Error('Invalid input - must not be empty.');
	}
}

// export function validateNumber(number) {
//   if (isNaN(number)) {
//     throw new Error('Invalid number input.');
//   }
// }
// with this function, there's one failing test, because isNaN('1') will return false. therefore, thanks to the test, we discovered that we may want to change the function, if the behaviour that we want is what we describe on the test:

export function validateNumber(number) {
	if (isNaN(number) || typeof number !== 'number') {
		throw new Error('Invalid number input.');
	}
}
