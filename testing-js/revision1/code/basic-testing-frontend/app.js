import extractDataFromForm from './src/parser.js';
import validateAndTransform from './src/util/validate-transform.js';
import generateResultText from './src/util/output.js';

const form = document.querySelector('form');
const output = document.getElementById('result');

function formSubmitHandler(event) {
	event.preventDefault();

	const numberInputs = extractDataFromForm(form);
	const result = validateAndTransform(numberInputs);
	const resultText = generateResultText(result);
	output.textContent = resultText;
}

form.addEventListener('submit', formSubmitHandler);
