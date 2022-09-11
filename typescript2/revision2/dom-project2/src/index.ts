interface Todo {
	text: string;
	completed: boolean;
}

const button = document.querySelector('button') as HTMLButtonElement;
const todoInput = document.querySelector('#todoinput') as HTMLInputElement;
const form = document.querySelector('form')!;
const todolist = document.getElementById('todolist') as HTMLUListElement;

const todos: Todo[] = readTodos();
todos.forEach(createTodo);

function saveTodos() {
	localStorage.setItem('todos', JSON.stringify(todos));
}

function readTodos(): Todo[] {
	const todosJSON = localStorage.getItem('todos');
	if (todosJSON === null) return [];
	return JSON.parse(todosJSON);
}

function createTodo(todo: Todo): void {
	const li = document.createElement('li');
	const checkbox = document.createElement('input');
	li.innerText = todo.text;
	checkbox.type = 'checkbox';
	checkbox.checked = todo.completed;
	checkbox.addEventListener('change', () => {
		todo.completed = checkbox.checked;
		saveTodos();
	});
	li.append(checkbox);
	todolist.appendChild(li);
}

const submitHandler = (e: SubmitEvent) => {
	e.preventDefault();
	const todo: Todo = {
		text: todoInput.value,
		completed: false,
	};
	todos.push(todo);
	saveTodos();
	todoInput.value = '';
	createTodo(todo);
};

form.addEventListener('submit', submitHandler);
