// WE ARE JUST GOING TO FOCUS ON TESTING THE AUTOCOMPLETE, NOT THE COMPARISON COLUMNS

// people spend more time setting up tests than writting tests: as we see in this project, to set up this is a nightmare (different files, etc...). That's because of the environment. In the former lesson, we set it up fast becuase we were in node (we were executing mocha from the command line so it runs the tests in the node.js environment). Testing code in node is very straightforward, but testing code in the browser is a nightmare (we need to do it, since our 'autocomplete' has methods that operate in the browser, addeventlistener, appenchild, etc. that doesn't work in node). So we are going to see how to get mocha to work inside of a browser. we are going to run browser-based code with node.

// in mocha's documentation, go to 'features' and then to 'browser support'. there you can see the html document that you will use to test with mocha in the browser. This is the platform that we will use to test our browser code.

// so you create the 'test' folder to include there the testing files, and include the original js files (autocomplete.js and utils.js) and testing js files (autocomplete.test.js) in the scripts of 'test.html'. then when you open 'test.html' in the browser, you will see the test results. the goal is to generate an autocomplete in the 'test.html' file, without styling (no css linked), just to check that the functionality works.

// if you create an autocomplete and search for something, the dropdown will not be closed in the next test, so if you expect it to be closed, the test will fail, therefore the order of the tests will matter. in order to avoid the order potentially screwing up our tests, we set up the autocomplete from scratch at the beginning for each test (the 'beforeEach' function that mocha gives us is called the hook):

const waitFor = (selector) => {
	return new Promise((resolve, reject) => {
		const interval = setInterval(() => {
			if (document.querySelector(selector)) {
				clearInterval(interval);
				clearTimeout(timeout);
				resolve();
			}
		}, 30);

		const timeout = setTimeout(() => {
			clearInterval(interval);
			reject();
			// if the promise is rejected, it will throw and error and the test will fail
		}, 2000);
	});
};

beforeEach(() => {
	// before anything, we clean what we have before to avoid duplications:
	document.querySelector('#target').innerHTML = '';
	createAutoComplete({
		root: document.querySelector('#target'),
		// you can decide whether to test the api request or just to include some dummy data to test the other aspects of the autocomplete (you can choose the later, for example, when they charge you to use the api, or when the api is very slow, etc.). in our case, we are going to return some fake data when we type in our fake autocomplete:
		fetchData() {
			return [
				{ Title: 'Avengers' },
				{ Title: 'Not Avengers' },
				{ Title: 'Another Avengers' },
			];
		},
		renderOption(movie) {
			// we included only 'Title' as a property of the fake movies
			return movie.Title;
		},
	});
});

// now we are going to check that the dropdown is not open at the beginning:
it('Dropdown starts closed', () => {
	const dropdown = document.querySelector('.dropdown');
	// in node, we could say: assert.strictEquals(dropdown.className, 'dropdown'), but we don't have access to the node standard library inside of the browser.
	// that's why, when we are running mocha in the browser, the official recommendation is to use a library called chai. chai is an expectation library or assertion library, ie. it allows us to use the same 'assertion' functionality of the node standard library (remember, the 'assertion' functionality is an improvement over the multiple 'if' statements that throw an error...)
	// the chai assertion library gives you 3 different ways (should, expect, assert) of doing the same thing (see the screenshot). We are going to use 'expect':
	expect(dropdown.className).not.to.include('is-active');
});

// now we are testing that when we type something, the dropdown opens up. we are going to fake some text written inside the input, and then manually fake an event (see screenshot). if we don't do anything else, our test will still fail becuase of the debouncer function, the event takes some time to be triggered. therefore, the dropdown is not active yet when the 'expect' function is run. how to fix this? you can use a 'setTimeout' function, but this is not good because if you change the delay of the debouncer, you will need to change the delay of the setTimeout as well. What we are going to do is to use a helper function: 'waitFor' (until the dropdown items don't appear, the file does not continue running):
it('After searching, dropdown opens up', async () => {
	const input = document.querySelector('input');
	input.value = 'avengers';
	input.dispatchEvent(new Event('input'));

	await waitFor('.dropdown-item');

	const dropdown = document.querySelector('.dropdown');
	expect(dropdown.className).to.include('is-active');
});

it('After searching, displays some results', async () => {
	const input = document.querySelector('input');
	input.value = 'avengers';
	input.dispatchEvent(new Event('input'));

	await waitFor('.dropdown-item');

	const items = document.querySelectorAll('.dropdown-item');
	expect(items.length).to.equal(3);
});

// as we can see, this approach works, but it took a lot of code to test only the autocomplete (so we tested just a widget, not the whole application), and we didn't even get real data from the api...
// that's why we are going to build now our own testing framework: see next project
