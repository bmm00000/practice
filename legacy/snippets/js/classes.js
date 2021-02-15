// FACTORY FUNCTIONS
function makeColor(r, g, b) {
	const color = {};
	color.r = r;
	color.g = g;
	color.b = b;
	color.rgb = function() {
		const { r, g, b } = this;
		return `rgb${r}${g}${b}`;
	};
	return color;
}

const color1 = makeColor(2, 4, 6);

//CONSTRUCTOR FUNCTIONS
function MakeColor(r, g, b) {
	this.r = r;
	this.g = g;
	this.b = b;
}

MakeColor.prototype.rgba = function(a = 1) {
	const { r, g, b } = this;
	return `rgba${r}${g}${b}${a}`;
};

const color1 = new MakeColor(2, 4, 6);

//CLASSES: SYNTATICAL SUGAR
class MakeColor {
	constructor(r, g, b) {
		this.r = r;
		this.g = g;
		this.b = b;
	}
	rgba(a = 1) {
		const { r, g, b } = this;
		return `rgba${r}${g}${b}${a}`;
	}
}

const color1 = new MakeColor(2, 4, 6);

//EXTENDS, SUPER, SUBCLASSES
class Pet {
	constructor(name, age) {
		this.name = name;
		this.age = age;
	}
	eats() {
		return `${this.name} is eating!`;
	}
}

class Dog extends Pet {
	bark() {
		return `${this.name} says guauuuuu!`;
	}
}

class Cat extends Pet {
	constructor(name, age, livesLeft) {
		super(name, age);
		this.livesLeft = livesLeft;
	}
	lives() {
		return `${this.name} has ${this.livesLeft} lives left!`;
	}
}

const cat1 = new Cat('grisito', 12, 9);
