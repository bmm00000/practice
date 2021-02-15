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
