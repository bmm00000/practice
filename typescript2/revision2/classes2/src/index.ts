// class Player {
// 	public readonly first: string;
// 	public readonly last: string;
// 	private score: number = 0;
// 	constructor(first: string, last: string) {
// 		this.first = first;
// 		this.last = last;
// 		this.secretMethod();
// 	}

// 	private secretMethod(): void {
// 		console.log('This is a secret...');
// 	}
// }

class Player {
	protected _score: number = 0;
	constructor(public first: string, public last: string) {
		this.secretMethod();
	}

	private secretMethod(): void {
		console.log('This is a secret...');
	}

	get fullName(): string {
		return `${this.first} ${this.last}`;
	}

	set fullName(newName: string) {
		const [newFirst, newLast] = newName.split(' ');
		this.first = newFirst;
		this.last = newLast;
	}

	get score(): number {
		return this._score;
	}

	set score(newScore: number) {
		if (newScore < 0) {
			throw new Error('Score must be positive!');
		}
		this._score = newScore;
	}
}

class SuperPlayer extends Player {
	public readonly isAdmin: boolean = true;
	maxScore(): void {
		this._score = 999;
	}
}

// const player1 = new Player('jose', 'boix');
// console.log(player1.first);
// console.log(player1.fullName);
// player1.fullName = 'juana loca';
// console.log(player1.fullName);
// console.log(player1.score);
// player1.score = 1000;
// console.log(player1.score);

// const superP1 = new SuperPlayer('jose', 'boix');
// superP1.maxScore();
// console.log(superP1.score);

interface Colorful {
	color: string;
}

class Bike implements Colorful {
	constructor(public color: string) {}
}

const bike1 = new Bike('red');

interface Printable {
	print(): void;
}

class Jacket implements Colorful, Printable {
	constructor(public brand: string, public color: string) {}

	print() {
		console.log(`${this.brand}`);
	}
}

const jacket1 = new Jacket('Prada', 'red');
jacket1.print();

//

abstract class Employee {
	constructor(public first: string, public last: string) {}

	abstract getSalary(): number;

	sayHello() {
		console.log('hello!');
	}
}

class PartTimeEmployee extends Employee {
	constructor(
		public first: string,
		public last: string,
		private rate: number,
		private hours: number
	) {
		super(first, last);
	}
	getSalary(): number {
		return this.rate * this.hours;
	}
}

class FullTimeEmployee extends Employee {
	constructor(
		public first: string,
		public last: string,
		private salary: number
	) {
		super(first, last);
	}

	getSalary(): number {
		return this.salary;
	}
}

const partTime1 = new PartTimeEmployee('helen', 'mcarthur', 55, 100);
console.log(partTime1.first, partTime1.last);
partTime1.sayHello();
console.log(partTime1.getSalary());

const fullTime1 = new FullTimeEmployee('jose', 'boix', 500000);
fullTime1.sayHello();
console.log(fullTime1.getSalary());
