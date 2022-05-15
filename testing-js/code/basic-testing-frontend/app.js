import { extractEnteredNumberValues } from './src/parser.js';
import { calculateResult } from './src/math.js';
import { generateResultText, outputResult } from './src/output.js';
// include '.js' in the import statements, it gave me problems when I didn't do so!!

const form = document.querySelector('form');

function formSubmitHandler(event) {
	event.preventDefault();
	const numberValues = extractEnteredNumberValues(form);

	const result = calculateResult(numberValues);
	const resultText = generateResultText(result);

	outputResult(resultText);
}

form.addEventListener('submit', formSubmitHandler);

// here we are using built-in apis of the browser (getElementById, etc.), and also this is the most complex file, since we are doing many different things in the formSubmitHandler function, and we also have some code that it's not inside of a function.

// keep in mind that you should only test your code (not the code from third party packages, not the code from built-in apis from the browser, not the code from native nodejs packages, etc.), because you don't test what you can't change.

// you have to write separate tests for your backend code. what you have to test in your frontend code is your client side reaction to the responses you get back from the backend when you send requests, eg. the frontend reaction to expected response data, missing response data, potential errors your might be getting back, etc.

// focus on the essence of a test when arranging: for example, when we were arranging an array, the array was very simple, like [1,2], not something cumbersome to read, like [1,3,4,5,6,5,...]

// if you have many assertions in the same test, chances are that you are not testing just one thing.

// since we are doing many things in the formSubmitHandler function that we have here, testing all the things that it's doing in one test would be tricky, because, even though we might want to test just one behaviour, we would execute all the code inside of the function, so if our test fails, even though we are testing just one behaviour, it could fail because any part of the function failed, so finding out why the test failed would be challenging. therefore, we might want to split it up into multiple functions. if you do that, the formSubmitHandler function will become more readable and maintainable and the tests will become more managable as well, and you will be able to have more granular tests (therefore, writing tests helps you to write better code in your appliation, since you are forced to write cleaner code).

// what we are doing in the formSubmitHandler function is: getting the input from the user, validating and transforming it, calculating the result, deriving the output text that we want to render (based on the result that we calculated), and outputing the output text in the dom
