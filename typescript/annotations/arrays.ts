// generally speaking, with typed arrays, we only use one type of value inside the array

// in these cases, we don't need annotation, since we have inference:
const carMakers = ['toyota', 'ford', 'ferrari'];
const dates = [new Date(), new Date()];

// but, for example, if the array is empty, we need annotation, or ts will infer 'any':
const makers: string[] = [];

// two dimensional arrays, in the first one we have inference, but in the second one we need to add annotation, or it will give us 'any'
const modelsMadeBy = [['corola', 'arus'], ['fiesta'], ['aventator']];
const modelsMade: string[][] = [];

// help with inference when extracting values:
const carMaker = carMakers[0];
const myCar = carMakers.pop();

// prevent incompatible values
carMakers.push(100);

// help with 'map' and similar:
const upperMakers = carMakers.map((maker: string): string => {
	return maker.toUpperCase(); // 'toUpperCase() appeared in the autocomplete with all other methods for strings. ts helps you with that.
});

// flexible types:
const importantDates: (Date | string)[] = [];
importantDates.push(new Date());
importantDates.push('20.3.2021');
