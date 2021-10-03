two kinds of data: primitives (not an object) and objects.

primitives: boolean, number, string, null, undefined, symbol

you get NaN when you are working with numbers and something goes wrong. for example: Math.sqrt(-1)
NaN is basically an error when you are working with numbers saying 'hey, there's no answer to this'
typeof NaN => "number"

the type 'null' has only one value, and it is 'null', which is explicitly nothing. you can only get a 'null' in JS if you assign a variable to 'null'.

remember difference between null and undefined (null is assigned, whereas undefined is what happens when you don't assign a value to a variable (you initialize a variable but you don't assign a value)).

objects: properties are key-value pairs
remember, a function inside of an object is a method.

JS is loosely typed: don't need to declare a variable's type (JS authomatically determines it for you); variable type can change.

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

AUTHOMATIC GLOBAL SCOPE:
if we assign a value to a variable that has not been declared, it becomes a global variable authomatically. For example, see screenshot. So WATCH OUT! you always need to declare the variables you are using inside your functions, or they will become global variables authomatically.

IN THE BROWSER, THE GLOBAL OBJECT IS THE WINDOW OBJECT.
any variables we create in the global scope will be attached to the window object (see screenshot)

WHEN THE KEYWORD this IS USED INSIDE OF A DELCARED OBJECT, the value of 'this' is set to the closest parent object the method is called on.