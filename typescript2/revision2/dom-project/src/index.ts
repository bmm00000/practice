interface Todo {
	title: string;
	completed: boolean;
}

const button = document.getElementById('btn')!;
const input = document.getElementById('todo') as HTMLInputElement;
const form = document.querySelector('form')!;
const list = document.querySelector('ul')!;

const readTodos = (): Todo[] => {
	const todosJSON = localStorage.getItem('todos');
	if (!todosJSON) return [];
	return JSON.parse(todosJSON);
};

const createTodoElement = (todo: Todo): void => {
	const li = document.createElement('li');
	li.innerText = todo.title;
	const checkbox = document.createElement('input');
	checkbox.type = 'checkbox';
	checkbox.checked = todo.completed;
	checkbox.addEventListener('change', () => {
		todo.completed = checkbox.checked;
		localStorage.setItem('todos', JSON.stringify(todos));
	});
	li.append(checkbox);
	list.appendChild(li);
};

const todos: Todo[] = readTodos();
todos.forEach(createTodoElement);

const submitHandler = (e: Event): void => {
	e.preventDefault();
	const todo: Todo = { title: input.value, completed: false };
	todos.push(todo);
	localStorage.setItem('todos', JSON.stringify(todos));
	createTodoElement(todo);
	input.value = '';
};

form.addEventListener('submit', submitHandler);
