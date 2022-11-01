// src/mocks/handlers.js
import { rest } from 'msw';

export const handlers = [
	rest.get('https://localhost:3030', (req, res, ctx) => {
		res(
			ctx.json([
				{ name: 'Chocolate', imagePath: '/images/vanilla' },
				{ name: 'Vanilla', imagePath: '/images/chocolate' },
			])
		);
	}),
];
