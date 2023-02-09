import { extractNumbers } from './src/parser.js';
import {
	generateResult,
	generateResultText,
	outputResult,
} from './src/util/results.js';

const form = document.querySelector('form');
const output = document.getElementById('result');

function formSubmitHandler(event) {
	event.preventDefault();
	const formData = new FormData(form);
	const numberInputs = extractNumbers(formData);

	const result = generateResult(numberInputs);
	const resultText = generateResultText(result);

	outputResult(resultText, output);
}

form.addEventListener('submit', formSubmitHandler);
