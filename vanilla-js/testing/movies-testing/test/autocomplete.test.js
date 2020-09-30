// WE ARE JUST GOING TO FOCUS ON TESTING THE AUTOCOMPLETE, NOT THE COMPARISON COLUMNS

// people spend more time setting up tests than writting tests: as we see in this project, to set up this is a nightmare (different files, etc...). That's because of the environment. In the former lesson, we set it up fast becuase we were in node (we were executing mocha from the command line so it runs the tests in the node.js environment). Testing code in node is very straightforward, but testing code in the browser is a nightmare (we need to do it, since our 'autocomplete' has methods that operate in the browser, addeventlistener, appenchild, etc. that doesn't work in node). So we are going to see how to get mocha to work inside of a browser.

// in mocha's documentation, go to 'features' and then to 'browser support'. there you can see the html document that you will use to test with mocha in the browser. This is the platform that we will use to test our browser code.

// so you create the 'test' folder to include there the testing files, and include the original js files (autocomplete.js and utils.js) and testing js files (autocomplete.test.js) in the scripts of 'test.html'. then when you open 'test.html' in the browser, you will see the test results. the goal is to generate an autocomplete in the 'test.html' file, without styling (no css linked), just to check that the functionality works:

it('Shows an autocomplete', () => {
	createAutoComplete({
		root: document.querySelector('#target'),
		// you can decide whether to test the api request or just to include some dummy data to test the other aspects of the autocomplete (you can choose the later, for example, when they charge you to use the api, or when the api is very slow, etc.). in our case, we are going to return some fake data when we type in our fake autocomplete:
		fetchData() {
			return [ { Title: 'Avengers' }, { Title: 'Not Avengers' }, { Title: 'Another Avengers' } ];
		},
		renderOption(movie) {
			// we included only 'Title' as a property of the fake movies
			return movie.Title;
		}
	});

	// now we are going to check that the dropdown is not open at the beginning
	const dropdown = document.querySelector('.dropdown');
	// in node, we could say: assert.strictEquals(dropdown.className, 'dropdown'), but we don't have access to the node standard library inside of the browser.
	// that's why, when we are running mocha in the browser, the official recommendation is to use a library called chai. chai is an expectation library or assertion library, ie. it allows us to use the same 'assertion' functionality of the node standard library (remember, the 'assertion' functionality is an improvement over the multiple 'if' statements that throw an error...)
	// the chai assertion library gives you 3 different ways (should, expect, assert) of doing the same thing (see the screenshot). We are going to use 'expect':
	expect(dropdown.className).not.to.include('is-active');
});

// now we are testing that when we type something, the dropdown opens up:
it('After searching, dropdown opens up', () => {});
