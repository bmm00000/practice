// UNION TYPES:
function combine(input1, input2) {
    // return input1 + input2
    // we get an error above because TS sees union types (not the specific types) and is not sure that the types we are adding can be used with +. Therefore, we can add a runtime check:
    var result;
    if (typeof input1 === 'number' && typeof input2 === 'number') {
        result = input1 + input2;
    }
    else {
        result = input1.toString() + input2.toString();
    }
    return result;
}
var addAges = combine(22, 44);
console.log(addAges);
var addNames = combine('Jose', 'Marina');
console.log(addNames);
