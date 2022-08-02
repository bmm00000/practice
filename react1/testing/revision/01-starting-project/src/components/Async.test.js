import { render, screen } from '@testing-library/react';

import Async from './Async';

describe('Async component', () => {
	it('should render posts if the request succeeds', async () => {
		window.fetch = jest.fn();
		window.fetch.mockResolvedValueOnce({
			json: async () => [{ id: 'test-id', title: 'test-title' }],
		});

		render(<Async />);

		const listItems = await screen.findAllByRole('listitem');

		expect(listItems).not.toHaveLength(0);
	});
});
