type Point = {
	x: number;
	y: number;
};

type Loc = {
	lat: number;
	long: number;
};

let coordinates: Point | Loc = { x: 1, y: 2 };
coordinates = { lat: 4, long: 88 };

const stuff: number | string[] = 2; // either a number or an array of strings
const stuff2: (number | string)[] = [2, 'ha']; // an array of either numbers of strings
const stuff3: number[] | string[] = [1, 2]; // either an array of all numbers or an array of all strings
const coords: (Point | Loc)[] = [];
coords.push({ x: 1, y: 2 });
coords.push({ lat: 4, long: 88 });
// watch out, the parenthesis is important!

// most simple literal type:
let zero: 0 = 0; // the type is the number 0, it can only be that type and value.
zero = 1; // ts complains here
let hi: 'hi' = 'hi';
hi = 2; // ts complains here
// what we did before is not very useful, the usefulness of literal types comes when combined with union types:
let mood: 'happy' | 'sad' = 'happy';
mood = 'sad';
mood = 'haha'; // ts complains here

type DayOfWeekend = 'Saturday' | 'Sunday';
const today: DayOfWeekend = 'Saturday';
const tomorrow: DayOfWeekend = 'Monday'; // ts complains here
