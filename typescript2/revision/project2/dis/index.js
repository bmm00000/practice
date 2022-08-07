"use strict";
class Player {
    constructor(first, last) {
        this.first = first;
        this.last = last;
        this._score = 0;
    }
    secretMethod() {
        console.log('secret...');
    }
    get fullName() {
        return `${this.first} ${this.last}`;
    }
    get score() {
        return this._score;
    }
    set score(newScore) {
        if (newScore < 0) {
            throw new Error('Score should be positive!');
        }
        this._score = newScore;
    }
}
class AdminPlayer extends Player {
    constructor() {
        super(...arguments);
        this.isAdmin = true;
    }
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
