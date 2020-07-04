const keydown = document.querySelector('#keydown');

keydown.addEventListener('keydown', function() {
	console.log('KEYDOWN');
});

keydown.addEventListener('keyup', function() {
	console.log('KEYUP');
});

keydown.addEventListener('keypress', function() {
	console.log('KEYPRESS');
});

const input = document.querySelector('#addItem');
const items = document.querySelector('#items');

input.addEventListener('keypress', function(e) {
	if (e.key === 'Enter' && this.value) {
		let item = this.value;
		const li = document.createElement('li');
		li.innerText = item;
		items.appendChild(li);
		this.value = '';
	}
});
