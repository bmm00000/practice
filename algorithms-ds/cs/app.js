// function reverseStr(str) {
// 	let newStr = '';
// 	for (let char of str) {
// 		newStr = char + newStr;
// 	}
// 	return newStr;
// }

// function sumUp(n) {
// 	let total = 0;
// 	for (let i = 1; i <= n; i++) {
// 		total += i;
// 	}
// 	return total;
// }

// const t1 = performance.now();
// sumUp(1000000000);
// const t2 = performance.now();

// console.log(t2 - t1);

// function same(array1, array2) {
// 	if (array1.length !== array2.length) {
// 		return false;
// 	}
// 	for (let i = 0; i < array1.length; i++) {
// 		const indArray2 = array2.indexOf(array1[i] ** 2);
// 		if (indArray2 === -1) {
// 			return false;
// 		}
// 		array2.splice(indArray2, 1);
// 	}
// 	return true;
// }

// same([1, 2, 1, 2], [1, 1, 1, 4]);

function same(array1, array2) {
	if (array1.length !== array2.length) {
		return false;
	}
	let res = false;
	for (let i = 0; i < array1.length; i++) {
		const squaredVal = array1[i] ** 2;

		for (let j = 0; j < array2.length; i++) {
			if (array2[j] === squaredVal) {
				res = true;
				array2.splice(j, 1);
				break;
			} else {
				res = false;
			}
		}
	}
	return res;
}
// same([1, 2, 1, 2], [1, 1, 1, 4]);
