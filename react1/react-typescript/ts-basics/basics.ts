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

// generics:
function insertAtBeginning(arr: any[], value: any) {
	const newArr = [value, ...arr];
	return newArr;
}
// this might be a useful utility function when we want to insert a value of any type at the beginning of the array without mutating the original array (ie. we return a new array)

const demoArray = [1, 2, 3];

const updatedArray = insertAtBeginning(demoArray, -1);
// the problem here is that 'updatedArray' is of type 'any[]'. therefore, ts will not warn us about the following (so we will have an error at runtime with the following):
updatedArray[0].split('');
// what happens is that we cannot use ts functionality here, since ts considers that the array could contain any type of value, although in our case we only have numbers, and we cannot use 'split' on a number (but only we know that, ts doesn't know that it's a number).

// to deal with this kind of situations, we have generics (we can convert the function above into a generic function: after the function name, we define a generic type which will be available only inside of the function (usually is 'T', for 'type', but any identifier of your choice will be ok)):
function insertAtBeginning2<T>(arr: T[], value: T) {
	const newArr = [value, ...arr];
	return newArr;
}

const updatedArray2 = insertAtBeginning2(demoArray, -1);
// now ts infers that this is an array of numbers, therefore it will warn us if there's something wrong, as follows:
updatedArray2[0].split('');
// therefore, generics allow you to write functions that are type safe, but also flexible.

// Generic Types ("Generics") can be tricky to wrap your head around.

// But indeed, we are working with them all the time - one of the most prominent examples is an array.

// Consider this example array:

// let numbers = [1, 2, 3];
// Here, the type is inferred, but if we would assign it explicitly, we could do it like this:

// let numbers: number[] = [1, 2, 3];
// number[] is the TypeScript notation for saying "this is an array of numbers".

// But actually, number[] is just syntactic sugar!

// The actual type is Array. ALL arrays are of the Array type.

// BUT: Since an array type really only makes sense if we also describe the type of items in the array, Array actually is a generic type.

// You could also write the above example liks this:

// let numbers: Array<number> = [1, 2, 3];
// Here we have the angle brackets (<>) again! But this time NOT to create our own type (as we did it in the previous lecture) but instead to tell TypeScript which actual type should be used for the "generic type placeholder" (T in the previous lecture).

// Just as shown in the last lecture, TypeScript would be able to infer this as well - we rely on that when we just write:

// let numbers = [1, 2, 3];
// But if we want to explicitly set a type, we could do it like this:

// let numbers: Array<number> = [1, 2, 3];
// Of course it can be a bit annoying to write this rather long and clunky type, that's why we have this alternative (syntactic sugar) for arrays:

// let numbers: number[] = [1, 2, 3];
// If we take the example from the previous lecture, we could've also set the specific type for our placeholder T explicitly:

// const stringArray = insertAtBeginning<string>(['a', 'b', 'c'], 'd');
// So we can, not only use the angle brackets to define a generic type but also to USE a generic type and explicitly set the placeholder type that should be used - sometimes this is required if TypeScript is not able to infer the (correct) type. We'll see this later in this course section!
