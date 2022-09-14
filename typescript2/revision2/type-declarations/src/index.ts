import axios from 'axios';

import _ from 'lodash';

_.sample(null);

interface Post {
	userId: number;
	id: number;
	title: string;
	body: string;
}

axios
	.get<Post[]>('https://jsonplaceholder.typicode.com/posts')
	.then((res) => {
		const { data } = res;
		data.forEach(printPost);
	})
	.catch((err) => {
		console.log(err);
	});

function printPost(post: Post): void {
	console.log(post.title);
	console.log(post.body);
}
