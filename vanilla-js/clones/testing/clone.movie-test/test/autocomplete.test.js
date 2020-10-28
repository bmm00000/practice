const waitFor = (selector) => {
	return new Promise((resolve, reject) => {
		const interval = setInterval(() => {
			if (document.querySelector(selector)) {
				clearInterval(interval);
				clearTimeout(timeout);
				resolve();
			}
		}, 50);

		const timeout = setTimeout(() => {
			clearInterval(interval);
			reject();
		}, 2000);
	});
};

beforeEach(() => {
	document.querySelector('#target').innerHTML = '';
	createAutoComplete({
		root: document.querySelector('#target'),
		fetchData() {
			return [
				{ Title: 'Avengers' },
				{ Title: 'Avenbgers2' },
				{ Title: 'Avengers3' },
			];
		},
		renderOption(movie) {
			return movie.Title;
		},
	});
});

it('Autocomplete starts closed', () => {
	const dropdown = document.querySelector('.dropdown');
	chai.expect(dropdown.className).not.to.include('is-active');
});

it('Autocomplete opens when we type something', async () => {
	const input = document.querySelector('input');
	input.value = 'something';
	input.dispatchEvent(new Event('input'));
	await waitFor('.dropdown-item');

	const dropdown = document.querySelector('.dropdown');
	chai.expect(dropdown.className).to.include('is-active');
});

it('Autocomplete shows certain number of items', async () => {
	const input = document.querySelector('input');
	input.value = 'something';
	input.dispatchEvent(new Event('input'));
	await waitFor('.dropdown-item');

	const items = document.querySelectorAll('.dropdown-item');
	chai.expect(items.length).to.equal(3);
});
