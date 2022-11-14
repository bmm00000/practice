import { render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { server } from '../../../mocks/server';

import OrderEntry from '../OrderEntry';

test('displays alert message when request is not successful', async () => {
	server.resetHandlers(
		rest.get('https://localhost:3000/scoops', (req, res, ctx) => {
			return res(ctx.status(500));
		}),
		rest.get('https://localhost:3000/toppings', (req, res, ctx) => {
			return res(ctx.status(500));
		})
	);

	render(<OrderEntry />);

	await waitFor(async () => {
		const alerts = await screen.findAllByRole(
			'alert',
			'displays alert message when request is not successful'
		);
		expect(alerts).toHaveLength(2);
	});
});
