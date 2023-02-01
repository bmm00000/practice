import { render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import OrderEntry from '../OrderEntry';
import { server } from '../../mocks/server';

test('should display alert when we get error from server', async () => {
	server.resetHandlers(
		rest.get('http://localhost:3000/scoop', (req, res, ctx) => {
			return res.status(500);
		}),
		rest.get('http://localhost:3000/topping', (req, res, ctx) => {
			return res.status(500);
		})
	);

	render(<OrderEntry />);

	await waitFor(async () => {
		const alertElements = await screen.findAllByRole('alert');
		expect(alertElements).toHaveLength(2);
	});
});
