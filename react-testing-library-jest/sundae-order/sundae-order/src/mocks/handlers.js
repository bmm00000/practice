// src/mocks/handlers.js
import { rest } from 'msw';

export const handlers = [
	rest.get('http://localhost:3030/scoops', (req, res, ctx) => {
		res(
			ctx.json([
				{ name: 'Chocolate scoop', imagePath: '/images/vanilla' },
				{ name: 'Vanilla scoop', imagePath: '/images/chocolate' },
			])
		);
	}),
];
