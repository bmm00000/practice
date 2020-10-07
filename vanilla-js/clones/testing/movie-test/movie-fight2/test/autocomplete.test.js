const waitFor = (selector) => {
	return new Promise((resolve, reject) => {
		const interval = setInterval(() => {
			if (document.querySelector(selector)) {
				clearInterval(interval);
				clearTimeout(timeout);
				resolve();
			}
		}, 30);

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
			return [ { Title: 'Avengers1' }, { Title: 'Avengers2' }, { Title: 'Avengers3' } ];
		},
		renderOption(movie) {
			return movie.Title;
		}
	});
});

it('Dropdown starts closed', () => {
	const dropdown = document.querySelector('.dropdown');
	chai.expect(dropdown.className).not.to.include('is-active');
});

it('Dropdown opens when you search something', async () => {
	const input = document.querySelector('input');
	input.value = 'taken';
	input.dispatchEvent(new Event('input'));

	await waitFor('.dropdown-item');

	const dropdown = document.querySelector('.dropdown');
	chai.expect(dropdown.className).to.include('is-active');
});

it('Dropdown has some elements when you search something', async () => {
	const input = document.querySelector('input');
	input.value = 'taken';
	input.dispatchEvent(new Event('input'));

	await waitFor('.dropdown-item');

	const items = document.querySelectorAll('.dropdown-item');
	chai.expect(items.length).to.equal(3);
});
