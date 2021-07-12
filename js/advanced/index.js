// this course is organised as if it were interview questions about js: usually interview questions have an 'easy' quick answer but also deeper considerations that go into the deeper layers of js.

// SECTION: MISCELLANEOUS

// there is no company creating javascript, it's just an agreement, the tc39 committee meet up to discuss proposed features of js. therefore, js has evolved iteratively.

// but browsers don't implement all features in one go, but bit by bit in the newer versions, that's why we use caniuse.com

// js is backwards compatible: the code you write now is going to run in the future. any js code from the past is 100% compatible with the latest specification of js. all old features will continue to exist in new specifications. new features are layers on the top of older features, that's why you need to know history of the layers to better understand how js works. That's why in the interviews there's usually an 'easy' answer, but then other deepeer considerations or ways to do things depending on the deeper layers...

// difference between compiler support features vs polyfilling support features: a compiler allows you to use the latest features and it compiles the code down into an older version of js, and that code will be able to be run in all browsers. one of the most famous compilers is Babel. However, if you are trying to compile a new feature (for example, promises) that does something that is not possible to do with older features, then the compiler does not know what to do. In that case you need to use a polyfill. A polyfill is a piece of code that replicates the functionality of that new feature using old versions. the result is the same as with compilers: your code can be used in older browsers (you can download polyfills from npm, for example)

// 'use strict': 'strict mode' allows you to operate a program or a function in a strict mode operating context (in a nutshell, it makes debugging easier, errors that were ignored or silent, now will generate errors or exceptions)
// how to activate it: you type the string 'use strict' and put it at the top of the js file (it's a string because back in the day, if the browser was old and didn't understand it, it would just ignore the string).
// if you are working with legacy code, you can only apply strict mode to parts of code by placing it inside of a function (see screenshot)

// so what is the point of using use strict mode?
// if you use a variable before it's been defined, with use strict mode it throws an error (before it went silent), for example:
asim = 1;
// you initialize it without declaring it, it would automatically create a global variable with that name in the global object ('window' in the browser, 'global' in node.js)
// but when you go with strict mode, it will throw an error (see screenshot). this is very useful because if you didn't have this error the bug could stay there undetected and cause other issues...

// another feature of use strict is that it stops you from using words that are reserved for future versions of js. for example:
var let = 1;
// it doesn't give us any problem, but if we use strict mode, it gives us an error (see screenshot)

// another feture of use strict is that you cannot delete functions, variables, or function arguments in use strict mode. for example:
var foo = 1;
delete foo;

function moo() {}
delete moo;
// js does not complain without strict mode, but with strict mode: see screenshot.

// another feature: in non-strict mode you can use the key word 'eval' as a name of a function, variable or anything, and js will not complain. but in use strict mode, it causes an error.
// ALSO, use strict mode makes the use of 'eval' itself a bit safer: what does 'eval' do? it lets you evaluate js expressions by passing a string (it executes the string as js code), see screenshot.
// in non-strict mode, the value of 'a' leaks out (see screenshot), and it can cause security issues or just polution in your names (for example, you declared 'a' outside of the 'eval' block and expect that to be the value, but then the real value of 'a' is what you initialized in the 'eval' block). but when you use the strict mode, any variables inside the 'eval' block only exist there, not ouside of it, so outside of it they would not be defined (see screenshot). Therefore, use strict mode makes 'eval' safer to use ('eval' is a very powerful feature of js, but also dangerous).

// does js pass parameters by reference or by value? for example:
var a;
function foo(a) {}
// are you passing 'a' by value or by reference?
// the short answer is: passing primitive types is by value, and objects are passed by reference.
// so what is passing by value and passing by reference?
// pass by value: if you change the value of a primitive type inside a function, then the changes won't affect the variable in the outer scope of the function (see screenshot). that's because, for primitive types, when passed to 'foo' (the function), they are passed by value, it's like passing a copy of 'a', so anything you do to 'a' inside the function won't affect the original 'a' (outside of the function)
// pass by reference: you are passing not a copy, but you are pointing to something the real thing (that's what the reference does, to point to the real thing). when you pass an object, you pass a reference, thus, if you change a property of that object inside the function, the change will be reflected in the outer scope (see screenshot)
// HOWEVER, see screenshot: if you create a new object with the same name ('a') (new reference) then it will console log the original 'a', since the 'a' that was created inside the function has another reference: YOU CANNOT CHANGE WHAT 'A' POINTS TO (YOU CANNOT CHANGE THE WHOLE OBJECT), YOU CAN ONLY CHANGE A PROPERTY OF WHAT 'A' POINTS TO.

// REST OPERATOR (introduced in ES6):
// In this example:
function sum(a, b) {
	return a + b;
}
sum(1, 2, 3, 4); // 3
// it will ignore extra parameters.
// but if we call:
sum(1); // NaN. Why?? because 'b' is undefined
// in functions, there's a property called 'arguments' (it's an array) (see screenshot), and it is the only thing we had in js to allow us to handle varying numbers of arguments, so we could loop over the array of 'arguments' to do things with an undetermined number of arguments (see screenshot)
// but this had three problems: 1/ you cannot tell from looking at the function what arguments it will take, you need to look at the source code to understand what is expected to be passed, which is not a good coding practice. 2 / it's difficult to have a mixture of fixed and variable arguments (certain mandatory arguments and then some variable arguments). 3 / the 'arguments' array looks like an array but it's not an array (see screenshot with error: 'arguments.slice is not a function'; the workaround we had for that was to use 'Array.prototype.slice.call...', see screenshot):: that's why in ES6 the rest operator was introduced: and it gives you a real array (so you can push, etc., see screenshot), and you can also use determined number of arguments plus variable amount of arguments (see screenshot, 'options' contains the rest of the arguments, that's why it's called the REST operator!!) but KEEP IN MIND no arguments can exist after the rest operator(see screenshot) IN SUMMARY, THE REST OPERATOR ALLOWS YOU TO COLLAPSE A NUMBER OF SINGLE ELEMENTS INTO A PROPER ARRAY (SO YOU CAN USE PUSH, POP, ETC.)

// WHAT IS THE SPREAD OPERATOR?
// same syntax as rest operator, but it has a different behaviour when used in a different context: it take a single array and explodes it into a number of separate single elements.
// unlike the rest operator, you can place the spread operator anywhere you want (you can put more elements after it, but not after the rest operator)
// when would you use a spread operator?? 1/manipulating arrays (adding, inserting, etc.), 2/ copying arrays (see example of screenshot), 3/ explode arguments in a function that accepts a variable number of arguments (see screnshot example)
// WATCH OUT WITH THE EXAMPLE WITH method and options, in the first case it's printing an array inside of another array.

// TEMPLATE STRINGS OR TEMPLATE LITERALS (backticks: ``) (new feature in ES6):
//Use cases:
//1/ multi-line strings: in the past, we used \n (see screenshot) but now we use template strings (screenshot)
//2/ expresion interpolation/variable interpolation (sshot). ${} is not a variable, but an expression, and what the expression returns is what is printed in the console (see example of ${1} ${2} or math operations in screenshot). Inside ${} you can place a variable or another expression.
//another functionality of template strings: TEMPLATE TAGS or TEMPLATE STRING TAGS or TEMPLATE LITERAL TAGS (they are just functions, it's a way of adding some functionality which accepts a string): it allows you to have a tag before a string (see ss). Example of this: styled components in react (an element takes css in the form of a string) (ss), and it can even have nested template tags (ss). Another example: there's an npm package for accesibility (ss), and it allows internationalization (manipulate the string using euros, dollars, etc. depending on what you want).
// how do you create template tags? first of all, a template tag is not just a function that accepts a string, since it gets called with the string broken up which allows for a lot of possibilities for formatting: see in ss examples of how strings are broken.

// SECTION: TYPES AND EQUALITY

// the different types in js have particularities becuase of how they have evolved over time, this is what we are going to study in this section.

// see in ss 5 primitive types and 1 non-primitive type.
// the non-primitive type (object) can be either an object literal ({}) or we can create it by instantiating an object (new Object())
// to find out about the type, we can use the function 'typeof()' (see ss). WATCH OUT! the typeof(null) will give us an object, which is incorrect, but it cannot be reversed without causing problems, so that's the way it remains.
// difference between dynamically typed language (eg. js) and a statically typed language (eg. java)? see ss. in the latter, you have the specify the types that a variable will hold. On the other hand, a dynamically typed language infers the type of a variable from the value that you initialize it with.:: in js, the type of the variables are determined dynamically at run time (when we dynamically run the application), whereas in java, the type of variables is defined statically when we write the code. Both have pros and cons: you can get up and running very quickly with js, but you only uncover problems in dynamically typed languages at runtime (when the applicaiton is executed), so you may have bugs that remain hidden and only create problems way down the road. On the other hand, with statically typed langauges, when we compile the application the compiler with throw an error if we made a variable hold the wrong type, so we can uncover problms very early on in our development cycle (but this comes at the cost of making our apps a little bit harder to write). Other advantages of static: some issues regarding memory management and perfomance.

// difference between null and undefined.
// undefined:
var a;
console.log(a);
// 'a' has not been initialized.
window.hello;
// this is undefined because it's an unknowwn property
// the other situation is when there'a paramenter that is missing from a function's parameter's list.
// undefined is used by the js engine to inform you that this is either of these three situations.
// on the other hand, null is used by programmers to indicate no value (the js engine will never set a value to null for you)
// difference of null for static and dynamically type languages: for java:
String a = null;
// we know that 'a' is a string, but we don't know the value yet. Therefore in statically typed langauges 'null' is not a value in and of itself, but the concept of absence of value. On the other hand, in js 'null' is an actual value and type (the type of null is null, and the null type has only one value: null (the same is true about undefined, btw))
null == undefined // returns true
undefined == null // returns true
// because the values are equivalent, BUT not the types.

// difference between == (equality) and === (strict equality):
// strict equality checks for both value and type equality, but equality checks for only the value equality.
// when using == , we can get unexpected results (see ss). js tries to convert the values so both are of the same type. for example:
0 = '0' // true
// js will try to convert the number 0 into a string. How can you find what js will print out when converting the number 0 into a string?
String(0) // returns '0'
// in js, this is called type coersion. This is what js tries to do when you use == (tries to coerce both values so they are of the same type)
// but sometimes this can be confusing, for example:
false == 'false' // returns false
String(false) // returns 'false'. WHAT???
// WHY IS THIS HAPPENNING??
// because in this case:
false == 'false'
// js is not trying to convert a boolean into a string, but a string into a boolean:
Boolean('false') // returns true, since the string is truthy
// the rules by which js uses coercion are complex, see ss, for == things get more messy than ===. As you can see in the ss table, what applies to === still applies to ===, but the complex behaviour comes with coercion (==).
// Therefore, it's better to use ===, it's more predictable.

// what is the type of NaN?
typeof(NaN) // number
// yes, Nan is of type 'number'. It's used to define a number that is not really a number, eg. the result of a bad calculation, for example:
'abc'/3 // NaN
// This is pretty straightforward, but there are a few characteristics of NaN that can result in bugs if you are not aware of them:
// NaN == [anything, including NaN] // false
NaN == NaN // false . Isn't this strange?? So this begs the question how to check if something is NaN? There an in-built function in js called 'isNaN()':
isNaN(NaN) // true
// but it has its own issues, for example:
// the parameters that we pass are COERCED, for example:
isNaN('a') // true, because:
Number('a') // NaN. the same as:
isNaN(Number('a'))
// therefore, another example:
isNaN('1') // false
// THEREFORE, NaN IS NOT THAT USEFUL IN A DYNAMICALLY TYPED LANGUAGE, LIKE JS.
// SO GIVEN THAT
NaN == NaN // false
// AND GIVEN THE ISSUES WITH isNaN, how can we consistenly check that a value is NaN?
var a = NaN
a !== a // if a is NaN, this will return true

