// class Player {
// 	public readonly first: string;
// 	public readonly last: string;
// 	private score: number = 0;
// 	// #score: number = 0;
// 	constructor(first: string, last: string) {
// 		this.first = first;
// 		this.last = last;
// 	}

// 	private secretMethod(): void {
// 		console.log('Secret method');
// 	}
// }

// const player1 = new Player('Elton', 'Steele');
// console.log(player1.score); // ts complains here during development, but it will still be compiled to js and executed by the browser (so we will see the score). in other words, the 'private' modifier is about typescript, but not about js (see the compilation in index.js, you won't see any 'private' modifier there). on the other hand, in js we can use '#' to indicate a private field, and this is js (so you won't see the score in the console of the browser)

// player1.secretMethod();

// // watch section 13: typescript classes

class Player {
	constructor(
		public first: string,
		public last: string,
		private score: number
	) {}

	private secretMethod(): void {
		console.log('Secret method');
	}

	get fullName(): string {
		return `${this.first} ${this.last}`;
	}
	// if you don't have a setter for a given getter, then by default ts will make them readonly.
}

const player1 = new Player('Elton', 'Steele', 0);
player1.fullName;
