function add(a, b) {
	return a + b;
}
// js is dynamically typed, meaning that the function 'add' will not expect any particuar types of arguments (it's not statically typed, ie. the types of the arguments to be received are not announced ahead of time. instead it takes whatever it gets. therefore, you may have unwanted behaviours (for example, if you pass strings instead of numbers))

const result = add(2, 5);

console.log(result);
