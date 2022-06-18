const hobbies = ['fishing', 'cooking']; // a pointer to the address in memory is stored in 'hobbies'

// hobbies = ['fishing', 'cooking'];
// this is not allowed! becuase the array above is a newly created array with a different address, and we cannot reassign that new pointer to 'hobbies', because we are using 'const'. but the following is allowed:
hobbies.push('eating');
console.log(hobbies);

const todos = ['fishing', 'cooking'];
console.log(hobbies == todos); // false
console.log(hobbies === todos); // false
// both cases above are false, because even though the arrays look like the same to us, they are different arrays (objects) stored in different places in memory with different addresses, and those are the addresses stored in the variables that we use. a different situation is the following:
const moreTodos = hobbies;
console.log(moreTodos == hobbies); // true
console.log(moreTodos === hobbies); // true
