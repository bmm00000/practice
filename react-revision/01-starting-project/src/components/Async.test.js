import { render, screen } from '@testing-library/react';

import Async from './Async';

describe('Async component', () => {
	it('should render the fetched posts as list items', async () => {
		window.fetch = jest.fn();
		window.fetch.mockResolvedValueOnce({
			json: async () => [{ id: 'id1', title: 'title1' }],
		});

		render(<Async />);

		const listItems = await screen.findAllByRole('listitem');
		expect(listItems).not.toHaveLength(0);
	});
});
