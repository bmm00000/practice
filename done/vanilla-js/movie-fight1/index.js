const fetchData = async (searchTerm) => {
	const response = await axios.get('http://www.omdbapi.com/', {
		// we can write the request more neatly thanks to the axios library:
		params: {
			apikey: '79a0b990',
			s: searchTerm
		}
	});

	// we do the following to avoid an error if there is no movie with the name that we are looking for
	if (response.data.Error) {
		return [];
	}

	return response.data.Search;
};

const root = document.querySelector('.autocomplete');
root.innerHTML = `
	<label><b>Search</b></label>
	<input class="input" />
	<div class="dropdown">
		<div class="dropdown-menu">
			<div class="dropdown-content results"></div>
		</div>
	</div>
`;

const input = document.querySelector('input');
const dropdown = document.querySelector('.dropdown');
const resultsWrapper = document.querySelector('.results');

// let timeoutId;
// const onInput = (event) => {
// 	if (timeoutId) {
// 		clearTimeout(timeoutId);
// 	}
// 	timeoutId = setTimeout(() => {
// 		fetchData(event.target.value);
// 	}, 500);
// };

// but now we are going to write a 'debounce' function, so we can reuse the deboucing functionality for other purposes in the future (see 'utils.js')

const onInput = async (event) => {
	const movies = await fetchData(event.target.value);
	// console.log(movies); // this will print a promise if we don't use 'async'/'await'

	// now we hide the autocomplete if there are not movies to show:
	if (!movies.length) {
		dropdown.classList.remove('is-active');
		return;
	}

	// now we delete any pre-existing results, so older results don't stay there.
	resultsWrapper.innerHTML = '';

	dropdown.classList.add('is-active');
	for (let movie of movies) {
		const option = document.createElement('a');
		// now we make sure that nothing appears if there is no image poster:
		const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;

		option.classList.add('dropdown-item');
		option.innerHTML = `
			<img src="${imgSrc}">
			${movie.Title}
		`;

		option.addEventListener('click', () => {
			dropdown.classList.remove('is-active');
			input.value = movie.Title;
			onMovieSelect(movie);
		});
		resultsWrapper.appendChild(option);
	}
};

input.addEventListener('input', debounce(onInput));

// now we are going to hide the autocomplete if we click somewhere else:
document.addEventListener('click', (event) => {
	if (!root.contains(event.target)) {
		dropdown.classList.remove('is-active');
	}
});

// when we click on a movie, we have to get all the info about it:
const onMovieSelect = async (movie) => {
	const response = await axios.get('http://www.omdbapi.com/', {
		params: {
			apikey: '79a0b990',
			i: movie.imdbID
		}
	});
	// and then we can render the info about the movie:
	document.querySelector('#target').innerHTML = movieTemplate(response.data);
};

const movieTemplate = (movieDetail) => {
	return `
		<article class="media">
			<figure class="media-left">
				<p class="image">
					<img src="${movieDetail.Poster}" />
				</p>
			</figure>
			<div>
				<div>
					<h1>${movieDetail.Title}</h1>
					<h4>${movieDetail.Genre}</h4>
					<p>${movieDetail.Plot}</p>
				</div>
			</div>
		</article>
		<article class="notification is-primary">
			<p class="title">${movieDetail.Awards}</p>
			<p class="subtitle">Awards</p>
		</article>
		<article class="notification is-primary">
			<p class="title">${movieDetail.BoxOffice}</p>
			<p class="subtitle">BoxOffice</p>
		</article>
		<article class="notification is-primary">
			<p class="title">${movieDetail.Metascore}</p>
			<p class="subtitle">Metascore</p>
		</article>
		<article class="notification is-primary">
			<p class="title">${movieDetail.imdbRating}</p>
			<p class="subtitle">IMDB Rating</p>
		</article>
		<article class="notification is-primary">
			<p class="title">${movieDetail.imdbVotes}</p>
			<p class="subtitle">IMDB Votes</p>
		</article>
	`;
};

// HOWEVER, all our autocomplete code is adapted to the movies api, therefore, it's not reusable. now we are going to make it reusable.

// another problem with this code is that you have many global variables that refer to specific elements. Therefore, it will be hard to show another autocomplete on the screen (you would need to copy the same code, and change variable names so they don't conflict with pre-existing variables...)
