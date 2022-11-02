// src/mocks/handlers.js
import { rest } from 'msw';

export const handlers = [
	rest.get('http://localhost:3030/scoops', (req, res, ctx) => {
		return res(
			ctx.json([
				{ name: 'Chocolate', imagePath: '/images/chocolate.png' },
				{ name: 'Vanilla', imagePath: '/images/vanilla.png' },
			])
		);
	}),
	rest.get('http://localhost:3030/toppings', (req, res, ctx) => {
		return res(
			ctx.json([
				{ name: 'Chocolate fudge', imagePath: '/images/chocolate-fudge.png' },
				{ name: 'Blueberries', imagePath: '/images/blueberries.png' },
			])
		);
	}),
];
