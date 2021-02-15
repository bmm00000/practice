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
		onMovieSelect(movie, document.querySelector('#left-summary'), 'left');
	},
});

createAutocomplete({
	...autoCompleteConfig,
	root: document.querySelector('#right-autocomplete'),
	onOptionSelect(movie) {
		document.querySelector('.tutorial').classList.add('is-hidden');
		onMovieSelect(movie, document.querySelector('#right-summary'), 'right');
	},
});

let leftMovie;
let rightMovie;
const onMovieSelect = async (movie, targetElement, side) => {
	const response = await axios.get('http://www.omdbapi.com', {
		params: {
			apikey: 'd9835cc5',
			i: movie.imdbID,
		},
	});

	targetElement.innerHTML = movieTemplate(response.data);

	if (side === 'left') {
		leftMovie = response.data;
	} else {
		rightMovie = response.data;
	}

	if (leftMovie && rightMovie) {
		runComparison();
	}
};

const runComparison = () => {
	const leftSideStats = document.querySelectorAll(
		'#left-summary .notification'
	);
	const rightSideStats = document.querySelectorAll(
		'#right-summary .notification'
	);

	leftSideStats.forEach((leftStat, index) => {
		const rightStat = rightSideStats[index];

		const leftStatValue = parseInt(leftStat.dataset.value);
		const rightStatValue = parseInt(rightStat.dataset.value);

		if (leftStatValue < rightStatValue) {
			leftStat.classList.remove('is-primary');
			leftStat.classList.add('is-warning');
		} else {
			rightStat.classList.remove('is-active');
			rightStat.classList.add('is-warning');
		}
	});
};

const movieTemplate = (movieDetail) => {
	const dollars = parseInt(
		movieDetail.BoxOffice.replace(/\$/g, '').replace(/,/g, '')
	);
	const metascore = parseInt(movieDetail.Metascore);
	const imdbRating = parseInt(movieDetail.imdbRating);
	const imdbVotes = parseInt(movieDetail.imdbVotes);
	const awards = movieDetail.Awards.split(' ').reduce((prev, word) => {
		const value = parseInt(word);
		if (isNaN(value)) {
			return prev;
		} else {
			return prev + value;
		}
	}, 0);

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
		<article data-value=${awards} class="notification is-primary">
			<p class="title">${movieDetail.Awards}</p>
			<p class="subtitle">Awards</p>
		</article>
		<article data-value=${dollars} class="notification is-primary">
			<p class="title">${movieDetail.BoxOffice}</p>
			<p class="subtitle">Box Office</p>
		</article>
		<article data-value=${metascore} class="notification is-primary">
			<p class="title">${movieDetail.Metascore}</p>
			<p class="subtitle">Metascore</p>
		</article>
		<article data-value=${imdbRating} class="notification is-primary">
			<p class="title">${movieDetail.imdbRating}</p>
			<p class="subtitle">IMDB Rating</p>
		</article>
		<article data-value=${imdbVotes} class="notification is-primary">
			<p class="title">${movieDetail.imdbVotes}</p>
			<p class="subtitle">IMDB Votes</p>
		</article>
	`;
};
