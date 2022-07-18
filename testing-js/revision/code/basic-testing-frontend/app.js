import { parseData } from './src/parser.js';
import { generateResult, generateResultText } from './src/result.js';

const form = document.querySelector('form');
const output = document.getElementById('result');

function formSubmitHandler(event) {
	event.preventDefault();
	const formData = new FormData(form);

	// parse data:
	const numberInputs = parseData(formData);

	// generate result:
	const result = generateResult(numberInputs);

	// generate output:
	const resultText = generateResultText(result);

	output.textContent = resultText;
}

form.addEventListener('submit', formSubmitHandler);
