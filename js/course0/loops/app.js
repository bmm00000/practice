// the traditional 'for' loop is the most flexible and customizable, since you can decide the starting value of the iterator (it usually is 0, but it doesn't have to be), what the 'iterator action' will be (in most cases is i++, but you can apply any operation you want to the iterator), and you also decide the exit condition (usually it's something like i < 5, but it can be somethign like 'i < 5 && i > 2').

// forEach is a method you can call on arrays to execute a function on every array element.

// in this module, we will not talk much about the 'while' loop.

// if you use 'var' in a 'for' loop:
var i = 10;
// we declare and define 'i' in the above line, but the value of 'i' will be overwriten (and with the 'var' keyword, js doesn't complain if we re-declare a variable):
for (var i = 0; i < 5; i++) {
	console.log(i);
}
console.log(i); // 5
// var creates a variable (i) that is not only available inside of the loop, but GLOBALLY (GLOBAL SCOPE). that's why 'i' is avaialble outside of the loop ('var' knows two kinds of scope: function scope and global scope; function scope only applies if you are creating a variable using 'var' inside of a function). note that, in this case, the value of 'i' after the loop is 5.

for (let i = 0; i < 5; i++) {
	console.log(i);
}
console.log(i); // error: i is not defined.
// 'let' and 'const' use block scope (block scope is created whenever you see {}, except when you are using {} to create an object).
// even though 'let i = 0' is not technically inside the block, it's kind of pulled inside of the block behind the scenes.

for (const i = 0; i < 5; i++) {
	console.log(i);
}
// this would print 0, and then error (after the first iteration).

// in the course, max uses 'const' for 'for... of' and 'for... in' loops.

// watch The "for ... in ..." Loop
// watch The "for ... of ..." Loop
// watch Using forEach()
