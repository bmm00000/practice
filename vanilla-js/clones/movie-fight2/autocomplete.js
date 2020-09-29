const createAutoComplete = ({ root, renderOption, onOptionSelect, inputValue, fetchData }) => {
	root.innerHTML = `
        <label><b>Search</b></label>
        <input class="input" />
        <div class="dropdown">
            <div class="dropdown-menu">
                <div class="dropdown-content results"></div>
            </div>
        </div>
    `;

	const input = root.querySelector('input');
	const dropdown = root.querySelector('.dropdown');
	const resultsWrapper = root.querySelector('.results');

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
		const items = await fetchData(event.target.value);
		// console.log(movies); // this will print a promise if we don't use 'async'/'await'

		// now we hide the autocomplete if there are not movies to show:
		if (!items.length) {
			dropdown.classList.remove('is-active');
			return;
		}

		// now we delete any pre-existing results, so older results don't stay there.
		resultsWrapper.innerHTML = '';

		dropdown.classList.add('is-active');
		for (let item of items) {
			const option = document.createElement('a');
			option.classList.add('dropdown-item');
			option.innerHTML = renderOption(item);

			option.addEventListener('click', () => {
				dropdown.classList.remove('is-active');
				input.value = inputValue(item);
				onOptionSelect(item);
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
};
