const me = {
	name: 'Jose',
	age: 29,
};

console.log(me.name);

// when we use a JS object, it's type object in TS, but also it will tell us the object type, in this example, when we hover over 'me': const person = {name: string; age: number}.

// we shouln't do the following:

const person: object = { name: 'jose', age: 29 };
console.log(person.name);

// because the IDE will give us an error if we try to console.log(person.name), since the only thing it knows is that it's a type object, and no more info about its properties, that's why we have to let TS infer about the object type, or assign the object type ourselves, as follows:

const person2: { name: string; age: number } = {
	name: 'jose',
	age: 29,
};
console.log(person2.name);

// But it's a better practice to let TS infer the object type.

let faveSports = ['football', 'basketball'];
// hover cursor to see how TS inferes array type.

let faveCountries: string[];

// faveCountries = ['Spain', 22];
// see error we get here. how to fix this?

let faveMeals: any[];
// however, this is not best practice, since we lose TS functionality

for (let sport of faveSports) {
	console.log(sport.toUpperCase());
	// TS gives us the methods of strings, but if we say:
	// console.log(sport.map());
	// it gives us an error, because map() is for arrays, not strings
}

// TUPLES:
const jobStart = [2002, 'cleaner'];
// we only want two values, and always the first a number and the second a string. Inference doesn't work here (hover the cursor to see), because we could do the following:
// jobStart.push(22);
// jobStart[2];
// and we don't want this. Therefore, what we do is:
let jobStart2: [number, string];
// we specify that we want only two elements, the first a number, and the second a string. Therefore, if you do the following, you get an error:
jobStart2 = [];
jobStart2[0] = 'hello';
jobStart2 = [33, 'hi', 44];
// BUT:
jobStart2.push('hello');
// 'push' is an exception, unfortunately TS can't catch this error.
