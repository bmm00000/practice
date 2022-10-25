function generateResultText(result) {
	let resultText = '';

	if (result === 'invalid') {
		resultText = 'Invalid input. You must enter valid numbers.';
	} else if (result !== 'no-calc') {
		resultText = 'Result: ' + result;
	}

	return resultText;
}

export default generateResultText;
