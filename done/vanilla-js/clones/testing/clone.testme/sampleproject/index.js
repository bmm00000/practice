module.exports = {
	forEach(arr, fn) {
		for (let num of arr) {
			fn(num);
		}
	},
};
