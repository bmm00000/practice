createAutoComplete({
	root: document.querySelector('.autocomplete'),
	renderOption(movie) {
		// now we make sure that nothing appears if there is no image poster:
		const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
		return `
			<img src="${imgSrc}">
			${movie.Title} (${movie.Year})
		`;
	},
	onOptionSelect(movie) {
		onMovieSelect(movie);
	},
	inputValue(movie) {
		return movie.Title;
	},
	async fetchData(searchTerm) {
		const response = await axios.get('http://www.omdbapi.com/', {
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
