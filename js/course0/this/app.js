// this.age = 26;

// function greet() {
// 	console.log('Hello, I am ' + this.age);
// }

// greet();

// const person = {
// 	greetMe: greet,
// };

// person.greetMe();

// const btn = document.querySelector('button');
// btn.addEventListener('click', function () {
// 	console.log(this);
// });

// setTimeout(function () {
// 	console.log(this);
// }, 1000);

class Person {
	constructor(age) {
		this.age = age;
	}

	greet() {
		console.log('Hi, I am ' + this.age);
	}

	delayGreet() {
		setTimeout(
			function () {
				console.log('Hi, I am ' + this.age);
				console.log(this);
			}.bind({ age: 1000 }),
			1000
		);
	}
}

const person1 = new Person(30);
person1.greet();
person1.delayGreet();
