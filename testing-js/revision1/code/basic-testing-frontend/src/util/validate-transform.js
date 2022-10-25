import { validateStringNotEmpty, validateNumber } from './validation.js';
import { add } from '../math.js';
import { transformToNumber } from './numbers.js';

function validateAndTransform(numberInputs) {
	let result = '';

	try {
		const numbers = [];
		for (const numberInput of numberInputs) {
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

export default validateAndTransform;
