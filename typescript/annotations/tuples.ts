const cocaCola = {
	color: 'brown',
	carbonated: true,
	sugar: 30,
};

const sprite: [string, boolean, number] = ['brown', true, 40];

// or:

type Drink = [string, boolean, number];

const coke: Drink = ['brown', true, 50];
const tea: Drink = ['yellow', false, 1];
