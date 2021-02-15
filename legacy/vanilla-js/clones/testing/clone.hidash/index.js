module.exports = {
	forEach(arr, fn) {
		for (let num of arr) {
			fn(num);
		}
	},

	map(arr, fn) {
		const result = [];
		for (let num of arr) {
			result.push(fn(num));
		}
		return result;
	},
};
