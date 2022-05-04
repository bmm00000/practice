function add(a: number, b: number) {
	return a + b;
}

const result = add('2', 5);
// the function expects numbers as arguments, and the IDE will warn us if we are passing any other type, BEFORE runtime, ie. during development.

console.log(result);
