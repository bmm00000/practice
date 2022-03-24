import Section from '../UI/Section';
import TaskForm from './TaskForm';
import useHttp from '../../hooks/use-http';

const NewTask = (props) => {
	const { isLoading, error, sendRequest: sendTaskRequest } = useHttp();

	const createTask = (taskText, taskData) => {
		const generatedId = taskData.name; // firebase-specific => "name" contains generated id
		const createdTask = { id: generatedId, text: taskText };

		props.onAddTask(createdTask);
	};

	const enterTaskHandler = async (taskText) => {
		sendTaskRequest(
			{
				url: 'https://custom-hooks-b5e68-default-rtdb.europe-west1.firebasedatabase.app/tasks.json',
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: { text: taskText },
			},
			createTask.bind(null, taskText)
			// since the hook only accepts one argument, we are using the 'bind' method in js, which allows us to pre-configure a function (functions in js are objects, and objects can have methods, and every function object in js has a 'bind' method that you can call). 'bind' doesn't execute the function (so we still have just a pointer to the function), but it creates a new function and copies the original function inside of this new function, and pre-configures it (it pre-configures the arguments that the original function will take when it's called, and also will pre-configure what the 'this' keyword will be in case you use the 'this' keyword inside of the function). the first argument that we pass to 'bind' sets the 'this' keyword in the function to be executed, which doesn't matter to us (that's why we set it to 'null'). the second argument that we pass to 'bind' will be the first argument to be received by the function to be called (if you want to pre-configure more parameters, you can still pass more arguments to 'bind). the other argument (taskData) will still be received because any other arguments (apart from the pre-configured ones) that are passed when the function is called (in our case, 'data'), will simply be appended to the end of the parameter list (this is all just regular JS). more on 'bind':
			// https://academind.com/tutorials/function-bind-event-execution
		);
	};

	return (
		<Section>
			<TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
			{error && <p>{error}</p>}
		</Section>
	);
};

export default NewTask;
