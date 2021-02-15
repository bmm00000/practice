// with 'async', the function returns a promise.

async function addUp(x, y) {
	if (typeof x !== 'number' || typeof y !== 'number') {
		throw 'X and Y must be numbers!'; // we throw an exception to specify when the promise will be rejected.
	}
	return x + y; //when the promise is resolved, it will return this.
}

addUp('3', 3)
	.then((res) => {
		console.log('This is the value: ' + res);
	})
	.catch((err) => {
		console.log('This is the error: ' + err);
	});

// our function with 'async' is a shortcut syntax for this:

function addUp(x, y) {
	return new Promise((resolve, reject) => {
		if (typeof x !== 'number' || typeof y !== 'number') {
			reject('X and Y must be numbers!');
		}
		resolve(x + y);
	});
}

///////////////////////////

function getPlanets() {
	return axios.get('https://planets.com');
}

getPlanets().then((res) => {
	console.log(res.data);
});

// it's the same as::

async function getPlanets() {
	let res = await axios.get('https://planets.com');
	console.log(res.data);
}

getPlanets();

// how to catch errors? you have two options:

getPlanets().catch((err) => {
	console.log('Error!', err);
});

//or:

async function getPlanets() {
	try {
		let res = await axios.get('https://planets.com');
		console.log(res.data);
	} catch (e) {
		console.log('Error!', err);
	}
}

getPlanets();

///////////// SEQUENTIAL REQUESTS:

async function addPoke() {
	const poke1 = await axios.get('https://pokeapi.co/1');
	const poke2 = await axios.get('https://pokeapi.co/2');
	const poke3 = await axios.get('https://pokeapi.co/3');
	console.log(poke1.data);
	console.log(poke2.data);
	console.log(poke3.data);
}
// 'poke1' has to finish before going to 'poke2.
// This is useful if 'poke2' request needs a url from 'poke1'

////////// Otherwise, PARALELL REQUESTS (much faster):

async function addPoke() {
	const prom1 = axios.get('https://pokeapi.co/1');
	const prom2 = axios.get('https://pokeapi.co/2');
	const prom3 = axios.get('https://pokeapi.co/3');
	const poke1 = await prom1;
	const poke2 = await prom2;
	const poke3 = await prom3;
	console.log(poke1.data);
	console.log(poke2.data);
	console.log(poke3.data);
}
// 'prom1' is a pending promise, it doesn't have the data yet, that's why we declare 'poke1' to get the data inside it.

// refactoring::

async function addPoke() {
	const prom1 = axios.get('https://pokeapi.co/1');
	const prom2 = axios.get('https://pokeapi.co/2');
	const prom3 = axios.get('https://pokeapi.co/3');
	const results = await Promise.all([ prom1, prom2, prom3 ]);
	console.log(results); // this is an array with the 3 resolved promises
	printPoke(results);
}

function printPoke(res) {
	for (let poke of res) {
		console.log(poke.name);
	}
}
