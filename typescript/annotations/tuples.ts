const pepsiCola = {
	color: 'brown',
	carbonated: true,
	sugar: 30,
};

// we express the same data with a tuple:

const sprite: [string, boolean, number] = ['brown', true, 40];

// or we can use an 'alias':

type Drink = [string, boolean, number];

const coke: Drink = ['brown', true, 50];
const tea: Drink = ['yellow', false, 1];
