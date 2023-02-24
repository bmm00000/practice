import { render, screen } from '@testing-library/react';
import Async from './Async';

describe('Async component', () => {
	test('should render list items upon successful fetch from api', async () => {
		window.fetch = jest.fn().mockResolvedValueOnce({
			json: async () => [{ id: '1', title: 'First post' }],
		});
		render(<Async />);

		const listItemsArray = await screen.findAllByRole('listitem');
		expect(listItemsArray).not.toHaveLength(0);
	});
});
