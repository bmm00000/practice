document.querySelector('form').addEventListener('submit', (event) => {
	event.preventDefault();

	const { value } = document.querySelector('input');

	const header = document.querySelector('h1');
	if (value.includes('@')) {
		header.innerHTML = 'Looks good!';
	} else {
		header.innerHTML = 'Invalid email';
	}
});

// it would be very challenging to test this project inside of the browser the same way that we did with the autocomplete (see why in screenshot 'mocha in the browser')
