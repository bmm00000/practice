const autoCompleteConfig = {
	renderOption(movie) {
		const imgURL = movie.Poster === 'N/A' ? '' : movie.Poster;
		return `
			<img src="${imgURL}">
			${movie.Title}
		`;
	},
	inputValue(movie) {
		return movie.Title;
	},
	async fetchData(searchTerm) {
		const results = await axios.get('http://www.omdbapi.com', {
			params: {
				apikey: 'd9835cc5',
				s: searchTerm,
			},
		});

		if (results.data.Error) {
			return [];
		}

		return results.data.Search;
	},
};

createAutocomplete({
	...autoCompleteConfig,
	root: document.querySelector('#left-autocomplete'),
	onOptionSelect(movie) {
		document.querySelector('.tutorial').classList.add('is-hidden');
		onMovieSelect(movie, document.querySelector('#left-summary'));
	},
});

createAutocomplete({
	...autoCompleteConfig,
	root: document.querySelector('#right-autocomplete'),
	onOptionSelect(movie) {
		document.querySelector('.tutorial').classList.add('is-hidden');
		onMovieSelect(movie, document.querySelector('#right-summary'));
	},
});

const onMovieSelect = async (movie, targetElement) => {
	const response = await axios.get('http://www.omdbapi.com', {
		params: {
			apikey: 'd9835cc5',
			i: movie.imdbID,
		},
	});

	targetElement.innerHTML = movieTemplate(response.data);
};

const movieTemplate = (movieDetail) => {
	return `
		<article class="media">
		<figure class="media-left">
		<p class="image">
			<img src="${movieDetail.Poster}" />
		</p>
		</figure>
		<div class="media-content">
		<div class="content">
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
			<p class="subtitle">Box Office</p>
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
