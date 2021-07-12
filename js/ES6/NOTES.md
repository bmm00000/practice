two kinds of data: primitives (not an object) and objects.

primitives: boolean, number, string, null, undefined, symbol

remember difference between null and undefined (null is assigned, whereas undefined is what happens when you don't assign a value to a variable).

objects: properties are key-value pairs

JS is loosely typed: don't need to declare a variable's type; variable type can change.

assignment operator has right to left associativity. for example:
let x = 5
let y = 3
x = y = 2
console.log(x), x will return 2

with modulo operator: if left operand is lower than right operand, it returns the left operand: for example, console.log(1 % 5), returns 1

let x = 3
console.log(x++)
(it returns the value before adding 1)
console.log(x)
this will return 3, and 4

let x = 3
console.log(++x)
(it returns the value after adding 1)
console.log(x)
this will return 4, and 4

operators: precedence is the order, associativity is the direction.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence

let x = 5
let y = 3
let z = x + 1 === y + 3
console.log(z), z returns true

const cow = undefined
cow && cow.sound()
this will not give us the 'cannot read property of undefined' error, because JS will short circuit when it finds cow is falsy.
that happens because when we have: true && true, it runs the second true
