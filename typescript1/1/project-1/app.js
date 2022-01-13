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
// LITERAL TYPES:
// not only you specify the type, but also the specific value of that type, for example:
var myAge = 29;
// we can use a literal type (with union type) with 'convertResult', the reason is that, if we type it as a string, we may make mistakes writing that string when calling the function:
function combine2(input1, input2, convertResult) {
    var result;
    if ((typeof input1 === 'number' && typeof input2 === 'number') ||
        convertResult === 'as-number'
    // WATCH OUT!! don't say 'typeof convertResult === 'as-number'
    ) {
        result = +input1 + +input2;
    }
    else {
        result = input1.toString() + input2.toString();
    }
    return result;
}
var combine2Ages = combine2(22, 22, 'as-number');
console.log(combine2Ages);
var combine22Ages = combine2('22', '22', 'as-number');
console.log(combine2Ages);
var combine2Names = combine2('Jose', 'Ola', 'as-string');
console.log(combine2Names);
