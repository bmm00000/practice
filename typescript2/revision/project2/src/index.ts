class Player {
	protected _score: number = 0;
	constructor(public readonly first: string, public readonly last: string) {}

	private secretMethod() {
		console.log('secret...');
	}

	get fullName(): string {
		return `${this.first} ${this.last}`;
	}

	get score(): number {
		return this._score;
	}

	set score(newScore: number) {
		if (newScore < 0) {
			throw new Error('Score should be positive!');
		}
		this._score = newScore;
	}
}

class AdminPlayer extends Player {
	isAdmin: boolean = true;
	changeScore() {
		this._score = 10;
	}
}

const player1 = new Player('Elton', 'Steele');
console.log(player1.fullName);
console.log(player1.score);
player1.score = 10;
console.log(player1.score);

const admin1 = new AdminPlayer('josh', 'kon');
console.log(admin1);
admin1.changeScore();
console.log(admin1);
