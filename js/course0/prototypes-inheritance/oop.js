// OBJECT ORIENTED PROGRAMMING:
// watch Mosh video on youtube

// we can create an object with the so-called object literal notation (this is great when you want to create an object on the fly, just put together some data, on the go):

const person = {
	name: 'Jose',
	age: 26,
	greet() {
		console.log(`Hello, this is ${this.name}`);
	},
};

console.log(person);
person.greet();

// but what if you will need certain type of object multiple times (the same properties but different values in those properties)? if you use the object literal notation, you would need to repeat a lot of code. that's when you might want to use a constructor function, which is a normal js function (by convention, the name starts with a capital letter, but this is not needed) that we call with the 'new' keyword. when we use the 'new' keyword when calling a function, a new object is created and returned based on the blueprint that you specified (again, this is just a regular function, but the way we use it (with the 'new' keyword) simply turns it into a constructor function). for example, here we are returning empty objects:

// function Employee() {}

// const employee1 = new Employee();
// const employee2 = new Employee();

// in this function, you can use the 'this' keyword in order to refer to the to-be-created object.

function Employee(name, internalId) {
	this.name = name;
	this.id = internalId;
}

const employee1 = new Employee('Jose', 1);
const employee2 = new Employee('Alana', 2);

console.log(employee1);
console.log(employee2);

// js also has some built-in constructor functions, for example, the Object constructor function:
const objectA = new Object();
// we can't pass in any specific data, so this creates an empty object, so this is just a longer form of using the object literal notation (in reality, when you use the object literal notation, you are calling behind the scenes the Object constructor function)

// ditto with the built-in Array constructor function:
const arrayA = new Array();

// however, other programming languages don't have this constructor functions approach, and that's why it might seem confusing if you are coming from another programming language. that's why, in modern js, you have another syntax for creating these blueprints for objects (the 'class' keyword, with a constructor function for initialization):

class Person {
	constructor(name, age) {
		this.name = name;
		this.age = age;
	}
}
// // the former is syntactic sugar for the following:
// function Person(name, age) {
// 	this.name = name;
// 	this.age = age;
// }
// // this syntactic sugar was added to js because other programming languages have a feature called 'class' to create such object blueprints.

class Student {
	constructor(name, age) {
		this.name = name;
		this.age = age;
	}
	// we pass these arguments so we initialize the object that we want to create.

	greet() {
		console.log('Hello, I am a student');
	}
	// every object that we create has this method, regardless of the initialization data that we pass as arguments (in the console of the browser, we will see this method in the __proto__ property, not as a property of the object per se) (note that __proto__ is not really a property, the console of the browser displays it as a property just to make things visually understandable, but it's not really a property)

	hometown = 'Alicante';
	// however, this property will be a property of every object that we create (not in __proto__)
}

const student1 = new Student('Jose', 26);
student1.greet();
console.log(student1);

// therefore, in js you have two approaches to create objects: the object literal notation if you want to put together some non-reusable data on the fly, or you can create re-usable blueprints (with constructor functions, or classes).

// PROTOTPYES:
// in many programming languages, you have built-in support for sharing data or functionality across objects. in js, we have a built-in mechanism (prototypes) that checks all linked objects and only fails if it can't find the property or method that you are trying to access on any of those objects (see slide), and it goes from the nearest object to the furthest away in your linked object chain.

// WATCH VIDEO  What are "Prototypes" in JavaScript?

// how to set your own prototpyes in your own objects (or how to link objects to prototypes):

const companyMember = {
	company: 'Academind',
	greet() {
		console.log('Hello from Academind!');
	},
};

const employee = {
	name: 'Max',
	age: 31,
};

const owner = {
	name: 'Manu',
	age: 32,
	title: 'Manager',
};

// employee.__proto__ = companyMember;
// owner.__proto__ = companyMember;
// doing this, we are overriding the default prototype (which every object has), so be aware of what you are doing!

// employee.greet();
// console.log(owner.company);

// the former is the 'worse' way to do it, because __proto__ is not an official property. most browsers support it, but you don't have any guarantee for that (microsoft browsers used to not support it).

// WATCH OUT: when we say that we set the prototype of an object, it sounds like we set the blueprint for this object, but a better mental model to think about it is: you are basically setting up a fallback object that you are connecting your main object to (that's the so called 'prototype chain'). only at the end of the prototype chain, if js couldn't find certain method or property that you are specifying, then it will show undefined or throw an error.

// also, keep in mind that we don't only have the prototypes that we manually set up (eg. employee.__proto__ = companyMember), but also every object that we create also has a default prototype. for example, companyMember itself also has a prototype, even though we never set it up (the default prototype that every object has in js if you don't override it manually):
console.log(companyMember.__proto__);

// and at the end of the prototype chain we will get 'null':
console.log(companyMember.__proto__.__proto__);

// therefore, you can link objects with prototypes as you wish, but ultimately you will get to the default prototype that every js object has, and the prototype of that object will be 'null'. and if js can't find the method or property that you are looking for at that point, it will throw an error (if what you're looking for is a method) or 'undefined' (if what you're looking for is a property).

// however, remember, we said before that overriding the default prototype is not the best way to do it. what's a better way to do it?
Object.setPrototypeOf(employee, companyMember);
Object.setPrototypeOf(owner, companyMember);

employee.greet();
console.log(owner.company);

// the former is the best way to change the prototype of an object that was already created. but we can also change the prototype by changing it at the time when the object is created:

const employeeAlt = Object.create(companyMember);
// as we have seen before, Object is a built-in constructor function. since functions are, at the end, objects, this object has also methods, and we are going to use the 'create' method.
// the create method creates a new object: it takes an object as an argument and that's the prototype of the newly created object.
employeeAlt.greet();
// and you can also add some properties and methods manually after the object was created:
employeeAlt.name = 'JoseVi';
employeeAlt.shout = () => {
	console.log('wow!');
};
employeeAlt.shout();
console.log(employeeAlt);
