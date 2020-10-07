module.exports = {
	forEach(arr, fn) {
		for (let i = 0; i < arr.length; i++) {
			const value = arr[i];
			fn(value);
		}
	},

	map(arr, fn) {
		const results = [];
		for (let element of arr) {
			results.push(fn(element));
		}
		return results;
	}
};
