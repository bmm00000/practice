import axios from 'axios';

const url = 'https://jsonplaceholder.typicode.com/todos/1';

axios.get(url).then((response) => {
	const id = response.data.id;
	const title = response.data.title;
	const completed = response.data.completed;

	console.log(
		`The todo with id ${id}, with title ${title}: is completed? ${completed}`
	);
});
