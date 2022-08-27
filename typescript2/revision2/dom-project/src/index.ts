function printTwice(message: string): void {
	console.log(message);
	console.log(message);
}

// printTwice('hello there!');

const button = document.getElementById('btn')!;
button.addEventListener('click', function () {
	alert('it works!');
});
