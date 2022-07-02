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
	applyDiscount: (amount: number) => {
		const newPrice = this.price * (1 - amount);
		this.price = newPrice;
		return this.price;
	},
	// you can call the parameter whatever you want (it can match or not the name of the parameter in the interface)
};

console.log(shoes.applyDiscount(0.4));
// THIS FAILS!!
