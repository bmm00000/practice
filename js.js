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

const firstReq = new XMLHttpRequest();

firstReq.addEventListener('load', () => {
	console.log('it worked!');
	const data = JSON.parse(firstReq.responseText);
});
firstReq.addEventListener('error', () => {
	console.log('error!');
});

firstReq.open('GET', 'https://swapi.co/api/planets/');
firstReq.send();
console.log('request sent!!');

const prom = fetch('https://swapi.co/api/planets/')
	.then((response) => {
		return response.json().then((data) => {
			console.log(data);
		});
	})
	.catch((err) => {
		console.log('something went wrong');
		console.log(err);
	});

async function greet() {
	return 'hello!';
}

greet().then((val) => {
	return 'promised resolveddd with ' + val;
});

async function sum(x, y) {
	if (typeof x !== 'number' || typeof y !== 'number') {
		throw 'this is an errorrrrrrrr!!!!';
	}
	return x + y;
}

sum(1, 2)
	.then((val) => {
		console.log('resolved with', val);
	})
	.catch((err) => {
		console.log('resolved with', err);
	});

async function getData() {
	const res = await axios.get('jsjjjs');
	console.log(res.data);
}

function makeColor(r, g, b) {
	const color = {};
	color.r = r;
	color.g = g;
	color.b = b;
	color.rgb = function() {
		return `rgb${r}${g}${b}`;
	};
	return color;
}

const color1 = makeColor(2, 5, 4);

function MakeColor(r, g, b) {
	this.r = r;
	this.g = g;
	this.b = b;
}

MakeColor.prototype.rgb = function() {
	const { r, g, b } = this;
	return `rgb${r}${g}${b}`;
};

const color1 = new MakeColor(2, 4, 6);

class MakeColor {
	constructor(r, g, b) {
		this.r = r;
		this.g = g;
		this.b = b;
	}
	rgb() {
		const { r, g, b } = this;
		return `rgb${r}${g}${b}`;
	}
	rgba(a = 1) {
		const { r, g, b } = this;
		return `rgb${r}${g}${b}${a}`;
	}
}

const color1 = new MakeColor(33, 22, 11);

class MakeColor {
	constructor(r, g, b) {
		this.r = r;
		this.g = g;
		this.b = b;
	}
	rgb() {
		const {} = this;
		return;
	}
}

const color1 = new MakeColor(1, 2, 3);

const willGetDog = () => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			const num = Math.random();
			if (num < 0.5) {
				resolve();
			} else {
				reject();
			}
		}, 1000);
	});
};

willGetDog()
	.then(() => {
		console.log('yesss');
	})
	.catch(() => {
		console.log('noooooo');
	});

const fakeRequest = (url) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			const page = {
				'/user': 'This is the user page',
				'/about': 'This is the about page'
			};
			const data = page[url];
			if (data) {
				resolve({ status: 200, data });
			} else {
				reject({ status: 404 });
			}
		}, 1000);
	});
};

fakeRequest('/about')
	.then((res) => {
		console.log(res.status);
		console.log(res.data);
	})
	.catch((err) => {
		console.log(err.status);
	});

const fakeRequest = function(url) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			const pages = {
				'/about': 'This is the about page',
				'/users': 'This is the users page'
			};
			const data = pages[url];
			if (data) {
				resolve({ status: 200, data });
			} else {
				reject({ status: 404 });
			}
		}, 1000);
	});
};

fakeRequest()
	.then((res) => {
		const id = res.data[0].id;
		return fakeRequest(`/users/${id}`);
	})
	.then((res) => {
		const post = res.data.topPostId;
		return fakeRequest(`/posts/${post}`);
	})
	.then((res) => {
		console.log(res.data.title);
	})
	.catch((err) => {
		console.log(err.status);
	});

const req1 = new XMLHttpRequest();

req1.addEventListener('load', function() {
	console.log('first request worked');
	const data = JSON.parse(this.responseText);
	const filmURL = data.results[0].films[0];
	const req2 = new XMLHttpRequest();
	req2.addEventListener('load', function() {
		console.log('second request worked');
		console.log(JSON.parse(this.responseText));
	});
	req2.addEventListener('error', function(e) {
		console.log(e);
	});
	req2.open('GET', filmURL);
	req2.send();
});
req1.addEventListener('error', () => {
	console.log('error!');
});

req1.open('GET', 'https://swapi.dev/api/planets/');
req1.send();

fetch('https://swapi.dev/api/planets/').then((response) => {
	response.json().then((data) => {
		for (let planet of data.results) {
			console.log(planet.name);
		}
	});
});

const checkAndParse = (response) => {
	if (!response.ok) throw new Error('this is not right!!!');
	return response.json();
};
const printPlanets = (data) => {
	for (let planet of data.results) {
		console.log(planet.name);
	}
	return Promise.resolve(data);
};
const get10MorePlanets = (data) => {
	const nextPage = data.next;
	return fetch(nextPage);
};

fetch('https://swapi.dev/api/planets/')
	.then(checkAndParse)
	.then(printPlanets)
	.then(get10MorePlanets)
	.then(checkAndParse)
	.then(printPlanets)
	.then(get10MorePlanets)
	.then(checkAndParse)
	.then(printPlanets)
	.then(get10MorePlanets)
	.then(checkAndParse)
	.then(printPlanets)
	.catch((err) => {
		console.log('something went wrong');
		console.log(err);
	});

axios.get('jsjsjs').then((res) => {
	console.log(res.data);
});

axios.get('jldsjfldsfs').then(({ data }) => {
	for (let planet of data.results) {
		console.log(planet.name);
	}
	axios.get(data.next).then(({ data }) => {
		for (let planet of data.results) {
			console.log(planet.name);
		}
	});
});

const fetchNextPlanets = (url = 'https://lkjljl') => {
	return axios.get(url);
};
const printPlanets = ({ data }) => {
	for (let planet of data.results) {
		console.log(planet.name);
	}
	const url = data.next;
	return Promise.resolve(url);
};

fetchNextPlanets().then(printPlanets).then(fetchNextPlanets);

async function greet() {
	return 'Hello!';
}

greet().then((res) => {
	console.log('my greeting is', res);
});

async function add(x, y) {
	if (typeof x !== 'number' || typeof y !== 'number') {
		throw 'this is BS!!';
	}
	return x + y;
}

function add(x, y) {
	return new Promise((resolve, reject) => {
		if (typeof x !== 'number' || typeof y !== 'number') {
			reject('they must be numbers!');
		}
		resolve(x + y);
	});
}

add(2, 4)
	.then((res) => {
		console.log(res);
	})
	.catch((err) => {
		console.log(err);
	});

function addPlanet() {
	return axios.get('http://jsjsjsj');
}

addPlanet().then((res) => {
	console.log(res.data);
});

async function addPlanet() {
	try {
		const res = await axios.get('httpsljlsfjsl');
		console.log(res.data);
	} catch (e) {
		console.log(e);
	}
}

addPlanet();
