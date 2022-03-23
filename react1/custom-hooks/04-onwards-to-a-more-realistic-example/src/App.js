import React, { useEffect, useState, useCallback } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttp from './hooks/use-http';

function App() {
	const [tasks, setTasks] = useState([]);

	const transformTasks = useCallback((tasksObj) => {
		const loadedTasks = [];

		for (const taskKey in tasksObj) {
			loadedTasks.push({ id: taskKey, text: tasksObj[taskKey].text });
		}

		setTasks(loadedTasks);
	}, []);

	const { isLoading, error, sendRequest: fetchTasks } = useHttp(transformTasks);
	// remember, when we use a custom hook that uses state in a component, this component will implicitly use the state set up in the custom hook, so the state configured in the custom hook is attached to the component where we use the custom hook. in our case, every time the App component is re-evaluated, we will call the custom hook again, and when that happens we will re-create the sendRequest function, therefore return a new function object (fetchTasks), and useEffect will run again if we added fetchTasks in the dependencies array (infinite loop). (this happens because functions are objects in js, and every time a function is re-created, even if it contains the same logic, it's a brand new object in memory). That's why we useCallback in the custom hook.

	useEffect(() => {
		fetchTasks({
			url: 'https://custom-hooks-b5e68-default-rtdb.europe-west1.firebasedatabase.app/tasks.json',
		});
	}, []);

	const taskAddHandler = (task) => {
		setTasks((prevTasks) => prevTasks.concat(task));
	};

	return (
		<React.Fragment>
			<NewTask onAddTask={taskAddHandler} />
			<Tasks
				items={tasks}
				loading={isLoading}
				error={error}
				onFetch={fetchTasks}
			/>
		</React.Fragment>
	);
}

export default App;
