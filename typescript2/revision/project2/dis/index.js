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
class Car {
    constructor(color) {
        this.color = color;
    }
}
const car1 = new Car('red');
class Jacket {
    constructor(brand, color) {
        this.brand = brand;
        this.color = color;
    }
    print() {
        console.log(`this is my ${this.color} jacket`);
    }
}
const jacket1 = new Jacket('prada', 'red');
//
class Employee {
    constructor(name, surname) {
        this.name = name;
        this.surname = surname;
    }
    sayHello() {
        console.log('hello');
    }
}
class PartTimeEmployee extends Employee {
    constructor(first, last, hourlyRate) {
        super(first, last);
        this.first = first;
        this.last = last;
        this.hourlyRate = hourlyRate;
    }
    getPaid() {
        return this.hourlyRate;
    }
}
const emp1 = new PartTimeEmployee('jose', 'boix', 22);
console.log(emp1.getPaid());
