const inputForm = document.getElementById('input-form');
inputForm.addEventListener('submit', (e) => {
	e.preventDefault();
	const task = document.getElementById('task').value;
	if (!task) {
		return;
	}

	const taskLi = document.createElement('li');
	taskLi.style.listStyle = 'none';
	const taskInput = document.createElement('input');
	const taskLabel = document.createElement('label');

	taskInput.setAttribute('type', 'checkbox');
	taskInput.addEventListener('click', () => {
		taskInput.setAttribute('disabled', 'true');
		taskLabel.style.textDecoration = 'line-through';
	});
	taskLabel.innerText = task;

	taskLi.appendChild(taskInput);
	taskLi.appendChild(taskLabel);
	document.getElementById('tasks').appendChild(taskLi);

	inputForm.reset();
});
