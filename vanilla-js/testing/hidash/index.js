// se are using functions from this library: https://lodash.com/ (it was before JS incorporated built-in funcitons like the following ones):

module.exports = {
	forEach(arr, fn) {
		for (let i = 0; i < arr.length; i++) {
			const value = arr[i];
			fn(value, i);
		}
		// 	for (let index in arr) {
		// 		fn(arr[index], index);
		// }
	},

	map(arr, fn) {
		// let newArr = [];
		// for (let num of arr) {
		// 	newArr.push(fn(num));
		// }
		// return newArr;

		let result = [];
		for (let i = 0; i < arr.length; i++) {
			result.push(fn(arr[i], i));
		}
		return result;
	}
};
