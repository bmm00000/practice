const me = {
	name: 'Jose',
	age: 29,
};

console.log(me.name);

// when we use a JS object, it's type object in TS, but also it will tell us the object type, for example: const person = {name: string; age: number}.

// we shouln't do the following: const person: object = {name: 'jose', age: 29}, because the IDE will give us an error if we try to console.log(person.name), since the only thing it knows is that it's a type object, and no more info about its properties, that's why we have to let TS infer about the object type, or assign the object type ourselves (see screenshot). But it's a better practice to let TS infer the object type.
