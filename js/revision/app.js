// // function makeColor(r, g, b) {
// // 	const color = {};
// // 	color.r = r;
// // 	color.g = g;
// // 	color.b = b;
// // 	color.rgb = function () {
// // 		const { r, g, b } = this;
// // 		return `rgb(${r},${g},${b})`;
// // 	};
// // 	return color;
// // }

// // const color2 = makeColor(1, 2, 3);

// function MakeColor(r, g, b) {
// 	this.r = r;
// 	this.g = g;
// 	this.b = b;
// }

// MakeColor.prototype.rgb = function () {
// 	const { r, g, b } = this;
// 	return `rgb(${r},${g},${b})`;
// };

// const color1 = new MakeColor(1, 2, 3);
// const color2 = new MakeColor(4, 5, 6);

// document.body.style.backgroundColor = color1.rgb();

fetch('https://jsonplaceholdeasfdsar.typicode.com/todos/1')
	.then(
		function (response) {
			return response.json();
		}
		// function (error) {
		// 	console.log(error);
		// 	return 'Error handled!';
		// }
	)
	.catch(function (err) {
		console.log(err);
		return 'Error handledddd';
	})
	.then(function (data) {
		console.log(data);
	});

// const myPromise = new Promise(function (resolve, reject) {
// 	setTimeout(function () {
// 		resolve('It worked');
// 	}, 2000);
// });

// function setTimer(milisec) {
// 	return new Promise(function (resolve, reject) {
// 		setTimeout(function () {
// 			resolve('promisified haha!!');
// 		}, milisec);
// 	});
// }

// setTimer(2000)
// 	.then(function (data) {
// 		console.log('first block');
// 		console.log(data);
// 		return 123;
// 	})
// 	.then(function (data) {
// 		console.log('second block');
// 		console.log(data);
// 		return setTimer(4000);
// 	})
// 	.then(function (data) {
// 		console.log(data);
// 		return setTimer(1);
// 	})
// 	.then(function (data) {
// 		console.log(data);
// 	});
