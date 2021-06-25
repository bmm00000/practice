function add(num1: number, num2: number, showResult: boolean, text: string) {
	if (showResult) {
		const result = num1 + num2;
		console.log(text + result);
	}
}

// we don't specify types in the next variables, because TS has a built in feature called type inference: TS does it best to infer what type a certain variable is. For example, n1 will be a number because we initialized it with a number. Therefore we don't assign types when it's possible for TS to infer types correctly (it would be redundant if we assigned types then). We would only assign types if we declared the variable, but not initialized it, for example:
// let n1: number;

// if you check n0, the type is not even a number, but the number 7, because it's a constant (if you use 'let', the type will be a number):
const n0 = 7;
// const n1 = '3';
let n1 = 2;
// TS will also shout at you when the values don't match the inferred types:
// n1 = 'haha';
const n2 = 3;
const printResult = true;
let intro = 'The result is: ';

add(n1, n2, printResult, intro);
