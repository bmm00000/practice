const todoInput = document.querySelector('#todoinput') as HTMLInputElement;
const button = document.querySelector('button') as HTMLButtonElement;

button.addEventListener('click', () => {
	console.log(todoInput.value);
});
