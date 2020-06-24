const role1 = 'waiter';
const role2 = 'waitress';
const person1 = 'tom';
const person2 = 'maggy';

const team = {
	[role1]: person1,
	[role2]: person2
};

const addProp = (obj, k, v) => ({ ...obj, [k]: v });

// reference to the current execution scope (could be global): an object
// will give you an object back
//it depends on how you execute the function

function MakeColor(r, g, b) {
	this.r = r;
	this.g = g;
	this.b = b;
}

MakeColor.prototype.rgb = function() {
	const { r, g, b } = this;
	return `rgb${r}${g}${b}`;
};

MakeColor.prototype.rgba = function(a = 1) {
	const { r, g, b } = this;
	return `rgba${r}${g}${b}${a}`;
};

const color1 = new MakeColor(1, 2, 3);

class MakeColor {
	constructor(r, g, b, name) {
		this.r = r;
		this.g = g;
		this.b = b;
		this.name = name;
	}
	innerRgb() {
		const { r, g, b } = this;
		return `${r}${g}${b}`;
	}
	rgb() {
		const { name } = this;
		return `The ${name} is ${this.innerRgb()}`;
	}
	rgba(a = 1) {
		const { name } = this;
		return `The ${name} is ${this.innerRgb()} and ${a}`;
	}
}

const color1 = new MakeColor(1, 2, 3, 'tonto');

class MakeColor {
	constructor(r, g, b) {
		this.r = r;
		this.g = g;
		this.b = b;
		this.now();
	}
	rgb() {
		const { r, g, b } = this;
		return `rgb${r}${g}${b}`;
	}
	now() {
		let { r } = this;
		r += 100;
	}
}

const color1 = new MakeColor(1, 2, 3);

class Pet {
	constructor(name, age) {
		this.name = name;
		this.age = age;
	}
	eats() {
		return `${this.name} is eating!`;
	}
}

class Cat extends Pet {
	constructor(name, age, livesLeft) {
		super(name, age);
		this.livesLeft = livesLeft;
	}
	lives() {
		return `${this.livesLeft} lives left!`;
	}
	miaw() {
		return 'miauuuu';
	}
}

class Dog extends Pet {
	bark() {
		return 'wofff';
	}
}

function practice() {
	console.log(this);
}

const person = {
	name: 'jose',
	surname: 'boix',
	nickname: 'el mejor',
	fullName() {
		return `todo el mundo sabe que ${this.name} ${this.surname} es ${this.nickname}!!!`;
	},
	bio() {
		console.log(this);
		return `Hola, ${this.fullName()}, nacio jsjjsdjflsjflshlhsglsdjfljsdlhlgjas`;
	},
	laugh: () => {
		return `${this.name} says hahaha`;
	}
};
const annoyer = {
	phrases: [ 'tonto', 'gilipoya', 'inutil' ],
	pickPhrase() {
		let index = Math.floor(Math.random() * this.phrases.length);
		return this.phrases[index];
	},
	start() {
		this.timerID = setInterval(() => {
			console.log(this.pickPhrase());
		}, 500);
	},
	stop() {
		clearInterval(this.timerID);
	}
};
