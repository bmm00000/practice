// Math.round();
// as you can see, ts tells you there's something wrong. this doesn't happen if you use just js.

// you have to run 'tsc basics.ts' in the same directory as your 'basics.ts' file is.

console.log('hello');
console.log('hello again');
let pi: number = 3.14;

// if you want to give default values to parameters, this is the syntax:
function saySmth(word: string = 'hi') {
	console.log(word);
}
saySmth(); // 'hi'
saySmth('hello'); // 'hello'
// saySmth(3) // ts warns us that we are passing a number

// function return types:
function square(n: number) {
	return n * n;
}
// above, if we hover over square, you will see that ts infers that the return type is number. however it's better to specify the return type. why? in the example above, you may have forgotten about the 'return' keyword, ts will infer that it returns 'void':
function square2(n: number) {
	n * n;
}
// but if you specify the return type, then ts will tell you if you forgot about the 'return' keyword:
function square3(n: number): number {
	n * n;
}
// if you don't specify the return type, there will be potential for bugs when you do a lot of stuff in the function and the 'return' keyword must be buried somewhere in the function. therefore, always specify the return type.

// if it's possible to reuturn different types:
function rando(num: number) {
	if (Math.random() > 0.5) {
		return num.toString();
	}
	return num;
}
// if you hover over the function name, you will see that ts infers the multiple return types.

// we mentioned before that, if we don't specify the parameter types, they will default to 'any' (hover over 'color' below):
function bla(color) {}
// however, that's not what will happen in the following situation:
const colors = ['blue', 'red'];
const capColors = colors.map((color) => color.toUpperCase());
// ts infers that 'color' will be of type string (it does it because of the context when the anonymous function is called)

// ts infers that the return type will be 'void'
function printTwice(msg: string) {
	console.log(msg);
	console.log(msg);
}
// but it's better if you specify it, because otherwise, if you accidentally include a return, then ts won't warn you:
function printTwice2(msg: string) {
	console.log(msg);
	console.log(msg);
	return '';
}
// so you better specify the return type to 'void', and then ts will warn you:
function printTwice3(msg: string): void {
	console.log(msg);
	console.log(msg);
	return '';
}

// watch 23-the never type.
