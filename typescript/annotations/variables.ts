let age: number = 44;
let myName: string = 'John';
let hasName: boolean = true;

let nothingMuch: null = null;
let nothing: undefined = undefined;

// built in objects
let today: Date = new Date();

//arrays
let myColors: string[] = ['blue', 'yellow'];
let myNumbers: number[] = [2, 3, 4];
let myLogic: boolean[] = [true, false, true];

// class
class Car {}
let ferrari: Car = new Car();

// object literal
let point: { x: number; y: number } = {
	x: 10,
	y: 20,
};

//function
const logNum: (i: number) => void = (i: number) => {
	console.log(i);
};

// when to use type annotations:
// 1/ functions that return the 'any' type:
const json = '{ "x": 10, "y": 20 }';
const coordinates: { x: number; y: number } = JSON.parse(json);
console.log(coordinates);

// 2/ when we declare a variable in one line and initialize it later:
let colors = ['blue', 'green', 'black'];
let foundGreen: boolean;

for (let i = 0; i < colors.length; i++) {
	if (colors[i] === 'green') {
		foundGreen = true;
	}
}

// 3/ variable whose type cannot be inferred correctly:
let numbers = [-2, 2, -3];
let numberAboveZero: boolean | number = false;

for (let i = 0; i < numbers.length; i++) {
	if (numbers[i] > 0) {
		numberAboveZero = numbers[i];
	}
}
