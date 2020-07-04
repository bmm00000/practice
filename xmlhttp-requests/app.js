// const firstReq = new XMLHttpRequest();
// firstReq.addEventListener('load', function() {
// 	const data = JSON.parse(this.responseText);
// 	const filmURL = data.films[0];
// 	const secondReq = new XMLHttpRequest();
// 	secondReq.addEventListener('load', function() {
// 		const data = JSON.parse(this.responseText);
// 		console.log(data.director);
// 	});
// 	secondReq.addEventListener('error', function(e) {
// 		console.log(e, 'error!');
// 	});
// 	secondReq.open('GET', filmURL);
// 	secondReq.send();
// });
// firstReq.addEventListener('error', function() {
// 	console.log('error!');
// });

// firstReq.open('GET', 'https://swapi.dev/api/planets/3/');
// firstReq.send();

const checkAndParse = (response) => {
	if (!response.ok) {
		throw new Error();
	}
	return response.json();
};

const fetchFromFilm = (data) => {
	const filmURL = data.films;
	return fetch(filmURL);
};

fetch('https://swapi.dev/api/planets/3/')
	.then(checkAndParse)
	.then(fetchFromFilm)
	.then(checkAndParse)
	.then((data) => {
		console.log(data.director);
	})
	.catch((error) => {
		console.log('catch error!');
	});
