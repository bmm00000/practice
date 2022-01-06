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
