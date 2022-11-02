import { render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';

import OrderEntry from '../OrderEntry';
import { server } from '../../../mocks/server';

test('handles the errors for both scoops and toppings routes', async () => {
	server.resetHandlers(
		rest.get('http://localhost:3030/scoops', (req, res, ctx) => {
			return res(ctx.status(500));
		}),
		rest.get('http://localhost:3030/toppings', (req, res, ctx) => {
			return res(ctx.status(500));
		})
	);

	render(<OrderEntry />);

	await waitFor(async () => {
		const alertElements = await screen.findAllByRole('alert');

		expect(alertElements).toHaveLength(2);
	});
});
