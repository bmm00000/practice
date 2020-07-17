axios
	.get('https://swapi.co/api/planets/')
	.then((res) => {
		//We don't have to parse the JSON!
		console.log(res.data);
	})
	.catch((err) => {
		console.log('IN CATCH CALLBACK!!!');
		console.log(err);
	});

axios
	.get('https://swapi.co/api/planetaslkjdaklsjds/') //BAD URL!
	.then((res) => {
		//We don't need to check for a 200 status code, because...
		//Axios will reject the promise for us, unlike fetch!
		console.log(res.data);
	})
	.catch((err) => {
		//In this example with a not-found URL, this callback will run...
		console.log('IN CATCH CALLBACK!!!');
		console.log(err);
	});

//////////////////////////////////////
// CHAINING PROMISES WITH AXIOS::

axios
	.get('https://swapi.co/api/planets/')
	.then((res) => {
		for (let item of res.data) {
			console.log(item);
		}
		return axios.get(res.data.nextURL);
	})
	.then((res) => {
		for (let item of res.data) {
			console.log(item);
		}
	})
	.catch((err) => {
		console.log('IN CATCH CALLBACK!!!');
		console.log(err);
	});

/////////////////////
//REFACTORING::

const getNext = (url = 'https://swapi.co/api/planets/') => {
	return axios.get(url);
};

const justPrint = (res) => {
	for (let item of res.data) {
		console.log(item);
	}
	return Promise.resolve(res.data.next);
};

getNext().then(justPrint).then(getNext).then(justPrint).catch((err) => {
	console.log('Error!', err);
});
