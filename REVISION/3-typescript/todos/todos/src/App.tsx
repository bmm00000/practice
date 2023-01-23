import { useState } from 'react';

import Todo from './models/todo';
import Todos from './components/Todos';
import TodosForm from './components/TodosForm';

// const items = [
// 	{ id: '1', text: 'Learn React' },
// 	{ id: '2', text: 'Learn TS' },
// ];

function App(): JSX.Element {
	const [items, setItems] = useState<Todo[]>([]);

	const addTodoHandler = (input: string) => {
		const newItem = {
			id: new Date().toISOString(),
			text: input,
		};
		setItems((existingItems) => [newItem, ...existingItems]);
	};

	return (
		<>
			<h1>These are my todos:</h1>
			<TodosForm onAddTodo={addTodoHandler} />
			<Todos items={items} />
		</>
	);
}

export default App;
