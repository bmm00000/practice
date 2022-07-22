// fetch('https://jsonplaceholder.typicode.com/todos/1')
// 	.then((response) => {
// 		return response.json();
// 	})
// 	.then((data) => {
// 		console.log(data);
// 	});

// const ourPromise = new Promise((resolve, reject) => {
// 	setTimeout(() => {
// 		resolve('it worked!');
// 	}, 2000);
// });

// ourPromise
// 	.then((response) => {
// 		console.log(response);
// 		return 123;
// 	})
// 	.then((data) => {
// 		console.log(data);
// 		return new Promise((resolve, reject) => {
// 			setTimeout(() => {
// 				resolve('another custom promise resolved');
// 			}, 2000);
// 		});
// 	})
// 	.then((response) => {
// 		console.log(response);
// 	});

//

// const ourTimer = (duration) => {
// 	return new Promise((resolve, reject) => {
// 		setTimeout(() => {
// 			reject('ourTimer rejected');
// 		}, duration);
// 	});
// };

// ourTimer(2000)
// 	.then((response) => {
// 		console.log(response);
// 		return 123;
// 	})
// 	.then((data) => {
// 		console.log(data);
// 		return ourTimer(2000);
// 	})
// 	.catch((err) => {
// 		console.log(err);
// 		return 'haha';
// 	})
// 	.then((response) => {
// 		console.log(response);
// 	});

//

// fetch('https://jsonplacehoasdasdder.typicode.com/todos/1l;ajsdlfjasdlkf')
// 	.then((response) => {
// 		return response.json();
// 	})
// 	.catch((err) => {
// 		console.log('only error block');
// 		return 123;
// 	})
// 	.then((data) => {
// 		console.log(data);
// 	});

// fetch('https://jsonplaceholder.typicode.com/todos/1')
// 	.then((response) => {
// 		return response.json();
// 	})
// 	.then((data) => {
// 		console.log(data);
// 	});

const sendRequest = async () => {
	try {
		const response = await fetch(
			'https://jsonplaclkasjdfkl;dajskeholder.typicode.com/todos/1'
		);
		const data = await response.json();
		console.log(data);
	} catch (err) {
		console.log('haha');
	}
};

sendRequest();
console.log('first thing');
