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

function addAndHandle(x: number, y: number, cb: (num: number) => void): void {
	const result = x + y;
	cb(result);
}

addAndHandle(2, 2, (res) => {
	console.log(res);
});
