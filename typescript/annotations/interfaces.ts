interface Car {
	name: string;
	year: Date;
	broken: boolean;
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

const describeCar = (car: Car): void => {
	console.log(car.summary());
};

describeCar(fastCar);
