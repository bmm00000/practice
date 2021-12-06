const me = {
	name: 'Jose',
	age: 29,
};

console.log(me.name);

// when we use a JS object, it's type object in TS, but also it will tell us the object type, in this example, when we hover over 'me': const person = {name: string; age: number}. therefore, if we do the following:
// console.log(me.nickname)
// then ts will tell us that 'nickname' does not exist on our specific object type, ie. {name: string; age: number} (this is the object type that ts inferred when we initialized the object) (notice that the ts object type syntax is slightly different from js objects: it has ';' after each property. we don't have key-value pairs, but key-type pairs in ts object types)

// we shouln't do the following:

const person: object = { name: 'jose', age: 29 };
console.log(person.name);
// you can also use '{}' instead of 'object'

// because the IDE and tsc will give us an error if we try to console.log(person.name), since the only thing it knows is that it's a type object, and no more info about its properties, that's why we have to let TS infer about the object type (so we get ts full support), or assign the object type ourselves, as follows:

const person2: { name: string; age: number } = {
	name: 'jose',
	age: 29,
};
console.log(person2.name);

// But it's a better practice to let TS infer the object type.

// Nested Objects & Types
// Of course object types can also be created for nested objects.
// Let's say you have this JavaScript object:

// const product = {
//   id: 'abc1',
//   price: 12.99,
//   tags: ['great-offer', 'hot-and-new'],
//   details: {
//     title: 'Red Carpet',
//     description: 'A great carpet - almost brand-new!'
//   }
// }
// This would be the type of such an object:

// {
//   id: string;
//   price: number;
//   tags: string[];
//   details: {
//     title: string;
//     description: string;
//   }
// }
// So you have an object type in an object type so to say.

//
//

let faveSports = ['football', 'basketball'];
// hover cursor to see how TS inferes array type.

let faveCountries: string[];

faveCountries = ['Spain', 22];
// see error we get here. how to fix this?

let faveMeals: any[];
// however, this is not best practice, since we lose TS functionality

for (let sport of faveSports) {
	console.log(sport.toUpperCase());
	// TS gives us in authocompletion the methods of strings, but if we say:
	console.log(sport.map());
	// it gives us an error, because map() is for arrays, not strings
}

// with number, string, boolean, object, array, we got the core value types that js knows and ts supports. but ts also has more types, which js doesn't have:

// TUPLES (don't exist in JS):
const jobStart = [2002, 'cleaner'];
// we only want two values, and always the first a number and the second a string. Inference doesn't work here (hover the cursor to see), because we could do the following:
// jobStart.push(22);
// jobStart[2];
// and we don't want this. Precisely, in these situations, when ts doesn't ifer correctly the types, we have to specify them. Therefore, what we do is:
let jobStart2: [number, string];
// we specify that we want only two elements, the first a number, and the second a string. Therefore, if you do the following, you get an error:
jobStart2 = [];
jobStart2[0] = 'hello';
jobStart2 = [33, 'hi', 44];
// BUT:
jobStart2.push('hello');
// 'push' is an exception, unfortunately TS can't catch this error.

// ENUM (doesn't exist in JS):
const person1 = {
	role: 'READ-ONLY-USER',
};
if (person1.role === 'READ ONLY USER') {
}
// to avoid this type of bugs, you can use numbers instead of long strings:
const person3 = {
	role: 2,
};
if (person3.role === 2) {
}
// but you may get confused about what the numbers mean, and create other bugs (does '2' mean 'AUTHOR' or 'READ-ONLY-USER?). So we need something more readable by humans.
// in this situation, what we usually do is to use global variables, for example:
const ADMIN = 0;
const READ_ONLY = 1;
const AUTHOR = 2;
// (it could be numbers or strings or anything)
const person4 = {
	role: AUTHOR,
};
if (person4.role === AUTHOR) {
}
// THIS APPROACH IS TOTALLY FINE. however, 'role' is typed as a number, and we could store by accident any number value in there without getting any warning by TS. Also, we would need to define all the global constants and manage them.
// THAT'S WHY, WE CAN USE ENUMS: global constants/identifiers in your app that are assigned to numbers, and you refer to them with labels:
enum Role {
	ADMIN,
	READ_ONLY,
	AUTHOR,
}
// (you will see them often in capital letters, but this is not a must)
// and these values get assigned to the numbers 0, 1, 2.
const person5 = {
	role: Role.READ_ONLY,
};
if (person5.role === Role.READ_ONLY) {
}
// as a result, 'person5.role' can only be 0, 1, or 2
// you can also use other numbers, for example:
enum Role1 {
	ADMIN = 5,
	READ_ONLY,
	AUTHOR,
}
// now the values will be 5, 6, 7. Also, you can use any values, not only numbers:
enum Role2 {
	ADMIN = 5,
	READ_ONLY = 43,
	AUTHOR = 'haha',
}
// as a result, this enum is a custom type, so it will give you a warning if you use any other number or string that is not codified in the enum.

// ANY:
// you want to avoid it, because you won't have with it the useful advantages of TS, it will be like vanilla JS, where everything is dynamically typed, and you have the 'any' type in everything.
let faveActivities: any[];
// it can be any type inside the array.
