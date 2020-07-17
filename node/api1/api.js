const axios = require('axios');

axios
	.get('https://jsonplaceholder.typicode.com/users/1')
	.then((res) => {
		console.log(res.data.email);
	})
	.catch((err) => {
		console.log(err);
	});
