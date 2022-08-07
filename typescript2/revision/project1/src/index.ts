interface Todo {
	text: string;
	completed: boolean;
}
const input = document.getElementById('input-element')! as HTMLInputElement;
const form = document.querySelector('#our-form')! as HTMLFormElement;
const list = document.querySelector('#list')!;

const todos: Todo[] = readTodos();
todos.forEach(createTodo);

function readTodos(): Todo[] {
	const todosJSON = localStorage.getItem('todos');
	if (todosJSON === null) return [];
	return JSON.parse(todosJSON);
}

function saveTodos() {
	localStorage.setItem('todos', JSON.stringify(todos));
}

const submitHandler = (e: SubmitEvent) => {
	e.preventDefault();

	const todo: Todo = {
		text: input.value,
		completed: false,
	};
	createTodo(todo);
	todos.push(todo);

	saveTodos();

	input.value = '';
};

function createTodo(todo: Todo) {
	const text = todo.text;
	const newLi = document.createElement('li');
	const checkbox = document.createElement('input');
	checkbox.type = 'checkbox';
	checkbox.checked = todo.completed;
	checkbox.addEventListener('change', function () {
		todo.completed = checkbox.checked;
		saveTodos();
	});
	newLi.append(text);
	newLi.appendChild(checkbox);
	list.append(newLi);
}

form.addEventListener('submit', submitHandler);
