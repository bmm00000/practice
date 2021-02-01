import axios from 'axios';

const url = 'https://jsonplaceholder.typicode.com/todos/1';

interface Todo {
	id: number;
	title: string;
	completed: boolean;
}

axios.get(url).then((response) => {
	const { id, title, completed } = response.data as Todo;
	logIt(id, title, completed);
});

const logIt = (id: number, title: string, completed: boolean) => {
	console.log(
		`The task with id ${id}, title: ${title}, is completed? ${completed}`
	);
};
