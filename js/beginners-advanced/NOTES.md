typeof true // "boolean"

8 === 8.000000 // true

you get NaN when you are working with numbers and something goes wrong. for example: Math.sqrt(-1)
NaN is basically an error when you are working with numbers saying 'hey, there's no answer to this'
typeof NaN => "number"

the type 'null' has only one value, and it is 'null', which is explicitly nothing. you can only get a 'null' in JS if you assign a variable to 'null'.

remember difference between null and undefined (null is assigned, whereas undefined is what happens when you don't assign a value to a variable (you initialize a variable but you don't assign a value)).

remember, a function inside of an object is a method.

JS is loosely typed: don't need to declare a variable's type (JS authomatically determines it for you); variable type can change.

//

this is the point of type coercion: when then operands of an operation are of different types, they can be converted into an equivalent type. we want to do an operation, but the type of the operands is different that's the point.

//

question about type coertion in loose equality: 3 == '3' converts the string into a number, but when we 3 + '3', the number is converted into a string.

//

for now, we are going to take a look at the first two types of operators. Of these two types of operators, there are a bunch of different options (for now, we are going focus on arithmetic, assignment, and comparison operators)

assignment operators assign a value to an operand.

assignment operator has right to left associativity (the value is going to be assigned to the left operand based on the value of the right operand). for example:
let x = 5
let y = 3
x = y = 2
console.log(x), x will return 2

shorthand addition assignment operator: x += y (works the same with substraction, multiplication, division).

comparison operators are used to compare two operand (3===3). keep in mind that that with '<=' the less or greater have to be in the left, or we will get a reference error.

arithmetic operators, for example 8 % 5 (remainder or modulo operator).

with modulo operator: if left operand is lower than right operand, it returns the left operand: for example, console.log(1 % 5), returns 1

increment arithmetic operator (++) adds 1 to its operand:

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

ditto with the decrement arithmetic operator (--).

//

operator precedence is what determines the way in which operators are parsed with respect with each other.

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence

operators: precedence is the order, associativity is the direction (for example, in an addition, associativity is left to right, whereas assignment is right to left; also, assignment has a very low precedence, so it happens at the end when we already did the other operations and we assign the result to the variable, for example.).

let x = 1
let y = 3
x = y = 2
console.log(x) // 2

let x = 5
let y = 3
let z = x + 1 === y + 3
console.log(z) // true
if you look at the precedence table, we do first the addition, then the equality, then the assignment

//

logical operators are typically used with boolean values, and when they are, they return a boolean value. but what is really happening is that the return value is one of the operands (this is because short-circuit evaluation). so that means that logical operators can work without boolean values as well.
in order to save time, processing power, if js encounters something that it doesn't like, the operation stops right and there.

false && (anything) // false (js will not even look at the second operand)
true || (anything) // true (js will not even look at the second operand)

! also works with non-bolean values:
!0 // true
!null // true
!'hello' // false

screenshot 21, in the console, you will see 'undefined'. if you want to call the function without passing an argument, you can use the || operator (screenshot 22), and the beauty of this is that you can also pass an argument and it will work (screenshot 23)

const cow = undefined
cow.sound() // 'cannot read property of undefined' error.
cow && cow.sound() // nothing happens because 'cow' is falsy, so cow.sound() is not evaluated. therefore, we will avoid the 'cannot read property of undefined' error, because JS will short circuit when it finds cow is falsy.
that happens because when we have: true && true, it runs the second true, but if the first operand is false, it doesn't continue evaluating.
but if 'cow' is truthy (screenshot 24), then it still works as we want (the second operand is returned, which invokes the function).

//

AUTHOMATIC GLOBAL SCOPE:
if we assign a value to a variable that has not been declared, it becomes a global variable authomatically. For example, see screenshot. So WATCH OUT! you always need to declare the variables you are using inside your functions, or they will become global variables authomatically.

IN THE BROWSER, THE GLOBAL OBJECT IS THE WINDOW OBJECT.
any variables we create in the global scope will be attached to the window object (see screenshot)

WHEN THE KEYWORD this IS USED INSIDE OF A DELCARED OBJECT, the value of 'this' is set to the closest parent object the method is called on.
