// class Player {
// 	public readonly first: string;
// 	public readonly last: string;
// 	private score: number = 0;

// 	constructor(first: string, last: string) {
// 		this.first = first;
// 		this.last = last;
// 	}

// 	private secretMethod() {
// 		console.log('secret!');
// 	}
// }

class Player {
	private score: number = 0;

	constructor(public first: string, public last: string) {}

	private secretMethod() {
		console.log('secret!');
	}
}

const player1 = new Player('pepe', 'perez');
player1.first;
