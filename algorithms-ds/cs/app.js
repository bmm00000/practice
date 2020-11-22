function reverseStr(str) {
	let newStr = '';
	for (let char of str) {
		newStr = char + newStr;
	}
	return newStr;
}

function sumUp(n) {
	let total = 0;
	for (let i = 1; i <= n; i++) {
		total += i;
	}
	return total;
}

const t1 = performance.now();
// sumUp(1000000000);
// const t2 = performance.now();

// console.log(t2 - t1);
