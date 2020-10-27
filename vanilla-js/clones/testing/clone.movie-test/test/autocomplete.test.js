it('Shows an autocomplete', () => {
	createAutoComplete({
		root: document.querySelector('#target'),
		fetchData() {
			return [
				{ Title: 'Avengers1' },
				{ Title: 'Avengers2' },
				{ Title: 'Avengers3' },
			];
		},
		renderOption(movie) {
			return movie.Title;
		},
	});

	const dropdown = document.querySelector('.dropdown');
	chai.expect(dropdown.className).not.to.include('is-active');
});
