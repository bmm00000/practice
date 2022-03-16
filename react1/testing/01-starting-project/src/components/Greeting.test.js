import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Greeting from './Greeting';

describe('Greeting component', () => {
	test('renders "Hello World" as a text', () => {
		// Arrange: we import the Greeting component, 'render' method, and then you render your component (you pass the component in JSX):
		render(<Greeting />);

		// Act: in this case, nothing.

		// Assert: we want to look into the simulated component content. we import the 'screen' method, which gives us access to the virtual screen that was rendered, and then we can find elements in that screen (for this, you have several functions available: get functions, query functions, and find functions, the main difference is when this functions throw errors, and if they return a promise or not. get functions will throw an error if an element is not found, but query functions won't do that, and find functions will return a promise). in our case, we will use 'getByText' (if it doesn't find the text, it will throw an error), and we can call it with a regex, or just hard code a string with the text we are looking for. you can also pass a second argument and configure that you want the exact match ({exact: true}, which is the default, or {exact: false}, in the latter, casing won't matter and it will also match sub-strings):
		const helloWorldElement = screen.getByText('Hello World!');
		// now we make the actual assertion, we check whether that element exists, so we use the globally available 'expect' function, to which we can pass our testing result value (it can be anything: a number, a string, or, in our case, a dom node (html element)). and then we have various matcher functions (in our case, we will use 'toBeInTheDocument'; you can also use '.not' to check by opposites, for example, '.not.toBeInTheDocument'; in this case you would need to use 'queryByText' method for the opposite to work, since 'getByText' would throw an error because it wouldn't be able to find the text):
		expect(helloWorldElement).toBeInTheDocument();
	});

	// when we are writing tests, we want to test for all possible scenarios, in our example, the two states that we can have in our app, so we are going to write the two following tests:
	test('renders "good to see you" if the button was NOT clicked', () => {
		render(<Greeting />);
		const outputElement = screen.getByText('good to see you', { exact: false });
		expect(outputElement).toBeInTheDocument();
	});

	test('renders "Changed!" if the button was clicked', () => {
		//  THIS IS HOW YOU CAN TEST USER INTERACTION AND STATE CHANGES:
		// Arrange:
		render(<Greeting />);

		// Act:
		// (since we want to click that button, we import another feature from another package (testing library/using event package) which also was installed out of the box with CRA). userEvent is an object that helps us trigger events in this virtual screen):
		const buttonElement = screen.getByRole('button');
		// 'button' is a role that elements can have in the screen. that's why we can select it like that (because we have only one button) (we could also select it by the text it has, using getByText)
		userEvent.click(buttonElement);

		// Assert:
		const outputElement = screen.getByText('Changed!');
		expect(outputElement).toBeInTheDocument();
	});

	// if you introduce an error while developing, for example, you forget to render the 'good to see you' conditionally (you forget the {!changedText &&}), the tests will not detect this, and all tests will still pass (you can try this). that's why we need another test to check that 'good to see you' doesn't appear if you click the button:
	test('does not render "good to see you" if the button was clicked', () => {
		render(<Greeting />);
		const buttonElement = screen.getByRole('button');
		userEvent.click(buttonElement);
		const outputElement = screen.queryByText('good to see you', {
			exact: false,
		});
		// 'getByText' would fail if the element was not found, that's why we use 'queryByText' (which will return null if the text is not found).
		expect(outputElement).toBeNull();
	});
});

// even though you could test in App.js what is rendered from Greeting.js, it is a convention to write the test as close as possible to what you want to test, that's why we create 'Greeting.test.js'

// the 'test()' function is globally available, you don't need to import it.

// 'arrange': for example, we want to render the component that we want to test.
// 'act' : do the thing you want to actually test, for example, simulate a button click.

// remember that if you run all the tests, but there are no tests in App.test.js, it will throw an error (there must be at least one test in a 'test.js' file). that's why, in order to avoid this error, we deleted App.test.js.

// since we may have many tests, we organize them in test suits, for example, all the tests belonging to one feature or one component, etc. you create a test suit by using the global 'describe' function (the first argument is a description of the category to which your tests will belong; the second argument is an annonymous function where you place your different tests). (note that, if you don't have any explicitly set suit, you will get one authomatically in the test results). note that if you put descriptions together, it will read like this: 'Greeting component renders "Hello World" as a text', 'Greeting component renders "good to see you" if the button was NOT clicked', etc. that's how you typically want to name the tests, so the suit description and tests descriptions form nice sentences.
