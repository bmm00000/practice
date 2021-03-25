const oldCar = {
	name: 'civic',
	year: 1945,
	broken: true,
};

const printCar = (car: { name: string; year: number; broken: boolean }) => {
	console.log(`The car is a ${car.name}`);
	console.log(`The car was produced in ${car.year}`);
	console.log(`Is it broken? ${car.broken}`);
};

printCar(oldCar);
//However, the more properties we have, the longer the lines become and the code is less and less readable. That's why we use interfaces:

interface Reportable {
	summary(): string;
}

const fastCar = {
	name: 'bugati',
	year: new Date(),
	broken: false,
	summary(): string {
		return `This car is a ${this.name}`;
	},
};

const cocaCola = {
	color: 'brown',
	sugar: 33,
	summary(): string {
		return `Coke is ${this.color}`;
	},
};

const describeItem = (item: Reportable): void => {
	console.log(item.summary());
};

describeItem(fastCar);
describeItem(cocaCola);
