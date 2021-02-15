fetch('https://pokeapi.co/api/v2/')
	.then((res) => {
		if (!res.ok) {
			throw new Error(`Status code error: ${res.status}`);
		} //by itself, it only gets to 'catch' if network failure, so we 'throw' error to make it go to 'catch'
		return res.json();
	})
	.then((data) => {
		console.log(data);
		// then you can do anything with the data, for example:
		// for (let element from data.results) {
		//    console.log(element.name)
		// AND  you can chain more promises:
		const newURL = data.results.films;
		return fetch(newURL);
	})
	.then((res) => {
		if (!res.ok) {
			throw new Error(`Status code error: ${res.status}`);
		}
		return res.json();
	})
	.then((data) => {
		console.log(data);
	})
	.catch(function(err) {
		console.log('Fetch error', err);
	});

//////////////////////////////////////////
// REFACTORING::

const checkStatusAndParse = (res) => {
	if (!res.ok) {
		throw new Error(`Status code error: ${res.status}`);
	}
	return res.json();
};

const printPlanets = (data) => {
	for (let planet of data.planets) {
		console.log(planet);
	}
	return Promise.resolve(data); // method to return a promise, so we can continue chaining '.then'
};

const callNewURL = (data) => {
	const newURL = data.results.nextfilm;
	return fetch(newURL);
};

const nextFetch = (url = 'https://pokeapi.co/api/v2/') => {
	return fetch(url);
};

nextFetch()
	.then(checkStatusAndParse)
	.then(printPlanets)
	.then(callNewURL)
	.then(checkStatusAndParse)
	.then(printPlanets)
	.catch(function(err) {
		console.log('Fetch error', err);
	});
