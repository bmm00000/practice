const fetchData = async (searchTerm) => {
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
		resultsWrapper.appendChild(option);
	}
};

input.addEventListener('input', debounce(onInput));
