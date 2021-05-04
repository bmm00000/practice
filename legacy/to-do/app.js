const inputForm = document.getElementById('input-form');
inputForm.addEventListener('submit', (e) => {
	e.preventDefault();
	const task = document.getElementById('task').value;
	if (!task) {
		return;
	}

	const taskLi = document.createElement('li');
	const taskInput = document.createElement('input');
	const taskLabel = document.createElement('label');
	const icon = document.createElement('i');

	taskLi.style.listStyle = 'none';
	taskInput.setAttribute('type', 'checkbox');
	taskInput.addEventListener('click', () => {
		taskInput.setAttribute('disabled', 'true');
		taskLabel.style.textDecoration = 'line-through';
	});
	taskLabel.innerText = task;
	icon.setAttribute('class', 'far fa-window-close');
	icon.addEventListener('click', () => {
		taskLi.style.display = 'none';
	});

	taskLi.appendChild(taskInput);
	taskLi.appendChild(taskLabel);
	taskLi.appendChild(icon);
	document.getElementById('tasks').appendChild(taskLi);

	inputForm.reset();
});
