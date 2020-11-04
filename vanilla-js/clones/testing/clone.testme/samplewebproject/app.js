document.querySelector('form').addEventListener('submit', (e) => {
	e.preventDefault();

	const { value } = document.querySelector('input');

	const header = document.querySelector('h1');
	if (value.includes('@')) {
		header.innerHTML = 'Valid email';
	} else {
		header.innerHTML = 'Not valid email';
	}
});
