function createGreeter() {
	const myName = 'Jose';

	return function () {
		console.log(myName);
	};
}

const greet = createGreeter();
greet();

// in the end, parameters work like variables inside of functions. that's why the following also works (it doesn't matter if we get a value as a parameter or we define it inside of the function; in both cases it's avaialble in the scope of the function):

function createGreeter1(myName) {
	return function () {
		console.log(myName);
	};
}

const greet1 = createGreeter1('Jose');
greet1();

// now, what would happen here?:

const greetMe = createGreeter1('Jose');
const greetHer = createGreeter1('Alana');
greetMe(); // Jose

// this happens because the two returned functions are stored in different places in memory, a pointer to these functions is stored in the constants greetMe and greetHer, and whenever we create a new function, it closes over its environment (the variables it can reach) at the point of time you declared it. therefore, we created two functions that run in totally different environments: every execution of createGreeter1 creates its own environement (scope) and has nothing to do with any prior executions.

// what about the following situation?:

function createGreeter2(myName) {
	return function () {
		setTimeout(() => {
			console.log(myName);
		}, 1000);
	};
}

const greet2 = createGreeter2('Jose2');
const greet22 = createGreeter2('Jose22');
greet2();

// the fact that we have a setTimeout doesn't affect at all, we still have the same circumstances as explained before: we create a function multiple times, so we create different environemnts, and the anonymous function that is returned (and the anonymous function that the timer uses) closes over its environment when it's declared. therefore, the two different function executions have two different environments over which the anonymous functions inside the timer closes.

// however, the following is a different situation:

function createGreeter3(myName) {
	return function () {
		console.log(myName);
		setTimeout(() => {
			console.log(myName);
		}, 1000);

		myName = 'another name';
	};
}

const greet3 = createGreeter3('Jose3');
greet3();
// Jose3
// another name

// why is this happenning? at the point of time that the callback of setTimeout is declared, myName is 'Jose3', and the closure closes over its environment when it's declared, not when it's executed. therefore, why do we see 'another name' (that reassignment happens after the declaration). BECAUSE CLOSURES DON'T CLOSE OVER THE VALUES IN THE VARIABLES THEY MEMORIZE, BUT OVER THE VARIABLES THEMSELVES (the variables names). so the closure does not keep the value of myName. instead, the closure closes over the entire environemnt, so it's aware of the variable names but not of their values (it will only look at the values when that closure function executes, and, in the case of the setTimeout callback, that's the case after 1 second)

// the following is a frequent interview question:

for (var i = 0; i < 5; i++) {
	setTimeout(function () {
		console.log(i);
	}, 500);
}
// keep in mind what we learned about closures: they lock in the name of the variable, not the value. what happens here is that we are setting 5 timers, and for every timer we create (declare) a new anonymous function, and in every anonymous function we lock in the surrounding lexical context. in that lexical context we got a global 'i' variable (it's globally available because it's not inside of some function and 'var' doesn't have block scope), but it's locked in only the variable name (not the value). since the timers expire after the loop has been fully processed (the loop will take much less than 500 milliseconds). therefore, when the timers expire, then they look at the value of 'i' (they didn't lock in the value, only the name of the variable). the closure here (the callback function inside of setTimeout) looks up the concrete value of 'i' when it executes, not when it's declared

// another interview question is how you could console.log values of 0 to 4. you have two solutions:

// first approach: solution from earlier days:
for (var i = 0; i < 5; i++) {
	(function () {
		var j = i;
		setTimeout(function () {
			console.log(j);
		}, 500);
	})(); // Immediately Invoked Function Expression
}
// in earlier days, when we didn't have let and const, we needed to use IIFEs more often, becuase they allow us to create a new function scope in which you can define variables. therefore, you also create a new environement, so every callback of the timer has a new environment, and since now we close over 'j' (we memorize 'j'), 'j' is different for every self executing function, beause we self-execute a new function for every iteration.

// second approach: more modern solution:
for (let i = 0; i < 5; i++) {
	setTimeout(function () {
		console.log(i);
	}, 500);
}
// it works because with 'let' we crate block scope, and a new block scope is created for every iteration. you could challenge this thought process and say the following: we have just one variable which is created ('i'), which simply receives a different value for every iteration, and if that would be the case, we would have the same output as we had at the beginning (console log 5, 5, 5, 5, 5), BUT THAT'S NOT HOW JS WORKS INTERNALLY! THIS IS KIND OF AN EDGE CASE THAT WE HAVE HERE: inside of the 'for' loop, a new variable is created for every iteration in its own block scope, and this variable copies over the old variable value plus 1.
