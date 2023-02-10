import { rest } from 'msw';

export const handlers = [
	rest.get('http://localhost:3000/scoop', (req, res, ctx) => {
		return res(
			ctx.json([
				{
					name: 'Mint chip',
					imagePath: '/images/mint-chip.png',
				},
				{
					name: 'Vanilla',
					imagePath: '/images/vanilla.png',
				},
				{
					name: 'Chocolate',
					imagePath: '/images/chocolate.png',
				},
				{
					name: 'Salted caramel',
					imagePath: '/images/salted-caramel.png',
				},
			])
		);
	}),

	rest.get('http://localhost:3000/topping', (req, res, ctx) => {
		return res(
			ctx.json([
				{
					name: 'M&Ms',
					imagePath: '/images/m-and-ms.png',
				},
				{
					name: 'Hot fudge',
					imagePath: '/images/hot-fudge.png',
				},
				{
					name: 'Peanut butter cups',
					imagePath: '/images/peanut-butter-cups.png',
				},
				{
					name: 'Gummi bears',
					imagePath: '/images/gummi-bears.png',
				},
				{
					name: 'Mochi',
					imagePath: '/images/mochi.png',
				},
				{
					name: 'Cherries',
					imagePath: '/images/cherries.png',
				},
			])
		);
	}),
];
