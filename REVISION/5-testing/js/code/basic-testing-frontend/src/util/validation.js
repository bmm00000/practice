import { transformToNumber } from './numbers.js';

export function validateStringNotEmpty(value) {
	if (value.trim().length === 0) {
		throw new Error('Invalid input - must not be empty.');
	}
}

export function validateNumber(number) {
	if (isNaN(number)) {
		throw new Error('Invalid number input.');
	}
}

export function validateNumberInputs(numberInputs) {
	const numbers = [];
	for (const numberInput of numberInputs) {
		validateStringNotEmpty(numberInput);
		const number = transformToNumber(numberInput);
		validateNumber(number);
		numbers.push(number);
	}
	return numbers;
}
