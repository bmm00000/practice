import axios from 'axios';
import _ from 'lodash';

axios
	.get('https://jsonplaceholder.typicode.com/users/1')
	.then((response) => {
		console.log('wowoooo!');
		console.log(response.data);
	})
	.catch((error) => {
		console.log('Error!: ', error);
	});
