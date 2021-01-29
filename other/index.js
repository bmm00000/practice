// const multiply = (x, y) => x * y;

// const square = (x) => multiply(x, x);

// const isRightTriangle = (a, b, c) => {
// 	return square(a) + square(b) === square(c);
// };

// isRightTriangle(3, 4, 5);

// setTimeout(() => {
// 	document.body.style.backgroundColor = 'red';
// 	setTimeout(() => {
// 		document.body.style.backgroundColor = 'orange';
// 		setTimeout(() => {
// 			document.body.style.backgroundColor = 'yellow';
// 			setTimeout(() => {
// 				document.body.style.backgroundColor = 'blue';
// 			}, 1000);
// 		}, 1000);
// 	}, 1000);
// }, 1000);

function makeColor(r, g, b) {
	const color = {};
	color.r = r;
	color.g = g;
	color.b = b;

	color.rgb = function () {
		const { r, g, b } = this;
		console.log(`rgb(${r},${g},${b})`);
	};

	return color;
}

const blue = makeColor(3, 4, 5);

blue.rgb();
