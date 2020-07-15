const willGetDog = new Promise((resolve, reject) => {
	setTimeout(() => {
		const num = Math.random();
		if (num < 0.5) {
			resolve();
		} else {
			reject();
		}
	}, 2000);
});

willGetDog.then(() => {
	console.log('It was resolved');
});
willGetDog.catch(() => {
	console.log('It was rejected');
});

////////////////////////////////////

const willGetDog = () => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			const num = Math.random();
			if (num < 0.5) {
				resolve();
			} else {
				reject();
			}
		}, 2000);
	});
};

willGetDog()
	.then(() => {
		console.log('It was resolved');
	})
	.catch(() => {
		console.log('It was rejected');
	});

//////////////////////////////////////

const fakeRequest = (url) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			const num = Math.random();
			if (num < 0.5) {
				resolve({ status: 200 });
			} else {
				reject({ status: 404 });
			}
		}, 2000);
	});
};

fakeRequest()
	.then((res) => {
		console.log('It worked');
		console.log('This is the status: ' + res.status);
	})
	.catch((err) => {
		console.log('It did not work');
		console.log('This is the status: ' + err.status);
	});
