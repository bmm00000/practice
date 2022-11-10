import { render, screen } from '@testing-library/react';

import Async from './Async';

window.fetch = jest.fn(async (url) => ({
	json: async () => [
		{ id: 1, title: 'test-item-1' },
		{ id: 2, title: 'test-item-2' },
	],
}));

describe('Async component', () => {
	render(<Async />);

	it('renders a list of items', async () => {
		const itemsList = await screen.findAllByRole('listitem');

		expect(itemsList).not.toHaveLength(0);
	});
});
