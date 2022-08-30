// // class Player {
// // 	public readonly first: string;
// // 	public readonly last: string;
// // 	public score = 0;
// // 	constructor(first: string, last: string) {
// // 		this.first = first;
// // 		this.last = last;
// // 		this.secretMethod();
// // 	}

// // 	private secretMethod(): void {
// // 		console.log('secret!');
// // 	}
// // }

// class Player {
// 	constructor(
// 		public first: string,
// 		public last: string,
// 		protected _score: number
// 	) {
// 		this.secretMethod();
// 	}

// 	private secretMethod(): void {
// 		console.log('secret!');
// 	}

// 	get fullName(): string {
// 		return `${this.first} ${this.last}`;
// 	}

// 	get score(): number {
// 		return this._score;
// 	}

// 	set score(newScore) {
// 		if (newScore < 0) {
// 			throw new Error('Score cannot be negative!');
// 		}
// 		this._score = newScore;
// 	}
// }

// class AdminPlayer extends Player {
// 	public isAdmin: boolean = true;

// 	maxScore() {
// 		this._score = 999;
// 	}
// }

// const player1 = new Player('elton', 'john', 0);
// console.log(player1);
// console.log(player1.fullName);
// console.log(player1.score);
// player1.score = 2;
// console.log(player1.score);

// interface Colorful {
// 	color: string;
// }

// interface Printable {
// 	print(): void;
// }

// class Bike implements Colorful {
// 	constructor(public color: string) {}
// }

// class Jacket implements Colorful, Printable {
// 	constructor(public brand: string, public color: string) {}

// 	print() {
// 		console.log(`printed a ${this.color} jacket`);
// 	}
// }

// const jacket1 = new Jacket('Prada', 'red');

// abstract class Employee {
// 	constructor(public first: string, public last: string) {}

// 	abstract getPay(): number;

// 	greet() {
// 		console.log('Hello, I am an employee');
// 	}
// }

// class fullTimeEmployee extends Employee {
// 	constructor(
// 		public first: string,
// 		public last: string,
// 		private salary: number
// 	) {
// 		super(first, last);
// 	}

// 	getPay(): number {
// 		return this.salary;
// 	}
// }

// const inputEl = document.querySelector<HTMLInputElement>('#input')!;
// inputEl.value = 'hacked!';

function identity<T>(element: T): T {
	return element;
}

console.log(identity<number>(3));

identity<number>(2);

function getRandomElement<T>(array: T[]): T {
	const index = Math.floor(Math.random() * array.length);
	return array[index];
}

console.log(getRandomElement<number>([1, 2, 4, 5, 6]));

let x = 23;

getRandomElement([1, 2, 3]);
