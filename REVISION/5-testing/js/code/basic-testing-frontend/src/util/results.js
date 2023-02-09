import { validateNumberInputs } from './validation.js';
import { add } from '../math.js';

export function generateResult(numberInputs) {
	let result = '';
	try {
		const numbers = validateNumberInputs(numberInputs);
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

export function outputResult(resultText, outputElement) {
	outputElement.textContent = resultText;
}
