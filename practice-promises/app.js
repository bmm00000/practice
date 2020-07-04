// const willGetDog = () => {
// 	return new Promise((resolve, reject) => {
// 		setTimeout(() => {
// 			const num = Math.random();
// 			if (num > 0.5) {
// 				resolve();
// 			} else {
// 				reject();
// 			}
// 		}, 2000);
// 	});
// };
// willGetDog()
// 	.then(() => {
// 		console.log('yayyyyy');
// 	})
// 	.catch(() => {
// 		console.log('noooooo');
// 	});

const fakeRequest = (url) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			const pages = {
				'/about': 'This is the about page',
				'/shop': [ 'This is the shop', { id: 1 } ],
				'/shop/1': 'here the shp 1'
			};
			const data = pages[url];
			if (data) {
				resolve({ status: 200, data });
			} else {
				reject({ status: 404 });
			}
		}, 2000);
	});
};

fakeRequest('/shop')
	.then((res) => {
		const id = res.data[1].id;
		return fakeRequest(`/shop/${id}`).then((res) => {
			console.log(res.data);
		});
	})
	.catch((err) => {
		console.log(err.status);
	});
