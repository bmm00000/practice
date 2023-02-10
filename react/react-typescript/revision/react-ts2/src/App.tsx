import { useState } from 'react';

import Todo from './models/todo';

import NewTodo from './components/NewTodo';
import Todos from './components/Todos';

function App() {
	const [todos, setTodos] = useState<Todo[]>([]);

	const addTodoHandler = (todoText: string): void => {
		const newTodo = new Todo(todoText);

		setTodos((prevTodos) => prevTodos.concat(newTodo));
	};

	return (
		<div>
			<NewTodo onAddTodo={addTodoHandler} />
			<Todos items={todos} />
		</div>
	);
}

export default App;
