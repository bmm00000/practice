const carMakers = ['toyota', 'ford', 'ferrari'];

const dates = [new Date(), new Date()];

const modelsMade: string[][] = [];

// help with inference when extracting values:
const carMaker = carMakers[0];
const myCar = carMakers.pop();

// prevent incompatible values
carMakers.push(100);

// help with 'map' and similar:
const upperMakers = carMakers.map((maker: string): string => {
	return maker.toUpperCase();
});

// flexible types:
const importantDates: (Date | string)[] = [];
importantDates.push(new Date());
importantDates.push('20.3.2021');
