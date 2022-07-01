const ages: number[] = [];
const gameBoard: string[][] = [];

type Product = {
	name: string;
	price: number;
};

function getTotal(products: Product[]): number {
	let total = 0;
	for (const prod of products) {
		total += prod.price;
	}
	return total;
}

console.log(
	getTotal([
		{ name: 'glass', price: 2 },
		{ name: 'window', price: 3 },
	])
);
