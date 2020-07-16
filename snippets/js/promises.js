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
			const data = {
				'/about': 'This is the about page',
				'/shop': 'This is the shop page',
				'/password': 'id1234',
				'/id1234': 'This is the secret info'
			};
			let text = data[url];
			if (text) {
				resolve({ status: 200, text });
			} else {
				reject({ status: 404 });
			}
		}, 2000);
	});
};

fakeRequest('/password')
	.then((res) => {
		console.log('1st promise worked. Status: ' + res.status);
		console.log(res.text);
		return fakeRequest(`/${res.text}`);
	})
	.then((res) => {
		console.log('2nd promise worked. Status: ' + res.status);
		console.log(res.text);
	})
	.catch((err) => {
		console.log('It did not work. Status: ' + err.status);
	});
