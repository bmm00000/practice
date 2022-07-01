// watch out with this behaviour:
function printSinger({
	name,
	lastName,
}: {
	name: string;
	lastName: string;
}): void {
	console.log(`This is ${name} ${lastName}.`);
}

printSinger({ name: 'Mick', lastName: 'Jagger' });
// up until now everything is ok. but ts will warn us about the following:
printSinger({ name: 'Keth', lastName: 'Richards', age: 88 });
// because the argument has to be exactly of the same object type that we specified when we defined the function. However, ts doesn't warn us in the following situation:
const anotherSinger = { name: 'Kenneth', lastName: 'Amber', age: 33 };
printSinger(anotherSinger);
// why not?? in this situation, ts is only going to check if 'first' and 'last' are there. but ts does an additional check when you define the object that you pass in line (like we did in line 14). the decision was made by the ts team to make sure that you only pass the properties that are required, and they considered that anything else would most probably be a mistake (however, you can still pass a variable with additional properties, as we did in line 17)

// if we use aliases with the 'type' keyword, by convention we use a capital letter as the first letter of the name of the type, but it's just a convention, it works otherwise as well.

// when you use aliases with the 'type' keyword, you are not confined to object types, the following example is a bit stupid, but you get the point:
type MyNumber = number;
let age: MyNumber = 26;

// watch 29-nested objects

// optional properties:
type Point = {
	x: number;
	y: number;
	z?: number;
};

// since the property 'z' is optional, ts won't complain when we do the following (if you delete the '?', then ts will complain):
const myPoint: Point = { x: 2, y: 3 };

// the 'readonly' modifier keyword (it allows us to mark certain properties in objects or elements of arrays, etc, as read only, so ts will complain if you try to modify them):
type User = { readonly id: number; username: string };

const user1: User = { id: 123, username: 'Amber' };

console.log(user1.id);
user1.id = 2343; // ts is complaining here!
// keep in mind, our 'id' is a number (primitive type), but if it was a reference type, we could change it, because it would still point to the same value in memory

// with 'intersection types', we can combine several types:
type Colorful = {
	color: string;
};

type Circle = {
	radius: number;
};

type ColorfulCircle = Colorful & Circle;

const happyFace: ColorfulCircle = { color: 'red', radius: 2 };

// remember, when we are using object types, the order of the properties does not matter. the only thing that matters is that all the properties that we specified in our type are there.

// you can also add non-pre-existing types when you are intersecting types:
type ColCircleWithAge = Colorful & Circle & { age: number };
const strangeThing: ColCircleWithAge = { radius: 2, color: 'blue', age: 2 };

// watch 33-object types exercise:
// pay attention to the nested destructuring.
