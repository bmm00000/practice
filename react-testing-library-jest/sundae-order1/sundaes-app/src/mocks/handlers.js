// src/mocks/handlers.js
import { rest } from 'msw';

export const handlers = [
	rest.get('https://localhost:3000/scoops', (req, res, ctx) => {
		return res(
			ctx.json([
				{
					name: 'Vanilla',
					imagePath: '/images/vanilla.png',
				},
				{
					name: 'Chocolate',
					imagePath: '/images/chocolate.png',
				},
			])
		);
	}),
];
