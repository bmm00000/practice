const createAutoComplete = ({ root, renderOption, onOptionSelect, inputValue, fetchData }) => {
	root.innerHTML = `
	<label><b>Search</b></label>
	<input class="input" />
	<div class="dropdown">
		<div class="dropdown-menu">
			<div class="dropdown-content results"></div>
		</div>
	</div>
`; // that's from the bulma library.

	// in slides 16-17, we have option 1 and option 2. We use option 2 becuase there is less dependency/coupling between the html and js files (if you screw up something from one of them, the whole project may go down the toilet), and also becuase our code will be more reusable if we generate everything (the whole widget) in the js file (for example, in our case, we want two autocomplete widgets, so we can reuse the same code as many times as we want). On the other hand, for example, the header of our site (Movie Fight) does not have any interactivity, and we only use it once, so it's ok if we code it in the html file.

	const input = root.querySelector('input');
	const dropdown = root.querySelector('.dropdown');
	const resultsWrapper = root.querySelector('.results');

	const onInput = async (event) => {
		const items = await fetchData(event.target.value);

		if (!items.length) {
			dropdown.classList.remove('is-active');
			return;
		}

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
		} // we use backticks `` in multiline strings.
	};

	input.addEventListener('input', debounce(onInput, 500));

	document.addEventListener('click', (event) => {
		if (!root.contains(event.target)) {
			dropdown.classList.remove('is-active');
		}
	});
};
