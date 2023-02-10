import { render, screen } from '@testing-library/react';
import Async from './Async';

describe('Async component', () => {
	test('renders posts if request succeeds', async () => {
		// Arrange:
		window.fetch = jest.fn();
		window.fetch.mockResolvedValueOnce({
			json: async () => [{ id: 'p1', title: 'First post' }],
		});
		// window.fetch is the built-in 'fetch' function (in reality, it's a method in the window object)
		// the 'jest' object is globally available in our testing code, and this object has utility methods. for example, the 'fn' utility method creates a mock function. the difference between creating your own function and using the mock function from the 'fn' method is that the latter will have some additional features that you can use. so we override the built-in 'fetch' function with our dummy function (only in our testing code). we then use the mock function and call special methods, like mockResolvedValueOnce (it allows us to set a value this mock 'fetch' function should resolve to when it's being called, and it should resolve to something that is used by our code in our component; in our case, it should resolve to an object that has a 'json' method that returns a promise, that resolves in an array with some mock posts). in a nutshell, we are overriding the built-in 'fetch' function with our dummy 'fetch' function, where we set the actual value that the promise should return (what we specify as an argument of mockResolvedValueOnce). as a result, we are simmulating a successful http request without sending a real http request to the api, and we can control different outcomes for the mock fetch function so we can test the different scenarios that we want.
		render(<Async />);

		// Act:
		// we don't need to act, because rendering is everything we want to do, since we will fetch posts authomatically, beause of useEffect.

		// Assert:
		// we want to check if some list items were rendered on the screen (we use getByRole, because 'li' is a role that html elements can assume), because if that happens then we know that posts were fetched correctly. since we expect to have muliple 'li', we use getAllByRole (getByRole would fail if we had more than one item with that specified role):
		const listItemElements = await screen.findAllByRole('listitem');
		// listItemElements will be an array of html elements
		// to find out about all supported roles:
		// https://www.w3.org/TR/html-aria/#docconformance
		expect(listItemElements).not.toHaveLength(0);
	});
});

// getAllByRole will look for the elements on the screen instantly, but since we are making an http requests, the elements will not be on the screen instantly (initially, we will have an empty array as 'posts' in the first render cycle. after this render cycle, the effect function will run, and we will make the http request). that's why we use findAllByRole instead of getAllByRole: the find functions return a promise, and react testing library will be re-evaluating the screen until findAllByRole succeeds. findAllByRole has the following arguments: 'role', {exact: true or false}, {timeout period, by default one second, so if your items are not there after one second, it will fail.}

// however, when we run our tests, we don't want to send http requests to a server, because that would cost a lot of network traffic (it would hammer our servers with requests if you have a lot of tests with a lot of requests), that would also potentially create problems if the server is down and our tests would fail for that reason, and also, if you are testing post requests, your tests might be posting data to a database/changing things on the server. therefore, what we want to do is, either not to send a real http request, or to send it to some fake server, a testing server. we will see in this example, how not to send a real http request. Because, when you write tests, you don't want to test code that you haven't written, in our case, you don't want to test whether the 'fetch' function works correctly (the 'fetch' function was not written by us, it's built into the browser, we rely on the browser vendors to have written that function correctly). what we want to test is whether our components work correctly depending on the different outcomes of the request. therefore, we will change the 'fetch' function with a mock function (a dummy function that overwrites the built-in function), this dummy function will not send a real http request. therefore, when our component executes during testing, we will use that dummy function instead of the real built-in function (the same applies to other built-in functions like 'localStorage', etc.). this is such a common scenario that jest has built in support for mocking such common built-in functions (see above).
