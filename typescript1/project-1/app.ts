// UNION TYPES:
// we may have a function where we accept different types of values, as many types as you need (for example, we accept number or string or boolean => string | number | boolean):
function combine(input1: string | number, input2: string | number) {
	// return input1 + input2
	// we get an error in the line above because TS sees just union types (not the specific types that we have in our case, since in our case, + works with both numbers and strings) and is not sure that the types we are adding can be used with +. Nonetheless, we can work around that issue: we can add a runtime check:
	let result;
	if (typeof input1 === 'number' && typeof input2 === 'number') {
		result = input1 + input2;
	} else {
		result = input1.toString() + input2.toString();
		// for the same reason as above, we will need to specify that we convert the inputs to strings, even though both inputs might already be strings. therefore, we make clear that we work with numbers, or that we work with strings, so ts will not complain.

		// THE RUNTIME CHECKED WE USED will not always be required when you work with union types, but sometimes you will need it (since you will be more flexible regarding the parameters types, but then you will have different logic and will do different things in your function depending what specific types you are getting). for example, in our example above, we accept both numbers and strings, and we combine them differently depending on whether they are numbers or strings (that's what we do in our runtime check)
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
// this happens because you are using 'const', so ts knows it can't change!

// we can use a literal type (in conjunction with a union type) with 'convertResult', the reason is that, if we type 'convertResult' just as a type string, we would have to memorize these values ('as-string' and 'as-number') and may make mistakes writing those strings when calling the function. we could use an enum, but since we only have two possible values, a literal type could be an option:
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
	//  WHAT IF WE PASS AS ARGUMENTS TWO NUMBERS AND 'AS-STRING'??? MISTAKE IN THE COURSE!!

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

// Type aliases can be used to "create" your own types - you can provide an alias to a (possibly complex) object type, for example:
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
// the function name is wrong??

// To:

type User = { name: string; age: number };

function greet(user: User) {
	console.log('Hi, I am ' + user.name);
}

function isOlder(user: User, checkAge: number) {
	return checkAge > user.age;
}
