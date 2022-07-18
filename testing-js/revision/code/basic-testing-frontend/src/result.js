import { validateStringNotEmpty, validateNumber } from './util/validation.js';
import { transformToNumber } from './util/numbers.js';
import { add } from './math.js';

export function generateResult(numInputs) {
	let result = '';

	try {
		const numbers = [];
		for (const numberInput of numInputs) {
			validateStringNotEmpty(numberInput);
			const number = transformToNumber(numberInput);
			validateNumber(number);
			numbers.push(number);
		}
		result = add(numbers).toString();
	} catch (error) {
		result = error.message;
	}

	return result;
}

export function generateResultText(result) {
	let resultText = '';

	if (result === 'invalid') {
		resultText = 'Invalid input. You must enter valid numbers.';
	} else if (result !== 'no-calc') {
		resultText = 'Result: ' + result;
	}

	return resultText;
}
