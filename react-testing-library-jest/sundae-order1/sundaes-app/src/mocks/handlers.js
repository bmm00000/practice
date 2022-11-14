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
	rest.get('https://localhost:3000/toppings', (req, res, ctx) => {
		return res(
			ctx.json([
				{
					name: 'Berries',
					imagePath: '/images/berries.png',
				},
				{
					name: 'Choco fudge',
					imagePath: '/images/choco-fudge.png',
				},
				{
					name: 'M&Ms',
					imagePath: '/images/m&ms.png',
				},
			])
		);
	}),
];
