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

function multiply(x, y) {
	y = typeof y === 'undefined' ? 1 : y;
	return x * y;
}

const greeting = (person, greeting = 'hi') => {
	console.log(`${greeting}${person}!!!`);
};

function sum() {
	const arg = [ ...arguments ];
	return arg.reduce((total, currVal) => {
		return total + currVal;
	});
}

function sum(...nums) {
	const total = 0;
	for (let num of nums) {
		total += num;
	}
	return total;
}

function win([ first ]) {
	console.log(`${first} is the best!`);
}

const winner = [ 'jose', 'pablo', 'laura' ];

win(winner);

const annoyer = {
	phrases: [ 'bonito', 'bueno', 'barato' ],
	pickPhrase() {
		const index = Math.floor(Math.random() * this.phrases.length);
		console.log(this.phrases[index]);
	},
	start() {
		this.intervalId = setInterval(() => {
			this.pickPhrase();
		}, 500);
	},
	stop() {
		clearInterval(this.intervalId);
	}
};

annoyer.start();

function makeDeck() {
	const deck = [];
	const suits = [ 'Hearts', 'Diamonds', 'Spades', 'Clubs' ];
	const values = [ '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'A', 'K' ];
	for (let suit of suits) {
		for (let value of values) {
			deck.push({ suit, value });
		}
	}
	return deck;
}

function drawCard(deck) {
	return deck.pop();
}

const myDeck = makeDeck();
const card1 = drawCard(myDeck);

/////

const myDeck = {
	suits: [ 'Hearts', 'Diamonds', 'Spades', 'Clubs' ],
	values: [ '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'A', 'K' ],
	deck: [],
	drawnCards: [],
	initializeDeck() {
		const { suits, values, deck } = this;
		for (let suit of suits) {
			for (let value of values) {
				deck.push({ suit, value });
			}
		}
	},
	drawCard() {
		const card = this.deck.pop();
		this.drawnCards.push(card);
		return card;
	},
	drawMultipleCards(num) {
		const cardsDrawnTogether = [];
		for (let i = 0; i < num; i++) {
			const card = this.drawCard();
			cardsDrawnTogether.push(card);
		}
		return cardsDrawnTogether;
	}
};

const makeDeck = () => {
	return {
		suits: [ 'Hearts', 'Diamonds', 'Spades', 'Clubs' ],
		values: [ '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'A', 'K' ],
		deck: [],
		drawnCards: [],
		initializeDeck() {
			const { suits, values, deck } = this;
			for (let suit of suits) {
				for (let value of values) {
					deck.push({ suit, value });
				}
			}
		},
		drawCard() {
			const card = this.deck.pop();
			this.drawnCards.push(card);
			return card;
		},
		drawMultipleCards(num) {
			const cardsDrawnTogether = [];
			for (let i = 0; i < num; i++) {
				const card = this.drawCard();
				cardsDrawnTogether.push(card);
			}
			return cardsDrawnTogether;
		}
	};
};

const willGetDog = () => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			const num = Math.random();
			if (num < 0.5) {
				resolve();
			} else {
				reject();
			}
		}, 2000);
	});
};

willGetDog()
	.then(() => {
		console.log('yayyyyyy');
	})
	.catch(() => {
		console.log('nooooo');
	});

const fakeRequest = (url) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			const page = {
				'/about': 'this is the about page',
				'/shop': 'this is the shop page'
			};
			const content = page[url];
			if (content) {
				resolve({ status: 200, content });
			} else {
				reject({ status: '404' });
			}
		}, 2000);
	});
};

fakeRequest('/about')
	.then((res) => {
		console.log('yayyyy');
		console.log(res.status);
		console.log(res.content);
	})
	.catch((res) => {
		console.log('noooo');
		console.log(res.status);
	});

const fakeRequest = (url) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			const pages = {
				'/users': [ { id: 1, username: 'Bilbo' }, { id: 5, username: 'Esmerelda' } ],
				'/users/1': {
					id: 1,
					username: 'Bilbo',
					upvotes: 360,
					city: 'Lisbon',
					topPostId: 454321
				},
				'/users/5': {
					id: 5,
					username: 'Esmerelda',
					upvotes: 571,
					city: 'Honolulu'
				},
				'/posts/454321': {
					id: 454321,
					title: 'Ladies & Gentlemen, may I introduce my pet pig, Hamlet'
				},
				'/about': 'This is the about page!'
			};
			const content = pages[url];
			if (content) {
				resolve({ status: 200, content });
			} else {
				reject({ status: 404 });
			}
		}, 2000);
	});
};

fakeRequest('/users')
	.then((res) => {
		console.log('yesss');
		console.log(res.status);
		const id = res.content[0].id;
		return fakeRequest(`/users/${id}`);
	})
	.then((res) => {
		console.log(res);
		const postId = res.content.topPostId;
		return fakeRequest(`/posts/${postId}`);
	})
	.then((res) => {
		console.log(res.content.title);
	})
	.catch((err) => {
		console.log('noooo');
		console.log(err.status);
	});
