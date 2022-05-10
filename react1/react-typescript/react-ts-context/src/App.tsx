import { useState } from 'react';

import NewTodo from './components/NewTodo';
import Todos from './components/Todos';
import Todo from './models/todo';

function App() {
	// const [todos, setTodos] = useState([]);
	// if you scroll, you will see that ts infers that 'todos' is of type 'never[]', which means that it must be an empty array. how to solve this? useState is a generic function out of the box (so that we can set the type of data that we want to store in the state):
	const [todos, setTodos] = useState<Todo[]>([]);

	const addTodoHandler = (text: string) => {
		const newTodo = new Todo(text);
		// setTodos((prevTodos) => [...prevTodos, newTodo]);
		setTodos((prevTodos) => prevTodos.concat(newTodo));
	};

	const removeTodoHandler = (todoId: string) => {
		setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
	};

	return (
		<div>
			<NewTodo onAddTodo={addTodoHandler} />
			<Todos items={todos} onRemoveTodo={removeTodoHandler} />
		</div>
	);
}

export default App;
