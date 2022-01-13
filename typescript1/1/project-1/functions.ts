const add = (input1: number, input2: number) => {
	return input1 + input2;
};

function add1(input1: number, input2: number) {
	return input1 + input2;
}

// when you hover over the names of the functions above, you will see at the end the RETURN TYPE that ts has inferred ('number', in both cases) (note that the syntax differs in both examples)

// you can specify the return type as follows:

function add2(input1: number, input2: number): number {
	return input1 + input2;
}

const add22 = (input1: number, input2: number): number => {
	return input1 + input2;
};

// as it happens with variables, it's a very good idea to let ts do its job inferring the return type. if you have no reason for explicitly setting the type, don't do it, and let ts infer the type.

// regarding return types, there's one type we haven't seen before (it doesn't exist in js): it's the 'void' type. for example:

function printResult(input: number) {
	console.log('This is the result: ' + input);
}

// if you hover over the function name, you will see that the return type is 'void' because we are not returning anything (undefined is returned by default) (this function doesn't have a return statement). therefore, we get return type 'void' even though it technically returns 'undefined' (watch out! because you can have 'undefined' as a type in ts). but if you do the following, you get an error:

function printResult1(input: number): undefined {
	console.log('This is the result: ' + input);
}

// this happens because in ts a function is not allowed to return undefined, even though it technically does, but ts thinks about functions a bit differently. in ts, return type will be 'void' if a function returns nothing (it doesn't have a return statement). if you set return type as 'undefined' (which you will very rarely need to do) ts will expect that you have a return statement where you don't return a value, as follows:

function printResult2(input: number): undefined {
	console.log('This is the result: ' + input);
	return;
}

// from a js perspective, printResult1 is the same as printResult2, but ts makes a differentiation. however, you could also use 'void' as a return type even if you use a return statement where you don't return a value:

function printResult3(input: number): void {
	console.log('This is the result: ' + input);
	return;
}

// therefore, you would by default use 'void' when you have a return statement where you don't return a value. this is what ts will infer if you don't specify it (hover over the function name):

function printResult4(input: number) {
	console.log('This is the result: ' + input);
	return;
}

// therefore, 'void' is the standard return type that ts will infer when you have a function that doesn't return a value

// FUNCTIONS AS TYPES:
const addFunc = (input1: number, input2: number) => {
	return input1 + input2;
};

// let addVar;

// addVar = addFunc;

// console.log(addVar(1, 2));

// so far so good, but if you do the following, ts has no way to find out about the following problem:

// addVar = 5;

// console.log(addVar(1, 2)); // this will throw an error at runtime ("addVar is not a function"), you will not see the error before runtime neither in the IDE nor in the tsc compilation.

// in order to avoid this, we need to be clear that addVar will hold a function, and we will see the error in the IDE and if we compile with tsc:

let addVar: Function;

addVar = addFunc;

console.log(addVar(1, 2));

addVar = 5;

console.log(addVar(1, 2));

// but there's another problem, since you can do the following and ts will not complain, you will only find out about the error at runtime:

addVar = printResult4;

console.log(addVar(1, 2)); // error at runtime!!

// in order to solve this, we can be more precise about how the function should look like (this is when function types come into play; function types are types that describe a function, regarding parameters and return value):

let addVar2: () => number;
// funtion type of addVar2: accepts no parameters, and returns a number

let addVar3: (a: number, b: number) => number;
// function type of addVar3: accepts two numbers as arguments, and returns a number (note that 'a' and 'b' do not have to match with the name of the parameters)

addVar3 = add;
// ts doesn't complain here, because 'add' satisfies the function type of 'addVar3'

addVar3 = printResult4;
// ts complains now.

// FUNCTION TYPES AND CALLBACKS:
const addAndHandle = (n1: number, n2: number, cb: (num: number) => void) => {
	const result = n1 + n2;
	cb(result);
};

addAndHandle(2, 44, (res) => {
	console.log(res);
});

// we don't need to indicate the type of 'res', since ts already infers that it's a number. if you added more arguments next to 'res', ts will complain, since it only expects one argument, and it has to be a number, as follows:

addAndHandle(2, 44, (res, res2) => {
	console.log(res);
});

// the only thing that ts doesn't pick up is if we return something in the callback: we specified that it should be void, but ts doesn't complain with the following:

addAndHandle(2, 44, (res) => {
	console.log(res);
	return res;
});

// this is not a bug in ts: by specifying 'void' as return type, what you are saying is that you will ignore any result that you might be returning from the call back, for the purposes of 'addAndHandle' (we are not interested in it, that's why we use 'void': anything that you might return is not interesting for us, since we will not do anything with it in 'addAndHandle').

// Question 1:
// Will this code compile?

function sendRequest(data: string, cb: (response: any) => void) {
	// ... sending a request with "data"
	return cb({ data: 'Hi there!' });
}

sendRequest('Send this!', (response) => {
	console.log(response);
	return true;
});

//  Yes!

// Question 2:
// Which code snippet is better (i.e. which code should you write)?

// 1)
function sayHi(): void {
	// ...
}

// OR

// 2)
function sayHi1(): undefined {
	// ...
}

// 1!
