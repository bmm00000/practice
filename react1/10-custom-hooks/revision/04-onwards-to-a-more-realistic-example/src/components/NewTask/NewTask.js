import Section from '../UI/Section';
import TaskForm from './TaskForm';
import useHttp from '../../hooks/use-http';

const NewTask = (props) => {
	const applyPostReqData = (data, taskText) => {
		const generatedId = data.name; // firebase-specific => "name" contains generated id
		const createdTask = { id: generatedId, text: taskText };

		props.onAddTask(createdTask);
	};

	const getReqConfig = {
		url: 'https://custom-hooks-b5e68-default-rtdb.europe-west1.firebasedatabase.app/tasks.json',
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		applyData: applyPostReqData,
	};

	const { isLoading, error, sendRequest } = useHttp(getReqConfig);

	return (
		<Section>
			<TaskForm onEnterTask={sendRequest} loading={isLoading} />
			{error && <p>{error}</p>}
		</Section>
	);
};

export default NewTask;
