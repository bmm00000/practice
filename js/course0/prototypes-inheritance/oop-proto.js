// how can we set the prototype of the objects that will be created out of a constructor function?

const companyPerson = {
	greet() {
		console.log('Hi, I am ' + this.name);
	},
};

function Employee(name, internalId) {
	this.name = name;
	this.id = internalId;
	// we want the 'greet' method to be available here, but we don't add it here, since we also want it to be available in other constructor functions. therefore,we want to set it in the prototype of the objects that will be created out of this (and potentially other) constructor functions.
}

// in js, every function is an object, and every function object in js has a special built-in property, 'prototype', which only exists in function objects (other objects don't have it, for example, the object employee1 doesn't have the 'prototype' property). And this 'prototype' property has a very specific use case: it defines the prototype that every object that is created out of that constructor function, will have.
Employee.prototype = companyPerson;
// WATCH OUT!:: the 'prototype' property DOES NOT set the prototype of the Employee function object, BUT it does set the prototype of every object that is created out of the Employee constructor function.

const employee1 = new Employee('Jose', 'e1');
employee1.greet(); // Hi, I am Jose
// this also proves that 'this.name' in companyPerson refers to the employee1 object, not to the companyPerson object.

// the prototype of the Employee function object itself is:
console.log(Employee.__proto__);
// (__proto__ is added by many browsers, so we can access it)

// as we explained above, note that:
console.log(Employee.__proto__ === Employee.prototype); // false
// watch out, these two properties are often confused!

// the 'prototype' property can also be useful for 'patching' (changing some properties or methods in the prototype object, ie. our fallback object of the to-be-created objects). imagine you want to add a sayGoodbye method to companyPerson. you could add it up there in companyPerson itself (line 3), but let's imagine that, for whatever reason, we only want to add it after a while (eg. after we created a few objects with the first version (without the sayGoodbye method) of the companyPerson prototype). Then we can do the following:

Employee.prototype.sayGoodbye = function () {
	console.log('Good bye!');
};

employee1.sayGoodbye();
// this works, because we changed the object which was assigned as a prototype object to the newly created objects (the companyPerson object is not being copied or re-created for every new employee object that you create, but we are always linking to the same companyPerson object in memory, and therefore, if we manipulate the companyPerson object in memory, we manipulate one and the same object, which is linked (as a prototype) to all employees objects. that's how you can add features to all your employees objects after initially setting up the prototype).

// Employee.prototype.greet = null
// // like this, you would remove the existing 'greet' method, but keep the rest of the existing prototype

// on the other hand, imagine the following:
Employee.prototype = {};
employee1.sayGoodbye();
// this would work! because in the line above, you set up the prototype that will be assigned to newly created objects, and employee1 was created before we set the prototype to an empty object (when we created employee1, we still pointed to the old prototype)! in a nutshell, in line 32, you are changing the existing object, but in line 40 you are setting a brand new object as a value for the prototype property, which will be the prototype only to newly created objects from now on.

// watch again 'The Default Prototype and "Monkey Patching"'
// watch again 'Prototypes & "this"'
// watch again 'Protoypes, Classes & Methods'
// watch again 'Prototypes and the "constructor" Property (Method)'
