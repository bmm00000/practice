// function Person(name, age) {
// 	this.name = name;
// 	this.age = age;
// 	this.greet = () => {
// 		return 'Hello, my name is ' + this.name;
// 	};
// }

// const person1 = new Person('Carlos', 43);

// console.log(person1.greet());

// class Writer {
// 	constructor(name, age) {
// 		this.name = name;
// 		this.age = age;
// 	}

// 	greet() {
// 		return 'Hello, my name is ' + this.name;
// 	}
// }

// const writer1 = new Writer('Lord Byron', 66);
// console.log(writer1.greet());

// const human = {
// 	planet: 'Earth',
// 	species: 'Homo Sapiens',
// 	greet() {
// 		console.log('Hello there');
// 	},
// };

// const spanish = {
// 	country: 'Spain',
// 	faveDish: 'Paella',
// };

// const french = {
// 	country: 'France',
// 	faveDish: 'Pizza',
// };

// // spanish.__proto__ = human;
// // french.__proto__ = human;

// // console.log(spanish.greet());
// // console.log(french.greet());

// // console.log(spanish.__proto__.__proto__.__proto__);

// // Object.setPrototypeOf(spanish, human);
// // console.log(spanish.greet());

// const italian = Object.create(human);
// console.log(italian.greet());
// italian.country = 'Italy';
// console.log(italian);

const homoSapiens = {
	planet: 'Earth',
	sayHi() {
		return 'Hello my name is ' + this.name;
	},
};

function Person(name, age) {
	this.name = name;
	this.age = age;
	// this.greet = () => {
	// 	return 'Hello, my name is ' + this.name;
	// };
}

Person.prototype = homoSapiens;

const person1 = new Person('Carlos', 43);
console.log(person1.sayHi());
