import { validateStringNotEmpty, validateNumber } from './validation.js';

export function transformToNumber(value) {
	// return NaN;
	return +value;
}

export function cleanNumbers(numberValues) {
	const numbers = [];
	for (const numberInput of numberValues) {
		validateStringNotEmpty(numberInput);
		const number = transformToNumber(numberInput);
		validateNumber(number);
		numbers.push(number);
	}
	return numbers;
}

// writing tests for cleanNumbers will be our first example of integration tests (combining units: testing units with dependencies). we will talk about balancing unit and integration tests.

// what makes cleanNumbers special? it's a function that calls other functions (your test will also implicitly test those other functions). so at the end, you are testing the combination of different functions. this is what is called an integration test. you could call multiple functions inside of a test, and use the results in combination (that would be an integration test), OR, you test a function that already calls other functions (as we have in cleanNumbers) and this would also be an integration test.
