// core primitives: number, string, boolean:
let age: number;
age = 22;
age = '2';

let username: string;
username = 'Jose';

let isInstructor: boolean = true;
isInstructor = 2;

// more complex types: arrays, objects:
let myHobbies: string[];
myHobbies = ['walking', 'reading'];

// now we want to add an object type definition (a type defining an object):
let person: { name: string; age: number };
person = { name: 'Jose', age: 26 };
person = { isEmployee: true };

let people: { name: string; age: number }[];
people = [
	{ name: 'Jose', age: 26 },
	{ name: 'Masha', age: 21 },
];

// type inference:
let course = 'The guide to react';
course = 123;
// even though you are not assigning a type to the variable 'course', ts uses its feature of type inference, which means that you need to write less code.

// therefore, the following would not be wrong, but it would be redundant:
let myCourse: string = 'Another react course';
// because if you initialize a variable with a type, ts will look at the value type, and it will use it as an inferred type for this variable.
// therefore, it's a good practice to embrace type inferrence, ie. not unnecessarily specify the type if you don't need to.

// union types (when you have more than one type that you want to allow):
let job: string | number = 'developer';
job = 2222;

// type alias (to avoid repeating type definitions, by using the 'type' keyword):
type Person = { name: string; age: number };
// btw, this is not js, only a ts feature, therefore it will be thrown out of the window after compilation.
let person1: Person;
let person2: Person;
let group: Person[];

// function and types:
// when we work with functions, there are different places where types can be applied (parameters and return values).
function addNums(a: number, b: number) {
	return a + b;
	// if we scroll over the name of the function, we will see that ts infers the type of the value that will be returned
}
// we can also set the type of the returned value (but again, if inference works as we want, there's no reason to do it):
function addNums2(a: number, b: number): number {
	return a + b;
}

function printOutput(value: any) {
	console.log(value);
}
// since we are not returning anything, this function has a special return type called 'void' (it means that this function returns undefined).
