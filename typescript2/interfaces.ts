// interfaces allow us to describe the shape of objects, AND ONLY OBJECTS!

interface Person {
	readonly id: number;
	firstName: string;
	lastName: string;
	nickName?: string;
	// sayHi: () => string;
	// another syntax for the same:
	sayHi(): string;
}
// nickName is an optional property
// sayHi must be a method that returns a string (it cannot be just a string, it has to be a method that returns a string)

const thomas: Person = {
	firstName: 'Thomas',
	lastName: 'Hardy',
	id: 123,
	sayHi: () => {
		return 'hi';
	},
	// if you add any parameters in sayHi here, ts will complain, since you didn't specify any parameters in the interface.
};
thomas.firstName = 'Tom'; // you can change the first name
thomas.id = 32323; // but you cannot change the id, ts complains!

interface Product {
	name: string;
	price: number;
	applyDiscount(discount: number): number; // this just says that the method accepts a number and returns a number, nothing else.
	// the name that you give to the parameter here ('discount' or anything else) does not matter (although it's good to choose a good name, since it will appear on errors, etc.)
}

const shoes: Product = {
	name: 'blue shoes',
	price: 22,
	applyDiscount(amount: number) {
		const newPrice = this.price * (1 - amount);
		this.price = newPrice;
		return this.price;
	},
	// you can call the parameter whatever you want (it can match or not the name of the parameter in the interface)
};

console.log(shoes.applyDiscount(0.4));
// THIS FAILS!!

// adding new properties to interfaces: you wouldn't want to do it like in the slide, but for example, if you have an interface that you are taking form a third party package, and then you want to add some properties (without overriding anything), that's the way to add new properties (see slide)

interface Dog {
	name: string;
	age: number;
}

interface ServiceDog extends Dog {
	job: 'bomb sniffer' | 'drug sniffer' | 'guide to blind people';
}

const myDog: ServiceDog = {
	name: 'John',
	age: 33,
	job: 'bomb sniffer',
};

// interface multiple inheritance:
interface Human {
	name: string;
}

interface Employee {
	readonly id: number;
}

interface Engineer extends Human, Employee {
	level: string;
	languages: string[];
}

const pierre: Engineer = {
	id: 222,
	level: 'beginner',
	name: 'Pierre',
	languages: ['JS', 'Python'],
};

// differences between 'type' and 'interface':
// Interfaces can only describe the shape of an object, nothing else! whereas Types can describe any sort of type, as we have seen in our examples.
// with Interfaces, you can add on properties after they have been created, with Types you can't! (see slide)
// watch out! slight syntax difference, with 'type' you use a '=', with 'interface' you don't!
// when it comes to inheriting from another interface, you can use the 'extends' keyword, so the way we approach it is more object oriented (almost like we are writing a class). with Type, we don't use the 'extend' keyword, but we use intersection types ('&') (see slide)
// in a nutshell, if we are describing the shape of objects, interfaces are more intuitive, since it's more like OOP.
