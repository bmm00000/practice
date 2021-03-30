const oldCar1 = {
	name: 'civic',
	year: new Date(),
	broken: true,
};

const printCar1 = (car: {
	name: string;
	year: Date;
	broken: boolean;
}): void => {
	console.log(`The car is a ${car.name}`);
	console.log(`The car was produced in ${car.year}`);
	console.log(`Is it broken? ${car.broken}`);
};

printCar1(oldCar1);

//However, the more properties we have, the longer the lines become and the code is less and less readable. That's why we use interfaces:

interface Vehicle {
	name: string;
	year: Date;
	broken: boolean;
	summary(): string;
}

const oldCar2 = {
	name: 'civic',
	year: new Date(),
	broken: true,
	summary(): string {
		return `Name: ${this.name}. Year: ${this.year}`;
	},
};

const printCar2 = (car: Vehicle): void => {
	console.log(car.summary());
};

printCar2(oldCar2);

// Since we are only using the 'summary' function, we can delete the other properties of the interface, and still our oldCar3 will SATISFY THE INTERFACE:

interface VehicleSum {
	summary(): string;
}

const oldCar3 = {
	name: 'civic',
	year: new Date(),
	broken: true,
	summary(): string {
		return `Name: ${this.name}. Year: ${this.year}`;
	},
};

const printCar3 = (car: VehicleSum): void => {
	console.log(car.summary());
};

printCar3(oldCar3);

// but still, we can change the name of the interface and function to other more appropriate names of what they do (since the interface and function have nothing to do with vehicles anymore, we can rename them to some more generic names):

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

const printSummary = (item: Reportable): void => {
	console.log(item.summary());
};

printSummary(fastCar);
printSummary(cocaCola);
