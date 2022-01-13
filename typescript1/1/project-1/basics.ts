function add(num1: number, num2: number, showResult: boolean, text: string) {
	// reminder: all the types specified above are not understood by js, only by ts compiler, and by our IDE, becuase it supports ts. When you compile the ts file to js, they don't appear.
	if (showResult) {
		const result = num1 + num2;
		console.log(text + result);
	}
}

// we don't specify types in the next variables, because TS has a built in feature called type inference: TS does its best to infer what type a certain variable is. For example, n1 will be a number because we initialized it with a number. Therefore we don't assign types when it's possible for TS to infer types correctly (it would be redundant if we assigned types then). For example, you could do the following, but it is redundant:
// let n1: number = 4
// We would only assign types if we declared the variable, but not initialized it (have declared it, but not assigned any value), for example:
// let n1: number;
// and ts will shout at you if you assign a different type, for example:
// n1 = 'haha';

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

// THE WHOLE JOB OF TS IS TO CHECK TYPES AND YELL AT US IF WE USE THEM INCORRECTLY.
