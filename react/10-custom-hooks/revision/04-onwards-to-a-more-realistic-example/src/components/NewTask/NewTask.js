import Section from '../UI/Section';
import TaskForm from './TaskForm';
import useHttp from '../../hooks/use-http';

const NewTask = (props) => {
	const { isLoading, error, sendRequest: sendTaskData } = useHttp();

	const transformData = (taskText, dataObj) => {
		const generatedId = dataObj.name; // firebase-specific => "name" contains generated id
		const createdTask = { id: generatedId, text: taskText };
		props.onAddTask(createdTask);
	};

	const enterTaskHandler = async (taskText) => {
		sendTaskData(
			{
				url: 'https://custom-hooks-b5e68-default-rtdb.europe-west1.firebasedatabase.app/tasks.json',
				method: 'POST',
				body: { text: taskText },
				headers: {
					'Content-Type': 'application/json',
				},
			},
			transformData.bind(null, taskText)
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
