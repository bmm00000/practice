// UNION TYPES:
function combine(input1: string | number, input2: string | number) {
	// return input1 + input2
	// we get an error above because TS sees union types (not the specific types) and is not sure that the types we are adding can be used with +. Therefore, we can add a runtime check:
	let result;
	if (typeof input1 === 'number' && typeof input2 === 'number') {
		result = input1 + input2;
	} else {
		result = input1.toString() + input2.toString();
	}

	return result;
}

const addAges = combine(22, 44);
console.log(addAges);

const addNames = combine('Jose', 'Marina');
console.log(addNames);
