// const multiply = (x, y) => x * y;

// const square = (x) => multiply(x, x);

// const isRightTriangle = (a, b, c) => {
// 	return square(a) + square(b) === square(c);
// };

// isRightTriangle(3, 4, 5);

setTimeout(() => {
	document.body.style.backgroundColor = 'red';
	setTimeout(() => {
		document.body.style.backgroundColor = 'orange';
		setTimeout(() => {
			document.body.style.backgroundColor = 'yellow';
			setTimeout(() => {
				document.body.style.backgroundColor = 'blue';
			}, 1000);
		}, 1000);
	}, 1000);
}, 1000);
