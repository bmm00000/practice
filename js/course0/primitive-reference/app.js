// primitive types:
let a = 5;
console.log(a + 1); // 6. 'a' doesn't change (immutable)
console.log(a); // it's still 5, not 6 (primitive values are not mutable)

let b = a;
// above we created a copy of a, ie. a brand new 5 (in a new place in memory), and it will not be changed by the following:
a = a + 2;
// in the line above, the 5 that was originally stored in 'a', is cleaned up by the js engine and wiped out of memory.
console.log(a); // 7
console.log(b); // 5

// in a nutshell, primitive values are shared by copy: whenever you store a primitive value somewhere, a new copy (in a new place in memory) is created. PRIMITIVE VALUES ARE ALL ABOUT COPIES.

// reference types:
const user = { age: 26 };
// unlike for primitive values, the former object is not copied, ie. 'student' does not hold a brand new copy, but it points to the exact same object in memory (js stores in 'user' the address of the object in memory, and we only copy that pointer to 'student'; the pointer points to the same object in memory)
const student = user;
user.age = 32;
// in the line above, we mutate the object (objects are mutable)
console.log(student); // {age: 32}

// with primitive types, we cannot mutate them (eg. you cannot make a 5 become a 6), but with reference types, since we have properties and methods, we can store different values in those properties and methods, ie, we can mutate them.
