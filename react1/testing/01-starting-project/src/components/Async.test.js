import { render, screen } from '@testing-library/react';
import Async from './Async';

describe('Async component', () => {
	test('renders posts if request succeeds', () => {
		// Arrange:
		render(<Async />);

		// Act:
		// we don't need to act, because rendering is everything we want to do, since we will fetch posts authomatically, beause of useEffect.

		// Assert:
		// we want to check if some list items were rendered on the screen (we use getByRole, because 'li' is a role that html elements can assume), because if that happens then we know that posts were fetched correctly. since we expect to have muliple 'li', we use getAllByRole (getByRole would fail if we had more than one item with that specified role):
		const listItemElements = screen.getAllByRole('listitem');
		// listItemElements will be an array of html elements
		// to find out about all supported roles:
		// https://www.w3.org/TR/html-aria/#docconformance
		expect(listItemElements).not.toHaveLength(0);
	});
});
