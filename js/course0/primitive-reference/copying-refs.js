const hobbies = ['sports', 'cooking'];
const todos = hobbies;

hobbies.push('eating');
console.log(todos); // ['sports', 'cooking', 'eating'];

// what if you want to assign a copy of 'hobbies'?
// you can do it manually:
const moreTodos = ['sports', 'cooking'];
// but to do it manually is not always an option: we have to copy and paste, and if you want to change the array that you are copying from, you have to change also the other copied arrays. also, very often you are working with dynamic data (dynamically generated by users, or fetched from a database, etc.). then, how can we create a copy of the 'hobbies' array? an array can be copied with the 'slice' method (it creates a new array) (other methods like 'filter' or 'map' also create a new array):
const evenMoreTodos = hobbies.slice();
// another option is to use the spread operator:
const evenMoreSo = [...hobbies];

// what if you want to copy an object:
// you can use the Object constructor function, with the 'assign' method (this method takes all the key-value pairs of an object and assign them to a new object):
const user = { age: 26 };
const student = Object.assign({}, user);
// the 'assign' method takes two arguments: the first one is the object to which the key-value pairs should be assigned to, and the second one is the object from which we copy these properties, and then it returns a pointer to the newly created and populated object (note that the object from which the keys are taken ('user') stays unchanged!).
user.age = 32;
console.log(student.age); // 26

// the other option is to use the spread operator:
const student2 = { ...user };

// but keep in mind! if you have nested reference values in the arrays or objects that you are copying, those reference values will not be copied, ie. we are not doing a deep cloning:
const users = [{ name: 'Jose' }, { name: 'Amanda' }]; // this is an array full of pointers (addresses in memory of the objects)
const students = [...users]; // what we are copying here are the pointers (addresses in memory of the nested objects)
users.push({ name: 'Chris' });
console.log(students); // [{ name: 'Jose' }, { name: 'Amanda' }];
// No problem so far, but what if we do the following:
users[0].name = 'Haha!';
console.log(students); // [{ name: 'Haha!' }, { name: 'Amanda' }];

// what if you want a deep clone (a true copy across all levels)? you would need to loop through your data structure, and create new clones for every object inside of the array:

// const students3 = [];
// for (let object of users) {
// 	students3.push({ ...object });
// }

// or:

const students3 = users.map((user) => ({ ...user }));
// but keep in mind that, if you had another reference value nested in 'user' (eg. { name: 'Jose', hobbies: [] }), you would need to go through that reference value as well, so this would become complex very fast.
// but you rarely need such deep clones. if you need it, there are libraries and third party packages that will help you with it.

// A package that helps you with cloning of reference values:
// https://github.com/immutable-js/immutable-js
