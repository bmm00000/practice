import axios from 'axios';
import _ from 'lodash';

interface Post {
	userId: number;
	id: number;
	title: string;
	body: string;
}

axios
	.get<Post[]>('https://jsonplaceholder.typicode.com/posts')
	.then((res) => {
		console.log('DATA HERE!');
		const { data } = res;
		const printData = (post: Post) => {
			console.log(post.title);
		};
		data.forEach(printData);
	})
	.catch((err) => {
		console.log(err);
	});
