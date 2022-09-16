function sum(x: number, y: number): number {
	return x + y;
}

function greet(): void {
	console.log('hello');
}

// let mySum: Function;
let mySum: (a: number, b: number) => number;
mySum = sum;

// console.log(mySum(2, 2));

//

function addAndHandle(x: number, y: number, cb: (num: number) => void): void {
	const result = x + y;
	cb(result);
}

// addAndHandle(2, 2, (res) => {
// 	console.log(res);
// });

let userInput: unknown;
let userName: string;

userInput = 'hello';
userInput = 33;
userInput = 'myname';

if (typeof userInput === 'string') {
	userName = userInput;
}

function generateError(message: string, code: number): never {
	while (true) {
		console.log('Im always here');
	}
	// throw { message, errorCode: code };
}

// const canYouPrintThis = generateError('haha', 10);
// console.log(canYouPrintThis);

const button = document.querySelector('button')!;

const clickHandler = (message: string): void => {
	console.log(message);
};

button.addEventListener('click', clickHandler.bind(null, 'hello there!'));
