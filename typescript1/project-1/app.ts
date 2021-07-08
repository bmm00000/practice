// UNION TYPES:
function combine(input1: string | number, input2: string | number) {
	// return input1 + input2
	// we get an error above because TS sees union types (not the specific types) and is not sure that the types we are adding can be used with +. Therefore, we can add a runtime check:
	let result;
	if (typeof input1 === 'number' && typeof input2 === 'number') {
		result = input1 + input2;
	} else {
		result = input1.toString() + input2.toString();
	}

	return result;
}

const addAges = combine(22, 44);
console.log(addAges);

const addNames = combine('Jose', 'Marina');
console.log(addNames);

// LITERAL TYPES:
// not only you specify the type, but also the specific value of that type, for example:
const myAge = 29;

// we can use a literal type (in conjunction with a union type) with 'convertResult', the reason is that, if we type it as a string, we may make mistakes writing that string when calling the function:
function combine2(
	input1: string | number,
	input2: string | number,
	convertResult: 'as-number' | 'as-string'
) {
	let result;
	if (
		(typeof input1 === 'number' && typeof input2 === 'number') ||
		convertResult === 'as-number'
		// WATCH OUT!! don't say 'typeof convertResult === 'as-number'
	) {
		result = +input1 + +input2;
	} else {
		result = input1.toString() + input2.toString();
	}

	return result;
}

const combine2Ages = combine2(22, 22, 'as-number');
console.log(combine2Ages);

const combine22Ages = combine2('22', '22', 'as-number');
console.log(combine2Ages);

const combine2Names = combine2('Jose', 'Ola', 'as-string');
console.log(combine2Names);

// TYPE ALIASES/CUSTOM TYPES:
// sometimes you don't want to remember for example the different types inside the union types you are using, therefore you can define your own types, but be careful not to use reserved keywords in JS, for example Class, Date, etc.:

type Combinable = number | string;
type ConversionDescriptor = 'as-number' | 'as-string';

function combine3(
	input1: Combinable,
	input2: Combinable,
	convertResult: ConversionDescriptor
) {
	let result;
	if (
		(typeof input1 === 'number' && typeof input2 === 'number') ||
		convertResult === 'as-number'
		// WATCH OUT!! don't say 'typeof convertResult === 'as-number'
	) {
		result = +input1 + +input2;
	} else {
		result = input1.toString() + input2.toString();
	}

	return result;
}

// another example of a type alias:
// type User = { name: string; age: number };
// const u1: User = { name: 'Max', age: 30 };

// This allows you to avoid unnecessary repetition and manage types centrally.
// For example, you can simplify this code:

// function greet(user: { name: string; age: number }) {
// 	console.log('Hi, I am ' + user.name);
// }

// function isOlder(user: { name: string; age: number }, checkAge: number) {
// 	return checkAge > user.age;
// }

// To:

type User = { name: string; age: number };

function greet(user: User) {
	console.log('Hi, I am ' + user.name);
}

function isOlder(user: User, checkAge: number) {
	return checkAge > user.age;
}
