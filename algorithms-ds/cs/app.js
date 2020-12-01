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

// function same(a1, a2) {
// 	if (a1.length !== a2.length) {
// 		return false;
// 	}

// 	const mapper = (arr) => {
// 		const map = {};
// 		for (let item of arr) {
// 			map[item] = map[item] + 1 || 1;
// 		}
// 		return map;
// 	};

// 	const freq1 = mapper(a1);
// 	const freq2 = mapper(a2);

// 	for (let key in freq1) {
// 		if (!(key ** 2 in freq2)) {
// 			return false;
// 		}

// 		if (freq1[key] !== freq2[key ** 2]) {
// 			return false;
// 		}
// 	}

// 	return true;
// }

// function anagram(str1, str2) {
// 	const mapper = (str) => {
// 		const map = {};
// 		for (let char of str) {
// 			map[char] = map[char] + 1 || 1;
// 		}
// 		return map;
// 	};

// 	if (str1.length !== str2.length) {
// 		return false;
// 	}

// 	const str1Map = mapper(str1);
// 	const str2Map = mapper(str2);

// 	for (let key in str1Map) {
// 		if (!str2Map[key]) {
// 			return false;
// 		}
// 		if (str1Map[key] !== str2Map[key]) {
// 			return false;
// 		}
// 	}
// 	return true;
// }

// anagram('anagram', 'nagaram');

function sumZero(arr) {
	for (let i = 0; i < arr.length; i++) {
		if (arr[i] - arr[arr.length - 1 - i] === 0) {
			return [arr[i], arr[arr.length - 1 - i]];
		}
	}
	return undefined;
}
