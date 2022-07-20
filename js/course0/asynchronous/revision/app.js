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

const ourTimer = (duration) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve('ourTimer resolved');
		}, duration);
	});
};

ourTimer(2000)
	.then((response) => {
		console.log(response);
		return 123;
	})
	.then((data) => {
		console.log(data);
		return ourTimer(2000);
	})
	.then((response) => {
		console.log(response);
	});
